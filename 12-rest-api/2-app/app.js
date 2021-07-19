const express = require("express");
const cors = require("cors");

const blogRoutes = require("./routes/blog");

const app = express();

app.use(express.json()); // application/json
app.use(cors());

app.use("/blog", blogRoutes);

app.listen(8080, () => {
  console.log("Mendengarkan di 8080");
});
