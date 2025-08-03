---
layout: post
title:
description: ''
date: '2022-08-31'
categories: test
note: separate rspec and capybara
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

RSpec is a testing framework for Ruby that allows you to write tests for your Ruby code.

## Why?

* Easy-to-read: RSpec provides a clean and easy-to-read syntax for writing tests, making it easier for you and your team to understand the intent of the tests and to quickly identify any issues.
* Powerful matchers: RSpec comes with a wide range of built-in matchers that allow you to easily test for a variety of conditions, such as whether a value is equal to another value or whether an error is raised.
* Test organization: RSpec allows you to group your tests into logical sections using describe and context blocks, making it easier to understand and maintain your test suite.
* Test-driven development: RSpec supports a test-driven development (TDD) workflow, where you write tests before writing the actual code. This can help you ensure that your code is well-tested and reliable from the start.
* Integration with other tools: RSpec can integrate with other tools, such as SimpleCov for code coverage analysis and Guard for running tests automatically when changes are made to your code.

## How?

### Install rspec

Install RSpec by adding it to your Gemfile and running bundle install. Alternatively, you can install it using the command gem install rspec.

### Create spec

* Create a directory named spec at the root of your project. This directory will contain your test files.
* Create a test file in the spec directory with the name of the file you want to test, followed by _spec.rb. For example, if you want to test a file named calculator.rb, the test file should be named calculator_spec.rb.

In the test file, require the file you want to test and RSpec by adding the following code at the top:

```ruby
require_relative '../calculator'
require 'rspec'

describe Calculator do
  describe "#add" do
    it "returns the sum of two numbers" do
      calc = Calculator.new
      expect(calc.add(2, 3)).to eq(5)
    end
  end
end
```

This test describes the behavior of the add method in the Calculator class. It creates a new instance of the Calculator class and expects the result of calc.add(2, 3) to be equal to 5.

### expect instance variable to receive

```ruby
class Example
  attr_reader :aaa

  def update
    @aaa.bbb = false
  end
end
```

```ruby
RSpec.describe Example do
  describe "#update" do
    it "sets @aaa.bbb to false" do
      # Create a double for the instance of the Example class
      example_instance = instance_double(Example)

      # Stub the aaa method to return the double
      allow_any_instance_of(Example).to receive(:aaa).and_return(example_instance)

      # Set the expectation on the bbb attribute of the double
      expect(example_instance).to receive(:bbb=).with(false)

      # Call the update method on the example_instance
      example_instance.update
    end
  end
end
```

### shared example

Shared examples can help avoiding repetition and keep specs DRY (Don't Repeat Yourself). Example:

```ruby
# Define a shared example
RSpec.shared_examples "a collection object" do
  it "should have a size method" do
    expect(subject).to respond_to(:size)
  end

  it "should have an empty? method" do
    expect(subject).to respond_to(:empty?)
  end
end

# Use the shared example in a spec
RSpec.describe Array do
  include_examples "a collection object"

  # Add additional specs for the Array class
end

# Use the shared example in another spec
RSpec.describe Hash do
  include_examples "a collection object"

  # Add additional specs for the Hash class
end
```

### methods

* expect raise no errors: `expect { object.do_something }.not_to raise_error`
* `skip: true` can skip all tests
* `focus: true` can only do this test of this described class

### skip callback

```ruby
require 'rails_helper'

RSpec.describe YourModel, type: :model do
  it "skips the callback during testing" do
    # Skip the before_save callback
    YourModel.skip_callback(:save, :before, :your_callback)

    # Your test code that should not trigger the callback
    # ...

    # Expectations for your test
    # ...

    # Restore the callback after the test
    YourModel.set_callback(:save, :before, :your_callback)
  end
end
```

## What?

I am going to demonstrate BDD with RSpec and Capybara to develop user login functions.

Steps:

* install required gems
* describe user story
* compose specification
* build feature

### install required gems

Create rails app by

```bash
rails new app
```

In gemfile,

```ruby
group :development, :test do
  gem 'rspec-rails'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
end
```

Run

```bash
bundle install
```

### describe user story

Again we can use AAA principle to compose spec

User goes to the login page (**arrange**) -> Enter email and password and then click login button (**act**) -> the webpage redirect to the webpage user clicked before (**assert**)

### Compose Specification

Generate spec through

```bash
rails g rspec:feature user_login
```

to produce `spec/feature/user_login_spec.rb` and input

```ruby
require 'spec_helper'

RSpec.describe "user signin", type: :feature do
  before :each do
    User.create(email: 'user@example.com', password: 'password')
  end

  context "after user on sign in page" do
    before do
      visit '/users/sign_in'
    end

    it "signs user in" do
      fill_in "user_email", with: 'user@example.com'
      fill_in "user_password", with: 'password'
      click_button 'Log in'
      expect(page).to have_content 'Signed in successfully.'
    end
  end
end
```

### build feature

run all spec with `bundle exec rspec` or specific spec with `bundle exec rspec spec/features/user_login_spec.rb` and keep building the features until no errors pop up.b

### check with css

```ruby
describe "Component Presence" do
  before do
    # You might need to visit a specific URL where the component is located.
    # Capybara.default_driver = :selenium_chrome # or any other driver you prefer
    # visit '/path/to/your/component'
  end

  it "checks if a component with a specific CSS selector exists" do
    # Navigate to the page or component if needed
    # visit '/path/to/your/component'

    # Use the `have_css` matcher to check for the presence of the component
    expect(page).to have_css('.your-component-css-selector')
  end
end
```

### change locale

```ruby
RSpec.describe "Localization" do
  it "changes the locale for testing" do
    # Set the desired locale before running the test
    I18n.locale = :fr  # Change 'fr' to the desired locale

    # Your test code here

    # Make sure to reset the locale back to the default after the test
    I18n.locale = I18n.default_locale
  end
end
```

## Reference

[What is Integration Testing? Software Testing Tutorial](https://www.youtube.com/watch?v=QYCaaNz8emY)

[Integration Testing Ruby on Rails with Minitest and Capybara](https://semaphoreci.com/community/tutorials/integration-testing-ruby-on-rails-with-minitest-and-capybara)

[Generators](https://relishapp.com/rspec/rspec-rails/docs/generators)
