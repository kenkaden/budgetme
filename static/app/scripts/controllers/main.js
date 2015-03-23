'use strict';

/**
 * @ngdoc function
 * @name budgetmeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the budgetmeApp
 */
angular.module('budgetmeApp')
  .factory('EnvelopeFactory', function($http){ 
    return $http.get('/api/expense/list_envelope/');
    })
  .factory('UsernameFactory', function($http, $q){ 
    return {
        getUser: function() {
            var nameDeferred = $q.defer();
            $http.get('/api/baseinfo/list/').success(function(data){
                var userDetail = data;
                nameDeferred.resolve(userDetail);
            });
            return nameDeferred.promise;
        }
      };
    })
  .controller('MainCtrl', function ($scope, EnvelopeFactory, UsernameFactory, $q, $http, $timeout) {
    $scope.problem = ''; 
    $scope.loginName ='';
    $scope.loginId = '';
    $scope.nameError = 'Expense Name';
    $scope.submitStatus = 'Submit';

    $scope.$on('updateEnvelope', function(event, args){
        $http.get('/api/expense/list_envelope/')
        .success(function(data){
            $scope.envelopeArray = data;
        })
        .then(function(){
        $scope.envelopeOption = $scope.envelopeArray[0];
        });
    });
    
    UsernameFactory.getUser().then(function(data){
        $scope.loginName = data.username.charAt(0).toUpperCase() + data.username.substring(1);
        $scope.loginId = data.id;
    });

    var getEnvelopes = function(){  
    $http.get('/api/expense/list_envelope/').success(function(data){
        $scope.envelopeArray = data;
        }).then(function(){
        $scope.envelopeOption = $scope.envelopeArray[0];
    });
    };

    getEnvelopes();

    $scope.toggle = function() {
         var myEl = angular.element( document.querySelector( '#wrapper' ) );
         myEl.toggleClass('toggled');     
    };

    $scope.expenseSubmit = function(name, amount, envelope){
        var data = {
            "name" : name,
            "amount" : amount,
            "user" : $scope.loginId,
            "envelope": envelope.id
        };

        function submitStatusTimeout(){
            $scope.submitStatus = 'Submit';
        };

        $http.post('/api/expense/create_receipt/', data)
        .success(function(data){
            $scope.$broadcast('updateExpense', { message: 'msg from expense'});
            $scope.submitStatus = 'Submitted';
            $scope.expenseAmount = '';
            $scope.expenseName = '';
            $timeout(submitStatusTimeout, 2000);
        })
        .error(function(error){
            console.log('This is the post error' + error);
        });
      };

      $scope.$on("djangoAuth.logged_out", function(){
        $scope.loginName ='';
      });
  }); // end of controller
