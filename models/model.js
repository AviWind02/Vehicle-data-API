const { Double } = require('mongodb');
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    colour: {
        required: true,
        type: String
    },
    model: {
        required: true,
        type: String
    },
    year: {
        required: true,
        type: Number
    },
    brand: {
        required: true,
        type: String
    },
    Partslist: {
        required: true,
        type: String
    },
    PriceRang: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Vehicles', dataSchema)