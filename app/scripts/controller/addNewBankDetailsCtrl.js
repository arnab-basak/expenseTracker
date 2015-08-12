'use strict';
angular.module('expenseTracker')
    .controller('addNewBankDetailsCtrl', function($state, ONLY_NUMBERS_REGEX, localStorage, commonCalls, $scope, $firebaseArray, $ionicModal) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {
            $scope.addBankDetails = {};
            $scope.bankName = [];

            $scope.onlyNumbers = ONLY_NUMBERS_REGEX;

            $scope.bankDetails = commonCalls.bankDetailsFbData();

            $scope.bankType = commonCalls.bankType();

            $scope.addNewBankDetailsToDB = function(form) {
                $scope.bankDetails.$add({
                    'bankName': $scope.addBankDetails.bankName,
                    'branchName': $scope.addBankDetails.branchName,
                    'bankType': $scope.addBankDetails.bankType,
                    'accountNumber': $scope.addBankDetails.accountNumber,
                    'currentAmount': $scope.addBankDetails.currentAmount,
                    'checked': true
                });

                clearForm(addBankDetailsForm);
            };

            $scope.confirmBankDetails = function() {
                $scope.modal.show();
            }

            //UNCHECK A BANK FROM THE LIST ADDED
            /*$scope.bankShow = function(index) {
                console.log($scope.bankName[index]);
                if ($scope.bankDetails[index].checked !== $scope.bankName[index]) {
                    var id = $scope.bankDetails[index].$id;

                    var updateItem = $scope.bankDetails.$getRecord(id);
                    updateItem.checked = $scope.bankName[index];
                    $scope.bankDetails.$save(updateItem);
                }
            };*/

            $ionicModal.fromTemplateUrl('../views/templates/modalTemplates/newBankDetails.tpl', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal
            });

            $scope.closeModal = function() {
                $scope.modal.hide();
            };

            $scope.$on('$destroy', function() {
                $scope.modal.remove();
            });


            var clearForm = function(addBankDetailsForm) {
                addBankDetailsForm.$setPristine();
            }
        }
    });
