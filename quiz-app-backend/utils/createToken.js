const jwt = require("jsonwebtoken");

const createTokenAndSaveCookie = (userId, res) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }

  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "5d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  });
};

module.exports = createTokenAndSaveCookie;