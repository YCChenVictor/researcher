---
layout: post
title: 
date: '2021-03-11'
categories: rails
note: session logout 為何需要兩個 route?
publish: true
---

## Introduction

(TBC)

## How

### Setup

There should be a rails application with User model and table. Create a new Rails application using the rails new command or use an existing application. For more information, please refer to [rails]({{site.baseurl}}/rails/2023/01/01/rails.html).

### Devise

The powerful authentication solution for rails. You can add Devise to your application by following the installation instructions in the Devise documentation. Devise handles many authentication-related tasks such as user registration, login, and password reset. For more information, please refer to [devise]({{site.baseurl}}/rails/2021/03/19/Devise.html)

### Customize the views

Devise generates views for authentication, but you may want to customize them to match your application's design. You can generate the Devise views using the following command:

Copy code
rails generate devise:views
This will create a set of views that you can modify to suit your needs.

Create routes: Define the necessary routes for user authentication in your config/routes.rb file. Devise provides convenient helper methods to generate these routes. For example, you can add the following line to enable user authentication:

ruby
Copy code
devise_for :users
Create navigation links: Add links to the login and registration pages in your application's layout file (app/views/layouts/application.html.erb or similar). You can use Devise's helper methods to generate these links. For example:

erb
Copy code
<% if user_signed_in? %>
  <%= link_to 'Logout', destroy_user_session_path, method: :delete %>
<% else %>
  <%= link_to 'Login', new_user_session_path %>
  <%= link_to 'Register', new_user_registration_path %>
<% end %>
Protect routes: If you have certain pages that should only be accessible to authenticated users, you can use Devise's authenticate_user! method as a before_action in your controllers. For example:

ruby
Copy code
before_action :authenticate_user!, only: [:secret_page]
Test your authentication system: Write tests to ensure that your authentication system is working correctly. Rails provides a testing framework (usually RSpec or Minitest) where you can define tests for user login, registration, and other authentication-related features.

### Structure Explanation

The structure would be MVC. There are going to have Sign Up page, Login Page, Profile Page.

### Create Rails Project

In folder you want to create rails project
```
$ rails new user_login
```
### Build Routes

Let’s build routes first. Routes can be a overview for the design of website.

For routes [explanation](之後要連動到 route 那一頁)

For user login webpage, we are going to have the method to `create, edit, update, show, destroy` of users and the method to login and logout website.

As a result, in `config/routes.rb`,
```
Rails.application.routes.draw do  
    
  root 'sessions#home'  
    
  # for users  
  resources :users

  # for session
  get '/login', to: 'sessions#login'  
  post '/login', to: 'sessions#create'  
  post '/logout', to: 'sessions#destroy'  
  get '/logout', to: 'sessions#destroy'

end
```
#### Test

With
```
$ rails routes
```
the available routes:
<img src="/assets/img/1__mVsk6GlAi3V3uok7sDzVpg.png" alt="">

Notice! The GET represents the process to input url to website. We construct all the routes with GET first.

With the Routes, if we input the url: http://127.0.0.1:3000/, the error pops up
<img src="/assets/img/1__dtQd0JGd0sntqpBVTki4Sw.png" alt="">

meaning we need to build the controller for session and of course, controller for users. We build controller for session first.

### Create Session Controller
```
$ rails g controller sessions
```
After both creation of controllers, the following error occurs
<img src="/assets/img/1__gSZlgOZsaP7KSkPItoLX8A.png" alt="">

meaning there is no method, home in session controller. As a result, we can create following method in controller
```
class SessionscController < ApplicationController  
    
  def home  
  end

end
```
Then the following error occurs
<img src="/assets/img/1__JkEXB2fTuTLAbOeBrW5Bsg.png" alt="">

### Build HTML template

meaning we need to create html template for home. As a result, in `app/views/session`, add `home.html.erb` and input the following code
```
<h1>Hello World</h1>
```
Then the homepage:
<img src="/assets/img/1__nBQcytmThRoxVHJDBM__RUA.png" alt="">

### Create User Controller

