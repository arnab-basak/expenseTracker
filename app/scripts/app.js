// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
'use strict';
angular.module('starter', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
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
})

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/sideMenu.html'
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'loginCtrl'
                    }
                }
            })
            .state('app.createUser', {
                url: '/createUser',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/createUser.html',
                        controller: 'createUserCtrl'
                    }
                }
            })
            .state('app.addExpense', {
                url: '/addExpense',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/addExpense.html',
                        controller: 'addExpenseCtrl'
                    }
                }
            })
            .state('app.viewPreviousExpense', {
                url: '/viewPreviousExpense',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/viewPreviousExpense.html',
                        controller: 'viewPreviousExpenseCtrl'
                    }
                }
            })
            .state('app.extraStuff', {
                url: '/extraStuff',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/extraStuff.html'
                    }
                }
            })
            .state('app.addNewExpenseField', {
                url: '/addNewExpenseField',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/addNewExpenseField.html',
                        controller: 'addNewExpenseFieldCtrl'
                    }
                }
            })
            .state('app.addNewBankDetails', {
                url: '/addNewBankDetails',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/addNewBankDetails.html',
                        controller: 'addNewBankDetailsCtrl'
                    }
                }
            })
            .state('app.currentBalInfo', {
                url: '/currentBalInfo',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/currentBalInfo.html',
                        controller: 'currentBalInfoCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/currentBalInfo');
    })
    .constant('constantExpenseTypeURL', 'https://salaryexpensetracker.firebaseio.com/addNewExpenseField/')
    .constant('constantAddExpenseURL', 'https://salaryexpensetracker.firebaseio.com/addExpense/')
    .constant('constantBankDetailsURL', 'https://salaryexpensetracker.firebaseio.com/bankDetails/')
    .constant('constantCreateUserURL', 'https://salaryexpensetracker.firebaseio.com/')
    .constant('constantOnlyNumbersRegEx', /^[0-9]*(?:\.\d{1,2})?$/);
