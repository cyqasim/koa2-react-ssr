import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/*
    组件 - 下拉框
*/
export default class SelectBox extends PureComponent {
    static defaultProps = {
        // 组件别名
        name: '',
        // 样式
        className: '',
        // 输入框样式
        inputClass: '',
        // 默认值
        defaultValue: '',
        // 占位文本
        placeholder: '',
        // 选项数组
        options: [],
        // 选择时回调
        onSelected: () => {}
    };
    static propTypes = {
        name: PropTypes.string,
        className: PropTypes.string,
        inputClass: PropTypes.string,
        defaultValue: PropTypes.any,
        placeholder: PropTypes.string,
        options: PropTypes.array,
        onSelected: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            // 当前选项名称
            activeLabel: ''
        };
    }
    handleItem = item => {
        const { name } = this.props;
        this.setState({
            activeLabel: item.label
        });
        if (name) {
            let result = {};
            result[name] = item.value;
            this.props.onSelected(result);
        } else {
            this.props.onSelected(item);
        }
    };
    handleClear = () => {
        this.setState({
            activeLabel: ''
        });
    };
    renderItem = (d, i) => {
        return <Item data={d} key={d.value + i} onClick={this.handleItem} />;
    };
    render() {
        const { activeLabel } = this.state;
        console.log(activeLabel);
        const { className, inputClass, options, defaultValue, placeholder } = this.props;
        return (
            <div className={`select-box ${className}`}>
                <input
                    readOnly
                    className={`select-value ${inputClass}`}
                    value={activeLabel || defaultValue}
                    type="text"
                    placeholder={placeholder}
                />
                <div className="select-options">{options.map(this.renderItem)}</div>
            </div>
        );
    }
}

class Item extends PureComponent {
    onClick = () => {
        const { data } = this.props;
        this.props.onClick(data);
    };
    render() {
        const { data } = this.props;
        return (
            <div className="select-item" onClick={this.onClick}>
                <div className="select-label">{data.label}</div>
            </div>
        );
    }
}
