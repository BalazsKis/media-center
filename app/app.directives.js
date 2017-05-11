app.directive("stopEvent", function() {
    return {
        restrict: "A",
        link: function(scope, element, attr) {
            element.bind("click", function(e) {
                e.stopPropagation();
            });
        }
    };
});

app.directive("enterExecute", function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.enterExecute);
                });

                event.preventDefault();
            }
        });
    };
});