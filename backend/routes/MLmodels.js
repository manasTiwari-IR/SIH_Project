const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const UserInfo = require('../models/UserInfo');
const axios = require('axios');
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkYjIyNzcxN2VmMmE1OGIwZWU5Nzc2In0sImlhdCI6MTcyNTczMjAwOH0.ERbIzdxMc8cL4_Htkll2YteIrCxxZ7EIC3RTy16lEtA
router.get('/getcourses', fetchuser, async (req, res) => {
    let success = false;
    try {
        const userId = req.user.id;
        const userInfo = await UserInfo.findOne({ user: userId });
        if (!userInfo) {
            return res.status(404).json({ success, error: "UserInfo info not found" });
        }
        const response = await axios.post('http://localhost:7000/predictcourses', {
            skills :userInfo.ProgrammingLang
        });
        success = true;
        res.json({ success, data:response.data });
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
});

module.exports = router;
