---
layout: post
title: (Rails) Social Media Self Referential
date: '2021-07-13'
categories: rails
note:
---

## Summary
The structure of this post:
1. xxx
2. xxx
3. xxx

## Why
I want to learn the structure of social media with rails.

## How

### User model
You can create a model with columns you want

### routes
Add two routes to trigger the actions for user to follow other users
```
post '/users/:id/follow', to: "users#follow", :as => :follow_user
post '/users/:id/unfollow', to: "users#unfollow", :as => :unfollow_user
```
### methods in controller
Generate user controller with
```
$ rails g controller users
```
Notice! If you are using devise, please make sure that the routes and actions created by devise would not have conflicts with the routes and actions created by user controller.

And add the following actions in user controller
```
class UsersController < ApplicationController

  def follow
  end
  
  def unfollow
  end
  
end
```
The action, `follow` should create a POST to let server know that this current user want to follow a particular user, so the follow action should find this user with `user_id` posted from frontend and then becomes the followee of this current user and this current user becomes the follower of this user with this particular `user_id`.
 
Then after the POST of follow/unfollow, there should be a place to record. As a result, we create a `Follow` model.

### Follow model
Before we create this model, to clarify, that I have many followers means that there are many people following me. As a result, `has_many` followers means this user has many followers and `has_many` followees means this user follows many users.

```
$ rails g model follow follower_id:integer followee_id:integer
```
The two columns `follower_id` and `followee_id` serve as matching mechanism. If a user with id: 123 follows another user with id: 234, then there will be a row (1, 123, 234), meaning user 123 now following user 234. Setup the model with
```
class Follow < ApplicationRecord
  belongs_to :follower, class_name: 'User'
  belongs_to :followee, class_name: 'User'
end
```
It means one follow belongs_to two people, follower and followee with foreign key, follower_id and followee_id. And setup the `user` model with
```
class User < ApplicationRecord
  has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
  has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
  has_many :followees, through: :followed_users
  has_many :followers, through: :following_users
end
```
The first and second `has_many` let user to have many follow and unfollow records and the third and forth `has_many` let user to have many followers and followees through `Follow` model.

With the model set up, the actions in controller should be as follow:
```
class UsersController < ApplicationController

  def follow
    @user = User.find(params[:id])
    current_user.followees << @user
  end
  
  def unfollow
    @user = User.find(params[:id])
    current_user.followed_users.find_by(followee_id: @user.id).destroy
  end
  
end
```
`follow` will find the user with id posted from frontend and let this user to become current user's followee.

`unfollow` will find the user with id posted from frontend and then destroy the row of followed information.


### View
Because I did not seperate frontend and backend, creating a view for further testing is easier. Create a button to follow this user with
```
<%= link_to "follow", follow_user_path(@user), method: :post %>
<%= link_to "unfollow", unfollow_user_path(@user), method: :post %>
```
After we click follow/unfollow, it will POST params and activate the methods matching the routes.

### More setups

#### avoid one user following self
**View**

Add the logic in view as follow:
```
<% if current_user != @user %>
  <%= link_to "follow", follow_user_path(@user), method: :post %>
  <%= link_to "unfollow", unfollow_user_path(@user), method: :post %>
<% end %>
```
Then only other user has the issue to follow or unfollow this user.

**Model**
The method as follow and validate it before data insertion.
```
class Follow < ApplicationRecord
  validate
  ...
  private
    def follow_self?
      if follower_id == followee_id
        errors.add(:follower_id, 'You cannot follow yourself')
      end
    end
end
```

### self-referential association

#### list the followers
skip

#### center of network
skip (As the rows in Follow model keep growing, there should have an algorithm to find the center of this network)

## What
Please refer to this project: [**marketplace**](https://github.com/YCChenVictor/marketplace)

## Reference
[**How to Create a Follow/Unfollow Feature in your Rails Social Media Application**](https://levelup.gitconnected.com/how-to-create-a-follow-unfollow-button-in-your-rails-social-media-application-e4081c279bca)
