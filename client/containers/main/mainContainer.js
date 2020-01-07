import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hot } from 'react-hot-loader/index';
import './main.scss';
import NavBar from '../navBar';
import { DateUtil } from '../../lib/public';
import * as articleAction from '../../redux/actions/articleAction';
import HomeSlider from './homeSlider';

@connect(
    state => ({
        signReducer: state.signReducer,
        userReducer: state.userReducer,
        articleListReducer: state.articleListReducer
    }),
    dispatch =>
        bindActionCreators(
            {
                getArticle: articleAction.getArticleList,
                articleHot: articleAction.articleHot
            },
            dispatch
        )
)
class Container extends Component {
    static getData() {
        return [articleAction.articleHot];
    }
    constructor(props) {
        super(props);
        this.state = {
            articleList: []
        };
    }
    componentWillMount() {}
    handleItem = item => {
        const { history } = this.props;
        history.push(`/article/detail/${item.aid}`);
    };
    renderItem = (d, i) => {
        return <Item data={d} key={d.aid + i} onClick={this.handleItem} />;
    };
    render() {
        const {
            articleListReducer: { hot, list }
        } = this.props;
        return (
            <div className="main-container">
                <NavBar className="white" />
                <div className="main-background">
                    <video muted loop autoPlay className="background-video" ref={'video'}>
                        <source src={require('../../static/main_background.mp4')} type="video/mp4" />
                    </video>
                </div>
                <div className="main-content">
                    <div className="wrapper">
                        <HomeSlider data={hot} />
                        <div className="content-list">{list.map(this.renderItem)}</div>
                    </div>
                </div>
            </div>
        );
    }
}

class Item extends PureComponent {
    onClick = () => {
        const { data } = this.props;
        this.props.onClick(data);
    };
    render() {
        const { data } = this.props;

        return (
            <div className="content-item" onClick={this.onClick}>
                <div className="item-box">
                    <div className="item-pic">
                        <img src={data.poster} className="img" />
                        <div className="item-label">
                            <span>{data.type}</span>
                        </div>
                    </div>
                    <div className="item-content">
                        <div className="item-content-title">{data.title}</div>
                        <div className="item-content-text">{data.text}</div>
                        <div className="item-content-date">
                            {DateUtil.formatTimestamp(data.updatedAt, 'yyyy-MM-dd')} | {data.author}
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
