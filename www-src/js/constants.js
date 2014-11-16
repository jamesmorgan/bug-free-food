'use strict';

(function () {

    /**
     * Basic app version constant
     */
    angular
        .module('app')

        // App version
        .constant('version', '0.0.1')

        // your Firebase data URL goes here, no trailing slash
        .constant('FBURL', 'https://bug-free-food.firebaseio.com');

})();