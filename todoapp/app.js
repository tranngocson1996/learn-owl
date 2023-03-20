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

// reactive: là một hàm trong Owl, được sử dụng để tạo ra một đối tượng có tính chất "reactive", tức là khi các thuộc tính của đối tượng này thay đổi, các thành phần liên quan sẽ được tự động cập nhật để hiển thị các thay đổi này.
// useEnv: là một hook trong Owl, được sử dụng để truy cập đối tượng môi trường hiện tại của ứng dụng. Đối tượng này chứa các biến và phương thức được định nghĩa bởi ứng dụng, và có thể được sử dụng để chia sẻ dữ liệu giữa các thành phần.
const { Component, mount, xml, useRef, onMounted, useState, reactive, useEnv } = owl;

// Đây là một hàm useStore trong Owl, được sử dụng để truy cập đến đối tượng store trong đối tượng môi trường của ứng dụng.
// Trong đó, ta sử dụng hook useEnv để lấy đối tượng môi trường hiện tại của ứng dụng, và truy cập đến thuộc tính store của đối tượng này bằng cách sử dụng phương thức useState. Sau đó, ta trả về giá trị của thuộc tính store dưới dạng một đối tượng trạng thái của Owl.
// -------------------------------------------------------------------------
// Store
// -------------------------------------------------------------------------
function useStore() {
    const env = useEnv();
    return useState(env.store);
}

// -------------------------------------------------------------------------
// TaskList
// -------------------------------------------------------------------------
class TaskList {
    nextId = 1;
    tasks = [];

    // Đây là hàm khởi tạo của lớp TaskList trong Owl, được sử dụng để khởi tạo một danh sách công việc mới.
    // Trong đó, hàm khởi tạo có nhận đầu vào là một mảng các công việc (tasks). Nếu đầu vào này không được cung cấp, danh sách công việc sẽ được khởi tạo trống.
    // Để tạo ra một danh sách công việc mới, hàm khởi tạo này sử dụng thuộc tính tasks để lưu trữ các công việc trong một mảng. Nếu đầu vào tasks được cung cấp, các công việc này sẽ được thêm vào mảng this.tasks.
    // Sau đó, hàm khởi tạo tính toán một nextId để sử dụng cho việc thêm các công việc mới vào danh sách. Để tính toán nextId, hàm sử dụng phương thức map để tạo ra một mảng các ID của các công việc hiện có trong this.tasks. Sau đó, hàm sử dụng Math.max để tìm ra ID lớn nhất trong mảng này, và tăng giá trị này lên 1 để tạo ra một ID mới cho công việc mới thêm vào. Nếu danh sách công việc là trống, hàm chỉ định nextId là 1.
    constructor(tasks) {
        this.tasks = tasks || [];
        const taskIds = this.tasks.map((t) => t.id);
        this.nextId = taskIds.length ? Math.max(...taskIds) + 1 : 1;
    }

    // Đây là một phương thức addTask trong đối tượng TaskStore của Owl, được sử dụng để thêm một công việc mới vào danh sách công việc.
    // Trong đó, phương thức addTask nhận đối số text, và trước khi thêm công việc mới vào danh sách, phương thức sẽ kiểm tra xem text có chứa ký tự trắng hay không và text có khác rỗng hay không. Nếu text hợp lệ, phương thức sẽ tạo ra một đối tượng task với các thuộc tính id, text, và isCompleted, và thêm đối tượng này vào danh sách công việc tasks trong đối tượng TaskStore.
    // Thuộc tính id của đối tượng task sẽ được tăng lên mỗi khi một công việc mới được thêm vào danh sách. Thuộc tính text của đối tượng task sẽ được gán bằng giá trị của đối số text. Thuộc tính isCompleted của đối tượng task sẽ được gán là false để đánh dấu công việc mới này chưa hoàn thành.
    addTask(text) {
        text = text.trim();
        if (text) {
            const task = {
                id: this.nextId++,
                text: text,
                isCompleted: false,
            };
            this.tasks.push(task);
        }
    }
  
