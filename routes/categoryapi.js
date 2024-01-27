const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category')
const dotenv = require('dotenv')
dotenv.config()
// mongoose.connect('mongodb://127.0.0.1:27017/blogDB');//get all
// mongoose.connect("mongodb+srv://alishatech2004:MhnlLykgv09V1Zml@cluster0.gckshfe.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect(process.env.MONGODB_CONNECT_URI)
router.get('/', (req, res) => {
Category.find().then(( result) => {
  res.send(result)
}) })

//get by id
router.get('/:id', (req, res) => {
    Category.findOne({_id:req.params.id}).then(( result) => {
        res.send(result)
  })
})
//save 
  router.post('/', (req, res) => {
    let b=req.body;
    const data=new Category({
        title:b.title
    })
    data.save().then((result)=>{
      if(result)
      res.send({response:'Record Saved',status:true})
    }    
    );
  })
  router.delete('/:id', (req, res) => {
    Category.deleteOne({_id:req.params.id}).then((result)=>{
        if(result.acknowledged&&result.deletedCount==1)
        res.send({response:'Record Deleted',status:true})
    })
  })

  router.patch('/:id', (req, res) => {
    let b=req.body;
    let data={
        title:b.title}
    Category.updateOne({_id:req.params.id},data).then((result)=>{
      if(result.acknowledged&&result.modifiedCount==1)
      res.send({response:'Record Updated',status:true})
    })
  })
// only title
module.exports=router;
//nodemailer sending mails
//multer for purpose of file upload
//bodyparser