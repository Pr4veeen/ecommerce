
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin/adminController");
const customerController = require("../controllers/admin/customerController")
const auth = require("../middlewares/auth")
const categoryController = require("../controllers/admin/categoeyController");
const productController = require("../controllers/admin/productController")


router.get("/pageerror", adminController.pageerror)

router.get("/login",adminController.loadLogin);
router.post("/login",adminController.login)

//Dashboard
router.get("/",auth.adminAuth,adminController.loadDashboard)
router.get("/logout",adminController.logout)

//User management
router.get("/users",auth.adminAuth,customerController.customerInfo)
router.get("/blockCustomer",auth.adminAuth,customerController.customerBlocked)
router.get("/unblockCustomer",auth.adminAuth,customerController.customerunBlocked)

//Category management
router.get("/category",auth.adminAuth,categoryController.categoryInfo)
router.post("/addCategory",auth.adminAuth,categoryController.addCategory)

// list category
router.get("/listCategory",auth.adminAuth,categoryController.listCategory)
router.get("/unlistCategory",auth.adminAuth,categoryController.unlistCategory)
router.get("/editCategory",auth.adminAuth,categoryController.editCategory)
router.post("/editCategory/:id",auth.adminAuth,categoryController.updateCategory)

//product management
router.get("/addProduct",auth.adminAuth,productController.productAddPage)







module.exports = router

