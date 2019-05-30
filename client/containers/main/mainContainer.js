import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeAction from '../../redux/actions/homeAction';
import * as aboutAction from '../../redux/actions/aboutAction';
import { hot } from 'react-hot-loader/index';
import urls from '../../lib/urls';
import './main.scss';
import HttpUtil from '../../lib/http';

@connect(
    state => ({
        homeReducer: state.homeReducer
    }),
    dispatch =>
        bindActionCreators(
            {
                setHome: homeAction.setHome,
                setAbout: aboutAction.setAbout
            },
            dispatch
        )
)
class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showLogin: false
        };
    }
    onPress = () => {
        console.log('帮about加载');
        // this.props.setAbout();
    };
    clickLogin = () => {
        console.log('11');
        this.setState({
            showLogin: true
        });
    };
    onInputUsername = e => {
        this.setState({
            username: e.target.value
        });
    };
    onInputPassword = e => {
        this.setState({
            password: e.target.value
        });
    };
    onLogin = () => {
        const { username, password } = this.state;
        HttpUtil.http(
            {
                url: urls.login,
                method: 'POST',
                param: {
                    username,
                    password
                }
            },
            res => {
                console.log(res);
            },
            error => {
                console.log(error);
            }
        );
    };
    render() {
        // const { city, date, fx, high, low } = this.props.homeReducer.data;
        // const { showLogin } = this.state;
        return (
            <div className="main-wrap">
                <div className="main-background">
                    <video muted loop autoPlay className="background-video" ref={'video'}>
                        <source src={require('../../static/main_background.mp4')} type="video/mp4" />
                    </video>
                </div>
                <div className="main-login" onClick={this.clickLogin}>
                    <span>sign</span>
                </div>
            </div>
        );
    }
}
if (module.hot) {
    LoginContainer = hot(module)(LoginContainer);
}
export default LoginContainer;
