const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Blog = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    text: {
        type: Number,
        required: true,
        default: 1
    },
    image : {
        type : String,
        default : ""
    },
    isDelete:{
        type: Boolean, 
        default: false
      }
}, {timestamps: true });

const blog = mongoose.model("blog",Blog);
module.exports=blog;