

//controller for landscape questions
app.controller('landscapeCtrl',function($scope,$http){

    $http.get('../csv/complete-cut.json').success(function(data) {

        $scope.questions = data;

    });


    $scope._Index = 0;

    // show prev image
    $scope.showPrev = function () {
        $scope._Index =  --$scope._Index;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index =  ++$scope._Index;
        console.log( $scope._Index);
    };







    //number of rate in questionnaire
    $scope.countRate = [1,2,3,4,5,6,7,"don`t know"];



    $scope.showTrack = function (index) {
         $scope._Index = index;
    };


    //var regLater = [^aei];

});



