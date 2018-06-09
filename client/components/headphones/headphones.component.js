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

    Controller.$inject = ['ViewFactory'];

    function Controller(ViewFactory){
        var self = this;

        self.$onInit = function() {
            self.headphones = self.headphones.data;
            ViewFactory.newView(self.headphones.noiseCancelingLevel, self.headphones._id);
            self.addToCart = true;
            self.imageUrl = self.headphones.image ? 'public/Images/' + self.headphones.image : 'public/Images/headphones.jpg';
        };        
    }
})()