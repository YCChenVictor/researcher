---
layout: post
title: "(Git_3)\_.gitignore, Specific, Blame, Rescue, Reset"
date: '2021-02-23T06:01:00.590Z'
categories: git
note: 之後要整理到 basic usage
---

### Ckeckout

For example, if the files are accidentally deleted,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ObPxYY6oAnhMpDxG825bOQ.png)

As you can see, all the html files are deleted

Then the git status:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__saOc__3D4Up__KoxXNr9u7aw.png)

git still knows that the files are delete, then we can use

$ git checkout "file\_name"

to recover the files

### Reset

For example, if we want to change the following commits for one step back

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__grMB9FN__Vx6QVxCaAf5NqQ.png)

$ git reset e92096b\\^

or

$ git reset HEAD\\^

^ means go back to one step

If we want to go back to two steps, we can use ^^

or if we want to go back 100 steps, we can use ~ as follow:

$ git reset HEAD~100

There are **three modes** in reset, **mixed, soft, and hard.** The visualization**:**

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__xX5NalAoAQeM6r9Xwkf3Aw.png)

The process of git: a file modified -> git add -> go into stage/index -> git commit -> go into history

#### Reset — Soft

It only moves HEAD to where we want and the files are still in stage, no need to `git add`again but still need to `git commit`again to go back to the current status

#### Hard

It moves the current status back to the file before modified. The whole commit will be delete

#### Mixed

It moves the status back to the a file modified. We need to `git commit`again to go back before reset

#### The difference between checkout and reset — mixed

Both checkout and reset can recover commits. However, checkout does not change the current commit. It just ‘checkout’ the historical commit. But reset truly go back to the historical commit.

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__z34Jd4cbs27Tr__bfMa77aw.png)

#### How to rescue files after git reset — hard

for the following commits,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__rdMeTrOEzco3ifoX__JP1uw.png)

Then we reset it

$ git reset HEAD~1 --hard

The latest commit is truly disappear

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__fYRfYjRf0ecGH7rS2DnE2Q.png)

To recover the latest commit, given we remember the last index

$ git reset 367e59d --hard

Then the commits will go back

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__mrTroy0sShfmzJq3Mp4IZg.png)

If we forget the index, we can use `reflog`

$ git reflog

to get the historic index

### reference:

[**什麼是 Git？為什麼要學習它？ - 為你自己學 Git | 高見龍**  
_← 上一章：寫在最前面 - 為你自己學 Git！ 下一章：與其它版本控制系統的差異 → 如果你問大部份正在使用 Git 這個工具的人「什麼是 Git」，他們大多可能會回答你「Git 是一種版本控制系統」，專業一點的可能會回答你說「Git…_gitbook.tw](https://gitbook.tw/chapters/introduction/what-is-git.html "https://gitbook.tw/chapters/introduction/what-is-git.html")[](https://gitbook.tw/chapters/introduction/what-is-git.html)

[**What's the difference between git reset --mixed, --soft, and --hard?**  
_When you modify a file in your repository, the change is initially unstaged. In order to commit it, you must stage…_stackoverflow.com](https://stackoverflow.com/questions/3528245/whats-the-difference-between-git-reset-mixed-soft-and-hard "https://stackoverflow.com/questions/3528245/whats-the-difference-between-git-reset-mixed-soft-and-hard")[](https://stackoverflow.com/questions/3528245/whats-the-difference-between-git-reset-mixed-soft-and-hard)

[**What's the difference between "git reset" and "git checkout"?**  
_is specifically about updating the index, moving the HEAD. git checkout is about updating the working tree (to the…_stackoverflow.com](https://stackoverflow.com/questions/3639342/whats-the-difference-between-git-reset-and-git-checkout "https://stackoverflow.com/questions/3639342/whats-the-difference-between-git-reset-and-git-checkout")[](https://stackoverflow.com/questions/3639342/whats-the-difference-between-git-reset-and-git-checkout)