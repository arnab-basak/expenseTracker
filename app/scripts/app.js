'use strict';
angular.module('expenseTracker', ['ionic', 'firebase', 'pickadate', 'ngCookies'])

.run(function($ionicPlatform, $rootScope, localStorage, authentication) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    $rootScope.logout = function() {
        authentication.logout();
    }
})

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'views/sideMenu.html',
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'views/login.html',
                        controller: 'loginCtrl'
                    }
                }
            })
            .state('app.createUser', {
                url: '/createUser',
                views: {
                    'menuContent': {
                        templateUrl: 'views/createUser.html',
                        controller: 'createUserCtrl'
                    }
                }
            })
            /*.state('app.calendar', {
                url: '/calendar',
                views: {
                    'menuContent': {
                        templateUrl: 'views/calendar.html',
                        controller: 'calendarCtrl'
                    }
                }
            })*/
            .state('app.salaryDetails', {
                url: '/salaryDetails',
                views: {
                    'menuContent': {
                        templateUrl: 'views/salaryDetails.html',
                        controller: 'salaryDetailsCtrl'
                    }
                }
            })
            .state('app.addExpense', {
                url: '/addExpense',
                views: {
                    'menuContent': {
                        templateUrl: 'views/addExpense.html',
                        controller: 'addExpenseCtrl'
                    }
                }
            })
            .state('app.viewPreviousExpense', {
                url: '/viewPreviousExpense',
                views: {
                    'menuContent': {
                        templateUrl: 'views/viewPreviousExpense.html',
                        controller: 'viewPreviousExpenseCtrl'
                    }
                }
            })
            .state('app.extraStuff', {
                url: '/extraStuff',
                views: {
                    'menuContent': {
                        templateUrl: 'views/extraStuff.html'
                    }
                }
            })
            .state('app.addNewExpenseField', {
                url: '/addNewExpenseField',
                views: {
                    'menuContent': {
                        templateUrl: 'views/addNewExpenseField.html',
                        controller: 'addNewExpenseFieldCtrl'
                    }
                }
            })
            .state('app.addNewBankDetails', {
                url: '/addNewBankDetails',
                views: {
                    'menuContent': {
                        templateUrl: 'views/addNewBankDetails.html',
                        controller: 'addNewBankDetailsCtrl'
                    }
                }
            })
            .state('app.currentBalInfo', {
                url: '/currentBalInfo',
                views: {
                    'menuContent': {
                        templateUrl: 'views/currentBalInfo.html',
                        controller: 'currentBalInfoCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/app/currentBalInfo');
    })
    .constant('constantExpenseTypeURL', '/addNewExpenseField/')
    .constant('constantAddExpenseURL', '/addExpense/')
    .constant('constantBankDetailsURL', '/bankDetails/')
    .constant('constantBaseURL', 'https://salaryexpensetracker.firebaseio.com/')
    .constant('constantOnlyNumbersRegEx', /^[0-9]*(?:\.\d{1,2})?$/);
