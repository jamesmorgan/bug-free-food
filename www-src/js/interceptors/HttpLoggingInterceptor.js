'use strict';

(function () {

    /**
     * @ngInject
     */
    angular.module('app.interceptors').factory('loggingInterceptor', function ($q, $log) {

        function isPartial(url) {
            return url.indexOf('partials') === -1;
        }

        return {
            'request': function (config) {
                if (isPartial(config.url)) {
                    $log.debug('Http Request [' + config.method + '][' + config.url + ']');
                }
                return config;
            },

            'requestError': function (config) {
                $log.error('Http Request Error [' + config.method + '][' + config.url + ']');
                return config;
            },

            'response': function (response) {
                if (isPartial(response.config.url)) {
                    $log.debug('Http Response Success: Status [' + response.status + '] to [' + response.config.method + '][' + response.config.url + ']');
                }
                return response;
            },

            'responseError': function (rejection) {
                $log.error('Http Response Error: Status [' + rejection.status + '] to [' + rejection.config.method + '][' + rejection.config.url + '] data [' + (rejection.data.error ? rejection.data.error : rejection.data) + ']');
                return $q.reject(rejection);
            }
        };
    });

    angular.module('app.interceptors').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('loggingInterceptor');
    }]);

})();