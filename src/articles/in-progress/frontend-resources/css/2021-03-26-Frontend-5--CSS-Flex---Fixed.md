---
title: (Frontend_5) CSS Flex & Fixed
description: ''
date: '2021-03-26T12:44:53.275Z'
categories:
keywords: []
slug: /@t5204713910/frontend-5-flex-fixed-d2c9bb772699
publish:
---

### Flex

Then what if we want to have two lines of the items? We should add `flex-wrap: wrap` into the CSS of .wrap. Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__4x67IiY2ZrfGSEAsq86Jdw.png)

### Practical Practice of Flex

For the following images with two wrap, one wrap with two images and one wrap with three images

<div class="wrap">  
        <div class="item">  
            <img src="[https://picsum.photos/300/200/?/random=4](https://picsum.photos/300/200/?/random=4)" alt="">  
        </div>  
        <div class="item">  
            <img src="[https://picsum.photos/300/200/?/random=5](https://picsum.photos/300/200/?/random=5)" alt="">  
        </div>  
    </div>  
    <div class="wrap">  
        <div class="item">  
            <img src="[https://picsum.photos/300/200/?/random=1](https://picsum.photos/300/200/?/random=1)" alt="">  
        </div>  
        <div class="item">  
            <img src="[https://picsum.photos/300/200/?/random=2](https://picsum.photos/300/200/?/random=2)" alt="">  
        </div>  
        <div class="item">  
            <img src="[https://picsum.photos/300/200/?/random=3](https://picsum.photos/300/200/?/random=3)" alt="">  
        </div>  
    </div>

if we did not specify `display: flex` , then there would not be any side by side effect in each wrap.

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__g5ClyYIGlhTy__eU9sX2nkg.png)

And if we add `display: flex` , the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__G2UQ67cJtrrnfFkfE7W5bQ.png)

### Fixed

Suppose we add a block with`<div>` with following CSS setting:

.whatever{

    width: 200px;

    height: 100px;

    background-color: #aaa;

}

then the layout of the objects:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__7lDcRB2qLIMJuW74CaINjg.png)

if we add `position: fix` to the CSS setting, then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__FLKcjJJ33XfiyPVm__B9mMg.png)

The concept: once with `position: fix` setting, the object will go to another layer and cover the objects next to it. You may think the effect of `fix` alike `float.` The key difference is that the object with `position: fix` **fix** on the **exact position** in the screen where it created even you scroll the website.

We can modify the position with `top,` `left,` `right,` `bottom,` ; for example, with

.whatever{  
  width: 200px;  
  height: 100px;  
  background-color: #aaa;  
  position: fixed;  
  top: 0;  
  left: 0;  
 }

then the position of it will be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__AZp8jKDWvxd0lReEmSW4lQ.png)

If we want it to be in the center, the CSS would be

.whatever{  
  width: 200px;  
  height: 100px;  
  background-color: #aaa;  
  position: fixed;  
  top: 0;  
  left: 0;  
  bottom: 0;  
  right: 0;  
  margin: auto;  
}

then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__VtZ42yQJpScaKUd979DIKQ.png)

### Reference

[**金魚都能懂的網頁設計入門 - 金魚都能懂了你還怕學不會嗎 :: 2019 iT 邦幫忙鐵人賽**  
_金魚都能懂了，你還怕你學不會嗎？ 太多人在學習網頁的路上遭遇到挫折與失敗，這次Amos想利用自身的經驗來分享網頁設計入門的一些眉角，挑戰自己連續發文外，也..._ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/users/20112550/ironman/2072 "https://ithelp.ithome.com.tw/users/20112550/ironman/2072")[](https://ithelp.ithome.com.tw/users/20112550/ironman/2072)