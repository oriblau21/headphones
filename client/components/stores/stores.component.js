(function () {
    'use strict';

    angular
        .module('headphonesStore')
        .component('stores', {
            templateUrl: 'components/stores/stores.component.html',
            controller: StoresController,
            controllerAs: 'ctrl',
            bindings: {
                stores: '<'
            }
        });

    StoresController.$inject = ['$http', 'StoreFactory'];

    function StoresController($http, StoreFactory) {
        var self = this;

        self.$onInit = function () {
            self.stores = self.stores.data;
            let mapProp = {
                center: new google.maps.LatLng(31.9228112, 34.9718815),
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);


            angular.forEach(self.stores, (store) => {
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + store.address + "," + store.city + '&sensor=false')
                .then((response) => {
                    var custLocation = response.data.results[0].geometry.location;
                    var custMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(custLocation.lat, custLocation.lng),
                        map: map
                    });

                    var markerContent = '<div class="mapMarkerContent">' + store.name + '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: markerContent
                    });

                    custMarker.addListener('click', function () {
                        infowindow.open(map, custMarker);
                    });
                })
            })

            initCanvasTitle();
        }

        self.search = ()=>{
            StoreFactory.search(self.storeName, self.storeCity, self.storePhone).then((data, err) => {
                if (data.data) {
                    self.stores = data.data;
                }
            }).catch(err => {
            });
        };

        function initCanvasTitle() {
            var c = document.getElementById("titlecanvas");
            var ctx = c.getContext("2d");
            ctx.font = "35px Comic Sans";
            ctx.strokeText("Our Stores", 10, 50);   
        }
    }
})()