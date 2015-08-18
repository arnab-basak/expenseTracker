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

//RUN BLOCKS FOR TEMPLATECACHE
/*.run(function($templateCache) {
    //TEMPLATE CACHE FOR VIEWS
    $templateCache.put('login', '<ion-view title="User Login"> <div class="bg"></div><ion-content class="has-header"> <div class="card cardBoxShadowCustom"> <div class="item item-text-wrap"> <i class="icon ion-android-person ionicIconSize"></i>&nbsp;&nbsp; Login </div></div><div class="card cardBoxShadowCustom"> <form name="form.loginForm" novalidate> <ion-list> <div class="row"> <div class="col"> <div class="list"> <label class="item item-input"> <input type="email" name="username" placeholder="Username" ng-model="login.userName" required> </label> </div><div class="list"> <label class="item item-input"> <input type="password" placeholder="password" ng-model="login.password" required> </label> </div></div></div></ion-list> </form> </div><div class="card cardBoxShadowCustom" ng-if="loginError"> <ion-list> <div class="row"> <div class="col"> <div ng-include="loginError"></div></div></div></ion-list> </div><div class="row"> <div class="col"> <div class="padding"> <button class="button button-positive button-block" ng-click="appLogin()"> Sign In </button> <p class="text-center"> <a class="linkNoDecoration" href="#/app/createUser">Create User</a> </p></div></div></div></ion-content></ion-view>');
    $templateCache.put('sideMenu', '<ion-side-menus><ion-pane ion-side-menu-content><ion-nav-bar class="bar-positive"></ion-nav-bar><ion-nav-view name="menuContent" animation="slide-left-right"></ion-nav-view></ion-pane><ion-side-menu side="left"><header class="bar bar-header bar-brave"><h1 class="title">Menu</h1></header><ion-content class="has-header"><ion-list><ion-item nav-clear menu-close href="#/app/currentBalInfo"><i class="icon ion-calendar"></i>&nbsp;&nbsp;Current Balance Info</ion-item><ion-item nav-clear menu-close href="#/app/salaryDetails"><i class="icon ion-calendar"></i>&nbsp;&nbsp;Salary Details</ion-item><ion-item nav-clear menu-close href="#/app/addExpense"><i class="icon ion-plus-round"></i>&nbsp;&nbsp;Add Expense</ion-item><ion-item nav-clear menu-close href="#/app/addNewBankDetails"><i class="icon ion-plus-round"></i>&nbsp;&nbsp;Add / Remove Bank Details</ion-item><ion-item nav-clear menu-close href="#/app/addNewExpenseField"><i class="icon ion-plus-round"></i>&nbsp;&nbsp;Add / Remove Expense Fields</ion-item><ion-item nav-clear menu-close href="#/app/viewPreviousExpense"><i class="icon ion-document-text"></i>&nbsp;&nbsp;View Previous Expense</ion-item><ion-item nav-clear menu-close href="#/app/extraStuff"><i class="icon ion-document-text"></i>&nbsp;&nbsp;Extra Stuff</ion-item></ion-list></ion-content></ion-side-menu></ion-side-menus>');
    $templateCache.put('createUser', '<ion-view title="Create New User"> <ion-content class="has-header"> <ion-list> <ion-item> <form name="createUserForm" ng-submit="addUser()" novalidate> <div class="list"> <label class="item item-input"> <input type="email" name="userName" placeholder="Username" ng-model="createUser.userName" required> </label> </div><div class="list"> <label class="item item-input"> <input type="password" name="password" placeholder="password" minlength="8" ng-model="createUser.password" required> </label> <label class="item item-input"> <input type="password" placeholder="Confirm Password" ng-model="createUser.confirmPassword" required> </label> <div ng-if="passwordError" ng-include="passwordMismatchError"></div><div ng-if="createUserSuccess" ng-include="createUserSuccess"></div><div ng-if="userExists" ng-include="views/templates/userExists"></div><div ng-if="createUserForm.userName.$touched && createUserForm.userName.$invalid" ng-include="invalidEmail"></div><div ng-if="createUserForm.password.$touched && createUserForm.password.$invalid" ng-include="invalidPassword"></div></div><div class="padding"> <button class="button button-dark button-block" ng-disabled="createUserForm.$invalid"> Create User </button> <p class="text-center"> <a class="linkNoDecoration" href="#/app/login">Already A User? Login</a> </p></div></form> </ion-item> </ion-list> </ion-content></ion-view>');
    $templateCache.put('calendar','<ion-view title="Calendar"> <div class="bg"></div> <ion-nav-buttons side="left"> <button menu-toggle="left" class="button button-icon icon ion-navicon"></button> </ion-nav-buttons> <ion-content class="has-header"> <div class="card cardBoxShadowCustom"> <div class="item item-text-wrap"> <i class="fa fa-calendar ionicIconSize"></i>&nbsp;&nbsp;Please select a date: </div> </div> <div class="row"> <div class="col"> <ionic-datepicker idate="currentDate" disablepreviousdates="false" disablefuturedates="false" callback="datePickerCallback" disableddates="disabledDates" title="title" mondayfirst="true"> <button class="button button-block button-royal"> {{ currentDate | date:"dd/MMMM/yyyy" }} </button> </ionic-datepicker> </div> </div> <div class="row"> <div class="col"> <a class="button button-block button-positive" href="#/app/addExpense"> Add Expense </a> </div> </div> <div class="row"> <div class="col"> <a class="button button-block button-assertive" href="#/app/viewPreviousExpense"> View Previous Expense </a> </div> </div> </ion-content> </ion-view>');
    $templateCache.put('salaryDetails','<ion-view title="Salary Details"> <div class="bg"></div> <ion-nav-buttons side="left"> <button menu-toggle="left" class="button button-icon icon ion-navicon"></button> </ion-nav-buttons> <ion-content class="has-header"> <ion-list> <ion-item class="item item-divider"> <div>Salary Details:</div> </ion-item> </ion-list> <div class="card cardBoxShadowCustom" ng-if="bankDetails.length>0"> <ion-list> <form name="salaryDetailsForm" novalidate ng-submit="addSalaryDetailsToDB()"> <ion-item> <div class="list"> <label class="item item-input"> <input type="number" name="salaryAmount" placeholder="Salary Amount" ng-model="salaryDetails.salaryAmount" ng-pattern="onlyNumbers" required> </label> </div> </ion-item> <ion-item> <div class="list"> <div>Select Credited Bank:</div> </div> <div class="list"> <ion-radio name="bankDetails" ng-model="salaryDetails.accountNumber" ng-value="bank.accountNumber" ng-repeat="bank in bankDetails" required> <i class="fa fa-calendar ionicIconSize"></i> <span class="bankNameWidth ellipsis">{{bank.bankName}}</span> <span class="bankAccNoWidth ellipsis">{{bank.accountNumber}}</span> </ion-radio> </div> </ion-item> <ion-item ng-if="salaryDetailsError"> <div ng-if="salaryAmountError" ng-include="salaryAmountError"></div> <div ng-if="accountNumberError" ng-include="selectBank"></div> </ion-item> <ion-item> <div class="padding"> <button class="button button-dark button-block"> Submit </button> </div> </ion-item> </form> </ion-list> </div> <div class="card cardBoxShadowCustom" ng-if="bankDetails.length>0"> <ion-item> <div class="list"> <div>Total Amount:</div> </div> <div class="list" ng-repeat="bank in bankDetails"> <i class="fa fa-calendar ionicIconSize"></i> <span class="bankNameWidth ellipsis">{{bank.bankName}}</span> <span class="currentAmountWidth ellipsis">{{bank.currentAmount}}</span> </div> </ion-item> </div> <div class="card cardBoxShadowCustom" ng-if="bankDetails.length===0"> <div class="item item-text-wrap"> <div ng-include="noBankDetails"></div> </div> </div> <div class="row" ng-if="bankDetails.length===0"> <div class="col"> <a class="button button-royal button-block" href="#/app/addNewBankDetails">Add New Bank Details</a> </div> </div> </ion-content> </ion-view>');
}) */

