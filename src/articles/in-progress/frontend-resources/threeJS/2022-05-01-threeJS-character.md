---
layout: post
title:
description: ''
date: '2022-05-01'
categories: threeJS
note:
mathjax:
mermaid:
p5:
threeJS: true
publish: true
---

## Introduction

This article describes how to create a character in ThreeJS.

## Why?

To create 3D characters in my project

## How?

### create character in blender

I just use some free 3D model because I have no idea on building own characters. Remember to export it as glTF.

create one or load one -> design appearance -> add armatures -> edit poses -> animate

### create scene

```javascript
import * as THREE from 'three';
...

const scene = new THREE.Scene();
...
```

### import it into threeJS and add it into scene

Please refer to 2022-04-30-threeJS-overview.md for basic concepts. Because I am now using CDN, remember to add it in importmap

```javascript
{
  "imports": {
    ...,
    "GLTF_loader": "https://unpkg.com/three@0.140.0/examples/jsm/loaders/GLTFLoader.js"
  }
}
```

and then use it with

```javascript
import { GLTFLoader } from 'GLTF_loader';

const loader = new GLTFLoader();
loader.load('path/to/model.glb', // load the image
  function(gltf) {
    scene.add(gltf.scene); // add it to scene
  },
  undefined,
  function(error) {
    console.error( error );
  }
);
```

### render it

```javascript
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#threeExample'),
})

...

renderer.render(scene)
```

You also need to specify correct position of camera, light and use animation to render it correctly.

## What?

<div id='' class='h-screen justify-center items-center'>
  <canvas id='threeExample' class='object-scale-down'>
  </canvas>
</div>

<script type="module">
  import * as THREE from 'three';
  import { GLTFLoader } from 'GLTF_loader';

  const scene = new THREE.Scene();
  
  const fieldOfView = 75
  const aspectRatio = window.innerWidth / window.innerHeight
  const nearestDistance = 0.1
  const farthestDistance = 1000
  const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearestDistance, farthestDistance)
  camera.position.set(0,1,2);

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(2,2,5);
  scene.add(light)

  const loader = new GLTFLoader();

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#threeExample'),
  })
  loader.load(
    '{{site.baseurl}}/assets/3d/cat.glb',
    function(glb) {
      console.log('load successfully')
      const root = glb.scene
      root.scale.set(0.5,0.5,0.5)
      scene.add(glb.scene);
    },
    undefined,
    function(error) {
      console.error(error);
    }
  );

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enable = true
  renderer.gammaOutput = true

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

animate()
</script>

## Reference

[mixamo](https://www.mixamo.com/#/)

[Import FREE Rigged and Animated Characters into Blender with the Adobe Mixamo Add-On](https://www.youtube.com/watch?v=yDc-E-o_I-c)

[Character creation in ThreeJS](https://blog.farazshaikh.com/stories/character-creation-in-three-js/)

[Wolf Rigged And Game Ready](https://free3d.com/3d-model/wolf-rigged-and-game-ready-42808.html)

[Loading 3D models](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models)

[How to Load a 3D model in Three.js, GLTF/GLB Model, GLTFLoader](https://www.youtube.com/watch?v=yPA2z7fl4J8)

[Intro to Rigging an Armature to a character in Blender 3.0](https://www.youtube.com/watch?v=9dZjcFW3BRY)

[Learn Blender Rigging and Animation in 1 Minute!](https://www.youtube.com/watch?v=LNchKgHDgVU)

[Loading Animated Characters in React Three Fiber](https://www.youtube.com/watch?v=q7yH_ajINpA&t=596s)
