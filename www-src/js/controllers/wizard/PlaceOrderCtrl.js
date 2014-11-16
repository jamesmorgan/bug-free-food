'use strict';

(function () {

    /**
     * @ngInject
     */
    function PlaceOrderCtrl($log, NotifyService, $routeParams, fbutil, UserModel) {

        var self = this;

        // ViewModel
        var vm = this;

        vm.userModel = UserModel;

        vm.selectedOrder = fbutil.syncObject(['orders/', $routeParams.orderId]);

        vm.selectedOrder.$loaded()
            .then(function () {
                vm.updatePageTotals();
            });

        vm.totalCounts = {};

        this.getOrderTotals = function () {
            if (!vm.selectedOrder || !vm.selectedOrder.details || vm.selectedOrder.details.length <= 0) {
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
            if (!vm.selectedOrder || !vm.selectedOrder.details || vm.selectedOrder.details.length <= 0) {
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
        };

        vm.updatePageTotals();
    }

    angular
        .module('app.controllers.order-wizard')
        .controller('PlaceOrderCtrl', PlaceOrderCtrl);

})();