const express = require('express');
const JobPost = require('../models/JobPost.js');
const router = express.Router();
//create a job post
router.post('/createpost', async (req, res) => {
    try {
        if (!req.body.CompanyName) {
            console.error(error.message);
            res.status(500).send("CompanyName Not Provided")
        }
        if (!req.body.description) {
            console.error(error.message);
            res.status(500).send("description Not Provided")
        }
        if (!req.body.joblocation) {
            console.error(error.message);
            res.status(500).send("joblocation Not Provided")
        }
        if (!req.body.contactEmail) {
            console.error(error.message);
            res.status(500).send("contactEmail Not Provided")
        }
        if (!req.body.contactNumber) {
            console.error(error.message);
            res.status(500).send("contactNumber Not Provided")
        }
        let jobPost = JobPost.create({
            CompanyName: req.body.CompanyName,
            description: req.body.description,
            joblocation: req.body.joblocation,
            contactEmail: req.body.contactEmail,
            contactNumber: req.body.contactNumber,
        })
        res.json(jobPost)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//get all jobposts 
router.get('/getjobposts', async (req, res) => {
    try {
        const jobPosts = JobPost.find();
        res.send(jobPosts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})
module.exports = router