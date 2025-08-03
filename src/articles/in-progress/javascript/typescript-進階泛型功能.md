# Title

## 一些工具 (Set, Map, Iterator)

### 泛型 Set

這邊示範如何將一個 array 透過一個 class 轉換為 Set。課本是建立一個 collection

```javascript
let products = [
  new Product('Shoes', 100),
  new Product('Hat', 25)
]

type shapeType = { name: string }

class Collection<T extends shapeType> {
  private items: Set<T>

  constructor(initialItems: T[] = []) {
    this.items = new Set<T>(initialItems)
  }

  get(name: string): T {
    return [...this.items.values()].find(
      item => item.name === name
    )
  }
}

let productCollection: Collection<Product> = new Collection(products)
let p = productCollection.get('Hat')
```

### 泛型 Map

接下來課本講了 Map，與上方的 Set 結構類似

```typescript
type shapeType = {name: string};

class Collection<T extends shapeType> {
  private items: Map<string, T>;

  constructor(initialItems: T[] = []) {
    this.items = new Map<string, T>();
    this.add(...initialItems)
  }

  get(name: string): T {
    return this.items.get(name)
  }
}
```

就是建立一個 Map，要求 key 是 string, item 是 T (我們自定義的 type)

### 泛型 Iterator

使用上面講的 Map collection 建立 iterator

```typescript
class Collection<T extends shapeType> {
  ...
  values(): Iterator<T> {
    return this.items.values(); // 這其實就是回到 javascript 的 iterator
  }
}

let productCollection: Collection<Product> = new Collection(products)
let iterator: Iterator<Product> = productCollection.values()
let result: IteratorResult<Product> = iterator.next()
while(!result.done) { // 代表還有資料可拿
  console.log(`Product: ${result.value.name}, ${result.value.price}`)
  result = iterator.next() // 取得下一筆資料
}
```

#### 自建立有 Iterator 的泛型類別

上面我們需要透過 values()，獲得 iterator，要是我們想直接 iterate productCollection，我們可以

```typescript
class Collection<T extends { name: string }> implements Iterable<T> { // 實作 Iterable
  private items: Set<T>;

  constructor(initialItems: T[] = []) {
    this.items = new Set<T>(initialItems);
  }

  [Symbol.iterator](): Iterator<T> { // 建立這個 Iterator
    return this.items.values();
  }
}

interface Product {
  name: string;
  price: number;
}

let productCollection: Collection<Product> = new Collection([
  { name: 'Product1', price: 10 },
  { name: 'Product2', price: 20 },
]);

productCollection.forEach(product => { // 因為有實作 Iterable 且用 Symbol.iterator 回傳 Iterator
  console.log(`Product: ${product.name}, ${product.price}`);
});
```

## 索引型別 (Indexed types)

```typescript
let myVar: keyof Product; // 只能是 Product 的 key，即 name 與 price
myVar = 'name'
myVar = 'price'
myVar = 'xxx' // Error 會產生，因為 xxx 不是 Product 的 key
```

所以我們就可以用這個 `keyof` 的機制建立防衛

```typescript
function getValue<T, K extends keyof T>(item: T, keyname: K) {
  console.log(`Value: ${item[keyname]}`)
}
```

keyname 的 type 只能是 K，而 K 是 extends 自 T 的 key

```typescript
let p = new Product('shoes', 100)
getValue(p, 'name')
getValue(p, 'price')
```

### 指定泛型引數 (Specify Generic Arguments)

我們還可以指定一定要輸入的型別

```typescript
getValue<Employee, 'name'>(e, 'name') // e 一定是 Employee type。前面的 name 是強調 K 的屬性名稱，用於 check 型別，後面的 name 是在跑 getValue 這個 function 時會用到的屬性名稱。
getValue<Employee, 'role'>(e, 'role')
```

### 設定索引回傳的 Type

我們回去複習一下 `getValue`

