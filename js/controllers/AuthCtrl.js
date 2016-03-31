FinaxysApp.controller('AuthCtrl', function($scope, $http, $location, $rootScope) {
    $rootScope.erreur="false";
    if (localStorage.getItem("session") == "true") $location.path('/candidat');
    // else{
    //     localStorage.setItem("auth", "false");
    //     localStorage.setItem("username", "");
    // }
    $scope.verify = function(email, password) {
        // console.log('{"username":"' + username + '","password":"' +
        //     password + '"}');
        $http.post("" + server + '/login', '{"username":"' + email + '","password":"' +
            password + '"}').
        success(function(data) {
            $scope.greeting = data;
            console.log(data);

            localStorage.setItem("token", data);
            localStorage.setItem("session", "true");
            localStorage.setItem("type", "candidat");
            $rootScope.session = localStorage.getItem("session");
            $rootScope.type = localStorage.getItem("type");
            $rootScope.user = JSON.parse(localStorage.getItem("user"));
            $rootScope.user.email = email;
            $rootScope.user.password = password;
            // console.log("controller auth  username= " + $rootScope.user.username);
            localStorage.setItem("user", JSON.stringify($rootScope.user));

            $location.path('/candidat');
        })
        .error(function(data) {
            $rootScope.erreur="true";
            
        });

        
    }
});