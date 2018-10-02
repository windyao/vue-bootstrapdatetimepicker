<template>
    <div class="timePicker">
        <input 
            type="text" 
            :readonly="readonly ? true : false" 
            class="form_datetime"
            :data-date-format="options && options.format || 'yyyy-mm-dd hh:ii'"
            :placeholder="placeholder || 'select any date...'"
            :id="`${dynamicId}`">
    </div>
</template>

<script>
/*
* @Author: zhenwei zhang 
* @Date: 2018-08-16 10:16:38 
 * @Last Modified by: zhenwei zhang
 * @Last Modified time: 2018-08-21 20:55:13
*  本组件对bootStrap DateTimePicker进行了封装，并对elementUI中的时间选择控件进行平滑过渡
*  这个组件是对 bootstraptimedatepicker的完整封装 see: http://www.bootcss.com/p/bootstrap-datetimepicker/index.htm
*/
import $ from 'jquery';
import C from './common.js';
import './bootstrap-datetimepicker.js';
import './bootstrap-datetimepicker.css';
import './locales.js';

/*instance for datetimepicker*/
let picker = {
    props: [
        'type', 
        'placeholder', 
        'startDate', 
        'endDate', 
        'valueFormat', 
        'useCurrent', 
        'readonly', 
        'value',
        'options',
        'daysOfWeekDisabled'
    ],
    name: 'TimePicker',
    data(){
        return{
            dynamicId: '', /*add dynamic id for multiple usage*/
            instance: {}, /*instance object*/
            date: this.defaultValue || '',
            pickerValue: '',
            minDate: '',
            maxDate: '',
            optionsDefault: {
                language:  'zh-CN',
                useCurrent: false,
                pickerPosition: 'bottom-left',
                autoClose: false,
                initialDate: '',
                minuteStep: 5
            },
            userOptions: {}
        }
    },
    created(){
        const jqueryObjectId = `dateTimePicker${this.random(1, 10000000000)}`;
        this.dynamicId = jqueryObjectId;
    },
    mounted() {
        $(`#${this.dynamicId}`).datetimepicker(this.userOptions);
        /*初始化监听事件，完成jquery和vue组件的双向绑定*/
        $(`#${this.dynamicId}`).on('changeDate',(ev)=>{
            if(ev.date){
                this.pickerValue = ev.date; /*转化时间*/
                this.$emit('change-date', ev);
            }
        }).on('changeYear',(ev)=>{
            if(ev){
                this.$emit('change-year', ev);
            }
        }).on('changeMonth',(ev)=>{
            if(ev){
                this.$emit('change-month', ev);
            }
        }).on('outOfRange',(ev)=>{
            if(ev){
                this.$emit('out-of-range', ev);
            }
        });
    },
    computed: {
        timeResult(){
            const format = this.valueFormat || 'timestamp';
            const time = this.pickerValue || '';
            if(format == 'timestamp'){
                /*return timestamp*/
                return C.formatUnix(time);
            }
            if(format == 'datetime'){
                /*return datetime*/
                return C.formatDateTime(time);
            }
            if(format == 'date'){
                /*return date*/
                return C.formatDate(time);
            }
        }
    },
    methods: {
        random(start, end){
            return Math.floor(Math.random() * (end - start) + start);
        },
        remove(){
           /*remove dom*/
           $(`#${this.dynamicId}`).datetimepicker('remove');
        },
        hide(){
           /*hide dom*/
           $(`#${this.dynamicId}`).datetimepicker('hide');
        },
        update(){
           /*refresh dom*/
           $(`#${this.dynamicId}`).datetimepicker('update');
        },
        getInstance(){
            return `#${this.dynamicId}`;
        },
    },
    watch:{
        pickerValue(val){
            this.$emit('change', this.timeResult); /*emit change events*/
            this.$emit('input', this.timeResult); /*set v-model binding*/
        },
        options: {
            handler(opt){
                let {optionsDefault} = this;
                if(!opt){
                    this.userOptions = optionsDefault;
                }else{
                    if(opt.minuteStep){
                        opt.minuteStep = parseInt(opt.minuteStep)
                    }
                    this.userOptions = optionsDefault;
                    this.userOptions = Object.assign({}, this.userOptions, opt);
                }
                this.remove(); /*reload*/
                $(`#${this.dynamicId}`).datetimepicker(this.userOptions);
            },
            deep: true,
            immediate: true
        },
        startDate(){
            $(`#${this.dynamicId}`).datetimepicker('setStartDate',this.startDate || '');
        },
        endDate(){
            $(`#${this.dynamicId}`).datetimepicker('setEndDate', this.endDate || '');
        },
        daysOfWeekDisabled(){
            $(`#${this.dynamicId}`).datetimepicker('setDaysOfWeekDisabled', this.daysOfWeekDisabled || null);
        },
        value(val){
            /*bind v-model*/
            if(!val){
                this.pickerValue = '';
                $(`#${this.dynamicId}`).val('');
            }else{
                $(`#${this.dynamicId}`).val(C.formatDateTime(val, 'YYYY-MM-DD HH:mm'));
            }
        },
    }
}
/* vue instance */
export default picker;
</script>

<style>
    .timePicker{
        position: relative;
    }
    .form_datetime{
        position: relative;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 3px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 32px;
        line-height: 32px;
        outline: 0;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
</style>

