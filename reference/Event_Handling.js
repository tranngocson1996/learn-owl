// EVENT HANDLING
// Trong một mẫu của thành phần, việc đăng ký các trình xử lý trên các phần tử DOM để đáp ứng các sự kiện cụ thể rất hữu ích. Điều này làm cho mẫu trở nên sống động hơn. Điều này được thực hiện với chỉ thị t-on. Ví dụ:
// <button t-on-click="someMethod">Do something</button>
// Đoạn mã này sẽ được chuyển đổi sang JavaScript như sau:
// button.addEventListener("click", component.someMethod.bind(component));
// Đoạn mã này sẽ đăng ký một trình xử lý sự kiện cho phần tử button bằng cách sử dụng phương thức addEventListener của DOM. Giá trị đầu tiên là chuỗi "click", xác định sự kiện mà chúng ta muốn đăng ký trình xử lý cho. Giá trị thứ hai là một hàm, được gọi khi sự kiện được kích hoạt. Trong trường hợp này, chúng ta đang gọi phương thức someMethod của đối tượng component.
// Tuy nhiên, phương thức someMethod sẽ không hoạt động một cách chính xác nếu không được gắn liền với đối tượng component, do đó chúng ta sử dụng phương thức bind để gắn liền phương thức với đối tượng component. Điều này đảm bảo rằng trong phương thức someMethod, từ khóa this sẽ trỏ đến đối tượng component.

// Hậu tố (click trong ví dụ này) đơn giản là tên của sự kiện DOM thực tế. Giá trị của biểu thức t-on phải là một biểu thức JavaScript hợp lệ, đánh giá thành một hàm trong ngữ cảnh của thành phần hiện tại. Do đó, người dùng có thể có được một tham chiếu đến sự kiện hoặc truyền một số đối số bổ sung. Ví dụ, tất cả các biểu thức sau đây đều là hợp lệ:
// <button t-on-click="someMethod">Do something</button>
// <button t-on-click="() => this.increment(3)">Add 3</button>
// <button t-on-click="ev => this.doStuff(ev, 'value')">Do something</button>

// Chú ý đến việc sử dụng từ khóa this trong hàm mũi tên: đây là cách chính xác để gọi một phương thức trên thành phần trong một hàm mũi tên.
// Người dùng có thể sử dụng biểu thức sau:
// <button t-on-click="() => increment(3)">Add 3</button>
// Tuy nhiên, trong trường hợp này, phương thức increment có thể không được gắn liền (unbound) (trừ khi thành phần gắn nó trong hàm setup, ví dụ).
// Khi sử dụng hàm mũi tên, chúng ta cần chú ý rằng giá trị của từ khóa this sẽ thay đổi. Thay vì trỏ đến đối tượng thành phần, từ khóa this sẽ trỏ đến đối tượng global (window) trong ngữ cảnh của hàm mũi tên. Do đó, chúng ta cần sử dụng từ khóa this để gọi các phương thức của thành phần trong hàm mũi tên:
// <button t-on-click="() => this.increment(3)">Add 3</button>
// Lưu ý rằng trong trường hợp này, chúng ta sử dụng từ khóa this để gọi phương thức increment.

// MODIFIERS
// Để loại bỏ các chi tiết sự kiện DOM khỏi các trình xử lý sự kiện (như các cuộc gọi đến event.preventDefault) và để cho phép chúng tập trung vào logic dữ liệu, người dùng có thể chỉ định các bổ sung (modifiers) như là các hậu tố bổ sung của chỉ thị t-on.

// .stop: Gọi phương thức event.stopPropagation() trước khi gọi phương thức xử lý sự kiện
// .prevent: Gọi phương thức event.preventDefault() trước khi gọi phương thức xử lý sự kiện
// .self: Chỉ gọi phương thức xử lý sự kiện nếu sự kiện được kích hoạt trên phần tử được đăng ký (không phải phần tử con của phần tử được đăng ký)
// .capture: Đăng ký trình xử lý sự kiện sử dụng phương thức addEventListener với tham số thứ ba là true
// .synthetic: Định nghĩa một trình xử lý sự kiện tổng hợp (synthetic event handler) (xem phía dưới)

// <button t-on-click.stop="someMethod">Do something</button>
// Trong ví dụ này, chúng ta sử dụng bổ sung stop để ngăn chặn sự kiện click từ việc lan truyền tới các phần tử cha. Khi phần tử này được click, phương thức someMethod của thành phần sẽ được gọi và sự kiện click sẽ được ngăn chặn lan truyền tới các phần tử cha của nó.

// Lưu ý rằng các bổ sung có thể được kết hợp với nhau (ví dụ: t-on-click.stop.prevent), và thứ tự có thể quan trọng. Ví dụ, t-on-click.prevent.self sẽ ngăn chặn tất cả các sự kiện click trong khi t-on-click.self.prevent chỉ ngăn chặn các sự kiện click trên chính phần tử đó.

// Cuối cùng, các trình xử lý sự kiện trống được chấp nhận vì chúng có thể được xác định chỉ để áp dụng các bổ sung. Ví dụ:
// <button t-on-click.stop="">Làm gì đó</button>
// Trong ví dụ này, chúng ta đặt một trình xử lý sự kiện rỗng để ngăn chặn sự kiện click lan truyền tới các phần tử cha. Không có phương thức cụ thể nào được gọi khi phần tử này được click, nhưng sự kiện click vẫn bị ngăn chặn lan truyền tới các phần tử cha của nó.

// SYNTHETIC EVENTS
// Trong một số trường hợp, việc đính kèm một trình xử lý sự kiện cho từng phần tử của danh sách lớn có một chi phí không đáng kể. Owl cung cấp một cách để cải thiện hiệu suất một cách hiệu quả: với sự kiện tổng hợp (synthetic event), nó thực tế chỉ thêm một trình xử lý sự kiện trên thân tài liệu (document body), và sẽ gọi đúng trình xử lý sự kiện, giống như mong đợi.
// Sự khác biệt duy nhất so với các sự kiện thông thường là sự kiện được bắt tại thân tài liệu (document body), do đó không thể ngăn chặn trước khi nó đến đó. Vì có thể gây bất ngờ trong một số trường hợp, sự kiện tổng hợp không được kích hoạt theo mặc định.
// To enable it, one can just use the .synthetic suffix:

// <div>
//     <t t-foreach="largeList" t-as="elem" t-key="elem.id">
//         <button t-on-click.synthetic="doSomething" ...>
//             <!-- some content -->
//         </button>
//     </t>
// </div>

// ON COMPONENTS
// Chỉ thị t-on cũng hoạt động trên một thành phần con:

// <div>
//     <Child t-on-click="dosomething"/>
// </div>
// Điều này sẽ bắt tất cả các sự kiện click trên bất kỳ phần tử HTML nào được chứa trong thành phần con Child. Lưu ý rằng nếu thành phần con được giảm xuống thành một (hoặc nhiều) nút văn bản, thì việc nhấp vào nó sẽ không gọi trình xử lý, vì sự kiện sẽ được phân phát bởi trình duyệt trên phần tử cha (một thẻ div trong trường hợp này).
