const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures")

exports.createProduct = catchAsyncErrors(async(req, res, next)=>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
        res.status(201).json({
            sucess: true,
            product
        })
})

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  // apiFeature.pagination(resultPerPage);

  // products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

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

//Create new review or update review
exports.createProductReview = catchAsyncErrors(async(req, res, next)=>{
    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach(element => {
            if(element.user.toString() === req.user._id.toString()){
                element.rating = rating;
                element.comment = comment;
            }
        });
    }else{
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length
    }

    let avg=0;
    product.rating = product.reviews.forEach(rev=>{
        avg += rev.rating
    })/product.reviews.length;

    await product.save({validateBeforeSave: false})

    res.status(200).json({success: true})
})

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
      return next(new Errorhandler("Product not found", 404));
    }
  
    res.status(200).json({ success: true, reviews: product.reviews});
  });


// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new Errorhandler("Product not found", 404));
    }
  

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.reviewId.toString());
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({ success: true});
  });