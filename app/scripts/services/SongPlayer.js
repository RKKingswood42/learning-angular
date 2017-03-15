(function() {
    function SongPlayer() {
/**
* @desc object constructor that manages song playback
* @type {Object Constructor}
*/        
        var SongPlayer = {};
/**
* @desc song container of the currently playing audio file
* @type {Object}
*/ 
        var currentSong = null;
/**
* @desc Buzz object audio file
* @type {Object}
*/
        var currentBuzzObject = null;
        
/**
* @function playSong
* @desc plays current song, sets current song.playing to true
* @param {Object} song
*/
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/   
        var setSong = function(song){
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
/**
* @function SongPlayer.pause()
* @desc pauses current audio file and assigns that song's 'playing' attribute as false.
* @param {Object} song
*/
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
                song.playing = false;
        };
/**
* @function SongPlayer.play()
* @desc plays current audio file, pausing previously playing file if needed. Assigns the playing song's "playing" attribute as true. 
* @param
* @return
*/        
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                } else if (currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        currentBuzzObject.play();
                    }
                }
                
            setSong(song);
            playSong(song);
        };
        
        return SongPlayer;
        }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();