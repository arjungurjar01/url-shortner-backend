import mongoose from "mongoose" ;

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI ||  "mongodb://localhost:27017/url_shortner"); 
        console.log(`mongodb is connected successfully on : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        
    }
}

export default connectDB ; 