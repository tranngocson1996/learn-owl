// CONTENT
//     whenReady: là một hàm trong JavaScript, được sử dụng để thực thi mã khi DOM đã sẵn sàng. DOM là viết tắt của Document Object Model, đại diện cho cấu trúc của tài liệu HTML. Khi trang web được tải, DOM sẽ được tạo ra, và whenReady sẽ giúp bạn thực thi mã JavaScript sau khi DOM được tạo.
//     loadFile: là một hàm trong JavaScript được sử dụng để tải một tệp tin từ máy chủ và sử dụng nó trong mã JavaScript. Hàm này thường được sử dụng để tải các mẫu HTML hoặc các tệp tin khác nhau như hình ảnh, video, tệp JavaScript, v.v.
//     EventBus: là một khái niệm trong lập trình để định nghĩa một đối tượng cho phép các thành phần khác trong ứng dụng có thể tương tác với nhau thông qua các sự kiện. EventBus thường được sử dụng để quản lý các tương tác giữa các thành phần trong ứng dụng, giúp tăng tính linh hoạt và dễ bảo trì.
//     validate: là một hàm trong JavaScript được sử dụng để kiểm tra tính hợp lệ của dữ liệu. Hàm này thường được sử dụng trong các biểu mẫu web để đảm bảo rằng người dùng đã nhập đầy đủ thông tin và đúng định dạng. Hàm validate thường được gọi khi người dùng bấm nút "Gửi" để đảm bảo rằng dữ liệu được gửi đi là hợp lệ.

// WHENREADY
// Đúng rồi, hàm whenReady trong thư viện Owl là một hàm trả về Promise. Nếu DOM đã sẵn sàng (tức là trình duyệt đã tải xong toàn bộ tài liệu HTML và đã tạo ra cây DOM), thì Promise sẽ được giải quyết ngay lập tức. Nếu DOM chưa sẵn sàng, Promise sẽ được giải quyết khi DOM hoàn tất.
// Bạn có thể sử dụng hàm await để đợi cho đến khi Promise được giải quyết, sau đó thực thi mã của mình. Hoặc bạn có thể gọi hàm whenReady với một hàm callback làm đối số, và nó sẽ được thực thi ngay khi DOM được sẵn sàng.
// Ví dụ, nếu bạn muốn thực thi một mã JavaScript sau khi DOM được tải hoàn toàn, bạn có thể sử dụng hàm như sau:
// const { whenReady } = owl;
// async function myFunction() {
//   await whenReady(); // chờ cho đến khi DOM được tải hoàn toàn
  // Thực thi mã của bạn
// }
// Hoặc nếu bạn muốn thực thi một hàm callback khi DOM được tải hoàn toàn, bạn có thể sử dụng hàm như sau:
// const { whenReady } = owl;
// whenReady(function () {
  // Thực thi hàm callback của bạn khi DOM được tải hoàn toàn
// })

// LOADFILE
// Đúng rồi, hàm loadFile trong thư viện Owl là một hàm trợ giúp để tải một tệp tin từ máy chủ. Hàm này thực hiện một yêu cầu GET (yêu cầu lấy dữ liệu từ máy chủ) và trả về chuỗi kết quả bằng một Promise.
// Hàm loadFile thường được sử dụng để tải các tệp tin như mẫu HTML hoặc CSS từ máy chủ. Sau khi tệp tin được tải về, bạn có thể sử dụng nó để tạo một môi trường làm việc (như đối tượng DOM) hoặc để thực hiện các thao tác khác trên nó.
// Ví dụ, nếu bạn muốn tải một tệp tin HTML để sử dụng như một mẫu, bạn có thể sử dụng hàm như sau:
// const { loadFile } = owl;
// async function makeEnv() {
//   const templates = await loadFile("templates.xml");
  // do something
// }

// EVENTBUS
// Đó là một EventBus đơn giản, với cùng API như các phần tử DOM thông thường, và một phương thức kích hoạt bổ sung để phát sự kiện.
// const bus = new EventBus();
// bus.addEventListener("event", () => console.log("something happened"));
// bus.trigger("event"); // 'something happened' is logged

// VALIDATE
// Hàm validate là một hàm kiểm tra tính hợp lệ của một đối tượng đã cho so với một schema được chỉ định. Thực tế, nó được sử dụng bởi Owl để thực hiện kiểm tra tính hợp lệ của props. Ví dụ:
// validate(
//   { a: "hey" },
//   {
//     id: Number,
//     url: [Boolean, { type: Array, element: Number }],
//   }
// );
// throws an error with the following information:
//    - unknown key 'a',
//    - 'id' is missing (should be a number),
//    - 'url' is missing (should be a boolean or list of numbers),
