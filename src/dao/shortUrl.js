import shortUrlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, url, userId) => {
  try {
    const newUrlData = {
      full_url: url,
      short_url: shortUrl,
      ...(userId && { user: userId }),
    };

    const newUrl = new shortUrlSchema(newUrlData);

    await newUrl.save();
  } catch (error) {
    if (error.code == 11000) {
      throw new ConflictError("Short Url Is Already Exists");
    }
    throw new Error(error);
  }
};

export const getShortUrl = async (id) => {
  return await shortUrlSchema.findOneAndUpdate(
    { short_url: id },
    { $inc: { clicks: 1 } }
  );
};

export const getCustomShortUrl = async (slug) => {
  return await shortUrlSchema.findOne({ short_url: slug });
};
