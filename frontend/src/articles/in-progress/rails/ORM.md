# Title

## Purpose

* ORM is based on [OOP concepts]({{site.baseurl}}/concept/2021/11/21/Object-Oriented-Programming.html). Some important concepts to learn include classes, objects, inheritance, polymorphism, and encapsulation
* ORM is a technique that maps database tables to classes, and vice versa, so that developers can work with the database using object-oriented programming.
  * Table map to classes
  * Rows map to objects
  * Columns map to object attributes
* Abstracts away much of the low-level database interaction code that developers would otherwise have to write. This makes it easier to work with databases, and also reduces the likelihood of errors and bugs
* Used in popular web frameworks such as Ruby on Rails, Django, and Laravel. It is a powerful tool that allows developers to focus on building their applications, rather than on database management
* Also called active record

## Concept

Rails use adapter design pattern for user to use same syntax for different SQL.

* Models: In Rails, models represent database tables. Each model class typically corresponds to a table in the database, and instances of these classes represent individual records.
* Fields: Fields are attributes of a model that represent the columns in the corresponding database table. Each field has a data type and a set of constraints that determine how data is stored and validated.
* Relationships: Relationships define how models are related to each other in the database. There are several types of relationships, such as one-to-one, one-to-many, and many-to-many.
* Querysets: Querysets are objects that represent a collection of model objects that match a certain query. Querysets allow developers to retrieve, filter, and sort data from the database using object-oriented syntax.
* Transactions: ActiveRecord supports database transactions, which ensure that a series of database operations either all succeed or all fail together.
* Migrations: Migrations are Ruby classes that make it easy to create and modify database schema. They allow you to version control changes to your database schema along with your application code.
* Associations: ActiveRecord provides convenient methods for defining relationships between models. Common associations include belongs_to, has_many, has_one, and has_many :through.
* Polymorphic Associations: These associations allow a model to belong to more than one other model on a single association.
* Validations: Rails allows you to validate the data before it gets saved into the database. This helps maintain data integrity and ensures that only valid data is stored.
* Callbacks: Callbacks are methods that are called at certain points in the lifecycle of an ActiveRecord object, such as before validation, after validation, before save, after save, etc.
* Query Interface: ActiveRecord provides a powerful query interface for retrieving and manipulating data from the database. This includes methods like where, order, limit, offset, joins, etc.
* Scopes: Scopes allow you to define reusable queries that can be chained together to build more complex queries.
* Enums: Enums allow you to define a set of possible values for an attribute. This can be useful for attributes that have a limited set of options.

### design pattern

Please understand [Adapter](/blog/software/design-pattern/adapter) first.

### CRUD

To create a candidate

```ruby
user = Candidate.new(name: "aaa", age: 19)  
user.save
```

means in SQL,

```SQL
TBC
```

To read all users,

```ruby
User.all
```

means in SQL,

```SQL
SELECT * FROM users;
```

To find all table names

```ruby
ActiveRecord::Base.connection.tables
```

means in SQL,

```SQL
TBC
```

To update the candidate’s name with id = 1,

```ruby
candidate = Candidate.find_by(id: 1)  
candidate.name = "hahaha"  
candidate.save

# SQL
```

or

```ruby
candidate.update(name: "hahahaha", age: 20)

# SQL
```

To delete candidate with id = 1,

```ruby
Candidate.destroy(1)
```

means in SQL

```SQL
TBC
```

Notice! `delete` will call the SQL delete directly, so no callbacks during deleting process. By ignoring callback and relation, `delete` is faster than `destroy`.

### Model

* In Active Record, a model represents a table in a database. It encapsulates the logic for retrieving, creating, updating, and deleting records in the table.
* Attributes are the properties of a model that map to the columns of the corresponding database table. They represent the data stored in the table.
* Associations: Associations represent the relationships between models in the database. They define how records in one table are related to records in another table, such as a one-to-one, one-to-many, or many-to-many relationship.
* In Ruby on Rails, a model is a component of the MVC (Model-View-Controller) architecture that is used to represent the data and business logic of an application. In this context, a model can be any object that is used to interact with data, not just an Active Record model. For example, a model could represent an API endpoint, a user session, or a business process. In Active Record, a model is specifically an object that represents a table in a database, while in Ruby on Rails, a model is a more general term that refers to any object that represents data and business logic in an application.

On the application point of view, we only care about how to use model. In rails, all model inherit from `ActiveRecord::Base`; for example,

```ruby
class User < ActiveRecord::Base
end
```

