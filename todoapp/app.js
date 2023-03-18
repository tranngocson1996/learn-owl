// Đây là khai báo các biến và phương thức được sử dụng trong Owl.
// Component: đây là lớp cơ sở cho tất cả các thành phần (component) trong Owl. Nó chứa các phương thức và thuộc tính cơ bản cho việc định nghĩa một thành phần, như render, setup, props, template, components,...
// mount: phương thức này được sử dụng để kết nối một thể hiện Owl với một phần tử trong DOM. Nó nhận vào một tham số là một phần tử HTML, và một tham số tùy chọn là một đối tượng chứa các thuộc tính cấu hình cho thể hiện Owl.
// xml: phương thức này được sử dụng để biến đổi một chuỗi XML thành một đối tượng DOM. Nó được sử dụng trong các thành phần Owl để tạo ra các phần tử HTML mà không cần viết bằng tay.
// useRef: phương thức này được sử dụng để tạo ra một tham chiếu đến một phần tử HTML bất kỳ trong DOM. Tham chiếu này có thể được sử dụng để lấy giá trị của phần tử, hoặc để cập nhật nội dung của phần tử khi cần thiết.
// onMounted: phương thức này được sử dụng để đăng ký một hàm được gọi khi thành phần được gắn vào DOM. Nó thường được sử dụng để thực hiện các thao tác khởi tạo hoặc tải dữ liệu cho thành phần.
// Tuy nhiên, trong đó có thêm phương thức useState, được sử dụng để lưu trữ trạng thái của một thành phần. Khi trạng thái thay đổi, thành phần sẽ được render lại để hiển thị các thay đổi này.

// Cụ thể, phương thức useState nhận vào một giá trị khởi tạo cho trạng thái, và trả về một mảng gồm hai phần tử. Phần tử đầu tiên là giá trị hiện tại của trạng thái, phần tử thứ hai là một hàm để cập nhật giá trị của trạng thái. Khi hàm này được gọi, trạng thái sẽ được cập nhật và thành phần sẽ được render lại.
// Ví dụ:
// const [count, setCount] = useState(0);
// Ở đây, giá trị khởi tạo cho trạng thái là 0. Biến count sẽ chứa giá trị hiện tại của trạng thái, và biến setCount sẽ là hàm để cập nhật giá trị của trạng thái.
// Khi muốn cập nhật giá trị của trạng thái, ta gọi hàm setCount và truyền vào giá trị mới:
// setCount(count + 1);
const { Component, mount, xml, useRef, onMounted, useState } = owl;

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

    nextId = 1;
    // Đây là khai báo biến tasks trong Owl, sử dụng phương thức useState để lưu trữ trạng thái của mảng các công việc.
    // Trong đó, giá trị khởi tạo cho trạng thái của tasks là một mảng rỗng, được truyền vào hàm useState. Khi thành phần được render lần đầu tiên, tasks sẽ có giá trị ban đầu là một mảng rỗng.
    // Sau đó, khi có thay đổi về mảng tasks, ta sẽ gọi hàm được trả về bởi useState để cập nhật giá trị của tasks. Hàm này sẽ cập nhật giá trị của mảng tasks và kích hoạt việc render lại của thành phần để hiển thị các thay đổi này.
    tasks = useState([]);

    // Đây là phương thức setup trong một thành phần Owl. Phương thức này được sử dụng để thực hiện các thao tác khởi tạo và cấu hình cho thành phần.
    // Trong phương thức này, đầu tiên ta sử dụng phương thức useRef để tạo một tham chiếu đến phần tử input có tên là "add-input". Tham chiếu này được lưu trữ trong biến inputRef.
    // Sau đó, ta sử dụng phương thức onMounted để đăng ký một hàm được gọi khi thành phần được gắn vào DOM. Trong hàm này, ta sử dụng thuộc tính el của tham chiếu inputRef để truy cập đến phần tử input trong DOM, và gọi phương thức focus() để đưa focus về phần tử đó, giúp người dùng có thể nhập dữ liệu vào input một cách thuận tiện hơn.
    // Vì phương thức setup cần phải trả về một đối tượng chứa các thuộc tính và các phương thức được sử dụng trong thành phần, do đó cần phải thêm return {} cuối cùng của phương thức này.
    setup() {
        const inputRef = useRef("add-input");
        onMounted(() => inputRef.el.focus());
    }

    // Đây là phương thức addTask trong Owl. Phương thức này được gọi khi người dùng nhấn phím Enter trên input để thêm một công việc mới vào danh sách.
    // Trong phương thức này, đầu tiên ta kiểm tra xem người dùng đã nhấn phím Enter hay chưa. Nếu đã nhấn phím Enter (mã phím là 13), ta lấy giá trị của input và sử dụng phương thức trim() để loại bỏ các khoảng trắng ở đầu và cuối chuỗi. Sau đó, ta gán giá trị rỗng cho input để xóa nội dung của input.
    // Tiếp theo, ta kiểm tra xem giá trị của input sau khi đã được loại bỏ khoảng trắng có rỗng hay không. Nếu không rỗng, ta tạo một công việc mới với các thuộc tính id, text, isCompleted, và thêm công việc mới này vào mảng tasks bằng phương thức push().
    // Lưu ý rằng trong phương thức này, ta sử dụng thuộc tính nextId và tasks của đối tượng this. Đối tượng này tham chiếu đến đối tượng hiện tại của thành phần, cho phép ta truy cập và cập nhật các thuộc tính và phương thức của thành phần trong phương thức này.
    addTask(ev) {
        // 13 is keycode for ENTER
        if (ev.keyCode === 13) {
            const text = ev.target.value.trim();
            ev.target.value = "";
            if (text) {
                const newTask = {
                    id: this.nextId++,
                    text: text,
                    isCompleted: false,
                };
                this.tasks.push(newTask);
            }
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
