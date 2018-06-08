'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeadphonesTypeSchema = new Schema({
    name: {
        type:String,
        trim: true,
        unique: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('HeadphonesType', HeadphonesTypeSchema);