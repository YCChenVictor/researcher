---
title: (Frontend_6) CSS Relative & Absolute
description: ''
date: '2021-03-28T06:58:40.770Z'
categories: []
keywords: []
slug: /@t5204713910/frontend-6-css-relative-absolute-5b1833da1081
---

### Relative

#### Preparation

Create items within unordered list:

ul>li\*50.item${$}

with CSS

li{  
     display: inline-block;  
     width: 100px;  
     height: 100px;  
     background-color: #aaa;  
    }

and reseter

<link rel="stylesheet" href="reset.css">

Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__cMTQijLVFdHrgNrPhSpUDA.png)

However, the characteristic of `inline-block` , means the items are block in the line; as a result, there would be space in between the blocks in the line. To solve this problem, we can specify `font-size: 0px` in `ul` and any `font-size`in `li` . Then the layout:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__k10__S7npMhyQ54PtdzqnXQ.png)

Add margin to the blocks

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__6KoxGkT__XZM7MLR__XJSJkw.png)

#### The effect of relative

**Position**

For example if we want the 20th block to be on right hand side **relatively** to other blocks, then we add CSS to `.item20` with `.position: relative` and `left: 50px` . The meaning of this CSS setting is how relatively it is going to be to the wrapper on the lower layer.

.item20 {  
        background-color: #f00;  
        position: relative;  
        left: 50px;  
        opacity: 0.5;  
    }

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__oaBq0d30v5S8CMBIPO__ZoA.png)

Notice, the concept of **relative** is how relatively shift from original position; for example, if we change the total width of the layout, then

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__rc0bBNHDU8xFVTEWd2dKJA.png)

**Cover (z-index)**

In the above layout, if we remove `opacity: 0.5`

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__MFAF4rimfeGZn8__zYSZpcA.png)

As you can see, the one (item20) with `.position: relative` cover item21. What if we want item21 to cover item20? we can specify `z-index: 1` as follow:

.item21 {  
        position: relative;  
        z-index: 1;  
    }

Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__THNh8Jueyvtaca7uOBBgkw.png)

### Absolute

#### Preparation

Create following divisions

<div class="a"> a  
     <div class="b"> b  
      <div class="c"> c  
      </div>  
     </div>  
 </div>

with CSS

div{  
  padding: 40px;  
  border: 6px solid #f00;  
  font-size: 24px;  
 }

and add multiple paragraph to extend the `<body>`

p\*30>lorem

Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__sVbOfGJNTeT9NJMTbYSQ9w.png)

#### How object with `.position: absolute` works?

The abstract concept: the **object with absolute** will be positioned relatively to the **object with relative** only **once**.

We add CSS to c:

.c {  
  position: absolute;  
  border: 6px solid #aaa;  
}

Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__oEL2Fo2Tf88XcnTGvzPIgw.png)

As you can see, it looks like c being placed on the topper layer of any other objects in the layout and `<div class="b">` cannot capture it.

If we set the position of b as relative:

.b {  
  position: relative;  
 }

and specify the position of c:

.c {  
  position: absolute;  
  border: 6px solid #aaa;  
  top: 0px;  
  left: 0px;  
 }

Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Hy__JzNTEi3SLB__gxWotpjA.png)

c is now on the left and top of b.

#### Why?

The objects with position setting will be put on upper layer **once**. And then how these objects being positioned is determined by the position setting of CSS; for example, `position: relative` means it is going to be placed relatively to the wrapper on the lower layer. `position: absolute` means it is going to be placed absolutely to the wrapper on the lower layer and because the wrapper is still on the lower layer, the object with `position: absolute` will be positioned absolutely to any object on the lower layer, meaning it is going to be on the most left and most right position of the layout if we specify

.c {  
  position: absolute;  
  border: 6px solid #aaa;  
  top: 0px;  
  left: 0px;  
 }

only

and without

.b {  
  position: relative;  
 }

And the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__pE6czbF32VxCwFG15TGKCw.png)

Once we add

.b {  
  position: relative;  
 }

Then b will be position on the upper layer, which is the same as c; as a result, c will be position absolutely to any object on the lower layer but not b which is on the upper layer, so the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__9vwI98MLeBSrqqo29GPaIw.png)

As you can see, c now is placed on the left and top of b at most.

If we want c to be placed relatively to a, we can specify

.a {  
  position: relative;  
 }

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____Kgq72__1Va3nvNytZVXPgA.png)

#### Once

The effect is only once; for example, if we specify `position: absolute` to a without `position: relative` to its wrapper, then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Z2Sdyr8qPbry3hJJxHIzaw.png)

Once we scroll down the web page, c would not move accordingly (because it only set **once**).

#### Practical Practice

Suppose we have following setting, a wrap with three items with image, title, description

