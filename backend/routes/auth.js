const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const privateKey = process.env.PRIVATE_KEY;
const fetchUser = require('../middleware/FetchUser')


//SIGNUP
router.post('/createuser', [
    body('name').isLength({ min: 3 }).withMessage('Enter a valid Username'),
    body('email').isEmail().withMessage('Enter a valid Email Address'),
    body('password').isLength({ min: 8 }).withMessage('password should be atleast 8 letters'),
    body('number').isLength({ min: 10, max: 10 }).isNumeric().withMessage('Mobile number should be 10 length'),
], async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success, errors: result.array() });
    }
    try {
        //email ko dhundo ki pahle koi same email se aya tha kya?

        const captchaResponse = req.body.captcha;
        const captchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify`;
        
        const captchaVerifyResponse = await fetch(captchaVerificationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${process.env.CAPTCHA_SECRET}&response=${captchaResponse}&remoteip=${req.ip}`
        });

        const captchaData = await captchaVerifyResponse.json();
        if (!captchaData.success) {
            return res.status(400).json({ success: false, error: "Captcha verification failed" });
        }



        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry this Email id already exists!" });
        }
        // ab password ko hash kardo
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({ //creating user in MONGO DB(new entry)
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: securePass,
            profilephoto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE3klEQVR4nO2a24vVVRTHP+OoM17IGZ0ms9LulJfpgn9CkQpTGr2UBUGUPdVMPfQQpBARZi/VUPRST5HUS2Z3JEaILK28PNSkU1FeKKx5CJpRx/HEgu+GxZk5v9/e+5wzSfiFwznwW9+192/vtdZea+0DF/D/RQdwJ/ACsBP4ATgJjOljv78H3pdML7CA8wRtwEbgE+AsUEn8GOdj4D7pmna0A08Ax92kTgGDwGZgA7ACWCTZdv1eCdwtmd3Aacc/BvRJdlqwFhh2E/gW2AR0ZujqFPc7p+8IcAdNhK3Uq25AG3xNg3S3aIEOOP2vNMPcLgG+0QCjwONAa6MHAWYC/QoONtZeoLtRyq/UdpviIWBVifx1wDPALuCEfOcfRbGXgGURY94EHNaYhzWHuncivMRXctgie38TmCiJVH8DDwAXlYzdBXztXqa7Hp8I5rQHmF8ge6lWPEz0Ddn8DcBcfSxiPe/C9Jh2yJ7Vwnz3MntzfeY1Z06LShx10EWwpSV6H9S5c0acL0om2OXMbCD1JdY5xy7zibske7LkhauxUmeHcZ8qkb3ZBYDo0DwH+EmkxyLk35KsHZCp6BX31wjZfucvUSb2pDsnYkLsX5K/hnS0aCeNvyQiNB+UrIX/Ugc/nrCF85yD5+Jz6bg9weSPle3K/RK0aBWDKyR/lHzslA4zs5gdDOnMvUWCn0no4chJdLsVykUYMzbdeVTyHxUdaGd1ElttEYNWHYBntFo5COdPT6T8QmXN47XqmfVSaDabgt/Eu4x0zNMinFa0jMXuInN8UQ8tT0rBe+LZeZKK28T9MpG3RTyrNCfhg8wJPSeefafiWXEtVUnBBvGsbJ6EkAbcmKBwhiuyniYdYWWHpSsWK1z6NAl/6mFKmrFEnBHyMSIdlnjGosulRZMQ6ufZCQpnKx+bSIh01ZFyQjpmJfDaXJ+gIS+CuiAV+djqBN5q55c1z4ScFwmmZXE6BbcAf4i7NYG3VZzfpSMFhaYVnN2KoVTcKq41D2IREsDUlzAsL3L23PCLIs5R8a0yLMNal77nZATrxbc8rWEHYkCf+D+XOH6HZCri5GBz0YGYm6IEzHL19ZRbLgy5GjwlUnkMFqUoOUljrbTeQmothC6LyeZgYVnS6FPqRzIHmSv+uQKZc5Ip6p4UYVNMyA6FlRUvOVjgWj21cEoyOVcKLa6wsg5+Yal7IrHQ8bhWXDuTaiGcVyabinWxpa5vPhxQwR+Ly9WNrCi1r4UdrulnnFjMBA7FNh+q20Ex4XGVGmejLvwWOfJSF35Hxe1pRjvIb+FYjUG6tSr7XE/XotH2yBTHZN6u6hPv12QX12hqJzfoqlumPyq3CR2/7Qp9YQIjWlWrEVJhnJddb6yiI+BdpT1o7CO5LdOpmtgDbgXHVZ3d06DLmDZdye1wizShi6U99TaxDRdrR7z5vANcT/OwDHi9ateHdcVRF652zv9LQtumHvS4gGAvcVWjFC/WlUFFt0/9Tbp6a1UzfNSZU907MZXPhAAQTv9G3r5aar/f6R9o9t37VNfTD2Ummh3iVl9Pr2GaMEcmENKZijqGu9Ti6VVbqVNF1wz9Xq5nWyQbbq0qugXom84/DHi0K9H8tM6/cGz8r/7CUctMrEzeBnyoAmpEYXRcv4f0bJtkc+ueC+B8x78fHcKd4U6+1gAAAABJRU5ErkJggg==',
            isCompany: req.body.isCompany,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(data, privateKey);
        success = true;
        res.json({ success, AuthToken: AuthToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid Email Address'),
    body('password', 'Password cannot be Blank').exists(),
], async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success, errors: result.array() });
    }
    try {
        
        const captchaResponse = req.body.captcha;
        const captchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify`;
        
        const captchaVerifyResponse = await fetch(captchaVerificationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${process.env.CAPTCHA_SECRET}&response=${captchaResponse}&remoteip=${req.ip}`
        });

        const captchaData = await captchaVerifyResponse.json();
        if (!captchaData.success) {
            return res.status(400).json({ success: false, error: "Captcha verification failed" });
        }



        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ success, error: "Please enter your details properly" })
        }
        //agar user hai to ab password check karo
        const check = await bcrypt.compare(req.body.password, user.password)
        if (!check) {
            return res.status(400).json({ success, error: "Please enter your details properly" })
        }
        //passing the checks now send authtoken as response
        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(data, privateKey); //same authtoken will be generated for same data id and private key
        success = true;
        res.json({ success, AuthToken: AuthToken });

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
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});
module.exports = router