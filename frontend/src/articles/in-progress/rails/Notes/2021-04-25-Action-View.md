---
layout: post
title: (Rails) Action View
date: '2021-06-09'
categories: rails
state: to be continued
note: 這個了解夠清楚才會知道 commentable 的 reply 怎麼做，如果有流水帳，要記得拿掉，這應該放特殊的操作或是特別的理解即可
---
## Introduction

Action View templates are written with embedded Ruby in tags **mingled** with HTML. Action View responsible for compiling the response from action controller, communicating with the database and performing CRUD actions. There are also action view helpers for creating neat templates for views.

## Why

With Action View, we can use more maintainable and readable method to produce HTML files. Action View gives us a more structured way to write HTML files for websites.

## Structures

There are three components: **templates, partials, layouts**. If we directly use `scaffold` command in rails to generate an `article` class.

```
$ rails generate scaffold article
```

Then the structure of view will be

<img src="/assets/img/1__i__PlmVyHz7AafRauDSnL__g.png" alt="" width=400>

### Templates

As you can see, there are templates for `index.html.erb`(Listing and Options for Reading or **Deleting**), `edit.html.erb`(**Updating**), `new.html.erb`(**Creating**), `show.html.erb`(**Reading**). There is no template for Deleting, but in the `index.html.erb` file, we can see the following code

```
<%= link_to 'Destroy', article, method: :delete, data: { confirm: 'Are you sure?' } %>
```

and the html produced:

```
<a data-confirm="Are you sure?" rel="nofollow" data-method="delete" href="/articles/1">Destroy</a>
```

The `data: { confirm:'xxx' }` will send data to browser and pops up while deleting.

There are also other file type: [Builder](https://guides.rubyonrails.org/action_view_overview.html#builder) (generating XML) and [Jbuilder](https://guides.rubyonrails.org/action_view_overview.html#jbuilder) (generating JSON), letting us to communicate with other device in other date types.

### Partials

In the structure, there is `_form.html.erb` and the Punctuation Marks `_` means we can render it in other html file; for example, in `edit.html.erb` , add

```
<%= render "product", product: @product %>
```

Then, the html in the `_form.html.erb` will be inserted into the file, `edit.html.erb` and all the `product` in `_form.html.erb` will be `@product` .

### Layouts

There is also a layout directory and the files are application and mailer. These files will be the whole setting for html files.

### [Partial Layouts](https://guides.rubyonrails.org/action_view_overview.html#partial-layouts) (skip)

## Helper

In rails, with above template structure, we can use functions to output HTML. With these functions, we can have more secure, maintainable, neat coding structure to build HTML files. Please refer to [**Action View Helpers - Ruby on Rails Guides**](https://guides.rubyonrails.org/action_view_helpers.html) for further information.

### form_for, form_tag, and form_with

In rails, we can use `form_for` or `form_tag` to do so. The key difference between these two methods is `form_tag` does not need model; as a result, if you only want user to input data but not to store it, `form_tag` is your good choose.

#### form_for

for example, in a blog project, for user to add an article, the code would be as follow

```
<%= form_for :article do |f| %>
  title: <%= f.text_field :first_name %><br />
  body:  <%= f.text_field :last_name %><br />
  <%= f.submit %>
<% end %>
```

**:remote**: if we want the `submit` button to be AJAX, we can set it to true and rails will use UJS to handle this button.

#### form_tag

For example, if we just want to do some search, we may only want user to input text they want to search and submit to do the action; as a result, the coding would be (skip)

```
<%=
```

and result would be

```
<form
```
  



#### form_with

For example, if we want to create following webpage,
<img src="/assets/img/1__7sztKeUKGjawNyZtJp71mA.png" alt="">

the coding will be as follow:

```
<%= form_with url: "/search", method: :get do |form| %>  <%= form.label :query, "Search for:" %>  <%= form.text_field :query %>  <%= form.submit "Search" %><% end %>
```

As you can see, the `form_with` method require us to input `url` and `:get` method and the url:
```
<form action="/search" accept-charset="UTF-8" method="get">  
  <label for="query">Search for:</label>  
  <input type="text" name="query" id="query">  
  <input type="submit" name="commit" value="Search" data-disable-with="Search">  
</form>
```

### How data flow from view to controller?
Please use `byebug` and check `params` in rails server. Then the following message:
```
ActionController::Parameters {"comment"=>{"body"=>"q"}, "commit"=>"Create Comment", "controller"=>"comments", "action"=>"create", "product_id"=>"1"} permitted: false
```
skipped

### Self-defined Helper (skip)

## Reference

[**Action View Overview - Ruby on Rails Guides**](https://guides.rubyonrails.org/action_view_overview.html)

[**Action View Helpers - Ruby on Rails Guides**](https://guides.rubyonrails.org/action_view_helpers.html)

[**Action View - Helpers 方法**](https://ihower.tw/rails/actionview-helpers.html)

[**HTML Forms**](https://www.w3schools.com/html/html_forms.asp "https://www.w3schools.com/html/html_forms.asp")[](https://www.w3schools.com/html/html_forms.asp)