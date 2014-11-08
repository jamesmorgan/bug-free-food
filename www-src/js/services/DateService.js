'use strict';

(function () {

    /**
     * @ngInject
     */
    var DateService = function () {

        /**
         * The Date NOW
         *
         * @returns Date
         */
        this.now = function () {
            return new Date();
        };

        /**
         * The Date NOW in seconds
         *
         * @returns number
         */
        this.getTime = function () {
            return this.now().getTime();
        };
    };

    angular
        .module('app.services')
        .service('DateService', DateService);

})();