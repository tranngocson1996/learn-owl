// Trong một số trường hợp, việc có thể hiển thị một số nội dung bên ngoài ranh giới của một thành phần là hữu ích. Để làm điều này, Owl cung cấp một chỉ thị đặc biệt: t-portal:

// import { Component } from "owl";

// class SomeComponent extends Component {
//   static template = xml`
//       <div>this is inside the component</div>
//       <div t-portal="'body'">and this is outside</div>
//     `;
// }

// Chỉ thị t-portal nhận một bộ chọn CSS hợp lệ làm đối số. Nội dung của template được đưa vào sẽ được lắp đặt tại vị trí tương ứng. Lưu ý rằng Owl cần chèn một nút văn bản trống tại vị trí của nội dung được đưa vào.
// Ở đây, chúng ta có một thành phần SomeComponent với hai phần tử div. Phần tử thứ hai có một chỉ thị t-portal và đặt giá trị của nó là "body". Điều này có nghĩa là nội dung của phần tử sẽ được lắp đặt vào vị trí đầu tiên của thẻ body trong DOM.
// Chúng ta có thể thay đổi giá trị của chỉ thị t-portal để hiển thị nội dung được đưa vào tại các vị trí khác nhau trong DOM.