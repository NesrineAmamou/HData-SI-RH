FinaxysApp.controller('ProfileCtrl', function($scope, $http, $location, $rootScope) {


    $rootScope.token=localStorage.getItem("token");

    var req = {
       method: 'GET',
       url: '' + server + '/secure',
       headers: {
         'jwt': $rootScope.token
        }
    }

   //  $http(req).success(function(data) {

   //     $http.get("" + server + '/user').
   //     success(function(data) {

   //          //localStorage.setItem("picture","css/user.png");
   //          //$rootScope.user = JSON.parse(localStorage.getItem("user"));
   //          $rootScope.user = data;
   //          $rootScope.pic = localStorage.getItem("picture");
   //          //$rootScope.ds=JSON.parse(localStorage.getItem("koala"));
   //          console.log($rootScope.images[0]);
   //          if ($rootScope.images != null) {
   //              $rootScope.pic = $rootScope.images[0];
   //              localStorage.setItem("picture", $rootScope.pic);
   //              localStorage.setItem("user", JSON.stringify($rootScope.user));
   //          };
           
   //          $scope.edit = function() {
   //              $location.path('/candidat');
   //          };
            
   //      });


   // })
   //  .error(function(data) {
   //       $location.path('/auth');
   //  });


});

