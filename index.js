const express = require('express')
var bodyParser = require('body-parser')
const cors=require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT_NO

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({origin:'*'}))

const Article=require('./routes/articleApi')
const Admin=require('./routes/adminapi')
const User=require('./routes/userapi')
const Category=require('./routes/categoryapi')

// -------------------------------------------------
// console.log(process.env)
// --------------------------
app.use('/article',Article)
app.use('/admin',Admin)
app.use('/category',Category)
app.use('/user',User)
//localhost:3000/user get post

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})