'use strict';

(function () {

    /**
     * @ngInject
     */
    function MyOrderCtrl($log, $routeParams, NotifyService, fbutil, UserModel) {

        // ViewModel
        var vm = this;

        vm.optionalOrderId = $routeParams.orderId;

        vm.userModel = UserModel;
        vm.selectedOrder = undefined;
        vm.newOrderItemForm = undefined;
        vm.orders = undefined;

        if (vm.optionalOrderId) {
            $log.debug('Attempting to get order for ref [%]', vm.optionalOrderId);
            vm.selectedOrder = fbutil.syncObject('orders/' + vm.optionalOrderId);
            //} else {
            //    $log.debug('Loading all orders');
            //    vm.orders = fbutil.syncArray('orders');
        }

        $log.debug('Loading all orders');
        vm.orders = fbutil.syncArray('orders');

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

            console.log(vm.selectedOrder);

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

        this.tallyUp = function (order) {
            var totals = 0;
            order.forEach(function (food) {
                totals = totals += food.price;
            });
            return totals;
        };

        function hasOrderWithDetails() {
            return vm.selectedOrder && vm.selectedOrder.details;
        }

    }

    angular
        .module('app.controllers.order-wizard')
        .controller('MyOrderCtrl', MyOrderCtrl);

})();