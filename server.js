require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session")

var db = require("./models");

var passport = require("./config/passport.js")

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// app.use(session({secret : PerformanceObserverEntryList.env.SESSION_SECRET || "the keyboard cat ate my mouse", resave:}))
// app.use(passport.initialize());
// app.use(passport.session());


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/profileAPIRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/favoriteAPIRoutes")(app);
require("./routes/user-apiRoutes")(app)
var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
