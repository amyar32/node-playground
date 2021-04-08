require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// MONGOOSE HERE
const mongoose = require("mongoose");

// Express-Session Here
const session = require("express-session");

// SESSION MONGODB
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./models/user");

const errorController = require("./controllers/error");

const app = express().enable();

// SESSION STORE Initialize
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "yourmomhehe",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// app.use((req, res, next) => {
//   User.findById("606a0cdc5e9aa12fb4ad243d")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

//menghubungkan ke database
mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          username: "amyar32",
          email: "someemail@gmail.com",
          cart: { items: [] },
        });
        user.save();
      } else {
        console.log("User Found!" + " = " + user._id);
      }
    });
    console.log("Listening...");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
