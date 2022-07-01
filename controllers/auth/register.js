const { User } = require("../../models")
const {createError} = require("../../services")

const register = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, 'Email in use')
    }
    const result = await User.create(req.body);
    res.status(201).json({
        user: {
            email: result.email,
            name: result.name,
        }
    })
}


module.exports = register