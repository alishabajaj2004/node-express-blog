const nodemailer = require("nodemailer");
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()
// mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
// mongoose.connect("mongodb+srv://alishatech2004:MhnlLykgv09V1Zml@cluster0.gckshfe.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect(process.env.MONGODB_CONNECT_URI)

// to find all user
router.get('/', (req, res) => {
User.find().then(( result) => {
  res.send(result)
}) })
// to find only id by once // view profile
router.get('/:id', (req, res) => {
    User.findOne({_id:req.params.id}).then(( result) => {
        res.send(result)
  })
})
  // to save user info // register
  router.post('/', async (req, res) => {
    let b=req.body;
    const user= await User.findOne({emailid:b.emailid})
    if(user)
    return res.send({response:'Account Already Exist',status:false});

    const pwd = await bcrypt.hash(b.password, 10);
    const data=new User({
        fullName:b.fullName,
        password:pwd,
        emailid:b.emailid,
        phoneno:b.phoneno,
    })
    data.save().then((result)=>{ 
      if(result){
      let msg="<h3> Hi "+b.fullName+"</h3><p>Welcome On Board , Enjoy Writing !</p><p> Regards Alisha</p>"
      let sub="Welcome To My Blog App";
      main({message:msg,subject:sub,emailid:b.emailid}).catch(console.error);
        res.send({response:'Record Saved',status:true})
      }
    });      
  })


  router.post('/login', async (req, res) => {
    let b=req.body;
    const user= await User.findOne({emailid:b.emailid})
    if(!user)
    return res.send({response:'Invalid Email Address ',status:false});
    const match = await bcrypt.compare(b.password, user.password);
    if(!match)
    return res.send({response:'Invalid Password ',status:false});
  res.send({response:'Login Successful',status:true,userid:user._id})
})

  // to update user info - edit profile 
  router.patch('/:id', (req, res) => {
    let b=req.body;
    let data={
      fullName:b.fullName,
        emailid:b.emailid,
        phoneno:b.phoneno,
        city:b.city,
        gender:b.gender,
        dob:b.dob
    }
    User.updateOne({_id:req.params.id},data).then((result)=>{
        res.send(result)
    })
  })
  //change password
  router.patch('/password/:id', async(req, res) => {
    const pwd = await bcrypt.hash(req.body.password, 10);
    User.updateOne({_id:req.params.id},{password:pwd}).then((result)=>{
        res.send(result)
  })
})
// forgot password
router.post('/forgot', async (req, res) => {
  let b=req.body;
  const user= await User.findOne({emailid:b.emailid})
  if(!user)
  return res.send({response:'Email Id Not Exist',status:false});
// link to add
code=Math.floor(Math.random() * (9999 - 1111) + 1111);
let msg="<h3> Hi "+user.fullName+"</h3><p>We received a request to reset the password for your Writer'sBlog account associated with this email address.Just enter the following verification code to reset your password"+ code +"</p><p> Regards Alisha</p>"
let sub="Password Recovery";
main({message:msg,subject:sub,emailid:b.emailid}).catch(console.error);
res.send({response:'Mail Sent', status:true,emailid:b.emailid,code:code})
});      



//reset password
router.patch('/resetpassword/:emailid', async(req, res) => {
  const pwd = await bcrypt.hash(req.body.password, 10);
  User.updateOne({emailid:req.params.emailid},{password:pwd}).then((result)=>{
      res.send(result)
})
})

//node mailer simple mail transfer protocoal with auto generated password
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "alishatech2004@gmail.com",
    pass: "ffwzpwgxhqcynpjs",
  },
});
async function main(obj) {
  const info = await transporter.sendMail({
    from: '"Node Blog App" <alishatech2004@gmail.com>',
    to:obj.emailid ,
    subject:obj.subject ,
    html: obj.message,
  });
  console.log("Message sent: %s", info.messageId);
}


module.exports=router;

// A1A1 g245