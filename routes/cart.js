const express = require("express");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../utils/TokenVerify");
const {
  UpadteCart,
  DeleteCart,
  GetCarts,
  CreateCart,
  GetUserAdd,
} = require("../controller/CartCon");

const router = express.Router();

router.route("/").post(verifyUser, CreateCart).get(verifyAdmin, GetCarts);

router.route("/:id").put(verifyUser, UpadteCart).delete(verifyUser, DeleteCart);

router.get("/find/:userId", verifyUser, GetUserAdd);

module.exports = router;
