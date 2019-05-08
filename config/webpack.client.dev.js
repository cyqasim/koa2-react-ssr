const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const rootDir = path.resolve(__dirname, '../');

const wds = {
    hostname: 'localhost',
    port: 8088
};
const publicPath = `http://${wds.hostname}:${wds.port}/`;

module.exports = {
    target: 'web',
    mode: 'none',
    devtool: 'inline-source-map',
    // 相对路径
    context: rootDir,
    // 入口
    entry: {
        client: [
            `webpack-dev-server/client?${publicPath}`,
            './client/root'
        ],
    },
    // 输出
    output: {
        path: rootDir + '/dist/client',
        filename: '[name].js',
        chunkFilename: `[name].chunk.js`,
        // 构建后在html里的路径
        publicPath: publicPath,
    },
    // 根据内容
    resolve: {
        modules: [
            'client',
            'node_modules'
        ],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            // css loader
            {
                test: /\.(scss|css)$/,
                // 使用css分离插件
                use: [
                    {
                        loader: require.resolve('css-hot-loader')
                    },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {loader: 'css-loader', options: {
                            importLoaders: 1,
                            localIdentName: '[name].css'
                        }},
                    {loader: 'sass-loader'},
                    {loader: 'postcss-loader'}
                ]
            },
            // 图片 loader
            {
                // 匹配后缀
                test:/\.(png|gif|jpe?g|svg)/,
                use:[{
                    // loader
                    loader:'url-loader',
                    options:{
                        // 小于500B的文件打成Base64的格式，写入JS
                        limit: 500,
                        // 打包图片文件夹
                        outputPath:'images',
                        name: '[name].[ext]?[hash:6]',
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
                include: [
                    rootDir + '/client',
                ],
                use:{
                    loader:'babel-loader'
                },
                // 忽略文件
                exclude: '/node_modules/',
            }
        ]
    },
    plugins: [
        // 清空文件插件
        new CleanWebpackPlugin(
            ['./dist/client/*'],
            {
                root: rootDir
            }
        ),
        // 代码分割
        new webpack.optimize.SplitChunksPlugin({
            // 分割模式 all-全部 async-按需 initial-初始
            chunks: 'all',
            // 最小体积
            // minSize: 300,
            // 最少引用次数
            minChunks: 1,
            // 自动命名
            name: true,
            // 分割模块分隔符
            automaticNameDelimiter: '-',
            // 缓存组 自定义分割规则
            cacheGroups: {
                // default: {
                //     // 最少引用次数
                //     minChunks: 2,
                //     // 优先级 一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
                //     priority: -20,
                //     // 如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
                //     reuseExistingChunk: true,
                //     // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
                //     enforce: true
                // },
                // 将node_modules单独打一个包
                vendors: {
                    test: /node_modules\//,
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                },
                // css分包
                styles: {
                    test: /\.(css|scss)/,
                    name: 'styles',
                    priority: 20,
                    chunks: 'all',
                    enforce: true
                }
            }
        }),
        new webpack.optimize.RuntimeChunkPlugin({
            name: 'manifest'
        }),
        new AssetsPlugin({
            path: rootDir,
            filename: 'assets.json',
            update: true,
            prettyPrint: true
        }),
        // css分离插件
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        // 热替换插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                PORT: JSON.stringify('3000'),
                IP: JSON.stringify('localhost'),
            }
        })
    ],
    devServer: {
        publicPath: '/',  // 资源文件路径(相对于域名 http://[hostname]:[port]/)
        hot: true,    // 热替换
        hotOnly: true,    // 在没有页面刷新的情况下启用热模块替换
        quiet: false,     // 是否不显示错误警告
        noInfo: true,    // 不显示打包信息
        headers: { 'Access-Control-Allow-Origin': '*' },  // 响应头
        host: wds.hostname,   // 域名
        port: wds.port    // 端口
    },
};
