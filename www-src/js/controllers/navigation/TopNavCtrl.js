'use strict';

(function () {

    /**
     * @ngInject
     */
    function TopNavCtrl($log, NotifyService, $firebaseSimpleLogin, Firebase) {

        // ViewModel
        var vm = this;

        var ref = new Firebase("https://bug-free-food.firebaseio.com");

        vm.currentUser = null;

        var authClient = $firebaseSimpleLogin(ref);
        console.log(authClient);

        authClient.$getCurrentUser().then(handleSuccessfulLogin);

        this.login = function () {
            $log.debug('Login - github');
            authClient.$login('github', { rememberMe: true, scope: 'user'})
                .then(handleSuccessfulLogin, popError);
        };

        this.logout = function () {
            $log.debug('Logout');
            authClient.$logout()
                .then(function (user) {
                    $log.debug('user is logged out');
                    NotifyService.success('user is logged out');
                }, function (error) {
                    popError(error);
                });
        };

        function handleSuccessfulLogin(user) {
            if (user) {
                vm.currentUser = user;
                $log.debug("User ID: " + user.uid + ", Provider: " + user.provider);
                NotifyService.success("User ID: " + user.uid + ", Provider: " + user.provider);
            }
        }

        function popError(error) {
            $log.error(error);
            NotifyService.danger(error);
        }
    }

    angular
        .module('app.controllers.navigation')
        .controller('TopNavCtrl', TopNavCtrl);

})();