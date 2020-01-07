import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import cityData from './cityData';
import SelectBox from '../selectBox';

/*
    组件 - 城市选择器
*/
export default class CitySelect extends PureComponent {
    static defaultProps = {
        // 组件别名
        name: '',
        // 样式
        className: '',
        // 输入框样式
        inputClass: '',
        // 选择时回调
        onSelected: () => {}
    };
    static propTypes = {
        name: PropTypes.string,
        className: PropTypes.string,
        inputClass: PropTypes.string,
        onSelected: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            // 省份数组
            provinceOpts: CitySelect.initData(cityData),
            // 当前选择省份
            provinceValue: '',
            // 城市数组
            cityOpts: [],
            // 当前选择城市
            cityValue: ''
        };
    }
    static initData = data => {
        let arr = [];
        data.map(d => {
            arr.push({
                label: d.name,
                value: d.name
            });
        });
        return arr;
    };
    onChangeProvince = val => {
        const { provinceValue } = this.state;
        if (val.province === provinceValue) {
            return;
        }
        // 调用下拉框组件清除值方法
        this.refs['cityItem'].handleClear();
        // 匹配城市
        let city = cityData.find(d => {
            return d.name === val.province;
        });
        this.setState({
            provinceValue: val.province,
            cityOpts: CitySelect.initData(city.districts),
            cityValue: ''
        });
    };
    onChangeCity = val => {
        const { name } = this.props;
        const { provinceValue } = this.state;
        this.setState({
            cityValue: val.city
        });
        if (name) {
            let result = {};
            result[name] = provinceValue + val.city;
            this.props.onSelected(result);
        } else {
            this.props.onSelected(provinceValue + val.city);
        }
    };
    render() {
        const { provinceOpts, provinceValue, cityOpts } = this.state;
        const { className, inputClass } = this.props;
        return (
            <div className={`city-select-box ${className}`}>
                <div className="city-select-item">
                    <SelectBox
                        name="province"
                        options={provinceOpts}
                        inputClass={inputClass}
                        placeholder="请选择所在省份"
                        onSelected={this.onChangeProvince}
                    />
                </div>
                <div className="city-select-item" style={{ display: provinceValue ? 'block' : 'none' }}>
                    <SelectBox
                        name="city"
                        ref="cityItem"
                        options={cityOpts}
                        inputClass={inputClass}
                        placeholder="请选择所在城市"
                        onSelected={this.onChangeCity}
                    />
                </div>
            </div>
        );
    }
}
