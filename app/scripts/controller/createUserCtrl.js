'use strict';
angular.module('expenseTracker')
    .controller('createUserCtrl', function(constantBaseURL, $scope, $firebaseAuth) {
        $scope.createUser = {};

        $scope.createUserSuccess = false;
        $scope.passwordError = false;
        $scope.userExists = false;
        $scope.createUserForm = {};

        $scope.addUser = function() {

            if ($scope.createUser.password === $scope.createUser.confirmPassword) {
                var ref = new Firebase(constantBaseURL);
                $scope.authObj = $firebaseAuth(ref);

                $scope.authObj.$createUser({
                        email: $scope.createUser.userName,
                        password: $scope.createUser.password
                    })
                    .then(function(userData) {
                        $scope.userExists = false;
                        $scope.passwordError = false;
                        $scope.createUserSuccess = true;

                        //$scope.createUserForm.$setPristine();

                    })
                    .catch(function(error) {
                        $scope.passwordError = false;
                        $scope.createUserSuccess = false;
                        $scope.userExists = true;
                    })
            } else {
                $scope.createUserSuccess = false;
                $scope.userExists = false;
                $scope.passwordError = true;
            }
        };
    });
