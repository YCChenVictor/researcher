---
title: (Frontend_4) CSS Box-Sizing & Reset
description: ''
date: '2021-03-25T12:57:30.845Z'
categories: []
keywords: []
slug: /@t5204713910/frontend-4-box-sizing-reset-d9c318b782ff
---

### Box-Sizing

#### Introduction

There are two mode in box-sizing: `content-box` and `border-box`

#### Why

With the mode, `border-box` , the full width of box will be width specified by property ,`width` and the width of other properties such as `padding` ,`border` and `margin` will be the same, which can solve the layout problems which usually occur when the customers change their requirements.

#### How & What

For example, for the following

<!DOCTYPE html>  
<html lang="en">  
<head>  
 <meta charset="UTF-8">  
 <meta name="viewport" content="width=device-width, initial-scale=1.0">  
 <title>Document</title>  
</head>

<style>

div{  
     width: 300px;  
     background-color: #aaa;  
     border: 10px solid red;  
     padding: 10px;  
    }  
   
</style>

<body>  
   
 <div>  
  工人中文成熟在我天堂革命白色沒事新手溝通考試諾基亞飯店標，晶片故障結構輸出同時已有出發上述街道提示信息進一步任意才，我真你也反而日誌浪漫人士，論壇地區渠道人大常委會關閉趨勢版權所有組圖搭，怎樣一口深刻承擔讓我例如從而笑容現代提前根，留言會員垃圾家庭蒐集今日操作估計設備舉辦第一章其中構成怎麼，面前任務傢伙事項媒體僅僅轉載青島發佈日期他是家園害怕收益分。  
 </div>

</body>  
</html>

The layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__bPGV__1fQO00alCMVfGfAZQ.png)

Then we specify `box-sizing: content-box` Then the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__bPGV__1fQO00alCMVfGfAZQ.png)

which is the same if we do not specify this property. The `content-box` means the width, 300px is specified to the content, which is the default setting.

Then we can specify `box-sizing: border-box` and the layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__codtWOv97Ov71iIDxHsgiw.png)

As you can see, the full length including padding and border now is 300px. And the width of padding and border remain the same.

### Reset

#### Introduction

With reset, all the appearance of the markups will be the same.

#### Why?

We can use pure CSS to customize all the settings of markups.

#### How to add CSS reset?

With reset, all the appearance of the markups will be the same; for example, create a reset.css file: ([from Meyer](https://meyerweb.com/eric/tools/css/reset/))

/\* http://meyerweb.com/eric/tools/css/reset/     v2.0 | 20110126    License: none (public domain) \*/  

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed,  figure, figcaption, footer, header, hgroup,  menu, nav, output, ruby, section, summary, time, mark, audio, video {    
margin: 0;    
padding: 0;    
border: 0;    
font-size: 100%;    
font: inherit;   
vertical-align: baseline;   
} 

/\* HTML5 display-role reset for older browsers \*/ article, aside, details, figcaption, figure,  footer, header, hgroup, menu, nav, section {   
display: block;   
}   
body {    
line-height: 1;   
}   
ol, ul {  
list-style: none;   
}   
blockquote, q {    
quotes: none;   
}   
blockquote:before, blockquote:after, q:before, q:after {    
content: '';  content: none;   
}   
table {  
border-collapse: collapse;  border-spacing: 0;   
}

and add a line into html file

<link rel="stylesheet" href="reset.css">

Then the html file:

<!DOCTYPE html>  
<html lang="en">  
<head>  
 <meta charset="UTF-8">  
 <meta name="viewport" content="width=device-width, initial-scale=1.0">  
 <title>Document</title>  
 <link rel="stylesheet" href="reset.css">  
</head>  
<body>  
 <h1>主標題</h1>  
 <h2>副標題</h2>  
 <h3>小標題</h3>  
 <p>內文內文內文<strong>粗體內文</strong><em>斜體內文</em>內文內文內文內文內文內文內文內文內文內文內文</p>  
 <ul>  
  <li>無序清單</li>  
  <li>無序清單</li>  
  <li>無序清單</li>  
  <li>無序清單</li>  
  <li>無序清單</li>  
 </ul>  
 <ol>  
  <li>有序清單</li>  
  <li>有序清單</li>  
  <li>有序清單</li>  
  <li>有序清單</li>  
  <li>有序清單</li>  
 </ol>  
 <nav>這是導覽列</nav>  
 <a href="[https://www.google.com.tw/](https://www.google.com.tw/)">這是超連結</a>  
 <figure>  
  <img src="./example.png" alt="要是圖片失效會出現的一段文字">  
  <figcaption>這是這個圖片的註解</figcaption>  
 </figure>  
 <table border="2"> <!-- border 代表邊框的寬度 -->  
  <!-- table 會先從橫列開始寫，在開始寫直欄 -->  
  <tr>  
   <td>data</td>  
      <td>data</td>  
      <td>data</td>  
     </tr>  
  <tr>  
   <td>data</td>  
      <td>data</td>  
      <td>data</td>  
     </tr>  
  <tr>  
   <td>data</td>  
      <td>data</td>  
      <td>data</td>  
     </tr>  
 </table>  
</body>  
</html>

#### What is the layout?

layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__wJ5OMK__Kc5EgbjbnhEXkxQ.png)

,meaning all the effect disappeared.

#### [Normalize.css](https://necolas.github.io/normalize.css/)

Another solution to reset the layout and appearance of html.

### Reference

[**金魚都能懂的網頁設計入門 - 金魚都能懂了你還怕學不會嗎 :: 2019 iT 邦幫忙鐵人賽**  
_金魚都能懂了，你還怕你學不會嗎？ 太多人在學習網頁的路上遭遇到挫折與失敗，這次Amos想利用自身的經驗來分享網頁設計入門的一些眉角，挑戰自己連續發文外，也..._ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/users/20112550/ironman/2072 "https://ithelp.ithome.com.tw/users/20112550/ironman/2072")[](https://ithelp.ithome.com.tw/users/20112550/ironman/2072)