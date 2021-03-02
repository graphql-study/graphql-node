const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");
// const Query = require("./resolvers/Query");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const Query = {
  info: () => `This is the API of a Hackernews Clone`,
  feed: () => links,
};

const Link = {
  id: (parent) => parent.id,
  description: (parent) => parent.description,
  url: (parent) => parent.url,
};

const resolvers = {
  Query,
  Link,
};

const server = new ApolloServer({
  typeDefs: gql`
    ${fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8")}
  `,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
