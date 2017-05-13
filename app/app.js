(function () {
    'use strict';
    angular.module('moment-module', [])
    .factory('moment', function ($window) {
        return $window.moment;
    });

    angular.module("app", ["ngRoute", "ngAnimate", "ngAria", "ngMessages", "moment-module"])
    .run(["$rootScope", "dateTimeFormats",
        function($rootScope, dateTimeFormats) {

            $rootScope.globalDateFormat = dateTimeFormats.dateFormat;
            $rootScope.globalDateTimeFormat = dateTimeFormats.dateTimeFormat;
            $rootScope.globalShortDateTimeFormat = dateTimeFormats.shortDateTimeFormat;

        }
    ]);
})();