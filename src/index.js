const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const { getUserId } = require("./utils");
const Query = require("./resolvers/Query.js");
const Mutation = require("./resolvers/Mutation.js");
const User = require("./resolvers/User.js");
const Link = require("./resolvers/Link.js");

const resolvers = {
  Query,
  Mutation,
  Link,
  User,
};

const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs: gql`
    ${fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8")}
  `,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
