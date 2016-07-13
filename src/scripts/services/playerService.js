module.exports = function($window, $rootScope, playerListFactory) {

    var player;
    var playIndex = 0;

    // auto play
    var onPlayerReady = function(event) {
        event.target.playVideo();
    };

    // Check player's state
    var onPlayerStateChange = function(event) {
        // player event end
        switch (event.data) {
            case YT.PlayerState.ENDED:
                // infinite loop
                if (playIndex < playerListFactory.muzic.length - 1) {
                    playIndex++;
                    player.loadVideoById(playerListFactory.muzic[playIndex].id, 0);
                    $rootScope.activeMuzic = playIndex;
                    $rootScope.$apply();
                } else {
                    playIndex = 0;
                    player.loadVideoById(playerListFactory.muzic[playIndex].id, 0);
                    $rootScope.activeMuzic = playIndex;
                    $rootScope.$apply();
                }
                break;
        }
    };

    // Create a iframe tag and configuration
    $window.onYouTubeIframeAPIReady = function(videoId) {
        player = new YT.Player('player', {
            width: '100%',
            height: '100%',
            videoId: videoId,
            playerVars: {
                controls: 0,
                showinfo: 0,
                autoplay: 1,
                loop: 1,
                rel: 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
            },
        });
    };

    // Play youtube player
    this.playYoutube = function() {
        player.playVideo();
    };

    // Pause youtube player
    this.pauseYoutube = function() {
        player.pauseVideo();
    };

    // Stop youtube player
    this.stopYoutube = function() {
        player.stopVideo();
    };

    // selectMuzic: active state and laod video
    $rootScope.$on('selectMuzic', function(e, idx) {
        player.loadVideoById(playerListFactory.muzic[idx].id, 0);
        $rootScope.activeMuzic = idx;
        playIndex = idx;
    });

    // deleteMuzic: active state
    $rootScope.$on('deleteMuzic', function(e, idx) {
        if (idx == playIndex) {
            if (playerListFactory.muzic.length) {
                if ( idx = playerListFactory.muzic.length - 1) {
                    idx = playerListFactory.muzic.length - 1;
                }
                player.loadVideoById(playerListFactory.muzic[idx].id, 0);
                $rootScope.activeMuzic = idx;
                playIndex = idx;
            }
        } else if (idx < playIndex) {
            $rootScope.activeMuzic = playIndex - 1;
            playIndex = $rootScope.activeMuzic;
        } else if (idx > playIndex) {
            $rootScope.activeMuzic = playIndex;
        } else {
            $rootScope.activeMuzic = playerListFactory.muzic.length - 1;
        }
    });
};
