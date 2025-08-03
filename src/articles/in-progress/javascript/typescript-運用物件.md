# Title

## 運用物件 (Object)

講一下 typescript 裡的 object。

### 物件形狀型別 (Shape)

Typescript 會檢視物件的「形狀」。形狀的意思是「屬性名稱與屬性型別的組合」。將其推論為整體物件的型別，確保操作多重物件時的一致。例如，

```typescript
let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = { name: "Umbrella" } // 只有 name 屬性
let product = [hat, gloves, umbrella] // 整體物件

products.forEach(prod => console.log(`${prod.name}: ${prod.price}`))
```

在最後一行 `forEach` 時，typescript 會嘗試讀取 products 陣列中每個物件的 price 屬性，但編譯器發現 umbrella 物件缺少這個屬性，則會產生 error 如下

```bash
Property 'price' does not exist on type '{ name: string; }'
```

我們如果去看生成的型別宣告檔

```typescript
declare let hat: {
  name: string;
  price: number;
};
declare let gloves: {
  name: string;
  price: number;
};
declare let umbrella: {
  name: string;
};
declare let products: {
  name: string; // typescript 會使用共有屬性推論，因為 umbrella 沒有 price 屬性，所以 price 在這裡被排除掉了
}[];
```

### 型別註記 (Type Annotation)

延續上一個 section，我們要怎麼顯示出其實是 umbrella 有問題？我們可以強調 product 的內容的型別

```typescript
let products: { name: string, price: number }[] = [hat, gloves, umbrella]
```

則此時仍會回報錯誤，但會告知我們是 umbrella 有誤

```bash
Property 'price' is missing in type '{ name: string; }' but required in type '{ name: string; price: number; }'
```

### 選擇性屬性 (Optional Attributes)

假設 umbrella 現在不僅有 `name` 與 `price` 屬性，還有 `waterproof` 屬性。則在前面的範例並不會報錯。

```typescript
let hat = { name: 'Hat', price: 100 }
let gloves = { name: "Gloves", price: 75 }
let umbrella = { name: 'Umbrella', price: 30, waterproof: true };
let products: { name: string, price: number }[] = [hat, gloves, umbrella]

products.forEach(prod => console.log(`${prod.name}: ${prod.price}`))
```

但如果我們希望強調 products 裡面的 item 也可以使用 `waterproof` 屬性呢？我們可以使用**選擇性屬性**。

```typescript
let products: { name: string, price: number, waterproof?: boolean }[] = [hat, gloves, umbrella];
```

因為 waterproof 是選擇性的，所以在跑 forEach 時並不會在 hat 與 gloves 抱錯，但因為 hat 與 gloves 沒有 price，所以會回傳 undefined

```typescript
products.forEach((prod) => {
  console.log(`${prod.name}: ${prod.price}, waterproof: ${prod.waterproof}`)
})
```

result:

```Bash
Hat: 100, waterproof: undefined
Gloves: 75, waterproof: undefined
Umbrella: 30, waterproof: true
```

### 物件方法 (Object Methods)

前面看完物件屬性，現在我們來看物件方法。

```typescript
// 定義列舉
enum Feature { Waterproof, Insulated, None }

let hat = { name: "Hat", price: 100, feature: Feature.None }
let gloves = { name: "Gloves", price: 75, feature: Feature.Insulated }
let umbrella = {
  name: "Umbrella",
  price: 30,
  feature: Feature.Waterproof,
  hasFeature: function (checkFeature) { // 物件方法在此
    return this.feature === checkFeature
  }
}

let products: {
  name: string,
  price: number,
  feature: Feature,
  hasFeature?(f: Feature): boolean // 物件方法形狀，只能是 boolean
}[] = [hat, gloves, umbrella]

products.forEach(prod => console.log(
  `${prod.name}: ${prod.price}` + `, waterproof: ${prod.hasFeature(Feature.Waterproof)}` // 呼叫物件方法
))
```

* `hasFeature()` 是選擇性的，所以 hat 與 gloves 可以沒有這個方法
* 但在 `forEach` 中執行 `prod.hasFeature` 時，因為 `hat` 與 `gloves` 沒有 `hasFeature`，所以還是會報錯。解法在下一個 section。

### 啟用嚴格檢查 (Strict Type Checking)

在上一個 section，當呼叫 `prod.hasFeature()` 時，`hat` 及 `gloves` 都會回傳 undefined，為了避免此問題，我們可以開啟 `strictNullChecks` 禁止將 null 與 undefined 指派給其他變數，則此時錯誤為

```bash
Cannot invoke an object which is possibly 'undefined'
```

