console.log("ok enlazado")
"use strict";
    
    
    const dateNumber = document.querySelector("#dateNumber");
    const dateMonth = document.querySelector("#dateMonth");
    const dateYear = document.querySelector("#dateYear");
    const dayOfWeek = document.querySelector("#dayOfWeek");
    const addNewTask = document.querySelector("#newTask");
    const addTaskName = document.querySelector("#addTask");
    const addDescription = document.querySelector("#addDescription");

    const taskContainer = document.querySelector("#task-container");
    const taskList = document.querySelector("#taskList");

    // Crear el array que almacenará las tareas
    let tasksArray = [];

    // Obtener los datos del Local Storage al cargar la página
    window.addEventListener("load", () => {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        tasksArray = JSON.parse(storedTasks);
        tasksArray.forEach((taskData) => {
          createTaskElement(taskData);
        });
      }
    });

    // Mostrar la fecha
    const setDate = () => {
      const date = new Date();
      dateNumber.textContent = date.getDate();
      dateMonth.textContent = date.toLocaleString("es", { month: "short" });
      dateYear.textContent = date.getFullYear();
      dayOfWeek.textContent = date.toLocaleString("es", { weekday: "long" });
    };

    // Crear la tarea en el DOM
    const createTaskElement = (taskData) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("taskItem");
      if (taskData.done) {
        taskItem.classList.add('done');
      };
      taskItem.dataset.taskId = taskData.id; 

      const taskInformation = document.createElement("div");
      taskInformation.classList.add("taskInformation");

      const task = document.createElement("div");
      task.classList.add("task");
      task.textContent = taskData.value;

      

      const taskDescription = document.createElement("div");
      taskDescription.classList.add("taskDescription");
      taskDescription.textContent = taskData.description;

      const imgCheck = document.createElement("img");
      imgCheck.classList.add("imgCheck");
      imgCheck.src = "images/checkgris.jpg";
      imgCheck.alt = "Check gris de tarea realizada";
      imgCheck.style.width = "30px"; // Establece el ancho deseado para la imagen
      imgCheck.style.height = "30px";
      imgCheck.addEventListener ('click', changeTask);
      //imgCheck.addEventListener("click", () => changeTask(taskData));

      const imgTrash = document.createElement("img");
      imgTrash.classList.add("imgTrash");
      imgTrash.src = "images/papelera.jpg";
      imgTrash.alt = "Papelera";
      imgTrash.style.width = "30px"; // Establece el ancho deseado para la imagen
      imgTrash.style.height = "30px";
      imgTrash.addEventListener ('click', deleteTask);
      //imgTrash.addEventListener("click", () => deleteTask(taskData));

      const imgEdit = document.createElement("img");
      imgEdit.classList.add("imgEdit");
      imgEdit.src = "images/editar.jpg";
      imgEdit.alt = "Editar";
      imgEdit.style.width = "30px"; // Establece el ancho deseado para la imagen
      imgEdit.style.height = "30px";
      imgEdit.addEventListener ('click', () => startEditingTask(taskData.id));

      taskList.appendChild(taskItem);
      taskList.prepend(taskItem);
      taskItem.appendChild(taskInformation);
      taskInformation.appendChild(task);
      taskInformation.appendChild(taskDescription);
      taskItem.appendChild(imgCheck);
      taskItem.appendChild(imgTrash);
      taskItem.appendChild(imgEdit);

      addNewTask.value = "";
      addDescription.value = "";
    };

    // Añadir nueva tarea desde un campo de texto
    addTaskName.addEventListener("click", function (event) {
      const value = addNewTask.value;
      const descriptionvalue = addDescription.value;

      if (!value) return; // Si no se escribe ningún valor no sigue con la función

      // Agregar la tarea al array
      const taskData = {
        id: tasksArray.length,
        value: value,
        description: descriptionvalue,
        done: false,
      };
      //Añade la tarea al final del array
      tasksArray.push(taskData);

      // Guardar el array en el Local Storage
      localStorage.setItem("tasks", JSON.stringify(tasksArray));

      // Crear la tarea en el DOM
      createTaskElement(taskData);
    });


    //Editar la tarea
    const startEditingTask = (taskId) => {
      // Encuentra la tarea por su ID en el array
      const taskIndex = tasksArray.findIndex(task => task.id === taskId);
    
      if (taskIndex !== -1) {
        const taskToEdit = tasksArray[taskIndex];
    
        // Crea un campo de entrada de texto para el nombre
        const newNameInput = document.createElement("input");
        newNameInput.type = ("text");
        newNameInput.classList.add("newNameInput");
        newNameInput.value = taskToEdit.value;
    
        // Crea un campo de entrada de texto para la descripción
        const newDescriptionInput = document.createElement("input");
        newDescriptionInput.type = ("text");
        newDescriptionInput.classList.add("newDescriptionInput");
        newDescriptionInput.value = taskToEdit.description;
    
        // Reemplaza el contenido de la tarea con los campos de entrada
        const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskItem) {
          const task = taskItem.querySelector(".task");
          const taskDescription = taskItem.querySelector(".taskDescription");
          if (task && taskDescription) {
            task.innerHTML = '';
            taskDescription.innerHTML = '';
            task.appendChild(newNameInput);
            taskDescription.appendChild(newDescriptionInput);
          }
        }
    
        // Agrega un botón para guardar los cambios
        const saveButton = document.createElement("button");
        saveButton.type =("submit");
        saveButton.classList.add("saveButton");
        saveButton.textContent = "Guardar";
        saveButton.addEventListener("click", () => saveEditedTask(taskId, newNameInput.value, newDescriptionInput.value));
        
        // Agrega el botón de guardar a la tarea
        taskItem.appendChild(saveButton);
      }
    };

    const saveEditedTask = (taskId, newName, newDescription) => {
      // Encuentra la tarea por su ID en el array
      const taskIndex = tasksArray.findIndex(task => task.id === taskId);
    
      if (taskIndex !== -1) {
        // Actualiza el valor y la descripción de la tarea en el array
        tasksArray[taskIndex].value = newName;
        tasksArray[taskIndex].description = newDescription;
    
        // Actualiza el array de tareas en el Local Storage
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    
        // Actualiza la representación visual de la tarea
        const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskItem) {
          const task = taskItem.querySelector(".task");
          const taskDescription = taskItem.querySelector(".taskDescription");
          if (task && taskDescription) {
            task.innerHTML = newName;
            taskDescription.innerHTML = newDescription;
          }
          const saveButton = taskItem.querySelector("button");
            if (saveButton) {
            saveButton.remove();
            }
        }
      }
    };

    // Marcar la tarea como completada
    const changeTask = (event) => {

        const imgCheck = event.currentTarget;
        const taskItem = imgCheck.closest('.taskItem');
        const taskId = taskItem.dataset.taskId; 

        //const index = Array.from(taskList.children).indexOf(taskItem);
        const index = tasksArray.findIndex(task => task.id === parseInt(taskId));

        if (index !== -1) {
            tasksArray[index].done = !tasksArray[index].done;
            taskItem.classList.toggle('done');

             // Actualizar el array de tareas en el Local Storage
            localStorage.setItem("tasks", JSON.stringify(tasksArray));
        }
    };

    // Eliminar la tarea
    const deleteTask = (event) => {

        const imgTrash = event.currentTarget;
        const taskItem = imgTrash.closest('.taskItem');
        const taskId = taskItem.dataset.taskId; 
        //const index = Array.from(taskList.children).indexOf(taskItem);
        const index = tasksArray.findIndex(task => task.id === parseInt(taskId));


        if (index !== -1) {
        tasksArray.splice(index,1);
        taskItem.remove();


        // Actualizar el array de tareas en el Local Storage
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
        }
    };

    setDate();