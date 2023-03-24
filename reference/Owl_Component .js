// OVERVIEW
// Một thành phần Owl là một lớp nhỏ đại diện cho một phần của giao diện người dùng. Nó là một phần của một cây thành phần và có một môi trường (env), được truyền từ cha đến con.
// Mỗi thành phần có một phương thức render để tạo ra một chuỗi HTML hoặc một cây thành phần con. Nó có thể có các thuộc tính và phương thức của riêng nó, và có thể nhận các đối số được truyền vào từ thành phần cha thông qua props.
// Khi một thành phần được gắn vào trang web, nó sẽ được tạo ra và gắn vào cây thành phần, với môi trường được truyền từ thành phần cha xuống. Môi trường này bao gồm các biến và hàm được sử dụng để hiển thị và xử lý dữ liệu.
// Khi một thành phần được cập nhật, nó sẽ tạo ra một phiên bản mới của chính nó với các props và môi trường mới, và Owl sẽ sử dụng phương thức so sánh để xác định xem liệu cây thành phần có cần được cập nhật hay không. Nếu cập nhật được cho là cần thiết, Owl sẽ tạo ra một phiên bản mới của cây thành phần và gắn nó vào trang web, thay thế phiên bản cũ.

// PROPERTIES AND METHODS
// Component là một lớp có API rất nhỏ. Nó bao gồm các thuộc tính và phương thức sau:
// env (object): môi trường của thành phần
// props (object): đây là một đối tượng chứa tất cả các props được cho bởi cha đến một thành phần con. Lưu ý rằng props thuộc về cha, không thuộc về thành phần, và không nên được sửa đổi bởi thành phần (ngoại trừ bạn có nguy cơ gây ra tác động bất ngờ, vì cha có thể không nhận thức được thay đổi). Props có thể được sửa đổi động bởi cha, và trong trường hợp đó thành phần sẽ đi qua các phương thức sinh trình sau: willUpdateProps, willPatch và patched.
// Ba phương thức sinh trình willUpdateProps, willPatch và patched được gọi khi thành phần cha sửa đổi props động.
// willUpdateProps được gọi trước khi props được cập nhật, cho phép thành phần thực hiện bất kỳ thao tác nào cần thiết trước khi props thay đổi.
// willPatch được gọi sau khi props được cập nhật, cho phép thành phần truy cập vào các props mới và thực hiện bất kỳ thao tác nào cần thiết.
// patched được gọi sau khi thành phần đã được render lại, cho phép thành phần thực hiện bất kỳ thao tác nào cần thiết sau khi render lại.
// render(deep[=false]): gọi phương thức này trực tiếp sẽ gây ra một lần render lại. Lưu ý rằng với hệ thống tính cảm ứng, điều này nên rất hiếm khi phải làm nó bằng tay. Thao tác render là bất đồng bộ, nên DOM sẽ chỉ được cập nhật một chút sau đó (tại khung hình hoạt ảnh tiếp theo, nếu không có thành phần nào làm chậm việc render). Mặc định, render bắt đầu bởi phương thức này sẽ dừng lại ở mỗi thành phần con nếu props của họ (shallow) bằng nhau. Để ép buộc một render để cập nhật tất cả các thành phần con, bạn có thể sử dụng tham số deep tùy chọn. Lưu ý rằng giá trị của tham số deep phải là một boolean, không phải là một

// STATIC PROPERTIES
// template (string): đây là tên của template sẽ render thành phần. Lưu ý rằng có một trợ giúp xml để dễ dàng định nghĩa một template nội bộ

// components (object, optional): nếu có, đây là một đối tượng chứa các lớp của bất kỳ thành phần con nào cần thiết bởi template.
// Trong trường hợp này, lớp cha ParentComponent đã được khai báo với thuộc tính components là một đối tượng chứa lớp con SubComponent. Nó sẽ được sử dụng bởi template để render thành phần con SubComponent.
// class ParentComponent extends owl.Component {
//     static components = { SubComponent };
// }

// props (object, optional): nếu có, đây là một đối tượng mô tả kiểu và hình dạng của (thực sự) props được cung cấp cho thành phần. Nếu chế độ Owl là dev, nó sẽ được sử dụng để xác nhận các props mỗi lần thành phần được tạo/cập nhật. Xem Xác nhận Props để biết thêm thông tin.
// class Counter extends owl.Component {
//     static props = {
//         initialValue: Number,
//         optional: true,
//     };
// }

// defaultProps (object, optional): nếu có, đối tượng này xác định các giá trị mặc định cho các props (top-level). Mỗi khi props được cung cấp cho đối tượng, chúng sẽ được thay đổi để thêm giá trị mặc định (nếu thiếu). Lưu ý rằng nó không thay đổi đối tượng ban đầu, một đối tượng mới sẽ được tạo thay thế. Xem các props mặc định để biết thêm thông tin.
// class Counter extends owl.Component {
//     static defaultProps = {
//         initialValue: 0,
//     };
// }

