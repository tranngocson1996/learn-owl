// OVERVIEW
// Owl templates được mô tả bằng cách sử dụng QWeb specification. Nó được dựa trên định dạng XML và được sử dụng chủ yếu để tạo ra HTML. Trong OWL, các mẫu QWeb được biên dịch thành các hàm tạo ra một biểu diễn dom ảo của HTML. Ngoài ra, vì Owl là một hệ thống thành phần trực tiếp, có các chỉ thị bổ sung cụ thể cho Owl (như t-on)
// <div>
//     <span t-if="somecondition">Some string</span>
//     <ul t-else="">
//         <li t-foreach="messages" t-as="message">
//             <t t-esc="message"/>
//         </li>
//     </ul>
// </div>

// Các chỉ thị mẫu được chỉ định là các thuộc tính XML có tiền tố t-, ví dụ t-if cho điều kiện, với các phần tử và các thuộc tính khác được hiển thị trực tiếp.
// Để tránh việc hiển thị phần tử, một phần tử lưu trữ <t> cũng có sẵn, nó thực thi chỉ thị của nó nhưng không tạo ra bất kỳ đầu ra nào.
// Chúng tôi trình bày trong phần này ngôn ngữ mẫu, bao gồm các phần mở rộng cụ thể cho Owl.

// DIRECTIVES
// Để tham khảo, đây là danh sách tất cả các directive QWeb tiêu chuẩn:
// t-esc Giá trị an toàn đầu ra
// t-out Giá trị đầu ra, có thể không được tránh thoát
// t-set, t-value Thiết lập biến
// t-if, t-elif, t-else, Hiển thị theo điều kiện
// t-foreach, t-as Vòng lặp
// t-att, t-attf-, t-att- Thuộc tính động
// t-call Các mẫu con
// t-debug, t-log Gỡ lỗi
// t-translation Vô hiệu hóa dịch của một nút

// Hệ thống thành phần trong Owl yêu cầu các chỉ thị bổ sung để biểu thị các nhu cầu khác nhau. Đây là danh sách tất cả các chỉ thị cụ thể của Owl:
// t-component, t-props Xác định một thành phần con
// t-ref Thiết lập một tham chiếu đến một nút dom hoặc một thành phần con
// t-key Xác định một khóa (để giúp việc hòa giải dom ảo)
// t-on-* Xử lý sự kiện
// t-portal Cổng thông tin
// t-slot, t-set-slot, t-slot-scope Render một khe cắm
// t-model Các ràng buộc đầu vào biểu mẫu
// t-tag Render các nút với tên thẻ động

// QWEB TEMPLATE REFERENCE
// White Spaces
// Các khoảng trắng liên tiếp luôn được thu gọn thành một khoảng trắng duy nhất.
// Nếu một nút văn bản chỉ chứa khoảng trắng và xuống dòng, nó sẽ bị bỏ qua.
// Các quy tắc trên không áp dụng nếu chúng ta đang trong một thẻ <pre>.

// Expression Evaluation
// Các biểu thức QWeb là các chuỗi sẽ được xử lý vào thời gian biên dịch. Mỗi biến trong biểu thức javascript sẽ được thay thế bằng một tìm kiếm trong ngữ cảnh (vì vậy, thành phần). Ví dụ, a + b.c(d) sẽ được chuyển đổi thành:
// context["a"] + context["b"].c(context["d"]);
// Các quy tắc áp dụng cho các biểu thức QWeb:
//     1. Nó nên là một biểu thức đơn giản trả về một giá trị. Nó không thể là một lệnh.
//     <div><p t-if="1 + 2 === 3">ok</p></div>
//     là hợp lệ, nhưng đoạn mã sau đây không hợp lệ:
//     <div><p t-if="console.log(1)">NOT valid</p></div>
//     2. Nó có thể sử dụng bất cứ điều gì trong ngữ cảnh hiển thị (thường chứa các thuộc tính của thành phần):
//     <p t-if="user.birthday === today()">Happy bithday!</p>
//     là hợp lệ và sẽ đọc đối tượng người dùng từ ngữ cảnh và gọi hàm today.
//     3. Nó có thể sử dụng một vài toán tử đặc biệt để tránh sử dụng các ký hiệu như <, >, & hoặc |. Điều này hữu ích để đảm bảo rằng chúng ta vẫn viết XML hợp lệ.
//     and : &&
//     or  : ||
//     gt  : >
//     gte : >=
//     lt  : <
//     lte : <=
//     Vì vậy, ta có thể viết như sau:
//     <div><p t-if="10 + 2 gt 5">ok</p></div>

