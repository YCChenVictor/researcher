---
layout: post
title: '(Git_5) Historical Commits — Change, Merge, Decompose'
date: '2021-02-24T08:11:44.849Z'
categories: git
note: 之後要整理到 basic usage
---

### Change Historical Commits

Given the commits’ message

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__YqxuL__M3708qP86rTYouWQ.png)

Go into git rebase interaction

$ git rebase -i 44e1d7b

Then the vim editor opens with following

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__GFCj5ebMaxWiKFQI3Reolw.png)

Notice, the message in it is upside down compared to git log — oneline

if we want to change `b7ff364,`then change pick into r

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ywGXTGhKcMloGBlMFuuF7Q.png)

Then there is going to be one vim editors pop up for editing b7ff364

Then we can check the log again

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__VnM9UW71J4vKOthX1UoxjA.png)

The sha1 encoding after the changed commit are all changed; for example,

`b7ff364 -> e2ee5fe` and `59384f6 -> 2b32b62`

#### How to recover from the changes

Use reset

$ git reset ORIG\_HEAD --hard

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__me3KDv4xCavxsT1gilK5__w.png)

Then the status goes back

### Merge Historical Commits

Use rebase

$ git rebase -i 44e1d7b

And change the state into s if we want to squeeze it with the last commit

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__gDSo4NH7Q5C9rVB65kHbUA.png)

The following vim pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__nHKxMiQoMFP0U__FLU1qnvA.png)

Then I change the message as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__n__UY__jj8esq4D3NeKYa__Tw.png)

Then the commits

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__bfatvKKSxNawTVMqKsn3Cg.png)

The same, if we want to recover from this changes

$ git reset ORIG\_HEAD --hard

### Decompose historical commits (這邊有問題)

Given the sha1

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__e2pd6qEgZIxPFxcibVWlpQ.png)

Use rebase

$ git rebase -i 44e1d7b

and change the state to e and exit. Then the following

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Ih3fn__fImy3n__QPD07vQXA.png)

Now we are in the rebase mode. If we want to change current commits:

$ git reset HEAD^

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__rq52XnRs3JRXPiIvRgWFbA.png)

Then the status

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__OACMlLO1jHTreSR5nX7PaA.png)

And then we can use add and commit the first commit we want and then the second commit we want. Then use

$ git rebase --continue