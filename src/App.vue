<template>
  <div id="app">
    <div class="demo">
        <h1>datetimepicker4vue 🐶</h1>
        <p>this application was built for testing, you will know the method to load your datetimepicker at this page.</p>
        <a target="_blank" href="https://github.com/virskor/vue-bootstrapdatetimepicker"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub"></a>
        <p>这个组件于上海元兵科技有限公司build完成，我们将把更多作品发布，也将制作更多有趣的控件，开放并共赢~！</p>
    </div>
    <div class="demo">
        <h3>Demo</h3>
        <time-picker class="timepicker" @out-of-range="handleEventMethod" @change-month="handleEventMethod" @change-year="handleEventMethod" @change-date="handleEventMethod" v-model="date" :valueFormat="valueFormat" :options="options" :placeholder="placeholder"></time-picker>
        <hr>
        <p>my birthday is( formated ): {{dateFormat ? dateFormat : 'empty'}}</p>
        <p>Before you read official documents, read<a href="https://github.com/virskor/vue-bootstrapdatetimepicker#README.md" target="_blank">&nbsp;this page( notice information and documents for datetimepicker)&nbsp;</a>please!</p>
    </div>
    <div class="params">
        <div>
            <h3>Options and Bindings</h3>
            <p>
                format，weekStart，startDate，endDate，daysOfWeekDisabled，autoclose，startView，minView，
                maxView，todayBtn，todayHighlight，keyboardNavigation，language，forceParse， minuteStep，
                pickerReferer，pickerPosition，viewSelect，showMeridian，initialDate
                <b>, i will not write all methods on this demo.</b>
            </p>
            <div>
                    <b>getDate,getUTCDate ....</b>
                    v-model='date'
                    </b>
                    </p>
                    //get date method use v-model, if you need different format style, do it your self.
                    by update binding options, you can update components date immediately.
                    </p>
                    <b>setStartDate</b>
                    v-bind:startDate:='startDate'
                    </p>
                    <b>setEndDate</b>
                    v-bind:endDate:='endDate'
                    </p>
                    <b>show,hide,destroy</b>
                    use: v-if, v-show
                    </p>
                    <b>update</b>
                    v-bind:update='update'
            </div>
            <h3>Format</h3>
            <p>Do not use datetimepicker's time format form, please use moment.js format form.</p>
            <p>Influenced: :valueFormat</p>
            <p>Find documents on <a href="https://momentjs.com/docs/#/parsing/string-format/" target="_blank">moment.js</a></p>
            <h3>Methods</h3>
            <p>By using v-model and v-bind, you need not use any method defined by datetimepicker</p>
            <h3>Events</h3>
            <p><b>changeDate:</b> By using v-model, the latest date selected by user would be automatically updated.</p>
            <p>Next events would return a (jQuery.Event) date object that included details of components.</p>
            <p><b>changeDate:</b> @change-date="handleEventMethod"</p>
            <p><b>changeYear:</b> @change-year="handleEventMethod"</p>
            <p><b>changeMonth:</b> @change-month="handleEventMethod"</p>
            <p><b>outOfRange:</b> @out-of-range="handleEventMethod"</p>
            <p><b>these events would be seen at chrome, console. open developer tool and select any date, to watch any modify events.</b></p>
            <hr>
            <p>Set <b>options.pickerPosition</b>:</p>
            <select v-model="options.pickerPosition">
                <option value="bottom-left">bottom-left</option>
                <option value="bottom-right">bottom-right</option>
                <option value="top-left">top-left</option>
                <option value="top-right">top-right</option>
            </select>
            <hr>
            <p>Set picker <b>options.autoclose</b>:</p>
            <select v-model="options.isAutoClose">
                <option value="true">true</option>
                <option value="false">false</option>
            </select>
            <hr>
            <p>Set picker <b>placeholder</b>:</p>
            <input v-model="placeholder"/>
            <hr>
            <p>Set picker <b>valueFormat</b>, now result would be :{{date ? date : 'empty'}}</p>
            <select v-model="valueFormat">
                <option value="timestamp">timestamp</option>
                <option value="datetime">datetime</option>
                <option value="date">date</option>
            </select>
            <hr>
            <p>Set picker <b>options.language</b></p>
            <select v-model="options.language">
                <option v-for="it in languagesList" :key="it" :value="it">{{it}}</option>
            </select>
            <hr>
            <p>Set picker <b>options.weekStart</b></p>
            <select v-model="options.weekStart">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            <hr>
            <p>Set picker <b>options.forceParse</b>:</p>
            <select v-model="options.isforceParse">
                <option value="true">true</option>
                <option value="false">false</option>
            </select>
            <hr>
            <p>Set picker <b>options.minuteStep</b>:</p>
            <select type="number" v-model="options.minuteStep">
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="30">30</option>
            </select>
            <hr>
            <p>clean picker:</p>
            <button @click="cleanValue">clean picker</button>
            <hr>
            <p>set picker default value to now: this method means initialDate() will not available at this component</p>
            <button @click="setNow">set time to now</button>
            <hr>
            <p>source code preview, <b>not all option items will be listed at this part, it's for simple preview only.</b></p>
            <textarea :value="optionsCode"></textarea>
        </div>
    </div>
  </div>
