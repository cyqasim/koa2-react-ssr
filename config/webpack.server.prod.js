const path = require("path");
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const rootDir = path.resolve(__dirname, '../');
const server = {
    mode: 'production',
    // node方式编译 使用require加载chunk
    target: 'node',
    // 入口
    entry: {
        // 入口一
        server: './server/server'
    },
    // 输出
    output: {
        // 输出目标文件夹
        path: rootDir + '/dist/server',
        // 输出文件名 [name]表示输入输出文件名一致
        filename: '[name].js',
        // 分包文件名
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            // css loader
            {
                test: /\.(scss|css)$/,

                // 只在对应的 DOM 元素上生成 class 类名，然后返回生成的 CSS 样式代码
                use: ['isomorphic-style-loader', {
                    loader: 'css-loader',
                    options: {modules: true}
                }]
            },
            // 图片 loader
            {
                // 匹配后缀
                test:/\.(png|jpg|gif|jpeg)/,
                use:[{
                    // loader
                    loader:'url-loader',
                    options:{
                        // 小于500B的文件打成Base64的格式，写入JS
                        limit:500,
                        // 打包图片文件夹
                        outputPath:'images',
                        name: '[name].[ext]?[hash:6]'
                    }
                }, {
                    // 压缩图片
                    loader:'image-webpack-loader'
                }]
            },
            // html图片引用 loader
            {
                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader']
            },
            // js babel loader
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader'
                },
                // 忽略文件
                exclude: '/node_modules/'
            }
        ]
    },
    // node环境不打包第三方模块
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.json', '.js', '.jsx']
    },
    plugins: [
        // 清空文件插件
        new CleanWebpackPlugin(
            ['./dist/server/*'],
            {
                root: rootDir
            }
        ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                PORT: JSON.stringify('3000'),
                IP: JSON.stringify('localhost')
            }
        })
    ]
};

module.exports = server;