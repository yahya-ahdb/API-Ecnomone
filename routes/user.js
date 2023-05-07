const express = require("express");
const {
  GetUser,
  updateUser,
  deleteUser,
  GetUsers,
  GetStats,
} = require("../controller/UserCon");
const { verifyAdmin, verifyUser } = require("../utils/TokenVerify");

const router = express.Router();

router
  .route("/:id")
  .put(verifyUser, updateUser)
  .delete(verifyUser, deleteUser)

  router.get( "/find/:id", verifyUser, GetUser);

router.get("/", verifyAdmin, GetUsers);

router.get("/stats", verifyAdmin, GetStats);

module.exports = router;
