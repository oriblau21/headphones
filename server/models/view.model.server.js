'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ViewSchema = new Schema({
    noiseCancelLevel: {
        type: Number,
        default: 0
    },
    productId: {
        type: String,
        trim: true
    },
    viewDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('View', ViewSchema);