module.exports = function($config, $http, $q) {

    var youtubeFactory = {};

    // Call recent videos from youtube api when main page is open
    youtubeFactory.recentData = function() {
        var deferred = $q.defer();

        $http({
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
        }).then(function(results) {
            deferred.resolve(results.data.items);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    // To get video information from youtube api
    youtubeFactory.videoInfo = function(items) {
        var deferred = $q.defer();

        var videoInformation = {
            durations: [],
            viewCounts: [],
            likeCounts: []
        };

        for (var i = 0; i < items.length; i++) {
            $http({
                method: 'GET',
                url: $config.apiVideo,
                params: {
                    key: $config.apiKey,
                    part: 'contentDetails, statistics',
                    id: items[i].id.videoId
                }
            }).then(function(results) {
                videoInformation.durations.push(results.data.items[0].contentDetails.duration);
                videoInformation.viewCounts.push(results.data.items[0].statistics.viewCount);
                videoInformation.likeCounts.push(results.data.items[0].statistics.likeCount);
                if (videoInformation.durations.length == items.length) {
                    deferred.resolve(videoInformation);
                }
            }, function(error) {
                deferred.reject(error);
            });
        }

        return deferred.promise;
    };

    return youtubeFactory;
};
