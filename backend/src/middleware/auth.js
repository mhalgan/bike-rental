const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token;

  const { authorization } = req.headers;
  if (authorization?.startsWith("Bearer")) {
    token = authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        next();
      }
    } catch (error) {
      throw new Error("Not authorized token invalid, login again");
    }
  } else {
    throw new Error("There is no token attached to the header");
  }
};

module.exports = authMiddleware;
