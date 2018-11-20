const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

// DB config
const db = require("./config/keys").mongoURI;

// connect to mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to DB"));

const port = process.env.PORT || 5000;

// Passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

app.get("/test", (req, res) => res.json({ msg: "/ Works" }));

app.use("/api/users/", users);
app.use("/api/profile/", profile);
app.use("/api/posts", posts);

app.listen(port, () => console.log("Server is up on port " + port));
