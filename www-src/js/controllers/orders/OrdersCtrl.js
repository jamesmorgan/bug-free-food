'use strict';

(function () {

    /**
     * @ngInject
     */
    function OrdersCtrl($log, NotifyService, Firebase, $firebase) {

        // ViewModel
        var vm = this;

        var ref = new Firebase("https://bug-free-food.firebaseio.com/orders");
        var sync = $firebase(ref);

        vm.orders = sync.$asArray();

        resetForm();

        // Employees
        vm.availableUsers = ['James Morgan', 'Andy Gray', 'Simon Souter', 'Alex Lashford'];

        this.createOrder = function () {
            vm.orders.$add(angular.copy(vm.newOrder))
                .then(function () {
                    NotifyService.success('Successfully added order');
                }, function () {
                    NotifyService.danger('Unable to save order');
                });
            resetForm();
        };

        this.removeOrder = function (order) {
            vm.orders.$remove(order)
                .then(function () {
                    NotifyService.success('Successfully removed order');
                }, function () {
                    NotifyService.danger('Unable to remove order');
                });
        };

        function resetForm() {
            vm.newOrder = {
                createdBy: '',
                name: '',
                createdDate: ''
            };
        }
    }

    angular
        .module('app.controllers.orders')
        .controller('OrdersCtrl', OrdersCtrl);

})();