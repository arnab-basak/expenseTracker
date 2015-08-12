'use strict';
angular.module('expenseTracker')
    .factory('authentication', ['$ionicLoading','localStorage','BASE_URL', '$firebaseAuth', '$state', function($ionicLoading, localStorage, BASE_URL, $firebaseAuth, $state) {
        var factory = {};

        factory.login = function(userName, password) {
            var ref = new Firebase(BASE_URL);
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
                    sessionStorage.error = false;

                    localStorage.set('authenticationData', authData.uid);
                    console.log ('LOGIN DATA', localStorage.get('authenticationData'));

                    $state.go('app.currentBalInfo');

                    return authData.uid;
                }
            });
        };

        factory.logout = function() {
            var ref = new Firebase(BASE_URL);
            ref.unauth();
            localStorage.set('authenticationData', undefined);
            console.log ('LOGOUT DATA', localStorage.get('authenticationData'));
            $state.go('app.login');
        };

        return factory;
    }]);
