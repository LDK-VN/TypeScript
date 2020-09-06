# Basic types

## Boolean

* Giá trị true/false -> boolean
```ts
let isDone = false;
```

## Number

* All số -> Floating point value (giá trị dấu phẩy động) or BigIntegers
* Floating point numbers -> type **number**
* BigIntegers -> type **bigint**
* Support thêm -> binary, octal, hexadecimal, decimal

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

## String

* Tham chiếu kiểu dữ liệu văn bản -> Dấu (") or (') bao quanh chuỗi.
```ts
let color: string = "blue";
color = "red";
```

* Template string -> kéo dài nhiều dòng và nhúng -> backtick/backquote (`) character, biểu thức nhúng dạng ${ expr }
```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}`.

// I'll be ${age + 1} years old nẽt month.`;
```

```ts
let sentence: string = 
    "Hello, my name is " + 
    fullName + 
    ".\n\n" + 
    "I'll be " + 
    (age + 1) + 
    " years old next month.";
```

## Array

* 2 Cách viết

way 1 -> [] phía sau
```ts
let list: number[] = [1, 2, 3];
```

way2 -> Array<elemType>
```ts
let list: Array<number> = [1, 2, 3];
```


## Tuple

* Thể hiện mảng -> elements cố định đã biết -> không cần giống nhau
```ts
// Declare a tuple type
let x: [string, number];
//Initialize it
x = ["hello",10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error

// Type 'number' is not asignable to type 'string'.
// Type 'string' is not asignable to type 'number'.
```
* Khi truy cập một phần tử có chỉ mục đã biết, loại đúng sẽ được truy xuất:
```ts
// OK
console.log(x[0].substring(1));

console.log(x[1].substring(1));
// Property 'substring' does not exist on type 'number'.
```
* Không thể truy cập một phần tử bên ngoài tập hợp các chỉ số đã biết với lỗi:
```ts
x[3] = "World";
// Tuple type '[string, number]' of length '2' has no element at index '3'.
 console.log(x[5].toString());
// Object is possibly 'undefined'.
// Tuple type '[string, number]' of length '2' has no element at index '5'.
```

## Enum

* Biểu diễn numeric values
```ts
enum Color {
    Red,
    Green,
    Blue,
}
let c: Color = Color.Green;
```

* Default enums bắt đầu từ 0 -> Thay đổi -> Đặt thủ công giá trị của một trong các members
```ts
enum Color {
    Red = 1,
    Green,
    Blue
}

let c: Color = Color.Green;
```

* Đặt thủ công all values
```ts
enum Color {
    Red = 1,
    Green = 2,
    Blue = 4,
}

let c: Color = Color.Green;
```

* Chuyển giá trị số sang tên giá trị trong enum
```ts
enum Color {
    Red = 1,
    Green,
    Blue,
}
let colorName: string = Color[2];

// Displays 'Green'
console.log(colorName);
```
## Unknown

* Cung cấp cho complier và người đọc trong tương lại biết -> nó có thể là bất cứ thứ gì
```ts
let notSure: unknown = 4;
notSure = "maybe a string instead";

// OK, definitely a boolean
notSure = false;
```

* Thu hẹp giá trị cụ thể bằng typeof
```ts
declare const maybwe: unknown;
// 'maybe' could be a string, object, boolean, undefined, or other types
const aNumber: number = maybe;
/* Type 'unknown' is not assignable to type 'number'. */

if(maybe === true) {
    // TypeScript knowns that maybe is a boolean now
    const aBoolean : boolean = maybe;
    // So, it cannot be a string
    const aString: string = maybe;
    // Type 'boolean' is not assignable to type 'string'.
}

if(typeof maybe === "string") {
    // TypeScript knowns that maybe is string
    const aString: string = maybe;
    //So, it cannot be a boolean
    const aBoolean = maybe;
    // Type 'string' is not assignable to type 'boolean'.
}
```

## Any

* Case -> không phải thông tin types có sẵn -> khai báo tốn nhiều công sức => dùng **any**
```ts
declare function getValue(key: string): any;
// OK, return value of 'getValue' is not checked
const str: string = getValue("myString");
```

* Khác unknown -> any cho phép asscess properties tuỳ ý, ngay cả properties không tồn tại -> không check sự tồn tại hoặc type
```ts
let  looselyTyped: any = 4;
// OK, ifItExists might exist at runtime
looselyTyped.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
looselyTyped.toFixed();

let strictlyTyped: unknown = 4;
strictlyTyped.toFixed();
// Object is of value 'unknown'.
```

* Tiếp tục nhảy qua obj
```ts
let looselyTyped: any = {};
let d = looselyTyped.a.b.c.d;
```

```
Chú ý: Cái gì cũng có cái giá của nó -> dùng any tiện -> nhưng không an toàn => tránh dùng any khi không cần thiết
```


## Void

* Ngược với any -> không có any types. Function type void -> no return

```ts
function warnUser(): void {
    console.log("This is my warning message");
}
```

* Type void không hữu ích -> chỉ có thể gán null (chỉ khi --strictNullCheckskhông được chỉ định) or undefined
```ts
let unusable: void = undefined;
// OK if `--strictNullChecks` is not given
unuable = null;
```

## Null and Undefined

* Có type riêng tên -> undefined và null tương ứng
```ts
// Not much else ưe can assign to thế variables!
let u: undefined = undefined;
let n: null = null;
```

* Nó là con của all types. -> chỉ định null và undefined cho number
* Tuy nhiên -> dùng --strictNullChecks flag -> null, undefined chỉ chuyển nhược cho unknown, any và types tương ứng (undefined cũng chuyển nhượng tới void) => Tránh được nhiều lỗi phổ biến

* Nên sử dụng --strictNullChecks

## Never

* Đại diện cho values không bao giờ xảy ra.
* ex: 
    * never trong function -> luôn nhém ra ngoại lệ hoặc không bao giờ trả về value.
    * variable type never -> thu hẹp -> không bao giờ đúng
```ts
//Function returning never must not have a reachable end point
function error(message: string) : never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must not have a reachable end point
function infiniteLoop(): never {
    while(true) {}
}
```

## Object

* Non-primitive -> everything -> không phải number, string, boolean, symbol, null or undefined


Với type object -> API như Object.create được trình bày tốt hơn -> EX
```ts
declare function create(o: object | null) : void;

// OK
create({ prop: 0})
create(null);

create(50);
// Argument of type '42' is not assignable to parameter of type 'object | null'.
create("khanhld");
// Argument of type '"khanhld"' is not assignable to parameter of type 'object | null'.
create(false');
// Argument of type 'false' is not assignable to parameter of type 'object | null'.
create(undefined);
// Argument of type 'undefined' is not assignable to parameter of type 'object | null'.
```

## Type asertions

Có trường hợp bạn biết nhiều hơn về 1 giá trị so với TypeScript. Thông thường điều này xảy ra khi bạn biết cụ thể hơn loại hiện tại của entity (thực thể) nào đó -> xem ví dụ sẽ hiểu


Là một cách để nói với compiler -> tin tao đi, tao biết t đang làm gì. Không kiểm tra đặc biệt hay tái câu trúc dữ liệu. Không tác động tới runtime và được sử dụng hoàn toàn compiler. TypeScript giả định -> developer -> đã kiểm tra


Có 2 dạng

* as-syntax:

```ts
let someValue: unknown = "this is a string";
let str strLength: number = (someValue as string).length;
```

* angle-bracket syntax (Cú pháp dấu ngoặc nhọn)
```ts
let someValue: unknown = "this is a string";

let strLength: number = (<string>someValue).length;
```

## About Number, String, Boolean, Symbol và Object

* Những kiểu này không đề cập tới language primitives (nguyên thuỷ ngôn ngữ) -> hầu như không nên sử dụng như một type

```ts
function reverse(s: String): String {
    return s.split("").reverse().join("");
}

reverse("hello world");
```

* Thay vào đó sử dụng các type number, string, boolean, symbol và object
```ts
function reverse(s: string) : string {
    return s.split("").reverse().join("");
}

reverse("hello world");
```
