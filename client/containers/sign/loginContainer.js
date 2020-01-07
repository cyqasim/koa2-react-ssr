import React, { PureComponent } from 'react';
import './login.scss';
import { hot } from 'react-hot-loader/index';
import HttpUtil from '../../lib/http';
import Toast from '../../components/toast';
import urls from '../../lib/urls';
import * as signAction from '../../redux/actions/signAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/*
    登陆页面
*/
@connect(
    null,
    dispatch =>
        bindActionCreators(
            {
                login: signAction.login
            },
            dispatch
        )
)
class Container extends PureComponent {
    Username = '';
    Password = '';
    constructor(props) {
        super(props);
    }
    toRegister = () => {
        const { history } = this.props;
        history.push('/register');
    };
    toForgetPswd = () => {
        const { history } = this.props;
        history.push('/forgetPswd');
    };
    onChangeUsername = e => {
        const { value } = e.target;
        this.Username = value;
    };
    onChangePassword = e => {
        const { value } = e.target;
        this.Password = value;
    };
    handleLogin = () => {
        const { login } = this.props;
        const username = this.Username;
        const password = this.Password;
        if (!username) {
            Toast.show('请输入用户名');
        } else if (!password) {
            Toast.show('请输入密码');
        } else {
            login(username, password);
        }
    };
    render() {
        return (
            <div className="login-container">
                <div className="login-wrap app-animation">
                    <div className="login-box">
                        <div className="login-logo">
                            <img src={require('../../images/logo.png')} className="img" />
                        </div>
                        <div className="login-title">Hi,请登录</div>

                        <div className="login-list">
                            <label className="list-tit">用户名:</label>
                            <input
                                type="text"
                                className="list-input"
                                autoComplete="new-password"
                                onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="login-list">
                            <label className="list-tit">密码:</label>
                            <input
                                type="password"
                                className="list-input"
                                autoComplete="new-password"
                                onChange={this.onChangePassword}
                            />
                            <div className="list-tips" onClick={this.toForgetPswd}>
                                忘记密码?
                            </div>
                        </div>
                        <div className="login-submit" onClick={this.handleLogin}>
                            <span>登录</span>
                        </div>
                        <div className="login-register" onClick={this.toRegister}>
                            <span>注册账号</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
if (module.hot) {
    Container = hot(module)(Container);
}

export default Container;
