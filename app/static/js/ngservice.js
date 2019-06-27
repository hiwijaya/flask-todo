'use strict';

var app = angular.module('app', []);

app.controller('TaskCtrl',
    function ($http, $scope) {

        var taskList = document.getElementById('task-list');
        var boxInput = document.getElementById('box-input');
        var boxEmpty = document.getElementById('box-empty');
        var txtTask = document.getElementById('txt-task');
        var txtDetail = document.getElementById('txt-detail');
        var btnDetail = document.getElementById('btn-detail');
        var btnCancel = document.getElementById('btn-cancel');
        var btnSave = document.getElementById('btn-save');
        var btnAdd = document.getElementById('btn-add');



        $scope.init = function () {
            boxInput.style.display = 'none';
            txtDetail.style.display = 'none';
            
            $http({
                method: 'GET',
                url: '/api/get-tasks',
                data: null
            }).then(function success(response) {

                var data = response.data.data;
                var status = response.data.status;
                $scope.tasks = data;

            }, function fail(response) {
                console.log(response);
            });
        }

        $scope.newTask = function() {
             boxInput.style.display = 'block';
             btnAdd.style.display = 'none';
        }

        btnDetail.onclick = function () {
            txtDetail.style.display = 'block';
        }

        $scope.reset = function() {
            boxInput.style.display = 'none';
            btnAdd.style.display = 'block';

            txtTask.value = '';
            txtDetail.value = '';
        }


        $scope.save = function(index) {
            var title = txtTask.value;
            var detail = txtDetail.value;

            var task = {
                id: index,
                title: title,
                detail: detail
            }

            saveTask(task);
        }

        $scope.isDone = function(index) {
            if(confirm('Are you done with this task?')) {
                var task = $scope.tasks[index];
                task.status = 'DONE';
                saveTask(task);
            }
        }

        

        function saveTask(task){
            
            $http({
                method: 'POST',
                url: '/api/save-task',
                data: task
            }).then(function success(response) {
                console.log(response.data);
                $scope.init();
                $scope.reset();

            }, function fail(response) {
                console.log(response);
            });
        }

    });