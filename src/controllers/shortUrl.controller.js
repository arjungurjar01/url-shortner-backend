import { getShortUrl } from "../dao/shortUrl.js";
import {
  createShortUrlServiceWithoutUser,
  createShortUrlServiceWithUser,
} from "../services/shortUrl.service.js";
import wrapAsync from "../utils/wrapAsync.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  //    console.log("controller - create short url : ",url,slug,req.user)

  let shortUrl;

  if (req.user) {
    shortUrl = await createShortUrlServiceWithUser(url, req.user._id, slug);
  } else {
    shortUrl = await createShortUrlServiceWithoutUser(url);
  }
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

// export const createCustomShortUrl = wrapAsync(async(req,res)=>{
//     const {url,slug} = req.body ;
//     const shortUrl = await createShortUrlServiceWithUser(url,slug);
//     res.status(200).json({shortUrl:process.env.APP_URL + shortUrl})
// })

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) throw new Error("Short URL not found");
  res.redirect(url.full_url);
});
