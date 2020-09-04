# First steps
[TypeScript]()
## Ngôn ngữ

* Typescript
* Javascript



## What is TypeScript

* Một biến thể của Javascript

## A static type checker (Trình kiểm tra loại tĩnh)

* Phát hiện lỗi, lỗi nào không dựa trên -> loại giá trị đang run -> static type checker (Kiểm tra kiểu tĩnh)
* Check lỗi program -> trước exe -> dự trên loại giá trị

```
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
Property 'heigth' does not exist on type '{ width: number; height: number; }'. Did you mean 'height'?
```

### Syntax (Cú pháp)
* TS là superset JS -> syntax JS là TS hợp pháp.
* Đề cập -> cách viết văn bản => program
* Không xem bât kỳ mã JS -> lỗi cú pháp

### Types (Các loại)
* Typed superset -> thêm quy tắc -> sử dụng các loại giá trị khác nhau
* Type cheker -> cho phép chương trình chính xác đi quá -> bắt được nhiều lỗi phổ biến nhất có thể
* Chuyển mã JS->TS => type errors

### Runtime behavior ( Hành vi thời gian chạy)
* Không thay đổi runtime behavior của javascript
* Dễ chuyển đổi 2 ngông ngữ -> ko lo khiến chương trình ngừng hoạt động

### Erased Types (Các loại đã xoá)
* Type checker done -> xoá type => compiled code (Pure JS không có thông tin loại)
* Typescript không thay đổi hành vi chương trình dựa vào types -> Có lỗi type -> không liên quan tới cách chương trình hoạt động khi nó chạy


