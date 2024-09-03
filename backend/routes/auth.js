const express = require('express'); 
const User = require('../models/User');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const privateKey = "$Thequickbrownfoxjumpsoverthelazydog$"
const fetchUser = require('../middleware/FetchUser')


//SIGNUP
router.post('/createuser', [
    body('name').isLength({ min: 3 }).withMessage('Enter a valid Username'),
    body('email').isEmail().withMessage('Enter a valid Email Address'),
    body('password').isLength({ min: 8 }).withMessage('password should be atleast 8 letters'),
    body('number').isLength({ min: 10 ,max:10 }).isNumeric().withMessage('Mobile number should be 10 length'),
], async (req, res) => {
    let success=false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({success , errors: result.array() });
    }
    try {
        //email ko dhundo ki pahle koi same email se aya tha kya?
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success , error: "Sorry this Email id already exists!" });
        }
        // ab password ko hash kardo
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({ //creating user in MONGO DB(new entry)
            name: req.body.name,
            email: req.body.email,
            number:req.body.number,
            password: securePass,
            isCompany:req.body.isCompany,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(data, privateKey);
        success=true;
        res.json({success , AuthToken: AuthToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid Email Address'),
    body('password', 'Password cannot be Blank').exists(),
], async (req, res) => {
    let success=false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success ,errors: result.array() });
    }
    try {
        //user ko dhundo email se
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ success,error: "Please enter your details properly" })
        }
        //agar user hai to ab password check karo
        const check = await bcrypt.compare(req.body.password, user.password)
        if (!check) {
            return res.status(400).json({ success,error: "Please enter your details properly" })
        }
        //passing the checks now send authtoken as response
        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(data, privateKey); //same authtoken will be generated for same data id and private key
        success=true;
        res.json({ success,AuthToken: AuthToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})



router.get('/getuser', fetchUser, async (req, res) => {  
     //fetchuser is the middleware as Login required  
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password') 
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
    
})


router.post('/uploadpp', fetchUser, async (req, res) => {
    const { profilephoto } = req.body;
    if (!profilephoto) {
        return res.status(400).json({ msg: 'Profile photo data is required' });
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profilephoto },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, msg:"Internal server error"});
    }
});
module.exports = router