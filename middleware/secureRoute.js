import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const secureRoute = async (req, res, next) => {
  console.log("Route Secured ############");
  const loginUrl = "/auth/login";

  // Verify token in cookies
  const { _token } = req.cookies;
  if (!_token) {
    return res.redirect(loginUrl);
  }

  // Verify token
  try {
    // Check if the token exist, isValid and has not expired
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    const user = await User.scope("deleteAttrs").findByPk(decoded.id);
    // If user exist then save his data to the request
    if (user) {
      req.user = user;
    } else {
      return res.redirect(loginUrl);
    }

    next();
  } catch (error) {
    console.log("Error: " + error);
    return res.clearCookie("_token").redirect(loginUrl);
  }

};

export default secureRoute;
