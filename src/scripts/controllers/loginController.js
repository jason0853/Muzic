module.exports = function($scope) {

    $scope.signupStatus = false;

    // sign up button toggle event
    $scope.signupToggle = function() {
        $scope.signupStatus = !$scope.signupStatus;
        console.log($scope.signupStatus);
    };
};
