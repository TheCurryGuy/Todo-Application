function loadtodos(){
    //this function will load todos from local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todolist": []};
    console.log(todos);
    return todos;
}

function addTodoLocalStorage(todo){
    const todos = loadtodos()
    todos.todolist.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    
}

function refreshTodo(todos){
    localStorage.setItem("todos", JSON.stringify(todos));
}

function appendTodoInHtml(todo){
    const todolist = document.getElementById("todolist");
    const todoItem = document.createElement("li");
    // li.setAttribute("data-id", );
    todoItem.setAttribute("data-id", todo.id);

    const textdiv = document.createElement("div");
    if(todo.isCompleted ){
        textdiv.classList.add("completed");
    }
    textdiv.textContent = todo.text;

    todoItem.classList.add("todoItem")
    todoItem.appendChild(textdiv);
    //filter k kam hoyga nichee

    const wrapper = document.createElement("div");
    wrapper.classList.add("todobuttons");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", editTodo);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", deleteTodo);

    const completedBtn = document.createElement("button");  
    completedBtn.textContent = (todo.isCompleted)? "Reset" : "Completed";
    completedBtn.classList.add("completedBtn");
    completedBtn.addEventListener("click", completeTodo);

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);
    todoItem.appendChild(wrapper);

    todolist.appendChild(todoItem);
}

function executeFilterAction(event){
    const todolist = document.getElementById("todolist");
    const element = event.target
    const value = element.getAttribute("data-filter");
    todolist.innerHTML = "";
    const todos = loadtodos();
    if(value == "all"){
        todos.todolist.forEach(todo => {
            appendTodoInHtml(todo);
        })
        
    }else if(value == "pending"){
        todos.todolist.forEach(todo => {
            if(todo.isCompleted !== true){
                appendTodoInHtml(todo);
            }
        })

    } else{
        todos.todolist.forEach(todo => {
            if(todo.isCompleted === true){
                appendTodoInHtml(todo);
            }
        })
    }
}

function completeTodo(event){
    const todoitem = event.target.parentElement.parentElement;
    const todoId = todoitem.getAttribute("data-id");
    const todos = loadtodos();
    todos.todolist.forEach(todo => {
        if(todo.id == todoId){
            todo.isCompleted = !todo.isCompleted;
        }
    })
    refreshTodo(todos);
    const todolist = document.getElementById("todolist");
    todolist.innerHTML = "";
    todos.todolist.forEach(todo => {
        appendTodoInHtml(todo);
    })
}

function deleteTodo(event){
    const todoitem = event.target.parentElement.parentElement;
    const todoId = todoitem.getAttribute("data-id");
    let todos = loadtodos();
    todos.todolist = todos.todolist.filter(todo => todo.id != todoId)
    refreshTodo(todos);
    const todolist = document.getElementById("todolist");
    todolist.innerHTML = "";
    todos.todolist.forEach(todo => {
        appendTodoInHtml(todo);
    })
}

function editTodo(event){
    const todoitem = event.target.parentElement.parentElement;
    const todoId = todoitem.getAttribute("data-id");
    let todos = loadtodos();
    const response = prompt("Update your Exisiting Todo here: ");
    todos.todolist.forEach(todo => {
        if(todo.id == todoId){
            todo.text = response;
        }
    })
    refreshTodo(todos);
    const todolist = document.getElementById("todolist");
    todolist.innerHTML = "";
    todos.todolist.forEach(todo => {
        appendTodoInHtml(todo);
    })
}

function addnewTodo(){
    const texttodo = todoinput.value;
    if(texttodo.trim() === ""){
        alert("Please Enter a valid todo")
    } else{
        todos = loadtodos();
        const id = todos.todolist.length
        addTodoLocalStorage({"text": texttodo, "isCompleted": false, id});
        appendTodoInHtml({"text": texttodo, "isCompleted": false, id});
        todoinput.value = "";
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    const todoinput = document.getElementById("todoinput")
    const submitButton = document.getElementById("addtodo")
    let todos = loadtodos();

    const filterBtns = document.getElementsByClassName("filterbtn");
    for(const btn of filterBtns){
        btn.addEventListener("click", executeFilterAction);
    }

    submitButton.addEventListener("click", addnewTodo);

    todoinput.addEventListener("change", (event) =>{
        const texttodo = event.target.value;//or todoinput.value);
        event.target.value = texttodo.trim();
        console.log(event.target.value);

    })

    todos.todolist.forEach(todo => {
        appendTodoInHtml(todo);
    })
    // //completed btn and all
    // const completedBtns = document.getElementsByClassName("completedBtn");
    // for(const btn of completedBtns){
    //     btn.addEventListener("click", completeTodo);
    // }
    document.addEventListener("keypress", (event)=>{
        if(event.key === "Enter"){
            addnewTodo();
        }
    })
})