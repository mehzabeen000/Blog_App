const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const routes = require('./routes/user')
const post = require('./routes/post')

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
.then(()=>{
    console.log("Connected with Database Successfully")
}).catch(err=>{
    console.log('Error Occured')
})

app.use(express.json())
app.use('/blog_app',routes)
function checktoken(req,res,next){
    var token = req.headers.cookie
    if(token==undefined){
      res.send({
        "error": {
        "code": "AUTH_01",
        "message": "Access Unauthorized",
        "field": "NoAuth"
            }
        })
    }else{
      var token = req.headers.cookie.split(" ")
      token = token[0].slice(0,-10)
      jwt.verify(token ,process.env.secret_key,(err,data)=>{ 
        if(!err){
            next()
        }else{
            res.send({
                "error": {
                    "status": 401,
                    "code": "AUT_02",
                    "message": "Access Unauthorized",
                    "field": "NoAuth"
                } })
        }
    }) 
  }
}

app.use(checktoken)

app.use('/blog_app',post)
app.listen(4000,(req,res)=>{
    console.log("Connected Successfully");
})

