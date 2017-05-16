(function() {
    'use strict';

    angular.module('app')
        .controller('clockWidgetController', ['$interval', '$scope',
            function($interval, $scope) {

                $scope.currentDateTime = new moment();

                $interval(update, 250);

                function update() {
                    $scope.currentDateTime = new moment();
                }
            }
        ]);
})();