const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

//import dari util/databases
//untuk menghubungkan ke server
const mongoConnect = require("./util/database").mongoConnect;

const app = express().enable();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//menghubungkan ke database
mongoConnect(() => {
    app.listen(3000);
    console.log("Listening on port 3000");
});
