const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  console.log(req.headers.authorization);
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");
  if (tokenType !== "Bearer") {
    res.status(401).send({ result: "fail", msg: "로그인 후 사용하세요" });
  }
  try {
    if (tokenValue) {
      // jwt.sign에 넣은 값
      const { email } = jwt.verify(tokenValue, process.env.SECRET_KEY);
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res
          .status(401)
          .send({ success: "fail", msg: "유저를 찾을 수 없습니다." });
        return;
      }
      res.locals.user = user.email;
      next();
    }
  } catch (err) {
    next(err);
  }
};
