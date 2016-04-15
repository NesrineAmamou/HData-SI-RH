'use strict';
/**
 * Déclaration de l'application FinaxysApp
 */
var FinaxysApp = angular.module('FinaxysApp', [
    // Dépendances du "module"
    'ngRoute',
    'ngAnimate',
    'ngMessages'
    //'AppControllers'
]);
/**
 * Configuration du module principal : FinaxysApp
 */
FinaxysApp.config(['$routeProvider',
    function($routeProvider) {
        // Système de routage
        $routeProvider
            .when('/auth', {
                templateUrl: 'partials/authentification.html',
                controller: 'AuthCtrl'
            })
            .when('/home', {
                templateUrl: 'partials/home.html'
            })
            .when('/signup', {
                templateUrl: 'partials/signup.html',
                controller: 'SignCtrl'
            })
            .when('/loginStaff', {
                templateUrl: 'partials/loginStaff.html',
                controller: 'AuthStaffCtrl'
            })
            .when('/info', {
                templateUrl: 'partials/CandidateForm.html',
                controller: 'CandidatCtrl'
            })
            .when('/profileStaff', {
                templateUrl: 'partials/profileForStaff.html',
            })
            .when('/profile', {
                templateUrl: 'partials/profile.html',
                controller: 'ProfileCtrl'
            })
            .when('/offres', {
                templateUrl: 'partials/offres.html',
            })
            .when('/entretien', {
                templateUrl: 'partials/entretien.html',
            })
            .when('/acceuil', {
                templateUrl: 'partials/acceuil.html',
            })
            .when('/consulter', {
                templateUrl: 'partials/consulter.html',
            })
            .when('/staffmanagement', {
                templateUrl: 'partials/staffmanagement.html',
                controller: 'StaffManagementCtrl'
            })
            .when('/addStaff', {
                templateUrl: 'partials/addstaff.html',
                controller: 'StaffManagementCtrl'
            })
            .when('/listStaff', {
                templateUrl: 'partials/liststaff.html',
                controller: 'ListStaffCtrl'
            })
            .when('/showmember', {
                templateUrl: 'partials/showmember.html',
                controller: 'showStaffCtrl'
            })
            .when('/recrutement', {
                templateUrl: 'partials/recrutement.html',
                controller: 'recrutementCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
]);



FinaxysApp.run(function($rootScope) {
    if (localStorage.getItem("session") == "true") {} else {
        $rootScope.token = "";
        $rootScope.session = "false";
        $rootScope.type = "";
        localStorage.setItem("token", $rootScope.token);
        localStorage.setItem("session", $rootScope.session);
        localStorage.setItem("picture", "img/user.png");
        //localStorage.setItem("pic", "");
        localStorage.setItem("type", $rootScope.type);
        $rootScope.experiences = [];
        $rootScope.education = [];
        $rootScope.skills = [];
        $rootScope.user = {
            "email": "",
            "password": "",
            "firstname": "",
            "lastname": "",
            "dob": "",
            "address": "",
            "number": "",
            "linkedin": "",
            "github": "",
            "description": "",
            "experiences": $rootScope.experiences,
            "education": $rootScope.education,
            "skills": $rootScope.skills
        };
        localStorage.setItem("user", JSON.stringify($rootScope.user));
        $rootScope.employee = {
            "email": "",
            "password": "",
            "firstname": "",
            "lastname": "",
            "dob": "",
            "address": "",
            "number": "",
            "linkedin": "",
            "github": "",
            "experiences": $rootScope.experiences,
            "education": $rootScope.education,
            "skills": $rootScope.skills
        };

        localStorage.setItem("memberphoto", "");
        $rootScope.member = {
            "email": "",
            "password": "",
            "firstname": "",
            "lastname": "",
            "dob": "",
            "address": "",
            "number": "",
            "linkedin": "",
            "github": "",
            "description": "",
            "roles": "",
            "experiences": $rootScope.experiences,
            "education": $rootScope.education,
            "skills": $rootScope.skills
        };
        localStorage.setItem("member", JSON.stringify($rootScope.member));

    }
    console.log("fonction run*********************** ");
});




FinaxysApp.controller('headCtrl', function($scope, $http, $location, $rootScope) {

    $rootScope.session = localStorage.getItem("session");
    $rootScope.type = localStorage.getItem("type");
    $rootScope.user = JSON.parse(localStorage.getItem("user"));

    if (localStorage.getItem("picture") != "")
        $rootScope.pic = localStorage.getItem("picture");
    else $rootScope.pic = "img/user.png"




    $scope.deconnexion = function() {
        localStorage.setItem("session", "false");
        localStorage.setItem("token", "");
        localStorage.setItem("type", "");
        localStorage.setItem("picture", "img/user.png");
        $rootScope.pic = localStorage.getItem("picture");

        $rootScope.session = localStorage.getItem("session");
        $rootScope.type = localStorage.getItem("type");

        $rootScope.experiences = [];
        $rootScope.education = [];
        $rootScope.skills = [];
        $rootScope.user = {
            "email": "",
            "password": "",
            "firstname": "",
            "lastname": "",
            "dob": "",
            "address": "",
            "number": "",
            "linkedin": "",
            "github": "",
            "description": "",
            "experiences": $rootScope.experiences,
            "education": $rootScope.education,
            "skills": $rootScope.skills
        };
        localStorage.setItem("user", JSON.stringify($rootScope.user));
    };
});




FinaxysApp.controller('HomeStaffCtrl', function($scope, $http, $location, $rootScope) {


    $rootScope.token = localStorage.getItem("token");
    //console.log("token*** "+$rootScope.token);
    var req = {
        method: 'GET',
        url: '' + server + '/profile',
        headers: {
            'jwt': $rootScope.token
        }
    }

    $http(req).success(function(data) {

            $rootScope.user = data.user;
            $rootScope.role = data.user.roles[0];
            $rootScope.pic = data.picture;
            localStorage.setItem("picture", $rootScope.pic);
            localStorage.setItem("user", JSON.stringify($rootScope.user));
            localStorage.setItem("role", JSON.stringify($rootScope.role));



        })
        .error(function(data) {
            $location.path('/home');
        });



});


FinaxysApp.controller('StaffManagementCtrl', function($scope, $http, $location, $rootScope) {

    $rootScope.token = localStorage.getItem("token");
    $rootScope.token = localStorage.getItem("role");


    $scope.add = function(email, password, poste) {
        console.log("ajout membre staff   " + $rootScope.token);

        var req = {
            method: 'POST',
            url: '' + server + '/addstaff',
            headers: {
                'jwt': $rootScope.token
            },
            data: {
                username: email,
                password: password,
                role: poste
            }
        }

        $http(req).success(function(data) {
                $scope.greeting = data;
                //  console.log(data);
                $location.path('/staffmanagement');


            })
            .error(function(data) {

                $scope.greeting = data;
                if (data == "user_already_exists") {
                    $location.path('/acceuil');
                }
                console.log(data);


            });

    };


});


FinaxysApp.controller('ListStaffCtrl', function($scope, $http, $location, $rootScope) {

    $rootScope.token = localStorage.getItem("token");
    $rootScope.token = localStorage.getItem("role");


    var req = {
        method: 'GET',
        url: '' + server + '/liststaff',
        headers: {
            'jwt': $rootScope.token
        }
    }

    $http(req).success(function(data) {
            // console.log("success list staff   ");
            $scope.list = data;

        })
        .error(function(data) {

            console.log("fail list staff   ");
            $scope.greeting = data;
            console.log(data);
            //$location.path('/home');

        });


    $scope.showmember = function(cible) {

        $rootScope.token = localStorage.getItem("token");

        var req = {
            method: 'GET',
            url: '' + server + '/getmember/' + cible,
            headers: {
                'jwt': $rootScope.token
            }
        }

        $http(req).success(function(data) {
                console.log(data);
                //localStorage.setItem("picture","css/user.png");
                //$rootScope.user = JSON.parse(localStorage.getItem("user"));
                $rootScope.member = data.user;
                $rootScope.photo = data.picture;

                localStorage.setItem("memberphoto", $rootScope.photo);
                localStorage.setItem("member", JSON.stringify($rootScope.member));

                console.log("lalala " + $rootScope.member.email + $rootScope.member.firstname + $rootScope.member.lastname + $rootScope.member.address);

                $location.path('/showmember');

            })
            .error(function(data) {
                $location.path('/acceuil');
            });



    }

});




FinaxysApp.controller('AuthStaffCtrl', function($scope, $http, $location, $rootScope) {
    $rootScope.erreur = "false";
    $rootScope.msg = "";

    if (localStorage.getItem("session") == "true") $location.path('/acceuil');

    $scope.verify = function(email, password) {



        $http.post("" + server + '/loginstaff', '{"username":"' + email + '","password":"' +
            password + '"}').
        success(function(data) {
                $scope.greeting = data;
                console.log(data);

                localStorage.setItem("token", data);
                localStorage.setItem("type", "staff");
                localStorage.setItem("session", "true");
                $rootScope.session = localStorage.getItem("session");
                $rootScope.type = localStorage.getItem("type");

                $rootScope.user = JSON.parse(localStorage.getItem("user"));
                $rootScope.user.email = email;
                $rootScope.user.password = password;
                // console.log("controller auth  username= " + $rootScope.user.username);
                localStorage.setItem("user", JSON.stringify($rootScope.user));

                $location.path('/acceuil');
            })
            .error(function(data) {
                $rootScope.erreur = "true";

                if (data == "unauthorized" || "unknown_username") $rootScope.msg = "This account does not exist. Try again !";
                if (data == "wrong_credentials") $rootScope.msg = "Your email and password does not match. Try again !";
                console.log(data);
                //$location.path('/home');
            });

    }



});



FinaxysApp.controller('showStaffCtrl', function($scope, $http, $location, $rootScope) {

    $rootScope.member = JSON.parse(localStorage.getItem("member"));
    $rootScope.photo = localStorage.getItem("memberphoto");
    console.log("member info: " + $rootScope.member.email + $rootScope.member.firstname + $rootScope.member.lastname + $rootScope.member.address);
});




FinaxysApp.controller('recrutementCtrl', function($scope, $http, $location, $rootScope) {

    $rootScope.token = localStorage.getItem("token");
    $rootScope.rolee = localStorage.getItem("role");

});