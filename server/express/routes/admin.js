const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productsController.getProduct);

// /admin/add-product => POST
router.post("/add-product", productsController.postProduct);

module.exports = router;
