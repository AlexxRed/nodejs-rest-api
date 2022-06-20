const contactsOperations = require('../../models/contacts');
const express = require('express');
const Joi = require('joi');

const contactsAddSchema = Joi.object({
  name: Joi.string()
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().required(),
})

const router = express.Router()

router.get('/', async (_, res, next) => {
  try {
    const result = await contactsOperations.listContacts()
      res.json(result);
  } catch (error) {
    // res.status(500).json({
    //   message: error.message
    // })
    next(error)
    }
  }
)

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      const error = new Error("Not found")
      error.status = 404
      throw error
    }
    res.json(result)
  } catch (error) {

    next(error)
  }

})

router.post('/', async (req, res, next) => {
  try {
    // console.log(req.body);
    const { error } = contactsAddSchema.validate(req.body)
    if (error) {
      throw createError(400, error.message)
    }

    const result = await contactsOperations.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    res.json({ message: 'template message' })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    res.json({ message: 'template message' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
