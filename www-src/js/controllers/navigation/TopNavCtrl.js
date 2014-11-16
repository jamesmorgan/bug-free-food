'use strict';

(function () {

    /**
     * @ngInject
     */
    function TopNavCtrl($log, NotifyService, $firebaseSimpleLogin, Firebase, UserModel, fbutil) {

        // ViewModel
        var vm = this;

        var ref = new Firebase("https://bug-free-food.firebaseio.com");

        vm.userModel = UserModel;

        vm.users = fbutil.syncArray('users');

        vm.userModel.allUsers = vm.users;

        var authClient = $firebaseSimpleLogin(ref);
        console.log(authClient);

        // TODO move to resolve!
        this.init = function () {
            authClient.$getCurrentUser().then(handleSuccessfulLogin);
        };

        this.login = function () {
            $log.debug('Login - github');
            authClient.$login('github', { rememberMe: true, scope: 'user'})
                .then(handleSuccessfulLogin, popError);
        };

        this.logout = function () {
            $log.debug('Logout');
            console.log(authClient);
            authClient.$logout();
            UserModel.user = null;
            NotifyService.success('user is logged out');
        };

        function handleSuccessfulLogin(user) {
            if (user) {

                console.log('user:', user);

//                var drinkRef = fbutil.ref('users/' + user.uid);
//                console.log('MyUser:', drinkRef);
//                drinkRef.push(user);

//                var myUser = fbutil.syncObject('users/' + user.uid);
//                console.log('MyUser:', myUser);
//
//                myUser.$add(user)
//                    .then(function () {
//                        NotifyService.success('Successfully SAVED user');
//                    }, function (err) {
//                        NotifyService.danger('Unable to SAVE user');
//                        console.log(err);
//                    });

                UserModel.user = user;
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