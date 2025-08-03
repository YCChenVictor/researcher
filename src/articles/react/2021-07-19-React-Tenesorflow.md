---
layout: post
title: (React) tensorFlowJS
description:
date: '2021-07-19'
categories: tensorflow
note:
---

## Introduction

## Why
skip

## How

### install & load
I am going to load an image recognition model from [pre-trained tensorflow models](https://www.tensorflow.org/js/models) in a react App.

A. Installation

In project directory,
```
npm i @tensorflow/tfjs
npm i @tensorflow-models/mobilenet
```
Then in `package.json`
```
"@tensorflow-models/mobilenet": "^1.0.0",
"@tensorflow/tfjs": "^1.7.4",
```

B. create a file (optional) such as `imageTf.js` and import it 

C. Import them
and then import them with
```
import * as tf from "@tensorflow/tfjs"
import * as net from "@tensorflow-models/mobilenet"
```
Then create a function to initialize `mobilenet`
```
const runMobileNet = async () => {
  const model = await mobilenet.load();
  console.log(model)
}
```
Then in your console, after the model loaded,
<img src="/assets/img/mobileNet_console.png">

D. Train the model



## What
pratical example: [**my teachable machine**](https://github.com/YCChenVictor/my_teachable_machine)


## Reference
[Real Time AI Face Landmark Detection in 20 Minutes with Tensorflow.JS and React](https://www.youtube.com/watch?v=7lXYGDVHUNw)

[MobileNet](https://github.com/tensorflow/tfjs-models/blob/master/mobilenet/README.md)

[How to Send State of Current Component as a Parameter to Another External Method Using React](https://www.pluralsight.com/guides/how-to-send-state-of-current-component-as-a-parameter-to-another-external-method-using-react)
