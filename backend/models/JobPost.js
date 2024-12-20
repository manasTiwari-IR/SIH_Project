const mongoose = require('mongoose');
const { Schema } = mongoose;
const JobPostSchema = new Schema({
    CompanyLogo:{
       type:String,
       default:null
    },
    CompanyName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    joblocation:{
        type:String,
        required:true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const JobPost=mongoose.model('jobpost',JobPostSchema)
module.exports=JobPost;