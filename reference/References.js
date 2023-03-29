// Hook useRef hữu ích khi chúng ta cần một cách để tương tác với một phần bên trong của một thành phần, được render bởi Owl. Nó có thể hoạt động trên một nút DOM hoặc trên một thành phần, được nhắm mục tiêu bởi chỉ thị t-ref. Xem phần các hook để biết thêm chi tiết.
// Ví dụ ngắn gọn, đây là cách chúng ta có thể đặt chú ý vào một đầu vào cụ thể:

// <div>
//     <input t-ref="input"/>
//     <button t-on-click="focusInput">Click</button>
// </div>

// import { useRef } from "owl/hooks";

// class SomeComponent extends Component {
//   inputRef = useRef("input");

//   focusInput() {
//     this.inputRef.el.focus();
//   }
// }

// Hãy nhớ rằng thuộc tính el chỉ được đặt khi mục tiêu của chỉ thị t-ref được mount trong DOM. Nếu không, nó sẽ được đặt thành null.
// Hook useRef không thể được sử dụng để có được một tham chiếu đến một phiên bản của một thành phần con.
// Lưu ý rằng ví dụ này sử dụng hậu tố ref để đặt tên cho tham chiếu. Điều này không bắt buộc, nhưng nó là một quy ước hữu ích, để chúng ta không quên rằng đó là một đối tượng tham chiếu.
