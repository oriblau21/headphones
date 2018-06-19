(function() {
    'use strict';

    angular
        .module('managerModule')
        .component('managerStatistics', {
            controller: managerStatisticsController,
            controllerAs: 'ctrl',
            templateUrl: 'components/manager.statistics/manager.statistics.component.html',
            bindings: {
                headphones: '<'
            }
        });

        managerStatisticsController.$inject = ['Factory'];

    function managerStatisticsController(Factory) {
        var self = this;
		self.options = {
                chart: {
                    type: 'pieChart',
                    height: 500,
                    x: function(d){return d._id;},
                    y: function(d){return d.headphones.length;},
                    showLabels: true,
                    valueFormat: function(d){
                        return d3.format(',')(d);
                    },
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
        };
        self.barOptions = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.key;},
                y: function(d){
                    return d.value.length;
                },
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Noise canceling level'
                },
                yAxis: {
                    axisLabel: 'Number of products',
                    axisLabelDistance: -10
                }
            }
    };
		self.$onInit = function() {
            self.headphones = self.headphones.data;
            self.headphonesByLevels = initData(self.headphones);
            self.headphonesByLevels = [
                {
                    key: "Cumulative Return",
                    values: self.headphonesByLevels
                }
            ]

            initCanvasTitle();
		}

		function initData(data) {
			if (!data) {
				return data;
			}
			var results = [];
			for (var i = 0; i < data.length; i++) {
				results = results.concat(data[i].headphones);
			}

            let levels = Factory.getAllNoiseCancelingLevels();
            for (var i = 0; i < levels.length; i++) {
				levels[i].value = [];
            }

            for (var i = 0; i < results.length; i++) {
				levels[results[i].noiseCancelingLevel].value.push(results[i]);
            }

			return levels;
        }

        function initCanvasTitle() {
            var c = document.getElementById("titlecanvas");
            var ctx = c.getContext("2d");
            ctx.font = "35px Comic Sans";
            ctx.strokeText("Statistics", 10, 50);   
        }
    }
})();