// LIFECYCLE

// setup: phương thức này được gọi khi một thành phần được tạo. Nó được gọi trước khi phương thức render đầu tiên được gọi. Nó có thể được sử dụng để thực hiện bất kỳ thao tác nào cần thiết trước khi render. Nó có thể trả về một giá trị, nếu có, giá trị này sẽ được gán cho thuộc tính this.env trong phương thức render.
// setup() {
//     useSetupAutofocus();
// }

// willStart là một hook bất đồng bộ có thể được thực hiện để thực hiện một số hành động (trong hầu hết các trường hợp là bất đồng bộ) trước khi thành phần được render ban đầu.
// Nó sẽ được gọi chính xác một lần trước khi render ban đầu. Nó hữu ích trong một số trường hợp, ví dụ như tải các tài nguyên bên ngoài (chẳng hạn như một thư viện JS) trước khi thành phần được render. Một trường hợp sử dụng khác là tải dữ liệu từ một máy chủ.
// The onWillStart hook được sử dụng để đăng ký một hàm sẽ được thực thi tại thời điểm này:
// setup() {
//     onWillStart(async () => {
//         this.data = await this.loadData()
//     });
// }
// Ở điểm này, thành phần chưa được render. Lưu ý rằng mã willStart chậm sẽ làm chậm việc render giao diện người dùng. Vì vậy, một số biện pháp nên được thực hiện để làm cho phương thức này nhanh nhất có thể.
// Lưu ý rằng nếu có nhiều hơn một callback onWillStart được đăng ký, sau đó chúng sẽ được chạy song song.

// willRender: phương thức này được gọi trước khi một thành phần được render. Nó có thể được sử dụng để thực hiện bất kỳ thao tác nào cần thiết trước khi render. Nó có thể trả về một giá trị, nếu có, giá trị này sẽ được gán cho thuộc tính this.env trong phương thức render.
// setup() {
//     onWillRender(() => {
           // do something
//     });
// }
// willRender hooks được gọi trước khi render các mẫu, trước tiên là các thành phần cha, sau đó là các thành phần con.

// render: phương thức này được gọi để render một thành phần. Nó trả về một đối tượng DOM (hoặc một đối tượng giả) mô tả cấu trúc DOM của thành phần. Nó có thể được gọi nhiều lần, mỗi khi thành phần được cập nhật. Nó có thể trả về một giá trị, nếu có, giá trị này sẽ được gán cho thuộc tính this.env trong phương thức render.
// setup() {
//     onRendered(() => {
            // do something
//     });
// }
// rendered hooks được gọi ngay sau khi render các mẫu, trước tiên là các thành phần cha, sau đó là các thành phần con. Lưu ý rằng tại thời điểm này, DOM thực sự có thể chưa tồn tại (nếu đây là lần render đầu tiên), hoặc chưa được cập nhật. Điều này sẽ được thực hiện trong khung hình tiếp theo ngay lập tức khi tất cả các thành phần đã sẵn sàng.

// mounted: phương thức này được gọi sau khi một thành phần được render đầu tiên. Nó có thể được sử dụng để thực hiện bất kỳ thao tác nào cần thiết sau khi render. Nó có thể trả về một giá trị, nếu có, giá trị này sẽ được gán cho thuộc tính this.env trong phương thức render.
// Đây là một nơi tốt để thêm một số lắng nghe, hoặc tương tác với DOM, nếu thành phần cần thực hiện một số thao tác chẳng hạn.
// Đây là ngược lại của willUnmount. Nếu một thành phần đã được đính kèm, nó sẽ luôn bị gỡ bỏ tại một thời điểm trong tương lai.
// Phương thức mounted sẽ được gọi đệ quy trên mỗi trong các thành phần con của nó. Trước tiên là các thành phần con, sau đó là các thành phần cha.
// Được cho phép (nhưng không được khuyến khích) để sửa đổi trạng thái trong mounted hook. Làm như vậy sẽ gây ra một rerender, mà người dùng sẽ không thể nhận thấy, nhưng sẽ làm chậm thành phần lại một chút.
// setup() {
//     onMounted(() => {
            // do something here
//     });
// }

// Hiểu về async/await: https://viblo.asia/p/giai-thich-ve-asyncawait-javascript-trong-10-phut-1VgZvBn7ZAw

