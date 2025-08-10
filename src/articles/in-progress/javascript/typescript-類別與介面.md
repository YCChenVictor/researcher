# Title

## 類別 (Class)

### 使用 Typescript 實作

```typescript
type Person = {
  id: string,
  name: string,
  dept: string,
  city: string
}

class Employee {
  // 定義屬性與其型別
  id: string;
  name: string;
  dept: string;
  city: string;

  // 建立物件時，輸入特定型別
  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
    this.name = name;
    this.dept = dept;
    this.city = city;
  }

  writeDept() {
    console.log(`${this.name} works in ${this.dept}`)
  }
}
```

編譯結果

```javascript
class Employee {
  // 只剩下建構子
  constructor(id, name, dept, city) {
    this.id = id;
    this.name = name;
    this.dept = dept;
    this.city = city;
  }
  writeDept() {
    console.log(`${this.name} works in ${this.dept}`)
  }
}
```

### 存取控制 (access control)

Typescript 提供 `public`, `private`, `protected`。Javascript 沒有。 

```typescript
class Employee {
  public id: string;
  public name: string;
  private dept: string; // 私有屬性
  public city: string;

  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
    this.name = name;
    this.dept = dept;
    this.city = city;
  }

  writeDept() {
    console.log(`${this.name} works in ${this.dept}`)
  }
}

let salesEmployee = new Employee('id', 'name', 'dept', 'city')

// 嘗試存取私有屬性
console.log(`Dept value: ${salesEmployee.dept}`)
// Error: Property 'dept' is private and only accessible within class 'Employee'.

// 使用 writeDept() -> 在 class 'Employee' 中
item.writeDept()
// name works in dept
```

注意：這只是 Typescript 附加功能，所以編譯為 Javascript 後，還是能存取

### 唯讀屬性 (readonly)

```typescript
class Employee {
  public readonly id: string; // 唯讀
  public name: string;
  private dept: string; // 私有屬性
  public city: string;

  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
    this.name = name;
    this.dept = dept;
    this.city = city;
  }

  writeDept() {
    console.log(`${this.name} works in ${this.dept}`)
  }
}

let salesEmployee = new Employee('id', 'name', 'dept', 'city')
salesEmployee.id = 'another id' // Error: Cannot assign to 'id' because it is read-only property
```

注意：這只是 Typescript 的附加功能，不影響編譯後的 Javascript 程式，所以不要過度依賴它保護敏感的操作。

### 簡化

我們可以把變數「定義再給值」，來簡化，直接宣告屬性特徵在 constructor 中

```typescript
class Employee {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string.
    public city: string
  ) {
    // 建構式內不需要寫任何敘述
  }
  ...
}
```

### 繼承 (Inheritance)

以下將先定義 Person class，再用 Employee 繼承 Person

```typescript
class Person {
  constructor(
    public id: string,
    public name: string,
    public city: string
  ) {

  }
}

class Employee extends Person {
  constructor(
    public readonly id: string, // 覆寫父層
    public name: string,
    private dept: string,
    public city: string
  ) {
    super(id, name, city) // 呼叫父層建構子，以確保父類別繼承的屬性能被初始化
  }
}
```

### 型別推論

Typescript 在推論型別時只會考慮一開始建立時所包含的物件型別

```typescript
class Person {
  constructor() {
    ...
  }
}

class Employee extends Person {
  constructor(
    ...
  ) {
    super()
  }
}

class Customer extends Person {
  constructor(
    ...
  ) {
    super()
  }
}

class Supplier extends Person {
  constructor(
    ...
  ) {
    super()
  }
}

let data = [
  new Employee(...),
  new Customer(...)
]

data.push(new Supplier(...))

data.forEach(...) // 型別相關的 Error：Argument of type 'Supplier' is not assignable to parameter of type 'Employee | Customer'
```

這是因為一開始宣告 data 時只有放入 `Employee` 與 `Customer`

```typescript
declare let data: (Employee | Customer)[]
```

要解決此問題，可以在一開始宣告型別為他們的 parent，即 `Person`

```typescript
let data: Person[] = [ // 在此宣告
  ...
]
```

如此就不會報錯了，因為 `Employee`, `Customer`, `Supplier` 都是 `Person` 的一種。

## 抽象類別 (abstract class)

我們可以透過抽象類別強迫子類別遵守特定規格或物件形狀，又能依據類別的需求實作細節。

```typescript
abstract class Person { // 抽象類別
  constructor(
    public id: string,
    public name: string,
    public city: string
  ) {}

  getDetails(): string {
    return `${this.name}, ${this.getSpecificDetails()}`;
  }

  abstract getSpecificDetails(): string; // 抽象方法
}
```

如此，在一個類別繼承抽象類別時，必須實作所有抽象方法，否則會回報錯誤。

```typescript
class Employee extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string
  ) {
    super(id, name, city);
  }

  getSpecificDetails() {
    return `works in ${this.dept}` // 實作抽象方法
  }
}

employee = new Employee('id', 'name', 'dept', 'city')
employee.getDetails() // name, works in dept
```

### 防衛描述

使用 `instanceof` 查驗物件類別。假設我們加入一個不是繼承自 `Person` 的 `Supplier` class。

