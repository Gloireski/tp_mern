const mongoose = require('mongoose')
const Joi =  require('joi')

const fruitSchema =  new mongoose.Schema({
    id: {
        type: Number,
        auto: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
}
, { timestamps: true })

const Fruit = mongoose.model('Fruit', fruitSchema)

const fruitValidation = Joi.object({
    name: Joi.string()
    .required()
    .messages({
        'string.base': 'Nom doit être une chaîne de caractères',
        'string.empty': 'Nom ne peut pas être vide',
        'any.required': 'Nom est requis'
    }),
    category: Joi.string()
    .required()
    .messages({
        'string.base': 'Categorie doit être une chaîne de caractères',
        'string.empty': 'Categorie ne peut pas être vide',
        'any.required': 'Categorie est requise'
    }),
    description: Joi.string()
    .required()
    .messages({
        'string.base': 'Description doit être une chaîne de caractères',
        'string.empty': 'Description ne peut pas être vide',
        'any.required': 'Description est requise'
    }),
    price: Joi.number()
    .required()
    .messages({
        'number.base': 'Prix doit être un nombre',
        'number.empty': 'Prix ne peut pas être vide',
        'any.required': 'Prix est requis'
    }),
    origin: Joi.string()
    .required()
    .messages({
        'string.base': 'Origine doit être une chaîne de caractères',
        'string.empty': 'Origine ne peut pas être vide',
        'any.required': 'Origine est requise'
    }),
    image_url: Joi.string()
    .required()
    .messages({
        'string.base': 'Image URL doit être une chaîne de caractères',
        'string.empty': 'Image URL ne peut pas être vide',
        'any.required': 'Image URL est requis'
    })
})

module.exports = { Fruit, fruitValidation }