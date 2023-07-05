const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    //const token = req.headers['authorization'].replace("Bearer ", "")
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return next(new Errorhandler("Please Login to access this resource", 401));
    }

    jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET, async(err, decodedData)=>{
        if(err)
            return next(new Errorhandler("invalid token", 401));

        req.user = await User.findById(decodedData.id);
        next();
    })
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(
        new Errorhandler(`Role: ${req.user.role} is not allowed to access this resouce `, 403));
    }

    next();
    };
};

