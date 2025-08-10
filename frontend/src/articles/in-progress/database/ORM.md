# Title

## Introduction

ORM (object relational mapping) lets programs query and manipulate data from database with object-oriented paradigm.

## Purpose

The ultimate reason of ORM is to increased productivity and maintainability. ORM frameworks abstract away the complexities of database interactions, allowing developers to focus more on application logic rather than dealing with low-level SQL queries and database connections. This abstraction not only reduces the amount of code developers need to write but also makes the codebase more maintainable and easier to understand. By providing a consistent interface for interacting with the database, ORM promotes a cleaner code structure, reduces redundancy, and streamlines the development process.

## Concept

* DRY (Don't Repeat Yourself), easier to maintain with the structure of the model: ORM helps in reducing redundancy by providing a centralized way to define and manipulate data models, making it easier to maintain and update the codebase.
* Miscellaneous tasks such as database connection can be done automatically: ORM frameworks often handle routine tasks such as database connections, transactions, and error handling, reducing the amount of boilerplate code developers need to write.
* MVC (Model-View-Controller) structure enforced, making cleaner code structure: ORM encourages adherence to the MVC architectural pattern by separating concerns related to data manipulation (Model) from those related to user interface (View) and application logic (Controller), resulting in cleaner and more organized code.
* No more SQL needed, making consistent coding style: ORM allows developers to work with objects and methods instead of writing raw SQL queries, promoting a consistent coding style and reducing the likelihood of SQL injection vulnerabilities.
* Abstract database system, so you can change it all the time: ORM abstracts away the underlying database system, allowing developers to switch between different database systems (e.g., MySQL, PostgreSQL, MongoDB) without needing to rewrite the entire data access layer of the application.
* OOP (Object-Oriented Programming) structure (hard to implement it with plain SQL): ORM aligns with the principles of object-oriented programming, allowing developers to work with data in a way that is more natural and intuitive within the context of their programming language, which can be challenging to achieve directly with plain SQL.
* Cross-Platform Compatibility: ORM frameworks often provide support for multiple programming languages and platforms, allowing developers to work with the same ORM solution across different environments.
* Query Abstraction and Optimization: ORM frameworks may offer query abstraction layers that help in generating efficient database queries automatically, optimizing performance without requiring manual intervention from developers.
* Version Control Friendliness: ORM encourages the use of version control systems by promoting a structured codebase and reducing the likelihood of conflicts, making it easier for teams to collaborate and manage changes to the database schema and codebase.
* Integration with Object Validation: Some ORM frameworks offer integration with object validation libraries, allowing developers to define validation rules directly within the model classes, ensuring data integrity and consistency.
* Automatic Schema Migrations: Many ORM frameworks provide tools for managing database schema migrations, simplifying the process of evolving the database schema alongside application updates and deployments.
* Caching and Performance Enhancement: ORM frameworks may include caching mechanisms that help in improving application performance by reducing the number of database queries and leveraging in-memory caching for frequently accessed data.

## Example

### rails ORM

please refer to 2022-01-13-rails-ORM.md

### Sequelize

please refer to 2022-01-20-model.md

## Reference

[What is an ORM, how does it work, and how should I use one?](https://stackoverflow.com/questions/1279613/what-is-an-orm-how-does-it-work-and-how-should-i-use-one)

[Active Record Basics](https://guides.rubyonrails.org/active_record_basics.html)
