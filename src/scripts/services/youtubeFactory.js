module.exports = function($config, $http, $q) {

    var youtubeFactory = {};

    // Define rray
    youtubeFactory.muzic = [];

    // To Load recentData
    youtubeFactory.init = function() {
        youtubeFactory.recentData().then(function(response) {
            youtubeFactory.muzic = response.data.items;
            youtubeFactory.setData(youtubeFactory.muzic);
        });
    };

    // To get recent data
    youtubeFactory.recentData = function() {
        return $http({
            method: 'GET',
            url: $config.apiSearch,
            params: {
                key: $config.apiKey,
                order: 'date',
                type: 'video',
                videoCategoryId: '10',
                videoDuration: 'medium',
                maxResults: '28',
                part: 'id,snippet'
            }
        });
    };

    // To get recent data
    youtubeFactory.popularData = function() {
        $http({
            method: 'GET',
            url: $config.apiSearch,
            params: {
                key: $config.apiKey,
                order: 'viewCount',
                type: 'video',
                videoCategoryId: '10',
                videoDuration: 'medium',
                maxResults: '28',
                part: 'id,snippet'
            }
        }).then(function(response) {
            youtubeFactory.muzic = response.data.items;
            youtubeFactory.setData(youtubeFactory.muzic);
        });
    };

    // To insert videoInfo data into youtubeFactory.muzic
    youtubeFactory.setData = function(items) {
        for (var i in items) {
            (function(idx){
                youtubeFactory.videoInfo(items[idx].id.videoId).then(function(response) {
                    // regrular expression to make a time format
                    var minute = response.data.items[0].contentDetails.duration.match(/\d(?=M)/g);
                    var second = response.data.items[0].contentDetails.duration.match(/[0-9][0-9](?=S)/g);
                    if (second == null) {
                        second = ['00'];
                    }

                    items[idx].duration = [minute, second].join(':');
                    items[idx].likeCount = response.data.items[0].statistics.likeCount;
                    items[idx].viewCount = response.data.items[0].statistics.viewCount;
                });
            })(i);

        }
    };

    //To get video information
    youtubeFactory.videoInfo = function(videoId) {
        return $http({
            method: 'GET',
            url: $config.apiVideo,
            params: {
                key: $config.apiKey,
                part: 'contentDetails, statistics',
                id: videoId
            }
        });
    };

    return youtubeFactory;
};
