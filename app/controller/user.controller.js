const e = require("cors")
const userModel = require("../database/Models/user.model")
class user{

// registeration
static register = async(req,res)=>{
    try{
    const user=  new userModel(req.body)
    const token = await user.generateToken()
    await user.save()
    res.status(200).send({
apiStatus:true,
data:{user,token},
message:"user added successfully"

    })
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static registerwithimage = async(req,res)=>{
    try{
    const user=  new userModel(req.body)
    user.image=req.file.path
    const token = await user.generateToken()
    await user.save()
    res.status(200).send({
apiStatus:true,
data:{user,token},
message:"user added successfully"

    })
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static uploadImage = async(req,res)=>{
    try{
      const user = await userModel.findById(req.params.id)
      user.image = req.file.path.replace("public\\","") || ""
      user.image.replace("public\\","")
      user.save()
      res.status(200).send({
          apiStatus:true,
          data:user,
          message:"added"
      })}catch(e){
       
          res.status(500).send({
              apiStatus:false,
              data:e,
              message:e.message
          })
      }
  }
static all =async(req,res)=>{
    try{
const allUsers = await userModel.find()
res.status(200).send({
    apiStatus:true,
    data:allUsers,
    message:"all data fetched"
})
    }catch(e){
        res.status(500).send({
            apiStatus:true,
            data:e,
            message:e.message
        })
    }
}
static single =async(req,res)=>{
    try{
const user = await userModel.findById(req.params.id)
res.status(200).send({
apiStatus:true,
data:user,
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
static delete =async(req,res)=>{
    try{
const user = await userModel.findByIdAndDelete(req.params.id)
res.status(200).send({
apiStatus:true,
data:user,
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
static editUser = async(req,res) =>{
    try{
        const myUpdates = Object.keys(req.body)
        const allowedEdits = ["name", "age","email"]
        const validEdits = myUpdates.every(
            (update) => allowedEdits.includes(update)
            )
        if(!validEdits) throw new Error ("invalid edits")
        const user = await userModel.findById(req.params.id)
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
static editPass = async(req,res) =>{
    try{
        const user = await userModel.findById(req.params.id)
        if(!user) throw new Error("invalid id")
        const valid = await userModel.checkPass(user, req.body.oldPass)
        if(!valid)throw new Error ("invalid password")
        user.password= req.body.password
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
static login =async(req,res)=>{
    try{
    const userData = await userModel.login(req.body.email,req.body.password)
    const token = await userData.generateToken()
    res.status(200).send({
        apiStatus:true,
        data:{userData,token},
        message:"Logged In"
    })}
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:e.message
        })
    }
}
static profile =  (req,res)=> {
    res.status(200).send({apiStatus:true,data:req.user, message:"user profile"})
}
static logout = async(req, res)=>{
    try{
        req.user.tokens= req.user.tokens.filter(t=> t.token != req.token)
        await req.user.save()
        res.status(200).send({
            apiStatus:true,
            data:"",
            message:"logged out on device"
        })
    }
    catch(e){
        res.status(500).send({apiStatus:false, data:e, message:e.message})
    }

}
static logoutAll = async(req, res)=>{
        try{
            req.user.tokens=[]
            await req.user.save()
            res.status(200).send({
                apiStatus:true,
                data:"",
                message:"logged out all devices"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
}
static changeStatus=async(req,res)=>{
    try{
        if(req.user.status==false)
            req.user.status=true
        else 
            req.user.status=false
        await req.user.save()
            res.send(req.user)
    }
    catch(e){
        res.status(500).send({apiStatus:false})
    }
}
static order =async(req,res)=>{
    try{
    const user =await userModel.findById(req.params.id)
    user.orders.push({...req.body})
    user.save()
    res.status(200).send({
        apiStatus:true,
        data:user,
        message:"order is saved"
    })
    }
    catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
// static deleteOrder =async(req,res)=>{
//     const user =await userModel.findById(req.params.id)
//     for(let i=0;i<user.orders;i++){
//     user.orders[i]
// }
// }

}
module.exports =user