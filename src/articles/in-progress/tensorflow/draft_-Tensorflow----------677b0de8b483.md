---
title: (Tensorflow) 存檔 & 讀檔
description: 'reference: https://dotblogs.com.tw/shaynling/2018/04/26/164331'
date: ''
categories: []
keywords: []
slug: ''
---

After training model, if we want to make prediction, we need to use the model again. The following are going to show the model saving and reading process.

### The Saving Procedure

1.  The data below **tf.train.Saver** won’t be saved
2.  **tf.add\_to\_collection** is to collect the data we want to a set and can be saved by tf.train.Saver in the future
3.  sue **tf.train.restore** to restore the saved model

\# 以下為主程式

\# tfrecord 檔案位置   
filename = './py\_Train.tfrecords'  

\# batch 可以自由設定   
batch\_size = 256  

\# 0-9共10個類別，請根據自己的資料修改   
Label\_size = 10  

\# 調用 read\_and\_decode 函數   
image\_batch, label\_batch = read\_and\_decode(filename, batch\_size)  

\# 轉換陣列的形狀   
image\_batch\_train = tf.reshape(image\_batch, \[-1, 42\*42\])  

\# 把 Label 轉換成獨熱編碼   
label\_batch\_train = tf.one\_hot(label\_batch, Label\_size)  

\# W 和 b 就是我們要訓練的對象   
W = tf.Variable(tf.zeros(\[42\*42, Label\_size\])) b = tf.Variable(tf.zeros(\[Label\_size\]))  

\# 我們的影像資料，會透過 x 變數來輸入    
x = tf.placeholder(tf.float32, \[None, 42\*42\])  

\# 這是參數預測的結果   
y = tf.nn.softmax(tf.matmul(x, W) + b)  

\# 這是每張影像的正確標籤   
y\_ = tf.placeholder(tf.float32, \[None, 10\])  

\# 計算最小交叉熵   
cross\_entropy = tf.reduce\_mean(tf.nn.softmax\_cross\_entropy\_with\_logits\_v2(labels=y\_, logits=y))  

\# 使用梯度下降法來找最佳解   
train\_step = tf.train.GradientDescentOptimizer(0.05).minimize(cross\_entropy)  

\# 計算預測正確率   
correct\_prediction = tf.equal(tf.argmax(y, 1), tf.argmax(y\_, 1)) accuracy = tf.reduce\_mean(tf.cast(correct\_prediction, tf.float32)) 

#################################################### #################################################### 

\# 新增的內容在這邊  
\# 計算 y 向量的最大值   
y\_pred = tf.argmax(y, 1) 

\# 建立 tf.train.Saver 物件   
saver = tf.train.Saver()  

\# 將輸入與輸出值加入集合   
tf.add\_to\_collection('input' , x)   
tf.add\_to\_collection('output', y\_pred) 

#################################################### ####################################################

with tf.Session() as sess:     

    # 初始化是必要的動作      
    sess.run(tf.global\_variables\_initializer())     
    sess.run(tf.local\_variables\_initializer())          

    # 建立執行緒協調器       
    coord = tf.train.Coordinator()         

    # 啟動文件隊列，開始讀取文件       
    threads = tf.train.start\_queue\_runners(coord=coord)          

    # 迭代 100 次，看看訓練的成果       
    for count in range(100):       
           
        # 這邊開始讀取資料           
        image\_data, label\_data = sess.run(\[image\_batch\_train, label\_batch\_train\])         
        
        # 送資料進去訓練           
        sess.run(train\_step, feed\_dict={x: image\_data, y\_: label\_data})                    
          
        # 這裡是結果展示區，每 10 次迭代後，把最新的正確率顯示出來           
        if count % 10 == 0:               
            train\_accuracy = accuracy.eval(feed\_dict={x: image\_data, y\_: label\_data})               
            print('Iter %d, accuracy %4.2f%%' % (count, train\_accuracy\*100))      

    # 結束後記得把文件名隊列關掉       
    coord.request\_stop()        
    coord.join(threads)       
   
    ####################################################  
    # 這裡也是新增的內容  
    # 存檔路徑  
    save\_path = './model/test\_model'        
    # 把整張計算圖存檔       
    spath = saver.save(sess, save\_path)       
    print("Model saved in file: %s" % spath)          
    ####################################################

### The restore procedure

with tf.Session() as sess:        
    # load model   
    save\_path = "./model/test\_model.meta"      

    # 使用 import\_meta\_graph 載入計算圖       
    saver = tf.train.import\_meta\_graph(save\_path)      

    # 使用 restore 重建計算圖       
    saver.restore(sess, "./model/test\_model")          

    # 取出集合內的值       
    x = tf.get\_collection("input")\[0\]       
    y = tf.get\_collection("output")\[0\]      

    # 讀一張影像       
    img = cv2.imread('img1.jpg', 0);        
    # 辨識影像，並印出結果       
    result = sess.run(y, feed\_dict = {x: img.reshape((-1, 42\*42))})    
    print(result)

### What if the saving procedure pause during training?

import tensorflow as tf  

\# 建立 tf.train.Saver 物件   
saver = tf.train.Saver()  

\# 存檔路徑  
save\_path = './model/test\_model'  

\# 狀態指定 iscontinue = 1

with tf.Session() as sess:     

    # 初始化       
    sess.run(tf.global\_variables\_initializer())   
    sess.run(tf.local\_variables\_initializer())          

    coord = tf.train.Coordinator()       
    threads = tf.train.start\_queue\_runners(coord=coord)          

    if not iscontinue:           
        # 迭代 100 次，看看訓練的成果           
        for count in range(100):  
             
            # 讀取資料               
            image\_data, label\_data = sess.run(\[image\_batch\_train, label\_batch\_train\])                     

            # 訓練               
            sess.run(train\_step, feed\_dict={x: image\_data, y\_: label\_data})                          

            # 結果展示               
            if count % 10 == 0:                   
                train\_accuracy = accuracy.eval(feed\_dict={x: image\_data, y\_: label\_data})                   
                print('Iter %d, accuracy %4.2f%%' % (count, train\_accuracy\*100))                                  

            # 存檔                   
            spath = saver.save(sess, save\_path, global\_step=count)                
            print("Model saved in file: %s" % spath)                         
        else:           
            # 重建 model          
            last\_ckp = tf.train.latest\_checkpoint("./model")   
            saver = tf.train.import\_meta\_graph(last\_ckp+'.meta')     
            saver.restore(sess, last\_ckp)                         
              
            # 延續舊有資料繼續迭代 100 次           
            for count in range(100, 200):                    
                # 讀取資料               
                image\_data, label\_data = sess.run(\[image\_batch\_train, label\_batch\_train\])                    
                # 訓練               
                sess.run(train\_step, feed\_dict={x: image\_data, y\_: label\_data})                
                # 結果展示               
                if count % 10 == 0:                   
                    train\_accuracy = accuracy.eval(feed\_dict={x: image\_data, y\_: label\_data})                   
                    print('Iter %d, accuracy %4.2f%%' % (count, train\_accuracy\*100))                                    
                    spath = saver.save(sess, save\_path, global\_step=count)                   
                    print("Model saved in file: %s" % spath)  
        
    # 關掉文件名隊列       
    coord.request\_stop()        
    coord.join(threads)