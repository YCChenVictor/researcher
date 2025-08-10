# Title

## Infra

Just install hardhat: https://hardhat.org/hardhat-runner/docs/getting-started.

Hardhat requires interactive shell so it seems impossible to dockerize it. Just build it in another project and write contracts in it. Later, you can use `ethers.js` to get those contracts.

Think of hardhat as a third-party host for those contracts. In fact, the production host is third-party too.

After you follow the instruction, you can start an endpoint for Apps to connect the contracts.

### Steps

* Compile through
  ```bash
  npx hardhat compile
  ```
* Build test for that contract in `test/`
* Run test through 
  ```bash
  npx hardhat test
  ```
* Start a node for apps to use the contracts
  ```bash
  npx hardhat node
  ```
* Deploy contract on the localhost of hardhat
  ```bash
  npx hardhat ignition deploy ./ignition/modules/Lock.ts --network localhost
  ```

## Compose Smart Contract

```solidity
pragma solidity ^0.8.0;

contract Task {
    address public employer;
    address payable public employee;
    uint public salary;
    bool public taskCompleted = false;

    constructor(address _employer, address payable _employee, uint _salary) {
        employer = _employer;
        employee = _employee;
        salary = _salary;
    }

    modifier onlyEmployer() {
        require(msg.sender == employer, "Caller is not the employer");
        _;
    }

    function markTaskCompleted() public onlyEmployer {
        taskCompleted = true;
    }

    function paySalary() public {
        require(taskCompleted, "Task is not completed yet");
        require(address(this).balance >= salary, "Insufficient balance in contract");
        employee.transfer(salary);
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
```

* To get the ABI, you need to `npx hardhat compile` again. Then put the ABI into the project.

## Communication

Once we've developed our smart contract using Hardhat, we can interact with it using ethers.js in the frontend. Handling smart contracts from the backend poses a security risk. In contrast to centralized authentication systems where passwords or authorization tokens are sent to a backend to verify user permissions, blockchain technology enables users to directly prove their authorization for smart contract transactions by signing them with their private keys. It's crucial that private keys remain solely with the client, ensuring security and autonomy in transactions.

```JS
const { ethers } = require("ethers");

// Assuming you're using the Hardhat network
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// The ABI for your contract (simplified for this example)
const taskContractABI = [
    "constructor(address,address payable,uint)",
    "function markTaskCompleted() public",
    "function paySalary() public",
    "receive() external payable",
    // Add the rest of the ABI here
];

// The deployed contract address
const taskContractAddress = "0xYourContractAddressHere";

// Create a contract instance
const taskContract = new ethers.Contract(taskContractAddress, taskContractABI, provider);

// Create a signer
const signer = provider.getSigner();

// Connect the signer to the contract
const taskContractWithSigner = taskContract.connect(signer);

// Example function to mark the task as completed
async function markTaskCompleted() {
    const tx = await taskContractWithSigner.markTaskCompleted();
    await tx.wait(); // Wait for the transaction to be mined
}

// Example function to pay the salary
async function paySalary() {
    const tx = await taskContractWithSigner.paySalary();
    await tx.wait(); // Wait for the transaction to be mined
}

// Call the functions as needed
markTaskCompleted().then(() => {
    console.log("Task marked as completed.");
    paySalary().then(() => {
        console.log("Salary paid.");
    });
});
```

### When to use backend to interact with smart contract

* Reading Data: Querying smart contract state or listening for events, which does not require transaction signing.
* Performing Off-Chain Computations: The backend might perform computations or aggregate data that will inform user actions but does not directly initiate transactions on the blockchain.
* Automated Processes: For functionalities that are part of the application's logic and do not require user-specific authorization (e.g., updating contract state based on time triggers or external data feeds), a backend or a server-side process might interact with the smart contract using its own keys. This should be done with clear transparency and understanding of the security implications.
