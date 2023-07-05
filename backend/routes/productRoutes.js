const express = require("express");
const productControllers = require("../controllers/productControllers");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth")
const router = express.Router();

router.route('/products').get( productControllers.getAllProducts)

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), productControllers.createProduct)

router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), productControllers.updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), productControllers.deleteProduct)

router.route("/product/:id").get(productControllers.getProductDetails)

router.route("/review").put(isAuthenticatedUser, productControllers.createProductReview)

router.route("/reviews")
  .get(productControllers.getProductReviews)
  .delete(isAuthenticatedUser, productControllers.deleteReview);
  
module.exports = router;