</template>

<script>
//import 'datetimepicker4vue/dist/vue-datetimepicker.min.css'
//import {TimePicker} from 'datetimepicker4vue';
import 'bootstrap/dist/css/bootstrap.css';
import TimePicker from './components/TimePicker'
import C from './components/common.js';

export default {
    name: 'App',
    data(){
        return {
            date: '',
            dateFormat: '',
            valueFormat: 'timestamp',
            options: {
                pickerPosition: 'bottom-left',
                isAutoClose: 'true',
                autoclose: true,
                weekStart: 0,
                isforceParse: 'true',
                forceParse: false,
                minuteStep: 5,
                language: 'en'
            },
            placeholder: 'select your birthday',
            optionsCode: '',
            languagesList: []
        }
    },
    mounted(){
        this.$nextTick(async ()=>{
            Object.keys($.fn.datetimepicker.dates).forEach((key)=>{
                this.languagesList.push(key);
            });
        });
    },
    methods: {
        cleanValue(){
            this.date = '';
        },
        setNow(){
            this.date = new Date().getTime();
        },
        handleEventMethod(ev){
            console.log(ev);
        }
    },
    components: {
        TimePicker
    },
    watch: {
        date(val){
            this.dateFormat = val ? C.formatDateTime(val) : '';
        },
        "options.isAutoClose": function(val){
            if(val){
                this.options.autoclose = this.options.isAutoClose == 'true' ? true : false
            }
        },
        "options.isforceParse": function(val){
            if(val){
                this.options.forceParse = this.options.forceParse == 'true' ? true : false
            }
        },
        options: {
            handler(opt){
                if(opt){
                    this.optionsCode = `
                       <time-picker v-model="date" :valueFormat="valueFormat" :options="options" :placeholder="placeholder"></time-picker>
                       // javascript code for vue preview
                        import 'bootstrap/dist/css/bootstrap.css'; //important
                        import 'datetimepicker4vue/dist/vue-datetimepicker.min.css'
                        import TimePicker from 'datetimepicker4vue';

                        data(){
                            return{
                                    date: '',
                                    valueFormat: '${this.valueFormat}',
                                    placeholder: '${this.placeholder}'
                                    option: {
                                        pickerPosition: '${opt.pickerPosition}',
                                        autoclose: ${opt.autoclose},
                                        weekStart: ${opt.weekStart},
                                        forceParse: ${opt.forceParse},
                                        minuteStep: ${opt.minuteStep},
                                    }
                            }
                        },
                        components: {TimePicker}
                    `;
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<style>
body{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#app {
  color: #2c3e50;
}

#app .demo{
    position: relative;
    width: 80%;
    min-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 4px;
    text-align: left;
    border: 1px solid #dddddd;
}

#app .demo .timepicker{
    width: 200px;
}

#app .params{
    position: relative;
    width: 80%;
    min-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 4px;
    text-align: left;
    border: 1px solid #dddddd;
}

#app .params input, textarea{
    border-radius: 2px;
    padding: 4px;
    border: 1px solid #dcdfe6;
}

#app .params textarea{
    height: 200px;
    width: 100%;
    color: #00bdf7;
    background: #343434;
}
</style>
