const express = require("express");
const router = express.Router();

// MIDDLEWARE
const { authentication } = require("../middleware/authentication");

// CONTROLLERS
const {
  allProducts,
  addProduct,
  userAllProducts,
} = require("../controllers/product");

// ROUTES
router.route("/product/new").post(authentication, addProduct);
router.route("/products/user").get(authentication, userAllProducts);

// PUBLIC ROUTES
router.route("/products").get(allProducts);

module.exports = router;
