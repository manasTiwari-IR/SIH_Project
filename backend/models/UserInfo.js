const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserInfoSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'user'
    },
    name: {
        type: String,
        required: true
    },
    pfp:{
        type:String,
        default:null
    },
    email: {
        type: String,
        required: true,
    },
    number:{
         type:Number,
         required:true,
    },
    description:{
        type:String,
        required:true,
    },
    ProgrammingLang:{
        type:Array,
        require:true
    }
});
const UserInfo=mongoose.model('userinfo',UserInfoSchema)
module.exports=UserInfo;