---
title: (TensorFlow) Sentimental Analysis with TensorFlow
description: >-
  reference:
  https://pythonprogramming.net/using-our-own-data-tensorflow-deep-learning-tutorial/
date: ''
categories: []
keywords: []
slug: ''
---

### Use NLTK to do natural language processing

#### download the word package

import nltk  
nltk.download()

#### specify the lemmatizer

import nltk  
from nltk.tokenize import word\_tokenize  
import numpy as np  
import random  
import pickle  
from collections import Counter  
from nltk.stem import WordNetLemmatizer  
  
lemmatizer = WordNetLemmatizer()  
hm\_lines = 100000

\> lemmatizer is to turn the word back to the original type; for example, ate -> eat

\> hm\_lines is to specify the number of data to be input to train the model. It can be small to do small training.

### Define functions for creating train and test dataset

#### define function to create lexicon

lexicon is a bag of tokenized sentences without high-frequency and low-frequency words. 

Tokenization is to separate the sentence with words; for example, 我是拉拉 -> 我, 是, 拉拉; I am god of power -> I, am, god, of, power or I, am, god of power

Lemmatization is to remove high-frequency and low-frequency words

def create\_lexicon(pos, neg):

lexicon = \[\]  
      
    # open pos and neg  
    with open(pos, 'r') as f:  
        contents = f.readlines()  
        for l in contents\[:hm\_lines\]:  
            all\_words = word\_tokenize(l)  
            lexicon += list(all\_words)

    with open(neg, 'r') as f:  
        contents = f.readlines()  
        for l in contents\[:hm\_lines\]:  
            all\_words = word\_tokenize(l)  
            lexicon += list(all\_words)

    # lemmatize the lexicon filled with pos and neg tokenized words  
    lexicon = \[lemmatizer.lemmatize(i) for i in lexicon\]

    # if the freqnency of the word is bet 1000 and 50, then I want it  
    w\_counts = Counter(lexicon)  
    l2 = \[\]  
    for w in w\_counts:  
        # print(w\_counts\[w\])  
        if 1000 > w\_counts\[w\] > 50:  
            l2.append(w)  
    print(len(l2))  
    return l2

#### define function to get a list of \[classification and features\] (if the word in the sample sentence appears, the position of the word in the feature turn from 0 to 1)

After we have lexicon, we can walk through all the sentence to get a list of zeros and ones with classification, which is to tell python that what word is negative and what word is positive

def sample\_handling(sample, lexicon, classification):

   featureset = \[\]

   with open(sample, 'r') as f:  
        contents = f.readlines()  
        for l in contents\[:hm\_lines\]:  
            current\_words = word\_tokenize(l.lower())  
            current\_words = \[lemmatizer.lemmatize(i) for i in current\_words\]  
            features = np.zeros(len(lexicon))  
            for word in current\_words:  
                if word.lower() in lexicon:  
                    index\_value = lexicon.index(word.lower())  
                    features\[index\_value\] += 1  
            features = list(features)  
            featureset.append(\[features, classification\])  
    return featureset

#### define function to create train and test of neg and pos

the procedure of this function: create lexicon with pos and neg data -> create feature with pos and neg data define as above -> randomly shuffle this list and get the last part of this list as test data

def create\_feature\_sets\_and\_labels(pos, neg, test\_size = 0.1):

	lexicon = create\_lexicon(pos, neg)

	features = \[\]  
        features += sample\_handling('pos.txt',lexicon,\[1,0\])  
	features += sample\_handling('neg.txt',lexicon,\[0,1\])  
	  
        random.shuffle(features)  
	features = np.array(features)  
  
	testing\_size = int(test\_size\*len(features))  
  
	train\_x = list(features\[:,0\]\[:-testing\_size\])  
	train\_y = list(features\[:,1\]\[:-testing\_size\])  
	test\_x = list(features\[:,0\]\[-testing\_size:\])  
	test\_y = list(features\[:,1\]\[-testing\_size:\])  
  
	return train\_x,train\_y,test\_x,test\_y

#### start to run to get the train and test dataset

if \_\_name\_\_ == '\_\_main\_\_':  
	train\_x,train\_y,test\_x,test\_y = create\_feature\_sets\_and\_labels('/path/to/pos.txt','/path/to/neg.txt')  
	# if you want to pickle this data:  
	with open('/path/to/sentiment\_set.pickle','wb') as f:  
		pickle.dump(\[train\_x,train\_y,test\_x,test\_y\],f)

### Define functions to train and predict sentiment

I am going to use the same form of MNIST\_classification in [(TensorFlow) Deep Learning with TensorFlow — Creating the Neural Network Model with NMIST dataset](https://medium.com/p/4e96b13c7f65/edit). The only part should be modified is mnist.train.next\_batch

def train\_neural\_network(x):  
        prediction = neural\_network\_model(x)  
	cost = tf.reduce\_mean( tf.nn.softmax\_cross\_entropy\_with\_logits(prediction,y) )  
	optimizer = tf.train.AdamOptimizer(learning\_rate=0.001).minimize(cost)  
  
	with tf.Session() as sess:  
		sess.run(tf.initialize\_all\_variables())  
	      
		for epoch in range(hm\_epochs):  
			epoch\_loss = 0  
			i=0  
			while i < len(train\_x):  
				start = i  
				end = i+batch\_size  
				batch\_x = np.array(train\_x\[start:end\])  
				batch\_y = np.array(train\_y\[start:end\])  
  
				\_, c = sess.run(\[optimizer, cost\], feed\_dict={x: batch\_x,  
				                                              y: batch\_y})  
				epoch\_loss += c  
				i+=batch\_size  
				  
			print('Epoch', epoch+1, 'completed out of',hm\_epochs,'loss:',epoch\_loss)  
		correct = tf.equal(tf.argmax(prediction, 1), tf.argmax(y, 1))  
		accuracy = tf.reduce\_mean(tf.cast(correct, 'float'))  
  
		print('Accuracy:',accuracy.eval({x:test\_x, y:test\_y}))

train\_neural\_network(x)

The procedure: 

1.  specify the method to calculate prediction, cost, and optimizer (make prediction with neural\_network\_model(x) -> calculate cost to compare the real data and predicted one -> use optimizer to adjust the weight)
2.  start to run session: 

(1) training: it is going to input batches in each epoch, which is going to do hm\_epochs times; after one batch inputted into the function, the index will add a batch\_size. Then, if i > len(train\_data), then this training will be end. That is, all the training data have been inputted.