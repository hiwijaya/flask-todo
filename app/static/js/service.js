'use strict';

var taskList = document.getElementById('task-list');
var boxInput = document.getElementById('box-input');
var boxEmpty = document.getElementById('box-empty');
var txtTask = document.getElementById('txt-task');
var txtDetail = document.getElementById('txt-detail');
var btnDetail = document.getElementById('btn-detail');
var btnCancel = document.getElementById('btn-cancel');
var btnSave = document.getElementById('btn-save');
var btnAdd = document.getElementById('btn-add');

// INIT
boxInput.style.display = 'none';
txtDetail.style.display = 'none';

var tasks = [{
        task: 'Deep dive more about Python',
        detail: 'Learn more about Flask, Django, and don\'t forget to always follow PEP8 style guide.',
    },
    {
        task: 'Learn new latest backend technologies',
        detail: '',
    },
    {
        task: 'Stay clean',
        detail: 'Keep in mind to always learn best practice, and still commitment that clean code is very important.'
    }
];

function renderList() {

    // reset taskList childs
    while (taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    }

    // use forEach() because scope issue
    // ref: https://www.nickang.com/add-event-listener-for-loop-problem-in-javascript/ 
    tasks.forEach(function (t, i) {

        // render elements programatically
        var taskItem = document.createElement('DIV');
        taskItem.classList.add('task-item');

        var taskTitleBox = document.createElement('DIV');
        taskTitleBox.classList.add('task-title-box');

        var img = document.createElement('IMG');
        img.classList.add('bullet');
        img.src = '/static/img/bullet.png';
        img.onclick = function () {
            taskDone(i);
        };

        var taskTitle = document.createElement('DIV');
        taskTitle.classList.add('task-title');
        taskTitle.innerHTML = t.task;

        taskTitleBox.appendChild(img);
        taskTitleBox.appendChild(taskTitle);
        taskItem.appendChild(taskTitleBox);

        if (t.detail !== '') {
            var taskDetail = document.createElement('DIV');
            taskDetail.classList.add('task-detail');
            taskDetail.innerHTML = t.detail;
            taskItem.appendChild(taskDetail);
        }

        taskList.appendChild(taskItem);
    });

    if (tasks.length === 0) {
        boxEmpty.style.display = 'block'; // show
    } else {
        boxEmpty.style.display = 'none'; // hide
    }

}
renderList();

function taskDone(i) {
    tasks.splice(i, 1);
    renderList();
}

function resetInput() {
    boxInput.style.display = 'none';
    btnAdd.style.display = 'block';

    txtTask.value = '';
    txtDetail.value = '';
}


btnDetail.onclick = function () {
    txtDetail.style.display = 'block';
}

btnCancel.onclick = resetInput;

btnSave.onclick = function () {

    if (txtTask.value === '') {
        alert('Please describe your task');
        return;
    }

    // add new task
    var newTask = {
        task: txtTask.value,
        detail: txtDetail.value
    }
    tasks.push(newTask);

    renderList();
    resetInput();
}

btnAdd.onclick = function () {
    boxInput.style.display = 'block';
    btnAdd.style.display = 'none';
};