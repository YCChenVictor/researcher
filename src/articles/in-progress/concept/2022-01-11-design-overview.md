---
layout: post
title: design overview
description: ''
date: '2022-01-11'
categories: mindset
note: Actually, this design progress fits to any form of product, not just software
mermaid: true
---

## Introduction

How to turn real world idea into software? We need concepts of design. We need pattern for general, reusable solution to common problem, ...etc

## Why?

1. Speed up the development process
2. Obtain skills to get into a senior role
3. create own Apps

## How?

The basic steps would be as follow:

1. compose as many user stories about 'only one' scenario. You can add other scenarios after you complete the development and the template as follow: `As a < type of user >, I want < some goal > so that < some reason >.`
2. write specifications based on the user stories by expanding it and should have lots of details, assuming reader knows nothing, lots of words
3. design UI based on the specifications
4. define the objects and the relationships between them in this system
5. compose the classes based on the relationships such `belongs_to` & `has_one`, ... and create needed classes for these relationships
6. define the attributes of an object in the classes so that we can define the columns
7. define the methods in the objects
8. draw the relationship of these classes and make sure theses relationships are super flexible
9. just do it in the fastest way. Don't worry about the language. Based on the API structures, we really do not worry about it. We can always modify it later.

## What?

User story: As a person who like to sing, I want key recognition through sounds so that I can compose it later.

Specification: As a person like to sing, after I upload my recorded mp3, and click 'recognition' button, I want key recognition through sounds and convert into music sheet so that I can compose it later through editor.

Based on the specification, on the webpage, we should have a component to upload and then it should start to convert and a component to show the music sheet. I am going to copy some free frontend design for it [mui](https://mui.com/)

Based on the specification, we can start to define the classes. We need classes and relationships as follow:

<div class="mermaid w-1/3">
  classDiagram
    User --> Record : has many

    User : firstName:string
    User : lastName:string
    User : email:string
    User : dateOfBirth:date
    User : age()
    
    Record --> Sheet : has many
  
    Record : name:string
    Record : file:BLOB
    Record : converted:boolean
  
    Sheet : file:TEXT
</div>

## Reference

[Software Design Tutorial #1 - Software Engineering & Software Architecture](https://www.youtube.com/watch?v=FLtqAi7WNBY)

[How To Write A Project Specification](https://www.youtube.com/watch?v=MCXi4KtRTG0)
