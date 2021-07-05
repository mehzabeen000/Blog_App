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

post.route('/posts/:blogID/category')
.get((req,res,next) => {
    posts.findById(req.params.blogID)
    .then((data) => {
        if (data != null) {
            res.json(data.categories);
        }
        else {
            err = new Error('Categories ' + req.params.blogID + ' not found');
            return next(err);
        }
    }).catch((err) => next(err));
})

.post((req, res, next) => {
    posts.findById(req.params.blogID)
    .then((data) => {
        if (data != null) {
            data.categories.push(req.body);
            data.save()
            .then((data) => {
                res.json(data);                
            });
        }
        else {
            err = new Error('Categories ' + req.params.blogID + ' not found');
            return next(err);
        }
    }).catch((err) => next(err));
})

.put((req, res, next) => {
    res.end('PUT operation not supported on /posts/'+ req.params.blogID + '/categories');
})

.delete((req, res, next) => {
    posts.findById(req.params.blogID)
    .then((data) => {
        if (data != null) {
            for (var i = (data.categories.length -1); i >= 0; i--) {
                a = data.categories.id(data.categories[i]._id).remove();
                console.log(a)
            }
            data.save()
            .then((d) => {res.json(d); })
        }
        else {
            err = new Error('Data ' + req.params.blogID + ' not found');
            return next(err);
        }
    }).catch((err) => next(err));    
});

post.route('/posts/:blogID/category/:categoryID')
.get((req,res,next) => {
    posts.findById(req.params.blogID)
    .then((data) => {
        if (data != null && data.categories.id(req.params.categoryID) != null) {
            res.json(data.categories.id(req.params.categoryID));
        }
        else if (data == null) {
            err = new Error('Post ' + req.params.categoryID + ' not found');
            return next(err);
        }
        else {
            err = new Error('Category ' + req.params.categoryID + ' not found');
            return next(err);            
        }
    })
    .catch((err) => next(err));
})

.post((req, res, next) => {
    res.end('POST operation not supported on /posts/'+ req.params.blogID
        + '/categories/' + req.params.categoryID);
})

.put((req, res, next) => {
    posts.findById(req.params.blogID)
    .then((data) => {
        if (data != null && data.categories.id(req.params.categoryID) != null) {
            if (req.body.categories) {
                data.categories.id(req.params.categoryID).categories = req.body.categories;                
            }
            data.save()
            .then((data) => {
                res.json(data);                
            }, (err) => next(err));
        }
        else if (data == null) {
            err = new Error('Data ' + req.params.blogID + ' not found');
            return next(err);
        }
        else {
            err = new Error('Categories ' + req.params.categoryID + ' not found');
            return next(err);            
        }
    }).catch((err) => next(err));
})

.delete((req, res, next) => {
    posts.findById(req.params.blogID)
    .then((data) => {
        if (data != null && data.categories.id(req.params.categoryID) != null) {
            data.categories.id(req.params.categoryID).remove();
            data.save()
            .then((data) => {
                res.json(data);                
            }, (err) => next(err));
        }
        else if (data == null) {
            err = new Error('Data ' + req.params.blogID + ' not found');
            return next(err);
        }
        else {
            err = new Error('Categories ' + req.params.categoryID + ' not found');
            return next(err);            
        }
    }).catch((err) => next(err));
});


module.exports = post;