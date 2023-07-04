const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();
const multer=require('multer')
const upload=multer({storage: multer.memoryStorage()})


router.route('/register').post(upload.single("image"), userControllers.registerUser)
router.route('/login').post(userControllers.loginUser)

module.exports = router;