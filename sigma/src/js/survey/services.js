
//routing

app.config(function($routeProvider) {
    $routeProvider

        .when("/", {
            templateUrl : "/survey/survey.html"
        })
        .when("/landscape", {
            templateUrl : "/survey/landscape.html"
        })


});
