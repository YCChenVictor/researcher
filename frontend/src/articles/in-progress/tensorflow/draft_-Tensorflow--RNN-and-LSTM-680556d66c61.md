---
title: (Tensorflow) RNN and LSTM
description: reference…
date: ''
categories: []
keywords: []
slug: ''
---

I am going to use MNIST dataset as example

### import required module and dataset

import tensorflow as tf  
from tensorflow.examples.tutorials.mnist import input\_data  
from tensorflow.python.ops import rnn, rnn\_cell  
mnist = input\_data.read\_data\_sets("/tmp/data/", one\_hot = True)

### Setup hyperparameters

hm\_epochs = 3  
n\_classes = 10  
batch\_size = 128  
chunk\_size = 28  
n\_chunks = 28  
rnn\_size = 128  
  
  
x = tf.placeholder('float', \[None, n\_chunks,chunk\_size\])  
y = tf.placeholder('float')

### The RNN function

def recurrent\_neural\_network(x):  
    layer = {'weights':tf.Variable(tf.random\_normal(\[rnn\_size,n\_classes\])),  
             'biases':tf.Variable(tf.random\_normal(\[n\_classes\]))}  
  
    x = tf.transpose(x, \[1,0,2\])  
    x = tf.reshape(x, \[-1, chunk\_size\])  
    x = tf.split(x, n\_chunks, 0)  
  
    lstm\_cell = rnn\_cell.BasicLSTMCell(rnn\_size,state\_is\_tuple=True)  
    outputs, states = rnn.static\_rnn(lstm\_cell, x, dtype=tf.float32)  
  
    output = tf.matmul(outputs\[-1\],layer\['weights'\]) + layer\['biases'\]  
  
    return output

the procedure of this function: 

1.  define layer form: every layer has weight and biases. the dimension of input is rnn\_size, and the output is the number of classes, n\_classes.
2.  do some trick to the input x: 

(1) transpose x: with \[1,0,2\], the dimension of first and second will be interchanged; the concept is from (0,1,2) to (1,0,2).

(2) reshape x: into chunk\_size \* -1. -1 means any shape, so the shape will change according to chunk\_size.

(3) split x into n\_chunks portion with respect to dimension zero 

3\. setup lstm cell

4\. setup how to calculate output and state

### Define function to train model

def train\_neural\_network(x):  
    prediction = recurrent\_neural\_network(x)  
    cost = tf.reduce\_mean( tf.nn.softmax\_cross\_entropy\_with\_logits(prediction,y) )  
    optimizer = tf.train.AdamOptimizer().minimize(cost)  
      
      
    with tf.Session() as sess:  
        sess.run(tf.initialize\_all\_variables())  
  
        for epoch in range(hm\_epochs):  
            epoch\_loss = 0  
            for \_ in range(int(mnist.train.num\_examples/batch\_size)):  
                epoch\_x, epoch\_y = mnist.train.next\_batch(batch\_size)  
                epoch\_x = epoch\_x.reshape((batch\_size,n\_chunks,chunk\_size))  
  
                \_, c = sess.run(\[optimizer, cost\], feed\_dict={x: epoch\_x, y: epoch\_y})  
                epoch\_loss += c  
  
            print('Epoch', epoch, 'completed out of',hm\_epochs,'loss:',epoch\_loss)  
  
        correct = tf.equal(tf.argmax(prediction, 1), tf.argmax(y, 1))  
  
        accuracy = tf.reduce\_mean(tf.cast(correct, 'float'))  
        print('Accuracy:',accuracy.eval({x:mnist.test.images.reshape((-1, n\_chunks, chunk\_size)), y:mnist.test.labels}))  
  
train\_neural\_network(x)

1.  setup tensors for how to make prediction, compare cost, modify weights
2.  in each epoch, run through batches to train the model
3.  calculate the accuracy