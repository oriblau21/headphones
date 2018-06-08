'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeadphonesSchema = new Schema({
    name: {
        type:String,
        trim: true
    },
    price: {
        type: Number
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    noiseCancelingLevel: {
        type: Number,
        default: 0
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    headphonesType: {
        type: String
    }
});

mongoose.model('Headphones', HeadphonesSchema);