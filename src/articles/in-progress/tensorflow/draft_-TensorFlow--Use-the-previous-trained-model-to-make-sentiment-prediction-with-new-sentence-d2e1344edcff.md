---
title: >-
  (TensorFlow) Use the previous trained model to make sentiment prediction with
  new sentence
description: >-
  reference:
  https://pythonprogramming.net/data-size-example-tensorflow-deep-learning-tutorial/
date: ''
categories: []
keywords: []
slug: ''
---

### import required modules

import tensorflow as tf  
import pickle  
import numpy as np  
import nltk  
from nltk.tokenize import sent\_tokenize, word\_tokenize  
from nltk.stem import WordNetLemmatizer

### Define hyperparameters

there will be three layers

lemmatizer = WordNetLemmatizer()

n\_nodes\_hl1 = 500  
n\_nodes\_hl2 = 500

n\_classes = 2  
hm\_data = 2000000

batch\_size = 32  
hm\_epochs = 10

x = tf.placeholder('float')  
y = tf.placeholder('float')

current\_epoch = tf.Variable(1)

hidden\_1\_layer = {'f\_fum': n\_nodes\_hl1,  
                  'weight': tf.Variable(tf.random\_normal(\[2638, n\_nodes\_hl1\])),  
                  'bias': tf.Variable(tf.random\_normal(\[n\_nodes\_hl1\]))}

hidden\_2\_layer = {'f\_fum': n\_nodes\_hl2,  
                  'weight': tf.Variable(tf.random\_normal(  
                            \[n\_nodes\_hl1, n\_nodes\_hl2\])),  
                  'bias': tf.Variable(tf.random\_normal(  
                          \[n\_nodes\_hl2\]))}

output\_layer = {'f\_fum': None,  
                'weight': tf.Variable(tf.random\_normal(  
                          \[n\_nodes\_hl2, n\_classes\])),  
                'bias': tf.Variable(tf.random\_normal(\[n\_classes\]))}

### Define function to make prediction with NN

def neural\_network\_model(data):

l1 = tf.add(tf.matmul(data, hidden\_1\_layer\['weight'\]),  
                hidden\_1\_layer\['bias'\])  
    l1 = tf.nn.relu(l1)

l2 = tf.add(tf.matmul(l1, hidden\_2\_layer\['weight'\]),  
                hidden\_2\_layer\['bias'\])  
    l2 = tf.nn.relu(l2)

output = tf.matmul(l2, output\_layer\['weight'\]) + output\_layer\['bias'\]

return output

saver = tf.train.Saver()

### Define function to use prediction from above function to make sentiment analysis

def use\_neural\_network(input\_data):

prediction = neural\_network\_model(x)

with open('lexicon.pickle', 'rb') as f:  
        lexicon = pickle.load(f)

with tf.Session() as sess:

sess.run(tf.initialize\_all\_variables())

saver.restore(sess, "model.ckpt")

current\_words = word\_tokenize(input\_data.lower())  
        current\_words = \[lemmatizer.lemmatize(i) for i in current\_words\]  
        features = np.zeros(len(lexicon))

for word in current\_words:  
            if word.lower() in lexicon:  
                index\_value = lexicon.index(word.lower())  
                # OR DO +=1, test both  
                features\[index\_value\] += 1

features = np.array(list(features))  
        # pos: \[1,0\] , argmax: 0  
        # neg: \[0,1\] , argmax: 1  
        result = (sess.run(tf.argmax(  
                  prediction.eval(feed\_dict={x: \[features\]}), 1)))  
        if result\[0\] == 0:  
            print('Positive:', input\_data)  
        elif result\[0\] == 1:  
            print('Negative:', input\_data)

It takes a lot of effort to make it runnable. The most important thing is to name the trainable variables so that tensorflow won’t create new variables when restoring.