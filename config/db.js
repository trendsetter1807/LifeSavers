const mongoose=require("mongoose");

const connectDb=async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    } catch (error) {
        
    }
}

module.exports=connectDb;