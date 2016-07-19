module.exports = function($scope, $rootScope, toastr, playerService, youtubeFactory, playerListFactory) {

    // Insert data
    $scope.youtubeData = youtubeFactory;
    $scope.myMuzicData = playerListFactory.muzic;

    // Define an object property to access scope
    $scope.text = { keyword: ''};

    // Load data
    youtubeFactory.init(false);

    $scope.isRecentActive = true;
    $scope.isPopularActive = false;

    // Load recent data
    $scope.loadRecentMuzic = function() {
        youtubeFactory.init(false);
        $scope.isRecentActive = true;
        $scope.isPopularActive = false;
    };

    // Load pupluar data
    $scope.loadPopularMuzic = function() {
        youtubeFactory.popularData(false);
        $scope.isPopularActive = true;
        $scope.isRecentActive = false;
    };

    // Search music keyword
    $scope.loadSearchMuzic = function(bool, keyword) {
        if (keyword == '') {
            toastr.warning('Please enter some keywords!', 'Warning', {
                closeButton: true
            });
        } else {
            youtubeFactory.searchKeyword(bool, keyword);
            $scope.isPopularActive = false;
            $scope.isRecentActive = false;
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
            toastr.warning('You can not select deplicated music.', 'Warning', { closeButton: true });
        } else {
            $scope.myMuzicData.push({
                id: $scope.youtubeData.muzic[idx].id.videoId,
                title: $scope.youtubeData.muzic[idx].snippet.title,
                time:  $scope.youtubeData.muzic[idx].duration
            });

            playerListFactory.addData({
                id: $scope.youtubeData.muzic[idx].id.videoId,
                title: $scope.youtubeData.muzic[idx].snippet.title,
                time:  $scope.youtubeData.muzic[idx].duration
            }).then(function(ref) {
                var id = ref.key();
                console.log(id);
            });

            // active state in list
            $rootScope.activeMuzic = 0;
        }
        // insert a data of player list into factory service
        playerListFactory.muzic = $scope.myMuzicData;
    };

    // Remove a music item in list
    $scope.deleteMuzic = function(idx, $event) {
        $event.stopImmediatePropagation();
        $scope.myMuzicData.splice(idx, 1);
        $scope.$emit('deleteMuzic', idx);
    };

    // Select a music item in list
    $scope.selectMuzic = function(idx) {
        $scope.$emit('selectMuzic', idx);
    };

    // Get more music data
    $scope.getMoreBtn = function(bool, keyword) {
        if ($scope.isRecentActive) {
            youtubeFactory.init(bool);
        } else if ($scope.isPopularActive) {
            youtubeFactory.popularData(bool);
        } else {
            youtubeFactory.searchKeyword(bool, keyword);
        }
    };

    // Init a data of my list
    playerListFactory.initList().then(function(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.myMuzicData.push(data[i]);
        }
    });
    
};
