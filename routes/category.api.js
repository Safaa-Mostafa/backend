const router = require("express").Router()
const Admin =require("../middleware/admin")
const categoryController=require("../app/controller/category.controller")

router.post("/addCategory",categoryController.addCategory)
router.get('/show',categoryController.show)
router.patch('/edit/:id',categoryController.editUser)
router.delete('/delete/:id',categoryController.delete)
router.get('/show/:id',categoryController.single)

module.exports= router


