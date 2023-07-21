console.log("ok enlazado")
"use strict";

// Declaro las constantes que voy a necesitar
const dateNumber = document.querySelector ("#dateNumber");
const dateMonth = document.querySelector ("#dateMonth");
const dateYear = document.querySelector ("#dateYear");
const dayOfWeek = document.querySelector ("#dayOfWeek");
const addNewTask = document.querySelector("#newTask");
const addTaskName = document.querySelector("#addTask");
const addDescription = document.querySelector("#addDescription");

const taskContainer = document.querySelector('#task-container');
const taskList = document.querySelector('#taskList');




// mostrar la fecha
const setDate = () =>{
    const date = new Date ();
    dateNumber.textContent = date.getDate();
    dateMonth.textContent = date.toLocaleString ('es', {month: 'short'});
    dateYear.textContent = date.getFullYear();
    dayOfWeek.textContent = date.toLocaleString ('es', { weekday: 'long' });

}

//Añadir nueva tarea desde un campo de texto
addNewTask.addEventListener('input', function(event){
    event.preventDefault();
    
});

//Añade la descripción
addDescription.addEventListener('textarea', function(event){
    event.preventDefault();
});



addTaskName.addEventListener('click', function(event){

    const value = addNewTask.value;
    const descriptionvalue = addDescription.value;

    if (!value) return;//Si no se escribe ningun valor no sigue con la función

    const taskItem = document.createElement ('li');
    taskItem.classList.add ('taskItem');
  

    const taskInformation = document.createElement ('div');
    taskInformation.classList.add ('taskInformation');
    

    const task = document.createElement('div');
    task.classList.add ('task');
    task.textContent = value;
    
    
    const taskDescription = document.createElement('div');
    taskDescription.classList.add ('taskDescription');
    taskDescription.textContent = descriptionvalue;
    
    const imgCheck = document.createElement ('img');
    imgCheck.classList.add ('imgCheck');
    imgCheck.src = 'images/checkgris.jpg';
    imgCheck.alt = 'Check gris de tarea realizada';
    imgCheck.style.width = '30px'; // Establece el ancho deseado para la imagen
    imgCheck.style.height = '30px';
    imgCheck.addEventListener ('click', changeTask);

    const imgTrash = document.createElement ('img');
    imgTrash.classList.add ('imgTrash');
    imgTrash.src = 'images/papelera.jpg';
    imgTrash.alt = 'Papelera';
    imgTrash.style.width = '30px'; // Establece el ancho deseado para la imagen
    imgTrash.style.height = '30px';
    imgTrash.addEventListener ('click', deleteTask);
    

    taskList.appendChild(taskItem);
    taskList.prepend(taskItem);
    taskItem.appendChild(taskInformation);
    taskInformation.appendChild(task);
    taskInformation.appendChild(taskDescription);
    taskItem.appendChild(imgCheck);
    taskItem.appendChild(imgTrash);

    addNewTask.value = "";
    addDescription.value = "";
    
    console.log (task);  

});

const changeTask = (event) => {
    const imgCheck = event.currentTarget;
    const taskItem = imgCheck.closest('.taskItem');
    taskItem.classList.toggle('done');
};
const deleteTask = (event) => {
    const imgTrash = event.currentTarget;
    const taskItem = imgTrash.closest('.taskItem');
    taskItem.remove();
};



setDate();



