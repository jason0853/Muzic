module.exports = function($config, $firebaseAuth) {
    var authFactory = {};

    // Initialize FirebaseAuth
    var ref = new Firebase($config.firebaseUrl);
    var auth = $firebaseAuth(ref);

    authFactory.auth = function() {
        return auth;
    };

    // Insert into data to create an account
    authFactory.createUser = function(user) {
        return auth.$createUser({
            email: user.email,
            password: user.password
        });
    };

    // Login authentication
    authFactory.authUser = function(login) {
        return auth.$authWithPassword({
            email: login.email,
            password: login.password
        });
    };

    // Log out
    authFactory.logout = function() {
        auth.$unauth();
    };


    return authFactory;
};
