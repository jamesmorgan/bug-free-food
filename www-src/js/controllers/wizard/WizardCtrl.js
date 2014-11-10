'use strict';

(function () {

    /**
     * @ngInject
     */
    function WizardCtrl($log, NotifyService, Firebase, $firebase, UserModel) {

        var self = this;

        // ViewModel
        var vm = this;

        vm.userModel = UserModel;

        var ref = new Firebase("https://bug-free-food.firebaseio.com/orders");
        var sync = $firebase(ref);

        vm.orders = sync.$asArray();

        // Employees
        vm.availableUsers = ['James Morgan', 'Andy Gray', 'Simon Souter', 'Alex Lashford'];

        vm.selectedOrder = undefined;

        vm.newOrderItemForm = undefined;

        vm.totalCounts = {};

        // The data form
        vm.myOrder = {
            foods: []
        };

        this.initOrderForUser = function () {
            if (!vm.selectedOrder.details) {
                vm.selectedOrder.details = [
                    {
                        user: UserModel.user,
                        order: []
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
            var userOrder = this.findUserOrder();

            if (!userOrder.order) {
                userOrder.order = [];
            }
            userOrder.order.push(vm.newOrderItemForm);
            vm.orders.$save(vm.selectedOrder)
                .then(function () {
                    NotifyService.success('Added ' + userOrder.order[userOrder.order.length - 1].name);
                    vm.newOrderItemForm = undefined;
                    self.updatePageTotals();
                });
        };

        this.removeFoodItem = function (index) {
            this.findUserOrder().order.splice(index, 1);
            vm.orders.$save(vm.selectedOrder)
                .then(function () {
                    NotifyService.success('Item removed');
                    self.updatePageTotals();
                });
        };

        this.getOrderTotals = function () {
            if (!vm.selectedOrder.details || vm.selectedOrder.details.length <= 0) {
                return 0;
            }
            var total = 0;
            vm.selectedOrder.details.forEach(function (detail) {
                if (detail.order) {
                    detail.order.forEach(function (order) {
                        total += order.price;
                    });
                }
            });
            return (total / 100).toFixed(2);
        };


        this.updatePageTotals = function () {
            if (!vm.selectedOrder.details || vm.selectedOrder.details.length <= 0) {
                return;
            }

            vm.totalCounts = {};
            vm.selectedOrder.details.forEach(function (detail) {
                if (detail.order) {
                    detail.order.forEach(function (order) {
                        if (!vm.totalCounts[order.name]) {
                            vm.totalCounts[order.name] = {
                                name: order.name,
                                price: order.price,
                                count: 1
                            };
                        } else {
                            vm.totalCounts[order.name].count++;
                        }
                    });
                }
            });
        }
    }

    angular
        .module('app.controllers.wizard')
        .controller('WizardCtrl', WizardCtrl);

})();