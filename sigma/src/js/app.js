

var app = angular.module("surveyApp", ["ngRoute"]);


//controller for landscape questions
app.controller('landscapeCtrl',function($scope,$http){

    $http.get('../csv/complete-cut.json').success(function(data) {

        $scope.questions = data;

    });


    //first question
    $scope._Index = 0;

    // show prev question
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : 0;
    };

    // show next question
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.questions.nodes.length - 1) ? ++$scope._Index : $scope.questions.nodes.length-1;
        console.log($scope.questions.nodes.length-1);

    };

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