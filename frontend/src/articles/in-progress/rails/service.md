# Title

## Purpose

The purpose of utilizing service objects in Rails is to encapsulate complex business logic into separate, reusable components, promoting better code organization, maintainability, and testability. Service objects help achieve a clearer separation of concerns within your application, enabling easier reuse, flexibility, and scalability while facilitating the implementation of asynchronous processing when needed.

## Concept

Let's forget the service object first and think about a really simple example in controller.

```ruby
class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to @post, notice: 'Post was successfully created.'
    else
      render :new
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
```

Sometimes, we may need to do some callback in other model.

```ruby
class Post < ApplicationRecord
  after_create :create_related_record
  after_create :send_post_created_email
  after_create :notify_third_party_api

  private

  def create_related_record
    RelatedModel.create!(some_attribute: self.title)
    # Replace 'RelatedModel' with the name of the related model and adjust attributes as needed
  end

  def send_post_created_email
    # Code to send email
    # For example:
    # PostMailer.post_created_email(self).deliver_now
  end

  def notify_third_party_api
    # Code to interact with third-party API
    # For example:
    # ThirdPartyApiService.new.create_post(self)
  end
end
```

Ok, perfect, but this application results several problems in the future; for example, the notify_third_party_api part, we all know controllers consume the HTTP requests. As a result, it truly confuses the structure as the third party api may be put in the controller rather model. Also, the send email method can be treated as another HTTP request even though it may involve email instance creation. Additionally, as the logics getting bigger, we may want our system to run under the asynchronous way. Accordingly, it truly has benefits to use service objects as moving the whole service job to the sidekiq is easier.

Consequently, let's create a service:

```ruby
# app/services/post_creation_service.rb
class PostCreationService
  def initialize(post_params)
    @post_params = post_params
  end

  def call
    ActiveRecord::Base.transaction do
      post = create_post
      create_related_record(post)
      send_post_created_email(post)
      notify_third_party_api(post)
      post
    end
  end

  private

  def create_post
    Post.create!(@post_params)
  end

  def create_related_record(post)
    RelatedModel.create!(some_attribute: post.title)
    # Replace 'RelatedModel' with the name of the related model and adjust attributes as needed
  end

  def send_post_created_email(post)
    # Code to send email
    # For example:
    # PostMailer.post_created_email(post).deliver_now
  end

  def notify_third_party_api(post)
    # Code to interact with third-party API
    # For example:
    # ThirdPartyApiService.new.create_post(post)
  end
end
```

and use it in the controller:

```ruby
# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  def create
    post_creation_service = PostCreationService.new(post_params)
    @post = post_creation_service.call

    if @post.persisted?
      redirect_to @post, notice: 'Post was successfully created.'
    else
      render :new
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
```
