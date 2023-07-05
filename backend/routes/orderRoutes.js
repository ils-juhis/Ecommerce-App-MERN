const express = require("express");
const orderControllers = require("../controllers/orderControllers");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth")
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, orderControllers.newOrder)

router.route("/order/me").get(isAuthenticatedUser, orderControllers.myOrders)
//always write params route in last
router.route("/order/:id").get(isAuthenticatedUser, orderControllers.getSingleOrder)



module.exports = router;