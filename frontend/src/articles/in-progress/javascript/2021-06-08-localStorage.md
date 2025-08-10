---
layout: post
title: localStorage
date: '2021-06-02'
state: done
categories: javascript
---

### Introduction (mozilla)

To sum up, localStorage allows us to save data with key/value pairs in user's browsers.

**Web storage API** provides mechanisms by which browsers can store key/value pairs.
**Storage interface** provides access to a particular domain's session or local storage; it allows, for example, the addition, modification, or deletion of stored data items.
**localStorage** allows you to access a Storage object for the Document's origin. localStorage data has no expiration time.

### Why

With localStorage, no need for database to acquire behaviors on the frontend side; for example, store the last searching result on facebook with localStorage and we can directly obtain the result without searching it again.

### How

The coding is quite intuitive.
```
/* Set some data */
localStorage.setItem("key", "value");

/* Get some data */
localStorage.getItem("key");
```

#### What

Let's build a basic application with localStorage. For example, we want to have a basic todo list website and the list will not disappear after browser closed.

##### 1. create basic todo list index.html, style.css, main.js

index.html:
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link href='style.css' rel='stylesheet'>
  <script src='main.js'></script>
</head>
<body>
  <div class="header">
    <h2>To Do List</h2>
    <input type="text" id="input">
    <span id="addBtn" class="addBtn">+</span>
  </div>
  <ul>
      
  </ul>
</body>
</html>
```
style.css
```
/* Include the padding and border in an element's total width and height */
* {
  box-sizing: border-box;
}

/* Remove margins and padding from the list */
ul {
  margin: 0;
  padding: 0;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;

  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

li:last-child {
  border-radius: 0 0 20px 20px;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.close:hover {
  background-color: #f44336;
  color: white;
}

/* Style the header */
.header {
  background-color: rgb(49, 151, 129);
  padding: 30px 40px;
  color: white;
  text-align: center;
  border-radius: 20px 20px 0 0;
}

/* Clear floats after the header */
.header:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the input */
input {
  margin: 0;
  border: none;
  border-radius: 10px 0 0 10px;
  width: 85%;
  padding: 10px;
  float: left;
  font-size: 16px;
}

/* Style the "Add" button */
.addBtn {
  padding: 10px;
  height: 38px;
  width: 15%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 45px;
  line-height: 10px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0 10px 10px 0;
}

.addBtn:hover {
  background-color: #bbb;
}
```
main.js:
```
document.addEventListener('DOMContentLoaded', function () {
  const addBtn = document.getElementById('addBtn').addEventListener('click', () => {
    const toDoMessage = document.getElementById('input').value;
    if (toDoMessage.length > 0) {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.classList.add('close');
      span.textContent = "x";
      span.addEventListener('click', () => {
          span.closest("li").remove();
        });
      li.textContent = toDoMessage;
      li.addEventListener('click', () => {
          li.classList.toggle("checked");
        });
      li.appendChild(span);
      document.querySelector('ul').appendChild(li);
    };
  })
});
```
Please try to add some task, the tasks should have the effect checked and deleted; however, given above JS, if we refreash the website, the added tasks will disappear. That is what localStorage comes with.
##### 2. Add localStorage
With localStorage, the checked and deleted effect will not disapear after we refresh website

main.js
```
document.addEventListener('DOMContentLoaded', function () {

  // load the past to do
  // localStorage.clear() // 先把資料都刪掉
  let toDoListArray = JSON.parse(localStorage.getItem('toDoList')) || []
  let toDoListArea = document.getElementById("toDoList")
  insertToDoList(toDoListArray)

  // update toDoList after click add button
  document.getElementById('addBtn').addEventListener('click', () => {
    const toDoMessage = document.getElementById('input').value;
    if (toDoMessage.length > 0) {
      let toDoListArray = JSON.parse(localStorage.getItem('toDoList'))
      if (toDoListArray === null) {
        toDoListArray = []
        index = 0
      } else if (toDoListArray.length === 0) {  
        index = 0
      } else {
        index = toDoListArray.length
      }
      const checked = false
      toDoListArray[index] = {toDoMessage, checked};
      localStorage.setItem('toDoList', JSON.stringify(toDoListArray))
    }
    const toDoListArray = JSON.parse(localStorage.getItem('toDoList'))
    while (toDoListArea.firstChild) {
        toDoListArea.removeChild(toDoListArea.firstChild);
    };
    insertToDoList(toDoListArray)
  });

  // function to insert toDo
  function insertToDoList(toDoListArray) {
    for (let i = 0; i < toDoListArray.length; i++) {
      if (toDoListArray[i] === null) {
        continue
      }
      const checked = toDoListArray[i]["checked"];
      const toDoMessage = toDoListArray[i]["toDoMessage"];
      const li = document.createElement("li");
      if (checked === true) {
        li.classList.add("checked")
      }
      const span = document.createElement("span");
      span.classList.add('close');
      span.textContent = "x";
      span.setAttribute('id', i)
      removeElement(span);
      li.textContent = toDoMessage;
      checkedElement(li);
      li.appendChild(span);
      toDoListArea.appendChild(li)
    }
  }

  // function to remove
  function removeElement(span) {
    span.addEventListener('click', () => {
      span.closest("li").remove();
      id = span.id
      let toDoListArray = JSON.parse(localStorage.getItem('toDoList'))
      delete toDoListArray[id]
      localStorage.setItem('toDoList', JSON.stringify(toDoListArray))
    });
  }

  function checkedElement(li) {
    li.addEventListener('click', () => {
      li.classList.toggle("checked");
      let toDoListArray = JSON.parse(localStorage.getItem('toDoList'))
      id = li.childNodes[1].id
      if (toDoListArray[id]["checked"] == false) {
        toDoListArray[id]["checked"] = true
        localStorage.setItem('toDoList', JSON.stringify(toDoListArray))
      } else {
        toDoListArray[id]["checked"] = false
        localStorage.setItem('toDoList', JSON.stringify(toDoListArray))
      }
    });
  }

});
```
### Reference

[**mozilla**  
](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/localStorage)

