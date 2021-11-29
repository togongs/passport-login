// 2
const passport = require("passport");
const local = require("./local"); // 로컬 로그인
const kakao = require("./kakao"); // 카카오 로그인
const { User } = require("../models");

// serializeUser는 사용자정보 객체를 세션에 아이디로 저장
// deserializeUser는 세션에 저장한 아이디를 통해 사용자정보 객체를 조회
// req.login 매서드가 passport.serializeUser 호출
// 카카오로그인은 req.login 내부적으로 호출하여 작성할 필요 없다.
// passport.session 미들웨어가 passport.deserializeUser 호출

module.exports = () => {
  // serializeUser는 로그인 시에만 실행
  // 사용자 정보 객체를 세션에 아이디로 저장
  passport.serializeUser((user, done) => {
    // 여기의 userid가 deserializeUser의 첫 번째 매개변수로 이동
    done(null, user.userid);
  });

  // 이미 로그인 한 유저. 매번 실행
  // 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는것
  passport.deserializeUser((userid, done) => {
    User.findOne({ where: { userid } })
      .then((user) => done(null, user)) // user를 req.user에 저장
      .catch((err) => done(err));
  });

  local();
  kakao();
};