// willUpdateProps: phương thức này được gọi trước khi một thành phần được cập nhật với các thuộc tính mới. Nó có thể được sử dụng để thực hiện bất kỳ thao tác nào cần thiết trước khi cập nhật. Nó có thể trả về một giá trị, nếu có, giá trị này sẽ được gán cho thuộc tính this.env trong phương thức render.
// willUpdateProps là một hook bất đồng bộ, được gọi ngay trước khi props mới được thiết lập. Điều này rất hữu ích nếu thành phần cần thực hiện một tác vụ bất đồng bộ, phụ thuộc vào các props (ví dụ như giả sử props là một ID bản ghi, lấy dữ liệu bản ghi đó).
// Khi hooks willUpdateProps được gọi, nó có thể trả về một Promise để báo cho Owl biết rằng nó đang thực hiện một tác vụ bất đồng bộ. Sau khi Promise được giải quyết, Owl sẽ tiếp tục cập nhật các props mới và kích hoạt các hooks didUpdateProps.
// Các tham số được truyền vào hooks willUpdateProps bao gồm newProps (props mới sẽ được thiết lập) và oldProps (props cũ của thành phần). Ta có thể sử dụng các tham số này để xác định xem có cần thực hiện tác vụ bất đồng bộ hay không.

// setup() {
//     onWillUpdateProps(nextProps => {
//         return this.loadData({id: nextProps.id});
//     });
// }

// Hooks willStart và willUpdateProps trong Owl có chức năng tương tự nhau, nhưng chúng được gọi trong các giai đoạn khác nhau của vòng đời của thành phần.
// Hook willStart được gọi trong quá trình khởi tạo thành phần và được sử dụng để thực hiện các tác vụ bất đồng bộ hoặc chuẩn bị dữ liệu cho thành phần trước khi nó được hiển thị lần đầu tiên trên giao diện. Hook này không được gọi lại khi props của thành phần thay đổi.
// Trong khi đó, hook willUpdateProps được gọi sau khi props mới được thiết lập và trước khi thành phần được cập nhật trên giao diện. Hook này được sử dụng để thực hiện các tác vụ bất đồng bộ liên quan đến props của thành phần, ví dụ như lấy dữ liệu từ máy chủ hoặc cập nhật trạng thái của thành phần.
// Ngoài ra, hook willUpdateProps không được gọi trong lần render đầu tiên của thành phần, trong khi hook willStart lại được gọi trong quá trình khởi tạo đầu tiên của thành phần. Các hooks trong Owl được gọi theo thứ tự thông thường, tức là trước tiên là các hooks của các thành phần cha, sau đó là các hooks của các thành phần con.

// willPatch:
// Hook willPatch trong Owl được gọi ngay trước quá trình patch DOM bắt đầu. Nó không được gọi trong lần render đầu tiên của thành phần. Hook này được sử dụng để đọc thông tin từ DOM trước khi nó được cập nhật.
// Lưu ý rằng hook willPatch chỉ được sử dụng để đọc thông tin từ DOM và không được phép sửa đổi trạng thái của thành phần. Nó cũng chỉ được gọi khi thành phần đã được chèn vào DOM. Nếu thành phần không có trong DOM, hook willPatch sẽ không được gọi.
// Tóm lại, hooks willPatch trong Owl được sử dụng để đọc thông tin từ DOM trước khi nó được cập nhật. Hook này chỉ được sử dụng để lưu trữ trạng thái DOM cục bộ và không được phép sửa đổi trạng thái của thành phần.
// setup() {
//     onWillPatch(() => {
//         this.scrollState = this.getScrollSTate();
//     });
// }
// Đúng, hook willPatch trong Owl được gọi theo thứ tự thông thường của các hooks, tức là trước tiên là các hooks của các thành phần cha, sau đó là các hooks của các thành phần con.

// patched:
// Hook patched trong Owl được gọi mỗi khi một thành phần đã thực sự cập nhật DOM của nó (thông thường thông qua một thay đổi trong trạng thái/props hoặc môi trường).
// Phương thức này không được gọi trong lần render ban đầu. Nó hữu ích để tương tác với DOM (ví dụ, thông qua một thư viện bên ngoài) mỗi khi thành phần được patch. Lưu ý rằng hook này sẽ không được gọi nếu thành phần không được nằm trong DOM.
// setup() {
//     onPatched(() => {
//         this.scrollState = this.getScrollSTate();
//     });
// }
// Giống như hook mounted, hook patched cũng được gọi theo thứ tự: con trước, sau đó mới đến cha.

// willUnmount:
// Hook willUnmount trong Owl được gọi mỗi khi một thành phần sẽ bị unmount khỏi DOM. Đây là một nơi tốt để loại bỏ các listeners, ví dụ như các listeners được thêm trong hook mounted.
// Khi một thành phần Owl được unmount, Owl sẽ gọi hook willUnmount của nó để cho phép các tài nguyên bên ngoài được giải phóng và các lắng nghe sự kiện được loại bỏ.
// setup() {
//     onMounted(() => {
           // add some listener
