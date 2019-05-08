import React, { Component } from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import * as aboutAction from "../redux/actions/aboutAction";

@connect(
    state => ({
        aboutReducer: state.aboutReducer
    }),
    dispatch =>
        bindActionCreators(
            {},
            dispatch
        )
)
export default class Home extends Component {
    constructor () {
        super();
    }
    render () {
        const {city, date, fx, high, low} = this.props.aboutReducer.data;

        return (
            <div className='home'>
                <p>城市：{city}</p>
                <p>日期：{date}</p>
                <p>风向：{fx}</p>
                <p>最高温度：{high}</p>
                <p>最低温度：{low}</p>
            </div>
        );
    }
}
