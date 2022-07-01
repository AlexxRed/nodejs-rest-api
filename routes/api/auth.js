const express = require("express")

const ctrl = require("../../controllers/auth")

const {ctrlWrapper} = require('../../services')

const validation = require("../../middlewares/validation")

const {joiUserRegisterSchema, joiUserLoginSchema} = require("../../models")

const router = express.Router()

// signup
router.post("/users/signup", validation(joiUserRegisterSchema), ctrlWrapper(ctrl.register))

// signin
router.post("/users/login", validation(joiUserLoginSchema), ctrlWrapper(ctrl.login))

module.exports = router