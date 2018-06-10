angular.module('headphonesStore').
    factory('StoreFactory', function StoreFactory($http, $q){
        var service = {
            getAllStores: getAllStores,
            search: search
        }

        return service;
    
        function getAllStores() {
            return $http.get('/api/stores');
        }

        function search(name, city, phone) {
            return $http.post('/api/storesSearch', {name, city, phone});
        }
});