'use strict';
angular.module('starter')
    .controller('createUserCtrl', function(constantCreateUserURL, $scope, $firebaseAuth) {
        $scope.createUser = {};

        $scope.addUser = function() {
            var ref = new Firebase(constantCreateUserURL);
			$scope.authObj = $firebaseAuth(ref);

            $scope.authObj.$createUser({
                email: $scope.createUser.userName,
                password: $scope.createUser.password
            })
            .then (function(userData) {
            	console.log("User Created Successfully", userData);
            })
            .catch (function(error) {
            	console.log("User Creating Error", error);
            })
        };
    });
