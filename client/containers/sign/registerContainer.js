import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader/index';
import SmartInput from '../../components/smartInput';
import Toast from '../../components/toast';
import './register.scss';
import urls from '../../lib/urls';
import HttpUtil from '../../lib/http';

/*
    注册页面
*/
class Container extends PureComponent {
    ParamsStatus = {
        username: false,
        password: false
    };
    constructor(props) {
        super(props);
        this.state = {
            // 用户名
            username: '',
            // 密码
            password: ''
        };
    }
    toLogin = () => {
        const { history } = this.props;
        history.push('/login');
    };
    onInput = val => {
        const key = Object.keys(val);
        let state = {};
        state[key[0]] = val[key[0]].value;
        this.setState(state);
        this.ParamsStatus[key[0]] = val[key[0]].pass;
    };
    onSelect = val => {
        this.setState(val);
        const key = Object.keys(val);
        this.ParamsStatus[key[0]] = true;
    };

    handleNext = () => {
        const { username, password } = this.state;
        const { history } = this.props;

        let canSubmit = true;
        for (let i in this.ParamsStatus) {
            if (!this.ParamsStatus[i]) {
                canSubmit = false;
                break;
            }
        }

        if (canSubmit) {
            HttpUtil.http(
                {
                    url: urls.checkUser,
                    method: 'GET',
                    param: {
                        username
                    }
                },
                res => {
                    history.push('/replenish', { username, password });
                }
            );
        } else {
            if (!this.ParamsStatus.username) {
                Toast.show('用户名格式不正确');
            } else if (!this.ParamsStatus.password) {
                Toast.show('密码格式不正确');
            }
        }
    };
    render() {
        return (
            <div className="register-container">
                <div className="register-header">
                    <div className="header-item active">
                        <div className="header-item-icon" />
                        <div className="header-item-txt">创建账号</div>
                    </div>
                    <div className="header-item">
                        <div className="header-item-icon" />
                        <div className="header-item-txt">完善信息</div>
                    </div>
                    <div className="header-item">
                        <div className="header-item-icon" />
                        <div className="header-item-txt">完成注册</div>
                    </div>
                </div>

                <div className="wrapper">
                    <div className="register-card">
                        <div className="card-title">创建账号</div>
                        <div className="card-text">欢迎使用，请注册账号</div>
                    </div>
                    <div className="register-content">
                        <div className="register-info">
                            <div className="register-list">
                                <div className="list-tit">*用户名:</div>
                                <div className="list-txt">
                                    <SmartInput
                                        name="username"
                                        inputType="username"
                                        className="list-input-wrap"
                                        inputClass="list-input"
                                        placeholder=" "
                                        onChange={this.onInput}
                                    />
                                    <span>用户名为4-16位字母</span>
                                </div>
                            </div>
                            <div className="register-list">
                                <div className="list-tit">*密码:</div>
                                <div className="list-txt">
                                    <SmartInput
                                        name="password"
                                        inputType="password"
                                        className="list-input-wrap"
                                        inputClass="list-input"
                                        placeholder=" "
                                        onChange={this.onInput}
                                    />
                                    <span>密码为8-16位字母</span>
                                </div>
                            </div>
                        </div>

                        <div className="register-submit" onClick={this.handleNext}>
                            <span>下一步</span>
                        </div>
                    </div>
                </div>
                <div className="register-footer">
                    <div className="footer-logo">
                        <img src={require('../../images/logo_bw.png')} className="img" />
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
