# title

## Purpose

Ruby on Rails is an open-source web application framework in Ruby, following the Model-View-Controller architectural pattern for structured development. It simplifies tasks like database interaction and request handling, enabling rapid development through conventions and built-in tools.

## Concept

### init

* install: `gem install rails`
  * check version: `rails -v`
* build project: `bundle install`
* start project: `rails new app_name`
* start server: `rails s`
  ![rails_server_start](assets/img/rails_server_start)
* open browsers and input `http://localhost:3000`
  ![rails_start_page](assets/img/rails_start_page)
* initializer
  * When application starts, it goes through an initialization process, walking through the initializer files in `config/initializers`.

### scaffold

Scaffold in rails is a quick way to create MVC structure; for example, if you want to create a MVC structure with database, user (name:string, email:string, tel:string), in the directory of the project,

```bash
rails g scaffold User name:string email:string tel:string
```

![files_created_by_scaffold](assets/img/files_created_by_scaffold)

As you can see, there are files for `active_record`, `resource_route`, `scaffold_controller`, `test_unit`, `assets`, `scss`.

### Config

We can run the file in `config/initializer` through `bundle exec filename`

### routes

Rails routes serve as the backbone of a Ruby on Rails application, providing a mapping between incoming HTTP requests and the corresponding controller actions. By defining routes in the config/routes.rb file, developers can determine how URLs are structured, which controllers handle the requests, and what actions are executed, enabling the seamless navigation and interaction within the application. For more information, please refer to [routes]({{site.baseurl}}/rails/2022/02/05/Routes.html).

### model

Models are in `app/models`. file name: `user.rb` maps class `User` and maps table `users`. For more information, please refer to [model]({{site.baseurl}}/rails/2021/03/02/model.html)

### view

Views are in `app/views`. For example, the view file related to controller, `UserController` will be in `app/views/users` as follow:

![view_user_index](assets/img/view_user_index)

For more information, please refer to [view]({{site.baseurl}}/rails/2021/03/02/view.html)

### controller

Controllers are in `app/controllers`. The file names and the controller names are linked; for example, file name: `users_controller.rb` maps class, `UserController` as follow:

![user_controller](assets/img/user_controller)

For more information, please refer to [controller]({{site.baseurl}}/rails/2022/02/06/Controller.html).

### API

API mode is a feature in Rails 6 that provides a stripped-down version of Rails optimized for building API-only applications. It removes or disables certain features that are specific to web applications, making the stack leaner and faster. For more information, please refer to [api mode]({{site.baseurl}}/rails/2021/03/22/api-mode.html)

### ORM

ORM (Object-Relational Mapping) is a technique or library that allows developers to map database tables to classes, and vice versa, so that they can interact with the database using object-oriented programming. The ORM abstracts away the SQL code and provides a higher-level API for creating, reading, updating, and deleting records from the database. For more information, please refer to [ORM](/blog/software/rails/ORM).

### ORM vs Model

A model and an ORM (Object-Relational Mapping) are two different concepts in software development, but they are related to each other.

A model is a representation of data that defines the structure, behavior, and relationships of that data in a software system. In other words, a model is an abstraction of the real-world entities that a software system deals with. Models can be implemented using different programming languages, frameworks, or libraries.

On the other hand, an ORM is a technique or a library that allows developers to map database tables to classes, and vice versa, so that they can interact with the database using object-oriented programming. The ORM abstracts away the SQL code and provides a higher-level API for creating, reading, updating, and deleting records from the database. The ORM also handles the conversion between object data types and database data types.

### database

In Rails, a database is a crucial component that enables the storage and retrieval of data for web applications. By leveraging the powerful ActiveRecord framework, Rails simplifies database interactions by providing an intuitive and object-oriented approach, allowing developers to focus on building robust and scalable applications. For more information, please refer to [database]({{site.baseurl}}/rails/2023/03/28/database.html).

### mailer

Action Mailer is a powerful framework in Ruby on Rails that allows application to send emails effortlessly. With its intuitive interface and support for templates, app can easily generate and customize email content, making it an essential tool for adding email functionality. For more information, please refer to [mailer]({{site.baseurl}}/rails/2021/03/19/mailer.html).

### Channel

Rails includes Action Cable as a built-in feature to provide real-time communication capabilities in web applications. It allows for bi-directional communication between the server and the client, enabling real-time updates and notifications. For more information, please refer to [action cable]({{site.baseurl}}/rails/2022/03/06/action-cable.html)

### rspec and capybara

We can also use rspec and capybara to compose test for this app (to be continued)

For more information, please refer to [rspec and capybara]({{site.baseurl}}/test/2022/08/31/rspec-and-capybara.html)

### test driven development

We can write the spec first and keep running the specs to development this app completely.

(compose spec here)

For more information, please refer to [test driven development]({{site.baseurl}}/test/2021/04/06/test-driven-development.html)

### debugger

* Add gem
  ```ruby
  group :development, :test do
    gem 'byebug'
  end
  ```
* use it
  ```ruby
  def some_action
    # ...
    byebug  # Add this line to set a breakpoint
    # ...
  end
  ```

### rake

## What?

### User Login

[user login]({{site.baseurl}}/rails/2021/03/11/user-login.html)

## Reference
