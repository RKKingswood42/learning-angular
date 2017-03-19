(function() {
    function SongPlayer($rootScope, Fixtures) {
/**
* @desc object constructor that manages song playback
* @type {Object Constructor}
*/        
        var SongPlayer = {};
/**
* @desc variable that stores the current album
* @type {Object}
*/             
        var currentAlbum = Fixtures.getAlbum();
/**
* @function getSongIndex
* @desc gets the index of the current song
* @param {Object} song
* @return index of song
*/      
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
/**
* @desc song container of the currently playing audio file
* @type {Object}
*/ 
        SongPlayer.currentSong = null;
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
* @function stopSong
* @desc stops current song, sets current song.playing to false
* @param {Object} song
*/
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = false;
        };
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/   
        var setSong = function(song){
            if (currentBuzzObject) {
                    currentBuzzObject.stop();
                    SongPlayer.currentSong.playing = null;
                }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            })
        
            SongPlayer.currentSong = song;  
        };
/**
* @desc song container of the currently playing audio file
* @type {Object}
*/ 
        SongPlayer.currentSong = null;
/**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
        SongPlayer.currentTime = null;
/**
* @function SongPlayer.pause()
* @desc pauses current audio file and assigns that song's 'playing' attribute as false.
* @param {Object} song
*/
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            stopSong(song)
        };
/**
* @function SongPlayer.play()
* @desc plays current audio file, pausing previously playing file if needed. Assigns the playing song's "playing" attribute as true. 
* @param none
*/        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                } else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        currentBuzzObject.play();
                    }
                }
                
            setSong(song);
            playSong(song);
        };
/**
* @function SongPlayer.previous()
* @desc plays previous audio file
* @param none
*/ 
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0){
                currentSongIndex = currentAlbum.songs.length - 1;
            } 
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);   
        };
        
    
/**
* @function SongPlayer.next()
* @desc plays current audio file, pausing previously playing file if needed. Assigns the playing song's "playing" attribute as true. 
* @param none
*/
    
        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex >= currentAlbum.songs.length){
                currentSongIndex = 0;
            } 
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
        };
 /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();