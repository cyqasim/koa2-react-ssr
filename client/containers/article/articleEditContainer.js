import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../redux/actions/userAction';
import { hot } from 'react-hot-loader/index';
import urls from '../../lib/urls';
import './articleEdit.scss';
import SelectBox from '../../components/selectBox';
import HttpUtil from '../../lib/http';

const E = process.browser ? require('wangeditor') : undefined;
const ARTICLE_TYPE = [
    { label: '技术', value: '技术' },
    { label: '杂谈', value: '杂谈' },
    { label: '生活', value: '生活' },
    { label: '工作', value: '工作' },
    { label: '兴趣', value: '兴趣' }
];

@connect(
    state => ({
        userReducer: state.userReducer
    }),
    dispatch =>
        bindActionCreators(
            {
                getUserInfo: userAction.getUserInfo
            },
            dispatch
        )
)
class Container extends PureComponent {
    ArticleType = '技术';
    constructor(props) {
        super(props);
        this.state = {
            title: '未命名标题',
            editContent: '',
            toSave: false
        };
    }
    componentDidMount() {
        const elem = this.refs['editRef'];
        const editor = new E(elem);

        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editContent: html
            });
        };
        editor.create();
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
                <div className="edit-content">
                    <div className="edit-head">
                        <div className="edit-title">
                            <input type="text" value={title} onChange={this.onInputTitle} />
                        </div>
                        <div className="edit-type">
                            <SelectBox
                                className="list-input-wrap"
                                inputClass="list-input"
                                options={ARTICLE_TYPE}
                                defaultValue={this.ArticleType}
                                placeholder=" "
                                onSelected={this.onSelect}
                            />
                        </div>
                    </div>
                    <div className="edit-window" dangerouslySetInnerHTML={{ __html: editContent }} />
                    <div ref={'editRef'} className="edit-area" />
                    <div className="edit-submit">
                        <button className="submit-btn" disabled={toSave} onClick={this.handleSave}>
                            <span>{toSave ? '保存中' : '保存'}</span>
                            {toSave ? <i className="icofont-spinner" /> : null}
                        </button>
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
