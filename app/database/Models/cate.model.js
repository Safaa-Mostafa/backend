const mongoose =require('mongoose')

const cateSchema = mongoose.Schema({

name:{
type:String,
trim:true,
maxLength:255,
unique: true 
},    
userId:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:"user",
  required:true
}
},
{timestamps:true})


cateSchema.virtual("myProduct",{
  ref:"product",
  localField:"_id",
  foreignField:"categoryId"
})
const category =mongoose.model("category",cateSchema)

module.exports = category