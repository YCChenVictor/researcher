# Title

## Purpose

Its primary purpose is to enable clients to request exactly the data they need from a server, rather than relying on the server to determine the structure and content of the response.

## Concept

* Query Language: GraphQL introduces its own query language, which allows clients to specify exactly what data they need. Clients can request specific fields on objects, traverse relationships between objects, and even specify aliases for fields or request multiple resources in a single query.
* Type System: GraphQL APIs are built on a type system that defines the structure of the data available in the API. This type system allows clients to introspect the API schema to understand what types of data can be queried, what fields are available on each type, and what types of relationships exist between different types.
* Single Endpoint: Unlike RESTful APIs, which often expose multiple endpoints for different resources, **GraphQL APIs typically have a single endpoint for all queries**. This means that clients can send all their data-fetching requests to a single URL, simplifying the API surface and reducing the number of network requests needed to fetch data.
* Resolver Functions: Behind the scenes, GraphQL servers use resolver functions to fetch the data requested in a query. Resolver functions are responsible for fetching the data from the appropriate data sources (such as databases, other APIs, or in-memory caches) and returning it in the format expected by the client.
* Nested Queries and Mutations: GraphQL allows clients to nest queries and mutations within each other, enabling clients to fetch complex, nested data structures in a single request. This reduces the need for multiple round-trips to the server and helps avoid issues like over-fetching or under-fetching of data.

## Example

Below is a simple example of how you can create a GraphQL API using Node.js with the popular Express framework and the graphql and express-graphql packages:

```bash
mkdir graphql-example
cd graphql-example
npm init -y
```

Next, install the necessary dependencies:

```bash
npm install express express-graphql graphql --save
```

Now, create a file named server.js and add the following code:

```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

// Define a simple GraphQL schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'HelloWorld',
    fields: {
      message: {
        type: GraphQLString,
        resolve: () => 'Hello, world!' // Resolver function to return a message
      }
    }
  })
});

// Create an Express application
const app = express();

// Set up a route for GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true // Enable GraphiQL interface for easy testing
}));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

This code sets up a simple GraphQL schema with a single query field called message, which returns the string "Hello, world!". It then creates an Express application and sets up a route for the GraphQL endpoint using express-graphql. Finally, it starts the server and listens for incoming requests.

To run the server, execute the following command in your terminal:

```bash
node server.js
```

Now you can open your web browser and navigate to http://localhost:3000/graphql to access the GraphiQL interface, where you can test your GraphQL API by executing queries.

For example, you can enter the following query into the GraphiQL interface:

```
{
  message
}
```

And you should receive the following response:

```
{
  "data": {
    "message": "Hello, world!"
  }
}
```
