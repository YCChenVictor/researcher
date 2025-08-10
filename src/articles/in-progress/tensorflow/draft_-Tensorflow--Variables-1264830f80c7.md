---
title: (Tensorflow) Variables
description: How to create variables
date: ''
categories: []
keywords: []
slug: ''
---

  

### How to create variables

w = tf.Variable(\[0.47050506, 0.5705307, 0.5017093, 0.2827899, 0.45215878, 0.6673586, 0.38582358\])

### Choose specific variable

output = tf.gather(w, 0)

### Get the length of variables

tf.size(w)

### Get the variable out of tensorflow

\# create fake variables  
w = tf.Variable(\[0.47050506, 0.5705307, 0.5017093, 0.2827899, 0.45215878, 0.6673586, 0.38582358\])

with tf.Session() as sess:  
    sess.run(tf.global\_variables\_initializer())  
    x = sess.run(w)

print(x)

### how to assign value to specific variable

\# assign new into w  
assign\_op = tf.assign(w, new)  
sess.run(assign\_op)