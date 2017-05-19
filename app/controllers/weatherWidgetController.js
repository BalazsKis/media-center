(function() {
    'use strict';

    angular.module('app')
        .controller('weatherWidgetController', ['$interval', '$scope', '$http',
            function($interval, $scope, $http) {
                $scope.title = 'Weather widget';
                var wuUrl = 'http://api.wunderground.com/api/#apiKey#/conditions/forecast/q/#location#.json';
                var wuApiKey = '793e759bef2186c4';
                var geoUrl = "https://www.googleapis.com/geolocation/v1/geolocate?key=#apiKey#";
                var geoApiKey = "AIzaSyBK4iC3b98ptxSs3o-DPgqqiPPQQvRjmt4";
                var updateIntervalMinutes = 5;
                var location = {
                    latitude: 47.492690,
                    longitude: 19.071557,
                    toString: function() {
                        return this.latitude + "," + this.longitude;
                    }
                };

                $scope.currentObservation = {};
                $scope.forecast = {};

                getLocation();
                updateWeather();

                $interval(updateWeather, updateIntervalMinutes * 60000);

                $scope.switchDetails = function() {
                    if ($scope.detailsType === 'weatherDetails') {
                        $scope.detailsType = 'forecast';
                    } else {
                        $scope.detailsType = 'weatherDetails';
                    }
                };

                function updateWeather() {
                    var url = wuUrl.replace('#apiKey#', wuApiKey).replace('#location#', location.toString());
                    $http.get(url).then(function(response) {
                        $scope.currentObservation = response.data.current_observation;
                        $scope.forecast = response.data.forecast;
                        $scope.switchDetails();
                    });
                }

                function getLocation() {
                    var url = geoUrl.replace('#apiKey#', geoApiKey);
                    $http.post(url, '{"considerIp": "true"}').then(function(response) {
                        if (response.data.accuracy < 2000) {
                            location.latitude = response.data.location.lat;
                            location.longitude = response.data.location.lng;
                        }
                    });
                }
            }
        ]);
})();