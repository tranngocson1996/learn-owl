// OVERVIEW
// Các hooks được phổ biến bởi React như một cách để giải quyết các vấn đề sau đây:
//     Giúp tái sử dụng logic có trạng thái giữa các thành phần.
//     Giúp tổ chức mã theo tính năng trong các thành phần phức tạp.
//     Sử dụng trạng thái trong các thành phần hàm mà không cần viết một lớp.
// Các hooks của Owl có cùng mục đích, trừ khi chúng hoạt động với các thành phần lớp (lưu ý: hooks của React không hoạt động với các thành phần lớp, và có thể do đó, có một hiểu lầm rằng hooks đối lập với lớp. Điều này hoàn toàn không đúng, như được thể hiện bởi các hooks của Owl).

// Các hooks hoạt động tuyệt vời với các thành phần Owl: chúng giải quyết các vấn đề được đề cập trên, và đặc biệt, chúng là cách hoàn hảo để làm cho thành phần của bạn có tính phản ứng.

// THE HOOK RULE
// Chỉ có một quy tắc: mọi hook cho một thành phần phải được gọi trong phương thức setup, hoặc trong các trường lớp:

// ok
// class SomeComponent extends Component {
//     state = useState({ value: 0 });
// }

// also ok
// class SomeComponent extends Component {
//     setup() {
//     this.state = useState({ value: 0 });
//     }
// }

// not ok: this is executed after the constructor is called
// class SomeComponent extends Component {
//     async willStart() {
//     this.state = useState({ value: 0 });
//     }
// }

// LIFE_CYCLE HOOKS
// onWillStart async, trước khi lần đầu tiên được render
// onWillRender chỉ trước khi thành phần được render
// onRendered chỉ sau khi thành phần được render
// onMounted chỉ sau khi thành phần được render và được thêm vào DOM
// onWillUpdateProps async, trước khi props được cập nhật
// onWillPatch chỉ trước khi DOM được patch
// onPatched chỉ sau khi DOM được patch
// onWillUnmount chỉ trước khi xóa thành phần khỏi DOM
// onWillDestroy chỉ trước khi thành phần bị hủy
// onError bắt và xử lý lỗi (xem trang xử lý lỗi)

// Trong Owl, các hook vòng đời được sử dụng để thực hiện các tác vụ nhất định tại các thời điểm phù hợp trong vòng đời của một thành phần. Các hook này đều có tính năng và mục đích riêng, và được sử dụng để thực hiện các tác vụ như khởi tạo dữ liệu, cập nhật giao diện người dùng và giải phóng tài nguyên.


// ORTHER HOOKS

// useState:
// Hook useState là hook quan trọng nhất cho các thành phần Owl: đây là những gì cho phép một thành phần có tính phản ứng, để phản ứng với các thay đổi trạng thái.
// Hook useState phải được cung cấp một đối tượng hoặc một mảng, và sẽ trả về một phiên bản được quan sát của nó (sử dụng một Proxy).

// const { useState, Component } = owl;

// class Counter extends Component {
//   static template = xml`
//     <button t-on-click="increment">
//         Click Me! [<t t-esc="state.value"/>]
//     </button>`;

//   state = useState({ value: 0 });

//   increment() {
//     this.state.value++;
//   }
// }
// Quan trọng nhất là phải nhớ hook useState chỉ hoạt động với đối tượng hoặc mảng. Điều này là cần thiết, vì Owl cần phản ứng với thay đổi trạng thái.

// useRef:
// Hook useRef trong Owl rất hữu ích khi chúng ta cần tương tác với một phần tử hoặc giá trị cụ thể bên trong một thành phần được render bởi Owl. Để lấy tham chiếu đến một phần tử DOM trong Owl, chúng ta có thể sử dụng chỉ thị t-ref trong mẫu HTML. Hook useRef sau đó được sử dụng để lấy tham chiếu đến phần tử bằng cách truyền giá trị t-ref làm đối số.
// <div>
//     <input t-ref="someDiv"/>
//     <span>hello</span>
// </div>
// Trong ví dụ này, chúng ta có thể sử dụng hook useRef để lấy tham chiếu đến cả phần tử div và một thành phần con trong một thành phần cha:
// class Parent extends Component {
//     inputRef = useRef("someComponent");

