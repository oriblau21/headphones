const express = require('express');
let app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const socket = require('./server/socket.io.js');

try {
	mongoose.connect('mongodb://127.0.0.1:27017/headphonestore').then(() => {
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
		app.use('/public', express.static('public'));
		app.use('/node_modules', express.static('node_modules'));
		app.use(express.static('client'));

		// Require all mongoose models
		require(path.resolve('server/models/headphones.model.server'));
		require(path.resolve('server/models/headphones.type.model.server'));
		require(path.resolve('server/models/store.model.server'));
		require(path.resolve('server/models/view.model.server'));

		// Require the routes of the project
		require(path.resolve('server/routes/route.server'))(app);
		
		app = socket.init(app);
		
		app.listen(8080, function(){
			console.log("app listening on port 8080");
		});
	}).catch(err => {
		console.log(err);
		throw err;
	});

} catch (err) {
	cconsole.log(err);
	throw err;
}