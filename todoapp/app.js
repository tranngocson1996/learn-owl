// Đoạn mã này đang nhập ba đối tượng từ thư viện OWL: Component, mount và xml.
// Component là một lớp có thể được mở rộng để tạo ra các thành phần tùy chỉnh trong OWL.
// mount là một hàm được sử dụng để gắn một thành phần vào DOM.
// xml là một hàm được sử dụng để tạo các phần tử XML trong các mẫu OWL.
const { Component, mount, xml } = owl;

// Owl Components
class Root extends Component {
// Đoạn code static template = xml<div>todo app</div>; được sử dụng để định nghĩa một mẫu tĩnh cho một thành phần OWL. Mẫu tĩnh sẽ không thay đổi dựa trên trạng thái hoặc dữ liệu của thành phần.
// Trong khi đó, App.template = xml<div>todo app</div>; được sử dụng để định nghĩa một mẫu động cho thành phần App trong OWL. Mẫu động có thể được cập nhật dựa trên trạng thái và dữ liệu của thành phần.
// Vì vậy, khi sử dụng static template, mẫu được xác định sẽ không thể thay đổi, trong khi sử dụng App.template, mẫu có thể được cập nhật để phản ánh các thay đổi trong trạng thái hoặc dữ liệu của thành phần.
//  static template = xml`<div>todo app</div>`;
//  App.template = xml<div>todo app</div>;

// Cả hai câu lệnh đều được sử dụng để tạo một mẫu tĩnh (static template) trong OWL. Tuy nhiên, có một sự khác biệt nhỏ giữa chúng.
// Trong trường hợp static template = xml /* xml */<div>todo app</div>;, câu lệnh sử dụng cú pháp template string (``) để định nghĩa một chuỗi có chứa một phần tử HTML. Ký tự /* xml */ trước chuỗi là một comment, không ảnh hưởng đến giá trị của chuỗi.
// Trong khi đó, trong trường hợp static template = xml<div>todo app</div>;, câu lệnh đơn giản chỉ định một chuỗi có chứa một phần tử HTML mà không sử dụng cú pháp template string.
// Tóm lại, cả hai câu lệnh đều tạo ra một mẫu tĩnh (static template) trong OWL, tuy nhiên, cú pháp của chúng khác nhau.
    static template = xml /* xml */`<div>todo app</div>`;
}

// Đoạn code mount(Root, document.body); được sử dụng để gắn một thành phần OWL gốc (root component) vào thân của tài liệu HTML.
// Tham số đầu tiên (Root) là tên của thành phần OWL gốc, tham số thứ hai (document.body) là phần tử HTML nơi thành phần OWL sẽ được gắn vào.
// Khi được gọi, hàm mount sẽ tạo một instance của thành phần OWL gốc và gắn nó vào phần tử HTML được chỉ định. Sau đó, thành phần sẽ được hiển thị trên trình duyệt của người dùng.
mount(Root, document.body);