'use strict';

(function () {

    /**
     * @ngInject
     */
    function WizardCtrl($log, NotifyService, Firebase, $firebase) {

        // ViewModel
        var vm = this;

        var ref = new Firebase("https://bug-free-food.firebaseio.com/orders");
        var sync = $firebase(ref);

        vm.orders = sync.$asArray();

        // Employees
        vm.availableUsers = ['James Morgan', 'Andy Gray', 'Simon Souter', 'Alex Lashford'];

        vm.selectedOrder = undefined;

        // The data form
        vm.myOrder = {
            foods: []
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
                if (item.food && item.food.price) {
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