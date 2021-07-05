const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var catSchema = new Schema({
    categories:  {
        type: String,
        required: true
    }
});

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
    categories:[catSchema]
},{timestamps:true});

var posts = mongoose.model('post',postSchema)
module.exports= posts;