// Static Html Nodes
// Các nút HTML thông thường và bình thường được hiển thị như chính chúng:
// <div>hello</div> <!–– được hiển thị như chính nó ––>

// Outputting Data
// Chỉ thị t-esc là cần thiết mỗi khi bạn muốn thêm một biểu thức văn bản động trong một mẫu. Văn bản được thoát để tránh các vấn đề bảo mật.
// <p><t t-esc="value"/></p>
// Nếu giá trị của value được thiết lập là 42 trong ngữ cảnh hiển thị, thì sẽ được hiển thị như sau:
// <p>42</p>
// Chỉ thị t-out là gần giống với t-esc, nhưng có thể không có trọng tâm. Khác biệt là giá trị nhận được bởi chỉ thị t-out chỉ không được thoát nếu nó đã được đánh dấu như vậy, sử dụng hàm tiện ích đánh dấu:
// const { markup, Component, xml } = owl;
// class SomeComponent extends Component {
//   static template = xml`
//     <t t-out="value1"/>
//     <t t-out="value2"/>`;

//   value1 = "<div>some text 1</div>";
//   value2 = markup("<div>some text 2</div>");
// }
// value1 sẽ được hiển thị như là một chuỗi văn bản thô, trong khi value2 sẽ được hiển thị như là HTML được đánh dấu bằng cách sử dụng hàm markup.
// Chỉ thị t-out đầu tiên sẽ hoạt động như một chỉ thị t-esc, điều đó có nghĩa là nội dung của giá trị 1 sẽ được thoát. Tuy nhiên, vì value2 đã được đánh dấu là một markup, nó sẽ được chèn vào như HTML được đánh dấu.

// Setting Variables
// QWeb cho phép tạo biến từ bên trong mẫu, để memoize một tính toán (sử dụng nó nhiều lần), đặt tên rõ ràng hơn cho một phần dữ liệu, ...
// Điều này được thực hiện thông qua chỉ thị t-set, nhận tên của biến cần tạo. Giá trị để thiết lập có thể được cung cấp theo hai cách:
//     1. Một thuộc tính t-value chứa một biểu thức và kết quả của nó sẽ được thiết lập
//     <t t-set="foo" t-value="2 + 1"/>
//     <t t-esc="foo"/>
//     sẽ in ra số 3. Lưu ý rằng việc đánh giá được thực hiện vào thời gian hiển thị, không phải là trong thời gian biên dịch.
//     2. Nếu không có thuộc tính t-value, phần thân của nút được lưu và giá trị của nó được thiết lập như giá trị của biến
//     <t t-set="foo">
//         <li>ok</li>
//     </t>
//     <t t-esc="foo"/>
//     sẽ tạo ra &lt;li&gt;ok&lt;/li&gt; (nội dung được thoát ra vì chúng ta đã sử dụng chỉ thị t-esc).
// Chỉ thị t-set hoạt động giống như một biến thông thường trong hầu hết các ngôn ngữ lập trình. Nó được phạm vi từ vựng (các nút trong mẫu được coi là các phạm vi con), có thể bị che khuất, ...

// Conditionals
// Chỉ thị t-if hữu ích để hiển thị điều gì đó theo điều kiện. Nó đánh giá biểu thức được đưa ra dưới dạng giá trị thuộc tính, sau đó thực hiện hành động tương ứng.
// <div>
//     <t t-if="condition">
//         <p>ok</p>
//     </t>
// </div>
// Phần tử sẽ được hiển thị nếu điều kiện (được đánh giá với ngữ cảnh hiển thị hiện tại) là đúng
// <div>
//     <p>ok</p>
// </div>
// Nhưng nếu điều kiện là sai, nó sẽ bị xóa khỏi kết quả
// <div>
// </div>
// Việc hiển thị có điều kiện áp dụng cho người mang chỉ thị, không nhất thiết phải là <t>
// <div>
//     <p t-if="condition">ok</p>
// </div>
// sẽ cho kết quả giống như ví dụ trước đó.
// Các chỉ thị điều kiện phân nhánh phụ t-elif và t-else cũng có sẵn:
// <div>
//     <p t-if="user.birthday == today()">Happy bithday!</p>
//     <p t-elif="user.login == 'root'">Welcome master!</p>
//     <p t-else="">Welcome!</p>
// </div>

