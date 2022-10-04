const asyncHandler = require("express-async-handler");
const User = require("../models/users-model");
const generateToken = require("../config/token");


//API for user registration
const signup = asyncHandler(async(req,res) => {
    const {username,email,password,walletAddress, aadharNo,isWeb3,img,coverImg, bio,socials} = req.body;

    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        username,
        email,
        password,
        walletAddress,
        aadharNo,
        isWeb3,
        img,
        coverImg,
        bio,
        socials
    })
    if(user){
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          walletAddress: user.walletAddress,
          aadharNo: user.aadharNo,
          isWeb3: user.isWeb3,
          img: user.img,
          coverImg: user.coverImg,
          bio: user.bio,
          socials: user.socials,
          token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("Failed to create user");
    }
});

//API for login
const login = asyncHandler(async (req,res) =>{
  const {email,password} = req.body;

  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))){
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      walletAddress: user.walletAddress,
      aadharNo: user.aadharNo,
      isWeb3: user.isWeb3,
      img: user.img,
      coverImg: user.coverImg,
      bio: user.bio,
      socials: user.socials,
      token: generateToken(user._id),
    });
  }else{
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
})


module.exports = {signup,login};
