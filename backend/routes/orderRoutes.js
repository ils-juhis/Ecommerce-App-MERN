const express = require("express");
const orderControllers = require("../controllers/orderControllers");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth")
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, orderControllers.newOrder)

router.route("/order/me").get(isAuthenticatedUser, orderControllers.myOrders)
//always write params route in last
router.route("/order/:id").get(isAuthenticatedUser, orderControllers.getSingleOrder)

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), orderControllers.getAllOrders);

router.route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), orderControllers.updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), orderControllers.deleteOrder);

module.exports = router;