const { User } = require("../../models")
const { createError } = require("../../services")
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, 'Email in use')
    }
    const hashPassword = await bcrypt.hash(password, 15);
    const avatarURL = gravatar.url(email);
    const result = await User.create({...req.body, password: hashPassword, avatarURL});
    res.status(201).json({
        user: {
            email: result.email,
            name: result.name,
        }
    })
}


module.exports = register