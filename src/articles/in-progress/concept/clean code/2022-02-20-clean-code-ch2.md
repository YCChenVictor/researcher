---
layout: post
title: clean code ch2
description: ''
date: '2022-02-20'
categories: mindset presentation
note:
mermaid: true
publish: true
---

## Introduction

<div class="mermaid">
classDiagram
  maintainability <|-- readability
  maintainability <|-- cowork

  readability : 1. Intention Revealing
  readability : 2. Avoid Disinformation
  readability : 3. Make Meaningful Distinctions
  readability : 4. Avoid Encodings
  readability : 5. Class Name & Method Name
  readability : 6. Avoid Mental Mapping
  readability : 7. Use Solution Domain Names
  readability : 8. Use Problem Domain Names
  readability : 9. Add Meaningful Context
  readability : 10. Do not Add Gratuitous Context

  cowork : 1. Use Pronounceable Names
  cowork : 2. Use Searchable Names
  cowork : 3. Do not Be Cute
  cowork : 4. Pick One Word per Concept
  cowork : 5. Do not Pun
</div>

## Why?

Because we do so much of naming, we’d better do it well to improve the maintainability. It will pay off in the short term and continue to pay in the long run.

## What?

### Intention-Revealing

#### variable

From

```ruby
d = 10 # elapsed time in days
```

to

```ruby
elapsed_time_in_days = 10
```

#### function

From

```ruby
def get_them
  list1 = []
  theList.each do |x|
    if (x[0] == 4)
      list1 << x
    end
  end
  list1
end
```

to

```ruby
def get_flagged_cells
  flagged_cells = []
  game_board.each do |cell|
    if (cell.flagged?) # write a method to check the status
      flagged_cells << cell
    end
  end
  flagged_cells
end
```

### Avoid Disinformation

The `o, l, 0, 1` making it hard to find out this is an unnecessary logic.

```ruby
def equal_one
  if o != 1
    l = 01
  else
    l = o * 1
  end
  l
end
```

### Make Meaningful Distinctions

#### Class name

From

```ruby
Book1
Book2
Book3
Product
ProductInfo
ProductData
```

to

```ruby
PictureBook
Encyclopedia
TextBook
Product
```

### Avoid Encodings (Hungarian Notation, Member Prefixes, Interfaces and Implementations)

#### variable

From

```ruby
str_phone = "0901xxxxxx"
```

to

```ruby
phone = "0901xxxxxx" # call class method to know the type
```

#### function

From

```ruby
def set_name(name)
  m_dsc = name # avoid m_
end
```

to

```ruby
def set_description(description)
  self.description = description
end
```

### Class Name & Method Name

Use **noun** in class name and use **verb** in method name.

From

```ruby
class SetEmployeeData
  def initialize(params)
  end

  def salary
  end
end
```

to

```ruby
class Employee
  def set_salary
  end
end
```

### Avoid Mental Mapping

Avoid reader mapping variables mentally; for example, `child` is better than `x` in following method

From

```ruby
children.each do |x|
  if x.age < 18
    teenagers << x
  return teenagers
end
```

to

```ruby
children.each do |child|
  if child.age < 18
    teenagers << child
  return teenagers
end
```

### Use Solution Domain Name & Use Problem Domain Names

#### Use Solution Domain Name

Use `postgresql_adapter` instead of `postgresql_connection` because programmers have the concept of adapter in design pattern.

#### Use Problem Domain Names

But use problem descriptions when there is no good professional wordings.

### Add Meaningful Context

For example, adding context to explain the logic of following method

From

```ruby
def printGuessStatistics(candidate, count)
  if count == 0
    number = "no"
    verb = "are"
    pluralModifier = "s"
  elsif count == 1
    number = "1"
    verb = "is"
    pluralModifier = ""
  else
    number = count.to_s
    verb = "are"
    pluralModifier = "s";
  end

  guessMessage = "There #{verb}, #{number}, #{candidate}#{pluralModifier}"
end
```

to

```ruby
class GuessStatisticsMessage
  def initialize(candidate, count)
    create_plural_dependent_message_parts(count)
    guessMessage = "There #{@verb}, #{@number}, #{@candidate}#{@pluralModifier}"
  end

  private
  def create_plural_dependent_message_parts(count)
    if count == 0
      there_are_no_letters
    elsif count == 1
      there_is_one_letter
    else
      there_are_many_letters(count)
    end
  end 

  def there_are_many_letters(count)
    @number = count.to_s
    @verb = "are"
    @pluralModifier = "s"
  end

  def there_is_one_letter
    @number = "1"
    @verb = "is"
    @pluralModifier = ""
  end

  def there_are_no_letters
    @number = "no"
    @verb = "are"
    @pluralModifier = "s"
  end
end
```

### Do not Add Gratuitous Context

For example, use `Student` instead of `OpenApplyStudent`

### Use Pronounceable Names

To communicate with other programmers,

From

```ruby
genymdhms
modymdhms
```

to

```ruby
generationTimestamp
modificationTimestamp
```

### Use Searchable Names

From

```javascript
for (let j=0; j<34; j++) {
  s += (t[j]*4)/5;
}
```

to

```javascript
const numberOfTasks = 4;
const realDaysPerIdealDay = 4;
const workDaysPerWeek = 5;
for (let j=0; j < numberOfTasks; j++) {
  realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
  realTaskWeeks = (realdays / workDaysPerWeek);
  sum += realTaskWeeks;
}
```

Then you can search the terms, `sum`, `task`, `per`, ...etc

### Do not Be Cute

Avoid using jokes such as `burnOutAll` to mean `destroy`

### Pick One Word per Concept and Don't Pun

Build a team convention, do not use `fetch`, `retrieve`, `get` for the same purpose. But also do not use `get` to all environments. For example, we can use `get` in backend and `fetch` in frontend.

## Reference
