const router = require("express").Router()
const Admin = require("../middleware/admin")
const Auth = require('../middleware/auth')
const productController=require("../app/controller/product.controller")
router.get("/all",productController.allProduct)
router.post("/showProduct/:id",productController.showProduct)
router.delete("/deleteProduct/:id",productController.deleteProduct)
router.delete("/delAll",productController.delAll)
router.get("/singleProduct/:id",productController.singleProduct)
router.patch("/EditProduct/:id",productController.EditProduct)
router.get("/userProducts",productController.userProducts)
router.get("/userCategory",productController.userCategory)
const productModel = require("../app/database/Models/product.model")
const upload1=require("../middleware/fileUpload")
router.post("/addProduct",Auth,productController.addProduct)
router.post("/uploadImage/:id",upload1.single('img'),productController.uploadImage)

module.exports= router

