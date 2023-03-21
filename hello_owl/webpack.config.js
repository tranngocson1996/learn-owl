// Đây là một tệp cấu hình cho Webpack, một công cụ đóng gói và xây dựng cho các ứng dụng JavaScript. Tệp cấu hình này được viết bằng JavaScript và được sử dụng để chỉ định cho Webpack cách xử lý các tệp và tạo ra các tệp đầu ra cho ứng dụng.
// Cụ thể, tệp cấu hình này sử dụng module path để xác định đường dẫn đến các tệp cần xử lý và đầu ra, và sử dụng module HtmlWebpackPlugin để tạo ra một trang HTML đầu ra và chèn tệp JavaScript đã đóng gói.
// Tệp cấu hình này cũng sử dụng các module loader để xử lý các tệp JavaScript thông qua Babel để chuyển đổi các tính năng ES6+ thành mã JavaScript tương thích với các trình duyệt cũ hơn. Nó cũng cấu hình một máy chủ phát triển localhost bằng cách sử dụng devServer.
// Cuối cùng, tệp cấu hình này cung cấp các thông tin về chế độ hoạt động và các tùy chọn khác cho Webpack thông qua các thuộc tính như mode và output.
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const host = process.env.HOST || "localhost";

module.exports = function (env, argv) {
    const mode = argv.mode || "development";
    return {
        mode: mode,
        entry: "./src/main.js",
        output: {
            filename: "main.js",
            path: path.resolve(__dirname, "dist"),
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx"],
        },
        devServer: {
            contentBase: path.resolve(__dirname, "public/index.html"),
            compress: true,
            hot: true,
            host,
            port: 3000,
            publicPath: "/",
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: path.resolve(__dirname, "public/index.html"),
            }),
        ],
    };
};
