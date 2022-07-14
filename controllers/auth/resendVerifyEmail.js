const { User } = require("../../models");
const { createError, sendEmail } = require("../../services")

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(404);
    }
    if (user.verify) {
        throw createError(400, "Verification has already been passed");
    };
    
    const mail = {
        to: email,
        subject: "Email confirmation on site",
        html: `<a target="_blank" href="http://localhost:3333/api/auth/verify/${user.verificationToken}">Click to confirm your email${email}</a>`,
    };
    await sendEmail(mail)
    res.json({
        message:"Verification email sent"
    })
};

module.exports = resendVerifyEmail;