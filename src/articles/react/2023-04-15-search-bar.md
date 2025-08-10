---
layout: post
title:
description: ''
date: '2023-04-15'
categories: react
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

This article describes how to create search bar in react.

## Why?

I want to create one in my blog.

## How?

### init

```JSX
import React, { useState } from "react";

function SearchBar({ items }) {
  const [query, setQuery] = useState("");
  
  function handleInputChange(event) {
    setQuery(event.target.value);
  }
  
  function searchItems() {
    return items.filter(item => {
      const itemText = `${item.title} ${item.description}`.toLowerCase();
      const searchText = query.toLowerCase();
      
      return itemText.includes(searchText); // the core
    });
  }
  
  const searchResults = searchItems();
  
  return (
    <div>
      <input type="text" placeholder="Search..." value={query} onChange={handleInputChange} />
      
      <ul>
        {searchResults.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
```

and use the search bar as follow:

```JSX
import React from "react";
import SearchBar from "./SearchBar";

const items = [
  { id: 1, title: "Item 1", description: "This is the first item" },
  { id: 2, title: "Item 2", description: "This is the second item" },
  { id: 3, title: "Item 3", description: "This is the third item" }
];

function App() {
  return (
    <div>
      <SearchBar items={items} />
    </div>
  );
}

export default App;
```

As typing in the search bar, the list of items will be filtered based on search query.

Is it appropriate to get all the items and filter them on frontend? Given the computation power are the same on both frontend and backend, the only difference will be whether this query is business logic that we do not want users know.

## What?



## Reference

Why: asking for the reason or purpose behind something.
How: asking for the method or process of doing something.
What: asking for information about a specific thing or object.
