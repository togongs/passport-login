const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { User } = require("../models");
require("dotenv").config();

module.exports = () => {
  console.log("hihihii");
  passport.use(
    "kakao",
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);
        const email = profile["_json"].kakao_account.email;
        let nickname = profile.displayName;
        const userInfo = await User.findOne({
          where: { userid: profile.id },
        });

        if (!userInfo) {
          const newUser = await User.create({
            email: email,
            nickname,
          });
          console.log("회원 가입 햇음 passport/index로 넘어감");
          return done(null, newUser);
        }
        console.log("회원 있다고 함 그래서 passport/index 넘어감");
        return done(null, userInfo);
      }
    )
  );
};
