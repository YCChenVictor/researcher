---
title: (TensorFlow) What if the data is too large for memory?
description: >-
  reference:
  https://pythonprogramming.net/data-size-example-tensorflow-deep-learning-tutorial/
date: ''
categories: []
keywords: []
slug: ''
---

### The procedure

1\. preprocess data  
training.1600000.processed.noemoticon.csv -> train\_set.csv  
testdata.manual.2009.06.14.csv -> test\_set.csv

2\. create lexicon  
train\_set.csv -> lexicon-2500–2638.pickle

3\. convert to vector  
test\_set.csv -> processed-test-set.csv with lexicon-2500–2638.pickle

4\. shuffle train dataset

5\. split the tokenized, lemmatized, vectorized test dataset into feature and label

  

### Presetting

We are going to use [Sentiment140 dataset](http://help.sentiment140.com/for-students/) from Stanford.

The format of the csv file: 

0 — the polarity of the tweet (0 = negative, 2 = neutral, 4 = positive)  
1 — the id of the tweet (2087)  
2 — the date of the tweet (Sat May 16 23:58:44 UTC 2009)  
3 — the query (lyx). If there is no query, then this value is NO\_QUERY.  
4 — the user that tweeted (robotickilldozr)  
5 — the text of the tweet (Lyx is cool)

import nltk  
from nltk.tokenize import word\_tokenize  
from nltk.stem import WordNetLemmatizer  
import pickle  
import numpy as np  
import pandas as pd  
  
lemmatizer = WordNetLemmatizer()  
  
'''  
polarity 0 = negative. 2 = neutral. 4 = positive.  
id  
date  
query  
user  
tweet  
'''

### define function to pre-process data

the function is to turn the raw data into the format we want.

def init\_process(fin,fout):

    outfile = open(fout,'a')

    with open(fin, buffering=200000, encoding='latin-1') as f:  
        try:  
            for line in f:  
                line = line.replace('"','')  
                initial\_polarity = line.split(',')\[0\]  
                if initial\_polarity == '0':  
                    initial\_polarity = \[1,0\]  
                elif initial\_polarity == '4':  
                    initial\_polarity = \[0,1\]  
  
                tweet = line.split(',')\[-1\]  
                outline = str(initial\_polarity)+':::'+tweet  
                outfile.write(outline)  
        except Exception as e:  
            print(str(e))  
    outfile.close()

\> ‘a’ means appending, which means whatever we do, the data will be add to the end of the file

\> buffering means that python read 200000 data a time so that python won’t read the data byte by byte, which makes it more efficient.

\> What the function do to our raw data: (read line by line)

(1) replace ‘ “ ‘ with ‘ ’

(2) turn the polarity from 0 and 4 to \[1, 0\] and \[0, 1\]

(3) concatenate the text and the polarity with “:::” as new data and write it into outfile.

### define function to create lexicon

lexicon is a bag of tokenized sentences without high-frequency and low-frequency words.

This function do tokenization and lemmatization every 2500 sentence.

def create\_lexicon(fin):  
    lexicon = \[\]  
    with open(fin, 'r', buffering=100000, encoding='latin-1') as f:  
        try:  
            counter = 1  
            content = ''  
            for line in f:  
                counter += 1  
                if (counter/2500.0).is\_integer():  
                    tweet = line.split(':::')\[1\]  
                    content += ' '+tweet  
                    words = word\_tokenize(content)  
                    words = \[lemmatizer.lemmatize(i) for i in words\]  
                    lexicon = list(set(lexicon + words))  
                    print(counter, len(lexicon))  
  
        except Exception as e:  
            print(str(e))  
  
    with open('lexicon.pickle','wb') as f:  
        pickle.dump(lexicon,f)

\> Notice! ‘:::’ is to concatenate polarity and text. The line.split(‘:::’)\[1\] is the text itself.

### define function to convert a file into vector

This function is to turn test dataset into processed test dataset. It use the lexicon created above to turn the tokenized and lemmatized word dataset into vector with numeric data, 1 means the word appears and 0 means the word doesn’t appear

Notice! because the train dataset is too large, we can’t use this function with the training dataset.

def convert\_to\_vec(fin,fout,lexicon\_pickle):  
	with open(lexicon\_pickle,'rb') as f:  
		lexicon = pickle.load(f)  
	outfile = open(fout,'a')  
	with open(fin, buffering=20000, encoding='latin-1') as f:  
		counter = 0  
		for line in f:  
			counter +=1  
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
  
			features = list(features)  
			outline = str(features)+'::'+str(label)+'\\n'  
			outfile.write(outline)  
  
		print(counter)

### define function to shuffle data

create a function to shuffle the training dataset.

def shuffle\_data(fin):  
	df = pd.read\_csv(fin, error\_bad\_lines=False)  
	df = df.iloc\[np.random.permutation(len(df))\]  
	print(df.head())  
	df.to\_csv('train\_set\_shuffled.csv', index=False)  
	  
shuffle\_data('train\_set.csv')

### define function to turn tokenized, lemmatized vectorized dataset into two set, feature and label

def create\_test\_data\_pickle(fin):  
  
	feature\_sets = \[\]  
	labels = \[\]  
	counter = 0  
	with open(fin, buffering=20000) as f:  
		for line in f:  
			try:  
				features = list(eval(line.split('::')\[0\]))  
				label = list(eval(line.split('::')\[1\]))  
  
				feature\_sets.append(features)  
				labels.append(label)  
				counter += 1  
			except:  
				pass  
	print(counter)  
	feature\_sets = np.array(feature\_sets)  
	labels = np.array(labels)