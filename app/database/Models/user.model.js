const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      default: 21,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      trim: true,
      enum: ["Male", "Female"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }, tokens:[
      {
          token: {type:String, required:true}
      }
  ],
    orders: [
      { 
            // productId:{
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "product",
            // },
            // description:{
            //     type:String,
            // trim:true
            // },
            // title:{
            //   type:String,
            //   trim:true
            // },
            // quantity:{
            //   type:Number
            // },
            products:[
              {
                productId:{type:mongoose.Schema.Types.ObjectId ,
                  ref: "product"
                },
               
                quantity:{type:Number},
                price:{type:Number},
                title:{type:String},
                description:{type:String},
                img:{type:String}
              }
          ],
            totalPrice:{type:Number}
          
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const userData = this.toObject();
  delete userData.__v;
  delete userData.tokens;
  delete userData.password
  return userData;
};
userSchema.pre("save", async function () {
  const data = this;
  if (data.isModified("password")) {
    data.password = await bcrypt.hash(data.password, 12);
  }
});
userSchema.statics.checkPass = async (user, oldPass) => {
  const isValid = await bcrypt.compare(oldPass, user.password);
  return isValid;
};
userSchema.statics.login = async (email, pass) => {
  const userData = await user.findOne({ email });
  if (!userData) throw new Error("invalid email");
  const checkPass = await bcrypt.compare(pass, userData.password);
  if (!checkPass) throw new Error("invalid Password");
  return userData;
};
userSchema.methods.generateToken = async function () {
  const user = this;
  if (user.tokens.length == 5) throw new Error("token exded");
  const token = jwt.sign({ _id: user._id }, "privateKey");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.virtual("myProduct", {
  ref: "product",
  localField: "_id",
  foreignField: "userId",
});
userSchema.virtual("myCategory", {
  ref: "category",
  localField: "_id",
  foreignField: "userId",
});
const productModel = require("./product.model");
const categoryModel = require("../Models/cate.model")
userSchema.pre("remove", async function (next) {
  const user = this;
  await productModel.deleteMany({ userId: this._id }) && categoryModel.deleteMany({ userId: this._id });
  next();
});

const user = mongoose.model("user", userSchema);
module.exports = user;
