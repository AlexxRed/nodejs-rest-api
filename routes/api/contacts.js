
const ctrl = require('../../controllers/contacts')
const express = require('express');
const { ctrlWrapper } = require('../../services')
const authenticate = require("../../middlewares/authenticate")




const router = express.Router()

router.get('/',authenticate, ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrl.getById)

router.post('/', authenticate, ctrl.add)

router.delete('/:contactId', ctrl.remove)

router.put('/:contactId', ctrl.updateById)

router.patch('/:contactId/favorite', ctrl.updateByFavorite)

module.exports = router
