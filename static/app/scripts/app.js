'use strict';

/**
 * @ngdoc overview
 * @name budgetmeApp
 * @description
 * # budgetmeApp
 *
 * Main module of the application.
 */
angular
  .module('budgetmeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'nvd3ChartDirectives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
          return djangoAuth.authenticationStatus();
          }],
        }
      }).when('/envelope', {
        templateUrl: 'views/envelope.html',
        controller: 'EnvelopeCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
          return djangoAuth.authenticationStatus();
          }],
        }
      }).when('/expense', {
        templateUrl: 'views/expense.html',
        controller: 'ExpenseCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
          return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/record', {
        templateUrl: 'views/record.html',
        controller: 'RecordCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
          return djangoAuth.authenticationStatus();
          }],
        }
      }).when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
          return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
      })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'LogoutCtrl'
      })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
      })
      .otherwise({
        redirectTo: '/register'
      });
  })
  .config(function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }).config(function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
  });
