angular.module('headphonesStore').
    directive('store', function(){
        return {
            restrict: 'E',
            replace: true,
			transclude: true,
            scope:{
                store: '='
            },
            templateUrl: 'pages/templates/store.html'
		}
    });