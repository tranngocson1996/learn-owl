// OVERVIEW

// Mỗi ứng dụng Owl có một phần tử gốc, một tập hợp các mẫu, một môi trường và có thể vài cài đặt khác.
// Lớp App là một lớp đơn giản đại diện cho tất cả các yếu tố này. Sau đây là một ví dụ:

// Đoạn code trên sử dụng thư viện Owl để tạo một ứng dụng web. Đầu tiên, nó import các thành phần cần thiết từ Owl, bao gồm lớp Component và lớp App. Tiếp theo, nó khai báo một lớp con MyComponent kế thừa từ lớp Component. Lớp MyComponent này sẽ định nghĩa các phương thức và thuộc tính để tạo giao diện người dùng cho ứng dụng.
// Sau đó, đoạn code tạo một thể hiện của lớp App, với lớp MyComponent làm tham số đầu tiên và một đối tượng cấu hình làm tham số thứ hai. Cấu hình này bao gồm các thuộc tính props và templates, đại diện cho các thuộc tính và mẫu HTML của ứng dụng.
// Cuối cùng, đoạn code gắn ứng dụng vào thẻ body của trang web bằng cách gọi phương thức mount() và truyền tham số là đối tượng document.body.

// const {Component, App } = owl;

// class MyComponent extends Component { ... }

// const app = new App(MyComponent, { props: {...}, templates: "..."});
// app.mount(document.body);

// API

// Hàm constructor(Root[, config]) nhận vào một lớp component (không phải một thể hiện của lớp component) làm đối số đầu tiên và đối tượng cấu hình tùy chọn làm đối số thứ hai (xem bên dưới).
// Phương thức mount(target, options) nhận vào một phần tử HTML làm đối số đầu tiên và một đối tượng tùy chọn với các tùy chọn gắn kết (xem bên dưới) làm đối số thứ hai. Gắn ứng dụng vào một mục tiêu trong DOM. Lưu ý rằng đây là một hoạt động không đồng bộ: phương thức mount trả về một promise (hứa) trả về một thể hiện của thành phần khi nó hoàn thành
// Đối tượng option là một đối tượng với các khóa sau:
// position (string): first-child hoặc last-child. Tùy chọn này xác định vị trí của ứng dụng trong mục tiêu: là con đầu tiên hay con cuối cùng.

// Phương thức destroy(): hủy bỏ ứng dụng.

// CONFIGURATION

// Đối tượng config là một đối tượng tùy chọn có thể được truyền vào hàm tạo ứng dụng Owl. Nó cho phép bạn cấu hình các khía cạnh khác nhau của ứng dụng, chẳng hạn như môi trường, props và cài đặt dịch.
// Thuộc tính env là một đối tượng chứa các biến môi trường được chia sẻ trên tất cả các thành phần trong ứng dụng. Chúng có thể được truy cập bằng cách sử dụng thuộc tính env trên thể hiện của thành phần.
// Thuộc tính props là một đối tượng chứa các props được truyền vào cho thành phần gốc của ứng dụng.
// Thuộc tính dev là một boolean xác định liệu ứng dụng có đang chạy ở chế độ phát triển hay không. Nếu đặt là true, ứng dụng sẽ hiển thị thông tin gỡ lỗi và thông báo lỗi.
// Thuộc tính test tương tự như dev, nhưng được sử dụng đặc biệt cho mục đích kiểm tra. Nếu đặt là true, Owl sẽ không ghi lại thông báo cảnh báo rằng Owl đang ở chế độ phát triển.
// Thuộc tính translatableAttributes là một mảng các tên thuộc tính phải được dịch. Những thuộc tính này sẽ được truyền vào hàm translateFn để dịch.
// Thuộc tính translateFn là một hàm sẽ được gọi bởi Owl để dịch các mẫu. Hàm này nên nhận một chuỗi hoặc tài liệu XML làm đầu vào và trả về một chuỗi hoặc tài liệu đã được dịch.
// Thuộc tính templates là một chuỗi hoặc tài liệu XML chứa tất cả các mẫu sẽ được sử dụng bởi các thành phần được tạo ra bởi ứng dụng.
// Cuối cùng, thuộc tính warnIfNoStaticProps là một boolean xác định liệu Owl có nên ghi lại cảnh báo mỗi khi nó gặp một thành phần không cung cấp mô tả props tĩnh hay không. Điều này hữu ích để phát hiện các vấn đề tiềm ẩn sớm trong quá trình phát triển.
// The config object is an object with some of the following keys:

// env (object): if given, this will be the shared env given to each component
// props (object): the props given to the root component
// dev (boolean, default=false): if true, the application is rendered in dev mode;
// test (boolean, default=false): test mode is the same as dev mode, except that Owl will not log a message to warn that Owl is in dev mode.
// translatableAttributes (string[]): a list of additional attributes that should be translated (see translations)
// translateFn (function): a function that will be called by owl to translate templates (see translations)
// templates (string | xml document): all the templates that will be used by the components created by the application.
// warnIfNoStaticProps (boolean, default=false): if true, Owl will log a warning whenever it encounters a component that does not provide a static props description.

// `mount` HELPER
// const { mount, Component } = owl;

// class MyComponent extends Component {
//     ...
// }

// mount(MyComponent, document.body, { props: {...}, templates: "..."});

// mount(Component, target, config) với các đối số sau:

// Component: một lớp thành phần (thành phần gốc của ứng dụng)
// target: một phần tử HTML, nơi thành phần sẽ được gắn vào như là con cuối cùng
// config (tùy chọn): một đối tượng cấu hình (tương tự như đối tượng cấu hình ứng dụng)
// Hầu hết thời gian, trợ lý mount sẽ thuận tiện hơn, nhưng khi cần một tham chiếu đến ứng dụng Owl thực tế, thì sử dụng lớp App trực tiếp là có thể.

// LOADING TEMPLATES

// Trong ví dụ này, ta sử dụng Owl để tải các mẫu từ một điểm cuối và gắn một thành phần gốc Root vào phần tử body của tài liệu HTML.
// Đầu tiên, ta nhập hai trợ lý của Owl, loadFile và mount.
// Sau đó, ta định nghĩa một hàm setup làm hàm chính của ứng dụng. Hàm này được đánh dấu là async để ta có thể sử dụng await khi tải các mẫu.
// Trong hàm setup, ta sử dụng loadFile để tải các mẫu từ một điểm cuối bất đồng bộ. Sau khi các mẫu được tải, ta khởi tạo một đối tượng env chứa các biến môi trường, bao gồm một hàm dịch someTranslateFn, các mẫu đã tải và có thể là các thành phần khác.
// Cuối cùng, ta sử dụng hàm mount của Owl để gắn một thể hiện của lớp Root vào phần tử body của tài liệu HTML, với đối số env được truyền vào trong đối tượng cấu hình.
// Với cách làm này, khi trang web được tải, một thể hiện của Root sẽ được tạo ra và gắn vào phần tử body của tài liệu HTML, với biến môi trường và các mẫu được cung cấp trong đối tượng env.

// in the main js file:
// const { loadFile, mount } = owl;

// async, so we can use async/await
// (async function setup() {
//   const templates = await loadFile(`/some/endpoint/that/return/templates`);
//   const env = {
//     _t: someTranslateFn,
//     templates,
      // possibly other stuff
//   };

//   mount(Root, document.body, { env });
// })();
