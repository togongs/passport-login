const express = require("express");
const app = express();
const { sequelize } = require("./models");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const passportConfig = require("./passport/index.js");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  const title = "YJ's playground";
  res.render("index", { title });
});

passportConfig(); // 패스포트 설정
dotenv.config();

//sequelize 초기화
sequelize
  .sync({ force: false }) // true설정 시, 서버 실행 시마다 테이블 재생성
  .then(() => console.log("데이터베이스 연결 성공!"))
  .catch((err) => console.error(err));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session 미들웨어
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

//router
const router = require("./routes");

// passport 로컬,카카오로그인
app.use(passport.initialize()); // req객체에 passport설정
app.use(passport.session()); // req.session객체에 passport설정. deserializeUser 호출

//routing
app.use("/", router);

//errorHandler
app.use((err, req, res, next) => {
  //   res.locals.message = err.message;
  //   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
