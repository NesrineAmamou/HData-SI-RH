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
            .when('/signinStaff', {
                templateUrl: 'partials/signinStaff.html',
                controller: 'AuthCtrl2'
            })
            .when('/candidat', {
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
            .otherwise({
                redirectTo: '/home'
            });
    }
]);
FinaxysApp.run(function($rootScope) {
    if (localStorage.getItem("session") == "true") {} else {
        $rootScope.token="";
        $rootScope.session = "false";
        $rootScope.type = "";
        localStorage.setItem("token", $rootScope.token);
        localStorage.setItem("session", $rootScope.session);
        localStorage.setItem("picture", "css/user.png");
        localStorage.setItem("type", $rootScope.type);
        $rootScope.experiences = [];
        $rootScope.formation = [];
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
            "formation": $rootScope.formation,
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
            "formation": $rootScope.formation,
            "skills": $rootScope.skills
        };
    }
    console.log("fonction run*********************** ");
});








FinaxysApp.controller('headCtrl', function($scope, $http, $location, $rootScope) {
    $rootScope.session = localStorage.getItem("session");
    $rootScope.type = localStorage.getItem("type");
    $rootScope.user = JSON.parse(localStorage.getItem("user"));


    $scope.deconnexion = function() {
        localStorage.setItem("session", "false");
        localStorage.setItem("token", "");
        localStorage.setItem("type", "");

        $rootScope.session = localStorage.getItem("session");
        $rootScope.type = localStorage.getItem("type");
        
        $rootScope.experiences = [];
        $rootScope.formation = [];
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
            "formation": $rootScope.formation,
            "skills": $rootScope.skills
        };
        localStorage.setItem("user", JSON.stringify($rootScope.user));
    };
});



FinaxysApp.controller('AuthCtrl2', function($scope, $http, $location, $rootScope) {
    if (localStorage.getItem("session") == "true") $location.path('/profileStaff');
    // else{
    //     localStorage.setItem("auth", "false");
    //     localStorage.setItem("username", "");
    // }
    $scope.verify = function(email, password) {
        // $http.get("http://"+server+'/login/'+username+'/'+password).
        //         success(function(data) {
        //             $scope.greeting = data;
        //             console.log(data);
        //         });  
        localStorage.setItem("type", "staff");
        localStorage.setItem("session", "true");
        $rootScope.session = localStorage.getItem("session");
        $rootScope.type = localStorage.getItem("type");
        // $rootScope.user=JSON.parse(localStorage.getItem("user"));
        // $rootScope.user.username=username;
        // $rootScope.user.password=password;
        // console.log("controller auth  username= "+$rootScope.user.username);
        // localStorage.setItem("user", JSON.stringify($rootScope.user));
        $location.path('/acceuil');
    }
});