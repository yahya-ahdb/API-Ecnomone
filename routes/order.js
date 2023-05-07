const express = require("express");
const { verifyAdmin, verifyUser } = require("../utils/TokenVerify");
const {
  CreateOrder,
  GetOrders,
  GetOrder,
  UpdateOrder,
  DeleteOrder,
  Income,
} = require("../controller/OrderCon");

const router = express.Router();
router.route("/").post(verifyAdmin, CreateOrder).get(verifyAdmin, GetOrders)
.get( verifyAdmin , GetOrders )
router.get("/income" , verifyAdmin , Income )

router.get("/find/:id", verifyUser , GetOrder);

router
  .route("/:id")
  .put(verifyAdmin, UpdateOrder)
  .delete(verifyAdmin, DeleteOrder);


module.exports = router;