//     someMethod() {
//     here, if component is mounted, refs are active:
//     - this.inputRef.el is the input HTMLElement
//     }
// }

// Đúng, như trong ví dụ trên, thực thể HTMLElement thực sự được truy cập thông qua thuộc tính el. Khi chúng ta sử dụng hook useRef để lấy tham chiếu đến một phần tử DOM, đối tượng trả về chứa một thuộc tính current và một thuộc tính el. Thuộc tính current chứa tham chiếu đến phần tử DOM hiện tại, trong khi thuộc tính el chứa đối tượng HTMLElement tương ứng. Chúng ta có thể sử dụng thuộc tính el để truy cập các phương thức và thuộc tính của phần tử DOM.
// Thực thể HTMLElement thực sự được truy cập thông qua thuộc tính el. Khi chúng ta sử dụng hook useRef để lấy tham chiếu đến một phần tử DOM, đối tượng trả về chứa một thuộc tính current và một thuộc tính el. Thuộc tính current chứa tham chiếu đến phần tử DOM hiện tại, trong khi thuộc tính el chứa đối tượng HTMLElement tương ứng. Chúng ta có thể sử dụng thuộc tính el để truy cập các phương thức và thuộc tính của phần tử DOM
// Chỉ thị t-ref cũng chấp nhận các giá trị động với việc nội suy chuỗi (giống như các chỉ thị t-attf- và t-component). Ví dụ:
// <div t-ref="component_{{someCondition ? '1' : '2'}}"/>

// Ở đây, các tham chiếu cần được đặt như sau:
// this.ref1 = useRef("component_1");
// this.ref2 = useRef("component_2");

// Đối tượng tham chiếu chỉ được đảm bảo hoạt động trong khi thành phần cha được gắn vào DOM. Nếu không phải như vậy, truy cập đến thuộc tính el hoặc comp của đối tượng tham chiếu sẽ trả về giá trị null.
// Điều này có nghĩa là khi thành phần cha bị xóa khỏi DOM, các đối tượng tham chiếu sẽ không còn có tham chiếu đến các phần tử DOM hoặc thành phần con tương ứng. Do đó, nếu chúng ta cố gắng truy cập các thuộc tính el hoặc comp của đối tượng tham chiếu sau khi thành phần cha bị xóa khỏi DOM, chúng ta sẽ nhận được giá trị null.
// Để tránh lỗi này, chúng ta có thể sử dụng một số phương pháp như kiểm tra xem đối tượng tham chiếu có tồn tại trước khi truy cập thuộc tính el hoặc comp, hoặc sử dụng các hàm gỡ bỏ sự kiện để loại bỏ các đối tượng tham chiếu khi thành phần cha bị xóa khỏi DOM.
// Ví dụ, chúng ta có thể sử dụng hàm onBeforeUnmount để loại bỏ các đối tượng tham chiếu khi thành phần cha bị xóa khỏi DOM:

// <template>
//   <div t-ref="myDiv" @click="handleClick">
//     <SubComponent t-ref="mySubComponent" />
//   </div>
// </template>

// <script>
// import { defineComponent, onBeforeUnmount, useRef } from '@owl/extend';
// import SubComponent from './SubComponent';

// export default defineComponent({
//   components: { SubComponent },

//   setup() {
//     const myDiv = useRef('myDiv');
//     const mySubComponent = useRef('mySubComponent');

//     const handleClick = () => {
//       console.log(myDiv.current);
//       console.log(mySubComponent.current);
//     };

