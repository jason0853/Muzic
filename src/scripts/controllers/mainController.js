module.exports = function($scope, toastr, youtubeFactory) {

    // Insert data
    $scope.youtubeData = youtubeFactory;

    // Load data
    youtubeFactory.init();

    // Define an object property to access scope
    $scope.text = { keyword: ''};

    // Load recent data
    $scope.loadRecentMuzic = function() {
        youtubeFactory.init();
    };

    // Load pupluar data
    $scope.loadPopularMuzic = function() {
        youtubeFactory.popularData();
    };

    // Search music keyword
    $scope.loadSearchMuzic = function(keyword) {

        if (keyword == '') {
            toastr.warning('Please enter some keywords!', 'Warning', {
                closeButton: true
            });
        } else {
            youtubeFactory.searchKeyword(keyword).then(function(response) {
                $scope.text.keyword = '';
            });
        }
    };

};
