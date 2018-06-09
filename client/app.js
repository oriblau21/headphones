(function(){
    
    angular.module('headphonesStore',['ui.router', 'ngMessages', 'ngMaterial', 'ngFileUpload', 'nvd3', 'managerModule', 'cartModule']).
	run(function($rootScope, $location){
		$rootScope.$on('$routeChangeError', function(event, current, previous, rejection, managerModule, cartModule){
			event.preventDefault();
			$location.path('/error');
		});
	});
})();
