import React, { PureComponent } from 'react';
import './login.scss';
import { hot } from 'react-hot-loader/index';
import HttpUtil from '../../lib/http';
import Toast from '../../components/toast';
import urls from '../../lib/urls';

/*
    找回密码页面
*/
class Container extends PureComponent {
    Username = '';
    constructor(props) {
        super(props);
        this.state = {
            inPage: 'login'
        };
    }
    toBack = () => {
        const { history } = this.props;
        history.goBack();
    };
    onChangeUsername = e => {
        const { value } = e.target;
        this.Username = value;
    };
    handleLogin = () => {
        const { history } = this.props;
        const username = this.Username;
        if (!username) {
            Toast.show('请输入用户名');
        } else {
            HttpUtil.http(
                {
                    url: urls.forgetPswd,
                    method: 'GET',
                    param: {
                        username
                    }
                },
                res => {
                    history.push('/findPswd');
                }
            );
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
                        <div className="login-title">找回密码</div>
                        <div className="login-text">请输入您想找回的用户名</div>
                        <div className="login-list">
                            <label className="list-tit">用户名:</label>
                            <input
                                type="text"
                                className="list-input"
                                autoComplete="new-password"
                                onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="login-submit" onClick={this.handleLogin}>
                            <span>确认</span>
                        </div>
                        <div className="login-register" onClick={this.toBack}>
                            <span>返回</span>
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
