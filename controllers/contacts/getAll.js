const { Contact } = require("../../models");

const getAll = async (_, res, next) => {
        const result = await Contact.find({})
        res.json(result)
}

module.exports = getAll