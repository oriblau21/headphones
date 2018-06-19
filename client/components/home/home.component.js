(function() {
    'use strict';

    angular
        .module('headphonesStore')
        .component('home', {
            controller: HomeController,
            controllerAs: 'ctrl',
            templateUrl: 'components/home/home.component.html',
            bindings: {
                headphones: '<'
            }
        });

    HomeController.$inject = ['socketService', 'ViewFactory'];

    function HomeController(socketService, ViewFactory) {
        var self = this;
        self.recommend;
        socketService.emit('home', 'controller');
        socketService.on('data', function(data) {
            console.log(data);
        });

        self.$onInit = function() {
            self.headphones = initData(self.headphones.data);
            self.addToCart = false;
            self.showPrice = false;
            ViewFactory.recommedation().then((data, err) => {
                self.recommend = data.data;
            }).catch(()=> {

            });

            initCanvasTitle("ForYouCanvas", "Just For You");   
            initCanvasTitle("AboutCanvas", "About Us");           
        }

        function initCanvasTitle(id, title) {
            var c = document.getElementById(id);
            var ctx = c.getContext("2d");
            ctx.font = "35px Comic Sans";
            ctx.strokeText(title, 10, 50);   
        }

        function initData(data) {
			if (!data) {
				return data;
			}
			var results = [];
			for (var i = 0; i < data.length; i++) {
				results = results.concat(data[i].headphones);
			}

			return results;
		}
    }
})();