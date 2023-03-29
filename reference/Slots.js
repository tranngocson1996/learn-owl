// OVERVIEW
// Owl là một hệ thống thành phần dựa trên mẫu.Do đó, có nhu cầu để có thể tạo các thành phần chung.Ví dụ, hãy tưởng tượng một thành phần Navbar chung, hiển thị một thanh điều hướng, nhưng với một số nội dung có thể tùy chỉnh.Vì nội dung cụ thể chỉ được biết đến với người dùng của Navbar, nên tốt nhất là xác định nó trong mẫu nơi Navbar được sử dụng:

// <div>
//     <Navbar>
//         <span>Hello Owl</span>
//     </Navbar>
// </div>
// Đó chính là cách mà slot hoạt động! Trong ví dụ trên, người sử dụng thành phần Navbar chỉ định một số nội dung(ở đây, trong slot mặc định).Thành phần Navbar có thể chèn nội dung đó vào mẫu của mình ở vị trí phù hợp.Một thông tin quan trọng để lưu ý là nội dung của slot được render trong ngữ cảnh cha, không phải trong thanh điều hướng.Vì vậy, nó có thể truy cập các giá trị và phương thức từ thành phần cha.
// Dưới đây là cách định nghĩa thành phần Navbar, với chỉ thị t - slot:
// <div class="navbar">
//     <t t-slot="default"/>
//     <ul>
//     <!-- phần còn lại của thanh điều hướng ở đây -->
//     </ul>
// </div>

// NAMED SLOTS
// slot tùy chỉnh rất hữu ích, nhưng đôi khi, chúng ta có thể cần nhiều hơn một slot. Đó chính là lý do tại sao slot được đặt tên! Ví dụ, giả sử chúng ta triển khai một thành phần InfoBox hiển thị một tiêu đề và một số nội dung cụ thể. Mẫu của nó có thể nhìn như thế này:
// <div class="info-box">
//     <div class="info-box-title">
//         <t t-slot="title"/>
//         <span class="info-box-close-button" t-on-click="close">X</span>
//     </div>
//     <div class="info-box-content">
//         <t t-slot="content"/>
//     </div>
// </div>
// Và người dùng có thể sử dụng nó với chỉ thị t-set-slot:
// <InfoBox>
//     <t t-set-slot="title">
//     Specific Title. It could be html also.
//     </t>
//     <t t-set-slot="content">
//     <!-- some template here, with html, events, whatever -->
//     </t>
// </InfoBox>

// RENDERING CONTEXT
// Nội dung của các slot được render với ngữ cảnh render tương ứng với nơi nó được xác định chứ không phải vị trí nó được đặt. Điều này cho phép người dùng xác định các trình xử lý sự kiện sẽ được liên kết với thành phần chính xác (thông thường là ông nội của nội dung slot).

// DEFAULT SLOT
// Tất cả các phần tử bên trong thành phần mà không phải là một slot có tên sẽ được xử lý như là một phần của nội dung của slot mặc định. Ví dụ:
// <div t-name="Parent">
//   <Child>
//     <span>some content</span>
//   </Child>
// </div>

// <div t-name="Child">
//   <t t-slot="default"/>
// </div>

// Một người dùng có thể kết hợp slot mặc định và slot có tên:
// <div>
//   <Child>
//     default content
//     <t t-set-slot="footer">
//       content for footer slot here
//     </t>
//   </Child>
// </div>

// DEFAULT CONTENT
// slot có thể xác định một nội dung mặc định, trong trường hợp cha không xác định chúng:
// <div t-name="Parent">
//   <Child/>
// </div>

// <span t-name="Child">
//   <t t-slot="default">default content</t>
// </span>
// <!-- will be rendered as: <div><span>default content</span></div> -->

// DYNAMIC SLOTS
// Chỉ thị t-slot thực sự có thể sử dụng bất kỳ biểu thức nào, sử dụng nội suy chuỗi:
// <t t-slot="{{current}}" /> 
// Điều này sẽ đánh giá biểu thức hiện tại và chèn slot tương ứng vào vị trí của chỉ thị t-slot.

