const express = require("express")

const ctrl = require("../../controllers/auth")

const {ctrlWrapper} = require("../../services")

const validation = require("../../middlewares/validation")

const authenticate = require("../../middlewares/authenticate")

const upload = require("../../middlewares/upload")

const {joiUserRegisterSchema, joiUserLoginSchema, joiEmailSchema} = require("../../models")

const router = express.Router()

// signup
router.post("/users/signup", validation(joiUserRegisterSchema), ctrlWrapper(ctrl.register))

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify",validation(joiEmailSchema),ctrlWrapper(ctrl.resendVerifyEmail));

// signin
router.post("/users/login", validation(joiUserLoginSchema), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
    "/avatars",
    authenticate,
    upload.single("avatar"),
    ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router