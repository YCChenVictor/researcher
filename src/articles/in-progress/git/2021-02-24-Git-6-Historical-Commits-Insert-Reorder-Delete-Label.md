---
layout: post
title: '(Git_6) Historical Commits — Insert, Reorder, Delete; Label'
description: Insert commit
date: '2021-02-24T09:55:43.708Z'
categories: git
note: 之後要整理到 basic usage
---

### Insert commits

Given following commits

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__jXmFMUNhyedRZjSxJsmOSw.png)

we are going to insert a commit between 62a13e6 and 1571341

use rebase

$ git rebase -i 44e1d7b

Change the head to the previous commit, so we need to edit the first commit

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__9kOtjzhqyaY3__1R6IF2vFA.png)

Now the HEAD is on the first commit

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__WBEw4K1SEYv6lp3pKOVL9Q.png)

Then let’s do some changes

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__9yTCymBMZsR81XpprlHhHQ.png)

There is another file, insert.html, created. Then add and commit it

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__qK6kceDaC8Lv4IuWnPGWeg.png)

Then continue it

$ git rebase --continue

Then the insertion success

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__0B8C2lPt5la83pkogxkdAQ.png)

### Reorder Commits

Given the commits

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Tn3s5VBr__OwUN2WwfzxqZA.png)

$ git rebase -i 44e1d7b

The vim editor opens and just change the commit message as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__hFwbycRyXMNxhwGT5__Dqpw.png)

which exchange the position, `ba5195a & 294b9ff`

The order of commits

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____CpQpdeFn469egYw44l8__g.png)

### Delete Commit

Given following commits

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__N0SQ5PVDhSyCsnEXyhoBag.png)

If we want to delete `7a57d64`

$ git rebase -i 44e1d7b

just directly remove the commit we want to delete

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__U534WNa9y6I2zhLU1E011g.png)

Then the commits would be as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__s4csT2XHo0WTvFLBM2PTuQ.png)

### Label

#### Why

Because sha1 encoding is too hard to memorize, so usually we will use label to mark the important commits such as the first runnable version …etc

for example, if we wan to give a ‘beta’ label to `62a13e6,` then we can

$ git tag beta 62a13e6

Then there will be a tag on `62a13e6`

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__mmcxBa16gUHmBDiMwg3wiQ.png)

We can see the information of tag with

$ git show beta

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ZtJdvxcpSsw8U5c__OjRf9w.png)

if we want to remove the tag

$ git tag -d beta

### reference

[**什麼是 Git？為什麼要學習它？ - 為你自己學 Git | 高見龍**  
_← 上一章：寫在最前面 - 為你自己學 Git！ 下一章：與其它版本控制系統的差異 → 如果你問大部份正在使用 Git 這個工具的人「什麼是 Git」，他們大多可能會回答你「Git 是一種版本控制系統」，專業一點的可能會回答你說「Git…_gitbook.tw](https://gitbook.tw/chapters/introduction/what-is-git.html "https://gitbook.tw/chapters/introduction/what-is-git.html")[](https://gitbook.tw/chapters/introduction/what-is-git.html)