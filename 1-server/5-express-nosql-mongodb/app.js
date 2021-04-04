const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

//import dari util/databases
//untuk menghubungkan ke server
const mongoConnect = require("./util/database").mongoConnect;

// import model USER
const User = require("./models/user");

const app = express().enable();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// middleware untuk membuat user sebelum inisiasi routing
app.use((req, res, next) => {
  User.findById("60656b70157194a68798482c")
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//menghubungkan ke database
mongoConnect(() => {
  app.listen(3000);
  console.log("Mendengarkan di port 3000...");
});