//     onBeforeUnmount(() => {
//       myDiv.current = null;
//       mySubComponent.current = null;
//     });

//     return {
//       handleClick,
//     };
//   },
// });
// </script>
// Trong ví dụ trên, chúng ta sử dụng onBeforeUnmount để loại bỏ các đối tượng tham chiếu myDiv và mySubComponent khi thành phần cha bị xóa khỏi DOM. Điều này đảm bảo rằng chúng ta không còn truy cập vào các thuộc tính el hoặc comp của các đối tượng tham chiếu sau khi thành phần cha bị xóa khỏi DOM.

// useSubEnv and useChildSubEnv
// useSubEnv và useChildSubEnv là hai hook trong Owl cho phép chúng ta tạo ra một môi trường con hoặc con cháu từ môi trường chính của ứng dụng. Điều này cho phép chúng ta chia sẻ thông tin chung giữa các thành phần trong một phần cây nhất định.
// useChildSubEnv là một hook rất hữu ích khi chúng ta muốn tạo ra một môi trường con cháu để chia sẻ thông tin giữa các thành phần con trong một thành phần cha cụ thể.
// Ví dụ, nếu chúng ta có một thành phần hiển thị biểu mẫu, có thể chúng ta muốn chia sẻ một đối tượng mô hình với tất cả các thành phần con, nhưng không chia sẻ với toàn bộ ứng dụng. Đây là lúc mà useChildSubEnv có thể hữu ích: nó cho phép một thành phần thêm thông tin vào môi trường một cách mà chỉ các thành phần con của nó có thể truy cập.

// class FormComponent extends Component {
//   setup() {
//     const model = makeModel();
    // model will be available on this.env for this component and all children
//     useSubEnv({ model });
    // someKey will be available on this.env for all children
//     useChildSubEnv({ someKey: "value" });
//   }
// }

// Đây là hai hooks hỗ trợ trong framework Owl cho phép bạn thêm các cặp key-value mới vào đối tượng môi trường và truyền chúng xuống các thành phần con.
// Hook useSubEnv nhận một đối tượng làm đối số, chứa các cặp key-value mà bạn muốn thêm vào môi trường. Hook này tạo ra một đối tượng môi trường mới với thông tin mới và gán nó cho chính nó và tất cả các thành phần con. Đối tượng môi trường mới được đóng băng để ngăn chặn bất kỳ sửa đổi không mong muốn nào.
// Dưới đây là một ví dụ về cách sử dụng useSubEnv:

// import { useSubEnv } from "@odoo/owl";

// function MyComponent(props, env) {
//   useSubEnv({ myKey: "myValue" });

//   return <ChildComponent />;
// }
// Trong ví dụ này, chúng ta sử dụng hook useSubEnv để thêm một cặp key-value mới vào đối tượng môi trường. Key là "myKey" và value là "myValue". Đối tượng môi trường mới này được truyền xuống tất cả các thành phần con.
// Hook useChildSubEnv cũng nhận một đối tượng làm đối số, chứa các cặp key-value mà bạn muốn thêm vào môi trường. Tuy nhiên, hook này chỉ gán đối tượng môi trường mới cho tất cả các thành phần con, không phải cho chính nó. Đối tượng môi trường mới cũng được đóng băng để ngăn chặn bất kỳ sửa đổi không mong muốn nào.
// Dưới đây là một ví dụ về cách sử dụng useChildSubEnv:

// import { useChildSubEnv } from "@odoo/owl";

// function MyComponent(props, env) {
//   useChildSubEnv({ myKey: "myValue" });

//   return <ChildComponent />;
// }
// Trong ví dụ này, chúng ta sử dụng hook useChildSubEnv để thêm một cặp key-value mới vào đối tượng môi trường. Key là "myKey" và value là "myValue". Đối tượng môi trường mới này được truyền xuống tất cả các thành phần con, nhưng không phải cho chính nó.
// Cả hai hook này đều có thể được gọi một số lần tùy ý, và đối tượng môi trường sẽ được cập nhật tương ứng.

