const { Contact, joiContactSchema, favoriteJoiSchema } = require("./contacts");
const {User, joiUserRegisterSchema, joiUserLoginSchema} = require("./user")

module.exports = {
    Contact,
    joiContactSchema,
    favoriteJoiSchema,
    User,
    joiUserRegisterSchema,
    joiUserLoginSchema
};