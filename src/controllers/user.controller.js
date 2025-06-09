import { getAllUserUrlsDao } from "../dao/user.js";
import wrapAsync from "../utils/wrapAsync.js";

export const getAllShortUrls = wrapAsync(async(req,res)=>{
    const {_id} = req.user ;
    if (!_id) {
    return res.status(400).json({ message: 'User ID is missing from request' })
  }
    const urls = await getAllUserUrlsDao(_id);
    res.status(200).json({message:"urls fetch successfully",urls})
}) 