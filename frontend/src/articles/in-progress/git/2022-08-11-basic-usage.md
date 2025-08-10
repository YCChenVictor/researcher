---
layout: post
title: basic usage
description: ''
date: '2022-08-11'
categories: git
note: 再從 to be continued 繼續，要把其他文章整理進來，去看其他文章的 note
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

This article describes the basic usage of git

## Why?

Version control system helps us to track changes and why key decision were made along the way. Git is the most popular version control system.

## How?

### install git

* install: `brew install git`
* where it is: `which git`
* version: `git --version`

### setting

* setting: `git config --list`
* change local setting: `git config --local user.email "xxx@yyy.com"`
* change global setting: `git config --global user.email "xxx@yyy.com"`

### init

* initialize: `git init`

### remove git

* git: `rm -rf .git`
* untracked file: `git clean -fX`

### process

* status (details below): working -> `git add` -> staged -> `git commit` -> history -> view
* find
  * keyword in commits: `git log --oneline --grep='the_message_you_want_to_find'`
  * commits in a time frame: `git log --online --since="9am" --until="12am"`
  * commits of specific file: `git log the_specific_file.html`
  * historical changes of a specific file: `git log -p the_specific_file.html`
* remove a file: `git rm --cached the_file_you_want_to_remove.html`
* modify message: checkout to the commit (`gco commit_sha`) -> amend the message of this commit (`git commit --amend`)
* add files
  * to last commit (`git add` -> `git commit --amend --no-edit`)
  * add empty directory (`touch .gitkeep`)
* ignore files (details below): (.gitignore)
* check author: `git blame`
* checkout: (to be continued)

### status

check status (`git status`) and the message

<img class="w-3/4" src="/assets/img/1__Pv1briXOtMvI7tU6__knn3g.png">

create a file (`echo "hello.git" > welcome.html`) and check status again (`git status`)

<img class="w-3/4" src="/assets/img/1__7JZv6zcN9KPNz6Y3XdQM6w.png">

There is a untracked file now, `welcome.html`, in git status

Add file to temp (`git add welcome.html`) then check status (`git status`)

<img class="w-3/4" src="/assets/img/1__5fKmVmoT6k30KoRtrfd69w.png">

store it directly without vim (`git commit -m "the message to note to this commit"`)

or open vim to type in message we want (`git commit`)

After all the works above, view the historical commits with (`git log`):

<img class="w-3/4" src="/assets/img/1__xM9A96o__hrRKduVcs1vPCA.png">

or `git log --oneline --graph` for oneline messages

<img class="w-3/4" src="/assets/img/1__HP4y4QxFD2OVofPPrZgcAA.png">

### ignore

Create a file called `.gitignore` on the same level of `.git` created by initialization of git and input the file name in it

```bash
# in .gitignore
filename_to_ignore.xxx

# or ignore all the file with format .xxx with
*.xxx
```

### check the branches

* locally
  ```bash
  git branch | grep -i xxx
  ```
* all
  ```bash
  git branch --all | grep -i xxx
  ```

## Reference

[什麼是 Git？為什麼要學習它？ - 為你自己學 Git](https://gitbook.tw/chapters/introduction/what-is-git.html)