So please refer to [model]({{site.baseurl}}/rails/2021/03/02/model.html) for more information

### methods

* `find` is a method provided by the ActiveRecord module in Ruby on Rails that retrieves a single record from the database based on its primary key. For example, if you have a model called User and you want to retrieve the user with an ID of 1, you can call User.find(1) and Rails will retrieve the corresponding record from the users table in the database. If the record is not found, find will raise an ActiveRecord::RecordNotFound exception.
* `find_by` is similar to find, but it retrieves a single record based on a specific attribute value, rather than the primary key. For example, if you want to retrieve the user with an email address of "johndoe@example.com", you can call User.find_by(email: 'johndoe@example.com') and Rails will retrieve the corresponding record from the users table. If the record is not found, find_by will return nil.
  * The main difference is that find(1) will raise an ActiveRecord::RecordNotFound exception if the record is not found, while find_by(id: 1) will simply return nil. This means that if you are certain that the record with a primary key of 1 exists in the database, you can use find(1) to retrieve it and raise an exception if it is not found. On the other hand, if you are not sure if the record exists, or if you don't want your application to crash if the record is not found, you can use find_by(id: 1) to retrieve it and handle the nil return value accordingly.
* `where`: The where method is used to retrieve a collection of records that match a set of conditions. For example, User.where(active: true) would retrieve all users that have the active attribute set to true.
* `order`: The order method is used to specify the order in which records are retrieved. For example, User.order(:name) would retrieve all users ordered by their name attribute in ascending order.
* `limit and offset`: The limit and offset methods are used to retrieve a subset of records from the database. For example, User.limit(10).offset(5) would retrieve 10 users starting from the 6th user.
* `select`: The select method is used to retrieve only specific columns from the database. For example, User.select(:name, :email) would retrieve only the name and email columns for all users.
* `joins`: The joins method is used to retrieve records from multiple tables based on a relationship. For example, User.joins(:posts) would retrieve all users who have at least one post.
* `includes`: The includes method is used to retrieve records from multiple tables while preloading associated records to avoid N+1 queries. For example, User.includes(:posts) would retrieve all users and their associated posts in a single query.
* `with_lock`
  * Purpose: Prevents conflicts from multiple processes or threads attempting to modify the same record simultaneously
  * Concept:
    ```ruby
    ```
  * Example:
    ```ruby
    # Assume we have a model named 'Product'
    product = Product.find(1)

    # Suppose we want to update the inventory count of the product while ensuring exclusive access.
    product.with_lock do
      product.update(inventory_count: product.inventory_count - 1)
    end
    # The above code will ensure that only one process at a time can update the 'product' record with the given ID, preventing inventory count conflicts.
    ```
* `update_attribute` can update column without validation
* `exist?`: `Model.exist?(xxx_id: id)`
* `reload`
  ```ruby
  # Fetch the post from the database
  post = Post.find(1)
  
  # ... some other code that might modify the record ...
  
  # Reload the post to get the most up-to-date data from the database
  post.reload
  ```
  * Effect: Calling record.reload on an ActiveRecord model instance will fetch the latest data for that record from the database and update the attributes of the model to reflect the database values, discarding any unsaved changes.

### Validation

Validations: Validations are rules that ensure the data stored in a model is valid and consistent with the requirements of the application. They can be used to enforce constraints such as required fields, data format, and uniqueness.

