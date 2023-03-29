// INTRODUCTION
// Reactivity là một chủ đề quan trọng trong các framework javascript. Mục tiêu của nó là cung cấp một cách đơn giản để thao tác trạng thái, sao cho giao diện được cập nhật tự động theo các thay đổi trạng thái, và làm điều này một cách hiệu quả.
// Để đạt được mục tiêu này, Owl cung cấp một hệ thống reactivity dựa trên proxy, dựa trên primitive reactive. Hàm reactive lấy một đối tượng làm đối số đầu tiên, và một callback tùy chọn là đối số thứ hai, nó trả về một proxy của đối tượng. Proxy này theo dõi các thuộc tính được đọc thông qua proxy, và gọi callback được cung cấp khi bất kỳ một trong các thuộc tính này được thay đổi thông qua bất kỳ phiên bản reactive nào của cùng một đối tượng. Nó làm điều này theo chiều sâu, bằng cách trả về các phiên bản reactive của các đối tượng con khi chúng được đọc.

// useState
// Trong khi primitive reactive rất mạnh mẽ, việc sử dụng nó trong các thành phần theo một mẫu tiêu chuẩn rất đơn giản: các thành phần muốn được vẽ lại khi một phần của trạng thái mà chúng phụ thuộc vào để vẽ thay đổi. Vì vậy, owl cung cấp một hook tiêu chuẩn: useState. Để nói một cách đơn giản, hook này chỉ cần gọi hàm reactive với đối tượng được cung cấp, và hàm vẽ lại của thành phần hiện tại như một callback. Điều này sẽ khiến nó được vẽ lại mỗi khi bất kỳ phần nào của đối tượng trạng thái mà đã được đọc bởi thành phần này bị thay đổi.
// Dưới đây là một ví dụ đơn giản về cách sử dụng useState:

// class Counter extends Component {
//     static template = xml     <div t-on-click="() => this.state.value++">       <t t-esc="state.value"/>     </div>;

//     setup() {
//         this.state = useState({ value: 0 });
//     }
// }

// Trong ví dụ này, chúng ta đang tạo một thành phần Counter với một state object chứa một giá trị đếm (value). Khi thành phần được render, nó sẽ hiển thị giá trị đếm và bắt sự kiện click để tăng giá trị đếm lên mỗi lần click. Sử dụng hook useState, chúng ta khởi tạo trạng thái bằng cách gọi hàm này với một đối tượng chứa giá trị ban đầu của state (0 trong trường hợp này). Sau đó, trong hàm setup, chúng ta lưu trạng thái này vào biến state để có thể sử dụng trong phần tử template. Khi giá trị đếm được tăng lên, useState sẽ tự động gọi hàm render của thành phần để cập nhật giao diện với giá trị mới.
// Thành phần Counter đọc state.value khi được vẽ, đăng ký nó để theo dõi các thay đổi cho khóa đó. Khi giá trị thay đổi, Owl sẽ cập nhật lại thành phần. Lưu ý rằng không có gì đặc biệt về thuộc tính state, bạn có thể đặt tên cho các biến trạng thái của mình bất cứ điều gì bạn muốn, và bạn có thể có nhiều biến trạng thái trên cùng một thành phần nếu điều đó hợp lý. Điều này cũng cho phép useState được sử dụng trong các hook tùy chỉnh mà có thể yêu cầu trạng thái cụ thể cho hook đó.
// Reactive props
// Kể từ phiên bản 2.0, Owl không còn "sâu" mặc định nữa: một thành phần chỉ được vẽ lại bởi thành phần cha của nó nếu props của nó đã thay đổi (sử dụng một bài kiểm tra đơn giản về tính bằng nhau). Nhưng nếu nội dung của props đã thay đổi trong một thuộc tính sâu hơn thì sao? Nếu prop đó là reactive, owl sẽ vẽ lại các thành phần con cần được cập nhật tự động, và chỉ các thành phần đó, nó làm điều này bằng cách quan sát lại các đối tượng reactive được truyền như props cho các thành phần. Hãy xem xét ví dụ sau:
// class Counter extends Component {
//     static template = xml`
//       <div t-on-click="() => props.state.value++">
//         <t t-esc="props.state.value"/>
//       </div>`;
//   }
  
