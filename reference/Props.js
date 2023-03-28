// OVERVIEW
// Trong Owl, prop (viết tắt của thuộc tính) là một đối tượng chứa tất cả các dữ liệu được truyền vào cho một thành phần bởi thành phần cha của nó.
// class Child extends Component {
//     static template = xml`<div><t t-esc="props.a"/><t t-esc="props.b"/></div>`;
//   }
  
//   class Parent extends Component {
//     static template = xml`<div><Child a="state.a" b="'string'"/></div>`;
//     static components = { Child };
//     state = useState({ a: "fromparent" });
// }
// Trong ví dụ này, thành phần Child nhận hai prop từ thành phần cha của nó: a và b. Chúng được thu thập vào một đối tượng props bởi Owl, với mỗi giá trị được đánh giá trong ngữ cảnh của thành phần cha. Vì vậy, props.a bằng 'fromparent' và props.b bằng 'string'.
// Lưu ý rằng props là một đối tượng chỉ có ý nghĩa từ quan điểm của thành phần con.
// Trong template của Parent, chúng ta sử dụng Child và truyền giá trị cho prop a bằng đường dẫn state.a. Điều này có nghĩa là giá trị của props.a trong Child sẽ được lấy từ thuộc tính a của state của Parent.
// Nếu chúng ta muốn truyền một giá trị cố định cho prop b, chúng ta có thể sử dụng cú pháp 'string' để đưa giá trị vào. Điều này có nghĩa là giá trị của props.b sẽ luôn là chuỗi 'string'.
// Các prop có thể được sử dụng để truyền dữ liệu giữa các thành phần và giúp các thành phần trở nên linh hoạt và có thể tái sử dụng.

// DEFINITION
// Đối tượng props được tạo ra từ tất cả các thuộc tính được định nghĩa trên template, với các ngoại lệ sau đây:
// Mọi thuộc tính bắt đầu bằng t- không phải là prop (chúng là chỉ thị QWeb)
// <div>
//     <ComponentA a="state.a" b="'string'"/>
//     <ComponentB t-if="state.flag" model="model"/>
// </div>
// Đối tượng props chứa các khóa sau:
// Đối với ComponentA: a và b.
// Đối với ComponentB: model.

// PROPS COMPARISON
// Khi Owl gặp một thành phần con trong một template, nó thực hiện một so sánh nông của tất cả các props. Nếu chúng đều được định danh bằng nhau, thì thành phần con sẽ không được cập nhật. Nếu ít nhất một prop đã thay đổi, thì Owl sẽ cập nhật nó.
// Tuy nhiên, trong một số trường hợp, chúng ta biết rằng hai giá trị khác nhau, nhưng chúng có cùng tác dụng và không nên được xem là khác nhau bởi Owl. Ví dụ, các hàm ẩn danh trong một template luôn khác nhau, nhưng hầu hết chúng không nên được xem là khác nhau:

// <t t-foreach="todos" t-as="todo" t-key="todo.id">
//   <Todo todo="todo" onDelete="() => deleteTodo(todo.id)" />
// </t>

// Trong trường hợp này, chúng ta có thể sử dụng hậu tố .alike:

// <t t-foreach="todos" t-as="todo" t-key="todo.id">
//   <Todo todo="todo" onDelete.alike="() => deleteTodo(todo.id)" />
// </t>
// Hậu tố này sẽ cho phép Owl so sánh các giá trị của props bằng một cách khác nhau. Nó sẽ sử dụng một hàm so sánh đặc biệt để so sánh hai giá trị. Nếu hai giá trị có cùng kết quả khi được đưa vào hàm so sánh đó, thì chúng sẽ được coi là giống nhau.
// Trong ví dụ trên, chúng ta sử dụng .alike cho onDelete để Owl biết rằng các hàm ẩn danh được truyền vào giống nhau và không cần phải được cập nhật mỗi khi template được cập nhật.
// Lưu ý rằng hậu tố .alike chỉ có tác dụng với các props kiểu function. Các props khác sẽ được so sánh bằng cách thực hiện so sánh đối tượng đơn giản.
// Điều này cho biết với Owl rằng prop cụ thể này luôn nên được coi là tương đương (hoặc nói cách khác, nên được loại bỏ khỏi danh sách các props có thể so sánh).
// Lưu ý rằng ngay cả khi hầu hết các hàm ẩn danh có thể được coi là giống nhau, điều đó không nhất thiết đúng trong tất cả các trường hợp. Điều này phụ thuộc vào những giá trị được bắt giữ bởi hàm ẩn danh. Ví dụ sau đây cho thấy một trường hợp khi sử dụng .alike có thể là sai.

