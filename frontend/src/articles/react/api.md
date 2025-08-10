# Title

React Context API:

Introduce the Context API as a mechanism for passing data through the component tree without having to pass props manually at every level.
Demonstrate how to create and consume context in React applications to manage global state or provide theme configurations.

## Introduction

This article explains how react as frontend to communicate with backend RESTful API.

## Concept

I use JWT mechanism.

### RESTful

With the concept of [RESTful], we can separate client and server side and follow standardized principles for exchanging data between client and server.

### create

Suppose we what to create tasks in a to-do list

```JSX
import React, { useContext, useState } from 'react';

function CreateTask(props) {
  const [variable, setVariable] = useState('');

  ...

  const token = localStorage.getItem('token');
  const PostTask = (params) => {
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(params),
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data);
    }).catch(error => {
      console.log(error)
    })
  }

  return(
    ...
  )
}

export default CreateTask;
```

* `PostTask` will `POST` `/tasks` with JWT token in headers

### READ

GET list of tasks

```JSX
import React, { useEffect, useState } from "react";
import TaskList from './task_list.jsx'

function TaskLists() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks", {
      method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
      setTasks(data); // Update the 'tasks' state with the fetched data
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <ul>
          {tasks.map((task) => (
            <TaskList key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TaskLists;
```

### Update

The following program communicates with backend in `PUT` to update a record.

```jsx
import React, { useState } from "react";

function TaskUpdate({ task }) {
  const [taskData, setTaskData] = useState(task);

  const handleUpdate = () => {
    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        console.log("Task updated:", updatedTask);
        // You can handle the updated task data as needed
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  return (
    <div>
      <h3>Update Task</h3>
      <input
        type="text"
        value={taskData.name}
        onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
      />
      <button onClick={handleUpdate}>Update Task</button>
    </div>
  );
}

export default TaskUpdate;
```

### Destroy

The following program communicates with backend in `DELETE` to destroy a record.

```jsx
import React from "react";

function TaskDelete({ taskId, onDelete }) {
  const handleDelete = () => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Task deleted successfully.");
          onDelete(taskId); // Notify the parent component to update its state or UI
        } else {
          console.error("Error deleting task.");
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
}

export default TaskDelete;
```

### Endpoint Environment Variable

In `.env` file and put variables; for example,

* `.env.development`
  ```javascript
  REACT_APP_API_ENDPOINT=http://localhost:9999
  ```
* `.env.production`
  ```javascript
  REACT_APP_API_ENDPOINT=https://servername:9999
  ```

and then react can access then with `process.env.REACT_APP_API_ENDPOINT`. When `npm start`, react uses variables in `.env.development` and when `npm run build`, react uses variables in `.env.production`.

## Appendix

### token

[Express JWT token]

## Reference

[Building an app to stream Tweets in real-time](https://developer.twitter.com/en/docs/tutorials/building-an-app-to-stream-tweets)

[Why can’t we integrate Twitter login with React alone?](https://www.quod.ai/post/how-to-integrate-twitter-login-api-into-your-react-app)

[[week 22] React：用 SPA 架構實作一個部落格（二）- 身分驗證](https://hackmd.io/@Heidi-Liu/note-fe302-react-blog-login)
