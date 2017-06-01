(function() {
    'use strict';

    angular.module("app")
        .controller("homeController", ["$scope", "$timeout", "moment",
            function($scope, $timeout, moment) {

                //TODO: Write home functionality here.

                var osUtils = require('os-utils');

                function logSysInfo() {

                    console.log('RAM Usage (%): ' + ((1 - osUtils.freememPercentage()) * 100));

                    osUtils.cpuUsage(function(v) {
                        console.log('CPU Usage (%): ' + v * 100);
                    });
                    setTimeout(logSysInfo, 2000);
                }

                logSysInfo();

            }
        ]);
})();