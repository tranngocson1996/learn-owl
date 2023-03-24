//OVERVIEW
// Mặc định, mỗi khi xảy ra lỗi trong quá trình render của một ứng dụng Owl, chúng tôi sẽ hủy bỏ toàn bộ ứng dụng. Nếu không, chúng tôi không thể đưa ra bất kỳ sự đảm bảo nào về trạng thái của cây thành phần kết quả. Nó có thể bị hỏng một cách hy vọng, nhưng không có bất kỳ phản hồi nào cho người dùng.
// Rõ ràng, việc hủy bỏ ứng dụng thường là hơi cực đoan. Đây là lý do tại sao chúng ta cần một cơ chế để xử lý các lỗi render (và các lỗi từ các lifecycle hooks): hook onError.
// Ý tưởng chính là hook onError đăng ký một hàm sẽ được gọi với lỗi. Hàm này cần xử lý tình huống, phần lớn thời gian bằng cách cập nhật một số trạng thái và render lại chính nó, để ứng dụng có thể trở lại trạng thái bình thường.

// MANAGING ERRORS
// Mỗi khi hook lifecycle onError được sử dụng, tất cả các lỗi xuất hiện trong quá trình render của các thành phần con và/hoặc cuộc gọi phương thức lifecycle sẽ được bắt và truyền cho phương thức onError. Điều này cho phép chúng ta xử lý lỗi một cách đúng đắn và không làm hỏng ứng dụng.

// Có những điều quan trọng cần biết:
//     Nếu một lỗi đã xảy ra trong vòng đời render nội bộ không được bắt, thì Owl sẽ hủy bỏ toàn bộ ứng dụng. Điều này được thực hiện một cách cố ý, vì Owl không thể đảm bảo rằng trạng thái không bị hỏng từ điểm này trở đi.
//     Các lỗi xuất hiện từ các event handler KHÔNG được quản lý bởi onError hoặc bất kỳ cơ chế Owl nào khác. Việc này nằm trong trách nhiệm của nhà phát triển ứng dụng để khôi phục lại một lỗi một cách đúng đắn.
//     Nếu một trình xử lý lỗi không thể xử lý một lỗi một cách đúng đắn, nó có thể đưa ra một lỗi mới và Owl sẽ cố gắng tìm kiếm một trình xử lý lỗi khác trên cây thành phần.

// EXAMPLE
// Ví dụ, đây là cách chúng ta có thể triển khai một thành phần chung ErrorBoundary, hiển thị nội dung của nó và một phần thay thế nếu xảy ra lỗi.
// class ErrorBoundary extends Component {
//     static template = xml`
//     <t t-if="error" t-slot="fallback">An error occurred</t>
//     <t t-else="" t-slot="content"`;

//     setup() {
//         this.state = useState({ error: false });
//         onError(() => (this.state.error = true));
//     }
// }
// Trong ví dụ này, chúng ta định nghĩa một lớp ErrorBoundary kế thừa từ lớp Component của Owl. Chúng ta sử dụng thuộc tính template để định nghĩa giao diện của thành phần.
// Trong template, chúng ta sử dụng các thẻ t-if và t-else để xác định xem nội dung của thành phần sẽ hiển thị hoặc phần thay thế nếu có lỗi. Chúng ta sử dụng t-slot để đặt tên cho các phần của template để chúng ta có thể sử dụng chúng trong các thành phần con của ErrorBoundary.
// Trong phương thức setup, chúng ta sử dụng hook useState để khởi tạo trạng thái của thành phần. Chúng ta cũng sử dụng hook onError để đăng ký một hàm sẽ được gọi khi có lỗi xảy ra trong quá trình render của thành phần hoặc các lifecycle hooks.
// Trong hàm onError, chúng ta cập nhật trạng thái của thành phần với lỗi đó bằng cách đặt giá trị của error thành true.
// Cuối cùng, chúng ta sử dụng slot để cho phép các thành phần con của ErrorBoundary được hiển thị trong phần nội dung của template.

// Sử dụng ErrorBoundary rất đơn giản như sau:
// <ErrorBoundary>
//   <SomeOtherComponent/>
//   <t t-set-slot="fallback">Some specific error message</t>
// </ErrorBoundary>
// Ở đây, chúng ta chỉ cần bọc các thành phần con của ErrorBoundary trong thẻ và định nghĩa một phần thay thế (fallback) trong trường hợp có lỗi. Chúng ta sử dụng t-set-slot để đặt tên cho phần thay thế và đặt nội dung của nó bằng cách sử dụng thẻ t.
// Chúng ta cần chú ý rằng phần thay thế UI không được ném bất kỳ lỗi nào, nếu không chúng ta có nguy cơ rơi vào một vòng lặp vô tận (đồng thời, xem trang về slots để biết thêm thông tin về chỉ thị t-slot).
