'use strict';

const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const socket = require('../socket.io.js');

module.exports.getAllStores = (req, res) => {
    socket.on('home', (data) => {
        console.log(data);
        socket.emit('data', 'socket test succeeded');
    });
    Store.find().then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports.fillData = (req, res) => {
    Store.find().then((results) => {
        if (results.length == 0) {

            let arr = [
                {name:"Hear", address:"הקוקיה 12", city:"ראשון לציון", phone:"053-6753595"},
                {name:"Electronics", address:"הרצל 65", city:"רחובות", phone:"03-9581214"},
                {name:"Sounds Great", address:"המעפיל 22", city:"רחובות", phone:"054-4572572"}];

            Store.collection.insertMany(arr).then((d)=> {
                console.log(d);
            }).catch(err => {
                console.log(err);
            });
        }
    })
}