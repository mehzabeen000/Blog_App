const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
    title:{
        type:String,
        required:true,
    },  
    description:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
{timestamps:true});

var posts = mongoose.model('post',postSchema)
module.exports= posts;
