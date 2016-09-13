

var app = angular.module("surveyApp", ["ngRoute"]);


//controller for landscape questions
app.controller('landscapeCtrl',function($scope,$http){

    $http.get('../csv/complete-cut.json').success(function(data) {

        $scope.questions = data;


    });

    //number of rate in questionnaire
    $scope.countRate = [1,2,3,4,5,6,7,"don`t know"];



    //var regLater = [^aei];


});

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