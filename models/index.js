const { Contact, joiContactSchema, favoriteJoiSchema } = require("./contacts");
const {User, joiUserRegisterSchema} = require("./user")

module.exports = {
    Contact,
    joiContactSchema,
    favoriteJoiSchema,
    User,
    joiUserRegisterSchema
};