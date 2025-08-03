---
layout: post
title: (Rails) google map
date: '2021-04-18T09:52:16.889Z'
categories: rails
note: 要把 dynamic map 也加進去，然後因為時間不夠，所以 其實都還沒修正完成，先跳過
---

### Introduction

This article describes how to deploy static map in your app with google map api.

#### environment:

Ruby 3.0 & Rails 6.0

### How

#### create a project
```
$ rails new GoogleMap
```
#### scaffold
```
$ rails generate scaffold Location name:string latitude:float longitude:float
```
#### migration
```
rails db:migrate
```
<img src="/assets/img/1__p4qsyc7cq1OmTpvnEf__YhQ.png" alt="">

#### Add Gem to Gemfile

gem 'geocoder’

With this gem, it can get longitude and latitude with location name automatically.

#### bundle install for gem file

bundle install

#### Add geocode to the model

In the Location model,

class Location < ApplicationRecord  
  geocoded\_by :name  
  after\_validation :geocode, if: :name\_changed?  
end

Notice! `:name` matches the column name of Location, `name`

`geocoded_by :name` means getting longitude and latitude by `:name`

`after_validation :geocode, if: :name_changed?`means if `name` changed, then show the new `:geocode` accordingly.

If you try to add a location, with randomly longitude and altitude,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__2A5UPOWatb1TDHZjhWduQA.png)

it can still insert correct location information as follow:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__yD2aH64V0W8__xPswLnm4QA.png)

#### Get the google api key

Go through the following: [get google api key](https://developers.google.com/maps/documentation/javascript/get-api-key)

There are mainly three suggestions:

1.  Add an active billing account, so that you can use the google map api. The billing account won’t charge any money unless you allow it to.
2.  In this case, you only need to request [Static Maps API](https://developers.google.com/maps/documentation/maps-static/get-api-key)
3.  If you are going to deploy it, make sure this api should only be used on certain website.

#### credential

Add credential for API not show on the frontend

$ EDITOR="vi" bin/rails credentials:edit

Then in the opened file, add

google\_api\_key: YOUR\_API\_KEY\_HERE

Then exist it: File encrypted and saved.

Then we are going to use following code to get the google\_api\_key in rails

Rails.application.credentials.google\_api\_key

add method in `location_helper.rb` to put the location we specify on the center of graph

def google\_map(center)

"https://maps.googleapis.com/maps/api/staticmap?center=#{center}&size=500x500&zoom=17&key=#{Rails.application.credentials.google\_api\_key}"

end

Now we should add it to view

#### Add this method to view

In `show.html.erb,` add

<div>  
  <%= image\_tag google\_map(@location.name) %>  
</div>

Then the page will looks like

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__1K1f6mwXyirQMK2Maa09Xg.png)

#### Add marker

As you can see from the above image, there is no marker for the center, we are going to add it with url. Add the following

markers=size:small%7Ccolor:red%7Clabel:C%7C

to

"https://maps.googleapis.com/maps/api/staticmap?center=#{center}&size=500x500&zoom=17&key=#{Rails.application.credentials.google\_api\_key}"

in the method of `google_map(center),` so the method looks like

def google\_map(center)

  "https://maps.googleapis.com/maps/api/staticmap?markers=size:small%7Ccolor:red%7Clabel:C%7Ccenter=#{center}&size=500x500&zoom=17&key=#{Rails.application.credentials.google\_api\_key}"

end

*   “size:” manipulates the size of the marker.
*   “color:” manipulates the color of the marker.
*   “label:” manipulates the label of the marker.
*   “%7C” Pipe symbol: separates each property from one another.

Then the result would be like

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__LbGAECLrA8G6DfEThqz92w.png)

### Reference

[**How To Integrate A Google Static Map API In Your Rails Project.**  
_Versions used_brodrick-george.medium.com](https://brodrick-george.medium.com/how-to-integrate-a-google-static-map-api-in-your-rails-project-80be28b99e0c "https://brodrick-george.medium.com/how-to-integrate-a-google-static-map-api-in-your-rails-project-80be28b99e0c")[](https://brodrick-george.medium.com/how-to-integrate-a-google-static-map-api-in-your-rails-project-80be28b99e0c)

[**Using API Keys | Maps JavaScript API | Google Developers**  
_"type": "thumb-down", "id": "missingTheInformationINeed", "label":"Missing the information I need" },{ "type"…_developers.google.com](https://developers.google.com/maps/documentation/javascript/get-api-key "https://developers.google.com/maps/documentation/javascript/get-api-key")[](https://developers.google.com/maps/documentation/javascript/get-api-key)

[**How to integrate Google Maps Javascript API with your Rails app**  
_Setting up Google Maps API into my application was probably one of the easiest things I’ve done and it was so much fun…_tshlosberg.medium.com](https://tshlosberg.medium.com/how-to-integrate-google-maps-javascript-api-with-your-rails-app-201e1b472465 "https://tshlosberg.medium.com/how-to-integrate-google-maps-javascript-api-with-your-rails-app-201e1b472465")[](https://tshlosberg.medium.com/how-to-integrate-google-maps-javascript-api-with-your-rails-app-201e1b472465)

[**Get an API Key and Signature | Maps Static API | Google Developers**  
_Before you start using the Maps Static API, you need a project with a billing account and the Maps Static API enabled…_developers.google.com](https://developers.google.com/maps/documentation/maps-static/get-api-key "https://developers.google.com/maps/documentation/maps-static/get-api-key")[](https://developers.google.com/maps/documentation/maps-static/get-api-key)