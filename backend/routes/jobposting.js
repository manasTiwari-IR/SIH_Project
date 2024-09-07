const express = require('express');
const JobPost = require('../models/JobPost.js');
const router = express.Router();
const fetchUser = require('../middleware/FetchUser.js');

// Create a job post
router.post('/createpost', fetchUser, async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.CompanyName) {
            return res.status(400).json({ success: false, error: "CompanyName Not Provided" });
        }
        if (!req.body.description) {
            return res.status(400).json({ success: false, error: "Description Not Provided" });
        }
        if (!req.body.joblocation) {
            return res.status(400).json({ success: false, error: "Job Location Not Provided" });
        }
        if (!req.body.contactEmail) {
            return res.status(400).json({ success: false, error: "Contact Email Not Provided" });
        }
        if (!req.body.contactNumber) {
            return res.status(400).json({ success: false, error: "Contact Number Not Provided" });
        }

        // Create the job post
        let jobPost = await JobPost.create({
            CompanyLogo: req.user.profilephoto,
            CompanyName: req.body.CompanyName,
            description: req.body.description,
            joblocation: req.body.joblocation,
            contactEmail: req.body.contactEmail,
            contactNumber: req.body.contactNumber,
        });

        // Return success response
        res.json({ success: true, jobPost });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
});

// Get all job posts
router.get('/getjobposts', async (req, res) => {
    try {
        const jobPosts = await JobPost.find();
        res.json({ success: true, jobPosts });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
});

module.exports = router;