//   class Parent extends Component {
//     static template = xml`
//       <Counter state="this.state"/>
//       <button t-on-click="() => this.state.value = 0">Reset counter</button>
//       <button t-on-click="() => this.state.test++" t-esc="this.state.test"/>`;
  
//     setup() {
//       this.state = useState({ value: 0, test: 1 });
//     }
// }
// Khi nhấn vào nút counter, chỉ Counter được vẽ lại, vì Parent chưa bao giờ đọc khóa "value" trong state. Khi nhấn vào nút "Reset Counter", điều tương tự xảy ra: chỉ Counter được vẽ lại. Quan trọng là không phải nơi mà state được cập nhật, mà là các phần của state được cập nhật và các thành phần nào phụ thuộc vào chúng. Owl đạt được điều này bằng cách tự động gọi useState trên các đối tượng reactive được truyền như props cho một thành phần con.
// Khi nhấn vào nút cuối cùng, parent được vẽ lại, nhưng child không quan tâm đến khóa test: nó chưa đọc nó. Những props mà chúng ta đưa nó (this.state) cũng chưa thay đổi, do đó, parent cập nhật nhưng child không.
// Đối với hầu hết các hoạt động hàng ngày, useState sẽ đáp ứng tất cả nhu cầu của bạn. Nếu bạn tò mò về các trường hợp sử dụng nâng cao hơn và chi tiết kỹ thuật, hãy đọc tiếp.

// Debugging subscriptions
// Owl cung cấp một cách để hiển thị các đối tượng reactive và các khóa mà một thành phần được đăng ký: bạn có thể xem tại component.__owl__.subscriptions. Lưu ý rằng đây là trên trường __owl__ nội bộ, và không nên được sử dụng trong bất kỳ loại mã sản xuất nào vì tên của thuộc tính này hoặc bất kỳ thuộc tính hoặc phương thức của nó nào đều có thể thay đổi bất cứ lúc nào, ngay cả trong các phiên bản ổn định của Owl, và có thể chỉ có sẵn trong chế độ gỡ lỗi trong tương lai.

// reactive
// Hàm reactive là nguyên tố reactivity cơ bản. Nó lấy một đối tượng hoặc một mảng như là đối số đầu tiên, và tùy chọn, một hàm như là đối số thứ hai. Hàm này được gọi mỗi khi bất kỳ giá trị được theo dõi nào được cập nhật.

// const obj = reactive({ a: 1 }, () => console.log("changed"));

// obj.a = 2; // không ghi nhận bất cứ điều gì: khóa 'a' chưa được đọc
// console.log(obj.a); // ghi nhận 2 và đọc khóa 'a' => giờ đây nó đang được theo dõi
// obj.a = 3; // ghi nhận 'changed' vì chúng ta cập nhật một giá trị được theo dõi

// Một thuộc tính quan trọng của các đối tượng reactive là chúng có thể được quan sát lại: điều này sẽ tạo ra một proxy độc lập theo dõi một tập khóa khác:

// const obj1 = reactive({ a: 1, b: 2 }, () => console.log("observer 1"));
// const obj2 = reactive(obj1, () => console.log("observer 2"));

// console.log(obj1.a); // ghi nhận 1, và đọc khóa 'a' => giờ đây nó được theo dõi bởi observer 1
// console.log(obj2.b); // ghi nhận 2, và 'b' giờ đây được theo dõi bởi observer 2
// obj2.a = 3; // chỉ ghi nhận 'observer1', vì observer2 không theo dõi a
// obj2.b = 3; // chỉ ghi nhận 'observer2', vì observer1 không theo dõi b
// console.log(obj2.a, obj1.b); // ghi nhận 3 và 3, trong khi đối tượng được quan sát độc lập, nó vẫn là một đối tượng đơn

