const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:{type:String,required:[true,'Name is Required']},
    password:{type:String,required:[true,'password is Required']},
    emailid:{type:String,required:[true,'Email Address is Required']},
    phoneno:{type:String,required:[true,'Contact no is Required']},
    city:{type:String,default:null},
    gender:{type:String,default:null},
    dob:{type:Date,default:null},
    addedDate:{type:Date,default:Date.now},
})
module.exports=mongoose.model('user',userSchema)
