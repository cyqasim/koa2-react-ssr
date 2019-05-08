import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeAction from '../redux/actions/homeAction';
import * as aboutAction from '../redux/actions/aboutAction';
import { hot } from 'react-hot-loader/index';

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
    static getData(store) {
        return [homeAction.setHome, aboutAction.setAbout];
    }
    constructor(props) {
        super(props);
        console.log('111');
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
    render() {
        const { city, date, fx, high, low } = this.props.homeReducer.data;
        return (
            <div className="home">
                <p>城市：{city}</p>
                <p>日期：{date}</p>
                <p>风向：{fx}</p>
                <p>最高温度：{high}</p>
                <p>最低温度：{low}</p>
                <p>
                    <img src={require('../images/favicon.png')} />
                </p>
                <div onClick={this.onPress}>Actions</div>
            </div>
        );
    }
}

if (module.hot) {
    Home = hot(module)(Home);
}

export default Home;
