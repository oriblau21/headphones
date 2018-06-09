'use strict';

const mongoose = require('mongoose');
const View = mongoose.model('View');
const Headphones = mongoose.model('Headphones');

module.exports.newView = (req, res) => {
    let view = new View(req.body);

    view.save().then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });
};

module.exports.recommend = (req, res) => {
    View.aggregate([
        {
            $group: {
                _id: '$noiseCancelLevel',
                views: {
                   $push: '$$ROOT'
               }
           }
        }
    ]).then(results => {
        results.sort((a, b) => {
            return b.views.length - a.views.length;
        });
        results[0].views.sort((a, b) => {
            return new Date(b.viewDate) - new Date(a.viewDate);
        });
        const topLevel = results[0]._id;
        const lastProduct = results[0].views[0].productId;
        Headphones.findOne({ noiseCancelingLevel: topLevel, _id: { $ne: lastProduct } }).then(obj => {
            res.json(obj);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};