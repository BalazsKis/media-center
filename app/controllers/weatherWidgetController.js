(function(){
    'use strict';
    
    angular.module("app")
    .controller("weatherWidgetController", ["$timeout", "$scope",
        function($timeout, $scope) {
            $scope.title='Weather widget placeholder';
        }
    ]);
})();