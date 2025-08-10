---
title: (Tensorflow) Introduction to Deep Learning with Tensorflow
description: >-
  reference:
  https://pythonprogramming.net/tensorflow-introduction-machine-learning-tutorial/
date: ''
categories: []
keywords: []
slug: ''
---

### What is a tensor?

A tensor is an array-like object, and, as you’ve seen, an array can hold your matrix, your vector, and really even a scalar.

### Basic example

TensorFlow works by first defining and describing our model in abstract, and then, when we are ready, we make it a reality in the session.

import tensorflow as tf  
  
\# creates nodes in a graph  
\# "construction phase"  
x1 = tf.constant(5)  
x2 = tf.constant(6)

#### Do some simple computations:

result = tf.mul(x1,x2)  
print(result)

You can see that the output is a tensor setting, not the value of the tensor. To get the value, do the following:

\# defines our session and launches graph  
sess = tf.Session()  
\# runs result  
print(sess.run(result))  
\# close session to free the space  
sess.close()

with session().run, the tensor can be run and the result is 30. Or you can do the following: 

with tf.Session() as sess:  
    output = sess.run(result)  
    print(output)

With the with statement, no need to add sess.close()

### Specific GPU

with tf.Session() as sess:  
  with tf.device("/gpu:1"):  
    matrix1 = tf.constant(\[\[3., 3.\]\])  
    matrix2 = tf.constant(\[\[2.\],\[2.\]\])  
    product = tf.matmul(matrix1, matrix2)

It seems that tensorflow no longer support GPU in mac OS.