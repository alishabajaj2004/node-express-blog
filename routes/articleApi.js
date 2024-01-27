const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/article')
// mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
const dotenv = require('dotenv')
dotenv.config()
// mongoose.connect("mongodb+srv://alishatech2004:MhnlLykgv09V1Zml@cluster0.gckshfe.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect(process.env.MONGODB_CONNECT_URI)
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})

const upload = multer({ storage: storage })

//all articles 
router.get('/', (req, res) => {
Article.find().then(( result) => {
  res.send(result)
}) })

//article by id(1)
router.get('/:id', (req, res) => {
    Article.findOne({_id:req.params.id}).then(( result) => {
        res.send(result)
  })
})
// articles by category
router.get('/category/:category', (req, res) => {
    Article.find({category:req.params.category}).then(( result) => {
        res.send(result)
  }) })
 // articles by user id
  router.get('/user/:userId', (req, res) => {
    Article.find({userId:req.params.userId}).then(( result) => {
        res.send(result)
  })
 
  })
//article to save
  router.post('/',upload.single('image'), (req, res) => {
    let b=req.body;
    const data=new Article({
        title:b.title,
        image:"public/"+req.file.originalname,
        category:b.category,
        content:b.content,
        userId:b.userId
    })
    data.save().then((result)=>{
      if(result)
      res.send({response:'Record Saved',status:true})
    } );
  })
// to delete by id
  router.delete('/:id', (req, res) => {
    Article.deleteOne({_id:req.params.id}).then((result)=>{
        res.send(result)
    })
  })
// articles to update by id
  router.patch('/:id', (req, res) => {
    let b=req.body;
    let data={
        title:b.title,
        image:b.image,
        category:b.category,
        content:b.content
    }
    Article.updateOne({_id:req.params.id},data).then((result)=>{
        res.send(result)
    })
  })
  //article to update status
  router.patch('/status/:id', (req, res) => {
    Article.updateOne({_id:req.params.id},{published:req.body.published}).then((result)=>{
        res.send(result)
  })
})
//article to update image
router.patch('/image/:id',upload.single('image'), (req, res) => {
  Article.updateOne({_id:req.params.id},{image:req.file.originalname}).then((result)=>{
      res.send(result)
})
})
module.exports=router;