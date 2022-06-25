const { Contact } = require("../../models");
const { createError } = require('../../services');

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const result = await Contact.findByIdAndRemove(contactId)
        if (!result) {
        throw createError(404)
        }
        res.json({
        message: "contact deleted"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = remove