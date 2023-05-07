const express = require("express");
const { verifyAdmin } = require("../utils/TokenVerify");
const {
  CreateProduct,
  deleteProduct,
  GetProduct,
  GetProducts,
  updateProduct,
} = require("../controller/Producd");
const router = express.Router();

router.route("/").post(verifyAdmin, CreateProduct).get(GetProducts);

router.get("/find/:id", GetProduct);

router
  .route("/:id")
  .put(verifyAdmin, updateProduct)
  .delete(verifyAdmin, deleteProduct);

module.exports = router;
