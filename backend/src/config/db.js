import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected at ${connection.connection.host}`);
    }
    catch(error){
        console.log(`Error in connecting database:${error}`);
        exit(1);
    }
}

export default connectDB;

