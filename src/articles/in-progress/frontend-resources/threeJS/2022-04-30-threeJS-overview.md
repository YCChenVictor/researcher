---
layout: post
title: (threeJS) overview
description: ''
date: '2022-04-30'
categories: threeJS
note: tailwind 要怎麼自動調整 width according to browser 要想辦法
mathjax:
mermaid:
p5:
threeJS: true
publish: true
---

## Introduction

ThreeJS is for 3D modeling on frontend.

Structure of article:

* install threeJS
* environment: scene, camera, render
* create object in scene
  * mesh
  * lighting
* helper for
* interaction with users

## Why?

TBC

## How?

### install threeJS

Follow the instruction in [Installation](https://threejs.org/docs/#manual/en/introduction/Installation)

I use CDN method on github pages and remember to find the version you want in [three.js](https://www.npmjs.com/package/three). After installation, we can import it with `<script>` as follow

```javascript
<script type="module">
  import * as THREE from 'three';
  const scene = new THREE.Scene();
</script>
```

### environment: scene, camera, render

To start threeJS, we always need scene, camera, render.

#### scene

Scene is container

```javascript
const scene = new THREE.Scene();
```

#### camera

Camera defines the way to capture the scene. The basic script to define camera:

```javascript
const fieldOfView = 75
const aspectRatio = window.innerWidth / window.innerHeight
const nearestDistance = 0.1
const farthestDistance = 1000
const moveOnZaxis = 30
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearestDistance, farthestDistance)
camera.position.setZ(moveOnZaxis);
```

#### renderer

Just the way to render everything in canvas

```javascript
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(#threeExample),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
```

### create object

After setting up the environment, we can now create an object in the `scene`.

* mesh with geometry and material
* lighting

#### mesh with geometry and material

We use `Mesh` to combine the elements, [geometry](https://threejs.org/docs/?q=geometry#api/en) and [material](https://threejs.org/docs/?q=material#api/en) and re-render it with movement we define in a loop.

```javascript
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true})
const torus = new THREE.Mesh(geometry, material);
scene.add(torus)

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}
  
animate()
```

#### lighting

change `material` from

```javascript
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true})
```

to

```javascript
const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
```

and add light at the x, y, z position we what as follow

```javascript
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
```

If we want all the object to be illuminated, add

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)
```

### helper

You may start to find it hard to track. We can use some helper as follow:

#### light helper

It helps us to know the position of the light

```javascript
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)
```

#### grid helper

It will draw grids

```javascript
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper)
```

### interaction with users

We can add an orbit_control listening to the mouse of the domElement and modify the camera according to the mouse movement.

```javascript
<script type="importmap">
  {
    "imports": {
      ...,
      "orbit_controls": "https://unpkg.com/three@0.140.0/examples/jsm/controls/OrbitControls.js"
    }
  }
</script>

...
import {OrbitControls} from 'orbit_controls';
const controls = new OrbitControls(camera, renderer.domElement);
function animate() {
  ...
  controls.update();
  ...
}
```

### texture

We can load texture with `TextureLoader()`

#### background

```javascript
const backgroundImagePath = "{{site.baseurl}}/assets/img/space.jpeg"
const spaceTexture = new THREE.TextureLoader().load(backgroundImagePath);
scene.background = spaceTexture;
```

#### texture mapping

For example, we want to create a moon. Go find the moon_texture and then

```javascript
const moonTexture = new THREE.TextureLoader().load('{{site.baseurl}}/assets/img/moon_texture.jpeg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
)
scene.add(moon)
```

## What?

Render it into `<canvas>`

<div id='' class='h-screen justify-center items-center'>
  <canvas id='threeExample' class='object-scale-down'>
    Hello World
  </canvas>
</div>

<script type="module">
  import * as THREE from 'three';
  import {OrbitControls} from 'orbit_controls';

  const scene = new THREE.Scene();

  const fieldOfView = 75
  const aspectRatio = window.innerWidth / window.innerHeight
  const nearestDistance = 0.1
  const farthestDistance = 1000
  const moveOnZaxis = 30
  const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearestDistance, farthestDistance)

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#threeExample'),
  })

  camera.position.setZ(moveOnZaxis);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera)

  ////////////////////////////////////

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
  const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus)

  ////////////////////////////////////

  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(5, 5, 5)

  const ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(pointLight, ambientLight)

  /////////////////////////////////////

  const lightHelper = new THREE.PointLightHelper(pointLight)
  scene.add(lightHelper)

  const gridHelper = new THREE.GridHelper(200, 50)
  scene.add(gridHelper)

  /////////////////////////////////////

  const controls = new OrbitControls(camera, renderer.domElement);

  /////////////////////////////////////

  const backgroundImagePath = "{{site.baseurl}}/assets/img/space.jpeg"
  const spaceTexture = new THREE.TextureLoader().load(backgroundImagePath);
  scene.background = spaceTexture;

  const moonTexture = new THREE.TextureLoader().load('{{site.baseurl}}/assets/img/moon_texture.jpeg');
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
    })
  );
  scene.add(moon)

  /////////////////////////////////////

  function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
  }
  
  animate()
</script>

## Reference

[Installation](https://threejs.org/docs/#manual/en/introduction/Installation)

[Build a Mindblowing 3D Portfolio Website // Three.js Beginner’s Tutorial](https://www.youtube.com/watch?v=Q7AOvWpIVHU&t=198s)
