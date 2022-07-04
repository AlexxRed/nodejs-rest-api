const { Contact, joiContactSchema } = require("../../models/index");
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

// const Contact = model('contact', contact);


const add = async (req, res, next) => {
    try {
        const { error } = joiContactSchema.validate(req.body)
        if (error) {
        throw createError(400, error.message)
        }
        
        const {_id:owner} = req.user
        const result = await Contact.create({...req.body, owner})
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
    
}

module.exports = add