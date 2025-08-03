---
layout: post
title:
description: ''
date: '2023-02-18'
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

This article describes how to draw node based force graph in react.

## Why?

I want to create node plot in my blog.

## How?

### init

* install
  ```bash
  npm install react-force-graph-2d
  ```

* Basic example
  ```javascript
  import { ForceGraph2D } from 'react-force-graph-2d';
  
  const nodes = [
    { id: 1, name: 'Node 1' },
    { id: 2, name: 'Node 2' },
    { id: 3, name: 'Node 3' }
  ];
  
  const links = [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 1 }
  ];
  
  <ForceGraph2D
    graphData={{ nodes, links }}
    nodeLabel="name"
  />
  ```

## What?

* Real world example: [graph]({{site.baseurl}}/explore)
* The graph
  ```JSX
  import React, { useState, useEffect } from "react";
  import ForceGraph2D from "react-force-graph-2d";
  
  const NodeGraph = () => {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const borderStyle = { // TODO: try to know why Tailwind does not work
      border: "1px solid black",
      borderRadius: "10px",
      padding: "10px"
    };
  
    const handleNodeClick = (node) => {
      // Redirect to a new path
      console.log(node.name)
      // history.push(`/node/${node.id}`);
    }
  
    useEffect(() => {
      fetch('assets/data/nodeGraph.json')
        .then(response => response.json())
        .then(data => {
          const { nodes, links } = data;
          setNodes(nodes)
          setLinks(links)
        })
        .catch(error => console.error(error));
    }, []);
  
    return(
      <div style={borderStyle}>
        <ForceGraph2D
          graphData={{ nodes, links }}
          width={window.innerWidth}
          height={650}
          linkDirectionalArrowRelPos={1}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowResolution={0}
          d3VelocityDecay={0.6} // Decrease velocity decay to reduce node overlap
          d3Force="charge" // Use only charge force
          d3AlphaDecay={0.03} // Decrease alpha decay to increase simulation time
          d3Charge={-80} // Decrease charge to reduce node repulsion
          d3LinkDistance={80} // Increase link distance to reduce link overlap
          enableZoomPanInteraction={true} // Enable zooming
          onNodeClick={handleNodeClick} // redirect to the page when click node
        />
      </div>
    )
  }
  
  export default NodeGraph;
  ```
* The node crawling
  ```JSX
  const request = require('request');
  const cheerio = require('cheerio');
  const fs = require('fs');
  
  const visited = new Set();
  const queue = ['http://localhost:4000/blog/about'];
  const domain = 'http://localhost:4000'
  const structure = {};
  
  // I am going to use DFS concept to solve this graph like problem. Start from a single webpage: https://ycchenvictor.github.io/blog/
  
  function storeAsFile(result) {
    // Convert JSON data to a string
    const jsonString = JSON.stringify(result);
  
    // Write the JSON data to a file
    fs.writeFile('nodeGraph.json', jsonString, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
  
  function desiredFormat(structure) {
    const nodes = Object.keys(structure).map((value, index) => {
      return {id: index + 1, name: value}
    })
    const links = Object.entries(structure).map(([key, value]) => {
      return value.map((item) => {
        const source = getIdFromNodeName(key)
        const target = getIdFromNodeName(item)
        if(source && target) {
          return {source: source, target: target}
        }
      })
    }).flat().filter(obj => obj !== undefined)
  
    function getIdFromNodeName(name) {
      result = nodes.find(node => node.name === name)
      if(result) {
        return result['id']
      } else {
        null
      }
    }
  
    return { nodes: nodes, links: links }
  }
  
  function crawl() { // Promise in this function
    const childNodes = [];
    const url = queue.shift();
    if (!url || visited.has(url)) {
      return Promise.resolve(structure); // resolve with returning the final structure
    }
    visited.add(url);
    return new Promise((resolve, reject) => {
      request(url, (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          const $ = cheerio.load(body);
          $('a').each((i, link) => {
            const href = $(link).attr('href');
            if (href && href.startsWith('/blog') && href.endsWith('html')) {
              const absoluteUrl = domain + href;
              childNodes.push(href);
              queue.push(absoluteUrl);
            }
          });
          parentNode = url.replace(domain, "")
          structure[parentNode] = childNodes;
          resolve(crawl()); // resolve with calling this function again
        }
      });
    });
  }

  // currently, just store the result as a JSON file in frontend.
  crawl().then((structure) => {
    console.log(structure)
    storeAsFile(desiredFormat(structure)
  )})
  ```

## Reference

[force-directed-clusters-with-links-between-clusters-forked](https://codesandbox.io/s/force-directed-clusters-with-links-between-clusters-forked-tsbf3b?file=/src/index.js:0-4553)