.run(function($templateCache) {
    //TEMPLATE CACHE FOR MESSAGE TEMPLATES
    $templateCache.put('loginError', '<div class="errorSuccessTemplate"> <i class="assertive ion-information-circled ionicIconSize"></i><span class="errorSuccessTextAlign">&nbsp;&nbsp;{{errorMessage}}</span> </div>');
    $templateCache.put('createUserStatusMessage', '<div class="errorSuccessTemplate templateFontSize" ng-if="createUserSuccess===undefined && createUserError !== undefined"> <i class="assertive ion-information-circled ionicIconSize"></i><span class="errorSuccessTextAlign">&nbsp;&nbsp;{{createUserError}}</span> </div> <div class="errorSuccessTemplate" ng-if="createUserSuccess!==undefined && createUserError === undefined"> <i class="balanced ion-checkmark-circled ionicIconSize"></i><span class="errorSuccessTextAlign">&nbsp;&nbsp;{{createUserSuccess}}</span> </div>');
    $templateCache.put('salaryAmountError', '<div class="errorSuccessTemplate"> <i class="assertive ion-information-circled"></i><span class="errorSuccessTextAlign">&nbsp;&nbsp;Enter Salary Amount</span> </div>');
    $templateCache.put('selectBank', '<div class="errorSuccessTemplate"> <i class="assertive ion-information-circled"></i><span class="errorSuccessTextAlign">&nbsp;&nbsp;Please Select A Bank</span> </div>');
    $templateCache.put('noBankDetails', '<div class="errorSuccessTemplate"> <i class="assertive ion-information-circled ionicIconSize"></i><span class="errorSuccessTextAlign">&nbsp;&nbsp;Bank Details Not Found!</span> </div>');
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
