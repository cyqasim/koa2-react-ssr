import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './signBox.scss';

/*
    全局 - 登陆登出窗口
*/
export default class SignBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inPage: 'login'
        };
    }
    handleToggle = () => {
        this.setState({
            inPage: this.state.inPage === 'login' ? 'register' : 'login'
        });
    };
    render() {
        const { inPage } = this.state;
        return (
            <div className="signBox-container">
                <div className="signBox-left">

                    <div className={`signBox-register signBox-content ${inPage === 'register' ? 'show' : 'hide'}`}>
                        <div className="register-title">Hi,请登陆</div>
                        <div className="register-list-row">
                            <div className="register-list">
                                <span className="register-list-tit">用户名:</span>
                                <input type="text" className="register-list-input" placeholder="enter username" />
                            </div>
                            <div className="register-list">
                                <span className="register-list-tit">密码:</span>
                                <input type="text" className="register-list-input" placeholder="enter password" />
                            </div>
                        </div>
                        <div className="register-submit fade fade4">
                            <span>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</span>
                        </div>
                    </div>
                </div>
                <div className="signBox-right">
                    <div className="signBox-right-text fade fade5" onClick={this.handleToggle}>
                        <span>没有账号，注册一个</span>
                    </div>
                </div>
            </div>
        );
    }
}

const Login = () => {
    return (
        <div className="signBox-login signBox-content">
            <div className="login-title fade fade1">Hi,请登陆</div>
            <div className="login-list-row fade fade2">
                <div className="login-list">
                    <span className="login-list-tit">用户名:</span>
                    <input type="text" className="login-list-input" placeholder="enter username" />
                </div>
                <div className="login-list">
                    <span className="login-list-tit">密码:</span>
                    <input type="text" className="login-list-input" placeholder="enter password" />
                </div>
            </div>
            <div className="login-submit fade fade3">
                <span>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆</span>
            </div>
            <div className="signBox-line line1" />
        </div>
    );
}

function showLogin() {
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
