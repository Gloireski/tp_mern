const mongoose = require('mongoose')
const Joi = require('joi')

const filmSchema = new mongoose.Schema({
    id: {
        type: Number,
        auto: true,
    },
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    year: {
        type: Number,
        // required: true
    },
})

const Film = mongoose.model('Film', filmSchema)

const filmValidation = Joi.object({
    title: Joi.string()
    .required()
    .messages({
        'string.base': 'Title must be a string',
        'string.empty': 'Title cannot be empty',
        'any.required': 'Title is required'
    }),
    year: Joi.number().required()
})

module.exports = {Film, filmValidation}