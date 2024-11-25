const User = require("../models/userSchema");
 

// const userAuth =(req,res,next)=>{
//     if(req.session.user){
//         User.findById(req.session.user)
//         .then(data=>{
//             if(data && !data.isBlocked){
//                 next();
//             }else{
//                 res.redirect("/login");
//             }
//         })
//         .catch(error=>{
//             console.log("eroor in user auth middleware",error);
//             res.status(500).send("Internal Server eroor")
            
//         })
//     }else{
//         res.redirect("/login")
//     }
// }

const userAuth = (req, res, next) => {
    if (req.session.user) {
        next(); // User is authenticated; proceed to the route.
    } else {
        res.redirect("/login"); // Redirect to login if no active session.
    }
};

// const adminAuth = (req,res,next)=>{
//     User.findOne({isAdmin:true})
//     .then(data=>{
//         if(data){
//             next();
//         }else{
//             res.redirect("/admin/login");
//         }
//     })
//     .catch(error=>{
//         console.log("Error in Admin auth middleware",error);
//         res.status(500).send("Internal Server error")
        
//     })
// }


const adminAuth = (req, res, next) => {
    if (req.session.admin) {
        next(); // Admin session exists, allow access.
    } else {
        res.redirect("/admin/login"); // Redirect to login if no admin session.
    }
};

const checkSession = (req,res,next)=>{
    if(req.session.user){

        next()
    }else{
        res.redirect("login")
    }
}

const isLogin = (req,res,next)=>{
    if(req.session.user){
        res.redirect("/")
    }else{
        next()
    }
}





module.exports = {
    userAuth,
    adminAuth,
    checkSession,
    isLogin
}