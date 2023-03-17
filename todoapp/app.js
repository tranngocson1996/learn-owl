// Đoạn mã này đang nhập ba đối tượng từ thư viện OWL: Component, mount và xml.
// Component là một lớp có thể được mở rộng để tạo ra các thành phần tùy chỉnh trong OWL.
// mount là một hàm được sử dụng để gắn một thành phần vào DOM.
// xml là một hàm được sử dụng để tạo các phần tử XML trong các mẫu OWL.
const { Component, mount, xml } = owl;

// -------------------------------------------------------------------------
// Task Component
// -------------------------------------------------------------------------
class Task extends Component {
    static template = xml /* xml */`
        <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
        <input type="checkbox" t-att-checked="props.task.isCompleted"/>
        <span><t t-esc="props.task.text"/></span>
        </div>`;
    static props = ["task"];
}

// -------------------------------------------------------------------------
// Root Component
// -------------------------------------------------------------------------
class Root extends Component {
    static template = xml /* xml */`
        <div class="task-list">
            <t t-foreach="tasks" t-as="task" t-key="task.id">
            <Task task="task"/>
            </t>
        </div>`;
    static components = { Task };

    // Đoạn mã này định nghĩa một mảng các đối tượng đại diện cho các công việc (tasks). Mỗi đối tượng trong mảng đại diện cho một công việc, bao gồm các thuộc tính sau:
    //     id: là một số nguyên duy nhất đại diện cho id của công việc.
    //     text: là một chuỗi đại diện cho nội dung của công việc.
    //     isCompleted: là một giá trị logic đại diện cho trạng thái hoàn thành của công việc (true nếu đã hoàn thành, false nếu chưa hoàn thành).
    // Ví dụ trên cho thấy cách lưu trữ thông tin các công việc trong một mảng đối tượng, giúp cho việc quản lý và hiển thị các công việc trở nên dễ dàng hơn trong ứng dụng.
    tasks = [
        {
            id: 1,
            text: "buy milk",
            isCompleted: true,
        },
        {
            id: 2,
            text: "clean house",
            isCompleted: false,
        },
    ];
}

// Đoạn code mount(Root, document.body); được sử dụng để gắn một thành phần OWL gốc (root component) vào thân của tài liệu HTML.
// Tham số đầu tiên (Root) là tên của thành phần OWL gốc, tham số thứ hai (document.body) là phần tử HTML nơi thành phần OWL sẽ được gắn vào.
// Khi được gọi, hàm mount sẽ tạo một instance của thành phần OWL gốc và gắn nó vào phần tử HTML được chỉ định. Sau đó, thành phần sẽ được hiển thị trên trình duyệt của người dùng.
// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------
mount(Root, document.body, {dev: true});

// Đã xảy ra rất nhiều thứ ở đây:
//     Đầu tiên, chúng ta có một thành phần con Task, được định nghĩa ở đầu tệp,
//     khi chúng ta định nghĩa một thành phần con, nó cần được thêm vào khóa components tĩnh của thành phần cha của nó, để Owl có thể có một tham chiếu đến nó,
//     thành phần con Task có một khóa props: điều này chỉ hữu ích cho mục đích xác nhận. Nó nói rằng mỗi Task phải được cung cấp chính xác một prop, có tên là task. Nếu điều này không xảy ra, Owl sẽ ném ra một lỗi. Điều này rất hữu ích khi tái cấu trúc các thành phần
//     cuối cùng, để kích hoạt xác nhận props, chúng ta cần đặt chế độ của Owl thành dev. Điều này được thực hiện trong đối số cuối cùng của hàm mount. Lưu ý rằng điều này nên được loại bỏ khi ứng dụng được sử dụng trong một môi trường sản xuất thực tế, vì chế độ dev sẽ chậm hơn một chút do các kiểm tra và xác nhận thêm.