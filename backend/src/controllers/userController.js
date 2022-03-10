const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  //Check if user Exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(StatusCodes.CONFLICT);
    return next("User already exists");
  }

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

const login = async (req, res, next) => {
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.findOne({ email }).select("+password");
  if (userFound && (await userFound.verifyPassword(password))) {
    const { id, firstName, lastName, email, role } = userFound;

    res.json({
      id,
      firstName,
      lastName,
      email,
      token: jwt.sign({ id, role }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "20d",
      }),
    });
  } else {
    res.status(401);
    return next("Invalid Login Credentials");
  }
};

module.exports = { register, login };
