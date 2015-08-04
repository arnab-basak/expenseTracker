'use strict';
angular.module('expenseTracker')
    .factory('authentication', ['$q', 'constantCreateUserURL', '$firebaseAuth', '$state', function($q, constantCreateUserURL, $firebaseAuth, $state) {
        var factory = {};

        factory.login = function(userName, password) {
            var ref = new Firebase(constantCreateUserURL);
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

                    sessionStorage.authenticationData = authData.uid;
                    $state.go('app.currentBalInfo');

                    return authData.uid;
                }
            });
        };

        factory.logout = function() {
            var ref = new Firebase(constantCreateUserURL);
            ref.unauth();
            sessionStorage.removeItem("authenticationData");
            $state.go('app.login');
        }

        return factory;
    }]);
