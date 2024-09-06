const jwt = require('jsonwebtoken');
const User = require('../models/User');
const privateKey = "$Thequickbrownfoxjumpsoverthelazydog$";

const fetchuser = async (req, res, next) => {
    const AuthToken = req.header('AuthToken');
    if (!AuthToken) {
        return res.status(401).send({ error: "Invalid Auth Token" });
    }

    try {
        const data = jwt.verify(AuthToken, privateKey);
        const user = await User.findById(data.user.id).select('-password');
        if (!user) {
            return res.status(404).send({ error: "User not found" });
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
        console.error(error.message);
        return res.status(401).send({ error: "Invalid Auth Token" });
    }
}

module.exports = fetchuser;