我們就知道某一 object 可以產生 undefined，從而修改為

```typescript
products.forEach(prod => console.log(
  `${prod.name}: ${prod.price}` + `, waterproof: ${prod.hasFeature ? prod.hasFeature(Feature.Waterproof) : false}` // 呼叫物件方法
))
```

* 此時會先檢查是否有 `prod.hasFeature`，如果沒有則回傳 `false`

### 賦予物件形狀別名 (Assigning Object Shape Aliases)

回顧上面的建立 array 的例子

```typescript
let products: { 
  name: string,
  price: number,
  feature: Feature,
  hasFeature?(f: Feature): boolean
}[] = [hat, gloves, umbrella]
```

我們可以直接定義一個 `Product` 的 type，然後建立 array 要求 item 要是 `Product` type

```typescript
type Product = {
  name: string,
  price: number,
  feature: Feature,
  hasFeature?(f: Feature): boolean
}

let products: Product[] = [hat, gloves, umbrella] // 變得更簡潔
```

### 額外屬性 (Additional Properties)

本書建議直接停用編輯器的額外屬性檢查，因為物件本身沒有錯誤，多增加的屬性並沒有使該物件不符合物件形狀，例如：

```typescript
let shades = {
  name: "Sunglasses",
  price: 54,
  feature: Feature.None,
}

let products: Product[] = [hat, gloves, umbrella, shades]
products.forEach(...) // 此時不會報錯
```

如果我們在 `shades` 加入型別

```typescript
let shades: Product = {
  name: "Sunglasses",
  price: 54,
  feature: Feature.None,
  finish: "mirrored" // 額外屬性
}

// 此時會有錯誤，因為 finish 屬性並沒有定義在 Product 中，但給定 name, price, feature，則 shades 還是屬於 Product
```

至於關掉額外屬性檢查，可以修改編譯器的檢查如下

```JSON
{
  "compilerOptions": {
    ...,
    "suppressExcessPropertyErrors": true
  }
}
```

## 型別聯集&防衛敘述

### 型別聯集 (Type Union)

聯集後，物件只能使用參與聯集的物件們的共用屬性（可以想像聯集會創造更大的集合，所以只使用共用屬性）

```typescript
type Product: {
  id: number,
  name: string,
  price?: number // 選擇性屬性
}

type Person: {
  id: string,
  name: string,
  city: string
}

let hat = { id: 1, name: "Hat", price: 100 };
let gloves = { id: 1, name: "Gloves", price: 100 }
let umbrella = { id: 1, name: "Umbrella", price: 100 }
let bob = { id: "bsmith", name: "Bob", city: "London" }

let dataItems: (Product | Person)[] = [hat, gloves, umbrella, bob];

dataItems.forEach(item => console.log(`ID: ${item.id}, Name: ${item.name}`)) // 只能使用共用的屬性 id, name。其中 id 是 number 還是 string 都可以
```

為了更清楚表達聯集，我們可以設定聯集的 type

```typescript
...
type UnionType = { // 表達聯集
  id: number | string, // 可以是兩種 type
  name: string
}
...
let dataItems: UnionType[] = [hat, gloves, umbrella, bob]
...
```

### 防衛敘述 (Guard Clause)

在 Javascript 中，無法使用 `typeof`進行型別防衛敘述，因為任何物件都會回傳 `object`，我們應使用 `in` 來進行。`in` 會檢查該物件是否存在特定屬性。

```typescript
type Product = {
  id: number,
  name: string,
  price?: number
}

type Person = {
  id: string,
  name: string,
  city: string // 只有 Person 有 city 屬性
}

...

dataItems.forEach(item => {
  if ('city' in item) { // 只有 Person 有 city 屬性
    console.log(`Person: ${item.name}, ${item.city}`)
  } else {
    console.log(`Product: ${item.name}, ${item.price}`)
  }
})
```

### 型別謂詞函式的防衛敘述 (Type Predicate Function)

上面的邏輯我們可以打包成一個 function

```typescript
function isPerson(testObj: any): testObj is Person {
  return testObj.city !== undefined
}

dataItems.forEach(item => {
  if (isPerson(item)) {
    ...
  }
})
```

## 型別交集

交集後，創立一個物件要使用所有型別的屬性。（可以想像交集會創造較小的集合，所以要使用所有屬性）

