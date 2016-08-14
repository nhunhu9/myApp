var myApp = angular.module('myApp',
['ngRoute', 'firebase'])
.constant('FIREBASE_URL', 'https://myapp-d4e93.firebaseio.com/');

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/login',{
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller:'RegistrationController'
    }).
    when('/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController'
    }).
    otherwise({
      redirectTo: '/login'
    })
}])

myApp.controller('appController', ['$scope', function($scope){
  $scope.message = "wellcome to my app";
}])
