console.log("ok enlazado")
"use strict";

// Declaro las constantes que voy a necesitar
const dateNumber = document.querySelector ("#dateNumber");
const dateMonth = document.querySelector ("#dateMonth");
const dateYear = document.querySelector ("#dateYear");
const dayOfWeek = document.querySelector ("#dayOfWeek");
const addNewTask = document.querySelector("#newTask");
const addTaskName = document.querySelector("#addTask");
const addDescription = document.querySelector("#taskDescription");

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
    
    const imgDone = document.createElement ('img');
    imgDone.classList.add ('imgdone');
    imgDone.src = 'images/checkgris.jpg';
    imgDone.alt = 'Check gris de tarea realizada';
    imgDone.style.width = '30px'; // Establece el ancho deseado para la imagen
    imgDone.style.height = '30px';
    console.log(imgDone);


    
    
    taskList.appendChild(taskItem);
    taskList.prepend(taskItem);
    taskItem.appendChild(taskInformation);
    taskInformation.appendChild(task);
    taskInformation.appendChild(taskDescription);
    taskItem.appendChild(imgDone);

    addNewTask.value = "";
    addDescription.value = "";
    
    console.log (task);
    

});



//const changeTask = (event) =>{
    //event.target.classList.toggle ('done');
//}




setDate();
console.log (addNewTask);
console.log (addTaskName);
console.log (addDescription);


