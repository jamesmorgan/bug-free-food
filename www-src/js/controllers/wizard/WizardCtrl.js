'use strict';

(function () {

    /**
     * @ngInject
     */
    function WizardCtrl($log, NotifyService, Firebase, $firebase) {

        // ViewModel
        var vm = this;

        // Available page configuration
        vm.availableRestaurants = [
            {
                name: 'Abduls Levenshulme',
                openingTimes: '...',
                foods: [
                    {name: 'Small Chicken Naan', price: 380},
                    {name: 'Small Chicken Chapatti', price: 300},
                    {name: 'Chicken Lamb Mix Naan', price: 600},
                    {name: 'Chicken Lamb Mix Chapatti', price: 600},
                    {name: 'Large Chicken Naan', price: 600},
                    {name: 'Large Chicken Chapatti', price: 600},
                    {name: 'Large Lamb Naan', price: 600},
                    {name: 'Large Lamb Chapatti', price: 600},
                    {name: 'Chicken Seekh Mix Naan', price: 600},
                    {name: 'Small Seekh Naan', price: 290},
                    {name: 'Small Seekh Chapatti', price: 290},
                    {name: 'Large Seekh Naan', price: 370},
                    {name: 'Large Seekh Chapatti', price: 370},
                    {name: 'Small Chips', price: 130},
                    {name: 'Large Chips', price: 200},
                    {name: 'Chicken Donner', price: 350}
                ]
            }
        ];

        // Employees
        vm.availableUsers = ['James Morgan', 'Andy Gray', 'Simon Souter', 'Alex Lashford'];

        vm.availableOrders = [
            {
                name: 'Friday Kebabs', created: Date.now()
            }
        ];

        vm.selectedRestaurant = {};

        // The data form
        vm.myOrder = {
            foods: []
        };

        this.restaurantSelected = function () {
            vm.myOrder.foods = [
                {}
            ];
        };

        this.addFoodItem = function () {
            vm.myOrder.foods.push({});
        };

        this.removeFoodItem = function ($index) {
            vm.myOrder.foods.splice($index, 1);
        };

        this.getOrderTotals = function () {
            if (!vm.myOrder.foods || vm.myOrder.foods.length <= 0) {
                return 0;
            }
            var total = 0;
            vm.myOrder.foods.forEach(function (item) {
                if(item.food && item.food.price){
                    total += item.food.price;
                }
            });
            return (total / 100).toFixed(2);
        };
    }

    angular
        .module('app.controllers.wizard')
        .controller('WizardCtrl', WizardCtrl);

})();