```typescript
function getValue<T, K extends keyof T>(item: T, keyname: K) {
  console.log(`Value: ${item[keyname]}`)
}
```

你會發現我們並沒有設定回傳值的 type，所以我們可以這樣做

```typescript
function getValue<T, K extends keyof T>(item: T, keyname: K): T[K] {
  console.log(`Value: ${item[keyname]}`)
}
```

也就是說，我們設定回傳值的 type 必定要是 `T[K]`，進一步防衛。但本來的 item type 就是 T，keyname 的 type 就是 K。

### Collection 加上索引型別

我們學完 Collection 與索引型別後，我們可以看把兩個東西結合，變得更複雜，基本上就是把原本確定的索引型別改成也是泛型 Type

從

```typescript
class Collection<T> {
  private items: Map<string, T>;

  constructor(initialItems: T[] = []) {
    this.items = new Map<string, T>();
    this.add(...initialItems)
  }

  get(name: string): T {
    return this.items.get(name)
  }
  ...
}
```

變成

```typescript
class Collection<T, K extends keyof T> {
  private items: Map<T[K], T>;

  constructor(initialItems: T[] = []) {
    this.items = new Map<T[K], T>();
    this.add(...initialItems)
  }

  get(key: T[K]): T {
    return this.items.get(key)
  }
  ...
}
```

所以型別變得更泛了，這時候 K 的 type 也可以隨我們的需求修改。

## 型別映射 (Type Mapping)

基本上就是複製一份型別，然後把這個型別的名稱換掉。通常用在我們想要用程式的方式修改既有的型別。

```typescript
type MappedProduct = {
  [p in keyof Product] : Product[p] // 這邊會 loop Product 中的 key，然後用 Product[key] 將 item 的 type 也寫入
}
```

### Generalize mapping

我們可以直接定義一個能把型別帶入的 Map，這夜不論是哪一個型別都可以使用

```typescript
type Mapped<T> = {
  [p in keyof T] : T[p]
}

Mapped<Product> = {name: 'bat', price: 10}
Mapped<City> = {name: 'Taipei', population: 100}
```

### 條件映射型別 (Conditional Mapped Types)

有了上一個 section 的知識，我們可以設定四種 generalized 的 mapping

```typescript
type Optional<T> = {
  [p in keyof T]?: T[p] // 屬性為選擇性
}

type Required<T> = {
  [p in keyof T]-?: T[p] // 屬性為必要
}

type ReadOnly<T> = {
  readonly [p in keyof T]: T[p] // 屬性為唯讀
}

type ReadWrite<T> = {
  -readonly [p in keyof T]: T[p] // 屬性為可讀寫
}
```

舉例來講，你用 Optional 建立物件，就會有 `?` 在屬性後，使該屬性為 optional

### 內建映射型別 (Built-in Mapped Types)

上面講了基本的屬性設置，其實 TypeScript 已經有內建型別可以使用。

```typescript
Partial<T> // 將所有屬性改為選擇性
Required<T> // 將所有屬性改為必要
Readonly<T> // 將所有屬性加上 readonly
Pick<T, K> // 就是選擇 T 中的 K 屬性們
Record<keyType, itemType> // 創立一個 object，key 的屬性是 keyType，item 的屬性是 itemType
```

`Partial`, `Required`, `Readonly` 跟上一個 section 類似，這邊舉例 `Pick` 與 `Record`

```typescript
type MyType = {
  name: string;
  age: number;
  address: string;
};

// Picking only 'name' and 'age' from MyType
type SelectedProps = Pick<MyType, 'name' | 'age'>;

//////////////

// Creating a record type where keys are of type 'string' and values are of type 'number'
type MyRecord = Record<string, number>;

// Example usage:
const myRecord: MyRecord = {
  key1: 1,
  key2: 2,
  key3: 3,
};
```

### 篩選屬性 (Filter Properties)

這一個 section 講得跟 `Pick` 類似，甚至應該說他就是在實作 `Pick`

