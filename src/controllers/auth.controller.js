import wrapAsync from "../utils/wrapAsync.js";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";

export const registerUser = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, user } = await registerUserService(name, email, password);
  if (!token) {
    res.status(404).json({ message: "token not found" });
  }

  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ user : user,message: "register successfully" });
});

export const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUserService(email, password);

  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ user:user,message: "login successfully" });
});


export const logoutUser = wrapAsync(async(req,res)=>{
    res.clearCookie("accessToken",cookieOptions);
    res.status(200).json({message:"logout successfully"})
})

export const getCurrentUser = wrapAsync(async(req,res)=>{
     res.status(200).json({user:req.user,message:"user fetch successfully"})
})