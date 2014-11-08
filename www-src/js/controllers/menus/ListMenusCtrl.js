'use strict';

(function () {

    /**
     * @ngInject
     */
    function ListMenusCtrl($log, NotifyService, Firebase, $firebase) {

        // ViewModel
        var vm = this;

        var ref = new Firebase("https://bug-free-food.firebaseio.com/restaurants");
        var sync = $firebase(ref);

        vm.restaurants = sync.$asArray();

        console.log(vm.restaurants);

        this.removeMenuAtIndex = function (resturant, index) {
            resturant.menus.splice(index, 1);
            vm.restaurants.$save(resturant);
        };
    }

    angular
        .module('app.controllers.menus')
        .controller('ListMenusCtrl', ListMenusCtrl);

})();