```typescript
type SelectProperties<T, K extends keyof T> = {
  [p in K]: T[P]
}
// 然後使用它，建立出來的 p1 會只有使用 Product 中的 name 屬性
let p1: SelectProperties<Product, 'name'> = { name: 'hahaha' }
```

### 建立新型別 (Create a New Type)

這個 section 則是在講如何實作 `Record`，就是我們可以自行設定 key 的 value 與 item 的 type

```typescript
type CustomMapped<K extends keyof any, T> = {
  [P in K]: T
}
// 其實就是 Record<K extends keyof any, T>

let p1 = CustomMapped<'name' | 'city', string> = {name: 'Bob', city: 'London'}
```

則 key 的 value 只能是 name 或 city，item 的 type 是 string。

## 條件型別 (Conditional Types)
 
首先我們先來建立一個條件型別，他會根據某種條件決定該回傳什麼型別

```typescript
// 以下條件型別代表，true 的話 resultType<T> 的型別是 string。
type resultType<T extends boolean> = T extends true ? string : number

let firstVal: resultType<true> = "String" // 合法
let secondVal: resultType<false> = 100 // 合法
let mismatchCheck: resultType<false> = "String" // 不合法，應該要 assign number
```

### 巢狀 (Nested)

我們想要實現，如果輸入值是 `London`，則回傳 `City`，如果是輸入值是 `Bob`，則回傳 `Person`，如果都不是則回傳 `Product`。

```typescript
type references = "London" | "Bob" | "Other"
type nestedType<T extends references> = T extends "London" ? City: T extends "Bob" ? Person : Product

let firstVal: nestedType<"London"> = new City("London", 111111)
let secondVal: nestedType<"Bob"> = new Person("Bob")
let thirdVal: nestedType<"Other"> = new Product("Toy")

// 這三個都合規
```

### 泛型類別使用條件型別 (conditional types within generic classes)

這個其實就是透過條件型別讓泛型類別中的方法有相對應的改變。

```typescript
type resultType<T extends boolean> = T extends true ? string : number

class Collection<T> { // 這個 collection 跟前面介紹的類似
  ...
  
  total<P extends keyof T, U extends boolean>(propName: P, format: U) : resultType<U> {
    let totalValue = this.items.reduce((t, item) => {
      t += Number(item[propName], 0); // 這邊就是把數字加起來
    })
    return(format ? `$${totalValue.toFixed()}` : totalValue) as any // 這邊會依照傳入 format true or false 回傳 string 或是 number。return 值要合規於 resultType<U>
  }
}

let data = new Collection<Product>(
  new Product("1", 275),
  new Product("2", 200)
)

let firstVal: string = data.total("price", true) // true 時會回傳 string
let secondVal: number = data.total("price", false) // false 時會回傳 number
```

### 在聯集型別使用條件型別 (use conditional types in union types)

```typescript
type Filter<T, U> = T extends U ? T : never

function FilterArray<T, U>(data: T[], predicate: (item) => item is U) : Filter<T, U>[] {
  return data.filter(item => predicate(item)) as any // 這邊會透過 predicate 篩選 data 中是 U 的 item
}

function isPerson(item: any): item is Person {
  return item instanceof Person
}

let filterData: Person[] = FilterArray(dataArray, isPerson)

// 假設有一個 dataArray，先不管它裡面有什麼，此時 U 是 isPerson，我們把它放進 FilterArray 後，此方法會篩選出所有符合 isPerson 的 item。
// 條件型別的用處在這邊是，先把 function 應該的回傳值定義出來。當 U 是 isPerson，則此 function 應該只回傳僅有 Person 的 Array。講清楚一點就是
array = [Product, Person, Product]
Filter<array, isPerson> = [never, Person, never]
filterData = [Person]
```

### 內建分配條件型別 (Built-in conditional types)

