'use strict';
angular.module('expenseTracker')
    .controller('createUserCtrl', function(BASE_URL, $scope, $firebaseAuth) {
        $scope.createUser = {};

        $scope.createUserSuccess = false;
        $scope.passwordError = false;
        $scope.userExists = false;
        $scope.createUserForm = {};

        $scope.addUser = function() {

            if ($scope.createUser.password === $scope.createUser.confirmPassword) {
                var ref = new Firebase(BASE_URL);
                $scope.authObj = $firebaseAuth(ref);

                $scope.authObj.$createUser({
                        email: $scope.createUser.userName,
                        password: $scope.createUser.password
                    })
                    .then(function() {
                        $scope.userExists = false;
                        $scope.passwordError = false;
                        $scope.createUserSuccess = true;
                    })
                    .catch(function() {
                        $scope.passwordError = false;
                        $scope.createUserSuccess = false;
                        $scope.userExists = true;
                    });
            } else {
                $scope.createUserSuccess = false;
                $scope.userExists = false;
                $scope.passwordError = true;
            }
        };
    });
