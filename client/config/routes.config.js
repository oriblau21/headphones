(function() {
    'use strict';

    angular
        .module('headphonesStore')
        .config(['$stateProvider', '$urlRouterProvider', routesConfigFunction]);

    function routesConfigFunction($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                component: 'home',
                resolve: {
                    headphones: function(Factory){
                        return Factory.getAllHeadphones();
                    }
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: 'pages/about.html'
            })
            .state('stores', {
                url: '/stores',
                component: 'stores',
                resolve: {
                    stores: function(StoreFactory) {
                        return StoreFactory.getAllStores();
                    }
                }
            })
            .state('headphones', {
                url: '/headphones',
                component: 'headphones',
                resolve: {
                    headphones: function(Factory){
                        return Factory.getAllHeadphones();
                    },
                    headphonesTypeList: function(Factory){
                        return Factory.getAllTypes();
                    }
                }
            })
            .state('headphones', {
                url: '/headphones/:id',
                component: 'headphones',
                resolve: {
                    headphones: function(Factory, $stateParams){
                        return Factory.getById($stateParams.id);
                    }
                }
            })
            .state('manager-headphones', {
                url: '/manager-headphones',
                component: 'manageHeadphones',
                resolve: {
                    headphones: function(Factory){
                        return Factory.getAllHeadphones();
                    },
                    headphonesTypeList: function(Factory){
                        return Factory.getAllTypes();
                    }
                }                
            })
            .state('manager-headphonestypes', {
                url: '/manager-headphonestypes',
                component: 'manageTypes',
                resolve: {
                    headphonesTypes: function(Factory){
                        return Factory.getAllTypes();
                    }
                }
            })
            .state('cart', {
                url: '/cart',
                component: 'cart',
                resolve: {
                    cartItems: function(CartFactory){
                        return CartFactory.getCartItems();
                    }
                }         
            })
            .state('error', {
                utl: '/error',
                component: ''				
            });            
    }
})();