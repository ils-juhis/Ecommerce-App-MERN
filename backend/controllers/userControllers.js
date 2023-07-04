const User = require("../models/userModel");
const Errorhandler = require("../utils/Errorhandlers");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const saltedMd5=require('salted-md5')
const path=require('node:path');
const { generateToken } = require("../utils/generateTokens");


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

    const tokens = await generateToken({id: newUser._id, role: newUser.role})
    newUser.refreshToken = tokens[1];
    await newUser.save();

    newUser.accessToken = tokens[0];
    newUser.refreshToken;

    res.status(200).json({success: true, user: newUser})
    
})

exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
  const {email, password, role} = req.body;
  if (!email || !password) {
    return next(new Errorhandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    return next(new Errorhandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched || role !==user.role) {
    return next(new Errorhandler("Invalid email or password", 401));
  }

  delete user.password;

  const tokens = await generateToken({id: user._id, role: user.role})
  res.cookie('jwt', tokens[1], { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

  return res.status(200).json({success: true, user:{
    id: user_id,
    name: user.name,
    email,
    avatar: user.avatar,
    role,
    accessToken: tokens[0],
    refreshToken: tokens[1]
}})

});
