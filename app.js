import express from "express" ;
import dotenv from "dotenv" ;
import connectDB from "./src/config/mongodb.config.js";
import shortUrlRouter from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";

dotenv.config("./.env");

const app = express() ;

app.use(express.json());
app.use(express.urlencoded({extended:true})); 

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