//获得所有所需要的元素
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todolist = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");
inputBox.onkeyup = () => {
  let userData = inputBox.value; //获得使用者的信息
  if (userData.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};
showTasks();
addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push(userData);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
  addBtn.classList.add("active");
};
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length;
  if (listArr.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li><input type="checkbox" id=${index} onChange=toggle(${index})> <label for=${index}>${element}</label><span onclick= "editTask(${index})" class="edit"><img src="images/edit.png"  height="45px" width="100%"></span> <span onclick= "deleteTask(${index})" class="delete"><img src="images/delete.png"  height="45px" width="100%"></span></li>`;
  });
  todolist.innerHTML = newLiTag;
  inputBox.value = "";
}
function toggle(index) {
  let el = document.getElementById(index);
  console.log(el);
  el.parentElement.style.textDecoration = el.checked ? "line-through" : "none";
}
function editTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  const editValue = prompt("Enter your edit value", listArr[index]);
  listArr[index] = editValue;
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}
deleteAllBtn.onclick = () => {
  listArr = [];
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
};
