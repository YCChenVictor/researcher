# Title

## Purpose

TDD reduces bugs and increase the quality of code, making software to be more maintainable and understandable. With no test, there would be more manual test in the future and it would be hard to update the version.

## Concept

TDD is a software development process by writing test first and then keeping testing the software until all required function developed. The steps:

* Turn business logic into specifications
* Decompose specifications into functions (MVC)
* Define all desired input and output of each function
* Write test first for every function
* Compose codebase to realize business logic, given the tests

### AAA principle (Arrange -> Act -> Assert)

> The basic principle to build spec is AAA principle.
> **arrange:** describe the environment before action begin
> **act:** execute the unit function that we want to test
> **assert:** check whether the result is what we want

#### AAA principle maps Jest

```javascript
describe('Test sum', () => {
  test('adds 1 + 2 to equal 3', () => { // Arrange
    const a = 1;
    const b = 2;

    // Act
    const result = a + b;

    // Assert
    expect(result).toBe(3);
  });
});
```

[Jest](https://jestjs.io/docs/getting-started)

#### AAA principle maps Rspec

```ruby
RSpec.describe "the_summary", type: :feature do
  context "when acting on something" do
    it "should have an assertion" do
      # Arrange
      # Set up any necessary context or variables here
      
      # Act
      result = "act"
      
      # Assert
      expect(result).to eq("expected result")
    end
  end
end
```

[RSpec](https://rspec.info/documentation/)

### Coverage

Unit and integration tests should touch every line of code. Coverage reveals the percentage of code has been tested or the percentage of code may not be required.

* The reasonable coverage rate: 80%
* In rails, we use gem `simplecov`
* In express,
* In react,

## Example

For example, a woodcutter go into a forest (**arrange** the environment) -> the woodcutter use the axe to cut the wood (**act** the function) -> and the woodcutter should get the woods (**assert** the result). If the woodcutter does not like the result, woodcutter should modify the **act**. 

### Rspec

* Init
  ```bash
  mkdir woodcutter
  cd woodcutter
  gem install rspec
  ```
* Files
  ```bash
  mkdir woodcutter
  mkdir spec
  touch woodcutter.rb # in woodcutter/
  touch woodcutter_spec.rb # in spec/
  ```
* Spec
  ```ruby
  require_relative '../woodcutter'
  
  describe Woodcutter do
    let(:in_right_place)
    let(:init_num_of_woods)
    let(:woodcutter) { Woodcutter.new(in_right_place, init_num_of_woods) }

    before do # arrange
      in_right_place = true
      init_num_of_woods = 0
    end

    it "should work" do
      woodcutter.cut # act
      expect(woodcutter.woods).to be 1 # assert
    end
  end
  ```
* Build
  * Execute spec
    ```bash
    rspec woodcutter_spec.rb
    ```
  * Given the errors, build the feature
    ```ruby
    class Woodcutter
      def initialize(in_right_place = true, init_num_of_woods = 0)
        @woods = init_num_of_woods
      end
    
      def cut
        @woods += 1
      end
    
      def woods
        @woods
      end
    end
    ```

### Reference

[**Learn TDD in Rails Learn TDD**](https://learntdd.in/rails/)

[**Ruby on Rails 實戰聖經**](https://ihower.tw/rails/testing.html)

[https://en.wikipedia.org/wiki/Test-driven_development](https://en.wikipedia.org/wiki/Test-driven_development)

[**Hello Testing - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天**](https://ithelp.ithome.com.tw/articles/10185338)

[**What are the different kinds of Rails tests and when should I use each? - Code with Jason**](https://www.codewithjason.com/different-kinds-rails-tests-use/)

[**teamcapybara/capybara**](https://github.com/teamcapybara/capybara#using-capybara-with-rspec)

[**rspec/rspec-rails**](https://github.com/rspec/rspec-rails)