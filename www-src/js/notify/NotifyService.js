'use strict';

(function () {

    /**
     * @ngInject
     */
    var NotifyService = function (notify) {

        /**
         * Show a notification with style DANGER
         *
         * @param message the message to display
         */
        this.danger = function (message) {
            notify({message: message, classes: 'alert-danger'});
        };

        /**
         * Show a notification with style WARNING
         *
         * @param message the message to display
         */
        this.warning = function (message) {
            notify({message: message, classes: 'alert-warning'});
        };

        /**
         * Show a notification with style SUCCESS
         *
         * @param message the message to display
         */
        this.success = function (message) {
            notify({message: message, classes: 'alert-success'});
        };

        /**
         * Show a notification with style INFO
         *
         * @param message the message to display
         */
        this.info = function (message) {
            notify({message: message, classes: 'alert-info'});
        };
    };

    angular
        .module('app.notify')
        .service('NotifyService', NotifyService);

})();