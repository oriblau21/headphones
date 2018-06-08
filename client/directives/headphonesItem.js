(function() {
    'use strict';

    angular
        .module('headphonesStore')
        .directive('headphonesItem', ['Factory', function(Factory){
            return {
                restrict: 'E',
                replace: true,
                transclude:true,
                scope:{
                    headphones: '=',
                    addToCart: '=',
                    showPrice: '='
                },
                templateUrl: 'pages/templates/headphonesItem.html',
                link: function(scope, element, attrs) {
                    scope.imageUrl = scope.headphones.image ? 'public/Images/' + scope.headphones.image : 'public/Images/headphones.jpg';
                }
            }
    }]);
})();