<div class="wrap">  
        <div class="item">  
         <img src="[https://picsum.photos/300/200/?/random=1](https://picsum.photos/300/200/?/random=1)" alt="">  
         <h1>title</h1>  
         <p>Lorem ipsum dolor sit amet consectetur adipisicing, elit. Id laborum sit, ipsam ea distinctio, voluptates est, officia temporibus molestiae totam illo, deserunt. Aliquid iste odit, dolores odio quos libero laudantium.</p>  
        </div>  
        <div class="item">  
         <img src="[https://picsum.photos/300/200/?/random=2](https://picsum.photos/300/200/?/random=2)" alt="">  
         <h1>title</h1>  
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, sed! Nemo quae, impedit velit fugit placeat corrupti expedita nam quisquam, atque. Placeat, exercitationem! Optio dolor expedita alias soluta at, laborum.</p>  
        </div>  
        <div class="item">  
         <img src="[https://picsum.photos/300/200/?/random=3](https://picsum.photos/300/200/?/random=3)" alt="">  
         <h1>title</h1>  
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nihil officiis, distinctio illum itaque alias suscipit tempora quibusdam! Ab delectus corporis eos impedit aperiam quisquam illum vel porro consequuntur dolorem!</p>  
        </div>  
    </div>

and the CSS

.wrap{  
     width: 960px;  
        display: flex;  
        margin: auto;  
    }

Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__U1wCXpLmq13md0__mRTAYbw.png)

A little bit ugly but it’s enough for demonstration. If we want to add a tag to emphasize these pictures as follow:

html:

<div class="wrap">  
        <div class="item">  
         <div class="tab">Hot</div>  
         <img src="[https://picsum.photos/300/200/?/random=1](https://picsum.photos/300/200/?/random=1)" alt="">  
         <h1>title</h1>  
         <p>Lorem ipsum dolor sit amet consectetur adipisicing, elit. Id laborum sit, ipsam ea distinctio, voluptates est, officia temporibus molestiae totam illo, deserunt. Aliquid iste odit, dolores odio quos libero laudantium.</p>  
        </div>  
        <div class="item">  
         <div class="tab">Hot</div>  
         <img src="[https://picsum.photos/300/200/?/random=2](https://picsum.photos/300/200/?/random=2)" alt="">  
         <h1>title</h1>  
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, sed! Nemo quae, impedit velit fugit placeat corrupti expedita nam quisquam, atque. Placeat, exercitationem! Optio dolor expedita alias soluta at, laborum.</p>  
        </div>  
        <div class="item">  
         <div class="tab">Hot</div>  
         <img src="[https://picsum.photos/300/200/?/random=3](https://picsum.photos/300/200/?/random=3)" alt="">  
         <h1>title</h1>  
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nihil officiis, distinctio illum itaque alias suscipit tempora quibusdam! Ab delectus corporis eos impedit aperiam quisquam illum vel porro consequuntur dolorem!</p>  
        </div>  
    </div>

and CSS:

.wrap{  
     width: 960px;  
        display: flex;  
        margin: auto;  
    }

.item .tab{  
        background-color: red;  
        color: #fff;  
        position: absolute;  
    }

Then the layout

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__hb2VoBEbPHsd8Aw8uHzwLA.png)

As you can see, now hot is on the upper-left of the image, which is what we want; however, if we add padding, margin, border to the items

.item {  
  width: 300px;  
  margin: 10px;  
  border: 1px solid #aaa;  
  padding: 10px;  
}

Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__PJ18Ax7__PT7qDcyWF2U02w.png)

Ok~ It still looks fine but what if we want the tag to be put on the outer border? The intuitive way is to set up the left and top distance to the tag as follow:

.item .tab{  
        background-color: red;  
        color: #fff;  
        position: absolute;  
        left: 0px;  
        top: 0px;  
}

Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__yVmCa__tNNXX5yVjnWtA9sg.png)

As you can see, it is on the incorrect position. With the logic above, we should add `position: relative` to the upper `<div>` as follow

.item {  
        width: 300px;  
        margin: 10px;  
        border: 1px solid #aaa;  
        padding: 10px;  
        position: relative;

    }

Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__OZH43H2cXT2MTchNCjhsJA.png)

### Reference

[**金魚都能懂的網頁設計入門 - 金魚都能懂了你還怕學不會嗎 :: 2019 iT 邦幫忙鐵人賽**  
_金魚都能懂了，你還怕你學不會嗎？ 太多人在學習網頁的路上遭遇到挫折與失敗，這次Amos想利用自身的經驗來分享網頁設計入門的一些眉角，挑戰自己連續發文外，也..._ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/users/20112550/ironman/2072 "https://ithelp.ithome.com.tw/users/20112550/ironman/2072")[](https://ithelp.ithome.com.tw/users/20112550/ironman/2072)