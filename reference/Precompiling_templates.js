// Owl được thiết kế để được sử dụng bởi framework javascript Odoo. Vì Odoo xử lý tài sản của mình theo cách không chuẩn của riêng nó, nên quyết định được đưa ra / giả định rằng Owl sẽ biên dịch các template tại thời điểm chạy.

// Tuy nhiên, trong một số trường hợp, đó không phải là tối ưu, hoặc thậm chí còn tệ hơn, không thể thực hiện được. Ví dụ, các tiện ích trình duyệt không cho phép mã javascript tạo một hàm mới (sử dụng cú pháp new Function (...)).

// Do đó, trong những trường hợp này, yêu cầu phải biên dịch các template trước thời điểm chạy. Điều này có thể thực hiện được trong Owl, nhưng công cụ vẫn còn rất khó khăn. Hiện tại, quy trình như sau:

// Viết các template của bạn trong các tệp xml (với chỉ thị t-name để khai báo tên của template)

// Biên dịch chúng trong một tệp templates.js

// Nhận tệp owl.iife.runtime.js (đó là một phiên bản Owl không có trình biên dịch)

// Gom owl.iife.runtime.js và template.js với tài sản của bạn (owl cần được đặt trước các template)
// Dưới đây là một giải thích chi tiết hơn về cách biên dịch các tệp xml thành tệp js:

// Sao chép kho lưu trữ Owl vào máy cục bộ

// Chạy lệnh npm install để cài đặt tất cả các công cụ cần thiết

// Chạy lệnh npm run build:runtime để xây dựng tệp owl.iife.runtime.js

// Chạy lệnh npm run build:compiler để xây dựng trình biên dịch template

// Chạy lệnh npm run compile_templates -- path/to/your/templates để quét thư mục đích của bạn, tìm tất cả các tệp xml, lấy tất cả các template, biên dịch chúng và tạo ra một tệp templates.js.