```typescript
Exclude<T, U> // 從 T 聯集中剔除可指派 U 的型別
Extract<T, U> // 從 T 聯集中選出可指派 U 的型別，如同前面的 Filter<T, U>
NonNullable<T> // 從 T 聯集中剔除 null 與 undefined
```

### 型別映射中的條件型別 (Conditional types in type mapping)

就是在原先的映射加入條件。先提供沒有條件的映射：

```typescript
type changeProps<T> = {
  [P in keyof T]: T[P]
}
```

然後此時加入 U 與 V，即 T 中的型別如果是 U 我們就改成 V

```typescript
type changeProps<T, U, V> = {
  [P in keyof T]: T[P] extends U ? V : T[P]
}
```

實作如下

```typescript
type modifiedProduct = changeProps<Product, number, string>
```

loop Product，如果當中有 number，我們要求回傳的型別是 string。

### 限定特定型別的屬性 (Constrain properties to a specific type)

這邊他弄得很複雜，我只講有條件型別的部分。

```typescript
type unionOfTypeNames<T, U> = { // 它會遍歷 T 型別的屬性，只保留那些對應的屬性值為 U 型別的屬性名稱，不是的會是 never
  [P in keyof T]: T[P] extends U ? P : never;
}

type propertiesOfType<T, U> = unionOfTypeNames<T, U>[key of T] // propertiesOfType 從 unionOfTypeNames 的結果中取得屬性名稱的 union，等等的例子只會回傳 price 與 age

function total<T, P extends propertiesOfType<T, number>>(data: T[], propName: P): Number { // 在 total 這個 function，P 只會是 propertiesOfType 中的 Type
  return data.reduce((t, item) => t += Number(item[propName], 0))
}

// 實作上
interface Product {
  name: string;
  price: number;
  age: number;
}

let products = [
  new Product("1", 222),
  new Product("2", 333)
]

total(products, "price") // 要確保回傳值是 number
```

### 推論額外型別 (Infer additional types)

條件型別可以用來推論泛型的型別。課本的例子很難懂，我舉一個簡單一點的。

```typescript
type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never; // 這一步是 check T 是不是 extends from function，是的話就 infer return 值的 type 是 R，不是就是 never

// Example usage
function exampleFunction(): string { // 這是一個 function
  return "Hello, TypeScript!";
}

type ReturnTypeOfExample = ExtractReturnType<typeof exampleFunction>; // 因為 exampleFunction 是 function，所以 ReturnTypeOfExample 的 type 會是 string

// 然後我們再來放入一個 function
const myFunction: () => ReturnTypeOfExample = () => { // myFunction 是一個 function 會回傳 string (由我們上面推論)，具體呢是 return exampleFunction，而 exampleFunction 會 return string 沒錯
  return exampleFunction();
};
```

Typescript 有內建的條件型別推論：

```typescript
Parameters<T> // 取出函式 T 中的每個參數型別，合併為一個 tuple
ReturnType<T> // 取出函式 T 傳回值的型別
ConstructorParameters<T> // 取出 constructor 中每個參數的型別，將他們合併為 tuple
instanceType<T> // 傳回函式 T 的傳回值型別
```

使用範例

```typescript
// Parameters<T>
function exampleFunction(arg1: string, arg2: number): void {
}
type ExampleFunctionParams = Parameters<typeof exampleFunction>; // Result: [string, number]

// ReturnType<T>
function exampleFunction2(): boolean {
  return true;
}
type ExampleFunction2Return = ReturnType<typeof exampleFunction2>; // Result: boolean

// ConstructorParameters<T>
class ExampleClass {
  constructor(param1: string, param2: number) {
  }
}
type ExampleClassConstructorParams = ConstructorParameters<typeof ExampleClass>; // Result: [string, number]

// InstanceType<T>
class ExampleClass2 {
}
const instance: InstanceType<typeof ExampleClass2> = new ExampleClass2(); // Result: ExampleClass2 instance
```