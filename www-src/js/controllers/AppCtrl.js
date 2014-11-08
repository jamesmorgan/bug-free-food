'use strict';

(function () {

    /**
     * @ngInject
     */
    function AppCtrl($log, $rootScope, NotifyService) {

        // ViewModel
        var vm = this;

        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            var message = 'Failed to change route [' + (rejection.data.error ? rejection.data.error : rejection.data) + ']';
            $log.error(message);
            NotifyService.danger(message);
        });

    }

    angular
        .module('app.controllers')
        .controller('AppCtrl', AppCtrl);

})();