// Dynamic Attributes
// Người dùng có thể sử dụng chỉ thị t-att- để thêm các thuộc tính động. Sử dụng chính của nó là đánh giá một biểu thức (vào thời gian hiển thị) và ràng buộc một thuộc tính với kết quả của nó:
// Ví dụ, nếu chúng ta có id được thiết lập là 32 trong ngữ cảnh hiển thị,
// <div t-att-data-action-id="id"/> <!-- kết quả: <div data-action-id="32"></div> -->
// Nếu một biểu thức đánh giá đến giá trị falsy, nó sẽ không được thiết lập:
// <div t-att-foo="false"/> <!-- kết quả: <div></div> -->
// Đôi khi, việc định dạng một thuộc tính với chuỗi nội suy là thuận tiện. Trong trường hợp đó, chỉ thị t-attf- có thể được sử dụng. Nó hữu ích khi chúng ta cần pha trộn các phần tử cố định và động, chẳng hạn như các lớp css. Các phần tử động có thể được chỉ định bằng cách sử dụng {{...}} hoặc #{...}:
// <div t-attf-foo="a {{value1}} is #{value2} of {{value3}} ]"/>
// <!-- kết quả nếu giá trị được đặt là 1,2 và 3: <div foo="a 0 is 1 of 2 ]"></div> -->
// Nếu chúng ta cần tên thuộc tính hoàn toàn động, thì có một chỉ thị bổ sung: t-att, chấp nhận một đối tượng (với các khóa ánh xạ đến giá trị của chúng) hoặc một cặp [khóa, giá trị]. Ví dụ:
// <div t-att="{'a': 1, 'b': 2}"/>
// <!-- kết quả: <div a="1" b="2"></div> -->
// <div t-att="['a', 'b']"/>
// <!-- kết quả: <div a="b"></div> -->

// Dynamic class attribute
// Để thuận tiện, Owl hỗ trợ một trường hợp đặc biệt cho trường hợp t-att-class: người dùng có thể sử dụng một đối tượng với các khóa mô tả các lớp, và các giá trị boolean chỉ ra xem lớp có hoặc không có mặt:
// <div t-att-class="{'a': true, 'b': true}"/>
// <!-- kết quả: <div class="a b"></div> -->
// <div t-att-class="{'a b': true, 'c': true}"/>
// <!-- kết quả: <div class="a b c"></div> -->
// Lưu ý rằng nó có thể được kết hợp với thuộc tính lớp bình thường:
// <div class="a" t-att-class="{'b': true}"/>
// <!-- kết quả: <div class="a b"></div> -->

// Dynamic tag names
// Khi viết các thành phần hoặc mẫu chung, tên thẻ cụ thể cho một phần tử HTML chưa được biết trước. Trong những tình huống đó, chỉ thị t-tag là hữu ích. Nó đơn giản là đánh giá động một biểu thức để sử dụng làm tên thẻ. Mẫu:
// <t t-tag="tag">
//     <span>nội dung</span>
// </t>
// sẽ được hiển thị như <div><span>nội dung</span></div> nếu khóa ngữ cảnh tag được thiết lập thành div.

