---
layout: post
title: (Rails) Activejob & Sidekiq & Redis & Heroku
description:
date: '2021-06-09'
categories: [rails]
note: none
---

### Introduction

ActiveJob lets project deal with missions asynchronously, meaning the missions not in urgency can be moved to queuing backend and be done later; for example, after a user login successfully, we may want to send an email to the user for notification. We should let user login first and send the email accordingly but not letting user wait until email being sent then login.

### Why

For example, if a request takes too much time, sometimes users may reload again, then server needs to go through all the loading missions again and the users may reload again; as a result, to avoid it, we should put some unrush missions to queuing backend and do the urgent mission first.

### How

For example, if there is a marketplace which users can post products and products will be expired after a certain period of time and a notification email will be sent once the product expired. Then two jobs need to be set up. One job for product expiration and one job for expiration notification. And i am going to use **sidekiq** as queuing backend.

#### install sidekiq
1. In Gemfile,
```
gem 'sidekiq', '~> 6.1', '>= 6.1.2'
```
2. In terminal, run
```
$ rails generate job ExpireProduct
```
to create job file for product expiration.

3. check `config/application.rb`, there should be
```
config.active_job.queue_adapter = :sidekiq
```
which tells rails to use sidekiq as backend to deal with job.

4. in ./config/routes.rb

```
Rails.application.routes.draw do

  # vist sidekiq if user is admin
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  ...
end

```
Then only admin can see the jobs in sidekiq.

5. In `expire_product_job.rb`,

```
class ExpireProductJob < ApplicationJob
  
  queue_as :default

  def perform(product)
    @product = product

    return if product_already_inactive?

    @product.status = "inactive"
    @product.save!
    
    UserMailer.with(product: @product).product_expired_notice.deliver_later

  end

  private
  def product_already_inactive?
    @product.status == "inactive"
  end

end
```
The meaning of `ExpireProductJob` above:
1. The methods in this class will be queue as default, meaning it will be moved out and put on backend and wait. There are other options like `:low_priority` and `:urgent`.
2. It has one task to perform, changing status of a product from active to inactive once condition meets.
3. As you can see, `UserMailer.with(product: @product).product_expired_notice.deliver_later` is also a job, going to be performed **later**.

#### ExpireProductJob
In controller, add `ExpireProductJob.set(wait_until: @product.expires_at).perform_later(@product)` as follow
```
class ProjectsController < ApplicationController
  ...
  def create
    @product = Product.new(product_params)
    @product.user_id = current_user.id

    respond_to do |format|
      if @product.save
        ExpireProductJob.set(wait_until: @product.expires_at).perform_later(@product)
        format.html { redirect_to @product, notice: "Product was successfully created." }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end
  ...
end
```
Then, this job will be performed later until product expiration datetime and if you want to get expiration effect immediately, add `ExpireProductJob.set(wait_until: @product.expires_at).perform_now(@product)` instead.

### What
The implementation: [example-marketplace](https://github.com/henVictor/marketplace)

We can check whether jobs are in sidekiq or not with following steps:
1. use an admin: in rails console, assign a user as admin with

```
u.admin = true
u.save
```
2. start sidekiq

```
$ bundle exec sidekiq -q default -q mailers
```

2. login to the website and GET `http://localhost:3000/sidekiq`

Then the following web page shows up
<img src="/assets/img/sidekiq_homepage.png" alt="">
接下來要改成 deliver now 來測試 job 在 sidekiq 中的樣子

### Redis

1. install redis

```bash
brew install redis
```

1. start redis
```
$ redis-server
```
1. open cli
```
$ redis-cli
```

這邊要描述一下 redis 創建 workers 與 heroku 之間的關係，但我現在還沒很懂

### Reference

[**Ruby on Rails 實戰聖經**](https://ihower.tw/rails/background-process.html)

[**Marketplace**](https://web-crunch.com/posts/ruby-on-rails-marketplace-stripe-connect)

[**Devise Confirmable**](https://github.com/heartcombo/devise/wiki/How-To:-Add-:confirmable-to-Users)

[**Background Processing with Rails, Redis and Sidekiq**](https://www.youtube.com/watch?v=GBEDvF1_8B8)
