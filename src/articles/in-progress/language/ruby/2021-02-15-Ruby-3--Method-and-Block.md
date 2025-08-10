---
layout: post
title: (Ruby_3) Method and Block
date: '2021-02-15T03:45:11.410Z'
categories: ruby
note: method
---

## Method

For example, the following method will print out 'hello, xxx'
```
def say_hello_to(name)  
  puts "hello, #{name}"  
end
```
### parameters default value
```
def say_something(message = "something")  
  "message: #{message}"  
end

p say_something "hi" # => message: hi  
p say_something      # => message: something
```
### the value to be returned by method
```
def bmi_calculator(height, weight)  
  return weight / height ** 2  
end

puts bmi_calculator(1.70, 80)
```
The code, `return`, will return the value once there are values being input to the method.

### ? and ! in a method

? is to return whether it is true or not. That is, it will return true or false. For example,
```
puts "".empty? # => true
```
! is to replace the original value. That is, it will replace the original value after we call the method. For example,
```
original_list = [1, 2, 3, 4, 5]  
reversed_list = original_list.reverse!

p reversed_list # => [5, 4, 3, 2, 1]
```
### variable or method
Ruby will print out local variable rather than the variable in a method if the `puts` is outside of the method. 
```
age = 18

def age  
  20  
end

puts age # => 18  
puts age() # => 20
```
### the number of parameters in a method

In Ruby, the brackets are usually being left out; for example,
```
<%= link_to('刪除', user, {method: :delete, data: {confirm: 'sure?'}, class: 'btn'}) %>
```
would be written as
```
<%= link_to '刪除', user, method: :delete, data: {confirm: 'sure?'}, class: 'btn' %>
```
In this example, the number of parameters in this method is 3

## Block

### example

**{…}** and **do … end**

### first example  
5.times { puts "Hello, Ruby" }

### second example
```
friends = ['aaa', 'bbb', 'ccc', 'ddd', 'eee']  
friends.each do |friend|  
  puts friend  
end
```
### yield

It can transfer the control right from method to block; for example,
```
def say_hello  
  puts "start"  
  yield # the place to transfer the control right from method to block outside the method  
  puts "end"  
end

say_hello {  
  puts "this is a block"  
}
```
the result of the code above:
```
start  
this is a block  
end 
```
### Pass parameters to block

For example, the following code
```
5.times do |i|  
  puts i # => print out 0 to 4  
end
```
```
puts i # => error
```
|i| means gradually passing value 0 to 4 to the block. If we print i outside the block, it returns error. What is i ? It actually passing value to a block with yield and the block is actually built in the function.

### Block can’t use return
(這邊少了一個例子)

Block is not a method, so no place to return to.

### The difference between **{…}** and **do…end**
```
p [*1..10].map { |i| i * 2 } # => 得到 [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
p [*1..10].map do |i| i * 2 end # => 得到 <Enumerator: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:map>
```
The reason why the results are different: doing {} first. If we recover the parentheses, the code will be as following
```
p([*1..10].map { |i| i * 2 })
p ([*1..10].map) do |i| i * 2 end
```
The first line will run {} first, which means *2 firstly and the second line will run from left firstly, which means mapping firstly.

### Block as object

Using Proc as following to convert block into object
```
greeting = Proc.new { puts "Hello" }
```
The parameters can also be called in a block
```
say_hello_to = Proc.new { |name| puts "Hello,#{name}"}  
say_hello_to.call("aaa") # => Hello,aaa
```
and the methods to call a Proc: (They all return same result)
```
say_hello_to.call("aaa")  
say_hello_to.("aaa")   
say_hello_to["aaa"]  
say_hello_to === "aaa"  
say_hello_to.yield "aaa"
```

### each vs map vs select vs collect
```
arr = [1,2,3]

# each
result = arr.each {|element| element ** 2 }
puts result # => 1, 2, 3

# map
result = arr.map {|element| element ** 2 }
puts result # => 2, 4, 6

# collect
result = arr.collect {|element| element ** 2 }
puts result # => 2, 4, 6

result = arr.select  { |element|  element.even?  } 
puts result # => 2
```
