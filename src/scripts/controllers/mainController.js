module.exports = function($scope, toastr, youtubeFactory) {

    // Insert data
    $scope.youtubeData = youtubeFactory;

    // Define an object property to access scope
    $scope.text = { keyword: ''};

    // Load data
    youtubeFactory.init();

    $scope.isActive = true;

    // Load recent data
    $scope.loadRecentMuzic = function() {
        youtubeFactory.init();
        $scope.isActive = true;
    };

    // Load pupluar data
    $scope.loadPopularMuzic = function() {
        youtubeFactory.popularData();
        $scope.isActive = false;
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
