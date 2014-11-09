'use strict';

(function () {
    /**
     * @ngInject
     */
    var UserModel = function () {

        return {
            /**
             * The user
             */
            user: null
        };
    };

    angular.module('app.models').factory('UserModel', UserModel);
})();