(function() {
    'use strict';

    angular
        .module('headphonesStore')
        .component('manageHeadphones', {
            controller: ManageHeadphonesController,
            controllerAs: 'ctrl',
            templateUrl: 'components/manage.headphones/manage.headphones.component.html',
            bindings: {
                headphones: '<',
				headphonesTypeList: '<'
            }
        });

    ManageHeadphonesController.$inject = ['$mdDialog', 'Factory', 'CartFactory', '$timeout', 'socketService'];

    function ManageHeadphonesController($mdDialog, Factory, CartFactory, $timeout, socketService) {
        var self = this;
		
		self.$onInit = function() {
			self.headphones = initData(self.headphones.data);
			self.headphonesTypeList = self.headphonesTypeList.data;
			self.orderbyfilter = "";
			self.addToCart = true;
			self.showPrice = true;
			self.noiseCancelingLevels = Factory.getAllNoiseCancelingLevels();
		
			self.typeFilter = {};
			for (var i=0; i< self.headphonesTypeList.length; i++){
				self.typeFilter[self.headphonesTypeList[i].name]=true;
			} 
			
			self.noiseCancelFilter = {};
			for (var i=0; i< self.noiseCancelingLevels.length; i++){
				self.noiseCancelFilter[self.noiseCancelingLevels[i].key]=true;
			}
		}

		self.filterByType = function(headphones){
			for	(var i=0; i< self.headphonesTypeList.length; i++){
				if (self.typeFilter[self.headphonesTypeList[i].name]){
					if (headphones.headphonesType == self.headphonesTypeList[i].name){
						return true;
					}
				}
			}		
			return false;
		}
		
		self.filterByNoiseCancelingLevel = function(headphones){
			for	(var i=0; i< self.noiseCancelingLevels.length; i++){
				if (self.noiseCancelFilter[self.noiseCancelingLevels[i].key]){
					if (headphones.noiseCancelingLevel == self.noiseCancelingLevels[i].key){
						return true;
					}
				}
			}		
			return false;
        }
        
        socketService.on('headphonesTypeAdded', function(data) {
			self.headphonesTypeList.push(data);
		});

		function initData(data) {
			if (!data) {
				return data;
			}
			var results = [];
			for (var i = 0; i < data.length; i++) {
				results = results.concat(data[i].headphones);
			}

			return results;
        }

        function getHeadphones() {
            Factory.getAllHeadphones().then(function(result) {
                self.headphones = initData(result.data);
            });
        }
        
        self.delete = function(headphonesId) {
            Factory.delete(headphonesId).then(function() {
                self.removed = headphonesId;

                $timeout(function(){
                    CartFactory.removeItem(headphonesId);
                    getHeadphones();
                }, 600);
            });
        }

        self.openDialog = function(event, headphones) {
            $mdDialog.show({
                templateUrl: 'pages/templates/addEdit.html',
                targetEvent: event,
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    headphones: headphones,
                    headphonesTypes: self.headphonesTypeList,
                    noiseCancelingLevels: self.noiseCancelingLevels
                },
                controllerAs: 'ctrl',
                controller: function(Factory, headphones, headphonesTypes, noiseCancelingLevels, Upload, CartFactory) {
                    var self = this;
                    var isEdit = false;
                    self.headphones = angular.copy(headphones);
                    self.headphonesTypes = headphonesTypes;
                    self.noiseCancelingLevels = noiseCancelingLevels;
                    self.headphonesImage = {};

                    self.title = 'Add ';
                    if (self.headphones) {
                        isEdit = true;
                        self.title = 'Edit ';
                        self.headphonesImage.name = self.headphones.name + '.jpg';
                    }

                    self.save = function() {
                        Upload.upload({
                            url: '/api/upload',
                            data: {file: self.headphonesImage}
                        }).then(function(result) {
                            self.headphones.image = result.data.filename;

                            if (isEdit) {
                                Factory.update(self.headphones).then(function(result) {
                                    $mdDialog.hide();

                                    var headphonesFromCart = CartFactory.getCartItem(result.data._id);

                                    if (headphonesFromCart) {
                                        CartFactory.removeItem(result.data._id);
                                        CartFactory.addCartItem(result.data);
                                    }
                                    
                                    getHeadphones();
                                }).catch(function(err) {
                                    console.log('failed to update the requested headphones', err);
                                });
                            } else {
                                Factory.add(self.headphones).then(function() {
                                    $mdDialog.hide();
                                    getHeadphones();
                                }).catch(function(err) {
                                    console.log('failed to update the requested headphones', err);
                                });
                            }
                        }).catch(function(err) {
                            console.log('failed to upload the requested image');
                        });
                    }

                    self.close = function() {
                        $mdDialog.hide();
                    }
                }
            });
        }
    }
})();