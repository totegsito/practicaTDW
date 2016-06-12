var app = angular.module('PadelCourts', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});

app.controller('CourtsController', function($scope, $http) {
     $scope.courts = [];
     $scope.loading = false;


    $scope.initCourts = function() {
        $scope.loading = true;
        $http.get('../api/courts').
        success(function(data, status, headers, config) {
            $scope.courts = data.courts;
            $scope.loading = false;
        });
    };

    $scope.addCourt = function() {
        $scope.loading = true;
        $http.post('../api/courts', {
            avaliable: 0
        }
        ).success(function(data, status, headers, config) {
            $scope.courts.push(data);
            $scope.court = {};
            $scope.loading = false;
        });
    };



    $scope.getCourt = function (index) {
        return $scope.courts[index];
    };


    $scope.updateCourt = function(court) {
        $scope.loading = true;

        $http.put('../api/courts/' + court.id, {
            avaliable:  court.avaliable
        }).success(function(data, status, headers, config) {
            court = data;
            $scope.loading = false;

        });
    };

    $scope.deleteCourt = function(index) {
        $scope.loading = true;
        var court = $scope.courts[index];

        console.log(court);
        $http.delete('../api/courts/' + court.id)
            .success(function() {
                $scope.courts.splice(index, 1);
                $scope.loading = false;
            });
    };


    $scope.initCourts();
});

app.controller('UsersController', function($scope, $http) {

    $scope.users = [];
    $scope.loading = false;

    $scope.initUsers = function() {
        $scope.loading = true;
        $http.get('../api/users').
        success(function(data, status, headers, config) {
            $scope.users = data.users;
            $scope.loading = false;
        });
    };

    $scope.countNotEnabled = function () {
        var aux = 0;
        for(user in users){
            if(!users[user].enabled){
                aux++
            }
        }
        return aux;
    };

    $scope.addUser = function() {
        $scope.loading = true;
        $http.post('../api/users', {
            name:       $scope.user.name,
            email:      $scope.user.email,
            password:   $scope.user.password,
            enabled:    $scope.user.enabled,
            firstname:  $scope.user.firstname,
            surname:    $scope.user.surname,
            telephone:  $scope.user.telephone
        }).success(function(data, status, headers, config) {
            $scope.users.push(data);
            $scope.user = '';
            $scope.loading = false;

        });
    };

    $scope.updateUser = function(user) {
        $scope.loading = true;

        console.log(user);
        $http.put('../api/users/' + user.id, {
            name:       user.name,
            email:      user.email,
            enabled:    user.enabled,
            roles:      user.roles,
            password:   user.password,
            firstname:  user.firstname,
            surname:    user.surname,
            telephone:  user.telephone
        }).success(function(data, status, headers, config) {

            user = data;
            $scope.loading = false;

        });
    };

    $scope.deleteUser = function(index) {
        $scope.loading = true;

        var user = $scope.users[index];

        $http.delete('../api/users/' + user.id)
            .success(function() {
                $scope.users.splice(index, 1);
                $scope.loading = false;
            });
    };


    $scope.initUsers();

});