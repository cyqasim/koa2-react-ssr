import React, { PureComponent } from 'react';
import './navBar.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as signAction from '../../redux/actions/signAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Popup from '../../components/popup';
import { StrUtil } from '../../lib/public';
/*
    导航
*/
@withRouter
@connect(
    state => ({
        signReducer: state.signReducer
    }),
    dispatch =>
        bindActionCreators(
            {
                setUser: signAction.setUser,
                clearUser: signAction.clearUser
            },
            dispatch
        )
)
class NavBar extends PureComponent {
    static defaultProps = {
        // 样式
        className: 'black' // white
    };
    static propTypes = {
        className: PropTypes.string
    };
    handleLogout = () => {
        const { clearUser } = this.props;
        clearUser();
    };
    render() {
        const {
            className,
            signReducer: { token, username, profile }
        } = this.props;
        return (
            <div className={`navBar app-animation ${className}`}>
                <div className="wrapper">
                    <Link to="/">
                        <div className="navBar-logo">
                            <img
                                src={
                                    className === 'white'
                                        ? require('../../images/logo_w.png')
                                        : require('../../images/logo.png')
                                }
                            />
                        </div>
                    </Link>
                    <div className="navBar-nav">
                        <div className="nav-left">
                            <Link to="/">
                                <div className="nav">
                                    <div className="nav-text">社区</div>
                                </div>
                            </Link>
                            <Link to="/user">
                                <div className="nav">
                                    <div className="nav-text">主页</div>
                                </div>
                            </Link>
                        </div>
                        {StrUtil.isEmpty(token) ? (
                            <div className="nav-right">
                                <Link to="/login">
                                    <div className="nav">
                                        <div className="nav-text">登陆</div>
                                    </div>
                                </Link>
                                <Link to="/register">
                                    <div className="nav nav-btn">
                                        <div className="nav-text">注册</div>
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <div className="nav-right">
                                <Popup
                                    className="nav-name"
                                    options={[
                                        {
                                            label: '编辑',
                                            onPress: this.handleEditor
                                        },
                                        {
                                            label: '登出',
                                            onPress: this.handleLogout
                                        }
                                    ]}
                                >
                                    <div className="nav">
                                        <div className="nav-icon">
                                            <img src={profile} />
                                        </div>
                                        <div className="nav-text">{username}</div>
                                    </div>
                                </Popup>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;
