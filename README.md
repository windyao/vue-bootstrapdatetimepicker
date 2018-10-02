# vue-bootstrapdatetimepicker
this package is an open source for any one who wants to use bootstrap datetimepicker for vue.
this components required datetimepicker from [project](https://github.com/uxsolutions/bootstrap-datepicker).
if you are going to use this components on your project, you nedd bootstrap, jquery.
the offcial documents online [open](https://bootstrap-datepicker.readthedocs.io/en/stable/) this link.

<p><img width="100px" src="https://image.flaticon.com/icons/svg/1040/1040214.svg"></p>

### online demo
if you want to see online demo
<p><a href="https://virskor.github.io/vue-bootstrapdatetimepicker/" target="_blank">open online demo and docs</a></p>
<p><a href="https://bootstrap-datepicker.readthedocs.io/en/stable/" target="_blank">original document for datetimepicker</a></p>

### webpack configurations
this project required datetimepicker's source code already. before you are going to use this project, check your webpack configurations like below.
```js
    ///webpack plugins
    plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/), //if you are using I18N locales, do not add this
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ProvidePlugin({
        $               : 'jquery',
        jQuery          : 'jquery',
        'window.jQuery' : 'jquery',
        Popper          : ['popper.js', 'default'],
        Alert           : 'exports-loader?Alert!bootstrap/js/dist/alert',
        Button          : 'exports-loader?Button!bootstrap/js/dist/button',
        Carousel        : 'exports-loader?Carousel!bootstrap/js/dist/carousel',
        Collapse        : 'exports-loader?Collapse!bootstrap/js/dist/collapse',
        Dropdown        : 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
        Modal           : 'exports-loader?Modal!bootstrap/js/dist/modal',
        Popover         : 'exports-loader?Popover!bootstrap/js/dist/popover',
        Scrollspy       : 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
        Tab             : 'exports-loader?Tab!bootstrap/js/dist/tab',
        Tooltip         : "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
        Util            : 'exports-loader?Util!bootstrap/js/dist/util',
        moment: 'moment',
    })
  ]
```
### notices
this project required jquery, bootstrap(about:^3.3.7), moment.js

### install
if you are using npm:
```sh
    npm install --save datetimepicker4vue
```
or yarn
```sh
    yarn add datetimepicker4vue
```

### quick start
to use this component would be simple!
import component
```js
    import 'bootstrap/dist/css/bootstrap.css'; //important
    import 'datetimepicker4vue/dist/datetimepicker4vue.min.css';
    import TimePicker from 'datetimepicker4vue';

    new Vue({
        data(){
            return{
                date: '',
                options: {
                    language:  'zh-CN',
                    useCurrent: true,
                    autoclose: true
                }
            }
        },
        components: {
            TimePicker
        }
    }).$mount('#app');;
```
bind your element
```html
    <div id='app'>
        <time-picker v-model="date" :options="options"></time-picker>
    </div>
```
### method usage
to use this components, you can not use some original method from datetimepicker.
hey!! do not worry, you can use v-bind for these methods!.

```js
    getDate,getUTCDate ....
    v-model='date'
    //get date method use v-model, if you need different format style, do it your self.
    by update binding options, you can update components date immediately.

    setDatesDisabled
    v-bind:datesDisabled:='datesDisabled'

    setDaysOfWeekDisabled
    v-bind:daysOfWeekDisabled:='daysOfWeekDisabled'

    setDaysOfWeekHighlighted
    v-bind:daysOfWeekHighlighted:='daysOfWeekHighlighted'

    show,hide,destroy
    use: v-if, v-show

    update
    v-bind:update='update'
```
