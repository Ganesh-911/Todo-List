
let todoInput=document.querySelector(".input");
let addButton=document.querySelector(".button");
let todo;
let localData=JSON.parse(localStorage.getItem("todo"));
let todoList=localData||[];
let showTodos=document.querySelector(".todos-container");
let clearAll=document.getElementById("clear-all");
let clearCompleted=document.getElementById("clear-completed");

const toggleBtn = document.getElementById("theme-toggle");

const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>`; // your sun SVG here
const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`; // your moon SVG here

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggleBtn.innerHTML = isDark ? moonSVG : sunSVG;
});


clearAll.addEventListener("click",()=>{
    todoList=[];
    localStorage.removeItem('todo');
    rendertodoList(todoList);
});
clearCompleted.addEventListener("click",()=>{
    todoList=todoList.filter(todo=>!todo.isCompleted);
    localStorage.setItem("todo",JSON.stringify(todoList));
    rendertodoList(todoList);
});

function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(param){
        let number=Math.random()*16|0;
        let randomNumber=param=='x'?number:(number&0x3|0x8);
        return randomNumber.toString(16);
    });
}


addButton.addEventListener("click",(e)=>{
    e.preventDefault();
    todo=todoInput.value;
    if(todo.length>0){
        todoList.push({id: uuid(),todo,isCompleted: false});
    }
    rendertodoList(todoList);
    localStorage.setItem("todo",JSON.stringify(todoList));
    todoInput.value="";

    

});

showTodos.addEventListener("click",(e)=>{
    // e.preventDefault();
    let key=e.target.dataset.key;
    let delTodokey=e.target.dataset.todokey;
    todoList=todoList.map(todo=>todo.id===key?{...todo,isCompleted : !todo.isCompleted}:todo);
    todoList=todoList.filter(todo=>todo.id!==delTodokey)
    localStorage.setItem("todo",JSON.stringify(todoList));
    rendertodoList(todoList);

});
function updateCounter(){
    const completed=todoList.filter(todo=>todo.isCompleted).length;
    document.getElementById("task-counter").textContent=`Total:${todoList.length} | Completed:${completed}`;
}


function rendertodoList(todoList){
    console.log(todoList);
    showTodos.innerHTML=todoList.map(({id,todo,isCompleted})=>`
        <div class="relative">
            <input class="t-checkbox t-pointer" id="item-${id}" type="checkbox" data-key=${id} ${isCompleted?"checked":""}>
            <label for="item-${id}" class="todo todo-text t-pointer ${isCompleted?"checked-todo":""}" data-key=${id} >${todo}</label>
            <button class="absolute right-0 button cursor ">
                <span data-todokey=${id} class="del-btn material-icons-outlined">delete</span>
            </button>
        </div>
        `).join("");
        updateCounter();
}


rendertodoList(todoList);