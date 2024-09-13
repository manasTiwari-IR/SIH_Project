const jwt = require('jsonwebtoken');
const User = require('../models/User');
const privateKey = process.env.PRIVATE_KEY;

const fetchuser = async (req, res, next) => {
    const AuthToken = req.header('AuthToken');
    if (!AuthToken) {
        return res.status(401).json({ error: "Auth Token Missing" });
    }

    try {
        const data = jwt.verify(AuthToken, privateKey);
        const user = await User.findById(data.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            profilephoto: user.profilephoto,
            number: user.number
        };

        next();
    } catch (error) {
        console.error("Error in fetchuser middleware: ", error);
        return res.status(401).json({ error: "Invalid Auth Token" });
    }
}

module.exports = fetchuser;
