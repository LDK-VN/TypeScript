<p align="center">
  <a href="https://github.com/LDK-VN/TypeScript/blob/master/resource/logo2.png" target="blank"><img src="https://github.com/LDK-VN/TypeScript/blob/master/resource/logo2.png" width="320" alt="Nest Logo" /></a>
</p>

# TypeScript for Javascript programers
* TypeScript -> Mỗi quan hệ bất thường với Javascript
* Cung cấp all tính năng JS + TypeScript’s type system (Hệ thống kiểu)

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
    * strinng
    * sumbol
    * object
    * undefinned

* TypeScript mở rộng danh sách
    * any (Bất cứ đứa nào)
    * unknown (ensure someone using this type declares what the type is)
        * Nó giống any
        * Khó tính hơn any
        * Chỉ có thể gán cho any hoặc unknown
    * nerver (it’s not possible that this type could happen)
        * Không bao giờ có giá trị
        
```ts
function throwError(errorMsg: string): never { 
            throw new Error(errorMsg); 
} 

function keepProcessing(): never { 
    keepProcessing();
}
```

    * void (Một function trả về `undefined` hoặc không trả về value)
