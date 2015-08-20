'use strict';
angular.module('expenseTracker')
    .controller('salaryDetailsCtrl', function($state, localStorage, commonCalls, ONLY_NUMBERS_REGEX, $scope) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {
            $scope.salaryDetails = {};
            $scope.totalAmount = 0;

            $scope.salaryDetailsError;

            $scope.bankDetails = commonCalls.bankDetailsFbData();
            $scope.totalAmount = commonCalls.fetchTotalBankBalance();

            $scope.onlyNumbers = ONLY_NUMBERS_REGEX;

            $scope.addSalaryDetailsToDB = function() {

                checkInput();

                if ($scope.salaryDetailsError === undefined) {
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
                                $scope.salaryDetailsError = 'Error: Unable to update';
                            }
                        }
                    }
                }

            };

            var checkInput = function() {
                if ($scope.salaryDetails.salaryAmount === undefined) {
                    $scope.salaryDetailsError = 'Error: Please Enter The Salary Amount';
                } else if (!$scope.salaryDetails.accountNumber) {
                    $scope.salaryDetailsError = 'Error: Please Select A Bank';
                }
                else {
                    $scope.salaryDetailsError;
                }
            }
        }
    });
