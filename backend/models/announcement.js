const mongoose = require('mongoose');

const Announcement = mongoose.Schema({
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

const announcement = mongoose.model("announcement",Announcement);
module.exports=announcement;