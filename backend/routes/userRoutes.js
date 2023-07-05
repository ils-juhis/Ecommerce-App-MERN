const express = require("express");
const userControllers = require("../controllers/userControllers");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth")
const router = express.Router();
const multer=require('multer')
const upload=multer({storage: multer.memoryStorage()})


router.route('/register').post(upload.single("image"), userControllers.registerUser)

router.route('/login').post(userControllers.loginUser)

router.route('/logout').get(userControllers.logout)

router.route('/password/forgot').post(userControllers.forgotPassword)

router.route('/password/reset/:resetToken').put(userControllers.resetPassword)

router.route('/me').get(isAuthenticatedUser , userControllers.getUserDetails)

router.route('/password/update').put(isAuthenticatedUser , userControllers.updatePassword)

router.route('/me/update').put(isAuthenticatedUser , userControllers.updateProfile)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles("admin"), userControllers.getAllUser)

router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles("admin"), userControllers.getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), userControllers.updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), userControllers.deleteUser)

module.exports = router;