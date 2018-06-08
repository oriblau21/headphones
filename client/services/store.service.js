angular.module('headphonesStore').
    factory('StoreFactory', function StoreFactory($http, $q){
        var service = {
            getAllStores: getAllStores
        }

        return service;
    
        function getAllStores() {
            return $http.get('/api/stores');
        }
});