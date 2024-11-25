
const User = require("../../models/userSchema")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const pageerror = async(req,res)=>{
    
    res.render("admin-error")
}

const loadLogin = (req,res)=>{

    if(req.session.admin){
        return res.redirect("/admin/dashboard")
    }

    res.render("admin-login",{message:null})

}

const login = async(req,res)=>{
    try {

        const {email,password} = req.body;
        const admin = await User.findOne({email,isAdmin:true})

        if(admin){

            const passwordMatch = await bcrypt.compare(password,admin.password);
            if (passwordMatch) {
                // Set admin session
                req.session.admin = true;
                return res.redirect("/admin");
            } else {
                // Render login page with error message for invalid password
                return res.render("admin-login", { message: "Invalid password. Please try again." });
            }
        } else {
            // Render login page with error message for non-existent admin
            return res.render("admin-login", { message: "Admin not found. Please check your email." });
        }
    } catch (error) {
        console.error("Admin Login error:", error);
        return res.redirect("/pageerror");
    }
};

const loadDashboard = async(req,res)=>{

    if(req.session.admin){
        try {
            res.render("dashboard");
            
        } catch (error) {
            res.redirect("/pageerror")
            
        }
    }     
}

const logout = async(req,res)=>{
    try {

        req.session.destroy(err=>{
            if(err){
                console.log("Error destroying session",err);
                return res.redirect("/pageerror")
                
            }
            res.redirect("/admin/login")
        })
        
    } catch (error) {

        console.log("unexpected error during logout",error);
        res.redirect("/pageerror");  
    }
}



module.exports ={
    loadLogin,
    login,
    loadDashboard,
    pageerror,
    logout
}


// const User = require("../../models/userSchema")
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const loadLogin = (req, res) => {
//     if (req.session.admin) {
//         return res.redirect("/admin/dashboard")
//     }
//     res.render("admin-login", { message: null })
// }

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const admin = await User.findOne({ email, isAdmin: true })

//         if (admin) {
//             const passwordMatch = await bcrypt.compare(password, admin.password);
//             if (passwordMatch) {
//                 req.session.admin = admin;
//                 return res.redirect("/admin/dashboard")
//             } else {
//                 return res.render("admin-login", { message: "Invalid credentials" })
//             }
//         } else {
//             return res.render("admin-login", { message: "Admin not found" })
//         }
//     } catch (error) {
//         console.log("Admin Login error", error);
//         return res.redirect("/pageerror")
//     }
// }

// const loadDashboard = async (req, res) => {
//     if (req.session.admin) {
//         try {
//             res.render("dashboard");
//         } catch (error) {
//             res.redirect("/pageerror")
//         }
//     } else {
//         res.redirect("/admin/login")
//     }
// }

// module.exports = {
//     loadLogin,
//     login,
//     loadDashboard
// }

