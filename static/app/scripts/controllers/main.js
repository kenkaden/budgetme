'use strict';

/**
 * @ngdoc function
 * @name budgetmeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the budgetmeApp
 */
angular.module('budgetmeApp')
  .service('ExpenseService', function($http){
    this.post = function(receiptName, amount, envelope) {
        var data = {
            'name': receiptName,
            'amount': amount,
            'envelope': envelope
        };

        $http.post('/api/expense/create_receipt/', data);
    };
  })
  .factory('EnvelopeFactory', function($http){ 
    return $http.get('/api/expense/list_envelope/');
    })
  .factory('UsernameFactory', function($http, $q){ 
    return {
        getUser: function() {
            var nameDeferred = $q.defer();
            $http.get('/api/baseinfo/update/').success(function(data){
                var userDetail = {
                    'username': data.user.username,
                    'id': data.user.id
                };
                nameDeferred.resolve(userDetail);
            });
            return nameDeferred.promise;
        }
      };
    })
  .controller('MainCtrl', function ($scope, ExpenseService, EnvelopeFactory, UsernameFactory, $q, $http, $timeout) {
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
    });

    
    UsernameFactory.getUser().then(function(data){
        $scope.loginName = data.username;
        $scope.loginId = data.id;
    });

    var getEnvelopes = function(){  
    EnvelopeFactory.success(function(data){
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
            "envelope": envelope.name
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
  });
