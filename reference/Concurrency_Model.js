// OVERVIEW
// Đúng vậy! Owl được thiết kế từ đầu với các thành phần bất đồng bộ. Điều này bắt nguồn từ các hooks lifecycle willStart và willUpdateProps. Với các hooks bất đồng bộ này, chúng ta có thể xây dựng các ứng dụng phức tạp với độ phối hợp cao.
// Chế độ đồng thời của Owl có một số lợi ích: nó cho phép hoãn việc hiển thị cho đến khi một số hoạt động bất đồng bộ hoàn tất, nó cho phép tải thư viện một cách lười biếng, trong khi vẫn giữ cho màn hình trước đó hoạt động hoàn toàn. Nó cũng tốt cho hiệu suất: Owl sử dụng nó để chỉ áp dụng kết quả của nhiều quá trình render khác nhau một lần trong một khung hình hoạt ảnh. Owl có thể hủy bỏ quá trình render không còn liên quan, khởi động lại, và tái sử dụng nó trong một số trường hợp.
// Tuy nhiên, mặc dù sử dụng đồng thời khá đơn giản (và là hành vi mặc định), bất đồng bộ là khó khăn, bởi vì nó giới thiệu một chiều thứ hai mà tăng đáng kể độ phức tạp của một ứng dụng. Phần này sẽ giải thích cách Owl quản lý sự phức tạp này, cách render đồng thời hoạt động một cách chung chung.

// RENDERING COMPONENTS
// Từ "rendering" có chút mơ hồ, cho nên hãy giải thích cách chính xác hơn về quá trình mà các thành phần Owl được hiển thị trên màn hình.
// Khi một thành phần được gắn kết hoặc cập nhật, một quá trình render mới được bắt đầu. Nó bao gồm hai giai đoạn: rendering ảo và patching.

// Giai đoạn rendering ảo:
// Đây là giai đoạn đại diện cho quá trình render một mẫu trong bộ nhớ, tạo ra một biểu diễn ảo của HTML cho thành phần mong muốn. Kết quả của giai đoạn này là một DOM ảo.
// Nó là bất đồng bộ: mỗi thành phần con cần được tạo ra (vì vậy, willStart cần được gọi), hoặc được cập nhật (điều này được thực hiện với phương thức willUpdateProps). Đây hoàn toàn là một quá trình đệ quy: một thành phần là gốc của một cây thành phần, và mỗi thành phần con cần được render (ảo).

// Patching:
// Sau khi quá trình render hoàn tất, nó sẽ được áp dụng vào khung hình hoạt ảnh tiếp theo. Điều này được thực hiện đồng bộ: toàn bộ cây thành phần được patch lên DOM thực.
// Vì patching được thực hiện đồng bộ, việc hiển thị trên màn hình sẽ bị gián đoạn nếu chỉ có một số thành phần được patch, và các thành phần khác vẫn đang được render ảo. Do đó, Owl sử dụng chế độ đồng thời để đảm bảo rằng toàn bộ cây thành phần được áp dụng cùng một lúc, giảm thiểu sự gián đoạn và tăng hiệu suất.
// Tổng thể, quá trình patching là quá trình áp dụng DOM ảo vào DOM thực và được thực hiện đồng bộ trong Owl.

// SEMANTICS
// Ở đây, chúng tôi đưa ra một mô tả không chính thức về cách các thành phần được tạo / cập nhật trong một ứng dụng. Ở đây, danh sách có thứ tự mô tả các hành động được thực hiện tuần tự, danh sách định dạng bullet mô tả các hành động được thực hiện song song.
// Kịch bản 1: rendering ban đầu Giả sử chúng ta muốn render cây thành phần sau đây:
//  A
// / \
// B   C
//    / \
//   D   E
// Sau đây là những gì xảy ra khi chúng ta mount thành phần gốc (với một số mã như app.mount(document.body)).
// 1. Phương thức willStart được gọi trên A
// 2. Khi nó hoàn thành, template A được render
//     Thành phần B được tạo
//         Phương thức willStart được gọi trên B
//         Khi nó hoàn thành, template B được render
//     Thành phần C được tạo
//         Phương thức willStart được gọi trên C
//         Khi nó hoàn thành, template C được render
//             Thành phần D được tạo
//                 Phương thức willStart được gọi trên D
//                 Khi nó hoàn thành, template D được render
//             Thành phần E được tạo
//                 Phương thức willStart được gọi trên E
//                 Khi nó hoàn thành, template E được render
// 3. Tất cả các thành phần được patch vào một phần tử DOM tách biệt, theo thứ tự sau: E, D, C, B, A (vì vậy cây DOM đầy đủ được tạo ra trong một lần duyệt).
// 4. Phần tử gốc của thành phần A được thêm vào thực thể document.body
// 5. Phương thức mounted được gọi đệ quy trên tất cả các thành phần theo thứ tự sau: E, D, C, B, A

