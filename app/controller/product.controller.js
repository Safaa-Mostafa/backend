const productModel = require("../database/Models/product.model")
const upload1=require("../../middleware/fileUpload")
class product{



static addProduct = async(req,res)=>{
    try{
    const product=  new productModel(req.body)
    await product.save()
    res.status(200).send({
       apiStatus:true,
       data:product,
       message:"product added successfully"

    })
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}

static allProduct=async(req,res)=>{
 try{
   const pageNum = req.query.pageNum
   const pageLimit =req.query.pageLimit || 0
   const count = await productModel.count()
   const products=await productModel.find().limit(+pageLimit).skip(pageLimit*pageNum)
    res.status(200).send({
        apiStatus:true,
        data:products,
        count,
        message:`all product of user`
     })
 } catch(e){
    res.status(500).send({
        apiStatus:false,
        data:e,
        message:e.message
 })
}
}
static showProduct = async(req,res)=>{
    try{
       const product =await productModel.findOne({_id:req.params.id,userId:req.user.id})         
       res.status(200).send({
        apiStatus:true,
        data:product,
        message:"data"
        })
            }catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:e.message
        })
            }
}
static deleteProduct =async(req,res)=>{
    try{
        const product =await productModel.deleteOne({_id:req.params.id})         
        res.status(200).send({
         apiStatus:true,
         data:product,
         message:"data"
         })
             }catch(e){
         res.status(500).send({
             apiStatus:false,
             data:e,
             message:e.message
         })
             }  
}
static delAll=async(req,res)=>{
    try{
await req.user.remove()
res.send('done')
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static singleProduct =async (req,res)=>{
    try{
let data = await productModel.findById(req.params.id)
res.status(200).send({
    apiStatus:true,
    data:data,
    message:"singleProduct"
})
    }catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:e.message
        })  
    }
}
static userProducts = async(req,res)=>{
    try{
    await req.user.populate("myProduct")
res.status(200).send({
data:req.user.myProduct,
message:"data fetched",
apiStatus:true
})    
}catch(e){
    res.status(500).send({
        data:e,
        message:e.message,
        apiStatus:false
    })
}
}
static userCategory = async(req,res)=>{
    try{
    await req.user.populate("myProduct")
res.status(200).send({
data:req.user.myCategory,
message:"data fetched",
apiStatus:true
})    
}catch(e){
    res.status(500).send({
        data:e,
        message:e.message,
        apiStatus:false
    })
}
}
static EditProduct = async(req,res)=>{
    try{
        const myUpdates = Object.keys(req.body)
        const allowedEdits = ["title","description"]
        const validEdits = myUpdates.every(
            (update) => allowedEdits.includes(update)
            )
        if(!validEdits) throw new Error ("invalid edits")

        const product = await productModel.findById(req.params.id)
        if(!product) throw new Error("invalid id")
        
        myUpdates.forEach(update => product[update]= req.body[update])
        
        await product.save()
        
        res.status(200).send({
            apiStatus: true,
            date: product,
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
static uploadImage = async(req,res)=>{
  try{
    const product = await productModel.findById(req.params.id)
    product.img = req.file.path.replace("public\\","") || ""
    product.save()
    res.status(200).send({
        apiStatus:true,
        data:product,
        message:"added"
    })}catch(e){
     
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:e.message
        })
    }
}
}
module.exports =product