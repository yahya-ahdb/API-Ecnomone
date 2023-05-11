const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/createError");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SEC, {
    expiresIn: "5s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SEC_Re);
};


exports.Refresh= (req,res)=>{
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

}

exports.Regitser = async (req, res, next) => {
  var slat = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, slat);
  try {
    const newuser = new User({
      ...req.body,
      password: hash,
    });
    await newuser.save();
    res.status(201).json({ newuser });
  } catch (err) {
    next(err);
  }
};
exports.Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Not found");
    } else {
      const isPassword = await bcrypt.compare(req.body.password, user.password);
      if (!isPassword) {
        return next(createError(400, "The UserName or password not found"));
      }
      const access_token = generateAccessToken(user);
      const refresh_token = generateRefreshToken(user);
      refreshTokens.push(refresh_token);
      res.json({
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        access_token,
        refresh_token,
      });
 
    }
  } catch (err) {
    res.status(500).json(err);
  }

};
