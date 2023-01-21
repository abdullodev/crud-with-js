// const inside_action = document.querySelector(".inside_action");
const todo_back_bg = document.querySelector(".todo_back_bg");
const add_todo_btn = document.getElementById("add_todo_btn");
const modal_form = document.querySelector(".modal_form");
const modal_back = document.querySelector(".modal_back");
const modal_close_icon = document.querySelector(".modal_form header ion-icon");
const form = document.querySelector(".form");
const todo_list = document.querySelector(".todo_list");
const modal_title = document.querySelector(".modal_form header h3");
const add_todo = document.querySelector("#add_todo");
const search_input = document.querySelector("#search_input");
const container = document.querySelector(".container");

add_todo_btn.addEventListener("click", () => {
  form.name.focus();
  modal_title.innerHTML = "Add a New Todo";
  add_todo.innerHTML = "Add Todo";
  modal_form.classList.toggle("active");
  modal_back.classList.toggle("active");
});

modal_close_icon.addEventListener("click", () => {
  form.name.value = "";
  form.email.value = "";
  form.phone.value = "";
  modal_form.classList.remove("active");
  modal_back.classList.remove("active");
});

let todos = JSON.parse(localStorage.getItem("todos") || "[]");
let isUpdate = false;
let updateId;

//  search todos start

let searched = todos;
search_input.addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    searched = todos;
  } else {
    searched = todos.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
  }

  showTodos();
});

//  search todos end

// show todos start

function showTodos() {
  let tLeng = searched.length;
  let tr = "";

  if (tLeng === 0) {
    tr = `<tr>
    <td colspan="6" style="font-size: 1.2rem; color: #b43211">There is not any Todo☹!</td>
    </tr>`;
  } else {
    // console.log(searched);
    searched.forEach((item, i) => {
      tr += `<tr>
                    <td>${i + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.date}</td>
                    <td>
                    <ul class="action">
                        <li>
                        <ion-icon
                            name="create-outline"
                            class="edit_icon"
                            onclick="editTodos(${i} , '${item.name}','${
        item.email
      }','${item.phone}')"
                        ></ion-icon>
                        </li>
                        <li>
                        <ion-icon
                            name="trash-outline"
                            class="delete_icon"
                            onclick="showDelete(this)"
                        ></ion-icon>
                        <ul class="inside_action">
                            <li>
                            <div class="ogohlantirish">
                                <h4>Are you sure to delete <span  style="color: #eb6b73">${
                                  item.name
                                }</span> ?</h4>
                                <div>
                                <button id="ok_delete" onclick='deleteTodo(${i})'>Delete</button>
                                <button id="cancel_delete" onclick='cancelDelBox()'>Cancel</button>
                                </div>
                            </div>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </td>
            </tr> `;
    });
  }

  todo_list.innerHTML = tr;
}

showTodos();

// show todos end

//delete box show and hide mmethods start

let del;

function showDelete(e) {
  del = e.parentElement.children[1];
  del.classList.toggle("active");
  todo_back_bg.classList.toggle("active");
}
todo_back_bg.addEventListener("click", () => {
  del.classList.remove("active");
  todo_back_bg.classList.remove("active");
});

function cancelDelBox() {
  del.classList.remove("active");
  todo_back_bg.classList.remove("active");
}

//delete box show and hide mmethods end

//delete todos

function deleteTodo(index) {
  searched.splice(index, 1);

  todos = searched;
  localStorage.setItem("todos", JSON.stringify(todos));
  todo_back_bg.classList.remove("active");
  showTodos();
}

//edit todos

function editTodos(index, name, email, phone) {
  isUpdate = true;
  updateId = index;
  add_todo_btn.click();
  modal_title.innerHTML = "Update Todo";
  add_todo.innerHTML = "Update Todo";

  form.name.value = name;
  form.email.value = email;
  form.phone.value = phone;
}

//add a new todo modal start

function warning() {
  let div = document.createElement("div");
  div.classList.add("showWarning");
  div.innerHTML = "Sorry this name is already taken!😐";

  container.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 2500);
}
function addTodos(e) {
  e.preventDefault();

  let sameUser = searched.find(
    (item) =>
      item.name.toLowerCase().trim() === e.target[0].value.toLowerCase().trim()
  );

  if (
    e.target[0].value == "" ||
    e.target[1].value == "" ||
    e.target[2].value == ""
  ) {
    let div = document.createElement("div");
    div.classList.add("warning");
    div.innerHTML = "Please fill all fields!😦";
    document.body.appendChild(div);
    setTimeout(() => {
      div.remove();
    }, 2500);
  } else if (sameUser && !isUpdate) {
    warning();
  } else {
    let dateNow = new Date();
    let min =
      dateNow.getMinutes().toString().length == 1
        ? dateNow.getMinutes().toString().padStart(2, 0)
        : dateNow.getMinutes();
    let hour =
      dateNow.getHours().toString().length == 1
        ? dateNow.getHours().toString().padStart(2, 0)
        : dateNow.getHours();
    let day =
      dateNow.getDate().toString().length == 1
        ? dateNow.getDate().toString().padStart(2, 0)
        : dateNow.getDate();
    let month =
      dateNow.getMonth().toString().length == 1
        ? dateNow.getMonth().toString().padStart(2, 0)
        : dateNow.getMonth();
    let year = dateNow.getFullYear();

    const todo = {
      name: e.target[0].value,
      email: e.target[1].value,
      phone: e.target[2].value,
      date: `${day}.${month}.${year} ${hour}:${min}`,
    };

    if (!isUpdate) {
      // todos.push(todo);
      searched.push(todo);
      modal_close_icon.click();
    } else {
      // todos[updateId] = todo;
      if (!sameUser) {
        isUpdate = false;
        searched[updateId] = todo;
        modal_close_icon.click();
      } else if (sameUser?.name === searched[updateId].name) {
        isUpdate = false;
        searched[updateId] = todo;
        modal_close_icon.click();
        console.log(sameUser.name);
      } else {
        warning();
      }
    }
    localStorage.setItem("todos", JSON.stringify(todos));

    showTodos();
    // e.target[0].value = "";
    // e.target[1].value = "";
    // e.target[2].value = "";
  }
}

form.addEventListener("submit", (e) => addTodos(e));

//add a new todo modal end
