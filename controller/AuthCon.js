const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/createError");
const jwt = require("jsonwebtoken");

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
      const access_token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      const { password, ...others } = user._doc;
      res.cookie("access_token",access_token,{httpOnly:true})
      res.status(200).json({ ...others, access_token });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
