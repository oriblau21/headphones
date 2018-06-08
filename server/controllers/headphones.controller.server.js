'use strict';

const mongoose = require('mongoose');
const Headphones = mongoose.model('Headphones');
const socket = require('../socket.io.js');

module.exports.cartCheckout = (req, res) => {
    socket.emit('checkout', {message: 'succeeded'});
}

module.exports.getAllHeadphones = (req, res) => {
    Headphones.aggregate([
        {
            $group: {
                _id: '$headphonesType',
                headphones: {
                   $push: {
                       _id: '$_id',
                       name: "$name",
                       price: "$price",
                       noiseCancelingLevel: '$noiseCancelingLevel',
                       description: "$description",
                       image: "$image",
                       creationDate: "$creationDate",
                       updateDate: "$updateDate",
                       headphonesType: "$headphonesType"
                   } 
               }
           }
        }
    ]).then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports.fillData = (req, res) => {
    Headphones.find().then((results)=> {
        if (results.length == 0) {
            let arr = [
                {headphonesType: 'Bose', noiseCancelingLevel: 3, name: 'Quiet Comfort 35', price: 1000, description: 'Premium product by world class brand - BOSE', image: 'QC35.jpg'},
                {headphonesType: 'Bose', noiseCancelingLevel: 2, name: 'Quiet Comfort 25', price: 800, description: 'Premium product by world class brand - BOSE', image: 'QC25.jpg'},
                {headphonesType: 'JBL', noiseCancelingLevel: 3, name: 'Elite v700', price: 850, description: '', image: 'ELITEV700.jpg'},
                {headphonesType: 'AKG', noiseCancelingLevel: 1, name: 'T100SI', price: 100, description: '', image: 'T100SI.jpg'},
                {headphonesType: 'AKG', noiseCancelingLevel: 1, name: 'K845BT', price: 500, description: '', image: 'K845BT.jpg'},
                {headphonesType: 'AKG', noiseCancelingLevel: 2, name: 'K553 PRO', price: 600, description: '', image: 'K553PRO.png'},
                {headphonesType: 'Beats by Dre', noiseCancelingLevel: 3, name: 'Studio', price: 900, description: 'For true rappers', image: 'STUDIO.jpg'},
                {headphonesType: 'Beats by Dre', noiseCancelingLevel: 1, name: 'Solo HD', price: 700, description: '', image: 'SOLOHS.png'},
                {headphonesType: 'Sony', noiseCancelingLevel: 0, name: '1000XM2', price: 150, description: '', image: '1000XM2.jpg'},
                {headphonesType: 'Bose', noiseCancelingLevel: 0, name: 'soundtrue', price: 220, description: '', image: 'soundtrue.jpg'},
                {headphonesType: 'Sony', noiseCancelingLevel: 1, name: 'XB550AP', price: 400, description: '', image: 'XB550AP.jpg'}
            ];

            Headphones.collection.insertMany(arr).then((d)=> {
                console.log(d);
            }).catch(err => {
                console.log(err);
            });
        }
    })
}

module.exports.getHeadphonesById = (req, res) => {
    Headphones.findById(req.params.id).then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });
}

module.exports.addHeadphones = (req, res) => {
    let headphones = new Headphones(req.body);

    headphones.save().then(result => {
        res.json(result);
        socket.emit('headphonesAdded', result.toJSON());
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });
}

module.exports.updateHeadphones = (req, res) => {
    Headphones.findByIdAndUpdate(req.body._id, req.body, {new: true}).then(result => {
        res.json(result);
        socket.emit('headphonesUpdated', result.toJSON());        
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });    
}

module.exports.deleteHeadphones = (req, res) => {
    Headphones.findByIdAndRemove(req.params.id).then(result => {
        res.json(result);
        socket.emit('headphonesRemoved', result.toJSON());                
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });    
}

module.exports.uploadHeadphonesImage = (req, res) => {
    res.json(req.file);
}