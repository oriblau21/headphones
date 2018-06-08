angular.module('headphonesStore').
    factory('ViewFactory', function StoreFactory($http, $q){
        var service = {
            newView: newView,
            recommedation: recommedation
        }

        return service;
    
        function newView(noiseCancelLevel, prodId) {
            const now = new Date();
            const view = {
                noiseCancelLevel,
                productId: prodId,
                viewDate: now
            };
            return $http.put('/api/view', view);
        }

        function recommedation() {
            return $http.get('/api/view');
        }
});