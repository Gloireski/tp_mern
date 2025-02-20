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
        type: Text,
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
    img_url: {
        type: String,
        required: true
    }
})

const Fruit = momgoose.model('Fruit', fruitSchema)

const fruitValidation = Joi.object({
    name: Joi.string()
    .required()
    .messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required'
    }),
    category: Joi.string()
    .required()
    .messages({
        'string.base': 'Category must be a string',
        'string.empty': 'Category cannot be empty',
        'any.required': 'Category is required'
    }),
    description: Joi.string()
    .required()
    .messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required'
    }),
    price: Joi.number()
    .required()
    .messages({
        'number.base': 'Price must be a number',
        'number.empty': 'Price cannot be empty',
        'any.required': 'Price is required'
    }),
    origin: Joi.string()
    .required()
    .messages({
        'string.base': 'Origin must be a string',
        'string.empty': 'Origin cannot be empty',
        'any.required': 'Origin is required'
    }),
    img_url: Joi.string()
    .required()
    .messages({
        'string.base': 'Image URL must be a string',
        'string.empty': 'Image URL cannot be empty',
        'any.required': 'Image URL is required'
    })
})

module.exports = { Fruit, fruitValidation }