// Loops
// QWeb có một chỉ thị lặp t-foreach, nhận một biểu thức trả về bộ sưu tập cần lặp, và một tham số thứ hai t-as cung cấp tên để sử dụng cho mục hiện tại của vòng lặp:
// <t t-foreach="[1, 2, 3]" t-as="i" t-key="i">
//     <p><t t-esc="i"/></p>
// </t>
// sẽ được hiển thị như:
// <p>1</p>
// <p>2</p>
// <p>3</p>
// Tương tự như điều kiện, t-foreach áp dụng cho phần tử mang thuộc tính của chỉ thị, và
// <p t-foreach="[1, 2, 3]" t-as="i" t-key="i">
//     <t t-esc="i"/>
// </p>
// tương đương với ví dụ trước đó.
// Một khác biệt quan trọng phải được thực hiện với hành vi QWeb thông thường: Owl yêu cầu sự hiện diện của chỉ thị t-key, để có thể hòa hợp đúng cách các lần hiển thị.
// t-foreach có thể lặp lại trên một mảng (mục hiện tại sẽ là giá trị hiện tại) hoặc một đối tượng (mục hiện tại sẽ là khóa hiện tại).
// Ngoài tên được truyền qua t-as, t-foreach cung cấp một số biến khác cho các điểm dữ liệu khác nhau (lưu ý: $as sẽ được thay thế bằng tên được truyền vào t-as):
//     $as_value: giá trị lặp hiện tại, giống $as đối với danh sách và số nguyên, nhưng với đối tượng, nó cung cấp giá trị (nơi $as cung cấp khóa)
//     $as_index: chỉ số lặp hiện tại (mục đầu tiên của vòng lặp có chỉ số 0)
//     $as_first: xác định xem mục hiện tại có phải là đầu tiên của vòng lặp hay không (tương đương với $as_index == 0)
//     $as_last: xác định xem mục hiện tại có phải là cuối cùng của vòng lặp hay không (tương đương với $as_index + 1 == $as_size), yêu cầu kích thước của iteratee có sẵn.
// Những biến bổ sung này được cung cấp và tất cả các biến mới được tạo vào t-foreach chỉ có sẵn trong phạm vi của t-foreach. Nếu biến tồn tại bên ngoài ngữ cảnh của t-foreach, giá trị được sao chép vào cuối foreach vào ngữ cảnh toàn cầu.
// <t t-set="existing_variable" t-value="false"/>
// <!-- existing_variable now False -->
// <p t-foreach="Array(3)" t-as="i" t-key="i">
//     <t t-set="existing_variable" t-value="true"/>
//     <t t-set="new_variable" t-value="true"/>
//     <!-- existing_variable and new_variable now true -->
// </p>
// <!-- existing_variable always true -->
// <!-- new_variable undefined -->
// Mặc dù Owl cố gắng làm cho nó có tính khai báo nhất có thể, DOM không hoàn toàn tiết lộ trạng thái của nó một cách khai báo trong cây DOM. Ví dụ, trạng thái cuộn, lựa chọn người dùng hiện tại, phần tử được tập trung hoặc trạng thái của một đầu vào không được đặt làm thuộc tính trong cây DOM. Đây là lý do tại sao chúng tôi sử dụng một thuật toán dom ảo để đảm bảo chúng tôi giữ lại nút DOM thực tế thay vì thay thế nó bằng một nút mới.
// Xem xét tình huống sau: chúng ta có một danh sách hai mục [{text: "a"}, {text: "b"}] và chúng ta hiển thị chúng trong mẫu này:
// <p t-foreach="items" t-as="item" t-key="item_index">
//     <t t-esc="item.text"/>
// </p>
// Kết quả sẽ là hai thẻ <p> với nội dung là a và b. Bây giờ, nếu chúng ta đổi chỗ chúng và hiển thị lại mẫu, Owl cần phải biết ý định là gì:
//     Owl có thực sự đổi chỗ các nút DOM,
//     hoặc Owl có giữ nguyên các nút DOM, nhưng với nội dung văn bản được cập nhật?
// Điều này có vẻ đơn giản, nhưng thực sự nó rất quan trọng. Hai khả năng này dẫn đến các kết quả khác nhau trong một số trường hợp. Ví dụ, nếu người dùng đã chọn văn bản của thẻ p đầu tiên, đổi chỗ chúng sẽ giữ nguyên lựa chọn trong khi cập nhật nội dung văn bản sẽ không giữ nguyên lựa chọn.
// Có nhiều trường hợp khác nơi điều này quan trọng: các thẻ nhập với giá trị của chúng, các lớp và hiệu ứng css, vị trí cuộn ...
// Vì vậy, chỉ thị t-key được sử dụng để đưa ra một danh tính cho một phần tử. Nó cho phép Owl hiểu nếu các phần tử khác nhau của một danh sách thực sự khác nhau hay không.
// Ví dụ trên có thể được thay đổi bằng cách thêm một ID: [{id: 1, text: "a"}, {id: 2, text: "b"}]. Sau đó, mẫu có thể trông giống như thế này:
// <p t-foreach="items" t-as="item" t-key="item.id"><t t-esc="item.text"/></p>
// Chỉ thị t-key hữu ích cho các danh sách (t-foreach). Một khóa phải là một số hoặc chuỗi duy nhất (các đối tượng sẽ không hoạt động: chúng sẽ được chuyển đổi thành chuỗi "[object Object]", mà rõ ràng không duy nhất)