// Bởi vì useState trả về một đối tượng reactive bình thường, nên có thể gọi reactive trên kết quả của một useState để quan sát các thay đổi đối với đối tượng đó khi ở bên ngoài ngữ cảnh của một thành phần, hoặc để gọi useState trên các đối tượng reactive được tạo ra bên ngoài các thành phần. Trong những trường hợp đó, người dùng cần phải cẩn thận về thời gian sống của các đối tượng reactive đó, bởi vì giữ các tham chiếu đến các đối tượng này có thể ngăn thu gom rác của thành phần và dữ liệu của nó ngay cả khi Owl đã phá hủy nó.

// Subscriptions are ephemereal
// Các subscription đến các thay đổi trạng thái là tạm thời, mỗi khi một người quan sát được thông báo rằng một đối tượng trạng thái đã thay đổi, tất cả các subscriptions của nó đều bị xóa, có nghĩa là nếu nó vẫn quan tâm đến nó, nó nên đọc lại các thuộc tính mà nó quan tâm. Ví dụ:

// const obj = reactive({ a: 1 }, () => console.log("observer called"));

// console.log(obj.a); // ghi nhận 1, và đọc khóa 'a' => giờ đây nó được theo dõi bởi người quan sát
// obj.a = 3; // ghi nhận 'observer1' và xóa các subscriptions của người quan sát
// obj.a = 4; // không ghi nhận bất cứ điều gì, khóa không được quan sát nữa

// Điều này có vẻ ngược lại với trực giác, nhưng nó hoàn toàn hợp lý trong ngữ cảnh của các thành phần:

// class DoubleCounter extends Component {
//     static template = xml`
//       <t t-esc="state.selected + ': ' + state[state.selected].value"/>
//       <button t-on-click="() => this.state.count1++">increment count 1</button>
//       <button t-on-click="() => this.state.count2++">increment count 2</button>
//       <button t-on-click="changeCounter">Switch counter</button>
//     `;
  
//     setup() {
//       this.state = useState({ selected: "count1", count1: 0, count2: 0 });
//     }
  
//     changeCounter() {
//       this.state.selected = this.state.selected === "count1" ? "count2" : "count1";
//     }
// }

// Trong thành phần này, nếu chúng ta tăng giá trị của bộ đếm thứ hai, thành phần sẽ không được render lại, điều này hợp lý vì việc render lại sẽ không có tác dụng, vì bộ đếm thứ hai không được hiển thị. Nếu chúng ta chuyển đổi thành phần để hiển thị bộ đếm thứ hai, chúng ta giờ đây không còn muốn thành phần được render lại khi giá trị của bộ đếm thứ nhất thay đổi, và điều này cũng xảy ra: một thành phần chỉ được render lại khi có sự thay đổi đối với các phần của trạng thái đã được đọc trong hoặc sau lần render trước. Nếu một phần của trạng thái không được đọc trong lần render trước, chúng ta biết rằng giá trị của nó sẽ không ảnh hưởng đến đầu ra được render, vì vậy chúng ta có thể bỏ qua nó.

// reactive Map và Set
// Hệ thống reactivity có hỗ trợ đặc biệt tích hợp sẵn cho các loại container chuẩn Map và Set. Chúng hoạt động như một người dùng mong đợi: đọc một khóa đăng ký người quan sát đối với khóa đó, thêm hoặc xóa một mục khỏi chúng thông báo cho các người quan sát đã sử dụng bất kỳ bộ lặp nào trên đối tượng reactive đó, chẳng hạn như .entries() hoặc .keys(), tương tự như việc xóa chúng.

