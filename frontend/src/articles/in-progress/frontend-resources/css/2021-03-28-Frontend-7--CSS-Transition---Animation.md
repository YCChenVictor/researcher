---
layout: post
title: (CSS_7) Transition & Animation
description: ''
date: '2021-03-28T08:13:52.813Z'
states: unmodified
categories:
publish:
---

### Transition

Suppose we have the following setting:

<a href="#" class="btn">send</a>

with CSS

.btn{  
        display: inline-block;  
        padding: 10px 20px;  
        background-color: red;  
        color: black;  
 }  
 .btn:hover{  
        background-color: green;  
 }

Then the color before and after mouse touching

before:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__pvuq71JaMUo6r__pMGx9CRA.png)

after:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__b4JMDilP6Fvev6__kJZAJdw.png)

If we want to have the effect that the color of the button gradually become green from red, then we should add `transition` in the `.btn` as follow

.btn{  
        display: inline-block;  
        padding: 10px 20px;  
        background-color: red;  
        color: black;  
        transition: all 1s 0s ease;  
 }  
.btn:hover{  
        background-color: green;  
 }

The order of the arguments of `transition` :

transition: `<property> <duration> <delay> <time-function>;`

meaning it is going to wait `<delay>` to let the specific `<property>` in `.btn:hover` to have effect and the duration time is `<duration>` . The `<time-function>` is how the interval of duration time set up.

### Animation

Suppose we have the following setting:

<div class="box"></div>

with CSS

.box{  
     width: 200px;  
     height: 200px;  
     border-radius: 50%;  
     background-color: red;  
    }

Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__XqJJR8297T__pitz50BJ2XA.png)

If we add the frame, the script of the animation as follow

.box{  
     width: 200px;  
     height: 200px;  
     border-radius: 50%;  
     background-color: red;  
     animation: identifier 2s 2s;  
    }

[@keyframes](http://twitter.com/keyframes "Twitter profile for @keyframes") identifier {  
     0% {border-radius: 50%; }  
     100% {border-radius: 0%; }  
    }

There would be animation.

### Reference

[**金魚都能懂的網頁設計入門 - 金魚都能懂了你還怕學不會嗎 :: 2019 iT 邦幫忙鐵人賽**  
_金魚都能懂了，你還怕你學不會嗎？ 太多人在學習網頁的路上遭遇到挫折與失敗，這次Amos想利用自身的經驗來分享網頁設計入門的一些眉角，挑戰自己連續發文外，也..._ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/users/20112550/ironman/2072 "https://ithelp.ithome.com.tw/users/20112550/ironman/2072")[](https://ithelp.ithome.com.tw/users/20112550/ironman/2072)