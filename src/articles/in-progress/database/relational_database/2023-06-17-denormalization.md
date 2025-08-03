---
layout: post
title:
description: ''
date: '2023-06-17'
categories:
note:
mathjax:
mermaidJS:
p5JS:
chartJS:
threeJS:
publish: true
---

## Introduction

TBC

## Why?

Denormalization is used to optimize query performance by reducing the number of joins and improving data retrieval speed, especially in read-heavy database systems.

## How?

* Purpose: Optimize query performance
* Concept: Reduce the need for joining multiple tables
* Example
  * Two table: customers and orders.
  * In normalized database, typically having a separate table for customer information and another table for order details, with a foreign key relationship between them.
  * Normalized structure
    * Customers table (customer_id, customer_name, customer_address)
    * Orders table (order_id, order_date, customer_id, total_amount)
  * Denormalized structure (duplicate some customer information in the orders table to avoid joins and improve query performance)
    * Orders table (order_id, order_date, customer_id, total_amount, customer_name, customer_address)
    * By duplicating the customer name and address in the orders table, you eliminate the need to join the tables to retrieve customer details when querying orders, which can result in faster and more efficient queries.

## What?

Try to find a big database example because there must be some slow queries and need to reduce the joins.

## Reference
