const { Schema, model } = require("mongoose")
const Joi = require("joi");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: emailRegexp,
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: '',
        },
        avatarURL: {
            type: String,
            required: true,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },
    },
    { versionKey: false, timestamps: true },
)

const User = model("user", userSchema)

const joiUserRegisterSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    subscription: Joi.string().required(),
    password: Joi.string()
});

const joiUserLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
});

const joiEmailSchema = Joi.object({
    email: Joi.string().email().required()
});

module.exports = {
    User,
    joiUserRegisterSchema,
    joiUserLoginSchema,
    joiEmailSchema
}