'use strict';

var app = angular.module('app', []);

app.controller('TaskCtrl',
    function($http, $scope){

        $scope.init = function() {

            $http({
                method: 'GET',
                url: '/api/get-tasks',
                data: null
            }).success(function(data){
                alert('HELOOOOOO');
                $scope.tasks = data.data;
                console.log(data.data);


            }).error(function(data, status, headers, config){

            });

            $http({
                method: 'GET',
                url: '/api/get-tasks',
                data: null
            })


        }



    });