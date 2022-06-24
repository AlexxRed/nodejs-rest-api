const contactsOperations = require('../../models/contacts');
const {addSchema} = require('../../schemas/contacts')
const { createError } = require('../../services');

// const { Schema, model } = require('mongoose');

// const contactSchema = new Schema(
//     {
//         tname: {
//         type: String,
//         required: [true, 'Set name for contact'],
//         },
//         email: {
//         type: String,
//         },
//         phone: {
//         type: String,
//         },
//         favorite: {
//         type: Boolean,
//         default: false,
//         },
//     },
//     { versionKey: false, timestamps: true },
// );

// const Contact = model('contact', contactSchema);


const add = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body)
        if (error) {
        throw createError(400, error.message)
        }

        const result = await contactsOperations.addContact(req.body)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
    
}

module.exports = add