'use strict';

(function () {

    /**
     * @ngInject
     */
    function WizardCtrl($log, NotifyService, Firebase, $firebase, UserModel) {

        var self = this;

        // ViewModel
        var vm = this;

        vm.user = UserModel.user;

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

        this.initOrderForUser = function () {
            if (!vm.selectedOrder.details) {
                vm.selectedOrder.details = [
                    {
                        user: UserModel.user,
                        order: [
                            {}
                        ]
                    }
                ]
            }
        };

        this.userHasOrder = function () {
            if (!vm.selectedOrder || !vm.selectedOrder.details || !UserModel.user) {
                return false;
            }
            return vm.selectedOrder.details.some(function (detail) {
                return detail.user.id === UserModel.user.id
            })
        };

        this.findUserOrder = function () {
            for (var index in vm.selectedOrder.details) {
                if (vm.selectedOrder.details[index].user.id === UserModel.user.id) {
                    return vm.selectedOrder.details[index];
                }
            }
            throw Error('User not found in order');
        };

        this.addFoodItem = function () {

            vm.orders.$save(vm.selectedOrder).then(function () {
                NotifyService.success('Added ' + self.findUserOrder().order[self.findUserOrder().order.length - 1].name);
                self.findUserOrder().order.push({});
            });
        };

        this.removeFoodItem = function (index) {
            this.findUserOrder().order[index].splice(index, 1);
            console.log(vm.orders);
            vm.orders.$save(vm.selectedOrder).then(function () {
                NotifyService.success('Item removed');
            });
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