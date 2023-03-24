// OVERVIEW
// Một môi trường (environment) là một đối tượng được chia sẻ cho tất cả các thành phần trong cây. Owl không sử dụng nó, nhưng nó hữu ích cho các nhà phát triển ứng dụng để cung cấp một kênh giao tiếp đơn giản giữa các thành phần (ngoài việc sử dụng props).
// Các môi trường được cung cấp cho ứng dụng được gán vào thuộc tính env của thành phần ứng dụng.

//  Root
//  /  \
// A    B

// Ngoài ra, đối tượng môi trường (env) được đóng băng khi ứng dụng được khởi động. Việc này được thực hiện để đảm bảo mô hình tư duy đơn giản hơn về những gì đang xảy ra trong thời gian chạy. Lưu ý rằng đối tượng được đóng băng chỉ sâu ở mức độ đầu tiên, vì vậy các đối tượng con có thể được sửa đổi.

// SETTING AN ENVIRONMENT
// Cách thích hợp để tùy chỉnh một môi trường (environment) là đơn giản chỉ cần đưa nó cho thành phần ứng dụng (App), bất cứ khi nào nó được tạo ra.
// const env = {
//         _t: myTranslateFunction,
//         user: {...},
//         services: {
//         ...
//     },
// };

// new App(Root, { env }).mount(document.body);

// or alternatively
// mount(App, document.body, { env });

// USING A SUB ENVIRONMENT
// Đôi khi, từ quan điểm của một thành phần cụ thể và các thành phần con của nó, việc thêm một (hoặc nhiều) khóa cụ thể vào môi trường (environment) sẽ rất hữu ích. Trong trường hợp đó, giải pháp được trình bày ở trên sẽ không hoạt động, vì nó thiết lập môi trường toàn cục.
// Có hai hooks để xử lý tình huống này: useSubEnv và useChildSubEnv.
// useSubEnv là một hook nhận một danh sách các khóa và giá trị và trả về một đối tượng tương ứng. Đối tượng này sẽ được thêm vào môi trường (environment) của thành phần hiện tại và được truyền xuống các thành phần con thông qua props.
// useChildSubEnv là một hook tương tự, nhưng nó chỉ áp dụng cho các thành phần con của thành phần hiện tại. Nó cũng nhận một danh sách các khóa và giá trị và trả về một đối tượng tương ứng. Đối tượng này sẽ được thêm vào môi trường của các thành phần con và được truyền xuống các thành phần con của chúng thông qua props.
// class SomeComponent extends Component {
//     setup() {
//         useSubEnv({ myKey: someValue }); // myKey is now available for all child components
//     }
// }

// CONTENTS OF AN ENVIRONMENT
// Nội dung của đối tượng môi trường (environment) hoàn toàn phụ thuộc vào nhà phát triển ứng dụng. Tuy nhiên, một số trường hợp sử dụng tốt cho các khóa bổ sung trong môi trường là:
//     Một số khóa cấu hình.
//     Thông tin phiên làm việc.
//     Các dịch vụ chung (ví dụ như thực hiện các rpc)
//     Các hàm tiện ích khác mà người dùng muốn chèn vào, chẳng hạn như một hàm dịch.
// Làm điều này có nghĩa là các thành phần dễ dàng được kiểm tra: chúng ta có thể đơn giản là tạo một môi trường kiểm tra với các dịch vụ giả mạo.
