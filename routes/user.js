const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const auth = require("../middlewares/auth");

router.post("/signup", userController.signUp, auth);
router.post("/signin", userController.signIn, auth);

module.exports = router;