```ts
class Supplier { // 這邊沒有 extend 自 Person
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public companyName: string
  ) {

  }
}

let data: (Person | Supplier)[] = [
  new Employee('employee id', 'employee name', 'employee city', 'employee company'),
  new Customer('customer id', 'customer name', 'customer city', 'customer company'),
  new Supplier('supplier id', 'supplier name', 'supplier city', 'supplier company')
]

data.forEach((item) => {
  if(item instanceof Person) { // 我們知道 Person 一定會有 getDetails 方法，所以透過 instanceof 限縮只有 Person 類別可以使用此方法，進行防衛
    console.log(item.getDetails())
  } else {
    console.log(`${item.name} works for ${item.companyName}`)
  }
})
```

## 介面 (interfaces)

介面跟抽象類別很像，但介面本身不會實作方法或定義建構子，只能定義物件形狀。

```typescript
interface Person {
  name: string;
  getDetails(): string; // 不會實作
}

class Employee implements Person {
  constructor(
    public readonly id: string,
    public name: string,
    public dept: string,
    public city: string
  ) { }

  getDetails() { // 在子類別實作
    return `${this.name} works in ${this.dept}`
  }
}
```

類別只能繼承自一個抽象類別，但可以實作多個介面。

```typescript
interface Person {
  name: string;
  getDetails(): string;
}

interface DogOwner {
  dogName: string;
  getDogDetails(): string;
}

// 同時實作 Person 與 DogOwner
class Customer implements Person, DogOwner {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public creditLimit: number,
    public dogName
  ) { }

  getDetails() {
    return `${this.name} has ${this.creditLimit} limit`
  }

  getDogDetails() {
    return `${this.name} has a dog name ${this.dogName}`
  }
}

let alice = new Customer('alice id', 'alice', 'city', '500', 'Lucy')
let dogOwners: DogOwner[] = [alice];
dogOwners.forEach(item => console.log(item.getDogDetails())) // 動得了因為 alice 實作 dogOwner
let data: Person[] = [alice]
data.forEach(item => console.log(item.getDetails())) // 動得了因為 alice 實作 Person
```

**要注意，兩個 implement 的介面的屬性不能有衝突的型別**，例如 `id` 都要是 `string` 型別，如果一個是 `number` 而一個是 `string`，則無法同時 implement 兩個介面。

### 介面繼承

上面 `Person` 與 `DogOwner` 是兩個不同的 class，這邊我們讓 `DogOwner` 繼承自 `Person`。則 `Customer` 在實作時不需要 implement `Person` 與 `DogOwner`，僅需 implement `DogOwner` 就可以使用 `getDetails()` 與 `getDogDetails()`。

```typescript
interface Person {
  name: string;
  getDetails(): string;
}

interface DogOwner extends Person {
  dogName: string;
  getDogDetails(): string;
}

class Customer implements DogOwner {
  ...
  getDetails() {
    ...
  }
  getDogDetails() {
    ...
  }
}
```

### 選擇性的屬性與方法

```typescript
interface Person {
  name: string;
}

interface DogOwner extends Person {
  dogName?: string;
  getDogDetails?(): string;
}

class DogOwnerImpl implements DogOwner {
  name: string;
  dogName?: string;

  constructor(name: string, dogName?: string) {
    this.name = name;
    this.dogName = dogName;
  }

  getDogDetails?(): string {
    if (this.dogName) {
      return `${this.name} owns a dog named ${this.dogName}.`;
    }
    return `${this.name} doesn't own a dog.`;
  }
}

const dogOwnerWithDetails = new DogOwnerImpl('Alice', 'Buddy'); // 會實作 getDogDetails
const dogOwnerWithoutDetails = new DogOwnerImpl('Bob'); // 不會實作 getDogDetails

const dogOwners: DogOwner[] = [dogOwnerWithDetails, dogOwnerWithoutDetails];

dogOwners.forEach(item => {
  if (item.getDogDetails) { // 檢查是否有實作 getDogDetails()
    console.log(item.getDogDetails());
  }
});
```

### 介面的抽象類別

前面提到介面不需子類別實作方法，而抽象需要子類別實作方法，如果有兩個方法一個希望子類別實作，另一個不希望，則可以使用介面的抽象類別。

```typescript
interface Person {
  name: string;
  getDetails(): string;
  dogName?: string;
  getDogDetails?(): string; // 不會實作
}

abstract class AbstractDogOwner implements Person {
  abstract name: string;
  abstract dogName?: string;
  abstract getDetails(); // 要求子物件實作的方法
  getDogDetails() { // 在這裡實作
    if(this.dogName) {
      return `${this.name} has a dog called ${this.dogName}`
    }
  }
}

class DogOwningCustomer extends AbstractDogOwner {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public creditLimit: number,
    public dogName
  ) {
    super();
  }

  getDetails() { // 被要求要實作的方法
    return `${this.name} has ${this.creditLimit} limit`
  }
}
```

### 防衛敘述

跟抽象類別不同，我們無法使用 `instanceof`，因為 javascript 沒有 interface，所以 typescript 轉譯為 javascript 時不會保留 interface 資訊，所以不能使用 interface 的 name 來檢驗 instance 的來源，我們只能檢查某一介面的特定方法或是屬性是否存在。

```typescript
data.forEach(item => {
  if('getDetails' in item) { // 檢查是否有 getDetails 方法
    console.log(...)
  }
})
```

### 動態建立屬性

Typescript 使用索引簽名 (index signature) 來動態新增物件屬性，且確保屬性符合某種型別。

```typescript
class SportsProduct {
  ...
}

class ProductGroup {
  [propertyName: string]: Product; // key 要是 string，item 要是 Product
}

let group = new ProductGroup()
group['shoes'] = new SportsProduct(...)
group.hat = new SportsProduct(...)
```
