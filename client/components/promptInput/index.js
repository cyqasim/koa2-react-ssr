import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

// 所有规则
const RULE = {
    email: {
        limit: /[@*]/,
        // 验证
        regex: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
        // 占位符
        placeholder: '安全邮箱地址',
        // 错误提示
        errorTips: '邮箱地址错误'
    }
};
/*
    组件 - 提示输入框
    inputType[ email ]
*/
export default class PromptInput extends PureComponent {
    static defaultProps = {
        // 组件别名
        name: 'email',
        // 样式
        className: '',
        // 输入框样式
        inputClass: '',
        // 输入类型
        inputType: 'email',
        // 占位文本
        placeholder: '',
        // 输入后回调
        onChange: () => {},
        // 错误提示
        errorTips: ''
    };
    static propTypes = {
        name: PropTypes.string,
        className: PropTypes.string,
        inputClass: PropTypes.string,
        inputType: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        errorTips: PropTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            // 输入值
            value: '',
            // 显示输入提示
            showPrompt: false,
            // 提示选项
            options: [],
            // 是否输入中
            inFocus: true
        };
    }
    componentDidMount() {
        this.init();
    }
    init = async () => {
        const { inputType } = this.props;
        let options = [];
        switch (inputType) {
            case 'email':
                const type = await import('./emailData');
                options = type.default;
                break;
            default:
        }
        this.setState({
            options
        });
    };
    handleItem = val => {
        this.formatPrompt(val);
    };
    onChangeInput = e => {
        const { value } = e.target;
        this.formatPrompt(value);
    };
    formatPrompt = val => {
        const { inputType, name } = this.props;
        let showPrompt = false;

        if (val.length > 0 && !RULE[inputType].limit.test(val)) {
            showPrompt = true;
        } else {
            showPrompt = false;
        }

        this.setState({
            value: val,
            showPrompt
        });
        if (name) {
            let result = {};
            result[name] = { value: val, pass: RULE[inputType].regex.test(val) };
            this.props.onChange(result);
        } else {
            this.props.onChange({ value: val, pass: RULE[inputType].regex.test(val) });
        }
    };
    onFocusInput = () => {
        this.setState({ inFocus: true });
    };
    onBlurInput = () => {
        setTimeout(() => {
            this.setState({ inFocus: false, showPrompt: false });
        }, 200);
    };
    renderItem = (d, i) => {
        const { value } = this.state;
        return <Item data={d} key={d + i} value={value} onClick={this.handleItem} />;
    };
    render() {
        const { value, showPrompt, options, inFocus } = this.state;
        const { className, inputClass, placeholder, errorTips, inputType } = this.props;
        let isPass = true;
        if (inFocus) {
            isPass = true;
        } else {
            isPass = RULE[inputType].regex.test(value);
        }
        return (
            <div className={`prompt-input-box ${className}`}>
                <input
                    className={`prompt-input ${inputClass}`}
                    type="text"
                    placeholder={placeholder}
                    onChange={this.onChangeInput}
                    onBlur={this.onBlurInput}
                    onFocus={this.onFocusInput}
                    value={value}
                />
                <div className={`prompt-tips ${isPass ? '' : 'show'}`}>
                    <div>{errorTips || RULE[inputType].errorTips}</div>
                </div>
                <div className={`prompt-options ${showPrompt ? 'show' : ''}`}>{options.map(this.renderItem)}</div>
            </div>
        );
    }
}

class Item extends PureComponent {
    onClick = () => {
        const { data, value } = this.props;
        this.props.onClick(value + data);
    };
    render() {
        const { data, value } = this.props;
        return (
            <div className="prompt-item" onClick={this.onClick}>
                <div className="prompt-label">{value + data}</div>
            </div>
        );
    }
}