// <t t-foreach="todos" t-as="todo" t-key="todo.id">
//   <!-- Có lẽ không đúng! todo.isCompleted có thể thay đổi -->
//   <Todo todo="todo" toggle.alike="() => toggleTodo(todo.isCompleted)" />
// </t>
// Ở đây, chúng ta sử dụng .alike cho toggle để Owl biết rằng các hàm ẩn danh được truyền vào giống nhau và không cần phải được cập nhật mỗi khi template được cập nhật. Tuy nhiên, giá trị của todo.isCompleted có thể thay đổi, dẫn đến việc các hàm ẩn danh được tạo ra bởi .alike không còn tương đương với nhau.
// Vì vậy, điều quan trọng là phải xác định chính xác những props nào nên được xem là tương đương và nên sử dụng .alike cho chúng.

// BINDING FUNCTION PROPS
// Thường xuyên cần phải truyền một callback như là một prop trong Owl. Vì các component của Owl dựa trên class, nên callback thường cần được ghép nối với component của nó. Vì vậy, chúng ta có thể làm như sau:

// Trong ví dụ này, chúng ta định nghĩa một component SomeComponent với một child component Child. Chúng ta pass một callback là doSomething vào Child thông qua props callback.
// Tuy nhiên, vì doSomething được định nghĩa bằng cách sử dụng function bình thường thay vì arrow function, this không được bind đúng vào component của nó. Điều này có nghĩa là khi doSomething được gọi từ Child, this sẽ không trỏ đúng vào component SomeComponent.
// Để giải quyết vấn đề này, chúng ta có thể bind doSomething tới component của nó trong phương thức setup() của SomeComponent, như sau:

// class SomeComponent extends Component {
//   static template = xml`
//     <div>
//       <Child callback="doSomething"/>
//     </div>`;

//   setup() {
//     this.doSomething = this.doSomething.bind(this);
//   }

//   doSomething() {
    // ...
//   }
// }
// Ở đây, chúng ta sử dụng bind() để bind this đúng vào component của nó. Vì vậy, khi doSomething được gọi từ Child, this sẽ trỏ đúng vào component SomeComponent.

// Tuy nhiên, đây là một trường hợp sử dụng phổ biến đến nỗi Owl cung cấp một hậu tố đặc biệt để làm điều này: .bind. Nó có dạng như sau:
// class SomeComponent extends Component {
//   static template = xml`
//     <div>
//       <Child callback.bind="doSomething"/>
//     </div>`;

//   doSomething() {
    // ...
//   }
// }
// .bind cũng bao gồm .alike, vì vậy các props này sẽ không gây ra các lần render bổ sung.
// Với .bind, chúng ta không cần phải bind các hàm callback trong phương thức setup(). Owl sẽ tự động bind this đúng vào component của nó, đảm bảo rằng this sẽ được trỏ đúng vào component của nó khi callback được gọi từ child components. Điều này giúp giảm thiểu số lượng mã boilerplate cần thiết để bind các hàm callback.

// DYNAMIC PROPS
// Chỉ thị t-props có thể được sử dụng để chỉ định các props hoàn toàn động:

// <div t-name="ParentComponent">
//     <Child t-props="some.obj"/>
// </div>
// class ParentComponent extends Component {
//   static components = { Child };
//   some = { obj: { a: 1, b: 2 } };
// }
// Ở đây, chúng ta pass some.obj vào Child thông qua t-props. Khi ParentComponent được render, Child sẽ nhận được some.obj như là một props. Vì some.obj là một đối tượng động, bất kỳ thay đổi nào trong some.obj đều sẽ được tự động phản ánh trong Child.
// Lưu ý rằng khi sử dụng t-props với props động, chúng ta không thể sử dụng .alike hoặc .bind, vì chúng chỉ áp dụng cho các props cụ thể được định nghĩa trước.

// DEFAULT PROPS
// Nếu thuộc tính tĩnh defaultProps được định nghĩa, nó sẽ được sử dụng để hoàn thành các props nhận được từ parent, nếu thiếu.

