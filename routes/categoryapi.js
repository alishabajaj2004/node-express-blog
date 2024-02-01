const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category')
const dotenv = require('dotenv')
const Averify=require("./../routes/adverifytoken");

dotenv.config()

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
  router.post('/',Averify, (req, res) => {
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
  router.delete('/:id', Averify,(req, res) => {
    Category.deleteOne({_id:req.params.id}).then((result)=>{
        if(result.acknowledged&&result.deletedCount==1)
        res.send({response:'Record Deleted',status:true})
    })
  })

  router.patch('/:id',Averify, (req, res) => {
    let b=req.body;
    let data={
        title:b.title}
    Category.updateOne({_id:req.params.id},data).then((result)=>{
      if(result.acknowledged&&result.modifiedCount==1)
      res.send({response:'Record Updated',status:true})
    })
  })

  module.exports=router;
