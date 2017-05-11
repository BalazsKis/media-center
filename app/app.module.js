var app = angular.module("app", ["ngRoute", "ngAnimate", "ngAria", "ngMessages"]);

app.run(
    ["$rootScope", "dateTimeFormats",
        function($rootScope, dateTimeFormats) {

            $rootScope.globalDateFormat = dateTimeFormats.dateFormat;
            $rootScope.globalDateTimeFormat = dateTimeFormats.dateTimeFormat;
            $rootScope.globalShortDateTimeFormat = dateTimeFormats.shortDateTimeFormat;

        }
    ]);