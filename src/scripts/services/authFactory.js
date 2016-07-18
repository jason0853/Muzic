module.exports = function($rootScope, $config, $firebaseAuth, $firebaseArray) {
    var authFactory = {};

    // Initialize FirebaseAuth
    var rootRef = new Firebase($config.firebaseUrl);
    var auth = $firebaseAuth(rootRef);
    authFactory.userInfo = $firebaseArray(rootRef);

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

    // Create nickname
    authFactory.createNickname = function(user, userData) {
        return authFactory.userInfo.$add({
            nickname: user.nickname,
            userId: userData.uid
        });
    };

    // Log out
    authFactory.logout = function() {
        auth.$unauth();
    };

    // Check if user is logged in
    authFactory.checkUser = function() {
        var user = auth.$getAuth();
        if (user) {
            rootRef.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    if (user.uid == childData.userId) {
                        // mark nickname
                        $rootScope.nickname = childData.nickname;
                        authFactory.key = key;
                    }
                });
            });
        }
    };


    return authFactory;
};
