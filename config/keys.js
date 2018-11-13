// const secret = require("./secret.json").secret;

module.exports = {
  mongoURI:
    "mongodb://heroku_6xqmt9h8:pbf5nl11a1ar011d60dtl9cbfk@ds161183.mlab.com:61183/heroku_6xqmt9h8",
  secretOrKey: process.env.secret || "lkfdlajfklasfjdklfjldasfjad"
};
