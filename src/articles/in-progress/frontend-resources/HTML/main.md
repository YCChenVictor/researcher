---
layout: post
title:
description:
date: '2021-12-17T02:44:33.376Z'
categories: html
note:
publish: true
---

## Introduction

HTML, or HyperText Markup Language, is the standard markup language used to create web pages. HTML is a markup language, which means it uses tags to define the structure and content of a web page.

Tags are enclosed in angle brackets, like this: <tagname>. Most tags have an opening tag and a closing tag, like this: <tagname>content</tagname>. The content goes between the opening and closing tags.

## Why

With markup, search engine can read the content of website correctly, giving semantic meanings to website.

## How

### basic form

Every HTML document starts with a DOCTYPE declaration, which tells the browser what version of HTML the page is using.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    Page content goes here.
  </body>
</html>
```

The `<!DOCTYPE html>` declaration should always be the first line of an HTML document. The `<html>` tag is the root element of the page, and everything else goes inside it.

The `<head>` section of an HTML document contains metadata about the page, such as the title, keywords, and description. The `<title>` tag is used to define the title of the page, which appears in the browser tab and search engine results.

The `<body>` section of an HTML document contains the content of the page. This is where you put text, images, links, and other elements that make up the page.

### tags

HTML has a variety of tags for different types of content. Here are some examples:

* `<h1>` to `<h6>`: Headings of different sizes
* `<p>`: Paragraphs of text
* `<a>`: Links to other pages or resources
* `<img>`: Images
* `<ul>` and `<ol>`: Unordered and ordered lists
* `<table>`: Tables of data
* `<form>`: Forms for collecting user input

HTML also has attributes, which are used to provide additional information about elements. Attributes are added to tags as name-value pairs, like this: `<tagname attribute="value">`. Some common attributes include:

* id: A unique identifier for an element
* class: A way to group elements together for styling with CSS
* src: The source URL for an image or other resource
* href: The URL to link to
* alt: Alternate text for an image, for accessibility purposes
* That should give you a good starting point for learning HTML. There's a lot more to learn, but these basics will help you get started with creating simple web pages.

### implementation

* add link to image
  ```HTML
  <a href="http://example.com">
    <img src="path/to/image.jpg" alt="Description of the image">
  </a>
  ```

## Reference

[**金魚都能懂的網頁設計入門 - 金魚都能懂了你還怕學不會嗎 :: 2019 iT 邦幫忙鐵人賽**  
_金魚都能懂了，你還怕你學不會嗎？ 太多人在學習網頁的路上遭遇到挫折與失敗，這次Amos想利用自身的經驗來分享網頁設計入門的一些眉角，挑戰自己連續發文外，也..._ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/users/20112550/ironman/2072 "https://ithelp.ithome.com.tw/users/20112550/ironman/2072")[](https://ithelp.ithome.com.tw/users/20112550/ironman/2072)

[**CSS - Wikipedia**  
_Edit description_en.wikipedia.org](https://en.wikipedia.org/wiki/CSS "https://en.wikipedia.org/wiki/CSS")[](https://en.wikipedia.org/wiki/CSS)