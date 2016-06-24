module.exports = function($scope, $location, $window, toastr, authFactory) {

    // initial singup flag value
    $scope.signupStatus = false;

    // sign up button toggle event
    $scope.signupToggle = function() {
        $scope.signupStatus = !$scope.signupStatus;
    };

    // Create an account
    $scope.register = function(valid, user) {

        if (valid) {
            var result = authFactory.createUser(user);
            result.then(function(userData) {
                // console.log('User Successfully created with uid: ', userData.uid);
                toastr.success('Your account has been created successfully.', 'Success', {
                    closeButton: true
                });
                $window.location.href = '/';

            }, function(error) {
                // console.log('an error occurred ', error);
                toastr.error('The specified email address is already in use.', 'Error', {
                    closeButton: true
                });
            });
        } else {
            console.log('inValid Form!');
        }
    };

    // Log in
    $scope.login = function(login) {
        var result = authFactory.authUser(login);
        result.then(function(authData) {
            // console.log('User Logged in successfully with uid: ', authData.uid);
            // $window.location.href = '/#/main';
            toastr.success('User Logged in successfully.', 'Success', {
                closeButton: true
            });
            $location.path('/main');
        }, function(error) {
            // console.log('an Authentication error occurred', error);
            toastr.error('an Authentication error occurred', 'Error', {
                closeButton: true
            });
        });
    };
};
