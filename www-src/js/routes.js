'use strict';
(function () {

    /**
     * @ngInject
     */
    var Routes = function ($routeProvider, $locationProvider) {

        //$routeProvider.when('/', {
        //    templateUrl: 'www-build/views/partials/home/index.html',
        //    controller: 'HomeCtrl as hc'
        //});

        /**
         * Orders Management
         */
        $routeProvider.when('/orders/list', {
            templateUrl: 'www-build/views/partials/orders/orders.html',
            controller: 'OrdersCtrl as vm'
        });

        /**
         * Order Wizard
         */
        $routeProvider.when('/order-wizard/my-order/:orderId?', {
            templateUrl: 'www-build/views/partials/order-wizard/my-order.html',
            controller: 'MyOrderCtrl as vm'
        });
        $routeProvider.when('/order-wizard/place-order/:orderId', {
            templateUrl: 'www-build/views/partials/order-wizard/place-order.html',
            controller: 'PlaceOrderCtrl as vm'
        });

        /**
         * Menus Management
         */
//        $routeProvider.when('/menus/list', {
//            templateUrl: 'www-build/views/partials/menus/menus.html',
//            controller: 'ListMenusCtrl as lmc'
//        });
//        $routeProvider.when('/menus/create', {
//            templateUrl: 'www-build/views/partials/menus/create.html',
//            controller: 'CreateMenuCtrl as cmc'
//        });

        /**
         * Restaurant Management
         */
//        $routeProvider.when('/restaurants/list', {
//            templateUrl: 'www-build/views/partials/restaurant/restaurant.html',
//            controller: 'ListRestaurantCtrl as lrc'
//        });
//        $routeProvider.when('/restaurants/create', {
//            templateUrl: 'www-build/views/partials/restaurant/create.html',
//            controller: 'CreateRestaurantCtrl as crc'
//        });

        /**
         * Fallback
         */
        $routeProvider.otherwise({
            redirectTo: '/orders/list'
        });

        // Disable html 5 mode due to IE9 compatibility requirement!
        $locationProvider.html5Mode(false);

    };

    angular
        .module('app.routes', [])
        .config(Routes);


})();