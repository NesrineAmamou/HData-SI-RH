FinaxysApp.controller('CandidatCtrl', function($scope, $http, $location, $rootScope) {

    // $scope.affiche = function() {


    //     $scope.mapDOM = function(element, json) {
    //         var treeObject = {};

    //         // If string convert to document Node
    //         if (typeof element === "string") {
    //             if (window.DOMParser) {
    //                 parser = new DOMParser();
    //                 docNode = parser.parseFromString(element, "text/xml");
    //             } else { // Microsoft strikes again
    //                 docNode = new ActiveXObject("Microsoft.XMLDOM");
    //                 docNode.async = false;
    //                 docNode.loadXML(element);
    //             }
    //             element = docNode.firstChild;
    //         }

    //         //Recursively loop through DOM elements and assign properties to object
    //         function treeHTML(element, object) {
    //             object["type"] = element.nodeName;
    //             var nodeList = element.childNodes;
    //             if (nodeList != null) {
    //                 if (nodeList.length) {
    //                     object["content"] = [];
    //                     for (var i = 0; i < nodeList.length; i++) {
    //                         if (nodeList[i].nodeType == 3) {
    //                             object["content"].push(nodeList[i].nodeValue);
    //                         } else {
    //                             object["content"].push({});
    //                             treeHTML(nodeList[i], object["content"][object["content"].length - 1]);
    //                         }
    //                     }
    //                 }
    //             }
    //             if (element.attributes != null) {
    //                 if (element.attributes.length) {
    //                     object["attributes"] = {};
    //                     for (var i = 0; i < element.attributes.length; i++) {
    //                         object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
    //                     }
    //                 }
    //             }
    //         }
    //         treeHTML(element, treeObject);

    //         return (json) ? JSON.stringify(treeObject) : treeObject;
    //     }



    //     $scope.docs = document.getElementById('container');
    //     console.log("tttt" + $scope.docs.innerHTML + "   hhh");

    //     $scope.json = $scope.mapDOM($scope.docs, true);
    //     console.log($scope.json);

    //     $scope.cv = $scope.docs.innerHTML;

    // }


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

        for ($i = 0; $i < $rootScope.user.skills.length; $i++) {
            console.log("tableau de skills:  " + $rootScope.user.skills[$i]);
        };

        localStorage.setItem("user", JSON.stringify($rootScope.user));
        // Réinitialisation des variables
        $scope.skill = '';

    };



    $scope.images = [];

    $rootScope.images = [];


    $scope.removeImage = function(index) {
        $scope.images.splice(index, 1);
    };


    $scope.addImage = function() {
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

        $rootScope.token = localStorage.getItem("token");

        $scope.docs = document.getElementById('containerr');

        //console.log("containerrrrrr  " + $scope.docs.childNodes.length);

        if ($scope.docs.childNodes.length > 1) {

            $scope.cv = [];
            $scope.elements = $scope.docs.childNodes;

            var $j = 1;
            for (var $i = 0; $i < $scope.elements.length; $i++) {

                if ($scope.elements[$i].textContent.length != 0) {

                    if ($scope.elements[$i].textContent == "FORMATION") {
                        var $k = $i;
                        $scope.cv["el" + $j] = "";
                        while ($scope.elements[$k].textContent != "COMPÉTENCES") {
                            $scope.cv["el" + $j] = $scope.cv["el" + $j] + $scope.elements[$k].textContent;
                            $k++;
                        };

                        $i = $k - 1;
                        // console.log("cv elements "+$j+" "+$scope.cv["el"+$j]);
                        $j++;

                    } else if ($scope.elements[$i].textContent == "COMPÉTENCES") {
                        var $k = $i;
                        $scope.cv["el" + $j] = "";
                        while ($scope.elements[$k].textContent != "LANGUES") {
                            $scope.cv["el" + $j] = $scope.cv["el" + $j] + $scope.elements[$k].textContent;
                            $k++;
                        };

                        $i = $k - 1;
                        // console.log("cv elements "+$j+" "+$scope.cv["el"+$j]);
                        $j++;

                    } else if ($scope.elements[$i].textContent == "LANGUES") {
                        var $k = $i;
                        $scope.cv["el" + $j] = "";
                        while ($scope.elements[$k].textContent != "EXPÉRIENCES") {
                            $scope.cv["el" + $j] = $scope.cv["el" + $j] + $scope.elements[$k].textContent;
                            $k++;
                        };

                        $i = $k - 1;
                        // console.log("cv elements "+$j+" "+$scope.cv["el"+$j]);
                        $j++;

                    } else if ($scope.elements[$i].textContent == "EXPÉRIENCES") {
                        var $k = $i;
                        $scope.cv["el" + $j] = "";
                        while ($k < $scope.elements.length) {
                            $scope.cv["el" + $j] = $scope.cv["el" + $j] + $scope.elements[$k].textContent;
                            $k++;
                        };

                        $i = $k - 1;
                        //console.log("cv elements "+$j+" "+$scope.cv["el"+$j]);
                        $j++;

                    } else {
                        $scope.cv["el" + $j] = $scope.elements[$i].textContent;
                        // console.log("cv elements "+$j+" "+$scope.cv["el"+$j]);
                        $j++;
                    }
                }


            }

            $rootScope.resume = {
                "company": $scope.cv["el1"],
                "name": $scope.cv["el2"],
                "statut": $scope.cv["el3"],
                "formation": $scope.cv["el4"],
                "skills": $scope.cv["el5"],
                "langues": $scope.cv["el6"],
                "experiences": $scope.cv["el7"],

            };
            console.log("resume:  " + $rootScope.resume.company + " " + $rootScope.resume.langues);
            localStorage.setItem("resume", JSON.stringify($rootScope.resume));


        } else {
            $rootScope.resume = {
                "company": "",
                "name": "",
                "statut": "",
                "formation": "",
                "skills": "",
                "langues": "",
                "experiences": "",

            };


        }


        var req = {
            method: 'POST',
            url: '' + server + '/profile',
            headers: {
                'jwt': $rootScope.token
            },
            data: {
                user: $rootScope.user,
                resume: $rootScope.resume,
                picture: $rootScope.images[0]
            }
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
                $location.path('/info');

            });



    };
});