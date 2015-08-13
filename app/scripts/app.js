'use strict';
angular.module('expenseTracker', ['ionic', 'firebase', 'ionic-datepicker', 'ui.mask'])

.run(function($ionicPlatform, $rootScope, localStorage, authentication, $ionicLoading) {
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

    //LOGOUT FUNCTIONALITY
    $rootScope.logout = function() {
        authentication.logout();
    };

    //Loading Screen - ionicLoading.show() & ionicLoading.hide(). 
    //HTTP Interceptors for the same are coded in the angular.config section below.

    //The $ionicLoading for the actual implementation during data call just needs to be injected in the
    //service calls.

    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
            template: 'Loading...'
        })
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
    });


    //Setting LocalStorage to empty
    localStorage.remove('authenticationData');
    localStorage.remove('error');
    localStorage.remove('selectedDate');

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
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
            .state('app.calendar', {
                url: '/calendar',
                views: {
                    'menuContent': {
                        templateUrl: 'views/calendar.html',
                        controller: 'calendarCtrl'
                    }
                }
            })
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

        //Loading Screen - HTTP Interceptors
        $httpProvider.interceptors.push(function($rootScope) {
            return {
                request: function(config) {
                    $rootScope.$broadcast('loading:show')
                    return config
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide')
                    return response
                }
            }
        });
    })
    .constant('EXPENSE_TYPE_URL', '/addNewExpenseField/')
    .constant('ADD_EXPENSE_URL', '/addExpense/')
    .constant('BANK_DETAILS_URL', '/bankDetails/')
    .constant('BASE_URL', 'https://salaryexpensetracker.firebaseio.com/')
    .constant('ONLY_NUMBERS_REGEX', /^[0-9]*(?:\.\d{1,2})?$/)
    .constant('BANK_TYPE_URL', '../properties/bankType.json');
