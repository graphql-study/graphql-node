const { PUB_LINK_KEY, PUB_VOTE_KEY } = require("../config");

function newLinkSub(parent, args, context, info) {
  return context.pubsub.asyncIterator(PUB_LINK_KEY);
}

function newVoteSub(parent, args, context, info) {
  return context.pubsub.asyncIterator(PUB_VOTE_KEY);
}

/*
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
const newLink = {
  subscribe: newLinkSub,
  resolve: (payload) => payload,
};

/*
  subscription {
    newVote {
      id
      link {
        url
        description
      }
      user {
        name
        email
      }
    }
  }
*/
const newVote = {
  subscribe: newVoteSub,
  resolve: (payload) => payload,
};

module.exports = {
  newLink,
  newVote,
};
