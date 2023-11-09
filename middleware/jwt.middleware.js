const jwt = require("jsonwebtoken");
const User = require("./../models/User.model");
const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token found in the headers" });
    }
    token = token.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    req.userId = payload._id;
    next();
  } catch (error) {
    next(error);
  }
};
async function isAdmin(req, res, next) {
  try {
    const currentUser = await User.findById(req.userId);
    if (currentUser.role === "admin") {
      return next();
    } else {
      return res.status(401).json({ message: "Denied" });
    }
  } catch (error) {
    next(error);
  }
}
// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  isAdmin,
};
