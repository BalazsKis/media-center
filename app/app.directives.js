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

app.directive('updateBackground', function() {
    return {
        restrict: 'AE',
        replace: true,
        link: function(scope, elem, attrs) {
            setInterval(function() {
                elem.css("background-image", 'url("https://source.unsplash.com/3840x2160?nature,landscape")');
            }, 10000);
        }
    };
});