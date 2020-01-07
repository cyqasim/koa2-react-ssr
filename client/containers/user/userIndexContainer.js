import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../redux/actions/userAction';
import { hot } from 'react-hot-loader/index';
import NavBar from '../navBar';
import './userIndex.scss';
import { DateUtil } from '../../lib/public';

@connect(
    state => ({
        userReducer: state.userReducer
    }),
    dispatch =>
        bindActionCreators(
            {
                getUserInfo: userAction.getUserInfo,
                getUserArticle: userAction.getUserArticle
            },
            dispatch
        )
)
class Container extends PureComponent {
    static getData() {
        return [userAction.getUserInfo, userAction.getUserArticle];
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showLogin: false
        };
    }

    componentDidMount() {
        const { getUserInfo, getUserArticle, userReducer } = this.props;
        if (!userReducer.type) {
            getUserInfo();
            getUserArticle();
        }
    }
    toEdit = () => {
        const { history } = this.props;
        history.push('/article/edit');
    };
    handleItem = item => {
        console.log(item.aid);
    };
    renderItem = (d, i) => {
        return <Item data={d} key={d.aid + i} onClick={this.handleItem} />;
    };
    render() {
        const {
            userReducer: { profile, username, sex, address, createTime, articles }
        } = this.props;

        return (
            <div className="userIndex-container">
                <NavBar className="white" />
                <div className="edit-btn" onClick={this.toEdit}>
                    <img src={require('../../images/user/edit_icon.png')} />
                </div>
                <div className="userIndex-header">
                    <div className="header-background" />
                    <div className="header-info">
                        <div className="wrapper">
                            <div className="header-intro">
                                <div className="header-name">{username}</div>
                                <div className="header-profile">
                                    <img src={profile} />
                                </div>
                            </div>
                            <div className="header-info-item">
                                <div className="item-icon">
                                    <img src={require('../../images/user/article_icon.png')} className="img" />
                                </div>
                                <div className="item-text">
                                    <p>{articles.length}</p>
                                    <span>文章数</span>
                                </div>
                            </div>
                            <div className="header-info-item">
                                <div className="item-icon">
                                    <img
                                        src={
                                            sex === '男'
                                                ? require('../../images/user/man_icon.png')
                                                : require('../../images/user/woman_icon.png')
                                        }
                                        className="img"
                                    />
                                </div>
                                <div className="item-text">
                                    <p>{sex}</p>
                                    <span>性别</span>
                                </div>
                            </div>
                            <div className="header-info-item">
                                <div className="item-icon">
                                    <img src={require('../../images/user/address_icon.png')} className="img" />
                                </div>
                                <div className="item-text">
                                    <p>{address}</p>
                                    <span>所在地址</span>
                                </div>
                            </div>
                            <div className="header-info-item">
                                <div className="item-icon">
                                    <img src={require('../../images/user/date_icon.png')} className="img" />
                                </div>
                                <div className="item-text">
                                    <p>{DateUtil.formatTimestamp(createTime, 'yyyy-MM-dd')}</p>
                                    <span>注册时间</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="userIndex-content">
                    <div className="wrapper">{articles.map(this.renderItem)}</div>
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
                        <div className="item-content-date">{DateUtil.formatTimestamp(data.updatedAt)}</div>
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
