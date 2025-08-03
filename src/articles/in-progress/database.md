# Title

## Purpose

Databases provide a structured and efficient way to store, manage, and retrieve large amounts of data.

## Concept

### Design

* Define problem: I need a way to manage users. There will be two roles, users and admins. Some articles are only visible to login users amd some features are only available to admins.
* Identify entities or relationships: User. If there is relationship between these entities, we use ERD to visualize it.
* Choose a suitable database management system (DBMS). Consider options based on the requirements, data structure, and scalability needs.
  * Relational: [MySQL](/blog/software/database/mysql)
  * Non-relational (NoSQL)
    * Document: [MongoDB]
    * [Redis]
  * [Relational vs non-relational](/blog/software/database/relational-vs-non-relational)
* Design the database schema
  * Convert the ERD into a logical data model
  * Define tables: User
  * Define constraints to each column

### Framework

Given we have chosen framework such as node or rails. We use framework to do the following tasks:

* Config database
* Migrate Schema
* Develop CRUD API layers with validations, callbacks, and authentication
* Generate sample data script
* Write tests to verify the functionality of CRUD
* Deploy the database
* Maintain and optimize the database
* Continuously improve the database with user feedbacks
  * Optimizations such as caching, [denormalization] strategies, partitioning, sharding

### Efficiency

[efficiency](/blog/software/database/efficiency)

### Scaling

[scaling](/blog/software/database/scaling)

### ORM

[ORM](/blog/software/database/orm)
