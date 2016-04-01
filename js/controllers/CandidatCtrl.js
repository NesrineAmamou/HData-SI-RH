FinaxysApp.controller('CandidatCtrl', function($scope, $http, $location, $rootScope) {

if (localStorage.getItem("session") == "false") $location.path('/auth');

    $rootScope.user = JSON.parse(localStorage.getItem("user"));
    $rootScope.firstname = $rootScope.user.firstname;
    $rootScope.lastname = $rootScope.user.lastname;
    $rootScope.dob = $rootScope.user.dob;
    $rootScope.address = $rootScope.user.address;
    $rootScope.number = $rootScope.user.number;
    $rootScope.linkedin = $rootScope.user.linkedin;
    $rootScope.github = $rootScope.user.github;
    $rootScope.description = $rootScope.user.description;


    $scope.add_exp = function(year, company, poste, post_description) {
        $rootScope.user = JSON.parse(localStorage.getItem("user"));
        $rootScope.user.experiences.push({
            date: year,
            company: company,
            position: poste,
            description: post_description
        });
        localStorage.setItem("user", JSON.stringify($rootScope.user));
        // Réinitialisation des variables
        $scope.year = '';
        $scope.company = '';
        $scope.poste = '';
        $scope.post_description = '';
    };


    $scope.add_educ = function(year_educ, school, degree, activity) {
        $rootScope.user = JSON.parse(localStorage.getItem("user"));
        $rootScope.user.education.push({
            date: year_educ,
            school: school,
            degree: degree,
            field: activity
        });
        localStorage.setItem("user", JSON.stringify($rootScope.user));
        // Réinitialisation des variables
        $scope.year_educ = '';
        $scope.school = '';
        $scope.degree = '';
        $scope.activity = '';
    };


    $scope.add_skill = function(skill) {
        $rootScope.user = JSON.parse(localStorage.getItem("user"));
        $rootScope.user.skills.push(skill);

        for($i=0;$i<$rootScope.user.skills.length;$i++){
        console.log("tableau de skills:  "+$rootScope.user.skills[$i]);  };

        localStorage.setItem("user", JSON.stringify($rootScope.user));
        // Réinitialisation des variables
        $scope.skill = '';

    };


    $scope.images = [];
    $rootScope.images = [];


    $scope.removeImage = function(index) {
        $scope.images.splice(index, 1);
    };


    //Add new file to $scope.images
    $scope.addImage = function() {
        //console.log("fonction ajouter image*********************** ");
        $scope.images = [];
        var
            reader = new FileReader(),
            $img = $("#img")[0],
            index = $scope.images.length;
        reader.onload = function(e) {
            if ($scope.images.indexOf(e.target.result) > -1) return;
            $scope.images.push(e.target.result);
            if (!$scope.$$phase) $scope.$apply();
            $("#imagePreview" + index).attr('src', e.target.result);
            $scope.uploadImage(index);
        }
        reader.readAsDataURL($img.files[0]);
        $rootScope.images = $scope.images;
        //localStorage.setItem("koala",JSON.stringify($rootScope.images));
        //localStorage.setItem("taswira",$rootScope.images[0]);
        //console.log($rootScope.images[0]);
    };


    $scope.uploadImage = function(index) {
        var res = $scope.images[index];
        //{...} Your code here, method call etc.
    };


    $scope.verify = function(description, firstname, lastname, dob, address, number, linkedin, github) {
        $rootScope.user = JSON.parse(localStorage.getItem("user"));
        $rootScope.user.firstname = firstname;
        $rootScope.user.lastname = lastname;
        $rootScope.user.dob = dob;
        $rootScope.user.address = address;
        $rootScope.user.number = number;
        $rootScope.user.linkedin = linkedin;
        $rootScope.user.github = github;
        $rootScope.user.description = description;
        localStorage.setItem("user", JSON.stringify($rootScope.user));

        //console.log("utilisateur à envoyer: "+$rootScope.user.email);

        $rootScope.token=localStorage.getItem("token");

        var req = {
       method: 'POST',
       url: '' + server + '/profile',
       headers: {
            'jwt': $rootScope.token
                },
            data: { user: $rootScope.user,
                    picture: $rootScope.images[0] }
        }

        $http(req).
        success(function(data) {
            $scope.greeting = data;
            console.log(data);
            $location.path('/profile');
            setTimeout(scrollTo(0, "myHeader"));

        })
        .error(function(data) {
            $scope.greeting = data;
            console.log(data);
            $location.path('/candidat');

        });


       
    };
});
