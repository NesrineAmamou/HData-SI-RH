FinaxysApp.controller('ProfileCtrl', function($scope, $http, $location, $rootScope) {


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

            //localStorage.setItem("picture","css/user.png");
            //$rootScope.user = JSON.parse(localStorage.getItem("user"));
            $rootScope.user = data.user;
            if (data.picture != "") {
                $rootScope.pic = data.picture;
                localStorage.setItem("picture", $rootScope.pic);
            } else $rootScope.pic = "img/user.png";
            $rootScope.resume = data.resume;

            $rootScope.resume.formation=$rootScope.resume.formation.substring(9,$rootScope.resume.formation.length);
            $rootScope.formationcv=[];
            $rootScope.formationcv=$rootScope.resume.formation.split(".");

            $rootScope.resume.skills=$rootScope.resume.skills.substring(11,$rootScope.resume.skills.length);
            $rootScope.skillscv=[];
            $rootScope.skillscv=$rootScope.resume.skills.split(".");

            $rootScope.resume.langues=$rootScope.resume.langues.substring(7,$rootScope.resume.langues.length);
            $rootScope.languescv=[];
            $rootScope.languescv=$rootScope.resume.langues.split(".");


            $rootScope.resume.experiences=$rootScope.resume.experiences.substring(11,$rootScope.resume.experiences.length);
            $rootScope.experiencescv=[];
            $rootScope.experiencescv=$rootScope.resume.experiences.split(".");


            $rootScope.role = data.user.roles[0];
            //$rootScope.pic = localStorage.getItem("picture");
            //$rootScope.ds=JSON.parse(localStorage.getItem("koala"));
            console.log($rootScope.role);
            console.log($rootScope.resume.experiences);
            // if ($rootScope.images != null) {
            //     $rootScope.pic = $rootScope.images[0];

            localStorage.setItem("user", JSON.stringify($rootScope.user));
            localStorage.setItem("resume", JSON.stringify($rootScope.resume));
            //};

            $scope.edit = function() {

                $location.path('/info');
            };




        })
        .error(function(data) {
            $location.path('/auth');
        });


});