// SLOTS AND PROPS
// Một cách nào đó, slot gần như giống một prop: chúng xác định một số thông tin để chuyển đến thành phần con. Để làm cho nó có thể sử dụng và chuyển nó xuống các thành phần con, Owl thực sự xác định một prop đặc biệt có tên slots chứa tất cả thông tin slot được đưa cho thành phần. Nó nhìn như thế này:
// { slotName_1: slotInfo_1, ..., slotName_m: slotInfo_m }
// Vì vậy, một thành phần có thể chuyển slot của nó đến một thành phần con như thế này:
// <Child slots="props.slots"/>

// SLOT PARAMS
// Đối với các trường hợp sử dụng nâng cao, có thể cần phải chuyển thêm thông tin đến một slot. Điều này có thể được thực hiện bằng cách cung cấp các cặp key/value bổ sung cho chỉ thị t-set-slot. Sau đó, thành phần chung có thể đọc chúng trong prop slot của nó.
// Ví dụ, đây là cách triển khai một thành phần Notebook (một thành phần với nhiều trang và thanh tab, chỉ render trang hoạt động hiện tại và mỗi trang có một tiêu đề).

// class Notebook extends Component {
//     static template = xml`
//       <div class="notebook">
//         <div class="tabs">
//           <t t-foreach="tabNames" t-as="tab" t-key="tab_index">
//             <span t-att-class="{active:tab_index === activeTab}" t-on-click="() => state.activeTab=tab">
//               <t t-esc="props.slots[tab].title"/>
//             </span>
//           </t>
//         </div>
//         <div class="page">
//           <t t-slot="{{currentSlot}}"/>
//         </div>
//       </div>`;
  
//     setup() {
//       this.state = useState({ activeTab: 0 });
//       this.tabNames = Object.keys(this.props.slots);
//     }
  
//     get currentSlot() {
//       return this.tabNames[this.state.activeTab];
//     }
// }

// Lưu ý cách một người dùng có thể đọc giá trị tiêu đề cho mỗi slot. Đây là cách mà một người dùng có thể sử dụng thành phần Notebook này:
// <Notebook>
//   <t t-set-slot="page1" title="'Page 1'">
//     <div>this is in the page 1</div>
//   </t>
//   <t t-set-slot="page2" title="'Page 2'" hidden="somevalue">
//     <div>this is in the page 2</div>
//   </t>
// </Notebook>
// Tham số slot hoạt động như các props bình thường, vì vậy một người dùng có thể sử dụng hậu tố .bind để ràng buộc một hàm nếu cần.

// SLOT SCOPES
// Đối với các loại trường hợp sử dụng nâng cao khác, nội dung của một slot có thể phụ thuộc vào một số thông tin cụ thể cho thành phần chung. Điều này ngược lại với các tham số slot.
// Để giải quyết các loại vấn đề này, người dùng có thể sử dụng chỉ thị t-slot-scope cùng với chỉ thị t-set-slot. Điều này xác định tên của một biến có thể truy cập tất cả mọi thứ được đưa ra bởi thành phần con:

// <MyComponent>
//     <t t-set-slot="foo" t-slot-scope="scope">
//         content
//         <t t-esc="scope.bool"/>
//         <t t-esc="scope.num"/>
//     </t>
// </MyComponent>

// Và thành phần con bao gồm slot có thể cung cấp các giá trị như thế này:
// <t t-slot="foo" bool="other_var" num="5">
    
// hoặc như thế này:
// <t t-slot="foo" t-props="someObject">

// Trong trường hợp của slot mặc định, bạn có thể khai báo phạm vi slot trực tiếp trên chính thành phần chung:
// <MyComponent t-slot-scope="scope">
//     content
//     <t t-esc="scope.bool"/>
//     <t t-esc="scope.num"/>
// </MyComponent>
// Giá trị slot hoạt động giống như các props bình thường, vì vậy một người dùng có thể sử dụng hậu tố .bind để ràng buộc một hàm nếu cần.
