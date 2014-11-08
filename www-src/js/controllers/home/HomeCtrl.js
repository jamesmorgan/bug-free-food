'use strict';

(function () {

    /**
     * @ngInject
     */
    function HomeCtrl($log, NotifyService, Firebase, $firebase) {

        // ViewModel
        var vm = this;

        var ref = new Firebase("https://bug-free-food.firebaseio.com/");
        // create an AngularFire reference to the data
        var sync = $firebase(ref);
        // download the data into a local object
        vm.data = sync.$asObject();

    }

    angular
        .module('app.controllers.home')
        .controller('HomeCtrl', HomeCtrl);

})();