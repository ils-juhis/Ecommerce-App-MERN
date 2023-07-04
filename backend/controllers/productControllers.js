const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorHandlers");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures")

exports.createProduct = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.create(req.body);
        res.status(201).json({
            sucess: true,
            product
        })
})

exports.getAllProducts = catchAsyncErrors(async(req, res, next)=>{
    const resultPerPage =5;
    const apiFeature = new ApiFeatures(Product.find(), req.query.keyword).search().filter().pagination(resultPerPage)
    console.log(req.query)
    const products = await apiFeature.query;
    res.status(200).json({success: true, products})
})

exports.getProductDetails = catchAsyncErrors( async (req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("Product not found", 404))
    }
    res.status(200).json({success: true, product})
})

exports.updateProduct = catchAsyncErrors (async(req, res, next)=>{
    let product = await Product.findById(req.params.id);
        if(!product){
            return next(new Errorhandler("Product not found", 404))
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({success: true, product})
})

exports.deleteProduct = catchAsyncErrors(async(req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("Product not found", 404))
    }

    product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({success: true, message: "Product deleted successfuly"})

})
