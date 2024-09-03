const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    number:{
         type:Number,
         required:true,
    },
    password: {
        type: String,
        required: true
    },
    profilephoto:{
       type:String,
       default:null
    },
    isCompany:{
        type:Boolean,
        default:false
    }
});
const User=mongoose.model('user',UserSchema)
module.exports=User;