(function() {
    'use strict';

    angular
        .module('cartModule').
        component('cart', {
            controller: CartController,
            controllerAs: 'ctrl',
            templateUrl: 'components/cart/cart.component.html',
            bindings: {
                cartItems: '<'
            }
        });

    CartController.$inject = ['CartFactory', '$rootScope', '$mdDialog', '$mdToast'];
    
    function CartController(CartFactory, $rootScope, $mdDialog, $mdToast) {
        var self = this;

        self.$onInit = function() {
            self.addToCart = false;
            self.showPrice = false;
            self.getTotalPrice();
            initCanvasTitle();
        }
        
        self.removeItem = function(headphones){		
            var index = self.cartItems.indexOf(headphones);
            self.cartItems.splice(index, 1);
            CartFactory.removeItem(headphones.item._id);
            $rootScope.cartAmount = CartFactory.getCartAmount();
            self.getTotalPrice();
        }
        
        self.updateQty = function(headphones){
            CartFactory.updateItemQty(headphones);
            self.getTotalPrice();
        }

        self.getTotalPrice = function(){
            var usdSum = 0;
            for (var i=0; i<self.cartItems.length; i++){
                usdSum = usdSum + (self.cartItems[i].item.price * self.cartItems[i].qty);
            }

            if (usdSum != 0) {
                self.totalUSDPrice = usdSum;
                CartFactory.convertToNIS(usdSum).then((price)=> {
                    self.totalNISPrice = price.toFixed(2);
                });
            }
        }

        self.checkout = function(ev) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to checkout now?')
                .targetEvent(ev)
                .ok('Yes!')
                .cancel('Continue shopping');

            $mdDialog.show(confirm).then(function() {
                CartFactory.removeAllItems();
                $rootScope.cartAmount = CartFactory.getCartAmount();
                self.cartItems = [];
                $mdToast.show(
                    $mdToast.simple()
                      .textContent('Thank you for shopping!')
                      .position('bottom left')
                      .hideDelay(2000)
                  );

            }, function() {

            });
        }

        function initCanvasTitle() {
            var c = document.getElementById("titlecanvas");
            var ctx = c.getContext("2d");
            ctx.font = "35px Comic Sans";
            ctx.strokeText("My Cart", 10, 50);   
        }
    };
})();