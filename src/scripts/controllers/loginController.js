module.exports = function($scope) {

    // initial singup flag value
    $scope.signupStatus = false;

    // Define singup global variable
    $scope.user = {};

    // sign up button toggle event
    $scope.signupToggle = function() {
        $scope.signupStatus = !$scope.signupStatus;
    };

    // Create an account
    $scope.register = function(valid) {

        if (valid) {
            console.log($scope.user);
        } else {
            console.log('inValid Form!');
        }
    };
};
