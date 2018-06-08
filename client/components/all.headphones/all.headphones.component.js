(function() {
    'use strict';

    angular
        .module('headphonesStore')
        .component('headphonesList', {
            templateUrl: 'components/all.headphones/all.headphones.component.html',
            controller: HeadphonesController,
			controllerAs: 'ctrl',
			bindings: {
				headphones: '<',
				headphonesTypeList: '<'
			}
        });

    HeadphonesController.$inject = ['$scope', 'Factory', 'socketService'];

    function HeadphonesController($scope, Factory, socketService) {
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

		socketService.on('headphonesAdded', function(data) {
			$scope.$apply(function() {
				self.headphones.push(data);
			});
		});

		socketService.on('headphonesUpdated', function(data) {
			var index = self.headphones.findIndex(function(obj) {
				return obj._id === data._id;
			});

			$scope.$apply(function() {
				self.headphones[index] = data;
			});
		});

		socketService.on('headphonesTypeAdded', function(data) {
			$scope.$apply(function() {
				self.headphonesTypeList.push(data);
			});
		});

		socketService.on('headphonesRemoved', function(data) {
			var index = self.headphones.findIndex(function(obj) {
				return obj._id === data._id;
			});

			$scope.$apply(function() {
				self.headphones.splice(index, 1);
			});
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
    }
})()