const { PUB_LINK_KEY } = require("../utils");

/**
 * you can test a graphql subscription in playground

 subscription {
    newLink {
      id
      url
      description
      postedBy {
        id
        name
        email
      }
    }
  }
 */
function newLinkSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator(PUB_LINK_KEY);
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newLink,
};
