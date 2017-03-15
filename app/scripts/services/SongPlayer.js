(function() {
    function SongPlayer() {
        var SongPlayer = {};
        var currentSong = null;
        var currentBuzzObject = null;
        var setSong = {};
        
        setSong = function(song){
            if (currentBuzzObject) {
                    currentBuzzObject.stop();
                    currentSong.playing = null;
                }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
        
            currentSong = song;  
        };
        
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
                song.playing = false;
        };
        
         
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                } else if (currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        currentBuzzObject.play();
                    }
                }
                
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
        };
        return SongPlayer;
        }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();