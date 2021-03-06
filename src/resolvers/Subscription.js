const { PUB_LINK_KEY } = require("../utils");

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
