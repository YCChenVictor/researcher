---
layout: post
title: (Rails) Commenting System & Polymorphics
date: '2021-07-02'
categories: rails
note:
---

## Summary

## Why

## How
### polymorphic
I am going to use the concept of `polymorphic` to create a `Comment` model that the comments can be commented by other comments in the same `Comment` model. There will be one column for `commentable_id`, storing the `comment_id` of comment being commented. If not just comments can be commented, we can add a `commentable_type` column to distinguish the type of objects being commented.

\1. generate the `Comment` model:
```
$ rails g model Comment commentable_type:string commentable_id:integer user:references body:text
```

\2. setting up `Comment` model:
```
class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :commentable, polymorphic: true
end
```

\3. With `polymorphic: true`, this `Comment` model can belong to many model; for example,
```
class User < ApplicationRecord
  ...
  has_many :comments, as: :commentable, dependent: :destroy
  ...
end

class Product < ApplicationRecord
  ...
  has_many :comments, as: :commentable, dependent: :destroy
  ...
end
```

\4. Let comment also has many comments
```
class Comment < ApplicationRecord
  ...
  has_many: comments, as: :commentable
end
```

### Commenting System
With the setup above, open `rails console` and try to create testing data as follow:
```
Product.first.comments.create(user_id: 1, body: "testing")
Comment.first.comments.create(user_id: 1, body: "testing")
```
The code above will create comment to the first product in database and then create a comment to the first comment in database.

#### update the routes
```
Rails.application.routes.draw do
  ...

  resources :products do
    resources :comments
    ...
  end

  resources :comments do
    resources :comments # should use only to arrange the routes
  end

end
```
#### update the views (I use tailwind)
For example, I want to have a comment section in the show page of product. With the data created in `rails console`, use the following `view` to show the comments 

```
<p class="font-bold text-lg">Comments</p>
<% product.comments.each do |comment| %>
    <div class="font-bold">
      <%= comment.body %>
    </div>
    <% comment.comments.each do |comment| %>
      <div class="px-4">
        <%= comment.body %>
      </div>
    <% end %>
  </div>
<% end %>
```
Then it looks like

<img src="/assets/img/self-comment.png" alt="">

#### add controller for comments creation
To create a comment, we need controller as follow:

```
class CommentsController < ApplicationController

  before_action :authenticate_user!

  def create
    find_commentable
  	@comment = @commentable.comments.new comment_params
    @comment.user = current_user
    session[:return_to] ||= request.referer
    if @comment.save
      redirect_to session.delete(:return_to)
    end
  end

  private
    def comment_params
      params.require(:comment).permit(:body)
    end

    def find_commentable
      @commentable = Comment.find_by_id(params[:comment_id]) if params[:comment_id]
      @commentable = Product.find_by_id(params[:product_id]) if params[:product_id]
    end

end

```
Please take a look at `find_commentable`. `@commentable` uses `params`.

#### add a view section for comment creation
Next, I want to have a section for comments creation. 

For creation of product's comments,
```
<%= form_for [product, Comment.new], :remote => true do |f| %>
  <%= f.text_area :body, class: "input input-with-border", placeholder: "Add a comment", required: true %>
  <%= f.submit class: "btn btn-default" %>
<% end %>
```
and for creation of comments for comment,
```
<%= form_for [comment, Comment.new], :remote => true do |f| %>
  <%= f.text_area :body, class: "input input-with-border", placeholder: "Add a comment", required: true %>
  <%= f.submit class: "btn btn-default" %>
<% end %>
```
We can create a partial render form `_form.html.erb`:
```
<%= form_for [commentable, Comment.new], :remote => true do |f| %>
  <div class="">
    <%= f.text_area :body, class: "input input-with-border", placeholder: "Add a comment", required: true %>
  </div>
  <%= f.submit class: "btn btn-default" %>
<% end %>
```
and use
```
<%= render "comments/form", commentable: @product %>
```
Then we should be able to create a comment:
<img src="/assets/img/comment-creation-section.png" alt="">

#### post comment to comments (view)
```
<div class="w-full lg:w-3/5 pb-6">
    <p class="font-bold text-lg">Comments</p>
    <% product.comments.each do |comment| %>
      <div class="font-bold">
        <%= comment.body %>
      </div>
      <% comment.comments.each do |comment| %>
        <div class="px-4">
          <%= comment.body %>
        </div>
      <% end %>
      <%= render "comments/form", commentable: comment, placeholder: "Add a reply" %>
    <% end %>
    <br>
    <br>
    <br>
    <%= render "comments/form", commentable: product, placeholder: "Add a comment" %>
  </div>
```
Then it looks like
<img src="/assets/img/comment-of-comments.png" alt="">

## What
The implementation: [example-marketplace](https://github.com/henVictor/marketplace)


## Reference

[**Building a Reddit-like Commenting System with Rails**](https://www.codementor.io/ruby-on-rails/tutorial/threaded-comments-polymorphic-associations)

[**marketplace**](https://web-crunch.com/posts/ruby-on-rails-marketplace-stripe-connect)
