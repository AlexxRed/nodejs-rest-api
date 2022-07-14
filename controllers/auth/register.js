const { User } = require("../../models")
const { createError, sendEmail } = require("../../services")
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const idGenerate = require("bson-objectid");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, 'Email in use')
    }
    const hashPassword = await bcrypt.hash(password, 15);
    const avatarURL = gravatar.url(email);
    const verificationToken = idGenerate()
    const result = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationToken
    });

    const mail = {
        to: email,
        subject: "Email confirmation on site",
        html: `<a target="_blank" href="http://localhost:3333/api/auth/verify/${verificationToken}">Click to confirm your email${email}</a>`,
    };


    res.status(201).json({
        user: {
            email: result.email,
            name: result.name,
        }
    })

    await sendEmail(mail);
}


module.exports = register