//Initializing necessary variables / Getting necessary elements
var tasksButton = document.getElementById("tasks-button");
var completedTasksButton = document.getElementById("completed-tasks-button");
var incompleteTasksButton = document.getElementById("incomplete-tasks-button");

var newTask = document.getElementById("new-task");

var tasksPageList = document.getElementById("tasks-page-list");
var completedTasksPageList = document.getElementById("completed-tasks-page-list");
var incompleteTasksPageList = document.getElementById("incomplete-tasks-page-list");

var tabno = 1;
var idnum = 1;

//For creating a new task 
function addTask() {
    if(newTask.value !== '') {
        //If value is not empty create the container and add value to it
        var divElement = document.createElement("div");
        divElement.id = "tasks-page";
        divElement.className += "each-task-container";
        var inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.name = "completed";
        inputElement.id = "completed";
        inputElement.onclick = function() {
            checkBoxSelected(this);
        }
        divElement.appendChild(inputElement);
        var pElement = document.createElement("p");
        pElement.className += "task-name";
        divElement.appendChild(pElement);
        var iElement = document.createElement("i");
        iElement.className += "fas fa-times into-icon";
        iElement.onclick = function() {
            moveToIncomplete(this);
        }
        divElement.appendChild(iElement);
        var node = document.createElement("LI");
        node.id = idnum;
        idnum++;
        pElement.innerText = newTask.value;
        node.appendChild(divElement);
        tasksPageList.appendChild(node);
        newTask.value = '';
    }
}

//Changing between tabs
function changeTabTask() {
    if(tabno != 1) {
        completedTasksPageList.style.display = "none";
        incompleteTasksPageList.style.display = "none";
        completedTasksButton.style.backgroundColor = "#10215e";
        incompleteTasksButton.style.backgroundColor = "#10215e";
        tasksButton.style.backgroundColor = "#ff8c1a";
        tasksPageList.style.display = "block";
        tabno = 1;
    }
}

//Changing between tabs
function changeTabComplete() {
    if(tabno !== 2) {
        tasksPageList.style.display = "none";
        incompleteTasksPageList.style.display = "none";
        tasksButton.style.backgroundColor = "#10215e";
        incompleteTasksButton.style.backgroundColor = "#10215e";
        completedTasksButton.style.backgroundColor = "#ff8c1a";
        completedTasksPageList.style.display = "block";
        tabno = 2;
    }
}

//Changing between tabs
function changeTabIncomplete() {
    if(tabno !== 3) {
        tasksPageList.style.display = "none";
        completedTasksPageList.style.display = "none";
        tasksButton.style.backgroundColor = "#10215e";
        completedTasksButton.style.backgroundColor = "#10215e";
        incompleteTasksButton.style.backgroundColor = "#ff8c1a";
        incompleteTasksPageList.style.display = "block";
        tabno = 3;
    }
}

//Clear all tasks
function clearTasks() {
    if(confirm("This will clear all the tasks from all lists")){
            tasksPageList.innerHTML = "";
            completedTasksPageList.innerHTML = "";
            incompleteTasksPageList.innerHTML = "";
            idnum = 1;
    }
}

//Copying task to completed if checkbox is selected and also change the appearance of task in all tasks list
//Else remove task from completed
function checkBoxSelected(el) {
    var parent = el.parentElement;
    if(el.checked) {
        var divElement = document.createElement("div");
        divElement.id = "completed-tasks-page";
        divElement.className += "each-task-container";
        divElement.style.background = "linear-gradient(to right, #06beb6, #48b1bf)";
        var pElement = document.createElement("p");
        pElement.className += "task-name";
        var iElement = document.createElement("i");
        iElement.className += "fas fa-trash-alt delete-icon";
        iElement.onclick = function() {
            deleteTask(this);
        }
        divElement.appendChild(pElement);
        divElement.appendChild(iElement);
        var node = document.createElement("LI");
        node.appendChild(divElement);
        var child = parent.childNodes[1];
        pElement.innerText = child.innerText;
        parent.style.background = "linear-gradient(to right, #06beb6, #48b1bf)";
        node.id = parent.parentElement.id + "comp";
        completedTasksPageList.appendChild(node);
    } else {
        parent.style.background = "linear-gradient(to right, #c02425, #f0cb35)";
        var chkElement = document.getElementById(parent.parentElement.id + "comp");
        if(chkElement !== undefined){
            chkElement.remove();
        }
    }
}

//Moving task to incomplete list if removed
function moveToIncomplete(el) {
    var divElement = document.createElement("div");
    divElement.id = "incomplete-tasks-page";
    divElement.className += "each-task-container";
    var pElement = document.createElement("p");
    pElement.className += "task-name";
    var addElement = document.createElement("i");
    addElement.className += "fas fa-plus-circle add-icon";
    addElement.onclick = function() {
        moveToTasks(this);
    }
    var iElement = document.createElement("i");
    iElement.className += "fas fa-trash-alt delete-icon";
    iElement.onclick = function() {
        deleteTask(this);
    }
    divElement.appendChild(pElement);
    divElement.appendChild(addElement);
    divElement.appendChild(iElement);
    var node = document.createElement("LI");
    node.appendChild(divElement);
    var parent = el.parentElement;
    var child = parent.childNodes[1];
    pElement.innerText = child.innerText;
    parent = parent.parentElement;
    var chkElement = document.getElementById(parent.id + "comp");
    if(chkElement !== null){
        chkElement.remove();
    }
    node.id = parent.id;
    parent.remove();
    incompleteTasksPageList.appendChild(node);
}

//Deleting task
function deleteTask(el) {
    var parent = el.parentElement.parentElement;
    if(tabno === 2) {
        var taskId = parent.id.slice(0, parent.id.length - 4);
        document.getElementById(taskId).remove();
    }
    parent.remove();
}

//Moving task back to the list if add button is clicked inside incomplete list
function moveToTasks(el) {
    var divElement = document.createElement("div");
    divElement.id = "tasks-page";
    divElement.className += "each-task-container";
    var inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.name = "completed";
    inputElement.id = "completed";
    inputElement.onclick = function() {
        checkBoxSelected(this);
    }
    divElement.appendChild(inputElement);
    var pElement = document.createElement("p");
    pElement.className += "task-name";
    divElement.appendChild(pElement);
    var iElement = document.createElement("i");
    iElement.className += "fas fa-times into-icon";
    iElement.onclick = function() {
        moveToIncomplete(this);
    }
    divElement.appendChild(iElement);
    var node = document.createElement("LI");
    var parent = el.parentElement;
    pElement.innerText = parent.childNodes[0].innerText;
    node.id = parent.parentElement.id;
    parent.parentElement.remove();
    node.appendChild(divElement);
    tasksPageList.appendChild(node);
}