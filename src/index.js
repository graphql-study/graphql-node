const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const Query = {
  info: () => `This is the API of a Hackernews Clone`,
  feed: async (parent, args, context) => {
    return context.prisma.link.findMany();
  },
};

const Mutation = {
  post: (parent, args, context, info) => {
    const newLink = context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
      },
    });
    return newLink;
  },
};

const Link = {
  id: (parent) => parent.id,
  description: (parent) => parent.description,
  url: (parent) => parent.url,
};

const resolvers = {
  Query,
  Mutation,
  Link,
};

const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs: gql`
    ${fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8")}
  `,
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
