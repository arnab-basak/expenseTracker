'use strict';
angular.module('expenseTracker')
    .factory('authentication', ['$q', 'constantCreateUserURL', '$firebaseAuth', function($q, constantCreateUserURL, $firebaseAuth) {
        var factory = {};

        factory.isLoggedIn = function(userName, password) {
            var ref = new Firebase(constantCreateUserURL);
            var userData = '';
            ref.authWithPassword({
                email: userName,
                password: password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);

                    return false;
                } else {
                    userData = authData;
                    console.log("Authenticated successfully with payload:", authData);

                    return true;
                }
            });
        };
    }]);
