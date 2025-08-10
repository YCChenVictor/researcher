---
title: (Tnesorflow) Operation to a list of variable
description: Round to 0 and 1
date: ''
categories: []
keywords: []
slug: ''
---

  

### Round to 0 and 1

import tensorflow as tf

\# create fake variables  
\# w = tf.Variable(\[0.47050506, 0.5705307, 0.5017093, 0.2827899, 0.45215878, 0.6673586, 0.38582358\])  
w = np.array(\[0.47050506, 0.5705307, 0.5017093, 0.2827899, 0.45215878, 0.6673586, 0.38582358\])

w\_new = tf.round(w)

with tf.Session() as sess:  
    # print preds  
    print(sess.run(w\_new, feed\_dict={  
          # x: batch\_xs,  
          # y: batch\_ys,  
    }))