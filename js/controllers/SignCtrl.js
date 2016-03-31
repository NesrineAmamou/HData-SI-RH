FinaxysApp.controller('SignCtrl', function($scope, $http, $location, $rootScope) {
    if (localStorage.getItem("session") == "true") $location.path('/candidat');
    // else {
    //     localStorage.setItem("auth", "false");
    //     localStorage.setItem("username", "");
    // }
    $scope.verify = function( email, password, cpassword) {

        $http.post("" + server + '/signup', '{"username":"' + email + '","password":"' +
            password + '"}').
        success(function(data) {
            $scope.greeting = data;
            console.log(data);

            localStorage.setItem("token", data);
            
            localStorage.session = "true";
            $rootScope.session = localStorage.getItem("session");
            
            localStorage.setItem("type", "candidat");
            $rootScope.type = localStorage.getItem("type");
            
            $rootScope.user = JSON.parse(localStorage.getItem("user"));
            $rootScope.user.email = email;
            $rootScope.user.password = password;
            localStorage.setItem("user", JSON.stringify($rootScope.user));

            $location.path('/candidat');

})
        .error(function(data) {
            $scope.greeting = data;
            console.log(data);
             $location.path('/home');

});
        
    };


});