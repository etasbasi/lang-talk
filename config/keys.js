let mongoURI;

if (process.env.NODE_ENV === "production") {
  mongoURI =
    "mongodb://heroku_6xqmt9h8:pbf5nl11a1ar011d60dtl9cbfk@ds161183.mlab.com:61183/heroku_6xqmt9h8";
} else {
  mongoURI = "mongodb://localhost:27017/Lang-Talk";
}

module.exports = {
  mongoURI: mongoURI,
  secretOrKey: process.env.secret || "lkfdlajfklasfjdklfjldasfjad"
};
