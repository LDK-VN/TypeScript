# Interfaces

## Our First Interface (Giao diện đầu tiên của chúng tôi)

Một ví dụ đơn giản để bắt đầu
```ts
function printLabel(labeledObj: { label: string}) {
    console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

Một ví dụ về sử dung interface
```ts
interface LabeledValue {
    label: string;
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

Đối tượng truyền vào function ở đây chỉ cần đáp ứng yêu cầu liệt kê -> duyệt (không quan tâm thứ tự)

## Optional Properties (Thuộc tính tuỳ chọn)

Không phải tất cả properties interface đều được yêu cầu -> Tồn tại -> điều kiện nhất định or không có => Option bags: nơi truyền vào một obj vào function chỉ có một vài thuộc tính được điền vào .

Interface có thuộc tính tuỳ chọn có '?' phía cuối

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", are: 100 };
    if(config.color) {
        newSquare.color = config.color;
    }
    if(config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ color: "black"});
```

* Ưu điểm -> Describe properties có sẵn + ngăn việc sử dụng các properties không thuộc interface

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", are: 100 };
    if(config.clor) { //Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'?
        newSquare.clor = config.clor;//Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'?
    }
    if(config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ color: "black"});
```

## Readonly properties (Thuộc tính chỉ đọc)

Chỉ định properties -> sửa -> first new obj => readonly before the name of property
```ts
interface Point {
    readonly x: number;
    readonly y: number;
}
```

Maybe build Point -> assigning a obj theo nghĩa đen -> nhưng chúng không thể thay đổi
```ts
let p1: Point = { x: 10, y: 20 }
p1.x = 5; // error!
// Cannot assign to 'x' because it is a read-only property.
```

TypeScript đi kèm -> ReadonlyArray<T> kiểu giống Array<T> với all mutating methods removed => đảm bảo mình không thay đổi các mảng của mình sau khi tạo:
```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = 1;

ro[0] = 12; // error!
// Index signature in type 'readonly number[]' only permits reading.
ro.push(5); // error!
// Property 'push' does not exist on type 'readonly number[]'.
ro.length = 100; // error!
// Cannot assign to 'length' because it is a read-only property.
a = ro; // error!
// The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
```

Có thể ghi đè với một type assertion
```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = 1;

a = ro as number[];
```

### readonly vs const

const -> apply on variable
readonly -> apply on properties

## Excess Property Checks (Kiểm tra tài sản thừa)

Kết hợp không thông minh => error 
```ts
interface SquareConfig {
    color? : string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return { color: config.color || "red", area: config.width || 20 };
}

let mySquare = createSquare({ colour: "red", width: 100 });
// Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'.
// Did you mean to write 'color'?
```

Excess Property Checks -> trái qua phải ->> gán cho biến khác or chuyển dưới dạng đối số => không có property trong "target type" không có, gặp lỗi
```ts
let mySquare = createSquare({ colour: "red", width: 100 });
// Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
```

Kiểm tra tài sản thừa -> use a type assertion
```ts
let mySquare = createSquare({ color: "red", opacity: 0.5 } as SquareConfig);
```

Một cách tốt hơn -> use string index signature(Chữ ký chỉ mục chuỗi) 
```ts
interface SquareConfig {
    color? : string;
    width?: number;
    [propName: string] : any;
}
```

Cách cuối -> gán cho variable khác
```ts
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

Cách trên error if -> không có object property chung
```ts
let squareOptions = { colour: "red" };
let mySquare = createSquare(squareOptions);
```

* Nên dùng use string index signature(Chữ ký chỉ mục chuỗi) 

## Function types (Các loại chứ năng)

Ngoài môt tả object with properties, interfacé còn có khả năng mô tả function types.
```ts
interface SearchFunc {
    (source: string, subString: string) : boolean;
}
```

Tạo một biến của một function type và gán cho một giá trị functin same type
```ts
let mySearch: SearchFunc;

mySearch = function (source: string, subString: string) {
    let result = source.search(subString);
    console.log(result);
    return result > -1;
}
```

The parameters không cần match
```ts
let mySearch: SearchFunc;

mySearch = function (src: string, sub: string) {
    let result = src.search(sub);
    console.log(result);
    return result > -1;
}
```

Parameters được kiểm tra lần lượt, mỗi vị trí parameter tương ứng -> được kiểm tra lẫn nhau. Nếu không muốn chỉ định kiểu -> TypeScript tự suy ra parameter type vì function value được gán trực tiếp cho một biến SearchFunc type.
```ts
let mySearch: SearchFunc;

mySearch = function (src, sub) {
    let result = src.search(sub);
    console.log(result);
    return result > -1;
}
```

Nếu function return về string -> error -> vì không khớp với type return mô tả trong SearchFunc interface.
```ts
let mySearch: SearchFunc;

mySearch = function (src, sub) {
    let result = src.search(sub);
    console.log(result);
    return "string";
}
```