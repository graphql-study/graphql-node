const dotenv = require("dotenv");
const { APP_SECRET, PUB_LINK_KEY, PUB_VOTE_KEY } = dotenv.config().parsed;

module.exports = {
  APP_SECRET,
  PUB_LINK_KEY,
  PUB_VOTE_KEY,
};
