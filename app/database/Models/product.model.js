const mongoose =require('mongoose')
const productSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    },
    title:{
        type:String,
        max:500
    },
    description:{
        type:String, 
        max:500
    }, 
    price:{
        type:Number, 
       max:1028,
       required:true
        }, 
    img:{
        type:String, 
        max:2002020, 
        trim:true
    },  
    Status:{
        type:Boolean,
        default:true
},
comment:[
    {
        type:String,
        maxLength:30000,
    }
],
rating:[
    {
        type:Number
    }
]
},
{timestamps:true})

  
const product =mongoose.model("product",productSchema)
module.exports = product