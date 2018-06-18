(function() {
    'use strict';

    angular
        .module('managerModule')
        .component('manageTypes', {
            controller: ManageTypesController,
            controllerAs: 'ctrl',
            templateUrl: 'components/manage.headphones.types/manage.headphones.types.component.html',
            bindings: {
                headphonesTypes: '<'
            }
        });

    ManageTypesController.$inject = ['$mdDialog'];

    function ManageTypesController($mdDialog) {
        var self = this;

        self.$onInit = function() {
            self.headphonesTypes = self.headphonesTypes.data;
        };

        self.openDialog = function(event, headphonesType) {
            $mdDialog.show({
                templateUrl: 'pages/templates/addHeadphonesType.html',
                targetEvent: event,
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    headphonesType: headphonesType,
                    headphonesTypes: self.headphonesTypes,
                },
                controllerAs: 'ctrl',
                controller: function(Factory, headphonesType, headphonesTypes) {
                    var self = this;
                    var isEdit = false;
                    self.headphonesTypes = headphonesTypes;
                    self.headphonesImage = {};

                    self.title = 'Add  Type';
                    
                    self.save = function() {
                        var isFound = self.headphonesTypes.find(function(obj) {
                            return obj.name ===self.headphonesType.name;
                        });

                        if (isFound) {
                            // self.headphonesTypeForm.headphonesTypeName.$error = true;
                            self.isAlreadyExists = true;
                        } else {
                            Factory.addType(self.headphonesType).then(function(result) {
                                $mdDialog.hide();
                                self.headphonesTypes.push(result.data);
                            }).catch(function(err) {
                                console.log('failed to update the requested headphones', err);
                            });
                        }
                    }

                    self.refreshValidation = function() {
                        self.isAlreadyExists = false;
                    }

                    self.close = function() {
                        $mdDialog.hide();
                    }
                }
            });
        }
    }
})();