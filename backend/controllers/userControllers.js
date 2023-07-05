const User = require("../models/userModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const saltedMd5=require('salted-md5')
const path=require('node:path');
const { generateToken } = require("../utils/generateTokens");
const jwt = require('jsonwebtoken')
const {sendMail} = require("../utils/sendMail");
const crypto = require("node:crypto");


exports.registerUser = catchAsyncErrors(async(req, res, next)=>{
    
    let {name, email, password, role} = req.body;
    const user = await User.findOne({email});

    if(user){
        return next(new Errorhandler("user already exists", 409))
    }

    // //uploading image
    // const fileName = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
    // const fileFullName = fileName + path.extname(req.file.originalname)
    // await global.bucket.file(`files/${fileFullName}`).createWriteStream().end(req.file.buffer)

    
    const newUser = new User({
        name,
        email,
        password,
        role,
        avatar: {
          url: "bf"
        },
      });

    const tokens = await generateToken(newUser._id, res)
    newUser.refreshToken = [tokens.refresh];
    await newUser.save();

    delete newUser.password;
    newUser.accessToken = tokens.access;
    newUser.refreshToken = tokens.refresh;

    res.status(200).json({success: true, user: newUser})
    
})

exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
  const {email, password} = req.body;
  if (!email || !password) {
    return next(new Errorhandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    return next(new Errorhandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid email or password", 401));
  }


  const tokens = await generateToken(user._id, res)
  User.updateOne({_id: user._id}, {$set: {refreshToken: tokens.refresh}})

  return res.status(200).json({success: true, user:{
    id: user._id,
    name: user.name,
    email,
    avatar: user.avatar,
    role: user.role,
    accessToken: tokens.access,
    refreshToken: tokens.refresh
  }})

});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  const cookies = req.cookies;

  if (cookies?.refreshToken){
    const refreshToken = cookies.refreshToken;
    const decodedData = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET)
    const update = {
      $pull: {
        refreshToken: {
          value: refreshToken
        }
      }
    };
    
    User.updateOne({ _id: decodedData.id }, update);
  }
  res.clearCookie('accessToken', { httpOnly: true});
  res.clearCookie('refreshToken', { httpOnly: true});
  res.status(200).json({success: true, message:'Logged out successfully.'});
})


exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
  const user = await User.findOne({email: req.body.email});
  
  if(!user){
    return next(new Errorhandler("User not found", 404))
  }

  //get ResetPassword Token
  const resetToken = await user.getResetpasswordToken();
  await user.save({validateBeforeSave: false});

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
  console.log(resetPasswordUrl)
  try {
    await sendMail({
      email: user.email,
      resetPasswordUrl
    });
    res.status(200).json({success: true, message: `Email sent to ${user.email} successfully.`})
    
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave: false});

    return next(new Errorhandler(error.message, 500))
  }
})

exports.resetPassword = catchAsyncErrors(async(req, res, next)=>{
  const hashToken = crypto.createHash("sha256").update( req.params.resetToken).digest("hex")
  const user = await User.findOne({resetPasswordToken: hashToken, resetPasswordExpire: {$gt: Date.now()}})

  if(!user){
    return next(new Errorhandler("Reset Password token is invalid or has been expired.", 400))
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new Errorhandler("Password doesn't match.", 400))
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save()
  res.status(200).json({success: true, message:'Password changed successfully.'});

})

exports.getUserDetails = catchAsyncErrors(async(req, res, next)=>{
  res.status(200).json({success: true, user: req.user})
})

exports.updatePassword = catchAsyncErrors(async(req, res, next)=>{
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched  = await user.comparePassword(req.body.oldPassword)

  if(!isPasswordMatched){
    return next(new Errorhandler("Old password is incorrect", 400))
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new Errorhandler("Password doesn't match", 400))
  }
  user.password = req.body.newPassword;
  await user.save();

  const tokens = generateToken(user._id, res)
  delete user.password;
  user.accessToken = tokens.access;
  user.refreshToken = tokens.refresh;
  res.status(200).json({success: true, user});
})

// update User Profile
exports.updateProfile = catchAsyncErrors(async(req, res, next)=>{
  
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({success: true, user});
})

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({success: true, users});
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id).select(['-refreshToken', '-resetPasswordToken', '-password']);

  if (!user) {
    return next( new Errorhandler(`User does not exist with Id: ${req.params.id}`));
  }
  res.status(200).json({success: true, user});
})

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({success: true});
});

//delete user (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  await User.deleteOne({_id: req.params.id});

  res.status(200).json({ success: true,message: "User Deleted Successfully"});
});