```typescript
type Person = {
  id: string,
  name: string,
  city: string
}

type Employee = {
  company: string,
  dept: string
}

let bob = { // 要創立一個物件同時屬於 Person 與 Employee 型別，則所有屬性都要有，才符合 Person 交集 Employee
  id: "bsmith", name: "Bob", city: "London",
  company: "Acme Co", Dept: "Sales"
}

let dataItems: (Person & Employee)[] = [bob]; // 由於 bob 有 Person 與 Employee 的所有屬性，所以 bob 屬於 Person & Employee (交集)

dataItems.forEach(item => {
  console.log(`Person: ${item.id}, ${item.name}, ${item.city}`)
  console.log(`Employee: ${item.id}, ${item.company}, ${item.dept}`)
})
```

### 合併資料

型別交集較常的應用是在合併資料

```typescript
type Person = {
  id: string,
  name: string,
  city: string
}
type Employee = {
  id: string,
  company: string,
  dept: string
}

// 型別交集
type EmployedPerson = Person & Employee

function correlateData(peopleData: Person[], staff: Employee[]): EmployedPerson[] {
  EmployedPerson[] {
    // 要回傳的陣列
    let result: EmployedPerson[] = []
    // 接下來會把有共同 id 的 Person 與 Employee 合併
    peopleData.forEach(
      // 會去找 staff 裡面有相同 id 的，如果沒有就給 None
      correctedStaffData = ...staff.find(e => e.id === p.id) || {company: "None", dept: "None", id: p.id}
      p => {
        result.push({
          ...p, correctedStaffData
        })
      }
    )
  }
  return result
}

let people: Person[] = [
  {id: 'bsmith', name: 'Bob Smith', city: 'London'},
  ...
]

let employees: Employee[] = [
  {id: 'bsmith', company: 'Acme Co', dept: 'Sales'},
  ...
]

let dataItems: EmployedPerson [] = correlateData(people, employees) // correlateData 的回傳值的 elements 是屬於 EmployedPerson (重點就是這個)
```

### 向下相容

這個就是強調交集的型別產生的物件用在那些各別型別時不會出錯

```typescript
...
let dataItems: EmployedPerson [] = correlateData(people, employees) // dataItems 產生的物件都是屬於 EmployedPerson

function writePerson(per: Person): void {
  console.log(`Person: ${per.id}, ${per.name}, ${per.city}`)
}

function writeEmployee(emp: Employee): void {
  console.log(`Employee: ${emp.id}, ${emp.company}, ${emp.dept}`)
}

dataItems.forEach(item => {
  writePerson(item); // 這個方法只允許 Person
  writeEmployee(item); // 這個方法使允許 Employee
})

// 還是跑得動
```

### 相異型別屬性合併

型別交集會包含所有的屬性，那要怎麼給交集後的屬性正確的型別？

```typescript
type Person = {
  ...
  contact: number
}

type Employee = {
  ...
  contact: string
}

type EmployedPerson = Person & Employee;
let typeTest = ({} as EmployedPerson).contact // 可以查看交集後的屬性
```

則我們現在去看編譯後的結果

```typescript
declare let typeTest: never; // 是 never，因為根本沒有值可以同時滿足 number & string
```

則此時使用 `EmployedPerson` 創建物件會報錯，因為 `contact` 無法 assign 值。至於要怎麼同時滿足值要是不同的 type，但又要可以 assign，我們可以使用物件將該 type 包起來，而因爲值都是物件，所以用此型別交集創立物件不會報錯。

```typescript
type Person = {
  id: string,
  name: string,
  contact: {phone: number} // 物件
}

type Employee = {
  id: string,
  company: string,
  dept: string
  contact: {name: string} // 物件
}

type EmployedPerson = Person & Employee
let typeTest = ({} as EmployedPerson).contact

let person1: EmployedPerson = {
  ...,
  contact: {name: 'Alice', phone: 111111} // name 與 phone 都給
}

let person2: EmployedPerson = {
  ...,
  contact: {name: 'Alice', phone: 111111} // name 與 phone 都給
}

// 交集使屬性同時擁有兩個型別 => {phone: number} & {name: string}
```

### 方法合併

上一個 section 探討合併屬性，這邊探討合併方法。

```typescript
type Person = {
  id: string,
  name: string,
  city: string,
  getContact(field: string): string
}

type Employee = {
  id: string,
  company: string,
  dept: string,
  getContact(field: number): number
}

type EmployedPerson = Person & Employee;

// 使用該交集型別創立物件
let person: EmployedPerson = {
  ...,
  getContact(field: string | number): any { // 可以看到 input 可以是 string 或是 number
    return typeof field === 'string' ? 'Alice' : 111111;
  }
}

// 而回傳值我們設定為 any，因為無法找到可與 string 與 number 交集的型別。
```
