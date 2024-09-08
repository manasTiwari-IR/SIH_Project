const express = require('express')
const UserInfo = require('../models/UserInfo');
const router = express.Router();
const fetchUser = require('../middleware/FetchUser')
 
router.get('/getallusers', async (req, res) => {
    try {
        const userinfos = await UserInfo.find().select('-user');
        res.json({ success: true, userinfos });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, error: "Internal Server Error!" });
    }
});

router.post('/adduserinfo', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const userInfo = await UserInfo.findOne({ user: userId });
        if(!userInfo){
            if (!req.body.description) {
                console.error(error.message);
                res.status(500).send({success:false,error:"Description Not Provided"})
            }
            if (!req.body.ProgrammingLang) {
                console.error(error.message);
                res.status(500).send({success:false,error:"Choose some Programming Language"})
            }
            const userinfo = await UserInfo.create({
                user: req.user.id,
                name: req.user.name,
                pfp: req.user.profilephoto,
                email: req.user.email,
                number: req.user.number,
                description: req.body.description,
                ProgrammingLang: req.body.ProgrammingLang
            })
            res.json({success:true,userinfo})
        }
        else{
            const updatedUserinfo = await UserInfo.findOneAndUpdate(
                { user: userId },
                {
                    $set: {
                        description: req.body.description,
                        ProgrammingLang: req.body.ProgrammingLang
                    }
                },
                { new: true }
            );
            return res.json({ success: true, userinfo: updatedUserinfo });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({success:false,error:"Internal Server Error!"})
    }
})

router.get('/getuserinfo',fetchUser,async(req,res)=>{
    try {
        const userId = req.user.id;
        const userInfo = await UserInfo.findOne({ user: userId });
        if(userInfo){
            res.json({success:true,userinfo: userInfo})
        }
        else {
            res.json({success:false,msg:"No skills added"})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({success:false,error:"Internal Server Error!"})
    }
})
module.exports = router