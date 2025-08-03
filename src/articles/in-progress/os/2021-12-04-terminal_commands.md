---
layout: post
title: terminal usage
description: ''
date: '2021-12-04'
categories: OS
note: 可以的話盡量就想實例來做
publish:
---

## Introduction

This article describes how to use terminal efficiently.

## Why?

learning by doing and read articles online

## How?

### basic command

* `mkdir`, create directory
  * `mkdir test` will create a test directory in current directory
* `touch`, create file
  * `touch test` will create a file called test in current directory
* `cp`, copy file a file and create a new one
  * `cp test test1` will copy `test` and saved as `test1` in current directory
* `mv`, move file to specific directory
  * `mv test coding` will move `test` to directory, `coding`
* `rm`, remove file
  * `rm test` will remove `test` in current directory
  * `rm -r test` will remove directory, `test`
* `grep`, search specific text in specific text file
  * `grep word example.txt` will search text, `word` in `example.txt` file
* `less`, view the content of a file in one page
  * (to be continued)
* `cat`, view multiple files at the same time
  * (to be continued)
* `awk` (to be continued)
* `tr` (to be continued)
* `sed` (to be continued)
* `tail`, show the last lines of a file
  * (to be continued)
* `head`, show the first lines of a file
  * (to be continued)
* `find`, find a files in computer
  * (to be continued)

pwd, ls, cd (try to get the list in what section)

### internet

#### curl: data transferring between servers

* HTTP GET: `curl https://any_existed_url.com/`
* HTTP GET HEADER: `curl -I https://any_existed_url.com/`
* HTTP POST JSON: `curl -d '{"key": "item"}' -H "Content-Type: application/json" -X POST https://any_existed_url.com/`
* HTTP PUT JSON: `curl -d '{"key": "item"}' -H "Content-Type: application/json" -X PUT https://any_existed_url.com/`
...

#### wget: for file downlaoding from internet

#### ssh: for opening an encrypted secure shell connection

### update

### delete

kill: for terminating a process

## What?

### get texts

To get all wordings in `<h1>` tag of [this](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line),

```bash
# get the texts from the website (curl)
# parse the texts besides <h1> (awk)
```

## Reference

[grep](https://en.wikipedia.org/wiki/Grep)

[awk](https://noootown.com/awk-useful-usage/)

[wget](https://phoenixnap.com/kb/wget-command-with-examples)

[Command line crash course](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line)

[The curl guide to HTTP requests](https://flaviocopes.com/http-curl/)

[Basic Linux Commands for Beginners](https://maker.pro/linux/tutorial/basic-linux-commands-for-beginners)
