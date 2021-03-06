const { ApolloServer, gql, PubSub } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const { getUserId } = require("./utils");
const Query = require("./resolvers/Query.js");
const Mutation = require("./resolvers/Mutation.js");
const User = require("./resolvers/User.js");
const Link = require("./resolvers/Link.js");

const prisma = new PrismaClient();
const pubsub = new PubSub();
const graphqlSchema = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const resolvers = {
  Query,
  Mutation,
  Link,
  User,
};

const server = new ApolloServer({
  typeDefs: gql`
    ${graphqlSchema}
  `,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
