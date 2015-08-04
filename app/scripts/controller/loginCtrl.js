'use strict';
angular.module('expenseTracker')
    .controller('loginCtrl', function(authentication, $scope) {
        $scope.login = {};
        
        $scope.loginError = false;

        $scope.appLogin = function() {
            $scope.loginError = false;

            var userName = $scope.login.userName;
            var password = $scope.login.password;

            authentication.login(userName, password);

            if (sessionStorage.error) {
                $scope.loginError = true;
            }

        };

    });
