module.exports = function($rootScope, $timeout) {
    return {
        request: function(config) {
            $rootScope.loading = true;
            return config;
        },
        response: function(response) {
            $timeout(function() {
                $rootScope.loading = false;
            }, 1500);
            return response;
        }
    }
};
