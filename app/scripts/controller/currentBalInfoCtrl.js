'use strict';
angular.module('expenseTracker')
    .controller('currentBalInfoCtrl', function(localStorage, $state, commonCalls, $scope, $ionicModal) {
        if (localStorage.get('authenticationData') === 'undefined') {
            $state.go('app.login');
        } else {
            $scope.currentBalInfo = {};
            $scope.modalBankInfo = {};

            $scope.currentDate = commonCalls.fetchCurrentDate();
            $scope.previousDate = commonCalls.fetchPreviousDate();

            $scope.currentBalInfo = commonCalls.bankDetailsFbData();

            $ionicModal.fromTemplateUrl('../views/templates/modalTemplates/bankDetails.tpl', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });

            $scope.openModal = function(index) {
                $scope.modal.show();

                $scope.modalBankInfo = $scope.currentBalInfo[index];
            };

            $scope.closeModal = function() {
                $scope.modal.hide();
            };

            $scope.$on('$destroy', function() {
                $scope.modal.remove();
            });
 
        }

    });
