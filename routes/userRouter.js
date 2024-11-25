const express = require("express");
const router = express.Router();
const userController = require("../controllers/user/userController");
const passport = require("passport");
const auth = require("../middlewares/auth")


router.get("/",auth.userAuth,userController.loadHomepage);
router.get("/pageNotFound",userController.pageNotFound)

router.get("/signup",auth.isLogin,userController.loadSignup)
router.post("/signup", userController.signup)

router.post("/verify-otp",userController.verifyOtp)
router.post("/resend-otp",userController.resendOtp)

router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));
router.get("/auth/google/callback", passport.authenticate("google",{failureRedirect:"/signup"}),(req,res)=>{
    res.redirect("/")
});

router.get("/login",auth.isLogin,userController.loadLogin)
router.post("/login",userController.login)

router.get("/logout",auth.userAuth,userController.logout)





module.exports = router;