'use strict';

(function () {

    /**
     * @ngInject
     */
    function ListRestaurantCtrl($log, NotifyService, Firebase, $firebase) {

        // ViewModel
        var vm = this;

        var ref = new Firebase("https://bug-free-food.firebaseio.com/restaurants");
        var sync = $firebase(ref);

        vm.restaurants = sync.$asArray();

    }

    angular
        .module('app.controllers.restaurant')
        .controller('ListRestaurantCtrl', ListRestaurantCtrl);

})();