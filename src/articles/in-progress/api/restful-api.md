### RESTful API

#### Design

Let's say we want to build a task management interface following RESTful API (mostly used by web API). Then the design will be as follow:

```javascript
GET /tasks/new // (Create Show) Show the place to create task
POST /tasks // (Create) Add a new task to the list
GET /tasks // (Read list) Retrieve a list of all tasks
GET /tasks/{id} // (Read one) Retrieve a task with the specified ID
GET /tasks/:id/edit // (Update Show) Show the place to update task
PUT /tasks/{id} // (Update a task) Update a task with the specified ID
PATCH /tasks/{id} // (Update a task partially) Update a task with the specified ID
DELETE /tasks/{id} // (Destroy one) Delete a task with the specified ID
```

The URL structure follows the RESTful pattern of using a noun (in this case, “tasks”) to represent a resource and the HTTP method (GET, POST, PUT, DELETE) to specify the action to be taken on that resource.

#### REST Principles

REST means Representational State Transfer and is an architectural style with the following features:

* Client–Server Architecture
  * Enforces separation of concerns, enhancing portability and scalability.
* Statelessness
  * The current state is independent of the previous state, promoting flexibility in user interactions.
* Cache-ability
  * Utilizes caching to store data locally, reducing the need for repeated server requests.
* Layered System
  * Employs multiple intermediary servers for load balancing, security enhancement, and improved response generation.
* Code on Demand (Optional)
  * Allows optional code execution on the client, improving extensibility.
* Uniform Interface
  * Resource Identification in Requests: Separates resources from their representations.
  * Resource Manipulation through Representations: Users interact with representations (e.g., HTML forms) instead of directly changing server data.
  * Self-Descriptive Messages: Clients can parse resources based on received representations.
  * Hypermedia as the Engine of Application State (HATEOAS): Users can dynamically discover available resources after entering an initial URL.
