# Title

## Purpose

Object oriented design is used to structure and organize code by modeling **real-world entities** as objects, facilitating modularity, reusability, and easier maintenance in software development.

## Concept

### Step 1: Conduct system design

For example, we want to design a library system. After [system design], we should obtain the objects.

### Step 2: Identify the objects

Based on the requirements, identify the main objects or entities that will be part of the system. These objects should represent real-world entities or concepts relevant to the problem domain.

* Book: Represents a book with attributes such as title, author, ISBN, and availability status
* Member: Represents a library member with attributes such as name, membership number, and a list of borrowed books
* Library: Represents the library itself, responsible for managing books, members, and their interactions

### Step 3: Define class hierarchies and relationships
  
Establish relationships between the identified objects by defining class hierarchies, associations, aggregations, or compositions. This step involves organizing objects into classes and determining how they interact and collaborate with each other.

* Book has many Borrower
* Borrower inherited from Member
* Library has many Member
* Library has many Book
* Borrower has any Book

### Step 4: Define object behaviors and methods

Involves identifying the attributes (data) and methods (functions) associated with each class. Methods define the operations or actions that can be performed by the objects.

* Book class may have methods like `checkAvailability()` to check if the book is available and `reserve()` to reserve a book for a member.
* Member class may have methods like `borrowBook()` to borrow a book and `returnBook()` to return a book.
* Library class may have methods like `addBook()` to add a book to the library, `trackAvailability()` to track the availability of books, `issueBook()` to issue a book to a member, and `returnBook()` to process the return of a book.

### Step 5: Refine the design

Review and refine the design by considering principles such as encapsulation, inheritance, polymorphism, and other object-oriented design principles. Ensure that the design is modular, extensible, and adheres to best practices.

### Step 6: Implement the design

Translate the design into actual code using a programming language. Follow the design principles and guidelines to implement the classes, their relationships, and their behaviors. Please refer to [object oriented programming] and [SOLID].

### Step 7: Test and iterate

Test the implemented system to verify its correctness, functionality, and performance. Iterate as necessary to fix any bugs, address design issues, and improve the overall quality of the system.

## Examples

### Deck of Cards

Question: Design the data structures for a generic deck of cards. Explain how you would subclass the data structures to implement blackjack.

I will design the deck:

```javascript
class Deck {
  constructor(sequence = null) {
    if(!sequence) {
      const newCards = Array.from(Array(13).keys(), x => x + 1)
      this.cards = newCards.concat(newCards, newCards, newCards)
    } else {
      this.cards = sequence
    }
  }
}

module.exports = Deck
```

in accordance with,

* code
  ```javascript
  class Dealer {
    constructor() {
      this.cards = []
    }
  }
  
  class Player {
    constructor() {
      this.cards = []
    }
  
    hit() {}
  
    stand() {}
  }
    
  class BlackJack {
    // only one player
    // reshuffle after every round
    // dealer must hit if total <= 16
    // dealer must hold if total > 16
    constructor(deck) { // 8, 11, 3, 6, 10, 1
      this.deck = deck
      this.player = new Player()
      this.dealer = new Dealer()
      this.player.cards.push(this.deck.cards.shift())
      this.dealer.cards.push(this.deck.cards.shift())
      this.player.cards.push(this.deck.cards.shift())
      this.dealer.cards.push(this.deck.cards.shift())
    }
  
    perform(playerMove) {
      if (playerMove === 'hit') {
        this._performPlayerHit()
        this._performDealer()
      } else {
        this._performPlayerStand()
        this._performDealer()
      }
  
      return this._result()
    }
  
    _performPlayerHit() {
      this.player.cards.push(this.deck.cards.shift())
    }
  
    _performPlayerStand() {
      return
    }
  
    _performDealer() {
      const dealerScore = this._scoreCalculator(this.dealer.cards)
  
      if(dealerScore <= 16) {
        this._performDealerHit()
      } else {
        this._performDealerStand()
      }
    }
  
    _performDealerHit() {
      this.dealer.cards.push(this.deck.cards.shift())
    }
  
    _performDealerStand() {
      return
    }
  
    _result() {
      const playerScore = this._scoreCalculator(this.player.cards)
      const dealerScore = this._scoreCalculator(this.dealer.cards)
  
      if(playerScore > dealerScore) {
        return 'wins'
      } else if(playerScore < dealerScore) {
        return 'lose'
      } else {
        return 'tie'
      }
    }
  
    _scoreCalculator(cards) {
      const score = cards.reduce((accumulator, currentValue) => {
        if(currentValue >= 10) {
          return accumulator + 10
        } else {
          return accumulator + currentValue
        }
      }, 0)
  
      return score
    }
  }
  
  module.exports = BlackJack
  ```
* test
  ```javascript
  BlackJack = require('./blackjack.js')
  Deck = require('./deck.js')
  
  describe('BlackJack', () => {
    describe('8, 11, 3, 6, 10, 1', () => {
      let deck
      let game
      beforeEach(() => {
        deck = new Deck([8, 11, 3, 6, 10, 1])
        game = new BlackJack(deck)
        // Dealer: 11, 6
        // Player: 8, 3
      })
  
      describe('Player hit', () => {
        test('should let dealer stand', () => {
          expect(game.dealer.cards.length).toEqual(2)
        })
   
        test('should announce player wins', () => {
          expect(game.perform('hit')).toEqual('wins')
        })
      })
  
      describe('Player stand', () => {
        test('should let dealer stand', () => {
          expect(game.dealer.cards.length).toEqual(2)
        })
  
        test('should announce player lose', () => {
          expect(game.perform('stand')).toEqual('lose')
        })
      })
    })
  
  //   test('[9, 2, 7, 4, 11, 8]', () => {
  //     beforeEach(() => {
  //       let deck = new Deck([9, 2, 7, 4, 11, 8])
  //       let game = new BlackJack(deck)
  //     })
  //     // Dealer: 2, 4
  //     // Player: 9, 7
  //     it('should let dealer hit', () => {
        
  //     })
  
  //     test('Player hit', () => {
  //       it('should announce player lose', () => {
  
  //       })
  //     })
  
  //     test('Player hold', () => {
  //       it('should announce dealer lose', () => {
          
  //       })
  //     })
  //   })
  })
  ```

## Reference

ChatGPT
