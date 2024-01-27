const mongoose = require('mongoose');

const categorySchema=new mongoose.Schema({
    title:{type:String,required:[true,'title is Required']},
    addedDate:{type:Date,default:Date.now},
})
module.exports=mongoose.model('category',categorySchema)
