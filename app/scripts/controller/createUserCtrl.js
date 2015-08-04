'use strict';
angular.module('expenseTracker')
    .controller('createUserCtrl', function(constantCreateUserURL, $scope, $firebaseAuth) {
        $scope.createUser = {};

        $scope.createUserSuccess = false;
        $scope.passwordError = false;
        $scope.userExists = false;
        $scope.createUserForm = {};

        $scope.addUser = function() {

            if ($scope.createUser.password === $scope.createUser.confirmPassword) {
                var ref = new Firebase(constantCreateUserURL);
                $scope.authObj = $firebaseAuth(ref);

                $scope.authObj.$createUser({
                        email: $scope.createUser.userName,
                        password: $scope.createUser.password
                    })
                    .then(function(userData) {
                        console.log("User Created Successfully", userData);
                        $scope.userExists = false;
                        $scope.passwordError = false;
                        $scope.createUserSuccess = true;

                        console.log($scope.createUserForm);

                        //$scope.createUserForm.$setPristine();

                    })
                    .catch(function(error) {
                        console.log("User Creating Error", error);
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
