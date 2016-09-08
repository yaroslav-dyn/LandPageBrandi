

var app = angular.module("surveyApp", ["ngRoute"]);



app.controller('surveyAppCtrl',function(){



});

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