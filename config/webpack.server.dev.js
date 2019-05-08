const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const rootDir = path.resolve(__dirname, '../');

const wds = {
    hostname: 'localhost',
    port: 8088
};
const publicPath = `http://${wds.hostname}:${wds.port}/`;

module.exports = {
    target: 'node',
    mode: 'none',
    context: rootDir,
    cache: false,
    entry: {
        index: ['webpack/hot/poll?1000', './server/index']
    },
    output: {
        path: rootDir + '/dist/server',
        publicPath: publicPath,
        filename: '[name].js'
    },
    module: {
        rules: [
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
            {
                test: /.(svg|scss|css)$/,
                loaders: require.resolve('ignore-loader')
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: require.resolve('babel-loader')
                    }
                ]
            }
        ]
    },
    externals: [
        nodeExternals({
            whitelist: [/^webpack/] //这里需要把webpack相关的热加载代码加入白名单
        })
    ],
    resolve: {
        extensions: ['.json', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                PORT: JSON.stringify('3000'),
                IP: JSON.stringify('localhost')
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