routes related to users:
```
users     GET    /users(.:format)             users#index
          POST   /users(.:format)             users#create
new_user  GET    /users/new(.:format)         users#new
edit_user GET    /users/:id/edit(.:format)    users#edit
user      GET    /users/:id(.:format)         users#show
          PATCH  /users/:id(.:format)         users#update
          PUT    /users/:id(.:format)         users#update
          DELETE /users/:id(.:format)         users#destroy
```
The `GET` method represents input the websties

If we input http://127.0.0.1:3000/users/new, the following error occurs
<img src="/assets/img/1__ZgLjBavQqv__s7f__6kXKZOw.png" alt="">

meaning we need to create controller for user
```
$ rails g controller users
```
Then the following error occurs
<img src="/assets/img/1_8OA7oV4B3J7-JA-0q6uIdg.png" alt="">

meaning we need to create index method

### Create user methods

In `app/users_controller.rb`, add
```
class UsersController < ApplicationController

  def index
  end

  ...

end
```
Then the following error occurs
<img src="/assets/img/1_Vs-4mjpCewb1gaigyBk7nA.png" alt="">

,meaning there is no template for users.

### Create View for Users

In `app/views/users/`, create `index.html.erb`:
```
<h1> Hello </h1>
```
Then the following webpage:
<img src="/assets/img/1__X7KXKEjLZ1RJJC____edQjPw.png" alt="">

Then we are done.

### Let’s create all the routes over and over again

The next route with GET
```
new_user GET    /users/new(.:format)
```
,so we input http://127.0.0.1:3000/users/new

Then the following error occurs
<img src="/assets/img/1__7FbOR0Ilxz4C__g8nZ9a5GQ.png" alt="">

meaning we need to add methods in controller, so we add methods: `new, create, show`
```
class UsersController < ApplicationController

  ...

  def new
    @user = User.new
  end

  ...

end
```
Then the error:
<img src="/assets/img/1__q2JGUB2x__6xhsekWALi3JQ.png" alt="">

meaning it cannot find user, which means there is no user model, so we create model

### Create User Model

In the project, generate model
```
$ rails g model User username:string password_digest:string
```
#### Why the name is password_digest rather than password?

To emphasize the method we create authentication. (Explanation of [Digest](之後要連動好))

In ruby, the we can use gemfile, `bcrypt` to salt and hash the password. In Gemfile, add
```
gem 'bcrypt'
```
Then, in terminal,
```
$ bundle install
```
(remember to restart rails to use bcrypt)

To use `bcrypt,` in `models/user.rb` add
```
class User < ApplicationRecord  
  has_secure_password  
end
```
Then following error occurs
<img src="/assets/img/1__TQun8BVpSGJBEiFUpRZMpw.png" alt="">

### Do migration
```
$ rails db:migrate
```
Then following error occurs
<img src="/assets/img/1_AFSiKG0sCOeo_YZ1N5OIdA.png" alt="">

meaning there are no template for user creation

### Build HTML Template for User Creation

In `app/views/users/`, add `new.html.erb`:
```
<h1>New Users Page</h1>

<%= form_for @user do |f| %>  
  <%= f.label :username %>  
  <%= f.text_field :username %><br>  
  <%= f.label :password %>  
  <%= f.password_field :password %><br>  
  <%= f.submit "Create Account" %>
<% end %>
```
Then the following pops up
<img src="/assets/img/1_LXR0OciDI74t8osMeNmkTQ.png" alt="">

Then we can test the creation by inputting username and password. Then the following error occurs
<img src="/assets/img/1__4zsaYfKGpZS1__P__wqjIgzA.png" alt="">
meaning we need to create create method

### Create Method for User Creation

In `app/controllers/users_controller.rb`, add
```
class UsersController < ApplicationController

...

def create

  @user = User.new(user_params)  
    if @user.save  
      session[:user_id] = @user.id  
      redirect_to root_path  
      
    else  
      render :new

    end   
  end

  private  
  def user_params  
    params.require(:user).permit(:username, :password)
  end
...

end
```
Then we can input username and password to test the user creation.

Then in `rails console`
```
$ User.all
```
<img src="/assets/img/1__OeNTA__WqEkFDDGQ1FK6saA.png" alt="">


