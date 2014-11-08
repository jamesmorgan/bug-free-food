'use strict';
(function () {

    /**
     * @ngInject
     */
    var Routes = function ($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: '/www-build/views/partials/home/index.html',
            controller: 'HomeCtrl as hc'
        });

        /**
         * Orders Management
         */
        $routeProvider.when('/orders/list', {
            templateUrl: '/www-build/views/partials/orders/orders.html',
            controller: 'OrdersCtrl as vm'
        });

        /**
         * Menus Management
         */
        $routeProvider.when('/menus/list', {
            templateUrl: '/www-build/views/partials/menus/menus.html',
            controller: 'ListMenusCtrl as lmc'
        });
        $routeProvider.when('/menus/create', {
            templateUrl: '/www-build/views/partials/menus/create.html',
            controller: 'CreateMenuCtrl as cmc'
        });

        /**
         * Restaurant Management
         */
        $routeProvider.when('/restaurants/list', {
            templateUrl: '/www-build/views/partials/restaurant/restaurant.html',
            controller: 'ListRestaurantCtrl as lrc'
        });
        $routeProvider.when('/restaurants/create', {
            templateUrl: '/www-build/views/partials/restaurant/create.html',
            controller: 'CreateRestaurantCtrl as crc'
        });

        $routeProvider.when('/wizard/new-order', {
            templateUrl: '/www-build/views/partials/wizard/new-order.html',
            controller: 'WizardCtrl as vm'
        });

        /**
         * Fallback
         */
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        // Disable html 5 mode due to IE9 compatibility requirement!
        $locationProvider.html5Mode(false);

    };

    angular
        .module('app.routes', [])
        .config(Routes);


})();