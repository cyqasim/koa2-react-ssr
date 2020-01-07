import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader/index';
import SmartInput from '../../components/smartInput';
import RadioBox from '../../components/radioBox';
import SelectBox from '../../components/selectBox';
import CitySelect from '../../components/citySelect';
import PromptInput from '../../components/promptInput';
import Toast from '../../components/toast';
import './register.scss';
import urls from '../../lib/urls';
import HttpUtil from '../../lib/http';
import * as userAction from '../../redux/actions/userAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/*
    完善资料页面
*/
@connect(
    null,
    dispatch =>
        bindActionCreators(
            {
                setUser: userAction.setUser
            },
            dispatch
        )
)
class Container extends PureComponent {
    ParamsStatus = {
        phone: false,
        sex: false,
        age: false,
        address: false,
        email: false
    };
    constructor(props) {
        super(props);
        this.state = {
            // 手机
            phone: '',
            // 性别选项
            sexOpt: [{ label: '男', value: '男' }, { label: '女', value: '女' }],
            // 性别
            sex: '',
            // 年龄选项
            ageOpt: Container.formatAge(),
            // 年龄
            age: '',
            // 所在地址
            address: '',
            // 邮箱地址
            email: ''
        };
    }
    static formatAge = () => {
        let arr = [...Array(100).keys()];
        let ages = [];
        arr.map(age => {
            if (age > 6) {
                ages.push({
                    label: String(age),
                    value: age
                });
            }
        });
        return ages;
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

    handleRegister = () => {
        const {
            location: {
                state: { username, password }
            },
            history,
            setUser
        } = this.props;
        const { phone, sex, age, address, email } = this.state;

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
                    url: urls.register,
                    method: 'POST',
                    param: {
                        username,
                        password,
                        phone,
                        sex,
                        age,
                        address,
                        email
                    },
                    successToast: true
                },
                res => {
                    localStorage.setItem('UserToken', res.data.token);
                    setUser({ token: res.data.token });
                    history.replace('/');
                }
            );
        } else {
            if (!this.ParamsStatus.phone) {
                Toast.show('请填写联系方式');
            } else if (!this.ParamsStatus.sex) {
                Toast.show('请选择性别');
            } else if (!this.ParamsStatus.age) {
                Toast.show('请选择年龄');
            } else if (!this.ParamsStatus.address) {
                Toast.show('请选择所在地');
            } else if (!this.ParamsStatus.email) {
                Toast.show('请填写邮箱地址');
            }
        }
    };
    render() {
        const { sexOpt, ageOpt } = this.state;
        return (
            <div className="register-container">
                <div className="register-header">
                    <div className="header-item active">
                        <div className="header-item-icon" />
                        <div className="header-item-txt">创建账号</div>
                    </div>
                    <div className="header-item active">
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
                        <div className="card-title">完善信息</div>
                        <div className="card-text">补充信息，完成注册</div>
                    </div>
                    <div className="register-content">
                        <div className="register-info">
                            <div className="register-list">
                                <span className="list-tit">*联系方式:</span>
                                <div className="list-txt">
                                    <SmartInput
                                        name="phone"
                                        inputType="phone"
                                        className="list-input-wrap"
                                        inputClass="list-input"
                                        placeholder=" "
                                        onChange={this.onInput}
                                    />
                                    <span>有效的手机号码</span>
                                </div>
                            </div>
                            <div className="register-list">
                                <span className="list-tit">*邮箱地址:</span>
                                <div className="list-txt">
                                    <PromptInput
                                        name="email"
                                        className="list-input-wrap"
                                        inputClass="list-input"
                                        onChange={this.onInput}
                                        placeholder=" "
                                    />
                                    <span>用于账号安全</span>
                                </div>
                            </div>
                            <div className="register-list">
                                <span className="list-tit">*年龄:</span>
                                <div className="list-txt">
                                    <SelectBox
                                        name="age"
                                        className="list-input-wrap"
                                        inputClass="list-input"
                                        options={ageOpt}
                                        placeholder=" "
                                        onSelected={this.onSelect}
                                    />
                                </div>
                            </div>
                            <div className="register-list">
                                <span className="list-tit">*性别:</span>
                                <div className="list-txt">
                                    <RadioBox
                                        name="sex"
                                        className="list-radio-wrap"
                                        itemClass="list-radio"
                                        options={sexOpt}
                                        onSelected={this.onSelect}
                                    />
                                </div>
                            </div>
                            <div className="register-list">
                                <span className="list-tit">*所在地:</span>
                                <div className="list-txt">
                                    <CitySelect
                                        name="address"
                                        className="list-input-wrap"
                                        inputClass="list-input"
                                        onSelected={this.onSelect}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="register-submit" onClick={this.handleRegister}>
                            <span>确认</span>
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
