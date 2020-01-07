import jwt from 'jsonwebtoken';

/**
 * 字符串帮助类
 */
class StrUtil {
    /*
     * 判断字符串是否为空
     * @param str 传入的字符串
     * @returns {Boolean}
     */
    static isEmpty = str => {
        if (
            str == null ||
            typeof str === 'undefined' ||
            (str === '' && typeof str !== 'number') ||
            str === 'undefined' ||
            str === 'null'
        ) {
            return true;
        } else {
            return false;
        }
    };
    /*
     * 判断是否不是手机号码
     * @param str 传入的字符串
     * @returns {Boolean}
     */
    static isPhone = str => {
        let pattern = /^1[123456789][0-9]{9}$/;
        return pattern.test(str);
    };
    /*
     * 密码检查
     * 规则：
     * 1.不能为空；
     * 2.不能小于6位；
     */
    static isPassword = str => {
        if (StrUtil.isEmpty(str)) {
            return false;
        }
        if (str.length < 6) {
            return false;
        }
        return true;
    };
    /*
     * 判断是否不是邮箱
     * @param str 传入的字符串
     * @returns {Boolean}
     */
    static isEmail = str => {
        let pattern = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        return pattern.test(str);
    };
    /**
     * 填充空字符串，或长度为0的字符串
     * @param  String str     被填充对象
     * @param  String default 填充物
     * @return  String        填充后的字符串
     */
    static fillEmpty = (str, defaultStr) => {
        defaultStr = defaultStr || '';
        if (str == null || typeof str === 'undefined' || (str === '' && typeof str !== 'number')) {
            return defaultStr;
        }
        return str;
    };
    /**
     * 除去左边空白
     * @param str
     * @returns {str}
     */
    static lTrim = str => {
        return str.replace(/(^\s*)/g, '');
    };

    /**
     * 除去右边空白
     * @param str
     * @returns {str}
     */
    static rTrim = str => {
        return str.replace(/(\s*$)/g, '');
    };

    /**
     * 除去两边空白
     * @param str
     * @returns {str}
     */
    static trim = str => {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    };

    /**
     * 截取小数点,四舍五入
     * @param str num
     * @returns {Number}
     */
    static toFixed(str, number = 2) {
        return parseFloat(str).toFixed(number);
    }

    /**
     * 生成唯一uuid
     * @param str prefix
     * @returns {String}
     */
    static uuid = prefix => {
        return (prefix || '') + new Date().getTime() + parseInt(Math.random() * 1000 + 1, 10);
    };
}

/**
 * 日期时间帮助类
 */
