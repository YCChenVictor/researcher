---
title: (Frontend_3) CSS inline & block
description: ''
date: '2021-03-25T05:46:10.207Z'
categories: CSS
keywords: []
note: 還有一些內容沒整理
slug: /@t5204713910/frontend-3-inline-block-9e33b99da580
publish:
---

### Introduction

We can categorize the objects in html into **inline and block**. The easiest way to distinguish the difference is that **one** block will fill all the horizontal area while inline would not.

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__FvXF0wJqVIuoRSZibCARTw.png)

#### The markups in block category

[div](https://www.webtech.tw/info.php?tid=77 "div")、p、ul、li

#### The markups in inline category

span、a、input、img、em

#### Height

We can set up the height of **blocks** while we cannot do it to **inlines**. The height of inline markup only determined by the contents of the inline.

#### Horizontal

We cannot put blocks side by side horizontally while inlines can.

### Display

In CSS, we can use property, `display` , to interchange the markups into block or inline

#### display:inline

for example, with blocks, `h1` and `p` ,

<!DOCTYPE html>  
<html lang="en">  
<head>  
 <meta charset="UTF-8">  
 <meta name="viewport" content="width=device-width, initial-scale=1.0">  
 <title>Document</title>  
</head>  
<body>  
   
 <h1>block with h1</h1>  
    <p>block with p</p>

</body>  
</html>

the layout:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__M1D5tERSpCvZrB24t17UJQ.png)

Then we can add `display:inline` to markup `h1`and `p` and the layout:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__D2OzqBeBPksgxvggUjVqvQ.png)

#### display:block

for example, with inlines, `span` and `a` ,

<!DOCTYPE html>  
<html lang="en">  
<head>  
 <meta charset="UTF-8">  
 <meta name="viewport" content="width=device-width, initial-scale=1.0">  
 <title>Document</title>  
</head>

<style>  
   
</style>

<body>  
   
 <span>inline with span</span>  
 <a href="">inline with a</a>

</body>  
</html>

the layout:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__dGsbtaSwtYPPa3__uodPQ2g.png)

Then we can add `display:block` to **either** markup `span`**or** `a` and the layout:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__7JqrgcdiF2JnHek9v5vk7g.png)

**Notice! the** reason why we only specify an inline markup with `display:block` is that either one turning into block will fill all the horizontal area.

#### display:inline-block

If we want an object to have height in an inline object, then we should use `display:inline-block` to achieve it; for example, with the setting below

<!DOCTYPE html>  
<html lang="en">  
<head>  
 <meta charset="UTF-8">  
 <meta name="viewport" content="width=device-width, initial-scale=1.0">  
 <title>Document</title>  
</head>

<style>

strong{  
     background-color: #eee;  
        height: 100px;  
        /\*display: inline-block;\*/  
    }  
   
</style>

<body>  
   
 <span>inline with span <strong>aaaa</strong></span>  
 <p>Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Beatae adipisci maiores vel dignissimos, totam esse blanditiis ut, eius officia a eveniet quae, alias in tempora, placeat! Dolor facilis, deleniti incidunt!</p>

</body>  
</html>

The layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__9FpooBj4iJXeH0GRaGtoBw.png)

as you can see, event thought we specified the height in the inline markup, `strong` , `aaa`still has no height, if we add the `display:inline-block` to it, then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____LOC5ljN__Euu2c0EXNdMmg.png)

### Reference

[**金魚都能懂的網頁設計入門 - 金魚都能懂了你還怕學不會嗎 :: 2019 iT 邦幫忙鐵人賽**  
_金魚都能懂了，你還怕你學不會嗎？ 太多人在學習網頁的路上遭遇到挫折與失敗，這次Amos想利用自身的經驗來分享網頁設計入門的一些眉角，挑戰自己連續發文外，也..._ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/users/20112550/ironman/2072 "https://ithelp.ithome.com.tw/users/20112550/ironman/2072")[](https://ithelp.ithome.com.tw/users/20112550/ironman/2072)