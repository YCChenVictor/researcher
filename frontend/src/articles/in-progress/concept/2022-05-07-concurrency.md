---
layout: post
title:
description: ''
date: '2022-05-07'
categories: mindset
note:
mathjax:
mermaidJS: true
threeJS:
function_plot:
publish: true
---

## Introduction

Concurrency is a decoupling strategy that separates the execution of tasks from the timing of their execution. It becomes necessary when there are numerous tasks that need to be completed within a given timeframe. However, concurrency can introduce issues such as different results being returned by the same method simultaneously. To address these problems, principles like Single Responsibility, limiting the scope of data, using copies of data, and ensuring thread independence can be applied. Additionally, employing thread-safe collections, implementing producer-consumer and reader-writer patterns, and handling synchronization through semaphores can help mitigate concurrency-related challenges.

## Why

Concurrency is a **decoupling** strategy. It helps us decouple what gets done **from when** it gets done, so we need it if there are too many tasks should be done in a given time.

## How

### Issues

Concurrency may cause problems that **same method** return **different results** at the same time and the way to solve the problems is as follow:

* Concurrency Defense Principle
  * Single Responsibility Principle: Only responsible for a **signle client**
  * Corollary, Limit the Scope of Data: Only **one service** for updating one scope of data
  * Corollary, Use Copies of Data: Multiple services but only **one way** to insert data
  * Corollary, Threads Should Be as Independent as Possible: combined with the above strategies, it should be only **one client** changes only **one scope of data** at the same time

Given the above design principle, we may still facing the following problems:

* Thread-Safe Collections: Use the thread-safe collections to avoid updating data based on the wrong old data
* Producer-Consumer: Use this design pattern to solve multiple calculation of threads in a given resources such as memory
<div class="mermaid">
  graph LR
    id1((parent_1)) -- push: calculations --> id2[jobs_queue]
    id3((student_1)) -- push: calculations --> id2[jobs_queue]
    id4((...)) -- push: any_other_calculations --> id2[jobs_queue]
  
    id2[jobs_queue] --> id5((machine1))
    id2[jobs_queue] --> id8((machine1))
    id2[jobs_queue] --> id6((machine2))
    id2[jobs_queue] --> id7((...))
</div>

* Reader-Writer: Use semaphore to ensure only **one writer** to a data at the same time

We will use lots of `synchronized` method to solve the problems above, causing following problems:

* Client-side: Synchronized on the client side but we may forgot to do so
* Server-side: Synchronized on the server side but subtle problems occur when there are multiple **dependent** variables needs synchronization
* **Dining Philosophers**:
  * Starvation: Some threads is **prohibited from** proceeding for an excessively long time or forever
  * Deadlock: Threads **waiting** for **each other** to finish
  * Livelock: Threads trying to do work but finding another “in the way.”
  * (TBC) Add a graph of breast touching alley

Then finally, we have other issues:

* Writing Correct Shut-Down Code Is Hard: review the jobs regularly and find out which job often have dining philosophers problem and solve it on the early stage
* Testing Threaded Code
  * Treat Spurious Failures as Candidate Threading Issues: When a minor system issue occurs, it is invariably related to threads.
  * Get Your Nonthreaded Code Working First: However, let's first ensure that the code unrelated to threads is implemented correctly.
  * Make Your Threaded Code Pluggable: Make the code related to threads easily interchangeable, so that various possibilities can be explored and tested.
  * Make Your Threaded Code Tunable: You should make the necessary modifications to your threaded code while ensuring that the system continues to run smoothly.
  * Run with More Threads Than Processors: Increase the number of threads compared to processors so that you have a chance to encounter the Dining Philosophers problem early on and find a solution for it.
  * Run on Different Platforms: Early deployment of your threads on different platforms allows you to identify bugs and issues ahead of time.
  * Instrument Your Code to Try and Force Failures: You can intentionally set waiting times or change the order of thread execution to reproduce a specific combination of events and try to identify and resolve the problem.

### Use case

For example, let's say Faria Kindergarten is organizing a quick reflex competition. The engineers have designed a button that, when pressed, will increase the count by one. It goes as follows:

```ruby
def update
  @score += 1
end
```

If parents compete with their children, but the engineers intentionally programmed the same method to be triggered upon pressing the button, it would be as follows:

```ruby
def update(params)
  ...
  params[:class].find(params[:id]).score += 1
  ...
end
```

