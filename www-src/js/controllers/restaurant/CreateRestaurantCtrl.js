'use strict';

(function () {

    /**
     * @ngInject
     */
    function CreateRestaurantCtrl($log, NotifyService, Firebase, $firebase) {

        // ViewModel
        var vm = this;

        var ref = new Firebase("https://bug-free-food.firebaseio.com/restaurants");
        var sync = $firebase(ref);

        vm.resturants = sync.$asArray();
        console.log(vm.resturants);

        vm.newRestaurant = {
            name: '',
            createdDate: Date.now(),
            menus: []
        };

        this.addRestaurant = function () {
            $log.debug('Adding new restaurants [%s]', vm.newRestaurant);

            vm.resturants.$add(angular.copy(vm.newRestaurant));

            vm.newRestaurant = {
                name: '',
                createdDate: Date.now(),
                menus: []
            };
        };
    }

    angular
        .module('app.controllers.restaurant')
        .controller('CreateRestaurantCtrl', CreateRestaurantCtrl);

})();