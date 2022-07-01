const express = require("express")

const ctrl = require("../../controllers/auth")

const {ctrlWrapper} = require('../../services')

const router = express.Router()

// signup
router.post("/register", ctrlWrapper(ctrl.register))

module.exports = router