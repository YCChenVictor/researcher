---
layout: post
title: (Git_7) Private Information, Remove a File in Git, Commit in other branch, Github
date: '2021-02-25T07:06:05.067Z'
categories: git
note: 這個要特別寫一篇
---

## Remove Private Information

**After removing the private information from a file** such that
```
password: 123
```
to
```
password: ENV["password"]
```
there are two method to solve this problem.
### First Method: delete whole .git file

Although this method discard the whole history, it still works

### Second Method: filter-branch

For example, if the private information exists in aaa.txt. We can
```
$ git filter-branch --tree-filter "rm aaa.txt" HEAD
```
and then we can save this file with correct information again and commit it again. 
This command will remove all the aaa.txt file in each commit and the sha1 saved in refs in .git

If we regret the filter-branch process, we can use
```
$ git reset refs/original/refs/heads/master --hard
``` 
It will recover the sha1 value before filter-branch

### How to truly remove a file from git

After filter-branch, we still can use refs to recover the file, so
```
$ rm .git/refs/original/refs/heads/master
```
It removes this file, so that we cannot recover from it.

Then delete reflog, which stores all the commits sha-1 states
```
$ git reflog expire --all --expire=now
```
The above code advances the expire date to now

Then delete all deleted commits with
```
$ git gc --prune=now
```
Check any miscellaneous
```
$ git fsck
```
If empty, then we are done

# to be continued

### What if we want commit in other branch

Given there are two branches, master and second, as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ho8PO4iiDP9crllA__GvLdg.png)
![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__MQZVe8jzapH__gUXmxAv0__A.png)

If we want to copy `217e18e` in second branch upon`7311241` in master, then in master branch, cherry-pick `217e18e`

$ git cherry-pick 217e18e

and the commits in master

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__x9aVsG4aqMcGxgsJezL8wg.png)

### Reference:

[**什麼是 Git？為什麼要學習它?**](https://gitbook.tw/chapters/introduction/what-is-git.html "https://gitbook.tw/chapters/introduction/what-is-git.html")