(function() {
    function AlbumCtrl() {
        this.albumData = angular.copy(albumPersistance);
        console.log(this.albumData);
    }
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();