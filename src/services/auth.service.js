import { createUser, findUserByEmail } from "../dao/user.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUserService = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) throw new ConflictError("User already exists");

  const newUser = await createUser(name, email, password);
  const token = signToken({ id: newUser._id });
  return { token, user };
};

export const loginUserService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user || user.password === password)
    throw new Error("Invalide Crediantials");

  const token = signToken({ id: user._id });
  return { token, user };
};
