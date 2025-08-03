---
layout: post
title:
date: '2022-02-06'
categories: rails
note: to be continued
publish: true
---

## Introduction

Controller controls the data flow of an app.

## Why

With controller, we can move all the logics to model and only show necessary information on view.

## How

### Create one

* Corresponding Routes

Given in `config/routes.rb`,

```ruby
Rails.application.routes.draw do  
  get "/hello_world", to: "pages#hello"  
  resources :posts  
  resources :users  
end
```

Take a look at `get "/hello_world", to: "pages#hello".` This route means if user input the url `"/hello_world",` (which is a GET), it will activate method, hello in page controller.

* generate default controller

run the following code in terminal

```bash
$ rails g controller pages
```

the creation is as follow
<img src="/assets/img/1__KF3mFWIOzrQ9v7Mt241sAQ.png" alt="">

Then there would be pages_controller.rb
<img src="/assets/img/1__1GPk5ECjq6b7Fr6FruXmFg.png" alt="">

As you can see, the convention of naming in rails: `pages_controller.rb` matches `PagesControllers`.

  * rollback
  
  ```bash
  $ rails destroy controller pages
  ```

* generate customized controller

generate controller with

```bash
$ rails g controller pages --no-helper --no-assets --no-controller-specs --no-view-specs
```

or in `application.rb`, add

```ruby
# turn off assets, helper, view and use rspec while generating controllers
config.generators.assets = false
config.generators.helper = false
config.generators.template_engine = false
config.generators.test_framework :rspec
```

* Corresponding Method in Controller

In `app/controllers/pages_controller.rb`,

```ruby
class PagesController < ApplicationController  
  def hello  
    render plain: "<h1>Hello World!</h1>"  
  end  
end
```

Then input the site: http://127.0.0.1:3000/hello_world we can get a website with html: `<h1> Hello World! </h1>`

### module methods

* `redirect_to`
  * example
    ```ruby
    class UsersController < ApplicationController
      def create
        @user = User.new(user_params)
        if @user.save
          redirect_to root_path, notice: 'User was successfully created.'
        else
          render :new
        end
      end
    
      private
    
      def user_params
        params.require(:user).permit(:name, :email, :password)
      end
    end
    ```
* `redirect_back`
  * example
    ```ruby
    class ProductsController < ApplicationController
      def create
        @product = Product.new(product_params)
        if @product.save
          redirect_to products_path, notice: 'Product was successfully created.'
        else
          redirect_back fallback_location: products_path, alert: 'Product creation failed.'
        end
      end
    
      private
    
      def product_params
        params.require(:product).permit(:name, :description, :price)
      end
    end
    ```
* `require`: params.require(:user) specifies that the :user parameter is required to be present in the parameters submitted in the HTTP request in the Ruby on Rails framework.

## Reference

[**為你自己學 Ruby on Rails 高見龍**](https://railsbook.tw/)
