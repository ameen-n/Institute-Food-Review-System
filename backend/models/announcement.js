const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Announcement = mongoose.Schema({
    userID: {
        type: ObjectId,
        required: true
    },
    text: {
        type: String,
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