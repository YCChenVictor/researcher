---
layout: post
title: (Rails 26) Active Storage
date: '2021-06-09'
categories: rails
note: 可以使用 marketplace 那個 project 做 demo
---

### Introduction

Active Storage can attach files to objects in ORM and do not need to add a new column to table. All the attached files are put on a table called `active_storage_blobs`. Because we do not need the files to have relations with other tables, putting all of them on a table and labeling the connection of the subject works totally fine.

### Why

With it, we do not need to create a new column in each table, requiring the same data; for example, comments and thumbnail attached and because sometimes it is inferior compared to the subject it attached, we can move them to cloud based services such as Amazon S3, Google Cloud Storage, or Microsoft Azure and only keep the main subject on local storage.

### How
```
gem ‘image_processing’, ‘~> 1.2’
```
`has_one_attached` is the grammar of active storage

with `has_one_attached`, we can actively upload and store data with third-party cloud services such as AWS …etc.

With Active Storage, in `erb` files, in `url_for`, `link_to`, `image_tag`, input the variable, rails can show the file in html.

Suppose we have already used active storage to save an image with following active storage in model, `Product`, 

```
class Product < ApplicationRecord

  ...  
  has_one_attached :thumbnail  
  ...

end
```

then if we want to show this image in view, there are three method:

#### image_tag example

```
image_tag @image.file
```

### to be continued
#### url_for example

```
<%= url_for(product.thumbnail) %>
```

#### link_to example

```
<%= link_to document.filename %>
```
  
### What
[Example](https://github.com/YCChenVictor/marketplace)

### Reference

[**Active Storage Overview - Ruby on Rails Guides**](https://edgeguides.rubyonrails.org/active_storage_overview.html "https://edgeguides.rubyonrails.org/active_storage_overview.html")[](https://edgeguides.rubyonrails.org/active_storage_overview.html)

[**Active Storage 開箱文**](https://5xruby.tw/posts/active-storage-review "https://5xruby.tw/posts/active-storage-review")[](https://5xruby.tw/posts/active-storage-review)
