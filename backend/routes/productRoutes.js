const express = require("express");
const productControllers = require("../controllers/productControllers");
const router = express.Router();

router.route('/products').get(productControllers.getAllProducts)
router.route("/product/new").post(productControllers.createProduct)
router.route("/product/:id")
    .put(productControllers.updateProduct)
    .delete(productControllers.deleteProduct)
    .get(productControllers.getProductDetails)

module.exports = router;