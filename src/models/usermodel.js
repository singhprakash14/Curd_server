const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const User=new Schema({
Name:{
    type:String,
    required:true,
},
EmailId:{
    type:String,
    required:true,
},
Job_Role:{
    type:String,
    required:true,
}
})
const UserModel=mongoose.model("UserModel",User)

module.exports=UserModel;