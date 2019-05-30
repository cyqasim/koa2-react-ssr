import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeAction from '../redux/actions/homeAction';
import * as aboutAction from '../redux/actions/aboutAction';
import { hot } from 'react-hot-loader/index';
import urls from '../lib/urls';
import HttpUtil from '../lib/http';

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
class Home extends Component {
    static getData() {
        return [homeAction.setHome, aboutAction.setAbout];
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    componentDidMount() {
        if (!this.props.homeReducer.data.city) {
            console.log('初始化没数据，加载');
            this.props.setHome();
        }
    }
    onPress = () => {
        console.log('帮about加载');
        this.props.setAbout();
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
        const { city, date, fx, high, low } = this.props.homeReducer.data;
        return (
            <div className="home page">
                <p>城市：{city}</p>
                <p>日期：{date}</p>
                <p>风向：{fx}</p>
                <p>最高温度：{high}</p>
                <p>最低温度：{low}</p>
                <p>
                    <img src={require('../images/favicon.png')} />
                </p>
                <div onClick={this.onPress}>Actions</div>
                <input type="text" onChange={this.onInputUsername} />
                <input type="text" onChange={this.onInputPassword} />
                <div onClick={this.onLogin}>登陆</div>
            </div>
        );
    }
}

if (module.hot) {
    Home = hot(module)(Home);
}

export default Home;
