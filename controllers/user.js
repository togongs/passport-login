const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");

const passportLogin = {
  // 로그인
  localLogin: async (req, res, next) => {
    try {
      // passport/index.js로 실행 됨
      passport.authenticate("local", (passportError, user, info) => {
        // 인증이 실패했거나 유저 데이터가 없다면 에러 발생
        if (passportError) {
          console.error("passportError:", passportError);
          return res.status(500).send({ message: passportError });
        }
        // user를 조회하지 못할 경우
        if (!user) {
          res.status(400).send({ message: info.message });
          return;
        }
        // user데이터를 통해 로그인 진행
        req.login(user, { session: false }, (loginError) => {
          if (loginError) {
            res.send(loginError);
            return;
          }

          //회원정보 암호화
          const token = jwt.sign(
            { userid: user.userid },
            process.env.SECRET_KEY
          );
          message = "로그인에 성공하셨습니다.";
          res.status(201).send({ token, user, message });
        });
      })(req, res, next);
    } catch (err) {
      console.error(err);
      message = "알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
      next(err);
    }
  },
  kakaoLogin: async (req, res) => {
    try {
      console.log("넘어옴");
      console.log("-----------------------------------------");
      console.log(req.session); // req.session에 저장된 유저와 같은지 비교
      const user = req.user;
      const token = jwt.sign({ userid: user.userid }, process.env.SECRET_KEY);
      res
        .status(201)
        .send({ result: "success", msg: "로그인에 성공하였습니다.", token });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        result: "fail",
        msg: "알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  },
};

module.exports = { passportLogin };
