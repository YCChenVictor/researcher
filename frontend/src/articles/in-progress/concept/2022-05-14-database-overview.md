---
layout: post
title: database overview
date: '2021-05-14'
categories: database
note: 把文章整理進來這篇
publish:
---

## Introduction

This article describes the problems that database solved.

## Why?

We need a way to store resuable data. Flat file management system is the easiest way a person can find; that is, the computer desktop of a brainless person. DBMS (database management system) has advantages over it as follow:

* [no redundancy](https://en.wikipedia.org/wiki/Data_redundancy): storing of the same **data** in multiple locations
* no inconsistency
* data sharing
* data concurrency
* data searching
* [data integrity]()
* prevent system crashing
* data security
* backup mechanism
* interfaces
* easier maintenance

## How?

### [Data isolation](https://en.wikipedia.org/wiki/Isolation_%28database_systems%29): determines when and how changes made by one operation become **visible** to other concurrent users and systems

### [Concurrency access](https://en.wikipedia.org/wiki/Concurrency_control): The ability to gain admittance to a system or component by more than one user or process

### Consistency

## What?

### types of database

1.  [relational model](https://en.wikipedia.org/wiki/Relational_model): represents data as relations or tables
2.  [network model](https://en.wikipedia.org/wiki/Network_model): viewed as a graph in which object types are **nodes** and relationship types are **arcs**, is **not restricted** to being a hierarchy or [lattice](https://en.wikipedia.org/wiki/Lattice_graph "Lattice graph").
3.  [hierarchical model](https://en.wikipedia.org/wiki/Hierarchical_database_model): represents data as a hierarchical tree structure
4.  [Object-Oriented Model](https://en.wikipedia.org/wiki/Object_database): A [database management system](https://en.wikipedia.org/wiki/Database_management_system "Database management system") in which information is represented in the form of [**objects**](https://en.wikipedia.org/wiki/Object_%28computer_science%29 "Object (computer science)") as used in [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming "Object-oriented programming").

### Database Architecture

Architecture divides database system into individual components that can be **independently** modified, changed, replaced, and altered.

There are three types:

1.  One Tier Architecture (Single Tier Architecture): the client, server, and Database all reside on the **same** machine.
2.  Two Tier Architecture: two machines, one for client, another for server and database.
3.  Three Tier Architecture: three machines, one for client, one for server, one for database. The most popular and safety architecture.

Based on the three tier architecture, the schema as follow:

### Database Schema

There are three levels:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__5BPi61Rq__wIzkcpVfEG9LQ.png)

1.  Internal schema: the physical storage of database
2.  conceptual schema: translation from database to user end
3.  external schema: presentation level

### Relational Data Model in DBMS

#### what is relational model?

Represents the database as a collection of relations; examples:

*   DB2 and Informix Dynamic Server — IBM
*   Oracle and RDB — Oracle
*   SQL Server and Access — Microsoft

#### Concepts

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__FDfTQCOyqDdn8ATt5ciyrw.png)

**Attribute, Tables, Tuple, Degree, Cardinality, Column, Relation key (Primary Key), Relation instance (finite set of tuples), Relation Schema (represents the name of the relation with its attributes**), **Attribute domain (some pre-defined value and scope to attribute)**

To build a valid relation model in DBMS, there will be constraints as follow:

#### Relational Integrity Constraints

A valid relation will have three constraints:

\> Domain Constraints:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__1q6M1DAkvZedeWs6eM__qhA.png)

\> Key Constraints:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__6KynFl2VCk60ZCpKMsf1iw.png)

\> Domain constraints:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__YFp5E6gM8atkP1M6nOb3Tg.png)

\> Referential Integrity Constraints:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__AujUNdlU3j5xT66CU__VeOQ.png)

After we know the regularity of relation model, we should know the operation in relation model.

### Data Type
There are five categories of data type: numeric, date, string, unicode, binary, miscellaneous
1. numeric: int, tinyint, bigint, float, real
2. date: Date, Time, Datetime
3. string: char, varchar, text
4. unicode: nchar, nvarchar, ntext
5. binary: binary, varbinary
6. miscellaneous: clob, blob, xml, cursor, table
#### numeric

### Operations in Relational Model

The basic: insert, delete, modify, select (maps the CRUD of website design)

#### Insert

matches create in website

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__jsdV71wNj9hZWuKQHqAq__g.png)

#### Delete

matches delete in website

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__QbMwvso62vuMkPTHtNMRtQ.png)

#### Modify

matches update in website

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__i5npysNgLSKNtEue8ub5ow.png)

#### Select

matches read in website

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__LSSZ0hKIaScNB__UsPdiY2A.png)

### Reference

[Advantages of DBMS over File system](https://www.geeksforgeeks.org/advantages-of-dbms-over-file-system/)

[DBMS Tutorial: Database Management System Notes
_Database Management System (DBMS) is a collection of programs which enables its users to access a database, manipulate…_www.guru99.com](https://www.guru99.com/dbms-tutorial.html)

[**SQL Data Types**]https://www.journaldev.com/16774/sql-data-types
