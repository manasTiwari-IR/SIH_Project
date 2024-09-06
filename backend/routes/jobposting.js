const express = require('express');
const JobPost = require('../models/JobPost.js');
const router = express.Router();
//create a job post
router.post('/createpost', async (req, res) => {
    try {
        if (!req.body.CompanyName) {
            console.error(error.message);
            res.status(500).json({success:false,error:"CompanyName Not Provided"})
        }
        if (!req.body.description) {
            console.error(error.message);
            res.status(500).json({success:false,error:"description Not Provided"})
        }
        if (!req.body.joblocation) {
            console.error(error.message);
            res.status(500).json({success:false,error:"joblocation Not Provided"})
        }
        if (!req.body.contactEmail) {
            console.error(error.message);
            res.status(500).json({success:false,error:"contactEmail Not Provided"})
        }
        if (!req.body.contactNumber) {
            console.error(error.message);
            res.status(500).json({success:false,error:"contactNumber Not Provided"})
        }
        let jobPost = JobPost.create({
            CompanyName: req.body.CompanyName,
            description: req.body.description,
            joblocation: req.body.joblocation,
            contactEmail: req.body.contactEmail,
            contactNumber: req.body.contactNumber,
        })
        res.json({success:true,
            jobPost:jobPost})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false,error:"Internal server Error!"})
    }
})

//get all jobposts 
router.get('/getjobposts', async (req, res) => {
    try {
        const jobPosts = await JobPost.find();
        res.json({ success: true, jobPosts });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
});
module.exports = router