'use strict';
angular.module('expenseTracker')
    .factory('authentication', ['localStorage','constantBaseURL', '$firebaseAuth', '$state', function(localStorage, constantBaseURL, $firebaseAuth, $state) {
        var factory = {};

        factory.login = function(userName, password) {
            var ref = new Firebase(constantBaseURL);
            var userData = '';
            ref.authWithPassword({
                email: userName,
                password: password
            }, function(error, authData) {
                if (error) {
                    sessionStorage.error = true;
                    return error;
                } else {
                    userData = authData;

                    localStorage.set('authenticationData', authData.uid);
                    console.log ('LOGIN DATA', localStorage.get('authenticationData'));

                    $state.go('app.currentBalInfo');

                    return authData.uid;
                }
            });
        };

        factory.logout = function() {
            var ref = new Firebase(constantBaseURL);
            ref.unauth();
            localStorage.set('authenticationData', undefined);
            console.log ('LOGOUT DATA', localStorage.get('authenticationData'));
            $state.go('app.login');
        };

        return factory;
    }]);
