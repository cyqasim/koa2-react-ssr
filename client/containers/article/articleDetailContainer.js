import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleAction from '../../redux/actions/articleAction';
import { hot } from 'react-hot-loader/index';
import urls from '../../lib/urls';
import './articleDetail.scss';
import HttpUtil from '../../lib/http';

@connect(
    state => ({
        userReducer: state.userReducer
    }),
    dispatch =>
        bindActionCreators(
            {
                getArticleDetail: articleAction.getArticleDetail
            },
            dispatch
        )
)
class Container extends PureComponent {
    static getData() {
        return [articleAction.getArticleDetail];
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '未命名标题',
            editContent: '',
            toSave: false
        };
    }
    componentDidMount() {
        this.props.getArticleDetail();
    }
    toBack = () => {
        const { history } = this.props;
        history.goBack();
    };
    onInputTitle = e => {
        this.setState({
            title: e.target.value
        });
    };
    onSelect = val => {
        this.ArticleType = val.value;
    };
    handleSave = () => {
        const { title, editContent } = this.state;
        this.setState({
            toSave: true
        });
        const content = JSON.parse(JSON.stringify(editContent).replace(/<\/?.+?\/?>/g, ''));
        const text = content.substring(0, 100);

        let imgSrc = '';
        editContent.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function(match, capture) {
            imgSrc = capture;
        });

        HttpUtil.http(
            {
                url: urls.addArticle,
                method: 'POST',
                param: {
                    title,
                    text: text,
                    content: editContent,
                    type: this.ArticleType,
                    poster: imgSrc
                },
                successToast: true
            },
            res => {
                console.log(res);
                this.setState({
                    toSave: false
                });
            },
            err => {
                this.setState({
                    toSave: false
                });
            }
        );
    };
    render() {
        const { title, editContent, toSave } = this.state;
        return (
            <div className="edit-container">
                <div className="close-btn" onClick={this.toBack}>
                    <img src={require('../../images/user/close_icon.png')} />
                </div>
            </div>
        );
    }
}

if (module.hot) {
    Container = hot(module)(Container);
}
export default Container;
