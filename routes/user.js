const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const auth = require("../middlewares/auth");
const passport = require("passport");

// router.get("/kakao", passport.authenticate("kakao")); // 카카오 로그인 기능
router.get(
  "/kakao/callback",
  passport.authenticate("kakao"),
  userController.passportLogin.kakaoLogin
); // 카카오 로그인 콜백(카카오에서 콜백 받는 동시에, 프론트와 통신)

module.exports = router;
