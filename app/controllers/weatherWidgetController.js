(function() {
    'use strict';

    angular.module('app')
        .controller('weatherWidgetController', ['$interval', '$scope', '$http',
            function($interval, $scope, $http) {
                $scope.title = 'Weather widget';
                var wuUrl = 'http://api.wunderground.com/api/#apiKey#/conditions/forecast/q/#location#.json';
                var wuApiKey = '793e759bef2186c4';
                var location = '47.493678,19.074948';
                var updateIntervalMinutes = 5;

                $scope.currentObservation = {};
                $scope.forecast = {};
                updateWeather();

                $interval(updateWeather, updateIntervalMinutes * 60000);

                $scope.switchDetails = function(){
                    if ($scope.detailsType === 'weatherDetails') {
                        $scope.detailsType = 'forecast';
                    } else {
                        $scope.detailsType = 'weatherDetails';
                    }
                };

                function updateWeather() {
                    var url = wuUrl.replace('#apiKey#', wuApiKey).replace('#location#', location);
                    $http.get(url).then(function(response) {
                        $scope.currentObservation = response.data.current_observation;
                        $scope.forecast = response.data.forecast;
                        $scope.switchDetails();
                    });
                }
            }
        ]);
})();