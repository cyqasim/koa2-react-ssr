require('babel-register')({
    extensions: ['.jsx', '.js'],
    plugins: ['ignore-html-and-css-imports'],
    cache: false
});

module.exports = require('./server');
