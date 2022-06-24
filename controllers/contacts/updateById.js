const { Contact, joiContactSchema } = require("../../models");
const { createError } = require('../../services');

const updateById = async (req, res, next) => {
    try {
        const { error } = joiContactSchema.validate(req.body)
        if (error) {
        throw createError(400, error.message)
        }
        const { contactId } = req.params
        const result = await Contact.findByIdAndUpdate(contactId, req.body,{ new: true })
        if (!result) {
        throw createError(404)
        }
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = updateById