If the competition has become more complex over time, with the addition of a quiz mechanism and the need for complex calculations, let's assume that the competition now requires the machine to perform a comprehensive computation lasting 5 to 10 seconds. In this case, if concurrency is preferred, the update would be as follows:

```ruby
def update(params)
  ...
  CheckService.perform_sync(params)
  ...
end

def CheckService
  ...
  def perform
    if correct?
      params[:class].find(params[:id]).counter += 1
    end
  end

  private
  def correct?
    ... # 5 ~ 10 seconds
  end
end
```

After some time, the boss noticed that the children's scores were consistently higher than those of the parents, and wanted the engineers to investigate the reason behind it. At this point, we encounter the first issue, and the principle to solve it is the Single Responsibility Principle. Since all the methods are written in the same code, debugging, experimentation, and code changes will affect the other party. Therefore, it would be best to have one service for each client. The solution is as follows:

```ruby
def update_parent
  ...
  CheckParentService.perform_sync(params)
  ...
end

def update_student
  ...
  CheckStudentService.perform_sync(params)
  ...
end
...
```

In the ongoing investigation, it was discovered that the parents were answering too quickly, resulting in the service retrieving an outdated score during the score update process. As a result, the service would insert multiple scores with the same value. This is the second issue we encountered. To solve it, we can apply two principles: **Limit the Scope of Data and Use Copies of Data**.

<a id="limit_the_scope_of_data_example" href="#limit_the_scope_of_data">Limit the Scope of Data</a> does synchronization in the service. We need to synchronize the number of counter before we update the value. In ruby, we use `Mutex` to do the trick as follow:

```ruby
class CheckParentService
  def initialize
    ...
    @jobs_mutex = Mutex.new
    @counter = Parent.find(params[:id]).counter
    ...
  end

  def synchronize(&block)
    @jobs_mutex.synchronize(&block)
  end

  def perform
    if correct?
      synchronize do # 要存進去的時候同步一次
        @counter += 1
      end
    end
  end

  private
  def correct?
    ... # 5 ~ 10 seconds
  end
end
```

<a id="use_copies_of_data_example" href="#use_copies_of_data">Use Copies of Data</a> does not share data in the service but collect all the calculated information and do a single update as follow:

```ruby
class Parent
  attr_reader :counter
  ...
end

class CheckParentService
  def initialize
    ...
    @counter = Parent.find(params[:id]).counter
    @corrects = []
    ...
  end

  def perform
    if correct?
      @corrects << 1
    end
  end

  private
  def correct?
    ...
  end
end

# Scheduled task to update the counter
every :day, at: '12:00 PM' do
  sum = @corrects.sum
  @counter.update(sum)
end
```

Even with this design in place, we may still encounter race condition. Apart from the Queue, all other data structures are susceptible to race conditions because they are not Thread-Safe Collections. In Ruby, the solution is to use the concurrent-ruby gem to create thread-safe data structures or to synchronize data using Mutex, as mentioned earlier.

Later on, the engineers managed to resolve these issues. However, after some time, the parents' scores were still lower than those of the students, and occasionally, the situation would suddenly reverse. After conducting thorough research, the engineers discovered that many of the parents' jobs were not completed by midnight each day. As a result, the scores fluctuated, being sometimes high and sometimes low. This gave rise to the next issue, <a id="producer_consumer_example" href="#producer_consumer">Producer-Consumer</a>. We can design a queue where calculations are only inserted when there are available machine resources. This way, we can avoid losing any jobs. Therefore, if the boss is keen on having the calculations completed by midnight every day, they would need to invest more money in additional machines to increase the number of consumers. This would ensure that there are enough resources to handle the workload, and the issue can be resolved. We typically use Sidekiq to achieve this functionality.

After resolving the above issues, the boss wants to see real-time score updates, which necessitates synchronization within the Service. At this point, we encounter the next issue, the "Reader-Writer problem." There might be a race condition when two writers attempt to write to the same data concurrently. To address this, our solution is to introduce a semaphore that indicates whether there is currently a writer updating that particular data. Here is an example:

```ruby
class CheckParentService
  def initialize
    @jobs_mutex = Mutex.new
    @can_write = nil
  end
  ...
  def perform
    if correct? && @can_write # 寫之前先 check can_write
      synchronize do
        @counter += 1
        @can_write = false # 寫之前先把 can_write 關掉
        save!
        @can_write = true
      end
    end
  end
  ...
end
```

