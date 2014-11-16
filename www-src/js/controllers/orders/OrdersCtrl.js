'use strict';

(function () {

    /**
     * @ngInject
     */
    function OrdersCtrl($log, fbutil, NotifyService, UserModel) {

        // ViewModel
        var vm = this;

        vm.orders = fbutil.syncArray('orders');

        vm.userModel = UserModel;

        resetForm();

        // Users
        vm.availableUsers = ['James Morgan', 'Andy Gray', 'Simon Souter', 'Alex Lashford'];

        // Available page configuration
        vm.availableRestaurants = [
            {
                name: 'Abduls Fallowfield',
                openingTimes: 'Mon - Sun - 4pm - 3:30am',
                contactNumber: '0161 248 7573',
                address: '324 Wilmslow Rd, Manchester M14 6XQ',
                directionLink: "https://www.google.co.uk/maps/dir/''/abduls+Fallowfield/@53.4404063,-2.2884381,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x487bb230d2757a57:0x5ef709045f361c95!2m2!1d-2.219772!2d53.440426",
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