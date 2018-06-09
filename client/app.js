(function(){
    
    angular.module('headphonesStore',['ui.router', 'ngMessages', 'ngMaterial', 'ngFileUpload', 'nvd3']).
	run(function($rootScope, $location){
		$rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
			event.preventDefault();
			$location.path('/error');
		});
	});
})();