// useExternalListener
// Hook useExternalListener giúp giải quyết một vấn đề rất phổ biến: thêm và xóa trình nghe trên một mục tiêu nào đó mỗi khi một thành phần được lắp đặt/loại bỏ. Ví dụ, một menu thả xuống (hoặc phần tử cha của nó) có thể cần lắng nghe sự kiện nhấp chuột trên cửa sổ để đóng:

// useExternalListener(window, "click", this.closeMenu);

// Ở đây, chúng ta sử dụng hook useExternalListener để thêm một trình nghe cho sự kiện nhấp chuột trên cửa sổ. Đối số đầu tiên là mục tiêu mà chúng ta muốn lắng nghe sự kiện (ở đây là cửa sổ). Đối số thứ hai là tên của sự kiện (ở đây là "click"). Đối số thứ ba là hàm xử lý sự kiện (ở đây là this.closeMenu).
// Khi thành phần được lắp đặt, trình nghe sự kiện này sẽ được thêm vào mục tiêu, và khi thành phần bị loại bỏ, trình nghe sự kiện này sẽ được xóa khỏi mục tiêu. Nhờ đó, chúng ta không cần phải quản lý việc thêm/xóa các trình nghe sự kiện một cách thủ công trong các phương thức componentDidMount và componentWillUnmount nữa.

// useComponent
// Hook useComponent là một khối xây dựng hữu ích cho một số hooks tùy chỉnh, có thể cần một tham chiếu đến thành phần gọi chúng.

// function useSomething() {
//   const component = useComponent();
  // bây giờ, component được liên kết với phiên bản của thành phần hiện tại
// }

// Ở đây, chúng ta sử dụng hook useComponent để lấy tham chiếu đến phiên bản của thành phần hiện tại. Chúng ta có thể sử dụng tham chiếu này để thực hiện các tác vụ tùy chỉnh hoặc truy cập các thuộc tính của thành phần trong các hooks tùy chỉnh khác.
// Vì hook useComponent trả về tham chiếu đến phiên bản của thành phần hiện tại, nó chỉ hoạt động trong các thành phần chứa nó. Nếu bạn cần truy cập đến thành phần khác trong ứng dụng của bạn, hãy sử dụng các cách tiếp cận khác như truyền các props hoặc sử dụng một hàm mô-đun để truy cập vào các thành phần khác.

// useEnv
// Hook useEnv là một khối xây dựng hữu ích cho một số hooks tùy chỉnh, có thể cần một tham chiếu đến env của thành phần gọi chúng.

// function useSomething() {
//   const env = useEnv();
  // bây giờ, env được liên kết với env của thành phần hiện tại
// }

// Ở đây, chúng ta sử dụng hook useEnv để lấy tham chiếu đến env của thành phần hiện tại. Chúng ta có thể sử dụng tham chiếu này để truy cập các thuộc tính và phương thức của env trong các hooks tùy chỉnh khác.

// useEffect
// Hook useEffect sẽ chạy một callback khi một thành phần được lắp đặt và được vá, và sẽ chạy một hàm dọn dẹp trước khi vá và trước khi hủy thành phần (chỉ nếu một số phụ thuộc đã thay đổi).
// Nó có gần như cùng API với hook useEffect của React, ngoại trừ rằng các phụ thuộc được định nghĩa bằng một hàm thay vì chỉ là các phụ thuộc.
// Hook useEffect có hai hàm: hàm hiệu ứng và hàm phụ thuộc. Hàm hiệu ứng thực hiện một số tác vụ và trả về (tuỳ chọn) một hàm dọn dẹp. Hàm phụ thuộc trả về một danh sách các phụ thuộc, các phụ thuộc này được truyền làm tham số trong hàm hiệu ứng. Nếu bất kỳ phụ thuộc nào thay đổi, thì hiệu ứng hiện tại sẽ được dọn dẹp và thực thi lại.
// Ví dụ không có phụ thuộc nào:

