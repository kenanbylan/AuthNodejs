const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const createToken = async (user, res) => {
  console.log(user);

  const payload = {
    sub: user._id, // <--- jwt.io will show this as "sub"
    name: user.name,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token: token,
    message: "Login successfully",
  });
};

const tokenCheck = async (req, res, next) => {
  const headerToken =
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer ");
  // if (typeof headerToken !== "undefined") {
  //   const bearer = headerToken.split(" ");
  //   const bearerToken = bearer[1];
  //   req.token = bearerToken;
  // }

  console.log("headerToken, ", headerToken);

  if (!headerToken) {
    throw new APIError("Token not found", 401);
  }

  const token = req.headers.authorization.split(" ")[1];

  console.log("token, ", token);

  //dönen token , kontrol edilir ve geçersiz ise token çözümlenmez.
  await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new APIError("Invalid token", 401);
    }

    const userInfo = User.findById(decoded.sub).select(
      "_id name surname email phone password"
    );

    if (!userInfo) {
      throw new APIError("User not found", 401);
    }

    req.user = userInfo; // <--- req.user is now available in the next middleware

    next();
  });
};

module.exports = {
  createToken,
  tokenCheck,
};
