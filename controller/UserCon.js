const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.updateUser = async (req, res) => {
  if (req.body.password) {
    const user = await User.findOne({ username: req.body.username });
    var slat = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, slat);
    // const isPassword = await bcrypt.compare(req.body.password, user.password);
  }
  try {
    const update = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body, password: hash },
      },
      { new: true }
    );
    res.status(200).json({ update });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(202).json("Delete user sccussfuly");
  } catch (err) {
    next(err);
  }
};

exports.GetUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others });
  } catch (err) {
    next(err);
  }
};

exports.GetUsers = async (req, res, next) => {
  const query = req.query.new;
  try {
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};

exports.GetStats = async (req, res, next) => {
  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastyear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
