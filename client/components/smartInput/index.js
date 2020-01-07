import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

// 所有规则
const RULE = {
    username: {
        // 限制
        limit: /^[a-zA-Z0-9_-]{0,16}$/,
        // 验证
        regex: /^[a-zA-Z0-9_-]{4,16}$/,
        // 占位符
        placeholder: '4-16位字母',
        // 错误提示
        errorTips: '用户名格式错误'
    },
    password: {
        limit: /^[a-zA-Z0-9_-]{0,16}$/,
        regex: /^[a-zA-Z0-9_-]{8,16}$/,
        placeholder: '8-16位字母',
        errorTips: '密码格式错误'
    },
    phone: {
        limit: /^[0-9]{0,11}$/,
        regex: /^1[123456789][0-9]{9}$/,
        placeholder: '有效手机号码',
        errorTips: '手机格式错误'
    },
    text: {
        limit: '',
        regex: '',
        placeholder: '',
        errorTips: ''
    }
};
/*
    组件 - 条件输入框
    inputType[ username ]
*/
export default class SmartInput extends PureComponent {
    static defaultProps = {
        // 组件别名
        name: 'username',
        // 样式
        className: '',
        // 输入类型
        inputType: 'username',
        // 占位文本
        placeholder: '',
        // 输入后回调
        onChange: () => {},
        // 错误提示
        errorTips: '',
        // 主动提示错误
        isError: false
    };
    static propTypes = {
        name: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
        inputType: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        errorTips: PropTypes.string,
        isError: PropTypes.bool
    };
    // 上次输入值
    LastVal = '';
    constructor(props) {
        super(props);
        this.state = {
            // 输入值
            value: '',
            // 是否输入中
            inFocus: true
        };
    }
    handleItem = val => {
        this.setState({
            value: val
        });
        this.props.onChange(val);
    };
    onChangeInput = e => {
        const { inputType, name } = this.props;
        const { value } = e.target;
        let pattern, newVal;
        pattern = RULE[inputType].limit;
        newVal = this.testValue(pattern, value);

        this.setState({
            value: newVal
        });
        if (name) {
            let result = {};
            result[name] = { value: newVal, pass: RULE[inputType].regex.test(newVal) };
            this.props.onChange(result);
        } else {
            this.props.onChange({ value: newVal, pass: RULE[inputType].regex.test(newVal) });
        }
    };
    testValue = (rule, value) => {
        let val;
        if (rule.test(value)) {
            val = value;
            this.LastVal = value;
        } else {
            val = this.LastVal;
        }
        return val;
    };
    onFocusInput = () => {
        this.setState({
            inFocus: true
        });
    };
    onBlurInput = () => {
        this.setState({
            inFocus: false
        });
    };
    render() {
        const { value, inFocus } = this.state;
        const { className, inputType, placeholder, inputClass, isError, errorTips } = this.props;
        let isPass = true;
        if (inFocus) {
            isPass = true;
        } else if (isError) {
            isPass = false;
        } else {
            isPass = RULE[inputType].regex.test(value);
        }
        return (
            <div className={`smart-input-box ${className}`}>
                <input
                    className={inputClass || 'smart-input'}
                    type={inputType === 'password' ? 'password' : 'text'}
                    placeholder={placeholder || RULE[inputType].placeholder}
                    onChange={this.onChangeInput}
                    value={value}
                    autoComplete="new-password"
                    onFocus={this.onFocusInput}
                    onBlur={this.onBlurInput}
                />
                <div className={`smart-tips ${isPass ? '' : 'show'}`}>
                    <div>{errorTips || RULE[inputType].errorTips}</div>
                </div>
            </div>
        );
    }
}
