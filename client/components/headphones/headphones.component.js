(function() {
    'use strict';

    angular
        .module('headphonesStore')
        .component('headphones', {
            templateUrl: 'components/headphones/headphones.component.html',
            controller: Controller,
            controllerAs: 'ctrl',
            bindings: {
                headphones: '<'
            }
        });

    Controller.$inject = [];

    function Controller(){
        var self = this;

        self.$onInit = function() {
            self.headphones = self.headphones.data;
            self.addToCart = true;
            self.imageUrl = self.headphones.image ? 'public/Images/' + self.headphones.image : 'public/Images/headphones.jpg';
        };        
    }
})()