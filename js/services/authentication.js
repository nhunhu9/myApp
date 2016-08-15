// Initialize Firebase
var config = {
  apiKey: "AIzaSyA2Oe4vpCYxf9vrY66GZY_d_ToCqil_ms0",
  authDomain: "myapp-d4e93.firebaseapp.com",
  databaseURL: "https://myapp-d4e93.firebaseio.com",
  storageBucket: "myapp-d4e93.appspot.com",
};
firebase.initializeApp(config);

myApp.factory('Authentication', ['$rootScope', '$firebaseAuth','$location', '$firebaseObject',
function($rootScope, $firebaseAuth, $location, $firebaseObject) {
  var ref = firebase.database().ref();
  var auth = firebase.auth();

  auth.onAuthStateChanged(function(authUser){
    if (authUser){
      var userRef = firebase.database().ref("users/" + authUser.uid);
      userRef.once("value")
      .then(function(snapshot) {
        $rootScope.currentUser = snapshot.exportVal();
      })
    } else{
      $rootScope.currentUser = '';
    }
  });

  return{
    login: function(user) {
      auth.signInWithEmailAndPassword(user.email,user.password)
      .then(function(regUser){
        $location.path('/success');
      }).catch(function(error){
        $rootScope.message = error.message;
      });
      $rootScope.message = "Welcome " + user.email;
    },//login

    logout: function() {
      return auth.signOut();
    }, // logout

    register: function(user) {
      auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(function(regUser){
        var regRef = firebase.database().ref('users')
        .child(regUser.uid).set({
          date: firebase.database.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        });// user info
        $rootScope.$apply(function(){
          $rootScope.message = "Hi "+ user.firstname + ", thanks for registering";
        });
      }).catch (function(error){
        $rootScope.message = error.message;
      });
    }
  };
}])
