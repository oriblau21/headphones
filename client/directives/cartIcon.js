angular.module('cartModule').
    directive('cartIcon', ['CartFactory', function(CartFactory){
        return {
            restrict: 'E',
            replace: true,
			scope: false,
            templateUrl: 'pages/templates/cartIcon.html',
			link: function(scope, element, attrs){
				scope.$root.cartAmount = CartFactory.getCartAmount();
			}
		}
	}]);