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
    'nvd3ChartDirectives',
    'customCurrency'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'DashboardCtrl'
      }).when('/envelope', {
        templateUrl: 'views/envelope.html',
        controller: 'EnvelopeCtrl'
      }).when('/expense', {
        templateUrl: 'views/expense.html',
        controller: 'ExpenseCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
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
        redirectTo: '/'
      });
  })
  .config(function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }).config(function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
  });
