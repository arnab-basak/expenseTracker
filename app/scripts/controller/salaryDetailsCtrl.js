'use strict';
angular.module('expenseTracker')
    .controller('salaryDetailsCtrl', function(commonCalls, constantOnlyNumbersRegEx, $scope) {
        $scope.salaryDetails = {};
        $scope.totalAmount = 0;

        $scope.bankDetails = commonCalls.bankDetailsFbData();
        $scope.totalAmount = commonCalls.fetchTotalBankBalance();

        $scope.onlyNumbers = constantOnlyNumbersRegEx;

        $scope.addSalaryDetailsToDB = function() {

            console.log($scope.salaryDetails.accountNumber);

            for (var i = 0; i < $scope.bankDetails.length; i++) {
                if ($scope.salaryDetails.accountNumber === $scope.bankDetails[i].accountNumber) {
                    var id = $scope.bankDetails[i].$id;

                    var updateItem = $scope.bankDetails.$getRecord(id);
                    updateItem.currentAmount = parseFloat(updateItem.currentAmount) + parseFloat($scope.salaryDetails.salaryAmount); // updateItem.currentAmount -----> currentAmount is the field in JSON

                    $scope.bankDetails.$save(updateItem);
                    $scope.totalAmount = commonCalls.fetchTotalBankBalance();

                    break;
                }
            }
        };
    });
