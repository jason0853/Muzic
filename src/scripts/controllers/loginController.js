module.exports = function($scope) {

    // initial singup flag value
    $scope.signupStatus = false;

    // sign up button toggle event
    $scope.signupToggle = function() {
        $scope.signupStatus = !$scope.signupStatus;
    };

    
};
