---
layout: post
title:
description: ''
date: '2023-03-28'
categories: rails
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

TBC

## Why?

Because web application frameworks rely heavily on databases to store and manage application data, understanding how to effectively work with databases is crucial for building scalable and reliable web applications in Ruby on Rails. Please refer to [database]({{site.baseurl}}/database/2022/08/12/database.html) for more information.

## How?

### Migration

* Create migration
  * Example: To add model, `Article` with columns: title, content, is_online
    ```bash
    rails g model Article title content:text is_online:boolean
    ```
  * To remove invoke while generating, `--no-helper --no-assets --no-controller-specs --no-view-specs` or
    ```bash
    # application.rb
    config.generators.assets = false
    config.generators.helper = false
    ```
  * Then in db/migrate, timestamp_create_articles.rb:
    ```ruby
    class CreateArticles < ActiveRecord::Migration[6.1]  
      def change  
        create_table :articles do |t|  
          t.string :title  
          t.text :content  
          t.boolean :is_online  
            
          t.timestamps  
        end  
      end  
    end
    ```
    * timestamp for recording `:created_at, :updated_at`
* Update migration
  * methods
    * rename_table - renames an existing database table
    * add_column - adds a new column to an existing database table
    * remove_column - removes a column from an existing database table
    * rename_column - renames a column in an existing database table
    * change_column - changes the data type or options of a column in an existing database table
    * add_index - adds a new index to a database table
    * remove_index - removes an existing index from a database table
    * add_reference - adds a foreign key reference to an existing database table
    * remove_reference - removes a foreign key reference from an existing database table
    * change_table - allows you to make multiple changes to an existing database table in a single migration
    * reversible - creates a reversible migration that can be rolled back
    * up - defines the changes to be made to the database schema when the migration is run
    * down - defines how to revert the changes made by the migration
  * A typical migration file
    ```ruby
    class AddAgeToUsers < ActiveRecord::Migration[6.0]
      def up
        add_column :users, :age, :integer
      end
    
      def down
        remove_column :users, :age
      end
    end
    ```
    * Ruby file that contains two methods: up and down
      * Up method is used to define the changes you want to make to the database schema
      * Down method is used to define how to undo those changes
    * Migration is like version control of database
    * Any changes related to database schema will be recorded in migrations with Ruby DSL * The summary of the changes of migration is in `schema.rb`
* Delete migration
  * To delete migration files,
    ```bash
    rails d migration MigrationName
    ```
* Run migration
  ```bash
  rails db:migrate
  ```
* Undo migration
  ```bash
  rails db:rollback STEP=3
  ```

### Associations

With the `add_reference`, we can add association to two tables. One-to-many association between a User model and a Post model using migration files:

```ruby
class AddUserRefToPosts < ActiveRecord::Migration[6.0]
  def change
    add_reference :posts, :user, null: false, foreign_key: true
  end
end
```

* `add_reference` adds a new column called user_id to the posts table
* `:user` tells Rails this column should be a foreign key reference to the User model
* `null: false` ensures that every post must belong to a user
* `foreign_key: true` enforces referential integrity

By using migration files to establish associations between models, you can ensure that your database schema is consistent and follows best practices for data modeling. You can also take advantage of Rails' powerful query interface to query data across multiple tables using associations.

Remember to declare `has_many` and `belongs_to` on `User` and `Post`

### Querying

Time is money, how to query fast plays key role
* In rails, we use active record to query and it uses ORM
* [Active record]({{site.baseurl}}/rails/2021/06/10/active-record.html)
  * scopes: help you DRY up your code and make it more readable by abstracting away common conditions
  * associations: methods like has_many, belongs_to, and has_and_belongs_to_many to define associations, and then use these associations in your queries
  * Arel is a SQL AST (Abstract Syntax Tree) manager that is used internally by Active Record. Arel provides a powerful DSL (Domain-Specific Language) that you can use to construct complex SQL queries.
* SQL: Rails also provides methods to execute SQL queries directly
* Performance: You can use tools like the includes method to eager load associations and reduce the number of database queries, and the joins method to perform more efficient SQL joins.
* Debugging queries: Rails provides several tools to help you debug queries, including the to_sql method, which lets you see the SQL generated by your Active Record queries, and the explain method, which shows you the execution plan for a query.

#### Performance

* Avoid N+1 queries: One of the most common performance issues in Rails is the N+1 query problem. This occurs when you load a collection of records, and then load a related association for each record individually. To avoid this problem, use the includes method to eagerly load associations; for example, instead of doing:

```ruby
@posts = Post.all
@posts.each do |post|
  puts post.comments.count
end
```

You can do:

```ruby
@posts = Post.includes(:comments).all
@posts.each do |post|
  puts post.comments.count
end
```

This will load all the comments for all the posts in a single query, rather than issuing a separate query for each post.

We can check the SQL query to understand the difference. Instead of

```mysql
-- For the first post
SELECT COUNT(*) FROM `comments` WHERE `comments`.`post_id` = <post_id_1>;

-- For the second post
SELECT COUNT(*) FROM `comments` WHERE `comments`.`post_id` = <post_id_2>;

-- For the third post
SELECT COUNT(*) FROM `comments` WHERE `comments`.`post_id` = <post_id_3>;
```

it will do

```mysql
SELECT `posts`.*, COUNT(`comments`.`id`) AS comments_count
FROM `posts`
LEFT OUTER JOIN `comments` ON `comments`.`post_id` = `posts`.`id`
GROUP BY `posts`.`id`
```

We can set condition with chaining as follow:

```ruby
@posts = Post.includes(comments: [:user]).where(comments: { approved: true }, users: { admin: true })
```

* Use indexes: Indexes can significantly improve the performance of your queries by reducing the amount of time it takes to find and retrieve records. Use the add_index method in your migrations to add indexes to your database tables. For example, to add an index to the email column in a users table, you can do:

```ruby
class AddIndexToUsersEmail < ActiveRecord::Migration[6.0]
  def change
    add_index :users, :email
  end
end
```

Once added an index to a table, use the newly created index in your queries to improve their performance.

```ruby
users = User.where(email: 'john@example.com')
```

This query will use the index on the email column to quickly find the matching record(s) in the users table.

The SQL script of querying remains the same as

```SQL
SELECT * FROM users WHERE email = 'john@example.com';
```

The speed of a SQL query can be faster after adding an index because an index provides a more efficient way for MySQL to locate the rows that match the conditions in the query. MySQL will use the index on the email column to quickly locate the rows that match the condition email = 'john@example.com'. MySQL will read only the index pages that contain the relevant data, and retrieve the matching rows from the table using the row ID stored in the index. This is much faster than scanning every row in the users table to find the matching rows.

#### Index Page

An index in MySQL consists of one or more index pages, which are stored separately from the data pages that contain the actual table rows. Each index page contains a subset of the index data, and includes information about the location of the corresponding rows in the data pages.

The example:

```
Index page 1:
--------------
email                | row ID
---------------------
john@example.com     | 1
jane@example.com     | 2
jim@example.com      | 3
...

Index page 2:
--------------
email                | row ID
---------------------
kim@example.com      | 4
kevin@example.com    | 5
katie@example.com    | 6
...
```

Each index page contains a list of email addresses and their corresponding row IDs.

In the SELECT,

```SQL
SELECT * FROM users WHERE email = 'john@example.com';
```

MySQL will read the index pages for the email column, and locate the row ID for the user with email address "john@example.com". MySQL will then retrieve the corresponding row from the data pages using the row ID. The use of the index pages can make this query much faster than if MySQL had to scan the entire table to find the user with email address "john@example.com".

* Use database-specific features: Different databases have different features and optimizations that you can take advantage of. For example, PostgreSQL has a feature called partial indexes that can improve the performance of queries that only need to retrieve a subset of records.
* Use caching: Caching can be a powerful tool to improve the performance of your queries. Rails provides several caching mechanisms, including fragment caching, action caching, and page caching. Use caching judiciously, as it can also introduce its own set of challenges.
* Use pluck and select: When you only need a specific set of attributes from a collection of records, use the pluck or select methods to retrieve only those attributes, rather than retrieving the entire record.

For example, instead of doing:

```ruby
@users = User.all
@user_emails = @users.map(&:email)
```

do

```ruby
@user_emails = User.pluck(:email)
```

This will retrieve only the email attribute for all the users, rather than retrieving the entire user record.

These are just a few tips to help you optimize the performance of your queries in Rails. There are many other factors to consider, such as database tuning, query optimization, and server configuration. It's important to carefully monitor and profile your application to identify performance bottlenecks and make informed decisions about how to optimize your queries.

#### sub query

TBC

### Schema

* A representation of your database's structure
* defined in a file called schema.rb in the db directory
* As more models and migrations, the schema file is updated to reflect the changes
* example:

```ruby
ActiveRecord::Schema.define(version: 2022_01_01_000000) do

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.timestamps
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.references "user", foreign_key: true
    t.timestamps
  end
end
```