### Create edit

Then go back to see routes, we
```
edit_user GET /users/:id/edit(.:format) users#edit
```
if we go to http://127.0.0.1:3000/users/1/edit, error pops up
<img src="/assets/img/1__0hZqXrALt8B6SK__53Gu5pw.png" alt="">
so we need to create edit method. In users_controller.rb:
```
def edit  
  @user = User.find_by(id: params[:id])  
end
```
Then the following error pops up
<img src="/assets/img/1__0R9a9YlJBYEdnfiHsSDK1w.png" alt="">
meaning there is no template for editing. Then we can add `edit.html.erb` in `app/views/edit.html.erb`
```
<h1>Edit User Page</h1>

<%= form_for @user do |f| %>  
  <%= f.label :username %>  
  <%= f.text_field :username %><br>  
  <%= f.label :password %>  
  <%= f.password_field :password %><br>  
  <%= f.submit "Edit Account" %>

<% end %>
```
Then the following error pops up
<img src="/assets/img/1__xv9uVfkucxN8tBjO65zYcA.png" alt="">
meaning we need to add update method in `users_controller.rb`

### Create Update Method in User Controller

Let’s add update method
```
def update  
  @user = User.find_by(id: params[:id])  
  if @user.update(user_params)  
    redirect_to root_path  
  else  
    render :edit  
  end  
end
```
### Create `Show` Method in User Controller

Then the route:
```
user GET    /users/:id(.:format)
```
If we input http://127.0.0.1:3000/users/1, the following error occurs
<img src="/assets/img/1__lPX2YjR6U7sAcyOUxrJIqg.png" alt="">
meaning we need to create show method in user controller. In `app/controllers/users_controller.rb`, add method:
```
def show  
  @user = User.find_by(id: params[:id])
end
```
### Create View for Individual User (Show)

In `app/views/users/`, add `show.html.erb`
```
<%= @user %>
```
Then, we can show something on individual webpage.

### Create login Method in Session

In `rails routes` , we can see
```
login GET    /login(.:format)     sessions#login
```
meaning there is a GET route; however, if we input http://127.0.0.1:3000/login, the following error occurs
<img src="/assets/img/1__gWwzEOZcfJi99pd8otcx0A.png" alt="">

meaning we need to create login action in session controller; as a result, we can add in `app/controllers/sessions_controller.rb`
```
class SessionsController < ApplicationController

  ...

  def login  
  end

  ...

end
```
Then the following error occurs
<img src="/assets/img/1__siP__UNwVDg__hGtXQYoY6pA.png" alt="">
meaning there is no view for login method

### Create View for Login

In `app/views/sessions/`, create `login.html.erb`, with
```
<div>  
  <h2>Login</h2>  
  <%= form_tag '/login' do %>  
    Username: <%= text_field_tag :username %><br>  
    Password: <%= password_field_tag :password %><br>  
    <%= submit_tag 'login' %>  
  <% end %>
</div>
```
Then the following webpage
<img src="/assets/img/1__rhEZpjxeYX3zPrZxvMe6UA.png" alt="">

After inputting some username, the following error occurs
<img src="/assets/img/1__URHwPj0zcgWnJfZIuqjrgQ.png" alt="">

meaning we need to add create method for session controller

### Create Method for Login

For user creating, we need POST to send data to server and add the following method:
```
class SessionsController < ApplicationController

...

  def create  
    @user = User.find_by(username: params[:username])
    if !!@user && @user.authenticate(params[:password])   
      session[:user_id] = @user.id  
      redirect_to user_path(@user).id)
    else  
      message = "something went wrong"  
      redirect_to login_path, notice: message  
    end
  end

...

end
```
This method:

1.  find specific user with username
2.  if the user exists and the password is correct, then pass and show the view of specific user webpage
3.  or cannot pass

Notice, the method name is `create` ; however, this method does not create anything at all.

Then it will redirect to individual webpage.

## What

Give real examples

### Reference

[**Creating a User Login System - Ruby on Rails**](https://dev.to/kjdowns/creating-a-user-login-system-ruby-on-rails-2kl2)