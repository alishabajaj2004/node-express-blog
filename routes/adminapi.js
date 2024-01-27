const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Admin = require('../models/admin')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()
// mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
// mongoose.connect("mongodb+srv://alishatech2004:MhnlLykgv09V1Zml@cluster0.gckshfe.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect(process.env.MONGODB_CONNECT_URI)

router.get('/', (req, res) => {
  Admin.find().then(( result) => {
    res.send(result)
  }) })
  // to save admin info // 
  router.post('/', async (req, res) => {
    let b=req.body;
    const pwd = await bcrypt.hash(b.password, 10);
    const data=new Admin({
        fullName:b.fullName,
        password:pwd,
        emailid:b.emailid,
    })
    data.save().then((result)=>
    {
      if(result)
      res.send({response:'Record Saved',status:true})
    }    
    );     
  })


  router.post('/login', async (req, res) => {
    let b=req.body;
    const admin= await Admin.findOne({emailid:b.emailid})
    if(!admin)
    return res.send({response:'Invalid Email Address ',status:false});
    const match = await bcrypt.compare(b.password, admin.password);
    if(!match)
    return res.send({response:'Invalid Password ',status:false});
  res.send({response:'Login Successful',status:true,adminid:admin._id})
})

module.exports=router;

// Alisha
//alishabajaj2004@gmail.com
//A1l1i1s1h1a1