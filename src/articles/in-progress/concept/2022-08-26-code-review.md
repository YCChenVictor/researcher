---
layout: post
title:
description: ''
date: '2022-08-26'
categories: mindset
note: 理論上，我要能看 introduction 就可以做好 code review。之後再繼續 (https://google.github.io/eng-practices/review/reviewer/looking-for.html)
mathjax:
mermaid: true
p5:
threeJS:
anchor:
publish: true
---

## Introduction

<div class="mermaid">
graph LR
  id1(improve codebase)

  id1(improve<br>codebase) --> id2(design)
  id1(improve<br>codebase) --> id3(functionality)
  id1(improve<br>codebase) --> id4(complexity)
  id1(improve<br>codebase) --> id5(tests)
  id1(improve<br>codebase) --> id6(styles)

  id2(design) --> id7(among PR)
  id2(design) --> id8(third party?)
  id2(design) --> id9(codebase)
  id2(design) --> id10(timing)
</div>

* design
  * among PR: the interactions in between this PR makes sense
  * third party?: this PR imports third party code or not? If yes, does it follow the best design for integration?
  * codebase: does it integrates will with codebase?
  * timing: if we merge it, what will it affect?

## Why?

focus on why we need it

## How?

The steps

## What?

Give examples

## Reference

[How to do a code review](https://google.github.io/eng-practices/review/reviewer/)
