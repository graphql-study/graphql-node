function newLinkSubscribe() {}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newLink,
};
