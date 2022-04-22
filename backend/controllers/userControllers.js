const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const {
    fname,
    lname,
    email,
    password,
    mnumber,
    hno,
    street,
    city,
    province,
    pic,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    fname,
    lname,
    email,
    password,
    mnumber,
    hno,
    street,
    city,
    province,

    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      mnumber: user.mnumber,
      hno: user.hno,
      street: user.street,
      city: user.city,
      province: user.province,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      mnumber: user.mnumber,
      hno: user.hno,
      street: user.street,
      city: user.city,
      province: user.province,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password!");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.email = req.body.email || user.email;
    user.mnumber = req.body.mnumber || user.mnumber;
    user.hno = req.body.hno || user.hno;
    user.street = req.body.street || user.street;
    user.city = req.body.city || user.city;
    user.province = req.body.province || user.province;
    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      lname: updatedUser.lname,
      email: updatedUser.email,
      mnumber: updatedUser.mnumber,
      hno: updatedUser.hno,
      street: updatedUser.street,
      city: updatedUser.city,
      province: updatedUser.province,
      pic: updatedUser.pic,

      token: generateToken(updatedUser._id),
    });
  }

  else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
