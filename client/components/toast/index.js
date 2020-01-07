import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.scss';

let queue = [];
/*
    组件 - 提示输入框
    inputType[ email ]
*/
class Component extends PureComponent {
    static defaultProps = {
        text: '请等待'
    };
    static propTypes = {
        text: PropTypes.string
    };
    render() {
        return (
            <div className="toast">
                <div className="toast-text">
                    <span>{this.props.text}</span>
                </div>
                <div className="toast-icon">
                    <i className="icofont-chat" />
                </div>
            </div>
        );
    }
}
function generateToastId() {
    return (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10);
}
function canUseDom() {
    return typeof window !== 'undefined' && window.document && window.document.createElement;
}

const toast = {
    defaultOpt: {
        auto: true,
        times: 3
    },
    show: (text, config = {}) => {
        const option = Object.assign(toast.defaultOpt, config);
        if (canUseDom()) {
            const div = document.createElement('div');
            div.className = 'toast-box show';
            const id = generateToastId();
            let wrap = null;
            if (document.getElementById('toast-wrap')) {
                wrap = document.getElementById('toast-wrap');
                wrap.appendChild(div);
            } else {
                wrap = document.createElement('div');
                wrap.id = 'toast-wrap';
                wrap.appendChild(div);
                document.body.appendChild(wrap);
            }

            ReactDOM.render(<Component text={text} {...config} />, div);
            queue.push({ div, id });
            option.auto && setTimeout(() => toast.close(id), option.times * 1000);
            return id;
        }
    },
    close: (id = null) => {
        const wrap = document.getElementById('toast-wrap');

        if (id) {
            const item = queue.find(q => {
                return q.id === id;
            });
            item.div.setAttribute('class', 'toast-box hide');
            setTimeout(() => {
                if (wrap) {
                    wrap.removeChild(item.div);
                    if (wrap.childNodes.length < 1) {
                        document.body.removeChild(wrap);
                    }
                }
                const index = queue.findIndex((value, index) => {
                    return value.id === id;
                });
                queue.splice(index, 1);
            }, 500);
        } else {
            if (queue.length > 0) {
                queue[0].div.setAttribute('class', 'toast-box hide');
                setTimeout(() => {
                    if (wrap) {
                        wrap.removeChild(queue[0].div);
                        if (queue.length === 1) {
                            document.body.removeChild(wrap);
                        }
                    }
                    queue.shift();
                }, 500);
            }
        }
    }
};

export default toast;
