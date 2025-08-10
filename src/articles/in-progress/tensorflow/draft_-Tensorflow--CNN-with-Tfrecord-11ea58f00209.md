---
title: (Tensorflow) CNN with Tfrecord
description: 'reference: https://dotblogs.com.tw/shaynling/2018/12/25/160934'
date: ''
categories: []
keywords: []
slug: ''
---

reference: [https://dotblogs.com.tw/shaynling/2018/12/25/160934](https://dotblogs.com.tw/shaynling/2018/12/25/160934)

CNN means ‘Convolution Neural Network’. Convolution means 「滑動、相乘再相加」

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__lmZEJbUPfUeqHlwg3ETeug.gif)

### Basic Explanation:

tf.nn.conv2d(input, filter, strides, padding, use\_cudnn\_on\_gpu=True, data\_format=’NHWC’, dilations=\[1, 1, 1, 1\], name=None )

#### **Variable explanation:**

**input & data\_format：**

The data type should be float32 or float64. The format defined by data\_format parameters.  
The default data\_format = ‘NHWC’, which means \[ batch, height, width, channels \]；  
If we change it into data\_format = ‘NCHW’, the format will be \[ batch, channels, height, width \]

batch： the number of picture in each batch  
height： the height of a picture  
width： the width of a picture  
channels：the number of picture pass

**filter：**

the setting of the convolution, the datatype should be the same as input data. The format would be \[filter\_height, filter\_width, in\_channels, out\_channels\]

filter\_height： The height of filter  
filter\_width： The width of filter  
in\_channels： the number of picture input  
out\_channels：the number of picture output

#### strides：

example: strides = \[1, 2, 2, 1\] means the convolution moves 2 steps on height and width respectively.

The first and the last elements of strides must be 1 and the length must be 4.

**padding：**

直接舉例說明，假設 input width = 13；filter width = 6；stride = 5。

“ VALID “ = 卷積時，不做任何填充，最右邊 column 與最下面 row 會被丟棄。對於 “ VALID “ 輸出的形狀是 ceil\[ (I+F-1)/S \]，也就是 input 的長度 + filter 的長度 — 1 再除以 Stride 值，最後無條件進位。

```
inputs:         1  2  3  4  5  6  7  8  9  10 11 (12 13)               |________________|                dropped                              |_________________|
```

“ SAME “ = 嘗試向左和向右均勻填充，但如果要添加的列數是奇數，它將向右添加額外的列，如本例中的情況。對於 “SAME “ 輸出的形狀是 ceil\[ I / S \]，也就是 input 的長度除以 Stride 值，最後無條件進位。

```
pad|                                      |padinputs:      0 |1  2  3  4  5  6  7  8  9  10 11 12 13|0  0            |________________|                           |_________________|                                          |________________|
```

#### 5\. use\_cudnn\_on\_gpu：

boolean, whether to use GPU to train model

#### 6\. dilations：

卷積核擴張參數，資料格式為 List int ，長度為 4 的一維張量，每一個值與 input 各維度對應，其格式如同 strides，即第一個和第四個值必定為 1 ，即 dilations\[0\] = dilations\[3\] = 1。

該參數會影響到卷積核的大小，預設為 dilations = \[1, 1, 1, 1\] ，什麼事都照舊。若 dilations = \[1, k, k, 1\]，則卷積核中的每個元素都會有一個 k-1 大小的空格。

很抽象嗎？沒關係，夏恩可以舉例：若原本的卷積核為 3x3 的一矩陣，如下：

```
filter = [ 1, 1, 1,           1, 1, 1,           1, 1, 1 ]
```

當我們把 dilations 改為 \[1, 2, 2, 1\]，此時 filter 的形狀如下：

```
filter = [ 1, 0, 1, 0, 1,           0, 0, 0, 0, 0,           1, 0, 1, 0, 1,           0, 0, 0, 0, 0,           1, 0, 1, 0, 1, ]
```

使用 dilations 的目的是為了增加卷積核的感受野，降低資料損失。  
若沒有特別想針對這一塊進行優化的話，建議使用預設值就好。

#### 7\. name

這個參數其實可以不用管它，其功能就是幫這個卷積運算子取個名字而已。