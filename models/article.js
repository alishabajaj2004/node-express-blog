const mongoose = require('mongoose');

const articleSchema=new mongoose.Schema({
    title:{type:String,required:[true,'title is Required']},
    image:{type:String,required:[true,'image is Required']},
    category:{type:String,required:[true,'category is Required']},
    userId:{type:String,required:[true,'userId is Required']},
    content:{type:String,required:[true,'Content is Required']},
    published:{type:Boolean,default:false},
    addedDate:{type:Date,default:Date.now},
})
module.exports=mongoose.model('article',articleSchema)
