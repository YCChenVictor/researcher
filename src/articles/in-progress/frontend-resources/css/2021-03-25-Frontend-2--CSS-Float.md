---
title: (Frontend_2) CSS Float
description: >-
  To conceptualize, with float, the object can float on other objects, meaning
  it is on other layer and it looks like it cover other object…
date: '2021-03-25T04:15:15.384Z'
note: 還有一些內容沒整理
slug: /@t5204713910/frontend-2-css-float-c11095b28ae8
publish:
---

#### Only Left and Right

We can change the wording of left into right so that the image will be on the right side of the layout in web browsers.

img-float{  
    float:left  
}

#### Parent-Layer cannot Acquire The Height of Child-layer After float Specified

For example, in container, we add three columns with height specified as follow

<!DOCTYPE html>  
<html lang="en">  
<head>  
 <meta charset="UTF-8">  
 <meta name="viewport" content="width=device-width, initial-scale=1.0">  
 <title>Document</title>  
</head>  
<style>  
   
 .container{  
  width: 960px;  
  background-color: black;

}

.column{  
  width: 300px;  
  height: 200px;  
  background-color: red;  
 }

</style>  
<body>  
   
   <div class="container">  
    <div class="column"></div>  
    <div class="column"></div>  
    <div class="column"></div>  
   </div>

</body>  
</html>

Then the layout looks like

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__5I6XbYSfjIpDGcCwBFNzlA.png)

Then, with float set up in column

.column{  
  width: 300px;  
  height: 200px;  
  background-color: red;  
  float: left; /\* add this line \*/

 }

The layout

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__p3fWCX__NXG3tDp7Ps8wHZA.png)

The three column now line up side by side in the browser and the container disappeared. We can image that after the columns float, there is no objects in container to hold and open the area and the container shrinks to 0px on the axis of height.

**_How to solve the problem?_** We can add another object below the objects specified with `float` and specify `clear` property. With `clear` property, we the object will **bypass** the objects specified with `float` and show up on the layout; for example, in container add `<div class="ooxx"></div>`

<div class="container">  
    <div class="column"></div>  
    <div class="column"></div>  
    <div class="column"></div>  
    <div class="ooxx"></div>  
</div>

and in CSS, add

.ooxx{  
     clear: both;  
     height: 10px;  
    }

Then the layout:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__JscFltKiTIwzIKDOmqrNbA.png)

As we can see, there are an additional 10px showed up at the bottom of the red blocks. The `<div class="ooxx"></div>`**bypass** all the floating objects and show up below the other objects.

### Reference

[**金魚都能懂的網頁設計入門 - 金魚都能懂了你還怕學不會嗎 :: 2019 iT 邦幫忙鐵人賽**  
_金魚都能懂了，你還怕你學不會嗎？ 太多人在學習網頁的路上遭遇到挫折與失敗，這次Amos想利用自身的經驗來分享網頁設計入門的一些眉角，挑戰自己連續發文外，也..._ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/users/20112550/ironman/2072 "https://ithelp.ithome.com.tw/users/20112550/ironman/2072")[](https://ithelp.ithome.com.tw/users/20112550/ironman/2072)