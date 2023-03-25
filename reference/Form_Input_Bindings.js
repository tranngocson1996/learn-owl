// Thường xuyên cần có khả năng đọc giá trị từ một đầu vào HTML (hoặc textarea, hoặc select) để sử dụng nó (lưu ý: nó không cần phải ở trong một biểu mẫu!). Một cách có thể để làm điều này là tự làm:
// class Form extends owl.Component {
//     state = useState({ text: "" });
  
//     _updateInputValue(event) {
//       this.state.text = event.target.value;
//     }
// }

// <div>
//   <input t-on-input="_updateInputValue" />
//   <span t-esc="state.text" />
// </div>

// Điều này hoạt động. Tuy nhiên, điều này yêu cầu một chút mã plumbing. Ngoài ra, mã plumbing có chút khác nhau nếu bạn cần tương tác với một hộp kiểm, hoặc với các nút radio, hoặc với các thẻ select.

// Để giúp giải quyết tình huống này, Owl có một chỉ thị tích hợp sẵn là t-model. Giá trị của chỉ thị này nên là một giá trị được quan sát trong thành phần (thường là state.someValue). Với chỉ thị t-model, chúng ta có thể viết một đoạn mã ngắn hơn, tương đương với ví dụ trước đó:

// class Form extends owl.Component {
//     state = { text: "" };
// }

// <div>
//   <input t-model="state.text" />
//   <span t-esc="state.text" />
// </div>

// Chỉ thị t-model hoạt động với các thẻ <input>, <input type="checkbox">, <input type="radio">, <textarea> và <select>:

// <div>
//     <div>Text in an input: <input t-model="state.someVal"/></div>
//     <div>Textarea: <textarea t-model="state.otherVal"/></div>
//     <div>Boolean value: <input type="checkbox" t-model="state.someFlag"/></div>
//     <div>Selection:
//         <select t-model="state.color">
//             <option value="">Select a color</option>
//             <option value="red">Red</option>
//             <option value="blue">Blue</option>
//         </select>
//     </div>
//     <div>
//         Selection with radio buttons:
//         <span>
//             <input type="radio" name="color" id="red" value="red" t-model="state.color"/>
//             <label for="red">Red</label>
//         </span>
//         <span>
//             <input type="radio" name="color" id="blue" value="blue" t-model="state.color" />
//             <label for="blue">Blue</label>
//         </span>
//     </div>
// </div>

// Tương tự như xử lý sự kiện, chỉ thị t-model cũng chấp nhận các modifier sau:

// .lazy: Giá trị của đầu vào sẽ chỉ được cập nhật khi sự kiện change xảy ra thay vì input. Điều này hữu ích khi chúng ta muốn trì hoãn việc cập nhật giá trị để tránh tốn tài nguyên khi người dùng đang nhập liệu.
// .number: Giá trị của đầu vào sẽ được chuyển đổi thành kiểu số trước khi gán cho thuộc tính tương ứng trên đối tượng Vue.
// .trim: Giá trị của đầu vào sẽ được cắt bỏ khoảng trắng đầu và cuối trước khi gán cho thuộc tính tương ứng trên đối tượng Vue.

// Ví dụ, để sử dụng modifier .lazy với chỉ thị t-model, chúng ta có thể viết như sau:
// <input type="text" t-model.lazy="myValue"/>
// Điều này sẽ giúp giảm số lần cập nhật giá trị của myValue, chỉ khi nào người dùng kết thúc nhập liệu và sự kiện change xảy ra thì giá trị mới được cập nhật lên đối tượng Vue.

// Tương tự, chúng ta có thể sử dụng modifier .number và .trim nếu cần.

