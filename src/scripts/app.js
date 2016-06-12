'use strict';

// Require angular modules
var angular = require('angular');
var ngRoute = require('angular-route');
var ngAnimate = require('angular-animate');
var uibs = require('angular-ui-bootstrap');

// Create a new module
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

// Configure app routes
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
    })
    .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'mainController'
    });
});

// Contoller
app.controller('loginController', require('./controllers/loginController'));
app.controller('mainController', require('./controllers/mainController'));
