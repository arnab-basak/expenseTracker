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
                    localStorage.set('error', error);
                    return error;
                } else {
                    userData = authData;
                    localStorage.remove('error');
                    console.log("REMOVE:", localStorage.get('error'));
                    localStorage.set('authenticationData', authData.uid);

                    $state.go('app.currentBalInfo');

                    return authData.uid;
                }
            });
        };

        factory.logout = function() {
            var ref = new Firebase(BASE_URL);
            ref.unauth();
            localStorage.remove('authenticationData');
            $state.go('app.login');
        };

        return factory;
    }]);
