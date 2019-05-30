import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import SignBox from './signBox';
import './index.scss';

/*
    全局 - 登陆登出窗口
*/
export default class SignBtn extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }
    handleShowSign = e => {
        e.stopPropagation();
        this.setState({
            active: true
        });
        showSign();
    };
    handleCloseSign = e => {
        e.stopPropagation();
        this.setState({
            active: false
        });
        closeSign();
    };
    render() {
        const { active } = this.state;
        return (
            <div id="gl-sign-btn" className={`${active ? 'sign-open' : 'sign-close'}`}>
                <div className="sign-btn open" onClick={this.handleShowSign}>
                    <i className="icofont-dotted-down" onClick={this.handleShowSign} />
                </div>
                <div className="sign-btn close">
                    <i className="icofont-dotted-down" onClick={this.handleCloseSign} />
                </div>
            </div>
        );
    }
}

function showSign() {
    let div = document.createElement('div');
    div.id = 'gl-signBox';
    div.className = 'show';
    let overlay = document.createElement('div');
    overlay.id = 'gl-signBox-overlay';
    overlay.className = 'show';
    document.body.appendChild(overlay);
    document.body.appendChild(div);
    ReactDOM.render(<SignBox />, div);
}
function closeSign() {
    let div = document.getElementById('gl-signBox');
    div.setAttribute('class', 'hide');
    let overlay = document.getElementById('gl-signBox-overlay');
    overlay.setAttribute('class', 'hide');
    setTimeout(() => {
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        ReactDOM.unmountComponentAtNode(overlay);
        if (overlay && overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 700);
}
