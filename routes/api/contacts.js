const contactsOperations = require('../../models/contacts');
const express = require('express')

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
    console.log(req.body);
    res.json({ message: 'template message' })
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
