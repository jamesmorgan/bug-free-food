'use strict';

(function () {

    /**
     * @ngInject
     */
    function OrdersCtrl($log, NotifyService, Firebase, $firebase, UserModel) {

        // ViewModel
        var vm = this;

        var ref = new Firebase("https://bug-free-food.firebaseio.com/orders");
        var sync = $firebase(ref);

        vm.userModel = UserModel;

        vm.orders = sync.$asArray();

        resetForm();

        // Users
        vm.availableUsers = ['James Morgan', 'Andy Gray', 'Simon Souter', 'Alex Lashford'];

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

        this.createOrder = function () {

            // Set the user
            vm.newOrder.createdBy = UserModel.user;

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
                createdBy: UserModel.user,
                name: '',
                restaurant: '',
                content: [
                    {}
                ],
                createdDate: Date.now()
            };
        }
    }

    angular
        .module('app.controllers.orders')
        .controller('OrdersCtrl', OrdersCtrl);

})();