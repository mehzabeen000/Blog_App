const express = require('express');
const post = express.Router();
const posts = require('../model/post')


post.route('/posts')
.get((req,res,next)=>{
    posts.find({})
    .then((data)=>{
        res.json(data);
    }).catch(err=>{
        next(err)
    })
})

.post((req,res,next)=>{
    posts.create(req.body)
    .then((data)=>{
        res.json(data)
    }).catch(err=>{
        next(err)
    })
})

.put((req,res,next)=>{
    res.send('Put operation not supported on post')
})

.delete((req,res,next)=>{
    posts.remove({})
    .then((data)=>{
        res.json(data)
    }).catch(err=>{
        next(err)
    })
})

post.route('/posts/:blogID')
.get((req,res,next)=>{
    posts.findById(req.params.blogID)
    .then((data)=>{
        res.json(data);
    }).catch(err=>{
        next(err)
    })
})

.post((req,res,next)=>{
    res.send('Post operation not supported on /posts/'+req.params.blogId)
})

.put((req,res,next)=>{
    posts.findByIdAndUpdate(req.params.blogID,{$set:req.body},{new:true})
    .then((data)=>{
        res.json(data);
    }).catch(err=>{
        next(err)
    })
})

.delete((req,res,next)=>{
    leaders.findByIdAndRemove(req.params.blogID)
    .then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        next(err)
    })
})



module.exports = post;
