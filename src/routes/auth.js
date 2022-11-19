const express = require("express");
const router = express.Router();

// MIDDLEWARE
const { authentication } = require("../middleware/authentication");

// CONTROLLERS
const { register, login, logout, getUserData } = require("../controllers/auth");

// ROUTES
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/get-user-data").get(authentication, getUserData);

module.exports = router;
