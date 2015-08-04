'use strict';
angular.module('expenseTracker')
    .controller('loginCtrl', function(authentication, $scope) {
        $scope.login = {};

        $scope.appLogin = function() {
        	var userName = $scope.login.userName;
        	var password = $scope.login.password;

        	authentication.isLoggedIn(userName, password);
        };
        
    });