// class Counter extends owl.Component {
//   static defaultProps = {
//     initialValue: 0,
//   };
//   ...
// }
// Trong ví dụ trên, props initialValue giờ đây được mặc định là 0 nếu không được truyền vào bởi parent.
// Điều này giúp giảm thiểu số lượng mã boilerplate cần thiết để kiểm tra các props và thiết lập giá trị mặc định nếu chúng thiếu. Nó cũng giúp tăng tính tái sử dụng của các component bằng cách loại bỏ sự phụ thuộc vào các props cụ thể được truyền vào từ parent.

// PROPS VALIDATION
// Khi một ứng dụng trở nên phức tạp, việc xác định props bằng cách không chính thức có thể trở nên khá không an toàn. Điều này dẫn đến hai vấn đề:
//     Khó xác định cách sử dụng component bằng cách nhìn vào mã nguồn của nó.
//     Không an toàn, dễ dàng gửi những props sai vào một component, bằng cách tái cấu trúc một component hoặc một trong những parent của nó.

// Hệ thống props kiểu giải quyết cả hai vấn đề bằng cách mô tả các loại và hình dạng của các props. Đây là cách nó hoạt động trong Owl:
//     props là một key tĩnh (khác với this.props trong một instance của component).
//     props là tùy chọn: một component có thể không định nghĩa props.
//     Các props được kiểm tra tính hợp lệ mỗi khi một component được tạo / cập nhật.
//     Các props chỉ được kiểm tra tính hợp lệ trong chế độ dev (xem cách cấu hình ứng dụng).
//     Nếu một key không phù hợp với mô tả, một lỗi sẽ được ném ra.
//     Nó kiểm tra các keys được định nghĩa trong props (tĩnh). Các keys bổ sung bởi parent sẽ gây ra lỗi (trừ khi * được định nghĩa).
//     props có thể là một đối tượng hoặc một danh sách các chuỗi.
//     Một danh sách các chuỗi là một định nghĩa props đơn giản, chỉ liệt kê tên của các props. Nếu tên kết thúc bằng ?, nó được coi là tùy chọn.
//     Tất cả props đều bắt buộc theo mặc định, trừ khi chúng được định nghĩa là tùy chọn bằng optional: true (trong trường hợp đó, chỉ được thực hiện nếu có giá trị).
//     Các kiểu hợp lệ bao gồm: Number, String, Boolean, Object, Array, Date, Function và tất cả các hàm constructor (nếu bạn có một lớp Person, nó có thể được sử dụng như một kiểu).
//     Các mảng là đồng nhất (tất cả các phần tử có cùng kiểu / hình dạng).

// Đối với mỗi key, định nghĩa prop có thể là một boolean, một constructor, một danh sách các constructors hoặc một đối tượng:
//     Một boolean: cho biết rằng prop tồn tại và là bắt buộc.
//     Một constructor: điều này nên mô tả kiểu, ví dụ: id: Number mô tả prop id dưới dạng một số.
//     Một đối tượng mô tả một giá trị dưới dạng kiểu. Điều này được thực hiện bằng cách sử dụng key value. Ví dụ, {value: false} chỉ định rằng giá trị tương ứng phải bằng false.
//     Một danh sách các constructors. Trong trường hợp đó, điều này có nghĩa là chúng ta cho phép nhiều hơn một kiểu. Ví dụ, id: [Number, String] có nghĩa là id có thể là một chuỗi hoặc số.
//     Một đối tượng. Điều này làm cho nó có thể có định nghĩa chi tiết hơn. Các key con sau đây được phép (nhưng không bắt buộc):
//         type: kiểu chính của prop được xác thực
//         element: nếu kiểu là Array, thì key element mô tả kiểu của từng phần tử trong mảng. Nếu không được đặt, chúng ta chỉ xác thực mảng, không phải phần tử của nó.
//         shape: nếu kiểu là Object, thì key shape mô tả interface của object. Nếu không được đặt, chúng ta chỉ xác thực object, không phải các phần tử của nó.
//         validate: đây là một hàm, nên trả về một boolean để xác định giá trị có hợp lệ hay không. Hữu ích cho logic xác thực tùy chỉnh.
//         optional: nếu là true, thì prop không bắt buộc.
// Có một prop đặc biệt * có nghĩa là cho phép các prop bổ sung. Điều này đôi khi hữu ích cho các component chung chung sẽ lan truyền một số hoặc tất cả các prop của nó đến các component con.

