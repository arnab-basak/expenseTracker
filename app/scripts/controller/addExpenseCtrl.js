'use strict';
angular.module('expenseTracker')
    .controller('addExpenseCtrl', function($state, $scope, localStorage, ONLY_NUMBERS_REGEX, commonCalls, $filter, $ionicPopup, $ionicModal) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {

            if (localStorage.get('selectedDate') === undefined) {
                $scope.showAlert = function() {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Please select date',
                        template: 'Redirecting to Calendar Page.'
                    });
                    alertPopup.then(function(res) {
                        $state.go('app.calendar');
                    });
                };
            } else {
                $scope.form = {};

                $scope.currentDate = commonCalls.fetchCurrentDate();

                $scope.addExpenseError = false;
                $scope.addExpenseSuccess = false;

                $scope.addExpenseTypeData = [];
                $scope.expenseData = {};

                var expenditureDate = '';

                var validateError = true;

                $scope.addExpenseTypeDate = $filter('date')(new Date(localStorage.get('selectedDate')), 'dd/MMMM/yyyy');

                $scope.expenseType = commonCalls.expenseTypeFbData();

                $scope.addExpense = commonCalls.addExpenseFbData();

                $scope.bankDetails = commonCalls.bankDetailsFbData();

                $scope.onlyNumbers = function() {
                    if ($scope.expenseType.expenseType === 'date') {
                        return;
                    } else {
                        return ONLY_NUMBERS_REGEX;
                    }
                };

                $scope.addExpenseToDB = function() {

                    chkAddExpenseVal();

                    if (validateError === true) {
                        $scope.addExpenseError = true;
                        $scope.addExpenseSuccess = false;
                    } else {

                        /*for (var i = 0; i < $scope.expenseType.length; i++) {
                            DBExpenseType = $scope.expenseType[i].expenseType;

                            (function() {
                                $scope['expenseData'][DBExpenseType] = $scope.addExpenseTypeData[i];
                                console.log(DBExpenseType, $scope['expenseData'][DBExpenseType]);
                                var fbExpenseType = $scope['expenseData'][DBExpenseType];

                                $scope.addExpense.$add({
                                    fbExpenseType: $scope.addExpenseTypeData[i]
                                });
                            })();
                        };*/

                        $scope.addExpense.$add({
                            'date': $scope.addExpenseTypeDate,
                            'cashExpense': $scope.addExpenseTypeData[1],
                            'cardExpense': $scope.addExpenseTypeData[2],
                            'otherExpense': $scope.addExpenseTypeData[3],
                            'transferToMom': $scope.addExpenseTypeData[4],
                            'transferToUncle': $scope.addExpenseTypeData[5],
                            'transferToSavings': $scope.addExpenseTypeData[6],
                            'phoneBill': $scope.addExpenseTypeData[7],
                            'internetBill': $scope.addExpenseTypeData[8],
                            'electricityBill': $scope.addExpenseTypeData[9],
                            'CCPayment': $scope.addExpenseTypeData[10],
                            'SIPInstallments': $scope.addExpenseTypeData[11],
                            'petrol': $scope.addExpenseTypeData[12],
                            'totalDayExpense': perDayTotal()

                        });

                        $scope.addExpenseError = false;
                        $scope.addExpenseSuccess = true;

                        clearForm();
                    }

                };
                var chkAddExpenseVal = function() {
                    for (var i = 1; i < $scope.addExpenseTypeData.length; i++) {
                        if ($scope.addExpenseTypeData[i] === null || $scope.addExpenseTypeData[i] === undefined || parseInt($scope.addExpenseTypeData[i]) === 0) {
                            $scope.addExpenseTypeData[i] = 0;
                            validateError = false;
                        } else {
                            validateError = false;
                        }
                    }
                };

                var perDayTotal = function() {
                    var totalExpense = 0;
                    for (var i = 1; i < $scope.addExpenseTypeData.length; i++) {
                        totalExpense = totalExpense + $scope.addExpenseTypeData[i];
                    }

                    return totalExpense;
                };

                var clearForm = function() {
                    $scope.form.addExpenseForm.$setPristine();
                    $scope.addExpenseTypeData = [];
                    $scope.addExpenseTypeDate;
                };



                //ionicModal CODE: 
                $ionicModal.fromTemplateUrl('../views/templates/modalTemplates/expenditureDetails.tpl', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    $scope.modal = modal
                })

                $scope.confirmExpenditure = function() {
                    $scope.modal.show()
                }

                $scope.closeModal = function() {
                    $scope.modal.hide();
                };

                $scope.$on('$destroy', function() {
                    $scope.modal.remove();
                });
            }
        }

    });
