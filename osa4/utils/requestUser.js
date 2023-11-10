const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userGetter = async (request, response, next) => {
  if (request.token) {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      request.user = await User.findById(decodedToken.id);
    } catch (error) {
      response.status(401).json({ error: "invalid token" });
    }
  }

  next();
};

module.exports = userGetter;
