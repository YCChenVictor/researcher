---
layout: post
title: relational algebra
date: '2021-03-17T07:54:46.016Z'
categories: database
status: to be continued
note: 之後要整合到後來的文章中
publish:
---

## Introduction

A theory using algebraic structure with well-founded semantics for data modeling. DBMS defines the data queries on this theory.

## Why?

With relational algebra, we can define the query function completely. We need a systematic way for query language designing.

## The examples:

categories: unary relational, binary relational, relational algebra from set theory.

### Unary Relational (SELECT, PROJECT, RENAME)

The unary relational methods suit for **A** table; for example, selecting data from a table, selecting columns from a table, rename data in a table

#### SELECT (symbol: σ)

`SELECT` is used for selecting tuple from a table. The formula:
```
σ_t^(T)
```
means
```
σ_(topic = "Database")^(Tutorials)
```
means
```
SELECT tuples from Tutorials where topic = Database
```
#### PROJECT (symbol: π)

`PROJECT` is used for defining a relation that contains a vertical **subset** of Relation. The formula:
```
Π_t1, t2^(T)
```
means
```
Π_(CustomerName, Status)^(Customers)
```
means
```
SELECT the columns FROM Customers WHERE column_name = CustomerName, Status
```
#### RENAME (symbol: ρ)
```
ρ (a/b)R
```
means
```
rename attribute b of relation by a
```
### Relational Algebra from Set Theory (UNION, INTERSECTION, DIFFERENCE, CARTESIAN PRODUCT)

#### UNION (υ) (**or**)
With Following A and B tables
<img src="/assets/img/1__n7MDZgQbFzOy3GpkT4Nqfg.png" alt="">

A υ B means
<img src="/assets/img/1__2V4rsTtckQPSLHuMCKJMig.png" alt="">

#### INTERSECTION

A ∩ B means
<img src="/assets/img/1__Nz3RuX1h7Pd2rU4naGFcKw.png" alt="">

#### DIFFERENCE

A — B means
<img src="/assets/img/1__9baB1y__0Haqm33FieJuyRQ.png" alt="">

#### CARTESIAN PRODUCT

for example,

A = (x, y, z); B = (1, 2, 3), then A X B =
<img src="/assets/img/1__ZFU47Skd1nOI2Zp2Hy3YGw.png" alt="">

for example,
```
σ_(column 2 = '1')^(A X B)
```
means 
```
SELECT tuples from (A X B) where column 2 = '1'
```
;as a result, the result should be
<img src="/assets/img/1__cHWfh7Qcy765CRhhRxTe2w.png" alt="">

### Binary Relational (Inner Join & Otter Join)

#### Inner Join (Theta, EQUI, Natural)

1. Theta Join: the general case of JOIN operation
```
A ⋈θ B
```
for example,
```
A ⋈_(A.column 2 >  B.column 2)^(B)
```
means finding tuples from A where the value in column 2 of A is bigger than the value in column 2 of B.
<img src="/assets/img/1__uz5XWoYAQmEZXy1CWCTjtA.png" alt="">

2. EQUI Join: when theta join use equal sign
```
A ⋈_(A.column 2 =  B.column 2)(B)
```
means finding the tuples from A where the value in column 2 of A = the value in column 2 of B.

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__R__xEPO7HpukrcUJOH6ihdw.png)

3. Natural Join: SELECT all the tuples where both table have same attribute; for example,
<img src="/assets/img/1__zO5NTcl9igOHbeNVva__gUg.png" alt="">

#### Otter Join (Left, Right, Full)

otter join returns not only the intersection of both table, but also the other.

1.  Left Join

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Pmx__LY1VFf__id6eym38MiQ.png)

for example,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__iAePBfyy9k88lTBU3SbymA.png)

Then left join will be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ljglGmgIkK__Kqw4jCjbxPA.png)

2. Right Join

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__oScxW0M4fNNm3Wm2UDFwTg.png)

3. Full Join

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__V____gnF8tut4nOTVu1fgWAg.png)

### reference

[https://www.guru99.com/relational-algebra-dbms.html](https://www.guru99.com/relational-algebra-dbms.html)

[**Relational algebra**  
_In database theory, relational algebra is a theory that uses algebraic structures with a well-founded semantics for…_en.wikipedia.org](https://en.wikipedia.org/wiki/Relational_algebra "https://en.wikipedia.org/wiki/Relational_algebra")[](https://en.wikipedia.org/wiki/Relational_algebra)

[**SQL INNER JOIN - w3resource**  
_The INNER JOIN selects all rows from both participating tables as long as there is a match between the columns. An SQL…_www.w3resource.com](https://www.w3resource.com/sql/joins/perform-an-inner-join.php "https://www.w3resource.com/sql/joins/perform-an-inner-join.php")[](https://www.w3resource.com/sql/joins/perform-an-inner-join.php)