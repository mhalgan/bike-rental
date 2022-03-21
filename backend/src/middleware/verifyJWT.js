const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (requiredRole) => async (req, res, next) => {
  let token;

  const { authorization } = req.headers;
  if (authorization?.startsWith("Bearer")) {
    token = authorization.split(" ")[1];

    try {
      if (token) {
        const { id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        // Check if user still exists
        const user = await User.findById(id);
        if (!user) {
          res.status(401);
          next("Not authorized, user invalid");
        }

        if (requiredRole && user.role !== requiredRole) {
          res.status(401);
          next(`Not authorized, must be ${requiredRole}`);
        }

        req.locals = {
          user,
        };
        next();
      }
    } catch (error) {
      res.status(401);
      next("Not authorized, token invalid");
    }
  } else {
    res.status(401);
    next("There is no token attached to the header");
  }
};

module.exports = authMiddleware;
