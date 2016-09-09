

var app = angular.module("surveyApp", ["ngRoute"]);


//controller for landscape questions
app.controller('landscapeCtrl',function($scope,$http){

   // this.qestionsLandsape = questionsGem;


    $http.get('../csv/complete-cut.json').success(function(data) {

        $scope.questions = data;
        console.log(data);

    });

    $scope.countRate = [1,2,3,4,5,6,7];


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