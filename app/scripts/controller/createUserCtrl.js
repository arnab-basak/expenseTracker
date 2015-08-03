'use strict';
angular.module('starter')
    .controller('createUserCtrl', function(constantCreateUserURL, $scope, $firebaseAuth) {
        $scope.createUser = {};

        $scope.addUser = function() {
            var ref = new Firebase(constantCreateUserURL);
            ref.createUser({
                email: $scope.createUser.username,
                password: $scope.createUser.password
            }, function(error, userData) {
                if (error) {
                    console.log("Error creating user:", error);
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                }
            });
        }
    });
