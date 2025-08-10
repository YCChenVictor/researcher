---
title: (Tensorflow) ConfigProto
description: tf.ConfigProto is the setting of session
date: ''
categories: []
keywords: []
slug: ''
---

### for example, the code as follow:

with tf.Session(config = tf.ConfigProto(…),…)

### The parameters in tf.ConfigProto:

#### log\_device\_placement:

log\_device\_placement = True: report what device do the job

#### allow\_soft\_placement:

allow\_soft\_placement=True: allow tf automatically assign the job to existed device if the assigned device doesn't exist

#### code example:

tf.ConfigProto(log\_device\_placement=True, allow\_soft\_placement=True)

### Control the using rate of GPU:

While config.gpu\_options.allow\_growth = True, it will gradually increase the using rate of GPU.

#### code example:

config = tf.ConfigProto()  
config.gpu\_options.allow\_growth = True  
session = tf.Session(config=config, ...)