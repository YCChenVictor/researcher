# Title

Smart contracts are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code.

## basic contract in Solidity

```javascript
// Declare the Solidity version
pragma solidity ^0.8.0;

// Declare the contract
contract ExampleContract {

  // Declare a variable to store a string
  string public greeting;

  // Constructor function to set the initial value of the variable
  constructor() {
    greeting = "Hello, World!";
  }

  // Function to update the value of the variable
  function setGreeting(string memory newGreeting) public {
    greeting = newGreeting;
  }
}
```

## Local development

With hardhat, you can put the contracts in it and write tests for these contracts.

## Production


## Reference

https://hardhat.org/hardhat-runner/docs/getting-started#overview
