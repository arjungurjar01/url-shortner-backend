import ShortUrl from "../models/shortUrl.model.js";
import User from "../models/user.model.js"


export const findUserByEmail = async(email) =>{
    return await User.findOne({email}) ;
}

export const findUserById = async(id) =>{
    return await User.findById(id) ;
}

export const createUser = async(name,email,password) =>{
    const newUser = new User({name,email,password});
    await newUser.save() ;
    return newUser ; 
} 

export const getAllUserUrlsDao = async(userId) =>{
    if (!userId) {
    throw new Error("User ID is required to fetch URLs")
  }
  try {
    const urls = await ShortUrl.find({ user: userId })
    return urls 
  } catch (error) {
    console.error("Error fetching URLs for user:", error)
    throw error
  }
}