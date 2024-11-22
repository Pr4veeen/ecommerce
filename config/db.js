const monggose = require("mongoose");
const env = require("dotenv").config();



const connectDb = async ()=>{
    try {
        
        await monggose.connect(process.env.MONGODB_URI);
        console.log("mongoDB connected");
        
    } catch (error) {

        console.log("DB connection error",error.message);
        process.exit(1)
        
    }
}

module.exports = connectDb