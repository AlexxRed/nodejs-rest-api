const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
        // // const {_id:owner} = req.user
        // const {page = 1, limit = 10} = req.query
        // const skip = (page -1) * limit
        const result = await Contact.find({} ) //, "-createdAt -createdAt", {skip, limit: Number()}
                                // .populate("owner", "email name")
        res.json(result)
}

module.exports = getAll