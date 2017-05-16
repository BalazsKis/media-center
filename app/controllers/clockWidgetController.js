(function() {
    'use strict';

    angular.module('app')
        .controller('clockWidgetController', ['$interval', '$scope', 'dateTimeFormats',
            function($interval, $scope, dateTimeFormats) {

                $scope.currentDateTime = new moment();

                $scope.timeFormat = dateTimeFormats.timeFormat;
                $scope.dateFormat = dateTimeFormats.dateFormatWithDay;

                $interval(update, 250);

                function update() {
                    $scope.currentDateTime = new moment();
                }
            }
        ]);
})();