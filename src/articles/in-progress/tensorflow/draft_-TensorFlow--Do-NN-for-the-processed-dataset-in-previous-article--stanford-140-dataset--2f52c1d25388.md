---
title: >-
  (TensorFlow) Do NN for the processed dataset in previous article (stanford 140
  dataset)
description: >-
  reference:
  https://pythonprogramming.net/data-size-example-tensorflow-deep-learning-tutorial/
date: ''
categories: []
keywords: []
slug: ''
---

### Import required modules

import tensorflow as tf  
import pickle  
import numpy as np  
import nltk  
from nltk.tokenize import word\_tokenize  
from nltk.stem import WordNetLemmatizer

#### specify the lemmatizer

lemmatizer = WordNetLemmatizer()

### Pre-Define

#### hyper parameters

n\_nodes\_hl1 = 500  
n\_nodes\_hl2 = 500  
  
n\_classes = 2  
  
batch\_size = 32  
total\_batches = int(1600000/batch\_size)  
hm\_epochs = 10

#### TensorFlow process

x = tf.placeholder('float')  
y = tf.placeholder('float')  
  
hidden\_1\_layer = {'f\_fum':n\_nodes\_hl1,  
                  'weight':tf.Variable(tf.random\_normal(\[2638, n\_nodes\_hl1\])),  
                  'bias':tf.Variable(tf.random\_normal(\[n\_nodes\_hl1\]))}  
  
hidden\_2\_layer = {'f\_fum':n\_nodes\_hl2,  
                  'weight':tf.Variable(tf.random\_normal(\[n\_nodes\_hl1, n\_nodes\_hl2\])),  
                  'bias':tf.Variable(tf.random\_normal(\[n\_nodes\_hl2\]))}  
  
output\_layer = {'f\_fum':None,  
                'weight':tf.Variable(tf.random\_normal(\[n\_nodes\_hl2, n\_classes\])),  
                'bias':tf.Variable(tf.random\_normal(\[n\_classes\])),}

\> the data is of dimension, 2638

### Define functions

#### functions of NN for prediction

def neural\_network\_model(data):  
    l1 = tf.add(tf.matmul(data,hidden\_1\_layer\['weight'\]), hidden\_1\_layer\['bias'\])  
    l1 = tf.nn.relu(l1)  
    l2 = tf.add(tf.matmul(l1,hidden\_2\_layer\['weight'\]), hidden\_2\_layer\['bias'\])  
    l2 = tf.nn.relu(l2)  
    output = tf.matmul(l2,output\_layer\['weight'\]) + output\_layer\['bias'\]  
    return output

#### functions to train the model

process: 

1.  pre-define tensors: prediction, cost, optimizer
2.  start the session: initialize all variables -> find the starting value of epoch (if the session have been started before, the training session can begin in the epoch from the last time) -> start to (or continue to) train the model up to maximum epoch, hm\_epochs:
3.  in the while loop: if epoch != 1, then restore the session trained before -> use the lexicon proposed before -> open the shuffled training dataset to train the model (notice! the dataset didn’t pre processed before):
4.  create batch\_x with features created by lexicon and batch\_y with label in training dataset
5.  use the batch\_x and batch\_y created above to train the model
6.  save the trained session in each epoch and save the value of epoch in a file, which this function will read in the future to continue the training

def train\_neural\_network(x):  
    prediction = neural\_network\_model(x)  
    cost = tf.reduce\_mean( tf.nn.softmax\_cross\_entropy\_with\_logits(prediction,y) )  
    optimizer = tf.train.AdamOptimizer(learning\_rate=0.001).minimize(cost)  
    with tf.Session() as sess:  
        sess.run(tf.initialize\_all\_variables())  
        try:  
            epoch = int(open(tf\_log,'r').read().split('\\n')\[-2\])+1  
            print('STARTING:',epoch)  
        except:  
            epoch = 1  
  
        while epoch <= hm\_epochs:  
            if epoch != 1:  
                saver.restore(sess,"model.ckpt")  
            epoch\_loss = 1  
            with open('lexicon.pickle','rb') as f:  
                lexicon = pickle.load(f)  
            with open('train\_set\_shuffled.csv', buffering=20000, encoding='latin-1') as f:  
                batch\_x = \[\]  
                batch\_y = \[\]  
                batches\_run = 0  
                for line in f:  
                    label = line.split(':::')\[0\]  
                    tweet = line.split(':::')\[1\]  
                    current\_words = word\_tokenize(tweet.lower())  
                    current\_words = \[lemmatizer.lemmatize(i) for i in current\_words\]  
  
                    features = np.zeros(len(lexicon))  
  
                    for word in current\_words:  
                        if word.lower() in lexicon:  
                            index\_value = lexicon.index(word.lower())  
                            # OR DO +=1, test both  
                            features\[index\_value\] += 1  
                    line\_x = list(features)  
                    line\_y = eval(label)  
                    batch\_x.append(line\_x)  
                    batch\_y.append(line\_y)  
                    if len(batch\_x) >= batch\_size:  
                        \_, c = sess.run(\[optimizer, cost\], feed\_dict={x: np.array(batch\_x),  
                                                                  y: np.array(batch\_y)})  
                        epoch\_loss += c  
                        batch\_x = \[\]  
                        batch\_y = \[\]  
                        batches\_run +=1  
                        print('Batch run:',batches\_run,'/',total\_batches,'| Epoch:',epoch,'| Batch Loss:',c,)  
  
            saver.save(sess, "model.ckpt")  
            print('Epoch', epoch, 'completed out of',hm\_epochs,'loss:',epoch\_loss)  
            with open(tf\_log,'a') as f:  
                f.write(str(epoch)+'\\n')   
            epoch +=1

#### define function to make prediction with test dataset

process:

1.  make prediction with the trained NN model
2.  restore the trained session
3.  compare the prediction with with true y
4.  calculate the accuracy with the comparing above
5.  use the data in processed-test-set.csv to obtain feature and labels as x and y to do the tensor flow define above and calculate accuracy

def test\_neural\_network():  
    prediction = neural\_network\_model(x)  
    with tf.Session() as sess:  
        sess.run(tf.initialize\_all\_variables())  
        for epoch in range(hm\_epochs):  
            try:  
                saver.restore(sess,"model.ckpt")  
            except Exception as e:  
                print(str(e))  
            epoch\_loss = 0  
              
        correct = tf.equal(tf.argmax(prediction, 1), tf.argmax(y, 1))  
        accuracy = tf.reduce\_mean(tf.cast(correct, 'float'))  
        feature\_sets = \[\]  
        labels = \[\]  
        counter = 0  
        with open('processed-test-set.csv', buffering=20000) as f:  
            for line in f:  
                try:  
                    features = list(eval(line.split('::')\[0\]))  
                    label = list(eval(line.split('::')\[1\]))  
                    feature\_sets.append(features)  
                    labels.append(label)  
                    counter += 1  
                except:  
                    pass  
        print('Tested',counter,'samples.')  
        test\_x = np.array(feature\_sets)  
        test\_y = np.array(labels)  
        print('Accuracy:',accuracy.eval({x:test\_x, y:test\_y}))