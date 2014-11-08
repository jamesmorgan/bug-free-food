'use strict';

(function () {

    /**
     * @ngInject
     */
    function CreateMenuCtrl($log, NotifyService, Firebase, $firebase) {

        // ViewModel
        var vm = this;

        // restaurantsRef
        var restaurantsRef = new Firebase("https://bug-free-food.firebaseio.com/restaurants");
        var restaurantsSync = $firebase(restaurantsRef);

        vm.restaurants = restaurantsSync.$asArray();
        console.log(vm.restaurants);

        // menuRef
        var menuRef = new Firebase("https://bug-free-food.firebaseio.com/menus");
        var menuSync = $firebase(menuRef);

        vm.menus = menuSync.$asArray();
        console.log(vm.menus);

        vm.selectedRestaurant = {};
        vm.newMenu = {
            name: '',
            foods: [
                {
                    name: '', price: 0
                }
            ],
            createdDate: Date.now()
        };

        this.createMenu = function () {
            console.log('Adding new menu [%s]', angular.toJson(vm.newMenu));
            console.log(vm.selectedRestaurant);

            if (!vm.selectedRestaurant.menus) {
                vm.selectedRestaurant.menus = [];
            }
            vm.selectedRestaurant.menus.push(vm.newMenu);

            vm.restaurants.$save(vm.selectedRestaurant);
            console.log(vm.restaurants);

            vm.newMenu = {
                name: '',
                foods: [
                    {
                        name: '', price: 0
                    }
                ],
                createdDate: Date.now()
            };
        };

        this.removeFood = function (food, index) {
            vm.newMenu.foods.splice(index, 1);
        };

        this.addFood = function () {
            vm.newMenu.foods.push({
                name: '', price: 0
            });
        };

//        Small Chicken Naan	£3.80
//        Small Chicken Chapatti	£3.80
//        Chicken Lamb Mix Naan	£6.00
//        Chicken Lamb Mix Chapatti	£6.00
//        Large Chicken Naan	£6.00
//        Large Chicken Chapatti	£6.00
//        Large Lamb Naan	£6.00
//        Large Lamb Chapatti	£6.00
//        Chicken Seekh Mix Naan	£6.00
//        Chicken Seekh Mix Chapatti	£6.00
//        Small Seekh Naan	£2.90
//        Small Seekh Chapatti	£2.90
//        Large Seekh Naan	£3.70
//        Large Seekh Chapatti	£3.70
//        Small Chips	£1.30
//        Large Chips	£2.00
//        Chicken Donner	£3.50


    }

    angular
        .module('app.controllers.menus')
        .controller('CreateMenuCtrl', CreateMenuCtrl);

})();