---
layout: post
title: clean code ch7
description: ''
date: '2022-03-27'
categories: mindset presentation
note:
mathjax:
mermaid:
publish: true
---

## Introduction

The methodology forces coders to handle exception with Try-Catch-Finally Statement

## Why?

We want code that handles errors with grace and style.

## How?

1. Use Exception Rather Than Return Codes: we easily forget the `else` section
2. Write your Try-Catch-Finally Statement First: use TDD to force exceptions
3. Use Unchecked Exceptions: not an issue in ruby
4. Provide Context with Exceptions: write as clear as possible
5. Define Exception Classes in Terms of a Caller’s Needs: the concept of inteface
6. Define the Normal Flow: remove the exception if it should be part of business logic
7. Don’t Return Null
8. Don’t Pass Null

## What?

### Use Exception Rather Than Return Codes

Given device has been initalized somewhere and we use DeviceHandle to handle this device,

```ruby
class DeviceController
  ...
  def send_shut_down
    handle = DeviceHandle.new(ENVIRONMENT)
    if handle == DeviceHandle.VALID
      record = retrieve_device_record(handle)
      if record.getStatus != DEVICE_SUSPENDED
        pause_device(handle)
        clear_device_work_queue(handle)
        close_device(handle)
      else
        logger.log("Device suspended. Unable to shut down");
      end
    else
      logger.log("Invalid handle for: " + ENVIRONMENT);
    end
  end
  ...
```

to

```ruby
class DeviceController {
  ...
  def send_shut_down
    begin
      try_to_shut_down
    rescue DeviceShutDownError => e
      logger.log(e)
    end
  end

  private
  def try_to_shut_down
    handle = DeviceHandle.new(ENVIRONMENT)
    if handle == DeviceHandle.VALID
      record = retrieve_device_record(handle)
      if record.getStatus != DEVICE_SUSPENDED
        pause_device(handle)
        clear_device_work_queue(handle)
        close_device(handle)
      end
    end
  end
```

### Write your Try-Catch-Finally Statement First

```ruby
RSpec.describe 'file' do
  ...
  context 'after retriving an invalid file' do
    it 'should return exception' do
      expect{File.retrieve('invalid_file')}.to raise_error(NoFileError)
    end
  end
  ...
end
```

Then given the spec, we will write method as follow:

```ruby
class File
  ...
  def retrieve(file_name)
    begin
      'some process'
    rescue NoFileError => e
      puts 'cannot find the file' + e
    end
  end
  ...
end
```

This approach makes sure exception to be included in the methods.

### Use Unchecked Exceptions

There is **no** checked exceptions in **ruby** but in **java**. Java will **check** obvious errors while compiling; to avoid it in java, use Try-Catch-Finally statements. Since the author forces us to use this statements at all time, we do not need checked exceptions.

```java
public class CheckedVsUnchecked {
  
  public satic void main(String[] args){
    
    readFile('myFile.txt'); // no myFile.txt
    
  }

  private static void readFile (String fileName) {
    try { // must use it or it will not compile
      FileReader reader = new FileReader(fileName);
    }
    catch (FileNotFoundException fnfe) {
      System.out.println('No file found');
    }
  }
}
```

### Provide Context with Exceptions

use

```ruby
class File
  ...
  def retrieve(file_name)
    begin
      'some process'
    rescue NoFileError => e
      puts 'cannot find the file' + e
    end
  end
  ...
end
```

instead of

```ruby
class File
  ...
  def retrieve(file_name)
    begin
      'some process'
    rescue Exception => e
      e
    end
  end
  ...
end
```

### Define Exception Classes in Terms of a Caller’s Needs

For example, ACMEPort may throw three kinds of exceptions `DeviceResponseException`, `ATM1212UnlockedException`, and `GMXError`. We should use the concept of API

From

```ruby
port = ACMEPort.new(12);

def perform
  begin
    port.open()
  rescue DeviceResponseException => e
    reportPortError(e)
    logger.log("Device response exception", e)
  rescue ATM1212UnlockedException => e
    reportPortError(e)
    logger.log("Unlock exception", e)
  rescue GMXError => e
    reportPortError(e)
    logger.log("Device response exception")
  ensure
    ...
  end
```

to

```ruby
port = LocalPort.new(12)

def perform
  begin
    port.open
  rescue PortDeviceFailure => e
    reportError(e);
    logger.log(e.getMessage(), e);
  ensure
    ...
  end
end

class LocalPort
  def initialize(portNumber)
    innerPort = ACMEPort.new(portNumber)
  end

  def open
    begin
      innerPort.open
    rescue DeviceResponseException => e
      raise PortDeviceFailure(e)
    rescue ATM1212UnlockedException => e
      raise PortDeviceFailure(e)
    rescue GMXError => e
      raise PortDeviceFailure(e)
    end
  end
end
```

### Define the Normal Flow

Avoid putting business logic into rescue section

From

```ruby
def perform
  begin
    meal_expenses = ExpenseReportDAO.meals(employee.ID)
    m_total += meal_expenses
  rescue
    m_total += meal_per_diem
  end
end
```

to

```ruby
def perform
  meal_expenses = ExpenseReportDAO.meals(employee.ID)
  m_total += meal_expenses
end

class ExpenseReportDAO
  def meals
    if meal_expense
      return meal_expense
    else
      return per_diem_amount
    end
  end
end
```

### Don’t Return Null

Return empty object or raise an error instead

From

```ruby
employees = get_employees

if employees != nil
  employees.each do |employee|
    total_pay += employee.pay
  end
end

def get_employees
  ...
end
```

to

```ruby
employees = get_employees

employees.each do |employee|
  total_pay += employee.pay
end

def get_employees
  ...
  return [] if no_employees
  # or
  raise NoEmployeeError
  ...
end
```

### Don’t Pass Null

Pass `null` usually do not have meaningful results. We should raise exception in the method; however it still cost some run time. The better way is just return it if caller pass a null value.

## Reference

clean code by Robert
