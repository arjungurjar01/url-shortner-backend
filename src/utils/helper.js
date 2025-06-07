import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

export const generateNanoId = (length) => {
  return nanoid(length);
};

export const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decoded.id;
};
