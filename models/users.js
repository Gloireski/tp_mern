const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        auto: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        required: true
    }
})

const User = new mongoose.model('User', userSchema)

const userValidation = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            'string.base': 'username doit être une chaîne de caractères',
            'string.empty': 'username ne peut pas être vide',
            'any.required': 'username est requis'
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': 'mot de passe doit être une chaîne de caractères',
            'string.empty': 'mot de passe  ne peut pas être vide',
            'any.required': 'mot de passe  est requis'
        }),
    role: Joi.string()
        .valid('admin', 'client')
        .required()
        .messages({
            'string.base': 'role doit être une chaîne de caractères',
            'any.only': 'role doit être soit "admin" soit "client"',
            'any.required': 'role est requis'
        })
})

module.exports = { User, userValidation }