// Lưu ý rằng giá trị mặc định không thể được định nghĩa cho các prop bắt buộc. Làm như vậy sẽ dẫn đến lỗi xác thực prop.
// Ví dụ:
// class ComponentA extends owl.Component {
//     static props = ['id', 'url'];

//     ...
// }

// class ComponentB extends owl.Component {
//   static props = {
//     count: {type: Number},
//     messages: {
//       type: Array,
//       element: {type: Object, shape: {id: Boolean, text: String }
//     },
//    date: Date,
//    combinedVal: [Number, Boolean],
//    optionalProp: { type: Number, optional: true }
//   };

//   ...
// }
// Trong đoạn mã này, ComponentA có 2 props là id và url, cả hai đều bắt buộc.
// ComponentB có 5 props:
//     count là một số.
//     messages là một mảng các object có cấu trúc {id: Boolean, text: String}.
//     date là một kiểu Date.
//     combinedVal có thể là một số hoặc một boolean.
//     optionalProp là một số, nhưng không bắt buộc.
// Cả hai component này sử dụng định nghĩa props để đảm bảo tính hợp lệ của các prop được truyền vào.

// only the existence of those 3 keys is documented
// static props = ['message', 'id', 'date'];
// Đoạn mã này chỉ định nghĩa rằng Component có ba props là message, id, và date. Tuy nhiên, không có thông tin về kiểu và tính hợp lệ của các prop được chỉ định.

// only the existence of those 3 keys is documented. any other key is allowed.
// static props = ['message', 'id', 'date', '*'];
// Đoạn mã này chỉ định nghĩa rằng Component có ba props là message, id, và date, và cho phép bất kỳ prop nào khác được truyền vào. Đây là một cách để tạo ra một component chung chung có thể nhận các prop khác nhau. Tuy nhiên, không có thông tin về kiểu và tính hợp lệ của các prop được chỉ định, bao gồm cả các prop được truyền vào bổ sung.

// size is optional
// static props = ['message', 'size?'];
// Đoạn mã này chỉ định nghĩa rằng Component có hai props là message và size, trong đó size là tùy chọn. Các prop message là bắt buộc, trong khi size có thể được truyền vào hoặc không. Tuy nhiên, không có thông tin về kiểu và tính hợp lệ của các prop được chỉ định.

// static props = {
//     messageIds: {type: Array, element: Number},  // list of number
//     otherArr: {type: Array},   // just array. no validation is made on sub elements
//     otherArr2: Array,   // same as otherArr
//     someObj: {type: Object},  // just an object, no internal validation
//     someObj2: {
//       type: Object,
//       shape: {
//         id: Number,
//         name: {type: String, optional: true},
//         url: String
//       ]},    // object, with keys id (number), name (string, optional) and url (string)
//     someFlag: Boolean,     // a boolean, mandatory (even if `false`)
//     someVal: [Boolean, Date],   // either a boolean or a date
//     otherValue: true,     // indicates that it is a prop
//     kindofsmallnumber: {
//       type: Number,
//       validate: n => (0 <= n && n <= 10)
//     },
//     size: {
//       validate:  e => ["small", "medium", "large"].includes(e)
//     },
//     someId: [Number, {value: false}], // either a number or false
// };

// GOOD PRACTICES
// Một đối tượng props là một tập hợp các giá trị được truyền từ parent xuống. Do đó, chúng thuộc sở hữu của parent và không bao giờ nên được sửa đổi bởi child.
// class MyComponent extends Component {
//     constructor(parent, props) {
//       super(parent, props);
//       props.a.b = 43; // Never do that!!!
//     }
// }
// Props nên được xem như là chỉ đọc, từ quan điểm của child component. Nếu có nhu cầu sửa đổi chúng, thì yêu cầu cập nhật chúng nên được gửi đến parent (ví dụ, với một sự kiện).
// Bất kỳ giá trị nào cũng có thể được đặt trong props. Chuỗi, object, class, hoặc thậm chí là các hàm callback đều có thể được truyền vào một child component (nhưng trong trường hợp của các hàm callback, giao tiếp với sự kiện có vẻ phù hợp hơn).
