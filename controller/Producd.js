const Product = require("../models/Product");

exports.CreateProduct = async (req, res, next) => {
  try {
    const product = new Product({...req.body});
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const update = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    res.status(200).json({ update });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(202).json("Delete Product sccussfuly");
  } catch (err) {
    next(err);
  }
};

exports.GetProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

exports.GetProducts = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
};