// Sub Templates
// Các mẫu QWeb có thể được sử dụng để hiển thị cấp độ cao nhất, nhưng chúng cũng có thể được sử dụng từ bên trong một mẫu khác (để tránh sao chép hoặc đặt tên cho các phần của mẫu), sử dụng chỉ thị t-call:
// <div t-name="other-template">
//     <p><t t-value="var"/></p>
// </div>

// <div t-name="main-template">
//     <t t-set="var" t-value="owl"/>
//     <t t-call="other-template"/>
// </div>
// sẽ được hiển thị như là <div><p>owl</p></div>. Ví dụ này cho thấy rằng mẫu con được hiển thị với ngữ cảnh thực thi của mẫu cha. Mẫu con được nhúng thực tế vào trong mẫu chính, nhưng trong phạm vi con: các biến được định nghĩa trong mẫu con không thoát ra.
// Đôi khi, người dùng có thể muốn truyền thông tin cho mẫu con. Trong trường hợp đó, nội dung của thân chỉ thị t-call có sẵn dưới dạng một biến ma thuật đặc biệt là 0:
// <t t-name="other-template">
//     This template was called with content:
//     <t t-raw="0"/>
// </t>

// <div t-name="main-template">
//     <t t-call="other-template">
//         <em>content</em>
//     </t>
// </div>
// will result in :
// <div>
//     This template was called with content:
//     <em>content</em>
// </div>
// Điều này có thể được sử dụng để định nghĩa các biến có phạm vi trong mẫu con:
// <t t-call="other-template"> <t t-set="var" t-value="1"/> </t>
// <!-- "var" không tồn tại ở đây -->
// Chú ý: mặc định, ngữ cảnh hiển thị cho một mẫu con đơn giản là ngữ cảnh hiển thị hiện tại. Tuy nhiên, có thể hữu ích để có thể chỉ định một đối tượng cụ thể làm ngữ cảnh. Điều này có thể được thực hiện bằng cách sử dụng chỉ thị t-call-context:
// <t t-call="other-template" t-call-context="obj"/>

// Dynamic sub templates
// Chỉ thị t-call cũng có thể được sử dụng để gọi một mẫu con động, bằng cách sử dụng nội suy chuỗi. Ví dụ:
// <div t-name="main-template">
//     <t t-call="{{template}}">
//         <em>content</em>
//     </t>
// </div>
// Ở đây, tên của mẫu được lấy từ giá trị mẫu trong ngữ cảnh hiển thị của mẫu.

// Debugging
// Trong thư viện QWeb JavaScript cung cấp hai chỉ thị gỡ lỗi hữu ích:
// Chỉ thị t-debug thêm một câu lệnh debugger vào trong quá trình hiển thị mẫu:
// <t t-if="a_test">
//     <t t-debug=""/>
// </t>
// sẽ dừng thực thi nếu công cụ dev của trình duyệt được mở.
// Chỉ thị t-log có một tham số biểu thức, đánh giá biểu thức trong quá trình hiển thị và ghi kết quả của nó với console.log:
// <t t-set="foo" t-value="42"/>
// <t t-log="foo"/>
// sẽ in ra số 42 trên console.

