'use strict';

const mongoose = require('mongoose');
const Twit = require('twit')
let T;
module.exports.init = () => {
    if (process.env.CONSUMER_KEY &&
        process.env.CONSUMER_SECRET &&
        process.env.ACCESS_TOKEN &&
        process.env.ACCESS_SECRET) {
        T = new Twit({
            consumer_key:         process.env.CONSUMER_KEY,
            consumer_secret:      process.env.CONSUMER_SECRET,
            access_token:         process.env.ACCESS_TOKEN,
            access_token_secret:  process.env.ACCESS_SECRET,
        });
    }
};

module.exports.postTweet = (req, res) => {
    const status = req.body.text;
    if (!T || !status || status === ''){
        res.status(500).end();
    } else {
        T.post('statuses/update', { status }, function(err, data, response) {
            if (err){
                res.status(500).end();
            } else {
                res.status(200).end();
            }
        });
    }
};