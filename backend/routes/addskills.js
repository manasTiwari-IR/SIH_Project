const express = require('express')
const UserInfo = require('../models/UserInfo');
const router = express.Router();
const fetchUser = require('../middleware/FetchUser')
 
router.get('/getallusers',async(req,res)=>{
    try {
        const userinfos = UserInfo.find().select('-user');
        res.send(userinfos)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

router.post('/adduserinfo', fetchUser, async (req, res) => {
    try {
        if (!req.body.description) {
            console.error(error.message);
            res.status(500).send("description Not Provided")
        }
        if (!req.body.ProgrammingLang) {
            console.error(error.message);
            res.status(500).send("choose some programming language")
        }
        const userinfo = UserInfo.create({
            user: req.user.id,
            name: req.user.name,
            pfp: req.user.profilephoto,
            email: req.user.email,
            number: req.user.number,
            description: req.body.description,
            ProgrammingLang: req.body.ProgrammingLang
        })
        res.json(userinfo)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

router.post('/edituserinfo/:id', fetchUser, async (req, res) => {
    try {
        const olduserinfo = await UserInfo.findById(req.params.id)
        if (!olduserinfo) res.status(400).json({ error: "User info not found" })
        if (req.user.id !== olduserinfo.user.toString())
            res.status(401).json({ error: "Access denied" })
        olduserinfo = await UserInfo.findByIdAndUpdate(req.params.id, {
            description: req.body.description,
            ProgrammingLang: req.body.ProgrammingLang
        }, { new: true })
        res.json(olduserinfo)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})
module.exports = router