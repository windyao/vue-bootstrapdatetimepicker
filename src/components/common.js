/*
 * @Author: zhenwei zhang 
 * @Date: 2018-07-04 16:27:50 
 * @Last Modified by: zhenwei zhang
 * @Last Modified time: 2018-08-20 16:31:26
 * 通用方法封装
 */

import Moment from 'moment';
import Numeral from 'numeral';
import _ from 'lodash';

export default {
    isMobile(){
        return navigator.userAgent.match(/mobile/i);
    },
    getToday () {
        return Moment().subtract('0', 'days').format('YYYY-MM-DD');
    },
    getNextNDay (n, m) {
        let day = m ? m : new Date()
        return Moment(day).add(n,'days').format('YYYY-MM-DD');
    },
    getPassedNDay(n, m) {
        let day = m ? m : new Date()
        return Moment(day).subtract(n,'days').format('YYYY-MM-DD');
    },
    isToday (m) {
        let today = Moment().subtract('0', 'days').format('YYYY-MM-DD');
        let paramToady = Moment(m).format('YYYY-MM-DD');
        return today == paramToady ? true : false;
    },
    isTomorrow (m) {
        let tomorrow = Moment().add('1', 'days').format('YYYY-MM-DD');
        let paramTomorrow = Moment(m).format('YYYY-MM-DD');
        return tomorrow == paramTomorrow ? true : false;
    },
    getYesterday () {
        return Moment().subtract('1', 'days').format('YYYY-MM-DD');
    }, 
    get7DaysAgo () {
        return Moment().subtract('7', 'days').format('YYYY-MM-DD');
    },
    getNDaysAgo (n) {
        return Moment().subtract(n, 'days').format('YYYY-MM-DD');
    },
    addHours (m, hour) {
        return Moment(m).add(hour, 'hours').valueOf();
    },
    formatMonth(m){
        let time = Moment(m).format('YYYY-MM');
        if(time == 'Invalid date'){
            return '-';
        }
        return time;
    },
    formatDate(m){
        let time = Moment(m).format('YYYY-MM-DD');
        if(time == 'Invalid date'){
            return '-';
        }
        return time;
    },
    formatUnix(m){
        let time = Moment(m).valueOf();
        if(time == 'Invalid date'){
            return null;
        }
        return time;
    },
    formatDateTime(m, f){
        let time = Moment(m).format(f || 'YYYY-MM-DD HH:mm:ss');
        if(time == 'Invalid date'){
            return '-';
        }
        return time;
    },
    formatMoney(m){
        return Numeral(m).format('0.00');
    },
    formatMobile(m){
        if(!m || m.length != 11){
            return m;
        }
        return m.substr(0, 3) + '****' + m.substr(7,4);
    },
    isInt(num){
        if (!isNaN(num)){
            num = parseFloat(num, 10);
            return parseInt(num, 10) === num;
        } 
        return false;
    },
    isFloat(num){
        return !isNaN(num) && num.toString().indexOf('.') >= 0;
    },
    getURLParam(name){
        var rs = '';
        var query = location.href.substr(location.href.indexOf('?')+1);
        if(query){
          var params = query.split('&');
          params.find(it=>{
            var param = it.split('=');
            if(param.length == 2 && param[0] == name){
              rs = param[1];
              return true;
            }
          });
        }
        return rs;
    },
    mapObject(obj){
        return _.mapValues(obj, function(value, key) {
            return value == null ? '' : value;
        });
    },
    isJson(str){
        try {
            if (str) {
                var o = JSON.parse(str);
                if (o && o.constructor === Object) {
                    return true;
                }
            }
        }
        catch (e) {
        }
        return false;
    },
    log(action, val){
        if(process.env.NODE_ENV == 'development'){
            console.log(action, val);
        }
    }
}