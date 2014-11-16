'use strict';

(function () {

    /**
     * @ngInject
     */
    function LeftNavCtrl($log, UserModel) {

        // ViewModel
        var vm = this;

        vm.userModel = UserModel;

    }

    angular
        .module('app.controllers.navigation')
        .controller('LeftNavCtrl', LeftNavCtrl);

})();