    toggleTask(task) {
        task.isCompleted = !task.isCompleted;
    }

    // Đây là một phương thức deleteTask trong đối tượng TaskStore của Owl, được sử dụng để xóa một công việc khỏi danh sách công việc.
    // Trong đó, phương thức deleteTask nhận đối số task, là một đối tượng công việc cần được xóa khỏi danh sách. Đầu tiên, phương thức sử dụng phương thức findIndex để tìm chỉ mục của đối tượng công việc này trong danh sách công việc tasks của đối tượng TaskStore. Điều này được thực hiện bằng cách so sánh thuộc tính id của công việc cần xóa với thuộc tính id của mỗi đối tượng công việc trong danh sách.
    // Sau đó, phương thức sử dụng phương thức splice để xóa đối tượng công việc này khỏi danh sách công việc tasks. Đối số đầu tiên của phương thức splice là chỉ mục của đối tượng cần xóa, và đối số thứ hai là số lượng phần tử cần xóa.
    deleteTask(task) {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        this.tasks.splice(index, 1);
    }
}

// Đây là một hàm được sử dụng để tạo ra một đối tượng taskStore trong Owl, chứa một reactive TaskList và các phương thức để lưu trữ danh sách công việc trong localStorage.
// Đầu tiên, hàm tạo ra một hàm saveTasks, được sử dụng để lưu danh sách công việc hiện tại của taskStore vào localStorage. Hàm này sử dụng phương thức setItem của localStorage để lưu trữ một chuỗi JSON đại diện cho danh sách công việc.
// Sau đó, hàm sử dụng phương thức getItem của localStorage để lấy danh sách công việc đã lưu từ trước đó. Nếu không có danh sách công việc nào trong localStorage, danh sách được khởi tạo rỗng.
// Tiếp theo, hàm sử dụng reactive để tạo ra một đối tượng taskStore. Đối tượng này chứa một TaskList được khởi tạo với danh sách công việc ban đầu đã lấy từ localStorage. Ngoài ra, đối tượng taskStore cũng chứa một phương thức saveTasks để lưu danh sách công việc vào localStorage khi có thay đổi.
// Sau khi tạo xong taskStore, hàm gọi phương thức saveTasks để lưu danh sách công việc hiện tại vào localStorage. Cuối cùng, hàm trả về đối tượng taskStore.
function createTaskStore() {
    const saveTasks = () => localStorage.setItem("todoapp", JSON.stringify(taskStore.tasks));
    const initialTasks = JSON.parse(localStorage.getItem("todoapp") || "[]");
    const taskStore = reactive(new TaskList(initialTasks), saveTasks);
    saveTasks();
    return taskStore;
}

// -------------------------------------------------------------------------
// Task Component
// -------------------------------------------------------------------------
// Đây là một đoạn mã HTML được sử dụng trong Owl để tạo ra một checkbox và một nhãn cho một công việc trong danh sách công việc.
// Trong đó, phần tử <input> được sử dụng để tạo ra checkbox. Thuộc tính type của phần tử này được đặt là "checkbox" để tạo ra một checkbox. Thuộc tính t-att-checked được sử dụng để ràng buộc trạng thái checked của checkbox với thuộc tính isCompleted của công việc được truyền vào thông qua props. Nếu isCompleted của công việc là true, checkbox sẽ được check.
// Thuộc tính t-att-id được sử dụng để đặt ID của checkbox bằng ID của công việc được truyền vào thông qua props. Điều này giúp cho checkbox và nhãn tương ứng có thể được liên kết với nhau thông qua thuộc tính for của nhãn.
// Phần tử <label> được sử dụng để tạo ra một nhãn cho công việc. Thuộc tính t-att-for của phần tử này được ràng buộc với ID của checkbox thông qua props. Điều này giúp cho khi người dùng nhấp vào nhãn, checkbox sẽ được chọn.
// Trong cặp thẻ nhãn <t> được sử dụng để hiển thị nội dung của công việc, được lấy từ thuộc tính text của công việc được truyền vào thông qua props.
class Task extends Component {
    static template = xml/* xml */ `
    <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
        <input type="checkbox" t-att-checked="props.task.isCompleted"
        t-att-id="props.task.id"
        t-on-click="() => store.toggleTask(props.task)"/>
        <label t-att-for="props.task.id"><t t-esc="props.task.text"/></label>
        <span class="delete" t-on-click="() => store.deleteTask(props.task)">🗑</span>
    </div>`;

