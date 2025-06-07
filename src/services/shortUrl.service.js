import { generateNanoId } from "../utils/helper.js";
import shortUrlSchema from "../models/shortUrl.model.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlServiceWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  await saveShortUrl(shortUrl, url);
  // res.send(nanoid(7));
  return shortUrl;
};

export const createShortUrlServiceWithUser = async (
  url,
  userId,
  slug = null
) => {
  const shortUrl = slug || generateNanoId(7);
  const exists = await getCustomShortUrl(slug);
  if (exists) throw new Error("This Custom Url Is Already Exists");
  await saveShortUrl(shortUrl, url, userId);
  // res.send(nanoid(7));
  return shortUrl;
};
