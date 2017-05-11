app.config(function($routeProvider) {

    $routeProvider
        .when("/home", { templateUrl: "app/views/home.html", controller: "homeController" })
        .otherwise({ templateUrl: "app/views/home.html", controller: "homeController" });

});