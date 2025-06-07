import express from "express" ;
import dotenv from "dotenv" ;
import connectDB from "./src/config/mongodb.config.js";
import shortUrlRouter from "./src/routes/shortUrl.route.js";
import authRouter from "./src/routes/auth.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config("./.env");

const app = express() ;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser());
app.use(attachUser);

app.use('/api/auth',authRouter);
app.use('/api/create',shortUrlRouter);
app.get('/:id',redirectFromShortUrl);

app.get('/',(req,res)=>{
    res.send('app is live');  
})

app.use(errorHandler);

connectDB().then(()=>{
    app.listen(3000,()=>{
    console.log('app is listen on port 3000'); 
}) }) 


//GET - Redirect
//POST - Create short url 