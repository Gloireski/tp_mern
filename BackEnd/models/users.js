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
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin', 'client'],
        required: true
    }
})

const User = mongoose.model('User', userSchema)

const userValidation = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            'string.base': 'username doit être une chaîne de caractères',
            'string.empty': 'username ne peut pas être vide',
            'any.required': 'username est requis'
        }),
    email: Joi.string()
        .required()
        .messages({
            'string.base': 'email doit être une chaîne de caractères',
            'string.empty': 'email ne peut pas être vide',
            'any.required': 'email est requis'
        }),
    firstname: Joi.string()
        .required()
        .messages({
            'string.base': 'nom doit être une chaîne de caractères',
            'string.empty': 'nom ne peut pas être vide',
            'any.required': 'nom est requis'
        }),
    lastname: Joi.string()
    .required()
    .messages({
            'string.base': 'prenom doit être une chaîne de caractères',
            'string.empty': 'prenom ne peut pas être vide',
            'any.required': 'prenom est requis'
    }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': 'mot de passe doit être une chaîne de caractères',
            'string.empty': 'mot de passe  ne peut pas être vide',
            'any.required': 'mot de passe  est requis'
        }),
    role: Joi.string()
        .valid('super_admin', 'admin', 'client')
        .required()
        .messages({
            'string.base': 'role doit être une chaîne de caractères',
            'any.only': 'role doit être soit "admin", "client" "super_admin"',
            'any.required': 'role est requis'
        })
})

module.exports = { User, userValidation }