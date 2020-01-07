import React, { Component, PureComponent } from 'react';
import { hot } from 'react-hot-loader/index';
import Slider from 'react-slick';
import './index.scss';
import history from '../../../routes/history';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderIdx: 0
        };
    }
    beforeChange = (oldIndex, newIndex) => {
        this.setState({
            sliderIdx: newIndex
        });
    };
    toSlider = index => {
        this.refs['slider'].slickGoTo(index);
    };
    toDetail = item => {
        history.push(`/article/detail/${item.aid}`);
    };
    renderList = (d, i) => {
        return <List data={d} index={i} activeIndex={this.state.sliderIdx} key={d + i} onClick={this.toSlider} />;
    };
    renderItem = (d, i) => {
        return <Item data={d} index={i} key={d + i} onClick={this.toDetail} />;
    };
    render() {
        const { data } = this.props;
        return (
            <div className="home-slider">
                <div className="slider-left">
                    <Slider
                        ref={'slider'}
                        dots={true}
                        fade={true}
                        autoplay={true}
                        autoplaySpeed={4000}
                        arrows={false}
                        beforeChange={this.beforeChange}
                    >
                        {data.map(this.renderItem)}
                    </Slider>
                </div>
                <div className="slider-right">{data.map(this.renderList)}</div>
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
            <div className="slick-item" onClick={this.onClick}>
                <div className="item-box">
                    <div className="item-pic" style={{ backgroundImage: `url(${data.poster})` }} />
                    <div className="item-label">
                        <span>{data.title}</span>
                    </div>
                    <div className="overlay" />
                </div>
            </div>
        );
    }
}
class List extends PureComponent {
    onClick = () => {
        const { index } = this.props;
        this.props.onClick(index);
    };
    render() {
        const { data, activeIndex, index } = this.props;

        return (
            <div className={`slider-list ${activeIndex === index ? 'active' : ''}`} onClick={this.onClick}>
                <div className="item-pic" style={{ backgroundImage: `url(${data.poster})` }} />
                <div className="item-label">{data.title}</div>
            </div>
        );
    }
}

if (module.hot) {
    Container = hot(module)(Container);
}
export default Container;
