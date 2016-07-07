module.exports = function($scope, youtubeFactory) {

    // Insert data
    $scope.youtubeData = youtubeFactory;

    // Load data
    youtubeFactory.init();

    // Load recent data
    $scope.loadRecentMuzic = function() {
        youtubeFactory.init();
    };

    // Load pupluar data
    $scope.loadPopularMuzic = function() {
        youtubeFactory.popularData();
    };

};
