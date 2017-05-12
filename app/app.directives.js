app.directive("stopEvent", function () {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            element.bind("click", function (e) {
                e.stopPropagation();
            });
        }
    };
});

app.directive("enterExecute", function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.enterExecute);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('updateBackground', function ($http) {
    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    return {
        restrict: 'AE',
        replace: true,
        link: function (scope, elem, attrs) {
            setInterval(function () {
                $http({
                    method: 'GET',
                    url: 'https://source.unsplash.com/3840x2160?nature,landscape',
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var str = _arrayBufferToBase64(response.data);
                    elem.css("background-image", 'url("data:image/jpg;base64,' + str + '")');
                });
            }, 3600000);
        }
    };
});