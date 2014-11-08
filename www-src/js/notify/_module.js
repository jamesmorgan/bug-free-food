'use strict';

(function () {

    angular.module('app.notify', ['cgNotify']);

    angular.module('app.notify').run(function (notify) {
        notify.config({
            duration: 2000,
            templateUrl: '/www-build/views/templates/angular-notify.html'
        });
    });

})();