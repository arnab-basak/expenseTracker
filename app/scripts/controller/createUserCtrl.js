'use strict';
angular.module('expenseTracker')
    .controller('createUserCtrl', function(BASE_URL, $scope, $firebaseAuth) {
        $scope.createUser = {};

        $scope.createUserSuccess;
        $scope.createUserError;
        $scope.form = {};

        $scope.removeStatusMsg = function() {
            $scope.createUserError = undefined;
            $scope.createUserSuccess = undefined;
        };

        $scope.addUser = function() {

            if ($scope.createUser.password == $scope.createUser.confirmPassword) {
                var ref = new Firebase(BASE_URL);
                $scope.authObj = $firebaseAuth(ref);

                $scope.authObj.$createUser({
                        email: $scope.createUser.userName,
                        password: $scope.createUser.password
                    })
                    .then(function() {
                        $scope.createUserError;
                        $scope.createUserSuccess = 'Success: User created successfully';
                    })
                    .catch(function() {
                        $scope.createUserSuccess;
                        $scope.createUserError = 'Error: The username already exists';
                    });
            } else {
                $scope.createUserSuccess;
                $scope.createUserError = 'Error: The passwords mismatch';
            }
        };

    });
