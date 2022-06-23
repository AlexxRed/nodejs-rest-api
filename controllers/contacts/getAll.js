const contactsOperations = require('../../models/contacts');

const getAll = async (_, res, next) => {
        const result = await contactsOperations.listContacts()
        res.json(result)
}

module.exports = getAll