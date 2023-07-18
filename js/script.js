console.log("ok enlazado")
"use strict";

// Declaro las constantes que voy a necesitar
const dateNumber = document.querySelector ("#dateNumber");
const dateMonth = document.querySelector ("#dateMonth");
const dateYear = document.querySelector ("#dateYear");
const dayOfWeek = document.querySelector ("#dayOfWeek");
const addNewTask = document.querySelector("#newTask");
const addTaskName = document.querySelector("#addTask");


// mostrar la fecha
const setDate = () =>{
    const date = new Date ();
    dateNumber.textContent = date.getDate();
    dateMonth.textContent = date.getMonth() + 1;
    dateYear.textContent = date.getFullYear();
    dayOfWeek.textContent = date.toLocaleString ('es', { weekday: 'long' });

}

//Añadir nueva tarea desde un campo de texto
addNewTask.addEventListener('input', function(event){
    event.preventDefault();
    
});

addTaskName.addEventListener('click', function(event){
    const value = addNewTask.value;
    if (!value) return;
    const task = document.createElement('div');
    task.classList.add ('task'); 
    task.id = 'task';
    const taskContainer = document.querySelector('#task-container');
    taskContainer.appendChild(task);
    addNewTask.value = "";
    console.log (task);
    task.addEventListener ('click', changeTask());
    task.textContent = value;
    taskContainer.prepend(task);
    
    
});


const changeTask = (event) =>{
    event.target.classList.toggle ('done');
}




setDate();
console.log(addNewTask);
console.log (addTaskName);


