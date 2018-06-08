'use strict';

const headphonesController = require('../controllers/headphones.controller.server');
const headphonesTypesController = require('../controllers/headphones.types.controller.server');
const storesController = require('../controllers/stores.controller.server');
const viewsController = require('../controllers/view.controller.server');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/Images/'));
    }
});

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000,
        files: 1
    },
    fileFilter: imageFilter
});

function imageFilter(req, file, cb) {
    // accept image only
    if (!file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    
    cb(null, true);
};

module.exports = (app) => {
    app.route('/').get((req, res) => {  
        headphonesController.fillData();
        headphonesTypesController.fillData();
        storesController.fillData();
		res.sendFile(path.resolve('server/views/index.html'));
	});

    app.route('/api/headphones')
        .get(headphonesController.getAllHeadphones)
        .post(headphonesController.addHeadphones)
        .put(headphonesController.updateHeadphones);

    app.route('/api/headphones/:id')
        .get(headphonesController.getHeadphonesById)
        .delete(headphonesController.deleteHeadphones);

    app.route('/api/upload').post(upload.single('file'), headphonesController.uploadHeadphonesImage);

    app.route('/api/headphonestypes')
        .get(headphonesTypesController.getAllHeadphonesTypes)
        .post(headphonesTypesController.addHeadphonesType);

    app.route('/api/stores').get(storesController.getAllStores);

    app.route('/api/cart').get(headphonesController.cartCheckout);

    app.route('api/view')
        .get(viewsController.recommend)
        .put(viewsController.newView);

}