// FRAGMENTS
// Owl 2 hỗ trợ các mẫu với một số lượng phần tử gốc tùy ý, hoặc thậm chí chỉ là một nút văn bản. Vì vậy, các mẫu sau đây đều hợp lệ:
// hello owl. This is just a text node!
// <div>hello</div>
// <div>hello</div>
// <div>ola</div>
// <div t-if="someCondition"><SomeChildComponent/></div>
// <t t-if="someCondition"><SomeChildComponent/></t>

// INLINE TEMPLATES
// Hầu hết các ứng dụng thực tế sẽ định nghĩa các mẫu của họ trong một tệp XML, để tận dụng hệ sinh thái XML và thực hiện một số xử lý bổ sung, chẳng hạn như dịch chúng. Tuy nhiên, trong một số trường hợp, việc định nghĩa mẫu trực tiếp rất tiện lợi. Để làm điều này, người dùng có thể sử dụng hàm trợ giúp xml:
// const { Component, xml } = owl;
// class MyComponent extends Component {
//   static template = xml`
//       <div>
//           <span t-if="somecondition">text</span>
//           <button t-on-click="someMethod">Click</button>
//       </div>
//   `;
//     ...
// }
// mount(MyComponent, document.body);
// Hàm này đơn giản chỉ tạo ra một chuỗi id duy nhất, đăng ký mẫu dưới id đó trong phần nội bộ của Owl, sau đó trả về id đó.

// RENDERING SVG
// Các thành phần Owl có thể được sử dụng để tạo đồ thị SVG động:
// class Node extends Component {
//     static template = xml`
//           <g>
//               <circle t-att-cx="props.x" t-att-cy="props.y" r="4" fill="black"/>
//               <text t-att-x="props.x - 5" t-att-y="props.y + 18"><t t-esc="props.node.label"/></text>
//               <t t-set="childx" t-value="props.x + 100"/>
//               <t t-set="height" t-value="props.height/(props.node.children || []).length"/>
//               <t t-foreach="props.node.children || []" t-as="child">
//                   <t t-set="childy" t-value="props.y + child_index*height"/>
//                   <line t-att-x1="props.x" t-att-y1="props.y" t-att-x2="childx" t-att-y2="childy" stroke="black" />
//                   <Node x="childx" y="childy" node="child" height="height"/>
//               </t>
//           </g>
//       `;
//     static components = { Node };
//   }
  
//   class RootNode extends Component {
//     static template = xml`
//           <svg height="180">
//               <Node node="graph" x="10" y="20" height="180"/>
//           </svg>
//       `;
//     static components = { Node };
//     graph = {
//       label: "a",
//       children: [
//         { label: "b" },
//         { label: "c", children: [{ label: "d" }, { label: "e" }] },
//         { label: "f", children: [{ label: "g" }] },
//       ],
//     };
// }
// Lớp Node và lớp RootNode được định nghĩa để tạo ra một đồ thị SVG mà mỗi nút được biểu diễn bằng một hình tròn với nhãn tương ứng. Các nút con của một nút được định vị theo chiều dọc và các đường dẫn được vẽ để kết nối nút cha và các nút con của nó. Lớp Node sử dụng chính nó như một thành phần con để hiển thị các nút con của nó.
// Lưu ý quan trọng: Owl cần thiết lập đúng không gian tên cho mỗi phần tử svg. Vì Owl biên dịch mỗi mẫu riêng lẻ, nó không thể dễ dàng xác định xem một mẫu có nên được bao gồm trong không gian tên svg hay không. Do đó, Owl phụ thuộc vào một thuật toán: nếu một thẻ là svg, g hoặc path, thì nó sẽ được coi là svg. Trong thực tế, điều này có nghĩa là mỗi thành phần hoặc mỗi mẫu con (được bao gồm với t-call) nên có một trong các thẻ này làm thẻ gốc.

// RESTRICTIONS
// Lưu ý rằng các mẫu Owl không cho phép sử dụng thẻ và/hoặc thuộc tính bắt đầu bằng chuỗi block-. Hạn chế này ngăn ngừa va chạm tên với mã code nội bộ của Owl.
// <div>
//     <block-1>this will not be accepted by Owl</block-1>
// </div>