For data to be consistent in a model, we should validate it **before** inserting into a database. The methods for validation in [Active Record Validation - Ruby on Rails](https://guides.rubyonrails.org/active_record_validations.html)

### Callbacks

Callbacks: Callbacks are methods that are automatically called at certain points in the lifecycle of a model, such as before or after a record is saved or deleted. They can be used to perform additional operations or validations on the data.

Callback is the function that are going to be call after a function executed.

The life cycle of an object in a framework always plays key role. The process:
<img src="/assets/img/active_record_callbacks.png" alt="">(reference: [**railsbook.pdf**](https://railsbook.tw/))

The above cycle only shows the hooks of save. For more information, please refer to [active record callbacks](https://guides.rubyonrails.org/active_record_callbacks.html)

### Association

For more detail, please refer to [**Active Record - Association**](https://guides.rubyonrails.org/association_basics.html).

#### polymorphic

Polymorphism is useful whenever you have multiple related classes that share common behavior but may implement it differently.

We should use `polymorphic`, if a model belongs to more than one model and the meaning of the `belongs_to` are almost the same. However, if the `belongs_to` has significantly different meanings, then we should use multiple `has_many` and `belongs_to` rather than `polymorphic`. For example, both product and user can be commented, so we can create `Comment` model with
```bash
$ rails g model Comment commentable_type:string commentable_id:integer body:text
```
and the model setting would be as follow:
```ruby
class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
end

class Product < ApplicationRecord
  has_many :comments, as: :commentable
end

class User < ApplicationRecord
  has_many :comments, as: :commentable
end
```
As the setting above, the `commentable_id` will save the id of `product` and `user` and because of the column, `commentable_type`, no worries if the id of `product` and `user` are the same.

Alternatively, you can also define the relation as follow, which will have two column, product_id and user_id rather type (Product, or User) and id.

```ruby
class Comment < ApplicationRecord
  belongs_to :product
  belongs_to :user
end

class Product < ApplicationRecord
  has_many :comments
end

class User < ApplicationRecord
  has_many :comments
end
```

Try to understand how to query in rails with [ActiveRecord Query Interface](https://guides.rubyonrails.org/active_record_querying.html)

### optimization

#### eager loading

Understanding how to efficiently load associated data in advance to minimize database queries, including methods like preload, eager_load, and includes.

* Preload
  * Explanation: Preload is a method in ActiveRecord that loads associations separately from the main query. It executes multiple queries — one for the main record and one for each associated record.
  * Usage: Preload is typically used when the associations are not referenced in the query conditions. It **loads associated data eagerly** but does not utilize a single JOIN query.
  * Example
    ```ruby
    @users = User.preload(:posts)
    ```
  * SQL
    ```sql
    SELECT * FROM users;
    SELECT * FROM posts WHERE user_id IN (user_ids); -- separate SQL
    ```
  * Pros: Reduces the number of database queries compared to lazy loading (N+1 query problem).
  * Cons: Executes multiple queries, which may impact performance for large datasets.
* Eager Load
  * Explanation: Eager loading is similar to preload, but it uses a single JOIN query to load both the main record and its associations simultaneously. This can be more efficient than preload, especially when dealing with large datasets.
  * Usage: Eager loading is used when the associations are referenced in the query conditions.
  * Example
    ```ruby
    @users = User.eager_load(:posts)
    ```
  * SQL
    ```sql
    SELECT users.*, posts.* 
    FROM users 
    LEFT JOIN posts ON posts.user_id = users.id;
    ```
  * Pros: Uses a single JOIN query, which can be more efficient than separate queries.
  * Cons: May result in a larger dataset being returned if associations are not filtered.
* Includes
  * Explanation: Includes is a versatile method in ActiveRecord that can behave like preload or eager_load depending on the situation. It automatically decides whether to use preload or eager_load based on the associations and conditions provided in the query.
  * Usage: Includes is often used when you want ActiveRecord to decide the best strategy for loading associations.
  * Example
    ```ruby
    @users = User.includes(:posts)
    ```
  * Pros: Automatically chooses between preload and eager_load based on associations and conditions.
  * Cons: Less control over the specific loading strategy compared to preload and eager_load.
  * How includes choose: As you can see, preload has two SQLs and eager_load only has one but create a large table with left outer join. As a result, if you care about time, then you should use eager_load; if you care about space, then I should use preload. Extensively, includes also do the same thing here. That is, if the tables are really big then it will use preload. If there are many condition afterward the includes, it will use eager_load as it will be faster.

#### Query Optimization

Learning techniques to optimize database queries for performance, such as indexing, query caching, and using database-specific optimizations like EXPLAIN in SQL databases.

#### Batch Processing

Exploring methods to handle large datasets efficiently, including batch processing, pagination, and using database cursors

#### Transaction Management

Understanding how to manage database transactions effectively to ensure data integrity and improve performance, including techniques like batch updates and minimizing transaction scope

#### Caching

Utilizing caching strategies to reduce database load and improve response times, including fragment caching, query caching, and using caching layers like Memcached or Redis

#### Database Sharding and Replication

Learning about advanced database architectures like sharding and replication to distribute data across multiple servers and improve scalability and performance.

#### Optimizing Data Models

Designing efficient data models that minimize redundancy, improve query performance, and optimize storage usage, including normalization, denormalization, and choosing appropriate data types.

#### Database Profiling and Monitoring

Using tools and techniques to profile database performance, identify bottlenecks, and monitor database health, including database monitoring tools, performance profiling, and logging.

#### Connection Pooling

Configuring and managing database connection pools to efficiently handle database connections and minimize overhead.

#### ORM-specific optimizations

Exploring optimization techniques specific to your ORM framework, such as ActiveRecord in Ruby on Rails or Hibernate in Java, including tuning configuration settings, using batch processing features, and optimizing query generation.

## Example

### Source Code of adapter in rails active record

Please `rails new` a project and create a random table (I create table with `rails g scaffold User name:string email:string` and then `rails db:migrate`) and then we can create a new User with `test = User.create`. To track the source code, `bundle open activerecord` and it will open the gem in `.rvm/gems/ruby-2.7.4/gems/activerecord-6.1.4.4/lib`. I will only track the `create` method because I only want to know the design. We can track it with `binding.pry`. Try to find the raw SQL code. After you have done, input `bundle pristine activerecord` to recover the gems.

Input `ActiveRecord::Base.connection.adapter_name` in console, to know what database system using

`User.create` link to general methods of ActiveRecord of create: Fire up the rails console, and input `User.create`, then the SQL would be

```SQL
TRANSACTION (0.1ms)  begin transaction
User Create (0.4ms)  INSERT INTO "users" ("created_at", "updated_at") VALUES (?, ?)  [["created_at", "2022-01-11 02:01:31.475084"], ["updated_at", "2022-01-11 02:01:31.475084"]]
TRANSACTION (1.0ms)  commit transaction
```

I am using SQLite and the key issue is why rails knows to use the INSERT grammar for SQLite instead of MySQL or PG.

Add `binding.pry` in class as follow:

```ruby
class User < ApplicationRecord
  binding.pry
end
```

and input `User.create` in rails console again. Then the data flow of `create` would be as follow:

1. `create` method in superclass when calling `user.create` in `.../research_activerecord/app/models/user.rb`
2. the superclass of `User` is `ApplicationRecord`
3. the superclass of `ApplicationRecord` is `ActiveRecord::Base`
4. Have a look at `base.rb`

```ruby
module ActiveRecord #:nodoc:
  ...
  class Base
    ...
    extend ConnectionHandling
    ...
    include Core
    include Persistence
    ...
  end
  ...
end
```

Given that we know, `create` methods equals to `new` + `save`, then in `Core`, there are methods such as `initialize` and in `Persistence`, there are methods such as `save`.

The `create` method in `persistence.rb`

```ruby
def create(attributes = nil, &block)
  if attributes.is_a?(Array)
    attributes.collect { |attr| create(attr, &block) }
  else
    object = new(attributes, &block)
    object.save
    object
  end
end
```

As you can see, it will call `new` and then `save` method. We can 

* `new` (to eb continued)
* `save` in `persistence.rb` -> `create_or_update` -> `result = new_record? ? _create_record(&block) : _update_record(&block)` -> `_create_record(&block)` -> `yield(self)`

It is tedious to probe the methods. The general ideas are these methods will link to `build_insert_sql` of `connection` as follow:

* `insert_all` in `.../lib/active_record/persistence.rb` -> `InsertAll.new(self, attributes, on_duplicate: :skip, returning: returning, unique_by: unique_by).execute`
  * `initialize(model, inserts, on_duplicate:, returning: nil, unique_by: nil)` in `.../lib/active_record/insert_all.rb` and the model is `User` in my case
  * `execute` in `.../lib/active_record/insert_all.rb`
* `execute` -> `connection.exec_insert_all to_sql, message`
  * `connection` in `attr_reader :connection`, which means
     ```ruby
     def connection
       @connection
     end
     ```
  * `@connection = model.connection` and `model` is the `self` in `InsertAll.new`, which is `User` in my case.
  * `exec_insert_all` in `database_statements.rb`
  * `to_sql` = `connection.build_insert_sql(ActiveRecord::InsertAll::Builder.new(self))` (where connection transfer code into SQL)
* `build_insert_sql` can be in `abstract_adapter.rb`, `abstract_mysql_adapter.rb`, `postgresql_adapter.rb`, or `sqlite3_adapter.rb`
* rails determines which `build_insert_sql` to be used by `connection`

The most important part is `to_sql`. Then now the problem is how rails determines with adapter to be used:

* `establish_connection` in `.../lib/active_record/connection_handling.rb`
* it determines which adapter to be used through `establish_connection`

```ruby
ActiveRecord::Base.establish_connection(
  adapter:  "mysql2",
  host:     "localhost",
  username: "myuser",
  password: "mypass",
  database: "somedatabase"
)
```

* and it will call `connection_handler`, which is `self.connection_handler` in `core.rb`
* call `default_connection_handler` given there is no thread -> `self.default_connection_handler = ConnectionAdapters::ConnectionHandler.new`
* `initialize` in `class ConnectionHandler` of `connection_pool.rb`
* so it actually call `establish_connection` in `connection_pool.rb` -> `resolve_pool_config` -> `path_to_adapter = "active_record/connection_adapters/#{db_config.adapter}_adapter"` -> `require path_to_adapter` (**where the determination of adapter**)
* Take mysql as example, it require `.../lib/active_record/connection_adapters/mysql2_adapter.rb` -> `require "active_record/connection_adapters/abstract_mysql_adapter"`
* `build_insert_sql` in `.../lib/active_record/connection_adapters/abstract_mysql_adapter`

### Some interesting queries: (I cannot understand it right now)

**Iteration**: If we want to send an email to all users
```
Customer.all.each do |customer|
  NewsMailer.weekly(customer).deliver_now
end
```
However, the `.all` takes too much memory; as a result, we can use `find_each`
```
Customer.find_each(batch_size: 5000) do |customer|
  NewsMailer.weekly(customer).deliver_now
end
```
to portion the table and read it in a batch size many times.

The source code of `find_each`:
```
def find_each(start: nil, finish: nil, batch_size: 1000, error_on_ignore: nil, order: :asc)
  if block_given?
    find_in_batches(start: start, finish: finish, batch_size: batch_size, error_on_ignore: error_on_ignore, order: order) do |records|
      records.each { |record| yield record }
    end
  else
    enum_for(:find_each, start: start, finish: finish, batch_size: batch_size, error_on_ignore: error_on_ignore, order: order) do
      relation = self
      apply_limits(relation, start, finish, order).size
    end
  end
end
```
The source code of `find_in_batches`:
```
def find_in_batches(start: nil, finish: nil, batch_size: 1000, error_on_ignore: nil, order: :asc)
  relation = self
  unless block_given?
    return to_enum(:find_in_batches, start: start, finish: finish, batch_size: batch_size, error_on_ignore: error_on_ignore, order: order) do
      total = apply_limits(relation, start, finish, order).size
      (total - 1).div(batch_size) + 1
    end
  end

  in_batches(of: batch_size, start: start, finish: finish, load: true, error_on_ignore: error_on_ignore, order: order) do |batch|
    yield batch.to_a
  end
end
```
The source code of `in_batches`:
```
def in_batches(of: 1000, start: nil, finish: nil, load: false, error_on_ignore: nil, order: :asc)
  relation = self
  unless block_given?
    return BatchEnumerator.new(of: of, start: start, finish: finish, relation: self)
  end

  unless [:asc, :desc].include?(order)
    raise ArgumentError, ":order must be :asc or :desc, got #{order.inspect}"
  end

  if arel.orders.present?
    act_on_ignored_order(error_on_ignore)
  end

  batch_limit = of
  if limit_value
    remaining   = limit_value
    batch_limit = remaining if remaining < batch_limit
  end

  relation = relation.reorder(batch_order(order)).limit(batch_limit)
  relation = apply_limits(relation, start, finish, order)
  relation.skip_query_cache! # Retaining the results in the query cache would undermine the poinof batching
  batch_relation = relation

  loop do
    if load
      records = batch_relation.records
      ids = records.map(&:id)
      yielded_relation = where(primary_key => ids)
      yielded_relation.load_records(records)
    else
      ids = batch_relation.pluck(primary_key)
      yielded_relation = where(primary_key => ids)
    end

    break if ids.empty?

    primary_key_offset = ids.last
    raise ArgumentError.new("Primary key not included in the custom select clause") unlesprimary_key_offset

    yield yielded_relation

    break if ids.length < batch_limit

    if limit_value
      remaining -= ids.length

      if remaining == 0
        # Saves a useless iteration when the limit is a multiple of the
        # batch size.
        break
      elsif remaining < batch_limit
        relation = relation.limit(remaining)
      end
    end

    batch_relation = relation.where(
      predicate_builder[primary_key, primary_key_offset, order == :desc ? :lt : :gt]
    )
  end
end
```

## Reference

[**Active Record - 维基百科，自由的百科全书**](https://zh.wikipedia.org/wiki/Active_Record)

[**Active Record - Ruby on Rails**](https://guides.rubyonrails.org/active_record_basics.html)

[**polymorphic + STI**](https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#label-Polymorphic+Associations)

[ODBC and writing your own ActiveRecord adapter](https://eng.localytics.com/odbc-and-writing-your-own-activerecord-adapter/)

(http://www.monkeyandcrow.com/blog/reading_rails_the_adapter_pattern/)

