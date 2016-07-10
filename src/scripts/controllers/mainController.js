module.exports = function($scope, toastr, youtubeFactory) {

    // Insert data
    $scope.youtubeData = youtubeFactory;

    $scope.myMuzicData = [];

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

    // Add a music item
    $scope.addMuzic = function(idx, item) {
        // Check duplicated data
        var duplicateCheck = $scope.myMuzicData.reduce(function(previous, value, index) {
            if (item.id.videoId === value.id) {
                return true;
            }
            return previous;
        }, false);

        if (duplicateCheck) {
            toastr.warning('You can not select deplicated music.', 'Warning', {
                closeButton: true
            });
        } else {
            $scope.myMuzicData.push({
                id: $scope.youtubeData.muzic[idx].id.videoId,
                title: $scope.youtubeData.muzic[idx].snippet.title,
                time:  $scope.youtubeData.muzic[idx].duration
            });

            // active state in list
            $scope.activeMuzic = $scope.myMuzicData.length - 1;
        }
    };

    // Remove a music item in list
    $scope.deleteMuzic = function(idx) {
        $scope.myMuzicData.splice(idx, 1);
    };

    // Select a music item in list
    $scope.selectMuzic = function(idx) {
        $scope.activeMuzic = idx;
    };
};
