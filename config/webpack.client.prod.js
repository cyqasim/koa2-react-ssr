const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rootDir = path.resolve(__dirname, '../');

const client = {
    target: 'web',
    mode: 'production',
    // 入口
    entry: {
        // 入口一
        client: './client/root'
    },
    // 输出
    output: {
        // 输出目标文件夹
        path: rootDir + '/dist/client',
        // 输出文件名 [name]表示输入输出文件名一致
        filename: '[name].js',
        // 分包文件名
        chunkFilename: '[name].chunk.js',
        // 静态文件引用路径 实际引用路径：publicPath + 文件引用路径
        publicPath: '/'
    },
    // 根据内容
    resolve: {
        modules: ['client', 'node_modules'],
        extensions: ['.js', '.jsx']
    },
    // 关闭警告提示
    module: {
        rules: [
            // css loader
            {
                test: /\.(scss|css)$/,
                // 使用css分离插件
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            localIdentName: '[name].css'
                        }
                    },
                    { loader: 'sass-loader' },
                    { loader: 'postcss-loader' }
                ]
            },
            // 图片 loader
            {
                // 匹配后缀
                test: /\.(png|gif|jpe?g|svg)/,
                use: [
                    {
                        // loader
                        loader: 'url-loader',
                        options: {
                            // 小于500B的文件打成Base64的格式，写入JS
                            limit: 500,
                            // 打包图片文件夹
                            outputPath: 'images',
                            name: '[name].[ext]?[hash:6]'
                        }
                    },
                    {
                        // 压缩图片
                        loader: 'image-webpack-loader'
                    }
                ]
            },
            // html图片引用 loader
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            // js babel loader
            {
                test: /\.(jsx|js)$/,
                include: [rootDir + '/client'],
                use: {
                    loader: 'babel-loader'
                },
                // 忽略文件
                exclude: '/node_modules/'
            }
        ]
    },
    plugins: [
        // 清空文件插件
        new CleanWebpackPlugin(['./dist/client/*'], {
            root: rootDir
        }),
        // html打包
        new HtmlPlugin({
            // 启用hash
            hash: true,
            // 模版文件
            template: './views/prod.html',
            // favicon
            favicon: './favicon.ico'
        }),
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
        // css分离插件
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                PORT: JSON.stringify('3000'),
                IP: JSON.stringify('localhost')
            }
        })
    ]
};

module.exports = client;