// ESCAPE HATCHES
// Đôi khi, việc bỏ qua hệ thống reactivity là mong muốn. Tạo các proxy khi tương tác với các đối tượng reactive là tốn kém, và mặc dù trên tổng thể, lợi ích về hiệu suất mà chúng ta nhận được bằng cách render lại chỉ các phần của giao diện cần thiết vượt qua chi phí đó, trong một số trường hợp, chúng ta muốn có khả năng không tạo chúng từ đầu. Đây là mục đích của markRaw:
// markRaw
// Đánh dấu một đối tượng để không bị hệ thống reactivity quan sát, có nghĩa là nếu đối tượng này bao giờ là một phần của một đối tượng reactive, nó sẽ được trả về như vậy, và không có khóa nào trong đối tượng đó sẽ được quan sát.

// const someObject = markRaw({ b: 1 });
// const state = useState({
// a: 1,
// obj: someObject,
// });
// console.log(state.obj.b); // cố gắng đăng ký khóa "b" trong someObject
// state.obj.b = 2; // Không có việc render lại ở đây
// console.log(someObject === state.obj); // true

// Điều này hữu ích trong một số trường hợp hiếm. Một ví dụ như thế là nếu bạn muốn sử dụng một mảng các đối tượng có thể lớn để render một danh sách, nhưng những đối tượng đó được biết là không thay đổi:
// this.items = useState([
// { label: "some text", value: 42 },
// ... tổng số đối tượng là 1000
// ]);
// trong template:
// <t t-foreach="items" t-as="item" t-key="item.label" t-esc="item.label + item.value"/> Ở đây, mỗi lần render, chúng ta đọc một nghìn khóa từ một đối tượng reactive, điều này dẫn đến việc tạo ra một nghìn đối tượng reactive. Nếu chúng ta biết rằng nội dung của những đối tượng này không thể thay đổi, thì điều này làm việc lãng phí. Nếu tất cả các đối tượng này được đánh dấu là raw, chúng ta tránh được tất cả các công việc này trong khi vẫn giữ được khả năng dựa vào tính reactivity để theo dõi sự hiện diện và danh tính của những đối tượng này:
// this.items = useState([
// markRaw({ label: "some text", value: 42 }),
// ... tổng số đối tượng là 1000
// ]);
// Tuy nhiên, hãy sử dụng chức năng này cẩn thận: đây là một cách trốn thoát khỏi hệ thống reactivity, và do đó, việc sử dụng nó có thể gây ra những vấn đề tinh sub và không đáng ý! Ví dụ:
// Điều này sẽ gây ra một lần render
// this.items.push(markRaw({ label: "another label", value: 1337 }));
// ĐIỀU NÀY SẼ KHÔNG GÂY RA RENDER!
// this.items[17].value = 3;
// Giao diện người dùng hiện tại không đồng bộ với trạng thái thành phần cho đến lần render tiếp theo được gây ra bởi một thứ gì đó khác
// Tóm lại: chỉ sử dụng markRaw nếu ứng dụng của bạn chậm đi đáng kể và phân tích hiệu suất cho thấy rằng có rất nhiều thời gian được dành cho việc tạo ra các đối tượng reactive không có ích.

// toRaw
// Trong khi markRaw đánh dấu một đối tượng để nó không bao giờ trở nên reactive, toRaw lấy một đối tượng và trả về đối tượng non-reactive cơ bản. Nó có thể hữu ích trong một số trường hợp nhất định. Đặc biệt, vì hệ thống reactivity trả về một proxy, đối tượng được trả về không so sánh bằng với đối tượng ban đầu:

// const obj = {};
// const reactiveObj = reactive(obj);
// console.log(obj === reactiveObj); // false
// console.log(obj === toRaw(reactiveObj)); // true
// Nó cũng có thể hữu ích trong quá trình gỡ lỗi, vì mở rộng các proxy theo cách đệ quy trong các trình gỡ lỗi có thể gây nhầm lẫn.

// ADVANCED USAGE
// Notification manager
// Store
// Local storage synchronization





