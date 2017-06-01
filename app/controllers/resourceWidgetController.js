(function() {
    'use strict';

    angular.module("app")
        .controller("resourceController", ["$scope", "$interval",
            function($scope, $interval) {
                var osUtils = require('os-utils');
                
                var cpuUpdateIntervalSeconds = 2;
                var memoryUpdateIntervalSeconds = 2;

                $scope.memoryTotal = Math.round(osUtils.totalmem() / 1000); //in GB

                $interval(updateCpuUsage, cpuUpdateIntervalSeconds * 1000);
                $interval(updateMemoryUsage, memoryUpdateIntervalSeconds * 1000);

                function updateCpuUsage() {
                    osUtils.cpuUsage(function(value) {
                        $scope.cpuUsage = Math.round(value * 100);
                    });
                }

                function updateMemoryUsage() {
                    $scope.memoryUsage = Math.round((1 - osUtils.freememPercentage()) * 100);
                }

            }
        ]);
})();