class DateUtil {
    /**
     * 时间戳转时间
     * @param timestamp:时间戳 aformate:日期格式
     * @returns {string}
     */
    static formatTimestamp(timestamp, aformate) {
        if (!timestamp) {
            return false;
        }
        if (String(timestamp).length < 13) {
            // 如果date为13位不需要乘1000
            timestamp *= 1000;
        }
        let format = aformate || 'yyyy-MM-dd hh:mm';
        let date = new Date(timestamp);

        let o = {
            'M+': date.getMonth() + 1, // month
            'd+': date.getDate(), // day
            'h+': date.getHours(), // hour
            'm+': date.getMinutes(), // minute
            's+': date.getSeconds(), // second
            'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
            S: date.getMilliseconds() // millisecond
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (let k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                );
            }
        }
        return format;
    }

    /**
     * 格式化时间戳：
     * @return String 返回时间距离当前时间的距离
     * （1）1小时内，显示“X分钟前”
     * （2）1天内，显示“X小时前”
     * （4）超过1天，显示“XX-XX nn:mm ”,如”09-29 12:23“
     */
    static formateTimeDistance(timestamp) {
        var nowTime = (new Date().getTime() / 1000 - timestamp) | 0;
        // if (nowTime / 86400 >= 1) return '' + ((nowTime / 86400) | 0) + '天前';
        if (nowTime / 86400 >= 1) {
            return this.formatTimestamp(timestamp, 'MM-dd hh:mm');
        } else if (nowTime / 3600 >= 1) {
            return '' + ((nowTime / 3600) | 0) + '小时前';
        } else if (nowTime / 60 >= 1) {
            return '' + ((nowTime / 60) | 0) + '分钟前';
        } else if (nowTime < 0) {
            return '0秒前';
        } else {
            return '' + nowTime + '秒前';
        }
    }
    /**
     * 秒数转时间
     * @param second:秒数
     * @returns {string}
     */
    static formatClockStamp(second, aformate) {
        if (String(second).length >= 13) {
            second = second / 1000;
        }
        const seconds = second % 60;
        const totalMin = parseInt(second / 60, 10);
        const totalHour = parseInt(second / (60 * 60), 10);
        const totalDay = parseInt(second / (60 * 60 * 24), 10);

        let json = aformate || {
            d: 'dd天',
            h: 'hh时',
            m: 'mm分',
            s: 'ss秒'
        };

        let o = {
            's+': seconds // second
        };
        if (totalDay) {
            o['d+'] = totalDay;
        } else {
            json.d = '';
        }
        if (totalHour) {
            o['h+'] = totalHour % 24;
        } else {
            json.h = '';
        }
        if (totalMin) {
            o['m+'] = totalMin % 60;
        } else {
            json.m = '';
        }
        let format = '';
        for (let i in json) {
            format += json[i];
        }

        for (let k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                );
            }
        }
        return second === 0 ? '--' : format;
    }
    /**
     * 剩余多少时间
     * date:时间戳
     * 格式：时，分，秒
     */
    static formateClock(second) {
        var second_time = second;
        var time = parseInt(second_time) + '秒';
        if (parseInt(second_time) > 60) {
            var seconds = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);
            time = min + '分' + seconds + '秒';
            if (min > 60) {
                min = parseInt(second_time / 60) % 60;
                var hour = parseInt(parseInt(second_time / 60) / 60);
                time = hour + '小时' + min + '分' + seconds + '秒';
            }
        }
        return time;
    }
    /**
     * 获取星期数
     * @param date: 时间戳
     * @returns {string}
     */
    static getWeek(date) {
        if (String(date).length < 13) {
            date *= 1000;
        }
        let dd = new Date(date);
        let day = dd.getDay();
        let w;
        if (day === 1) {
            w = '周一';
        } else if (day === 2) {
            w = '周二';
        } else if (day === 3) {
            w = '周三';
        } else if (day === 4) {
            w = '周四';
        } else if (day === 5) {
            w = '周五';
        } else if (day === 6) {
            w = '周六';
        } else {
            w = '周日';
        }
        return w;
    }

    /**
     * 获取小时范围
     * @param date: 时间戳
     * @returns {string}
     */
    static getClock(start, end) {
        if (String(start).length < 13) {
            start *= 1000;
        }
        if (String(end).length < 13) {
            end *= 1000;
        }

        let s = String(new Date(start).getHours()) + ':00';
        if (s.length < 2) {
            s = '0' + s;
        }
        let e = String(new Date(end).getHours()) + ':00';
        if (e.length < 2) {
            e = '0' + e;
        }
        return s + '-' + e;
    }

    /**
     * 获取x天后日期
     * @param dayCount: 天数
     * @returns {object} date: xx月xx号 week:周x
     */
    static getLaterDate(dayCount) {
        let dd = new Date();
        dd.setDate(dd.getDate() + dayCount); // 获取AddDayCount天后的日期

        return {
            date: DateUtil.formatTimestamp(dd.getTime(), 'yyyy-MM-dd'),
            str: DateUtil.formatTimestamp(dd.getTime(), 'MM月dd号'),
            week: DateUtil.getWeek(dd.getTime())
        };
    }
}

class SysUtil {
    static canUseDom() {
        return typeof window !== 'undefined' && window.document && window.document.createElement;
    }
}

export { StrUtil, DateUtil, SysUtil };
