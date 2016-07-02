module.exports = function($scope, youtubeFactory) {

    // Init data
    $scope.initList = function() {
        youtubeFactory.recentData().then(function(items) {
            $scope.items = items;
            return items;
        }).then(function(items) {
            youtubeFactory.videoInfo(items).then(function(videoInformation) {

                var timeArr = [];

                for (var i = 0; i < videoInformation.durations.length; i++) {
                    // regrular expression to make a time format
                    var hour = videoInformation.durations[i].match(/\d(?=M)/g);
                    var minute = videoInformation.durations[i].match(/[0-9][0-9](?=S)/g);
                    if (minute == null) {
                        minute = '00';
                    }
                    var time = [];
                    time.push(hour);
                    time.push(minute);
                    var timeFormat = time.join(':');
                    timeArr.push(timeFormat);
                }

                // To add a property of duration in items object
                for (var time in timeArr) {
                    $scope.items[time].duration = timeArr[time];
                }
                // To add a property of viewCount in items object
                for (var i = 0; i < videoInformation.viewCounts.length; i++) {
                    $scope.items[i].viewCount = videoInformation.viewCounts[i];
                    $scope.items[i].likeCount = videoInformation.likeCounts[i];
                }
                console.log(items);


            });
        });
    };

    // Execute initList method
    $scope.initList();
};
