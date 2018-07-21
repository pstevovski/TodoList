// Data object for storing tasks into local storage.
 const data = (localStorage.getItem("todoList")) ? JSON.parse(localStorage.getItem("todoList")):{
    todo: [],
    completed: []
 }
// Declaring SVGs for the complete / remove buttons.
const removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

// Render the lists on page load.
renderList();

// Notification test.
const notification = document.querySelector(".notification");
// Item input.
document.getElementById("addItem").addEventListener("click", ()=>{
    const value = document.getElementById("itemInput").value;
    // If input field is NOT empty, run the function.
    if(value){
        //addToList(value);
        add(value);
        document.getElementById("itemInput").value = "";
    }
})
// Add item if user clicks on Enter or NumpadEnter.
document.getElementById("itemInput").addEventListener("keydown", function(e){
    const value = this.value;
    // If the key code matches Enter or NumpadEnter AND there is some value, run the function.
    if((e.code === "Enter" || e.code === "NumpadEnter") && value){
        //addToList(value);
        add(value);
        // Empty input field.
        this.value = "";
        console.log(data);
    }
})
function add(value){
    addToList(value);
    data.todo.push(value);
    dataObjectUpdate();
    
    // Notification for created item.
    notification.innerHTML = "<p>Task added to list.</p>";
    notification.classList.add("notification");
    notification.classList.add("notificationAdded");
    setTimeout(() => {
        notification.classList.remove("notification");
        notification.classList.remove("notificationAdded");
        notification.innerHTML = "";
    }, 1500);
    console.log(data);
}
// Save the data object into local storage.
function dataObjectUpdate(){
    localStorage.setItem("todoList", JSON.stringify(data));
}

function renderList(){
    // If the length of the arrays is 0, return (exit) the function.
    if(!data.todo.length && !data.completed.length) return;

    for(let i = 0; i < data.todo.length;i++){
        const value = data.todo[i];
        addToList(value);
    }
    for(let j = 0; j < data.completed.length; j++){
        const value = data.completed[j];
        addToList(value, completed);
    }
}

function removeItem(){
    const item = this.parentNode.parentNode;
    const parent = item.parentNode;
    const id = parent.id;
    const value = item.innerText;

    if(id === "todo"){
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    
    // Notification test.
    notification.innerHTML = "<p>Task deleted !</p>";
    notification.classList.add("notification");
    notification.classList.add("notificationDeleted");
    setTimeout(() => {
        notification.classList.remove("notification");
        notification.classList.remove("notificationDeleted");
        notification.innerHTML = "";
    }, 1500);

    console.log(data);
    // Remove the item from the list(parent).
    parent.removeChild(item);
    dataObjectUpdate();
}
function completeItem(){
    const item = this.parentNode.parentNode;
    const parent = item.parentNode;
    const id = parent.id;
    const value = item.textContent;
    
    if(id === "todo"){
        data.todo.splice(data.todo.indexOf(value), 1)
        data.completed.push(value);

        // Notification.
        notification.innerHTML = "<p>Task completed.</p>";
        notification.classList.add("notification");
        notification.classList.add("notificationCompleted");
        setTimeout(() => {
            notification.classList.remove("notification");
            notification.classList.remove("notificationCompleted");
            notification.innerHTML = "";
        }, 1500);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdate();
    console.log(data);
    
    const target = (id === "todo") ? document.getElementById("completed"):document.getElementById("todo");
    
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

function addToList(value, completed){
    const list = (completed) ? document.getElementById("completed") : document.getElementById("todo");

    // Create a list item.
    const item = document.createElement("li");
    item.innerText = value;

    // Create buttons.
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    // Remove button.
    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerHTML = removeSVG;
    // When user clicks remove, run the function.
    remove.addEventListener("click", removeItem)

    // Complete button.
    const complete = document.createElement("button");
    complete.classList.add("complete");
    complete.innerHTML = completeSVG;
    // When user click complete button, run the function.
    complete.addEventListener("click", completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    // Insert each new item in the list, infront of the previous one.
    list.insertBefore(item, list.childNodes[0]);

}