    static props = ["task"];

    setup() {
        this.store = useStore();
    }
}

// -------------------------------------------------------------------------
// Root Component
// -------------------------------------------------------------------------
class Root extends Component {
    static template = xml/* xml */ `
    <div class="todo-app">
        <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
        <div class="task-list">
        <t t-foreach="displayedTasks" t-as="task" t-key="task.id">
            <Task task="task"/>
        </t>
        </div>
        <div class="task-panel" t-if="store.tasks.length">
        <div class="task-counter">
            <t t-esc="displayedTasks.length"/>
            <t t-if="displayedTasks.length lt store.tasks.length">
                / <t t-esc="store.tasks.length"/>
            </t>
            task(s)
        </div>
        <div>
            <span t-foreach="['all', 'active', 'completed']"
            t-as="f" t-key="f"
            t-att-class="{active: filter.value===f}"
            t-on-click="() => this.setFilter(f)"
            t-esc="f"/>
        </div>
        </div>
    </div>`;
    static components = { Task };

    setup() {
        const inputRef = useRef("add-input");
        onMounted(() => inputRef.el.focus());
        this.store = useStore();
        this.filter = useState({ value: "all" });
    }

    get displayedTasks() {
        const tasks = this.store.tasks;
        switch (this.filter.value) {
            case "active": return tasks.filter(t => !t.isCompleted);
            case "completed": return tasks.filter(t => t.isCompleted);
            case "all": return tasks;
        }
    }

    setFilter(filter) {
        this.filter.value = filter;
    }

    addTask(ev) {
        // 13 is keycode for ENTER
        if (ev.keyCode === 13) {
        this.store.addTask(ev.target.value);
        ev.target.value = "";
        }
    }
}

// Đoạn code mount(Root, document.body); được sử dụng để gắn một thành phần OWL gốc (root component) vào thân của tài liệu HTML.
// Tham số đầu tiên (Root) là tên của thành phần OWL gốc, tham số thứ hai (document.body) là phần tử HTML nơi thành phần OWL sẽ được gắn vào.
// Khi được gọi, hàm mount sẽ tạo một instance của thành phần OWL gốc và gắn nó vào phần tử HTML được chỉ định. Sau đó, thành phần sẽ được hiển thị trên trình duyệt của người dùng.
// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------
const env = {
    store: createTaskStore(),
};
mount(Root, document.body, { dev: true, env });

// Đã xảy ra rất nhiều thứ ở đây:
//     Đầu tiên, chúng ta có một thành phần con Task, được định nghĩa ở đầu tệp,
//     khi chúng ta định nghĩa một thành phần con, nó cần được thêm vào khóa components tĩnh của thành phần cha của nó, để Owl có thể có một tham chiếu đến nó,
//     thành phần con Task có một khóa props: điều này chỉ hữu ích cho mục đích xác nhận. Nó nói rằng mỗi Task phải được cung cấp chính xác một prop, có tên là task. Nếu điều này không xảy ra, Owl sẽ ném ra một lỗi. Điều này rất hữu ích khi tái cấu trúc các thành phần
//     cuối cùng, để kích hoạt xác nhận props, chúng ta cần đặt chế độ của Owl thành dev. Điều này được thực hiện trong đối số cuối cùng của hàm mount. Lưu ý rằng điều này nên được loại bỏ khi ứng dụng được sử dụng trong một môi trường sản xuất thực tế, vì chế độ dev sẽ chậm hơn một chút do các kiểm tra và xác nhận thêm.
