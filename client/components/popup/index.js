import React, { PureComponent } from 'react';
import './index.scss';
import PropTypes from 'prop-types';

/*
    全局 - 快捷登陆按钮
*/
export default class Popup extends PureComponent {
    static defaultProps = {
        // 容器样式
        className: '',
        // 弹出方向
        direction: 'bottom',
        // 选项
        options: []
    };
    static propTypes = {
        className: PropTypes.string,
        direction: PropTypes.string,
        options: PropTypes.array
    };
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }
    renderItem = (d, i) => {
        return (
            <div className="popup-list" onClick={d.onPress} key={d.label + i}>
                {d.label}
            </div>
        );
    };
    render() {
        const { children, className, direction, options } = this.props;
        return (
            <div className={`popup-box ${className || ''}`}>
                {children}
                <div className={`popup ${direction}`}>{options.map(this.renderItem)}</div>
            </div>
        );
    }
}
