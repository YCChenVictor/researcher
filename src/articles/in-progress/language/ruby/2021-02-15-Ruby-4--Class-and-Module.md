---
layout: post
title: (Ruby_4) Class and Module
date: '2021-02-15T08:48:34.784Z'
categories: ruby
note: none
---

### Class

In Ruby, almost anything is an object. Block is not an object because it can not live alone.

#### What is Object

Object = state + behavior. For example, we can define a human as following:

1.  states: black hair, yellow skin, age 18
2.  behaviors: eat, drink, sleep

#### What is Class

Class is a defined structure to create an object. For example,

class Animal  
  def eat(food)  
    puts "#{food} tastes good!!"  
  end  
end

Then we can create an object with class

kitty = Animal.new  
kitty.eat "tuna" # => print out "tuna tastes good!!"

#### Class with other customization

We can customize the class with some predefined parameters. For example, if we want a cat with name, ‘kitty’ and gender, ‘female’

class Cat

  def initialize(name, gender)  
    [@name](http://twitter.com/name "Twitter profile for @name") = name  
    [@gender](http://twitter.com/gender "Twitter profile for @gender") = gender  
  end

  def say\_hello  
    puts "hello, my name is #{[@name](http://twitter.com/name "Twitter profile for @name")}"  
  end

end

kitty = Cat.new("kitty", "female")  
kitty.say\_hello # => hello, my name is kitty

#### Instance variable

The variable started with @

#### Acquire Instance variable

The instance variable cannot be acquired outside the class independently. We need predefined method to do so. For example,

class Cat  
    
  def initialize(name, gender)  
    [@name](http://twitter.com/name "Twitter profile for @name") = name  
    [@gender](http://twitter.com/gender "Twitter profile for @gender") = gender  
  end

  def say\_hello # the function to print out instance variable  
    puts "hello, my name is #{[@name](http://twitter.com/name "Twitter profile for @name")}"  
  end

  def name  
    [@name](http://twitter.com/name "Twitter profile for @name")  
  end

  def name=(new\_name)  
    [@name](http://twitter.com/name "Twitter profile for @name") = new\_name  
  end

end

kitty = Cat.new("kitty", "female")  
kitty.name = "nancy"  
puts kitty.name # => nancy

There is a quicker method, using attr\_accessor. Then we can create reader and writer.

class Cat  
    
  attr\_accessor :name  
    
  def initialize(name, gender)  
    [@name](http://twitter.com/name "Twitter profile for @name") = name  
    [@gender](http://twitter.com/gender "Twitter profile for @gender") = gender  
  end

  def say\_hello  
    puts "hello, my name is #{[@name](http://twitter.com/name "Twitter profile for @name")}"  
  end

end

#### Class Method and Instance Method

**Instance method example**

Instance method applies on instance variable; for example,

kitty = Cat.new("kitty", "female")  
kitty.say\_hello # this is an instance method

**Class method example**

Class method applies on class. self means the class itself.

class Cat  
  def self.all  
    # ...  
  end  
end

Cat.all # this is a method that applies on class, Cat

#### Access Control of Method

For example,

class Cat

  def eat # public method  
    puts "good!"  
  end

  protected  
  def sleeping # protected method  
    puts "zzzzzzzzz..."  
  end

  private  
  def gossip # private method  
    puts "Don't tell anyone"  
  end

end

public # the method can be accessed by all people  
private # the method can only accessed by class itself  
protected # between public and private

**Summary first:**

1.  All three method can be called in a class
2.  Only public method can be called outside a class
3.  Private method can not have a receiver in class but protected method can

For example, the following code proves 1 and 2

kitty = Cat.new  
kitty.eat # => "gool!"  
kitty.sleeping # => NoMethodError  
kitty.gossip # => NoMethodError

and the following code proves 3

class Person    
    
  def speak  
    puts "Hey, Tj!"  
  end    
    
  def whisper\_louder  
    whisper  
  end 

  private  
  def whisper  
    puts "His name's not really 'Tj'."  
  end 

  protected   
  def greet  
   puts "Hey, wassup!"  
  end

end

class Me < Person  
  def be\_nice  
    greet   
  end

endtj = Me.new  
tj.be\_nice # "Hey, wassup!"  
tj.greet # NoMethodError

#### Inheritance

For example, the following code build dog and cat class inherited from animal class

class Animal

  def eat(food)  
    puts "#{food} tastes good!!"  
  end

end

class Cat < Animal  
end

class Dog < Animal  
end

#### Open Class

In Ruby, any method can be modified. even the built in method.

#### Same Class Name

If we create same class. It merges the two classes into one with all method preserved.

### Module

It can be considered as plug-in. If we want a dog which can fly on a sky, we can create a class named dog with method, fly. However, it is quit strange to change the preexisted class just because we need a flyable dog. Then we can create a module and add it into the class, dog; for example,

module Flyable  
  def fly  
    puts "I can fly!"  
  end  
end

class dog  
  include Flyable  
end

kitty = dog.new  
kitty.fly

### The difference between Class and Module

Module is actually the upperclass of Class. It cannot use new to create an instance and cannot inherit from other class.