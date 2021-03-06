const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, PUB_LINK_KEY } = require("../utils");

/*
mutation {
  post(url: "www.prisma.io", description: "Prisma replaces traditional ORMs") {
    id
  }
}

with login authorization header

{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYxNTAyOTQyOX0.9M_Ny49Klq-KdG4MrTzVzqMlI8H3ld_iVHQVXvPX4mk"
}
*/
async function post(parent, args, context, info) {
  const { userId } = context;
  const { url, description } = args;

  const newLink = await context.prisma.link.create({
    data: {
      url: url,
      description: description,
      postedBy: { connect: { id: userId } },
    },
  });
  context.pubsub.publish(PUB_LINK_KEY, newLink);
  return newLink;
}

/*
mutation {
  signup(
  email: "tester@kakaocorp.com"
  password: "test1!"
  name: "tester"
  ){
    token
    user {
      id
				links {
				id
				description
				url
				}
    }
  }
}
*/
async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

/*
mutation {
  login(email: "tester@kakaocorp.com", password: "test1!") 
  { 
    token
    user {
      id
      name
      email
				links {
				id
				description
				url
				}
    }
  }
}
*/
async function login(parent, args, context, info) {
  const query = {
    where: { email: args.email },
  };
  const user = await context.prisma.user.findUnique(query);

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

module.exports = {
  signup,
  login,
  post,
};
