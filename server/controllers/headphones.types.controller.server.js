'use strict';

const mongoose = require('mongoose');
const HeadphoneType = mongoose.model('HeadphoneType');
const socket = require('../socket.io.js');

module.exports.getAllHeadphoneTypes = (req, res) => {
    Type.find().then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports.addHeadphoneType = (req, res) => {
    let headphoneType = new HeadphoneType(req.body);
    
    headphoneType.save().then(result => {
        res.json(result);
        socket.emit('headphoneTypeAdded', result.toJSON());
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
        });
}

module.exports.fillData = (req, res) => {
    HeadphoneType.find().then((results) => {
        if (results.length == 0) {
            const now = new Date();
            let arr = [
                {
                    name: 'Bose',
                    creationDate: now,
                    updateDate: now
                },
                {
                    name: 'JBL',
                    creationDate: now,
                    updateDate: now
                },
                {
                    name: 'Sony',
                    creationDate: now,
                    updateDate: now
                },
                {
                    name: 'AKG',
                    creationDate: now,
                    updateDate: now
                },
                {
                    name: 'Beats by Dre',
                    creationDate: now,
                    updateDate: now
                }
            ];

            HeadphoneType.collection.insertMany(arr).then((d)=> {
                console.log(d);
            }).catch(err => {
                console.log(err);
            });
        }
    })
}