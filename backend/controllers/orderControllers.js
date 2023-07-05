const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//create order
exports.newOrder = catchAsyncErrors(async(req, res, next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });

      res.status(201).json({ success: true, order });

})

exports.getSingleOrder = catchAsyncErrors(async(req, res, next)=>{
  const order = await Order.findById(req.params.id).populate("user", " name email")
  if(!order){
    return next( new Errorhandler("Order not found with this id", 404))
  }

  res.status(200).json({success: true, order})
})

exports.myOrders = catchAsyncErrors(async(req, res, next)=>{
  console.log("hi")
  const orders = await Order.find({user:req.user._id})

  res.status(200).json({success: true, orders})
})