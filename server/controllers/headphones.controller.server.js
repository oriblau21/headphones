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
                teas: {
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
                {headphoneType: 'Bose', noiseCancelingLevel: 5, name: '', price: 1000, description: '', image: ''},
                {headphoneType: 'Bose', noiseCancelingLevel: 4, name: '', price: 800, description: '', image: ''},
                {headphoneType: 'JBL', noiseCancelingLevel: 4, name: '', price: 850, description: '', image: ''},
                {headphoneType: 'JBL', noiseCancelingLevel: 1, name: '', price: 100, description: '', image: ''},
                {headphoneType: 'AKG', noiseCancelingLevel: 3, name: '', price: 500, description: '', image: ''},
                {headphoneType: 'AKG', noiseCancelingLevel: 4, name: '', price: 600, description: '', image: ''},
                {headphoneType: 'Beats by Dre', noiseCancelingLevel: 5, name: '', price: 900, description: '', image: ''},
                {headphoneType: 'Beats by Dre', noiseCancelingLevel: 3, name: '', price: 700, description: '', image: ''},
                {headphoneType: 'Sony', noiseCancelingLevel: 0, name: '', price: 150, description: '', image: ''},
                {headphoneType: 'Bose', noiseCancelingLevel: 1, name: '', price: 220, description: '', image: ''},
                {headphoneType: 'Sony', noiseCancelingLevel: 2, name: '', price: 400, description: '', image: ''}
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