After resolving the above situations, we encounter another issue arising from the minor problems caused by the use of synchronize. Suppose the boss wants to make the competition more exciting by changing it to see who can answer 100 questions correctly. Later, a parent gets angry, claiming to have answered 101 questions. The boss asks the engineers to investigate the issue, and they discover that the problem lies with the synchronize method in this service. The original logic implemented by the engineers was to stop awarding points after answering 100 questions correctly, as shown below:

```ruby
class CheckParentService
  def initialize
    @counter = Parent.find(params[:id]).counter
    @accomplished = false
  end

  def perform
    @accomplished = true if @counter >= 100 # key logic
    if correct? && !@accomplished
      synchronize do
        @accomplished # get @accomplished from other threads
        @counter += 1
        save!
      end
    end
  end
  ...
end
```

In fact, this issue is understandable because the calculation for each question takes 5-10 seconds. Therefore, it is possible that the parent has actually answered 100 questions but is still in the calculation process, resulting in the situation where the parent has answered one extra question. To address this, changes are required on both the client-side and server-side.


```ruby
def update_parent
  if @accomplished
    return 'mission accomplished'
  else
    CheckParentService.perform_sync(params)
  end
end

class CheckParentService
  def initialize
    @counter = Parent.find(params[:id]).counter
  end

  def perform
    if @counter >= 100
      @accomplished = true
    elsif correct? && @counter < 100
      synchronize do
        @counter += 1
        save!
      end
    end
  end
  ...
end
```

It is indeed noticeable that the issue mentioned above arises from the need to synchronize two variables that are interrelated. The clean code author suggests that the best approach is to design the logic in a way that **minimizes the interdependence of variables requiring synchronization**.

Later, the boss felt that the parents' scores were too high, so the difficulty of the questions was adjusted, requiring more temporary storage for calculations. The engineers noticed that a certain type of challenging job was never being processed by the computer. This was because the job required at least 5MB of temporary storage, but it was always being preempted by other jobs before it could acquire the necessary 5MB of storage. This situation is known as the "Starvation" problem in the context of the Dining Philosophers problem.

```ruby
class CheckParentService
  def initialize
    ...
    @stop = true
    synchronize do
      @stop
    end
  end

  def perform
    synchronize do
      @stop = false
    end
  end
  ...
end

class CheckStudentService
  def initialize
    ...
  end

  def perform
    if !@stop # 如果沒有來自 ParentService 叫停的信號再做下去
      ...
    end
  end
  ...
end
```

Later, the boss came up with the idea of implementing a mechanism where both parents and students could answer questions together. Each question required a certain amount of computation time. Unfortunately, due to poor design, this implementation resulted in a deadlock.

```ruby
class CheckParentService
  ...
  def perform
    if @student_correct
      if correct?
        @parent_correct = true
      end
    else
      # waiting
    end
  end
  ...
end

class CheckStudentService
  ...
  def perform
    if @parent_correct
      if correct?
        @student_correct = true
      end
    else
      # waiting
    end
  end
  ...
end
```

In the above design, the situation you described could lead to a scenario where both @parent_correct and @student_correct are nil. Since both parties need to wait for the other to be marked as correct before proceeding with further calculations, neither of them would progress, resulting in no computations being performed.

To address this issue, a possible solution is to use `semaphores`. When a job arrives at the CheckParentService, it can first check the signal from the CheckStudentService. If it determines that the student is still performing calculations, the parent job can proceed with its own computations independently.

```ruby
class CheckParentService
  def initialize
    ...
    synchronize do
      @student_calculating
    end
  end

  def perform
    if @student_correct || @student_calculating
      # do the calculation
      if correct?
        @parent_correct = true
      end
    else
      # waiting
    end
  end
  
  private
  def correct?
    @parent_calculating = true
    ...
  end
end
...
```

We may use another solution where one party waits for the other to finish calculations before proceeding, may seem like a potential solution. However, in practice, it can lead to a situation called "livelock," where both parties continuously yield to each other without making progress. As a result, this is not a good solution.

```ruby
class CheckParentService
  ...
  def perform
    if @student_calculating
      @parent_calculating = false
      # waiting
    else
      if correct?
        @parent_correct = true
      end
    end
  end

  private
  def correct?
    @parent_calculating = true
    ... # lots of calculation
    @parent_calculating = false
  end
  ...
end

class CheckStudentService
  ...
  def perform
    if @parent_calculating
      @student_calculating = false
      # waiting
    else
      if correct?
        @student_correct = true
      end
    end
  end
  ...

  private
  def correct?
    @student_calculating = true
    ... # lots of calculation
    @student_calculating = false
  end
  ...
end
```

## What

## Reference

clean code by Robert
