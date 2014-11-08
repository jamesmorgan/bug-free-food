'use strict';

(function () {

    var requires = [
        // 3rd Party
        'ngRoute',
        'firebase',
        // Internals
        'app.controllers',
        'app.services',
        'app.filters',
        'app.directives',
        'app.models',
        'app.routes',
        'app.interceptors',
        'app.notify'
    ];

    angular.module('app', requires);

})();