<p align="center">
  <a href="https://github.com/LDK-VN/TypeScript/blob/master/resource/logo2.png" target="blank"><img src="https://github.com/LDK-VN/TypeScript/blob/master/resource/logo2.png" width="320" alt="Nest Logo" /></a>
</p>

# TypeScript for Javascript programers
* TypeScript -> Mối quan hệ bất thường với Javascript
* Cung cấp all tính năng JS + TypeScript’s type system (Hệ thống type)

## Tài liệu tham khảo
https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

## Types by inference (Loại theo suy luận)
* Tạo các type cho bạn trong nhiều trường hợp

EX: Tạo biến -> gán giá trị cụ thể -> sử dụng type của giá trị đó

```ts
let helloworld = "Hello World";
//  ^ = let helloWorld: string
```

## Defining Types (Xác định các loại)

Một số design patterns -> khó suy ra type tự động

* TypeScript hỗ trợ một phần mở rộng JS -> cung cấp những nơi cho TypeScript biết nên là loại gì

EX: Để tạo một obj có inferred type  gồm name: string và id: number -> có thể viết
```ts
const user = {
    name: "KhanhLD",
    id: 0,
}
```

Describe hình dạng của obj bằng interface
```ts
interface User {
    name: string,
    id: number,
}
```
and then khai báo một obj phù hợp -> :TypeName sau khai báo biến
```ts
const user: User = {
    name: "KhanhLD",
    id: 0,
}
```

Nếu cung cấp obj không phù hợp
```ts
interface User{
    name:string;
    id: number;
}

const user: User = {
    username: "khanhld",
/** Type '{ username: string; id: number; }' is not assignable to type 'User'.
    Object literal may only specify known properties, and 'username' does not exist in type 'User'. */
    id: 0,
}
```


Vì JS support class and OOP -> TS cũng vậy.

```ts
interface User{
    name: string;
    id: number,
}

class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.number = number;
    }
}

const user: User = new UserAccount("KhanhLD",1);
```

Có thể sử dụng interfaces để chú thích các tham số và giá trị trả về cho các hàm

```ts
function getAdminUser(): User {
    //...
}

function deleteUser(user: User) {
    //...
}
```

* Có một nhóm nhỏ các type nguyên thuỷ có sẵn trong JS:
    * boolean
    * bigint
    * null
    * number
    * string
    * symbol
    * object
    * undefined

* TypeScript mở rộng danh sách
    * any (Bất cứ đứa nào)
    * unknown (ensure someone using this type declares what the type is)
        * Nó giống any
        * Khó tính hơn any
        * Chỉ có thể gán cho any hoặc unknown
        * Phần này khá khó hiểu -> để tìm hiểu thêm
    * never (it’s not possible that this type could happen)
        * Không bao giờ có giá trị
    * void (Một function trả về `undefined` hoặc không return value)

EX: type never
```ts
function throwError(errorMsg: string): never { 
            throw new Error(errorMsg); 
} 

function keepProcessing(): never { 
    keepProcessing();
}
```

## Composing Types (Sáng tạo các kiểu)

* Sáng tạo types phức tạp -> kết hợp các types đơn giản
* 2 cách phổ biến: Unions vs Generics.

### Unions

* Khai báo 1 kiểu là 1 trong nhiều kiểu.
```ts
type MyBool = true | false; // MyBool type boolean
```

* Use-case phổ biến -> tập string, number -> một giá trị được phép
```ts
type WindowStates = "open" | "closed" | "minimized"
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9; 
```

* Array || String:
```ts
function getLength(obj: string | string[]) {
    return obj.length;
}
```

* Loại biến -> using typeof:
```
Type            Predicate

string          typeof s === "string"
number          typeof n === "number"
boolean         typeof b === "boolean"
undefined       typeof undefined === "undefined"
function        typeof f === "function"
array           Array.isArray(a)
```

Ex: Hàm return về values khác nhau -> phụ thuộc tham số truyền vào
```ts
function wrapInArray(obj:string | string[]) {
    if(typeof obj === "string")
        return [obj];
    else
        return obj;
}
```

### Generics
* Cung cấp các variable to types.
* EX: * Array -> không có generic -> chứa all
      * Array -> có generic -> mô tả các giá trị mảng đó chứa
```ts
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{name: string}>
```

* Declare types riêng
```ts
interface Backpack<Type> {
    add: (obj: Type) => void
    get: () => Type;
}
// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string>;

// object is a string, because we declared it above as the variable part of Backpack
const object = backpack.get();

// Since the backpack variable is a string, you can't pass a number to the add function
backpack.add(23);
//Argument of type 'number' is not assignable to parameter of type 'string'.
```

## Structural Type System (Hệ thống loại kết cấu)

* Nguyên tắc cốt lõi -> checking focus -> shape(hình dạng) các giá trị đó có -> đôi khi gọi là 
"duck typing" or "structural typing"

* (.) Hệ thống kết cấu  -> 2 obj shape giống nhau -> same type
```ts
interface Point {
    x: number;
    y: number;
}

function printPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`)
}

// prints "12, 16"
const point = { x: 12, y: 26};
printPoint(point);
```

* shape-match -> yêu cầu -> tập con các field khớp
```ts
const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // prints "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // prints "33, 3"

const color = { hex: "#187ABF" };
printPoint(color);
// Argument of type '{ hex: string; }' is not assignable to parameter of type 'Point'.
//Type '{ hex: string; }' is missing the following properties from type 'Point': x, y
```

* Không có sự khác biệt giữa lớp và object tuân theo shapes
```ts
class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const newPoint = new VirtualPoint(13, 56);
printPoint(newPoint); // prints "13, 56"
```

* Obj hoặc class -> có all thuộc tính bắt buộc -> they match, bất kể chi tiết triển khai (có thể hiểu -> thêm bất kỳ tham số nào khác)
