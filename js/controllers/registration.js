// Initialize Firebase
var config = {
  apiKey: "AIzaSyA2Oe4vpCYxf9vrY66GZY_d_ToCqil_ms0",
  authDomain: "myapp-d4e93.firebaseapp.com",
  databaseURL: "https://myapp-d4e93.firebaseio.com",
  storageBucket: "myapp-d4e93.appspot.com",
};
firebase.initializeApp(config);

myApp.controller('RegistrationController',
['$scope', '$firebaseAuth',
function($scope, $firebaseAuth){
  var ref = firebase.database().ref();
  var auth = firebase.auth();
  $scope.login = function(){
    $scope.message = "Welcome " + $scope.user.email;
  };

  $scope.register = function(){
      auth.createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
      .then(function(regUser){
        $scope.$apply(function(){
          $scope.message = "Hi "+ $scope.user.firstname + ", thanks for registering";
        });
      }).catch (function(error){
        $scope.message = error.message;
      });
    };
}]);
