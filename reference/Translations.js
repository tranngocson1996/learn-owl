// Nếu được thiết lập đúng, Owl có thể dịch tất cả các mẫu được hiển thị. Để làm điều này, nó cần một hàm dịch, hàm này nhận một chuỗi và trả về một chuỗi.
// const translations = {
//     hello: "bonjour",
//     yes: "oui",
//     no: "non",
// };
// const translateFn = (str) => translations[str] || str;
// const app = new App(Root, { templates, tranaslateFn });
// // ...
// Xem trang cấu hình ứng dụng để biết thêm thông tin về cách cấu hình một ứng dụng Owl.
// Sau khi thiết lập, tất cả các mẫu được hiển thị sẽ được dịch bằng cách sử dụng hàm dịch:
//     mỗi nút văn bản sẽ được thay thế bằng bản dịch của nó,
//     các giá trị thuộc tính sau đây cũng sẽ được dịch: title, placeholder, label và alt,
//     các nút văn bản có thể được vô hiệu hóa dịch bằng thuộc tính đặc biệt t-translation, nếu giá trị của nó là off.
// Với hàm translateFn được định nghĩa như trên, các mẫu sau:
// <div>hello</div>
// <div t-translation="off">hello</div>
// <div>Are you sure?</div>
// <input placeholder="hello" other="yes"/>
// sẽ được hiển thị như sau:
// <div>bonjour</div>
// <div>hello</div>
// <div>Are you sure?</div>
// <input placeholder="bonjour" other="yes"/>
// Lưu ý rằng việc dịch được thực hiện trong quá trình biên dịch mẫu, không phải khi nó được hiển thị.
// Trong một số trường hợp, có ích để mở rộng danh sách các thuộc tính có thể dịch. Ví dụ, một người có thể muốn dịch cả các thuộc tính dạng data-* như data-title. Để làm điều đó, chúng ta có thể định nghĩa các thuộc tính bổ sung với tùy chọn translatableAttributes:
// const app = new App(Root, { templates, translateFn, translatableAttributes: ["data-title"] });
// // ...
// Chúng ta cũng có thể xóa một thuộc tính khỏi danh sách mặc định bằng cách thêm tiền tố -:
// const app = new App(Root, {
//     templates,
//     translateFn,
//     translatableAttributes: ["data-title", "-title"],
//   });
// Thuộc tính data-title sẽ được dịch, còn thuộc tính title thì không...
