---
title: (Tensorflow) 再探 TFRecord
description: 'reference: https://dotblogs.com.tw/shaynling/2017/11/21/162229'
date: ''
categories: []
keywords: []
slug: ''
---

After loading data into TFRecord, we want to read it out to do prediction.

### The basic steps of that tensorflow deals with data:

1.  read: file -> specific file format for tensorflow -> main tensorflow function
2.  write: main tensorflow function -> file

### The steps in reading normal data in tensorflow:

#### Step 1: use tf.string\_input\_producer to produce the file queue (specific file format)

\> num\_epoches = N means that the producer reads all the data in the file set for N times; for example, if there are 2 file in the file set and N = 2, then there would be 4 data out. If num\_epoches = None, there will be no limits to the loops until other suspending conditions occur.

#### Step 2: use tf.WholeFileReader to read the file queue

If we want to read TFRecord file, please use tf.TFRecordReader; if we want to read normal file of the same file format, use tf.WholeFileReader instead.

#### Step 3: use tf.train.Coordinator and tf.train.start\_queue\_runners to start the queue

#### Step 4: Needs to shut down the queues not in use after training

#### The example code:

import tensorflow as tf  

  
\# 全部要讀取的文件名   
filename = \['0.jpg', '2.jpg', '6.jpg', '7.jpg'\]  

\# 產生文件名隊列   
filename\_queue = tf.train.string\_input\_producer(filename, shuffle=False, num\_epochs=1)  

\# 數據讀取器，不要用錯囉！   
#reader = tf.TFRecordReader()    
reader = tf.WholeFileReader()   
key, value = reader.read(filename\_queue)  

with tf.Session() as sess:       

    # 初始化是必要的動作     
    sess.run(tf.global\_variables\_initializer())  
    sess.run(tf.local\_variables\_initializer())           
   
    # 建立執行緒協調器       
    coord = tf.train.Coordinator()          

    # 啟動文件隊列，開始讀取文件       
    threads = tf.train.start\_queue\_runners(coord=coord)   
    count = 0            
    try:           
        while not coord.should\_stop():   
                  
            # 這邊讀檔               
            image\_data = sess.run(value)                            
              
            # 這邊寫檔               
            # 請注意，因為 WholeFileReader 讀進來的是二進制檔，         
            # 輸出的時候也要使用二進制的方式。                 
            with open('./test\_%d.jpg' % count, 'wb') as f:  
                f.write(image\_data)                   
                count += 1                      

    except tf.errors.OutOfRangeError:               
        print('Done!')        
      
    finally:           
        # 最後要記得把文件隊列關掉           
        coord.request\_stop()          

    coord.join(threads)

### The steps in reading TFRecord data

**Step 1: Turn the packed TFRecord file into queue by tf.train.string\_input\_producer**

**Step 2: use tf.TFRecordReader() to read data**

**Step 3: start to unpack the TFRecord file:**

The steps in packing TFRecord file: **original file > Feature > Features > Example > TFRecord**

The steps in unpacking TFRecord file: **TFRecord > Example > Features > Feature > original file**

We already have the Example data from tf.TFRecordReader(). 

Then, use **tf.parse\_single\_example** to turn **tf.train.Example** into **tf.train.Features.** 

Then, use **tf.decode\_raw** or **tf.cast** to turn **tf.train.Features** into **tf.train.Feature**

#### The example code:

import cv2   
import tensorflow as tf  

\# TF檔   
filename = './py\_Train.tfrecords'  

\# 產生文件名隊列   
filename\_queue = tf.train.string\_input\_producer(\[filename\],                                                   shuffle=False,                                                   num\_epochs=1)  

\# 數據讀取器   
reader = tf.TFRecordReader()   
key, serialized\_example = reader.read(filename\_queue)  

\# 數據解析   
img\_features = tf.parse\_single\_example(           serialized\_example, features={'Label': tf.FixedLenFeature(\[\], tf.int64), 'image\_raw': tf.FixedLenFeature(\[\], tf.string),})  
        
image = tf.decode\_raw(img\_features\['image\_raw'\], tf.uint8)   
image = tf.reshape(image, \[42, 42\])    
label = tf.cast(img\_features\['Label'\], tf.int64)  

with tf.Session() as sess:     

    # 初始化是必要的動作  
    sess.run(tf.global\_variables\_initializer())  
    sess.run(tf.local\_variables\_initializer())          

    # 建立執行緒協調器       
    coord = tf.train.Coordinator()          

    # 啟動文件隊列，開始讀取文件       
    threads = tf.train.start\_queue\_runners(coord=coord)      

    count = 0      

    try:           
        # 讀 10 張影像           
        while count<10:                            
            # 這邊讀取               
            image\_data, label\_data = sess.run(\[image, label\])  

            # 這邊輸出  
            # 因為已經經過解碼，二進制的資料已經轉換成影像檔，因此可以直接使用  
            # 影像檔的方式輸出資料。  
            cv2.imwrite('./tf\_%d\_%d.jpg' % (label\_data, count), image\_data)             

            count += 1          

            print('Done!')                        
      
    except tf.errors.OutOfRangeError:           
        print('Done!')      

    finally:           
        # 最後要記得把文件隊列關掉              
        coord.request\_stop()          

    coord.join(threads)