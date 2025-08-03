---
title: (Tensorflow) Deep Learning with TensorFlow — Creating the Neural Network Model
description: >-
  reference:
  https://pythonprogramming.net/tensorflow-deep-neural-network-machine-learning-tutorial/…
date: ''
categories: []
keywords: []
slug: ''
---

### MNIST dataset

A dataset that contains 60,000 training samples and 10,000 testing samples of hand-written and labeled digits, 0 through 9, ten “classes.”

The MNIST dataset has the images with purely black and white, thresholded, images, of size 28 x 28, or 784 pixels total.

### The deep learning model concept

Input -> Three hidden layer with neurons with activation functions -> output -> compare the desire value with cost function -> Adam Optimizer to minimize the cost (how wrong we are) by tinkering with the weights

The procedure: Input -> … -> compare the desire value with cost function is called feeding forward; the procedure: Adam Optimizer is called back propagation 

We do forward and back propagation as many times as we want. The cycle is called an epoch. We can pick any number we like for the number of epochs, but you would probably want to avoid too many, causing overfitting.

### The code of the deep learning model

#### import minst dataset

import tensorflow as tf  
from tensorflow.examples.tutorials.mnist import input\_data  
mnist = input\_data.read\_data\_sets("/tmp/data/", one\_hot = True)

\> one\_hot makes the output to be the form: \[0,0,0,1,…,0\]. That is, only the class of the number is 1; others are zero.

#### specify hyper parameters

n\_nodes\_hl1 = 500  
n\_nodes\_hl2 = 500  
n\_nodes\_hl3 = 500  
n\_classes = 10  
batch\_size = 100

\> n\_nodes\_hli = the number of neurons in the i hidden layer

\> n\_classes = the number of classes

\> batch\_size = the number of data to be input once

#### specify the input and output form

x = tf.placeholder('float', \[None, 784\])  
y = tf.placeholder('float')

\[None, 784\], the input shape makes the effects: (1) tensorflow won’t throw anything in it; at least it must be a form like 784 dimensions (2) with None, there is still a freedom for tensorflow to manipulate the shape so that it won’t always throw errors when the input data is slightly different

#### The function to do neural network model

def neural\_network\_model(data):  
    hidden\_1\_layer = {'weights': tf.Variable(  
                      tf.random\_normal(\[784, n\_nodes\_hl1\])),  
                      'biases': tf.Variable(  
                      tf.random\_normal(\[n\_nodes\_hl1\]))}

hidden\_2\_layer = {'weights': tf.Variable(  
                      tf.random\_normal(\[n\_nodes\_hl1, n\_nodes\_hl2\])),  
                      'biases': tf.Variable(  
                      tf.random\_normal(\[n\_nodes\_hl2\]))}

hidden\_3\_layer = {'weights': tf.Variable(  
                      tf.random\_normal(\[n\_nodes\_hl2, n\_nodes\_hl3\])),  
                      'biases': tf.Variable(  
                      tf.random\_normal(\[n\_nodes\_hl3\]))}

output\_layer = {'weights': tf.Variable(  
                    tf.random\_normal(\[n\_nodes\_hl3, n\_classes\])),  
                    'biases': tf.Variable(  
                    tf.random\_normal(\[n\_classes\]))}

l1 = tf.add(tf.matmul(data, hidden\_1\_layer\['weights'\]),  
                hidden\_1\_layer\['biases'\])  
    l1 = tf.nn.relu(l1)

l2 = tf.add(tf.matmul(l1, hidden\_2\_layer\['weights'\]),  
                hidden\_2\_layer\['biases'\])  
    l2 = tf.nn.relu(l2)

l3 = tf.add(tf.matmul(l2, hidden\_3\_layer\['weights'\]),  
                hidden\_3\_layer\['biases'\])  
    l3 = tf.nn.relu(l3)

output = tf.matmul(l3, output\_layer\['weights'\]) + output\_layer\['biases'\]

return output

\> biases are just like intercept in linear regression

Procedure of this function: input with shape of \[None, 784\] -> first layer -> output with shape \[n\_nodes\_hl1\] -> second layer -> output with shape \[n\_nodes\_hl2\] -> third layer -> output with shape \[n\_nodes\_hl3\] -> output layer -> output with shape \[n\_classes\]

#### The function to train the NN

It will train batch\_size \* epoch times

def train\_neural\_network(x):  
    prediction = neural\_network\_model(x)  
      
    cost = tf.reduce\_mean( tf.nn.softmax\_cross\_entropy\_with\_logits(logits=prediction, labels=y) )  
    optimizer = tf.train.AdamOptimizer().minimize(cost)  
      
    hm\_epochs = 10  
    with tf.Session() as sess:  
        sess.run(tf.global\_variables\_initializer())  
  
        for epoch in range(hm\_epochs):  
            epoch\_loss = 0  
            for \_ in range(int(mnist.train.num\_examples/batch\_size)):  
                epoch\_x, epoch\_y = mnist.train.next\_batch(batch\_size)  
                \_, c = sess.run(\[optimizer, cost\], feed\_dict={x: epoch\_x, y: epoch\_y})  
                epoch\_loss += c  
  
            print('Epoch', epoch, 'completed out of',hm\_epochs,'loss:',epoch\_loss)  
  
        correct = tf.equal(tf.argmax(prediction, 1), tf.argmax(y, 1))  
        accuracy = tf.reduce\_mean(tf.cast(correct, 'float'))  
        print('Accuracy:',accuracy.eval({x:mnist.test.images, y:mnist.test.labels}))  
  
train\_neural\_network(x)

**the function above do the following:**

1.  define the prediction function, the method to calculate cost, the method to optimize the weight in each epochs
2.  train and predict 

(1) start to train this model with session: initialize the variables -> in each epoch, feed the data of batch\_size into the model until it ran out of data (That is, data\_size/batch\_size times) -> Then we can get data\_size/batch\_size times of loss (c) -> add all those loss. The loss should decrease during epochs -> finish the training and get the best weights

(2) start to predict with test data: use the weights trained to calculate accuracy (compare the mnist.test.labels and the prediction, mnist.test.images): compare the ‘position’ of highest data in prediction and y, if they are the same, then correct -> use tf.cast to turn datatype into float so that can do reduce\_mean, use reduce\_mean to lower the dimension with average -> Then calculate predict accuracy with test data