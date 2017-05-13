(function(){
    'use strict';
    
    angular.module('app')
    .controller('weatherWidgetController', ['$timeout', '$scope', '$http',
        function($timeout, $scope, $http) {
            $scope.title='Weather widget placeholder';
            var wuUrl = 'http://api.wunderground.com/api/#apiKey#/conditions/q/#location#.json';
            var wuApiKey = 'f116d809a1ca39ac'; // TODO: register new key
            var location = '47.493678,19.074948';
            var updateIntervalMinutes = 5;

            $scope.currentObservation = {};
            updateWeather();

            $timeout(updateWeather, updateIntervalMinutes * 60000);

            function updateWeather() {
                var url = wuUrl.replace('#apiKey#', wuApiKey).replace('#location#', location);
                $http.get(url).then(function(response){
                    $scope.currentObservation = response.data.current_observation;
                });
            }
        }
    ]);
})();