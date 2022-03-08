const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");

const register = async (req, res, next) => {
  //Check if user Exist
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) {
    res.status(StatusCodes.CONFLICT);
    return next("User already exists");
  }

  const { firstName, lastName, email, password } = req.body;
  try {
    //Register user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: "User",
    });
    res.json(user);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      role: userFound?.role,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    return next("Invalid Login Credentials");
  }
};

module.exports = { register, login };
