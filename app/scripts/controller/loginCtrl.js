'use strict';
angular.module('expenseTracker')
    .controller('loginCtrl', function(authentication, localStorage, $scope) {
        $scope.login = {};
        $scope.form = {};

        $scope.loginError = false;

        $scope.appLogin = function() {
            var userName = $scope.login.userName;
            var password = $scope.login.password;

            authentication.login(userName, password);

            if (localStorage.get('error') !== undefined) {
                $scope.loginError = true;
                $scope.errorMessage = localStorage.get('error');
            } else {
                $scope.loginError = false;
                $scope.errorMessage;
            }

            /*if (!$scope.loginError) {
                clearForm();
            }*/

        };

        var clearForm = function() {
            $scope.form.loginForm.$setPristine();
            $scope.login = {};
            $scope.loginError = false;
        };

    });
