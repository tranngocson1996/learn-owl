// Đây là khai báo các biến và phương thức được sử dụng trong Owl.
// Component: đây là lớp cơ sở cho tất cả các thành phần (component) trong Owl. Nó chứa các phương thức và thuộc tính cơ bản cho việc định nghĩa một thành phần, như render, setup, props, template, components,...
// mount: phương thức này được sử dụng để kết nối một thể hiện Owl với một phần tử trong DOM. Nó nhận vào một tham số là một phần tử HTML, và một tham số tùy chọn là một đối tượng chứa các thuộc tính cấu hình cho thể hiện Owl.
// xml: phương thức này được sử dụng để biến đổi một chuỗi XML thành một đối tượng DOM. Nó được sử dụng trong các thành phần Owl để tạo ra các phần tử HTML mà không cần viết bằng tay.
// useRef: phương thức này được sử dụng để tạo ra một tham chiếu đến một phần tử HTML bất kỳ trong DOM. Tham chiếu này có thể được sử dụng để lấy giá trị của phần tử, hoặc để cập nhật nội dung của phần tử khi cần thiết.
// onMounted: phương thức này được sử dụng để đăng ký một hàm được gọi khi thành phần được gắn vào DOM. Nó thường được sử dụng để thực hiện các thao tác khởi tạo hoặc tải dữ liệu cho thành phần.
const { Component, mount, xml, useRef, onMounted } = owl;

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
    // Đây là một phần tử HTML input. Thuộc tính placeholder được sử dụng để hiển thị một dòng chữ mờ trong input, nhắc nhở người dùng về mục đích của input. Trong trường hợp này, nó là "Nhập một công việc mới".
    // Thuộc tính t-on-keyup được sử dụng để gọi một phương thức trong thể hiện Owl khi người dùng gõ một phím trên bàn phím khi focus đang ở trên input. Trong trường hợp này, phương thức addTask được gọi.
    // Có thêm một thuộc tính mới là t-ref với giá trị là "add-input".
    // Thuộc tính t-ref được sử dụng để đặt một tham chiếu đến phần tử HTML trong thể hiện Owl. Trong trường hợp này, tham chiếu được đặt tên là "add-input". Tham chiếu này có thể được sử dụng trong phương thức addTask để lấy giá trị của input và xóa nội dung của nó sau khi một công việc mới được thêm vào danh sách.
    static template = xml /* xml */`
        <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
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

    // Đây là phương thức setup trong một thành phần Owl. Phương thức này được sử dụng để thực hiện các thao tác khởi tạo và cấu hình cho thành phần.
    // Trong phương thức này, đầu tiên ta sử dụng phương thức useRef để tạo một tham chiếu đến phần tử input có tên là "add-input". Tham chiếu này được lưu trữ trong biến inputRef.
    // Sau đó, ta sử dụng phương thức onMounted để đăng ký một hàm được gọi khi thành phần được gắn vào DOM. Trong hàm này, ta sử dụng thuộc tính el của tham chiếu inputRef để truy cập đến phần tử input trong DOM, và gọi phương thức focus() để đưa focus về phần tử đó, giúp người dùng có thể nhập dữ liệu vào input một cách thuận tiện hơn.
    // Vì phương thức setup cần phải trả về một đối tượng chứa các thuộc tính và các phương thức được sử dụng trong thành phần, do đó cần phải thêm return {} cuối cùng của phương thức này.
    setup() {
        const inputRef = useRef("add-input");
        onMounted(() => inputRef.el.focus());
    }

    // Đây là phương thức addTask trong thể hiện Owl. Nó nhận một tham số ev, là một đối tượng sự kiện. Khi người dùng gõ một phím trên input, đối tượng sự kiện này được truyền vào phương thức.
    // Phương thức addTask đầu tiên kiểm tra xem người dùng đã nhấn phím Enter hay chưa. Nếu đúng, nó lấy giá trị của input, sử dụng phương thức trim() để loại bỏ khoảng trắng đầu và cuối chuỗi, sau đó gán giá trị rỗng cho input để xóa nội dung của input.
    // Cuối cùng, phương thức in ra một thông báo console và không có gì được thực hiện bên trong khối todo. Các công việc liên quan đến thêm một công việc mới vào danh sách sẽ được thêm trong khối này.
    addTask(ev) {
        // 13 is keycode for ENTER
        if (ev.keyCode === 13) {
            const text = ev.target.value.trim();
            ev.target.value = "";
            console.log('adding task', text);
            // todo
        }
    }
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
