---
title: (Tensorflow) How to choose batch size
description: >-
  If batch_size is too small, the model won’t converge because the direction to
  decrease the loss is hard to aim.
date: ''
categories: []
keywords: []
slug: ''
---

[**深度学习中的batch的大小对学习效果有何影响？ - 知乎**  
_如题，在深度学习中，刚入门的小弟一直听闻一个batch中同时训练多个数据可以得到较好的效果，于是小弟在c..._www.zhihu.com](https://www.zhihu.com/question/32673260 "https://www.zhihu.com/question/32673260")[](https://www.zhihu.com/question/32673260)

If batch\_size is too small, the model won’t converge because the direction to decrease the loss is hard to aim.

If batch\_size is too large, the direction to decrease the loss is easy to aim but it may use too much time (too may epoches) to converge and the RAM may not save so much data at once.