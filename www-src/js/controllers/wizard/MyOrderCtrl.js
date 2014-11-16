'use strict';

(function () {

    /**
     * @ngInject
     */
    function MyOrderCtrl($log, NotifyService, fbutil, UserModel) {

        // ViewModel
        var vm = this;

        vm.userModel = UserModel;

        vm.orders = fbutil.syncArray('orders');

        vm.selectedOrder = undefined;

        vm.newOrderItemForm = undefined;

        // The data form
        vm.myOrder = {
            foods: []
        };

        this.initOrderForUser = function () {
            var orderDetail = {
                user: UserModel.user,
                order: []
            };

            if (hasOrderWithDetails()) {
                vm.selectedOrder.details.push(orderDetail);
            } else {
                vm.selectedOrder.details = [orderDetail]
            }
        };

        this.userHasOrder = function () {
            if (!hasOrderWithDetails() || !UserModel.user) {
                return false;
            }

            return vm.selectedOrder.details.some(function (detail) {
                return detail.user.id === UserModel.user.id
            })
        };

        this.findUserOrder = function () {
            var userDetails = vm.selectedOrder.details.filter(function (detail) {
                return detail.user.id === UserModel.user.id
            });

            if (userDetails.length === 0) {
                throw new Error('User not found in order!');
            }
            return userDetails[0];
        };

        this.addFoodItem = function () {
            var userOrder = this.findUserOrder();

            if (!userOrder.order) {
                userOrder.order = [];
            }
            userOrder.order.push(vm.newOrderItemForm);
            vm.orders.$save(vm.selectedOrder)
                .then(function () {
                    NotifyService.success('Added ' + userOrder.order[userOrder.order.length - 1].name + ' to the order!');
                    vm.newOrderItemForm = undefined;
                });
        };

        this.removeFoodItem = function (index, item) {
            this.findUserOrder().order.splice(index, 1);
            vm.orders.$save(vm.selectedOrder)
                .then(function () {
                    NotifyService.success('Removed ' + item.name + ' from the order!');
                });
        };

        this.getUsersOrder = function () {
            if (!hasOrderWithDetails() || vm.selectedOrder.details.length <= 0) {
                return 0;
            }
            var total = 0;
            (vm.findUserOrder().order || []).forEach(function (item) {
                total += item.price;
            });
            return (total / 100).toFixed(2);
        };

        function hasOrderWithDetails() {
            return vm.selectedOrder && vm.selectedOrder.details;
        }

    }

    angular
        .module('app.controllers.order-wizard')
        .controller('MyOrderCtrl', MyOrderCtrl);

})();