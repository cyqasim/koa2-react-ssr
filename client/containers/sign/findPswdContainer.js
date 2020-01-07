import React, { PureComponent } from 'react';
import './login.scss';
import { hot } from 'react-hot-loader/index';

/*
    成功找回密码页面
*/
class Container extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inPage: 'login'
        };
    }

    toLogin = () => {
        const { history } = this.props;
        history.push('/login');
    };
    render() {
        return (
            <div className="login-container">
                <div className="login-wrap app-animation">
                    <div className="login-box">
                        <div className="login-logo">
                            <img src={require('../../images/logo.png')} className="img" />
                        </div>
                        <div className="login-title">成功找回</div>
                        <div className="login-text">密码已发送至账号安全邮箱</div>
                        <div className="login-submit" onClick={this.toLogin}>
                            <span>前往登录</span>
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
