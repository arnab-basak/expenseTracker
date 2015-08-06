'use strict';
angular.module('expenseTracker')
    .controller('addNewBankDetailsCtrl', function($state, constantOnlyNumbersRegEx, localStorage, commonCalls, $scope, $firebaseArray) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {
            $scope.addBankDetails = {};
            $scope.bankName = [];

            $scope.onlyNumbers = constantOnlyNumbersRegEx;

            $scope.bankDetails = commonCalls.bankDetailsFbData();
            console.log($scope.bankDetails);

            $scope.addNewBankDetailsToDB = function() {
                $scope.bankDetails.$add({
                    'bankName': $scope.addBankDetails.bankName,
                    'branchName': $scope.addBankDetails.branchName,
                    'accountNumber': $scope.addBankDetails.accountNumber,
                    'currentAmount': $scope.addBankDetails.currentAmount,
                    'checked': true
                });
            };

            $scope.bankShow = function(index) {
                console.log($scope.bankName[index]);
                if ($scope.bankDetails[index].checked !== $scope.bankName[index]) {
                    var id = $scope.bankDetails[index].$id;

                    var updateItem = $scope.bankDetails.$getRecord(id);
                    updateItem.checked = $scope.bankName[index];
                    $scope.bankDetails.$save(updateItem);
                }
            };
        }
    });
