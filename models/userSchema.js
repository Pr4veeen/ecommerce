const { name } = require("ejs")
const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required :true,
        unique : true
    },
    phone:{
        type : String,
        required : false,
        unique : false,
        sparse : true, 
        default : null
    },
    googleid:{
        type : String, 
        unique : true,
        //sparse: true, // Allows multiple `null` values
        //default: null // Ensures default is `null`
    },
    password:{
        type : String,
        required : false // for single signup not using password
    },
    isBlocked:{
        type : Boolean,
        default : false
    },
    isAdmin:{
        type : Boolean,
        default : false
    },
    cart:[{
        type:Schema.Types.ObjectId,
        ref:"Cart"
    }],
    wallet:{
        type : Schema.Types.ObjectId
    },
    whishlist:[{
        type : Schema.Types.ObjectId,
        ref : "Whishlist"
    }],
    orderHistory:[{
        type : Schema.Types.ObjectId,
        ref : "Order"
    }],
    createdon:{
        type: Date,
        default : Date.now
    },
    refferalCode:{
        type : String
    },
    redeemed:{
        type : Boolean 
    },
    redeemedUsers:[{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    searchHistory:[{
        category : {
        type : Schema.Types.ObjectId,
        ref : "category"
        }, 
        brand : {
            type : String
        },
        searchOn : {
            type : Date,
            default : Date.now
        }
    }]
})

const User = mongoose.model("User",userSchema,"users")

module.exports = User