When you run migrations in your Rails application, they are used to modify the database schema. Each migration corresponds to a specific change to the schema, such as adding a new table or column, renaming a table, or modifying a column's data type. When you run rails db:migrate, Rails applies all of the migrations that haven't been run yet to bring your database schema up to date with your application's current state.

#### single table inheritance (STI)

Instead of having separate tables for each subclass in an inheritance hierarchy, STI stores all data in a **single table**. Each row represents an instance of any class in the hierarchy, with a discriminator column distinguishing between different types.

* Single Table Representation: In STI, all attributes of the classes in the inheritance hierarchy are stored in a single database table. Each row in the table represents an instance of one of the classes in the hierarchy.
* Discriminator Column: To differentiate between different types of objects stored in the same table, a special column called a "discriminator column" is used. This column typically contains a value that identifies the specific class type of each row.
* Shared Structure: Because all classes share the same table, they also share the same structure (columns). However, not all columns may be relevant to all subclasses. Some columns may be specific to certain subclasses, while others may be common to all.
* Efficiency: STI can be more efficient in terms of database storage and query performance compared to other inheritance mapping strategies (like Class Table Inheritance or Concrete Table Inheritance) because it reduces the number of tables involved and simplifies the database schema.
* Query Simplicity: Working with STI is often simpler in terms of querying the database since all data is stored in a single table. There's no need for complex JOIN operations to retrieve data from related tables.
* Limitations: Despite its advantages, STI has some limitations. For example, it can lead to a less normalized database schema, and it may not be suitable for inheritance hierarchies with a large number of subclasses or where subclasses have vastly different sets of attributes.
* In Ruby on Rails, ActiveRecord provides built-in support for STI, making it easy to define inheritance hierarchies using a single database table. Developers can specify the inheritance relationships between their models using the type column as the discriminator column by default.

##### STI Example

In Ruby on Rails, implementing Single Table Inheritance (STI) is straightforward, thanks to ActiveRecord's built-in support for inheritance mapping.

* Define Your Base Model: Start by defining a base model that will serve as the parent class for your inheritance hierarchy. This base model will not be associated with a database table directly.
  ```ruby
  # app/models/animal.rb
  class Animal < ApplicationRecord
    self.abstract_class = true
  end
  ```
* Create Subclasses: Create subclasses that inherit from the base model. Each subclass will represent a different type of animal.
  ```ruby
  # app/models/dog.rb
  class Dog < Animal
  end
  
  # app/models/cat.rb
  class Cat < Animal
  end
  ```
* Add a Type Column: Rails conventionally uses a column named type as the discriminator column for STI. Make sure to add this column to your database table.
  ```ruby
  class CreateAnimals < ActiveRecord::Migration[6.0]
    def change
      create_table :animals do |t|
        t.string :name
        t.string :type
        # Add other attributes as needed
        t.timestamps
      end
    end
  end
  ```
* Populate the Database: Create records in your database for each subclass. Make sure to specify the type attribute to indicate the class type.
  ```ruby
  Dog.create(name: 'Buddy')
  Cat.create(name: 'Whiskers')
  ```
* Querying: You can query the base model Animal to retrieve records of all subclasses. ActiveRecord will automatically handle the type filtering for you. You can also query individual subclasses directly.
  ```ruby
  Animal.all  # Returns all animals, including dogs and cats
  Dog.all  # Returns all dogs
  Cat.all  # Returns all cats
  ```

### Built commands

* Find all commands
  ```bash
  bin/rails help | grep db:
  ```
* All commands
  ```bash
  db:create # Create database of particular env
  db:drop # Drop the database of particular env
  db:encryption:init
  db:environment:set # Fixes the EnvironmentMismatchError or NoEnvironmentInSchemaError
  db:fixtures:load
  db:migrate # Do migration
  db:migrate:down
  db:migrate:redo
  db:migrate:status
  db:migrate:up
  db:mysql:backup
  db:mysql:make_ref_sql_for_development
  db:mysql:make_ref_sql_for_test
  db:mysql:renew_reference_sql
  db:mysql:restore
  db:mysql:setup
  db:mysql:update_ref_sql
  db:prepare
  db:reset
  db:rollback
  db:schema:cache:clear
  db:schema:cache:dump
  db:schema:dump
  db:schema:load
  db:seed
  db:seed:replant
  db:setup
  db:system:change
  db:update_ref_sql
  db:version
  ```

## What?

I ame going to have real world example in querying

## Reference
