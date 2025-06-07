import { verifyToken } from "./helper.js";
import { findUserById } from "../dao/user.js";

export const attachUser = async (req, res, next) => {
  try {
    // console.log(req.cookies?.accessToken)
    const token = req.cookies?.accessToken; // "token" is the cookie name

    if (!token) {
      return next();
    }

    const decoded = await verifyToken(token);
    // console.log(decoded,"decode")

    const user = await findUserById(decoded);
    // console.log(user,"user");

    if (!user) return next();
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};
