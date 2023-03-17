// Đoạn mã này đang nhập ba đối tượng từ thư viện OWL: Component, mount và xml.
// Component là một lớp có thể được mở rộng để tạo ra các thành phần tùy chỉnh trong OWL.
// mount là một hàm được sử dụng để gắn một thành phần vào DOM.
// xml là một hàm được sử dụng để tạo các phần tử XML trong các mẫu OWL.
const { Component, mount, xml } = owl;

// Owl Components
class Root extends Component {

    // Đoạn mã này định nghĩa một mẫu OWL để hiển thị danh sách các công việc (tasks) dưới dạng các phần tử HTML. Mẫu này sử dụng các đặc tính của OWL để tạo ra các phần tử HTML dựa trên các đối tượng trong mảng tasks.
    // Cụ thể, các phần tử HTML được tạo ra bao gồm:
    //     Một phần tử <div> có class là task-list, đại diện cho danh sách các công việc.
    //     Một phần tử <t> được sử dụng để lặp qua các đối tượng trong mảng tasks.
    //     Trong mỗi vòng lặp, một phần tử <div> có class là task được tạo ra, đại diện cho một công việc.
    //     Trong phần tử <div> của mỗi công việc, một phần tử <input> kiểu checkbox được tạo ra, với thuộc tính checked được thiết lập bằng thuộc tính t-att-checked="task.isCompleted", đại diện cho trạng thái hoàn thành của công việc.
    //     Ngoài ra, trong phần tử <div> của mỗi công việc còn có một phần tử <span> chứa nội dung của công việc, được tạo ra bằng cú pháp t-esc="task.text", đại diện cho nội dung của công việc.
    // Trong tổng thể, mẫu OWL này sử dụng các đặc tính của OWL để tạo ra các phần tử HTML dựa trên các đối tượng trong mảng tasks, giúp cho việc hiển thị danh sách các công việc trở nên dễ dàng hơn.
    static template = xml/* xml */ `
    <div class="task-list">
        <t t-foreach="tasks" t-as="task" t-key="task.id">
            <div class="task" t-att-class="task.isCompleted ? 'done' : ''">
                <input type="checkbox" t-att-checked="task.isCompleted"/>
                <span><t t-esc="task.text"/></span>
            </div>
        </t>
    </div>`;
    // Mẫu này chứa một vòng lặp t-foreach để lặp qua các công việc trong mảng tasks. Nó có thể tìm thấy danh sách tasks từ thành phần (component) vì ngữ cảnh (context) của việc render chứa các thuộc tính của thành phần đó. Lưu ý rằng chúng ta sử dụng id của mỗi công việc làm t-key, điều này rất phổ biến. Có hai lớp css: task-list và task, mà chúng ta sẽ sử dụng trong phần tiếp theo.
    // Cuối cùng, hãy chú ý đến việc sử dụng thuộc tính t-att-checked: tiền tố một thuộc tính bằng t-att khiến nó trở thành động. Owl sẽ đánh giá biểu thức và đặt nó làm giá trị của thuộc tính.

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
mount(Root, document.body);