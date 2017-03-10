(function() {
    function LandingCtrl() { //naming controller LandingCtrl
        this.heroTitle = "It's your life. You deserve to choose the soundtrack.";
    }

    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();