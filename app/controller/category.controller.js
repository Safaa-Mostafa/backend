const categoryModel = require("../database/Models/cate.model")

class category{

static addCategory = async(req,res)=>{
    try{
    const addCategory=  new categoryModel(req.body)
    await addCategory.save()
    res.status(200).send({
       apiStatus:true,
       data:addCategory,
       message:"category added successfully"

    })
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static show = async(req,res)=>{
    try{
const allCategory = await  categoryModel.find()

res.status(200).send({
    apiStatus:true,
    data:allCategory,
    message:"all categories"
})
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static editUser = async(req,res) =>{
    try{
        const myUpdates = Object.keys(req.body)
        const allowedEdits = ["name"]
        const validEdits = myUpdates.every(
            (update) => allowedEdits.includes(update)
            )
        if(!validEdits) throw new Error ("invalid edits")

        const user = await categoryModel.findById(req.params.id)
        if(!user) throw new Error("invalid id")
        
        myUpdates.forEach(update => user[update]= req.body[update])
        
        await user.save()
        
        res.status(200).send({
            apiStatus: true,
            date: user,
            message: "user data fetched"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            date: e,
            message: e.message
        })
    }
}
static delete =async (req,res)=>{
    try{
const data = await categoryModel.findByIdAndDelete(req.params.id)
res.status(200).send({
    apiStatus:true,
    data:data,
    message:"category is deleted"
})
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static single=async(req,res)=>{
    try{
    const category =await categoryModel.findById(req.params.id)
res.status(200).send({
    apiStatus:true,
    data:category,
    message:"all data fetched"
})    
}catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
}
module.exports =category