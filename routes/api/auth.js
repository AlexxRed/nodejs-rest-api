const express = require("express")

const ctrl = require("../../controllers/auth")

const {ctrlWrapper} = require('../../services')

const validation = require("../../middlewares/validation")

const {joiUserRegisterSchema} = require("../../models")

const router = express.Router()

// signup
router.post("/users/signup", validation(joiUserRegisterSchema), ctrlWrapper(ctrl.register))

module.exports = router