'use strict';
angular.module('expenseTracker')
    .controller('addNewExpenseFieldCtrl', function($state, constantExpenseTypeURL, commonCalls, $scope, $firebaseArray) {
        if (sessionStorage.authenticationData === undefined) {
            $state.go('app.login');
        } else {
            $scope.newExpenseField = {};
            $scope.expenseField = {};

            var expenseTypeLen;

            var checkBoxIndex;
            $scope.addNewExpenseField = commonCalls.expenseTypeFbData();

            $scope.addNewExpenseFieldToDB = function() {

                $scope.newExpenseField.expenseType = $scope.newExpenseField.expenseTypeName.replace(/ +/g, "");

                $scope.addNewExpenseField.$add({
                    'expenseTypeName': $scope.newExpenseField.expenseTypeName,
                    'expenseType': $scope.newExpenseField.expenseType,
                    'checked': true,
                    'inputType': 'number'
                });
            };

            $scope.expenseFieldShow = function(index) {
                if ($scope.addNewExpenseField[index].checked !== $scope.expenseField[index]) {
                    var id = $scope.addNewExpenseField[index].$id;

                    var updateItem = $scope.addNewExpenseField.$getRecord(id);
                    updateItem.checked = $scope.expenseField[index];
                    $scope.addNewExpenseField.$save(updateItem);
                };
            };
        }
    });
