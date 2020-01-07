import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/*
    组件 - 单选框
*/
export default class RadioBox extends PureComponent {
    static defaultProps = {
        // 组件别名
        name: '',
        // 样式
        className: '',
        // 默认值
        defaultValue: '',
        // 选项数组
        options: [],
        // 选择时回调
        onSelected: () => {}
    };
    static propTypes = {
        name: PropTypes.string,
        className: PropTypes.string,
        defaultValue: PropTypes.any,
        options: PropTypes.array,
        onSelected: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            // 当前选项名称
            activeLabel: props.defaultValue
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
    renderItem = (d, i) => {
        const { activeLabel } = this.state;
        const { options, itemClass } = this.props;
        return (
            <Item
                key={d.value + i}
                active={activeLabel === d.label}
                data={d}
                index={i}
                options={options}
                className={itemClass}
                onClick={this.handleItem}
            />
        );
    };
    render() {
        const { options, className } = this.props;
        return <div className={`radio-box ${className}`}>{options.map(this.renderItem)}</div>;
    }
}

class Item extends PureComponent {
    onClick = () => {
        const { data } = this.props;
        this.props.onClick(data);
    };
    render() {
        const { data, active, index, options, className } = this.props;
        return (
            <div
                className={`radio-item ${active ? 'active' : ''} ${className}`}
                style={{ marginRight: index === options.length - 1 ? 0 : 10 }}
                onClick={this.onClick}
            >
                <div className="radio-check">
                    <i className="point" />
                </div>
                <div className="radio-label">{data.label}</div>
            </div>
        );
    }
}
