// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        es6: true,
        commonjs: true,
        browser: true
    },
    extends: ['standard', 'eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    plugins: ['react', 'babel', 'promise', 'prettier'],
    globals: {
        process: true
    },
    rules: {
        'prettier/prettier': [2],
        /*********************** eslint自定义规则，如有新的添加请标明注释 *********************/
        'arrow-parens': [0], // 箭头函数用小括号括起来

        'generator-star-spacing': [0], // 生成器函数*的前后空格
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 不允许在代码里添加debugger
        semi: [2, 'always'], // 尾部分号
        'no-eval': [2, { allowIndirect: true }], // 不使用eval()
        indent: [
            2,
            4,
            {
                SwitchCase: 1
            }
        ], // 缩进
        'linebreak-style': [0, 'windows'], // 换行风格
        quotes: [2, 'single'], // 字符串必须使用单引号
        'no-useless-constructor': [2], // 不必要的constructor
        'prefer-promise-reject-errors': [2], // promise reject必须处理
        'comma-dangle': [2, 'never'], // 对象字面量项尾不能有逗号
        'import/no-webpack-loader-syntax': [0], // webpack配置不使用import引入
        'no-return-assign': [2], // return 语句中不能有赋值表达式
        'no-trailing-spaces': [0], // 不允许在语句后存在多余的空格
        camelcase: [2], // 驼峰命名（建议打开）
        'space-before-function-paren': [0], // 函数名称后面空格
        'no-class-assign': [0],
        /** ********************* react custom start *********************/
        'react/display-name': [0],
        'react/jsx-indent': [0], // jsx缩进
        'react/jsx-indent-props': [2, 4], // jsx属性缩进
        'react/prop-types': [0], // 不强制要求写 propTypes
        'react/jsx-boolean-value': [0], // 关闭如果属性值为 true, 可以直接省略
        'react/no-children-prop': [0], // 关闭children不能作为props
        'react/no-string-refs': [0], // refs字符串'react/no-did-update-set-state': [0], // 禁止在 componentDidUpdate 里面使用 setState
        'react/no-deprecated': [0],
        'react/jsx-no-bind': [0], // JSX上不允许添加bind，避免资源浪费（建议新项目打开这个）
        'jsx-quotes': [0], // jsx属性引号
        'no-mixed-operators': [0], // 禁止混合使用不同的操作符
        'standard/no-callback-literal': [0], // Enforce callbacks always called with Node.js-style error first
        'no-extra-boolean-cast': [0], // 多余的感叹号转布尔型
        'no-unused-vars': [2], // 禁止未使用过的变量
        'no-case-declarations': 0, // 是否使用case
        'no-console': [0], // 可以根据env进行设置开启还是关闭，因为测试环境的话console会舒服很多
        'handle-callback-err': [0]
    }
};