// useEffect(
//   () => {
//     window.addEventListener("mousemove", someHandler);
//     return () => window.removeEventListener("mousemove", someHandler);
//   },
//   () => []
// );
// Trong ví dụ trên, danh sách phụ thuộc là rỗng, vì vậy hiệu ứng chỉ được dọn dẹp khi thành phần bị huỷ.
// Nếu bỏ qua hàm phụ thuộc, thì hiệu ứng sẽ được dọn dẹp và chạy lại sau mỗi lần vá.
// Dưới đây là một ví dụ khác, về cách triển khai một hook useAutofocus với hook useEffect:

// function useAutofocus(name) {
//     let ref = useRef(name);
//     useEffect(
//     (el) => el && el.focus(),
//     () => [ref.el]
//     );
// }
// Hook này lấy tên của một chỉ thị t-ref hợp lệ, nó nên có mặt trong template. Sau đó, hook kiểm tra xem khi nào thành phần được lắp đặt hoặc vá nếu tham chiếu không hợp lệ, và trong trường hợp này, nó sẽ tập trung vào phần tử node. Hook này có thể được sử dụng như sau:

// import { useAutofocus } from "./useAutofocus";

// class SomeComponent extends Component {
//     static template = xml`
//     <div>
//         <input />
//         <input t-ref="myinput"/>
//     </div>`;

//     setup() {
//     useAutofocus("myinput");
//     }
// }
// Ở đây, chúng ta tạo một thành phần SomeComponent bằng cách sử dụng class-based component của Svelte. Để sử dụng hook useAutofocus, chúng ta gọi nó trong phương thức setup của thành phần và truyền vào tên của tham chiếu t-ref mà chúng ta muốn tập trung. Trong ví dụ này, chúng ta đang sử dụng tham chiếu myinput.
// Để sử dụng hook useAutofocus, chúng ta cần import nó từ module của chúng ta, giống như trong ví dụ trên. Hook useAutofocus phải được triển khai bên trong module useAutofocus.js hoặc trong một module khác mà chúng ta import vào.

// EXAMPLE: MOUSE POSITION
// Đây là một ví dụ cổ điển về hook để theo dõi vị trí chuột.

// import { useState, onWillDestroy, Component } from "owl";

// function useMouse() {
//   const position = useState({ x: 0, y: 0 });

//   function update(e) {
//     position.x = e.clientX;
//     position.y = e.clientY;
//   }

//   window.addEventListener("mousemove", update);
//   onWillDestroy(() => {
//     window.removeEventListener("mousemove", update);
//   });

//   return position;
// }

// class Root extends Component {
//   static template = xml`<div>Mouse: <t t-esc="mouse.x"/>, <t t-esc="mouse.y"/></div>`;
//   mouse = useMouse();
// }
// Ở đây, chúng ta định nghĩa hook useMouse để theo dõi vị trí của chuột. Hook này sử dụng hook useState của Owl để định nghĩa trạng thái cho vị trí của chuột, và sử dụng một hàm công cụ để cập nhật vị trí mới.
// Chúng ta gắn kết hook useMouse với thuộc tính mouse của thành phần Root. Sau đó, chúng ta sử dụng giá trị của mouse.x và mouse.y để hiển thị vị trí chuột trong template của chúng ta.
// Chúng ta sử dụng window.addEventListener để lắng nghe sự kiện mousemove và cập nhật vị trí chuột. Chúng ta cũng sử dụng onWillDestroy để gỡ bỏ lắng nghe sự kiện mousemove khi thành phần bị huỷ bỏ.
// Lưu ý rằng chúng ta sử dụng tiền tố use cho hooks, giống như trong React. Đây chỉ là một quy ước.
