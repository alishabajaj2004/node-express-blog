const mongoose = require('mongoose');
const AdminSchema=new mongoose.Schema({ 
    fullName:{type:String,required:[true,'Name is Required']},
    password:{type:String,required:[true,'password is Required']},
    emailid:{type:String,required:[true,'Email Address is Required']},
})
module.exports=mongoose.model('admin',AdminSchema)