// Kịch bản 2: cập nhật một thành phần. Giả sử người dùng nhấp vào một nút bất kỳ trong C, và điều này dẫn đến một cập nhật trạng thái, được giả định là:
// cập nhật D,
// xóa E,
// thêm thành phần mới F.
// Vậy, cây thành phần sẽ trông như thế này:
//  A
// / \
// B   C
//    / \
//   D   F
// 1. Do một thay đổi trạng thái, phương thức render được gọi trên C.
// 2. Template C được render lại
//     Thành phần D được cập nhật
//         Phương thức willUpdateProps được gọi trên D
//         Khi nó hoàn thành, template D được render lại
//     Thành phần F được tạo
//         Phương thức willStart được gọi trên F
//         Khi nó hoàn thành, template F được render
// 3. Các hook willPatch được gọi đệ quy trên các thành phần C, D (không được gọi trên F, vì nó chưa được mount)
// 4. Các thành phần F, D được patch theo thứ tự đó.
// 5. Thành phần C được patch, gây ra các hook đệ quy sau
//     willUnmount hook trên E
//     Thành phần E bị hủy
// 6. mounted hook được gọi trên F, các hook patch được gọi trên D, C

// Các thẻ là các trợ giúp nhỏ giúp việc viết các template trên cùng một dòng trở nên dễ dàng hơn. Hiện tại, chỉ có một thẻ có sẵn: xml.

// ASYNCHRONOUS RENDERING
// Làm việc với mã bất đồng bộ luôn thêm rất nhiều độ phức tạp cho một hệ thống. Khi các phần khác nhau của một hệ thống đang hoạt động cùng một lúc, người phát triển cần suy nghĩ cẩn thận về tất cả các tương tác có thể xảy ra. Rõ ràng, điều này cũng đúng với các thành phần Owl.
// Có hai vấn đề khác nhau thường gặp với mô hình rendering bất đồng bộ của Owl:
//     Bất kỳ thành phần nào đều có thể làm chậm quá trình rendering (ban đầu và sau đó) của toàn bộ ứng dụng.
//     Đối với một thành phần cụ thể, có hai tình huống độc lập sẽ kích hoạt một quá trình rendering bất đồng bộ: thay đổi trạng thái hoặc thay đổi props. Những thay đổi này có thể được thực hiện vào thời điểm khác nhau, và Owl không có cách nào để biết cách hòa hợp các quá trình rendering kết quả đó.

// Dưới đây là một số lời khuyên về cách làm việc với các thành phần bất đồng bộ:
//     Giảm thiểu việc sử dụng các thành phần bất đồng bộ!
//     Lazy loading các thư viện bên ngoài là một trường hợp sử dụng tốt cho việc rendering bất đồng bộ. Điều này thường khá tốt, vì chúng ta có thể giả định rằng nó chỉ mất một phần nhỏ của một giây, và chỉ xảy ra một lần.

// Tuy nhiên, khi sử dụng các thành phần bất đồng bộ, cần chú ý đến các vấn đề sau:
//     Hạn chế sử dụng các thành phần bất đồng bộ trong các phần quan trọng của ứng dụng, ví dụ như trang chủ của ứng dụng hoặc các trang chính.
//     Cẩn thận khi sử dụng các thành phần bất đồng bộ với các thành phần khác trong ứng dụng. Việc sử dụng các thành phần bất đồng bộ có thể gây ra các vấn đề liên quan đến thời gian chờ đợi, hiệu suất và đồng bộ hóa.
//     Sử dụng các phương pháp tối ưu hóa hiệu suất để giảm thiểu các vấn đề liên quan đến thời gian chờ đợi và hiệu suất. Ví dụ: sử dụng memoization để giảm thiểu số lần gọi lại và việc tính toán lại các giá trị.

