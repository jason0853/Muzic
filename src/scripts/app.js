'use strict';

// Require angular modules
var angular = require('angular');
var ngRoute = require('angular-route');
var ngAnimate = require('angular-animate');
var ngMessages = require('angular-messages');
var uibs = require('angular-ui-bootstrap');
var firebase = require('firebase');
var angularfire = require('angularfire');
var toastr = require('angular-toastr');

// Create a new module
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngMessages', 'ui.bootstrap', 'firebase', 'toastr']);

// Configure app routes
app.config(function($routeProvider, $httpProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/login.html',
        // controller: 'loginController'
    })
    .when('/main', {
        templateUrl: 'views/main.html',
        // controller: 'mainController',
        resolve: {
            currentAuth: function(authFactory) {
                var auth = authFactory.auth();
                // console.log(auth);
                return auth.$requireAuth();
            }
        }
    })
    .when('/logout', {
        templateUrl: 'views/login.html',
        // controller: 'loginController',
        resolve: {
            logout: function($location, authFactory, toastr) {
                authFactory.logout();
                $location.path('/');
                toastr.success('You have been successfully logged out.', 'Success', {
                    closeButton: true
                });
            }
        }
    })
    .otherwise({
        redirectTo: '/'
    });
    $httpProvider.interceptors.push('httpInterceptor');
})
.run(function($rootScope, $location, toastr) {
    // Error in Authentication
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
        // console.log(error);
        if (error = 'AUTH_REQUIRED') {
            // console.log('Error in Auth');
            $location.path('/');
            toastr.warning('Please Log in!', 'Warning', {
                closeButton: true
            });
        }
    });

    // load Youtube API code asynchronously
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

// Contoller
app.controller('loginController', require('./controllers/loginController'));
app.controller('mainController', require('./controllers/mainController'));

// Directive
app.directive('pwCheck', require('./directives/pwCheckDirective'));
app.directive('youtubeVideo', require('./directives/youtubeVideoDirective'));
app.directive('loading', require('./directives/loadingDirective'));
// app.directive('emailCheck', require('./directives/emailCheckDirective'));

// Service
app.constant('$config', require('./services/config'));
app.factory('authFactory', require('./services/authFactory'));
app.factory('youtubeFactory', require('./services/youtubeFactory'));
app.factory('playerListFactory', require('./services/playerListFactory'));
app.factory('httpInterceptor', require('./services/httpInterceptor'));
app.service('playerService', require('./services/playerService'));