//     });
//     onWillUnmount(() => {
           // remove listener
//     });
// }
// Đúng, hook willUnmount trong Owl được gọi theo thứ tự đảo ngược so với thứ tự của hook mounted và patched. Điều này có nghĩa là hook willUnmount của các thành phần cha sẽ được gọi trước các thành phần con.

// willDestroy:
// Đúng vậy! Trong Owl, hook willDestroy luôn được gọi khi một thành phần sắp bị hủy, bất kể nó đã được mount hay chưa. Điều này khiến nó trở thành một nơi hữu ích để giải phóng bất kỳ tài nguyên nào hoặc thực hiện bất kỳ hành động nào đã được thiết lập trong giai đoạn setup của thành phần.
// Hook willDestroy được gọi sau hook willUnmount (nếu có), do đó bất kỳ hoạt động dọn dẹp hoặc giải phóng nào cần phải xảy ra sau khi thành phần đã bị unmount có thể được xử lý trong hook willDestroy.
// setup() {
//     onWillDestroy(() => {
           // do some cleanup
//     });
// }
// Đúng vậy! Trong Owl, hook willDestroy được gọi trên các thành phần con trước, sau đó mới đến các thành phần cha của chúng. Điều này đảm bảo rằng bất kỳ thành phần con nào cần phải dọn dẹp tài nguyên hoặc thực hiện bất kỳ hành động nào trước khi bị hủy đều có cơ hội để làm điều đó trước khi thành phần cha của chúng bị hủy.

// onError
// Đúng vậy! Rất tiếc, có thể xảy ra trường hợp các thành phần gặp sự cố trong quá trình chạy. Đây là một thực tế không may, và đó là lý do tại sao Owl cần cung cấp một cách để xử lý các lỗi này một cách đúng đắn.
// Hook onError hữu ích khi chúng ta cần chặn và phản ứng đúng với các lỗi xảy ra trong một số thành phần con. Xem trang về xử lý lỗi để biết thêm chi tiết.
// setup() {
//     onError(() => {
           // làm gì đó
//     });
// }
// Trong ví dụ này, chúng ta sử dụng hook onError để đăng ký một hàm xử lý lỗi. Khi một lỗi xảy ra trong các thành phần con của thành phần hiện tại, hàm này sẽ được gọi để xử lý lỗi đó.
// Nếu chúng ta không đăng ký bất kỳ hàm xử lý lỗi nào bằng hook onError, các lỗi sẽ được truyền đến trong console và gây ra các thông báo lỗi không mong muốn trên giao diện người dùng.
// Tổng thể, hook onError là một công cụ hữu ích để xử lý các lỗi xảy ra trong các thành phần con của một thành phần.

// SUB COMPONENTS
// Đúng vậy! Việc định nghĩa một thành phần sử dụng các thành phần con khác là rất tiện lợi và mạnh mẽ trong thực tế. Điều này được gọi là sự ghép nối (composition), và là rất mạnh mẽ trong thực tế. Để làm điều đó trong Owl, bạn chỉ cần sử dụng một thẻ bắt đầu bằng chữ in hoa trong template của nó, và đăng ký lớp thành phần con trong đối tượng components của nó:
// class Child extends Component {
//     static template = xml`<div>child component <t t-esc="props.value"/></div>`;
// }

// class Parent extends Component {
//     static template = xml`
//     <div>
//         <Child value="1"/>
//         <Child value="2"/>
//     </div>`;

//     static components = { Child };
// }

// DYANMIC SUB COMPONENTS
// Không phổ biến, nhưng đôi khi chúng ta cần một tên thành phần động. Trong trường hợp này, chỉ thị t-component cũng có thể được sử dụng để chấp nhận các giá trị động. Điều này nên là một biểu thức được đánh giá thành một lớp thành phần. Ví dụ:
// class A extends Component {
//     static template = xml`<div>child a</div>`;
// }
// class B extends Component {
//     static template = xml`<span>child b</span>`;
// }
// class Parent extends Component {
//     static template = xml`<t t-component="myComponent"/>`;

//     state = useState({ child: "a" });

//     get myComponent() {
//     return this.state.child === "a" ? A : B;
//     }
// }

// STATUS HELPER
// Đúng vậy! Đôi khi cần có cách để biết thành phần đang ở trạng thái nào. Để làm điều đó, chúng ta có thể sử dụng trợ lý status:

// const { status } = owl;
   // assume component is an instance of a Component

// console.log(status(component));
// logs either:
// - 'new', if the component is new and has not been mounted yet
// - 'mounted', if the component is currently mounted
// - 'destroyed' if the component is currently destroyed