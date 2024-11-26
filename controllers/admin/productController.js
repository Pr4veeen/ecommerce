
const Product  = require("../../models/productSchema");
const Category = require("../../models/categorySchema");
const User = require("../../models/userSchema")

const fs = require("fs");
const path = require("path")
const sharp = require("sharp");


const productAddPage = async(req,res)=>{
    try {

        const category = await Category.find({isListed:true});

        res.render("product-page",
            {cat:category});
        
    } catch (error) {

        res.redirect("/pageerror")
        
    }
}





module.exports = {
    productAddPage
}
