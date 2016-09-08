
//routing

app.config(function($routeProvider) {
    $routeProvider
        .when("/survey", {
            templateUrl : "survey.html"
        })
        .when("/landscape", {
            templateUrl : "landscape.html"
        })

});
