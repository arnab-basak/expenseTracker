'use strict';
angular.module('expenseTracker')
    .controller('salaryDetailsCtrl', function($state, localStorage, commonCalls, constantOnlyNumbersRegEx, $scope) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {
            $scope.salaryDetails = {};
            $scope.totalAmount = 0;

            $scope.salaryDetailsError = false;

            $scope.bankDetails = commonCalls.bankDetailsFbData();
            $scope.totalAmount = commonCalls.fetchTotalBankBalance();

            $scope.onlyNumbers = constantOnlyNumbersRegEx;

            $scope.addSalaryDetailsToDB = function() {

                checkInput();

                if ($scope.salaryDetailsError === false) {
                    for (var i = 0; i < $scope.bankDetails.length; i++) {
                        if ($scope.salaryDetails.accountNumber === $scope.bankDetails[i].accountNumber) {
                            var id = $scope.bankDetails[i].$id;

                            var updateItem = $scope.bankDetails.$getRecord(id);

                            if (updateItem !== null || updateItem !== undefined || updateItem !== '') {
                                updateItem.currentAmount = parseFloat(updateItem.currentAmount) + parseFloat($scope.salaryDetails.salaryAmount); // updateItem.currentAmount -----> currentAmount is the field in JSON

                                $scope.bankDetails.$save(updateItem);
                                $scope.salaryDetailsError = false;

                                $scope.salaryDetails.accountNumber = false;
                                $scope.salaryDetails.salaryAmount = undefined;

                                break;
                            } else {
                                $scope.salaryDetailsError = true;
                            }
                        }
                    }
                }

            };

            var checkInput = function() {
                if ($scope.salaryDetails.salaryAmount === undefined) {
                    $scope.salaryAmountError = true;
                    $scope.salaryDetailsError = true;
                    $scope.accountNumberError = false;
                } else if (!$scope.salaryDetails.accountNumber) {
                    $scope.salaryAmountError = false;
                    $scope.accountNumberError = true;
                    $scope.salaryDetailsError = true;
                }
                else {
                    $scope.accountNumberError = false;
                    $scope.salaryAmountError = false;
                    $scope.salaryDetailsError = false;
                }
            }
        }
    });
