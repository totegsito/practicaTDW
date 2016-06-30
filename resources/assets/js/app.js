window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');



/*

var app = angular.module('PadelCourts', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});

app.controller('CourtsController', function($scope, $http) {
    $scope.shownCourts = [];
    $scope.avaliableCourts = [];
    $scope.loading = false;


    $scope.initCourts = function() {
        $scope.loading = true;
        $http.get('../api/avaliableCourts').
        success(function(data, status, headers, config) {
            $scope.avaliableCourts = data.avaliableCourts;
            $scope.shownCourts = $scope.avaliableCourts.slice(0,5);
            $scope.loading = false;
        });
    };

    $scope.addCourt = function() {
        $scope.loading = true;
        $http.post('../api/avaliableCourts', {
                avaliable: 0
            }
        ).success(function(data, status, headers, config) {
            $scope.avaliableCourts.push(data);
            $scope.court = {};
            console.log($scope.avaliableCourts);
            $scope.loading = false;
        });
    };



    $scope.getCourt = function (index) {
        return $scope.avaliableCourts[index];
    };


    $scope.updateCourt = function(court) {
        $scope.loading = true;

        $http.put('../api/avaliableCourts/' + court.id, {
            avaliable:  court.avaliable
        }).success(function(data, status, headers, config) {
            court = data;
            $scope.loading = false;

        });
    };

    $scope.deleteCourt = function(index) {
        $scope.loading = true;
        var court = $scope.avaliableCourts[index];

        console.log(court);
        $http.delete('../api/avaliableCourts/' + court.id)
            .success(function() {
                $scope.avaliableCourts.splice(index, 1);
                $scope.loading = false;
            });

        $scope.$apply();
    };


    $scope.initCourts();
});

app.controller('UsersController', function($scope, $http) {

    $scope.users = [];
    $scope.concreteUser = {};
    $scope.shownUsers = [];
    $scope.loading = false;
    $scope.error = {};
    $scope.success = false;

    $scope.initUsers = function() {
        $scope.loading = true;
        $http.get('../api/users').
        success(function(data, status, headers, config) {
            $scope.users = data.users;
            $scope.shownUsers = $scope.users.slice(0,5);
            console.log($scope.shownUsers);
            $scope.loading = false;
        });
    };

    $scope.getConcreteCourt = function (id) {
        $scope.loading = true;
        $http.get('../api/users/'+id).
        success(function(data, status, headers, config) {
            $scope.concreteUser = data.user;
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
            $scope.success = true;
            $scope.$apply();
            $scope.loading = false;
        }).error(function (data, status, headers, config) {
            $scope.error= data;
            $scope.success = false;
            $scope.loading = false;
        });
    };

    $scope.updateUser = function(user) {
        $scope.loading = true;
        
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
            $scope.error = {};
            $scope.success = true;
            $scope.loading = false;
        }).error(function (data, status, headers, config) {
            $scope.error= data;
            $scope.success = false;
            $scope.loading = false;
        });
    };

    $scope.deleteUser = function(index) {
        $scope.loading = true;

        var user = $scope.users[index];

        $http.delete('../api/users/' + user.id)
            .success(function() {
                $scope.users.splice(index, 1);
                $scope.success = true;
                $scope.loading = false;
            })
            .error(function (data, status, headers, config) {
            $scope.error= data;
            $scope.success = false;
            $scope.loading = false;
        });
    };


    $scope.initUsers();

});*/
