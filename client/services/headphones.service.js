angular.module('headphonesStore').
    factory('Factory', function headphonesFactory($http, $q){
        var service = {
            getAllHeadphones: getAllHeadphones,
            getById: getById,
            getAllTypes: getAllTypes,
            add,
            update,
            delete: deleteHeadphones,
            getAllNoiseCancelingLevels: getAllNoiseCancelingLevels,
            addType: addType
        }

        return service;
    
        function getAllHeadphones() {
            return $http.get('/api/headphones');
        }

        function getById(headphonesId) {
            return $http.get('/api/headphones/' + headphonesId);
        }

        function getAllTypes() {
            return $http.get('/api/headphonestypes');
        }

        function add(headphones) {
            return $http.post('/api/headphones', headphones);
        }

        function update(headphones) {
            return $http.put('/api/headphones', headphones);
        }

        function deleteHeadphones(headphonesId) {
            return $http.delete('/api/headphones/' + headphonesId);
        }

        function addType(headphonesType) {
            return $http.post('/api/headphonestypes', headphonesType);
        }

        function getAllNoiseCancelingLevels() {
            return [{
                key:0,
                value:"None"
            }, {
                key:1,
                value:"Low"
            }, {
                key:2,
                value:"Medium"
            }, {
                key:3,
                value:"High"
            }];
        }
});