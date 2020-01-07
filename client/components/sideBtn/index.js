import React, { PureComponent } from 'react';
import './index.scss';
import PropTypes from 'prop-types';

/*
    全局 - 快捷登陆按钮
*/
export default class SideBtn extends PureComponent {
    static defaultProps = {
        // 样式
        className: 'style1',
        // 点击时回调
        onClick: () => {}
    };
    static propTypes = {
        className: PropTypes.string,
        onClick: PropTypes.func
    };
    render() {
        const { className, onClick, children } = this.props;
        return (
            <div className={`side-box ${className}`}>
                <div className="side-btn open" onClick={onClick}>
                    {children}
                </div>
            </div>
        );
    }
}
