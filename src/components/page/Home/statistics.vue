
<template>
    <div style=" position: relative;">
        <div class="box-date">
        <el-date-picker
      v-model="value3"
      :type="dateTpye"
      placeholder="选择日期"
      size='mini'
      @change='changeTime'
      value-format='yyyy-MM'
      >
    </el-date-picker>
    
    <el-radio-group v-model="dateTpye" size="mini" style="margin-left:20px" @change='changeDate'>
      <el-radio-button label="year">年</el-radio-button>
      <el-radio-button label="month">月</el-radio-button>
      <el-radio-button label="date" disabled >日</el-radio-button>
    </el-radio-group>

        </div>
               <div
              id="rllfx"
              :style="{width: '100%', height: '300px',float: 'left',marginLeft:'10px'}"
            ></div>
    </div>
</template>

<script>
import echarts from 'echarts';
import _ from '../../../utils/util.js';
import { getByType } from './fetch.js';

export default {
    data() {
        return {
            radio4: '日',
            name: 'date',
            ismonth: false,
            arrDate: [],
            value3: new Date(),
            dateTpye: 'month',
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        };
    },
    created() {},
    mounted() {
     
        this.ByType();
    },
    methods: {
        async ByType() {
            this.zxts([])
            let data = {
                year: this.year,
                month: this.month,
                date: ''
            };
            let res = await getByType(data);
            let nums;
            this.ismonth = false;
            if (this.radio4 == '月') {
                nums = 12;
                this.ismonth = false;
                for (let is = 1; is <= nums; is++) {
                    let obj = {
                        month: is
                    };
                    res.unshift(obj);
                }
            } else {
                        // 计算月份天数
                nums = _.getDays(this.year, this.month);
                this.ismonth = true;
                for (let is = 1; is <= nums; is++) {
                    let obj = {
                        date: is
                    };
                    res.unshift(obj);
                }
            }
                      // 把数据根据天\月归类
            let arr = _.repeatCount(res, this.ismonth);

            this.zxts(arr);
        },

        // getCount(arr, rank, ranktype) {
        //     var obj = {},
        //         k,
        //         arr1 = [];
        //     for (var i = 0, len = arr.length; i < len; i++) {
        //         k = arr[i];
        //         if (obj[k]) obj[k]++;
        //         else obj[k] = 1;
        //     }
        //     //保存结果{el-'元素'，count-出现次数}
        //     for (var o in obj) {
        //         arr1.push({ name: o, count: obj[o] });
        //     }
        //     //排序（降序）
        //     arr1.sort(function(n1, n2) {
        //         return n2.count - n1.count;
        //     });
        //     //如果ranktype为1，则为升序，反转数组
        //     if (ranktype === 1) {
        //         arr1 = arr1.reverse();
        //     }
        //     var rank1 = rank || arr1.length;
        //     return arr1.slice(0, rank1);
        // },

        changeTime(name) {
            let arrs = name.split('-');
            if (this.radio4 == '时') {
                this.year = arrs[0];
                this.month = arrs[1];
                this.date = arrs[2];
            } else if (this.radio4 == '日') {
                this.year = arrs[0];
                this.month = arrs[1];
                this.date = '';
            } else if (this.radio4 == '月') {
                this.year = arrs[0];
                this.month = '';
                this.date = '';
            }
            this.ByType();
        },
        changeDate(name) {
            this.arrDate = [];
            this.name = name;
            this.optionDate();
        },
        optionDate() {
            if (this.name == 'date') {
                this.radio4 = '时';
            } else if (this.name == 'month') {
                this.radio4 = '日';
                if (this.value3 == '') {
                    let date = new Date();
                    this.year = date.getFullYear();
                    this.month = date.getMonth();
                } else if (typeof this.value3 == 'string') {
                    this.month = this.value3.split('-')[1];
                } else {
                    this.month = new Date().getMonth() + 1;
                }
            } else if (this.name == 'year') {
                this.radio4 = '月';
                this.month = '';
            }
            this.ByType();
        },

        //初始化图表数据
        zxts(arr) {
            let timeStamp;
            if (this.ismonth) {
                arr.sort(function(a, b) {
                    return a.date - b.date;
                });
                timeStamp = arr.map(officer => officer.date);
            } else {
                arr.sort(function(a, b) {
                    return a.month - b.month;
                });
                timeStamp = arr.map(officer => officer.month);
            }

            let childs = arr.map(officer => officer.childs.length - 1);
       
            let num = arr.map(officer => officer.num.length - 1);
            var rllfx = echarts.init(document.getElementById('rllfx'));
            var option = {
                /* 线条颜色，可设置多个颜色 */
                color: ['#eb9886', '#4fcad0'] /* 图像四周边距设置 */,
                grid: {
                    left: 50,
                    top: 80,
                    right: 100,
                    bottom: 70
                },
                title: {
                    text: '报警信息',
                    x: 'left',
                    y: '20px',
                    textStyle: {
                        //主标题文本样式{}
                        fontSize: 16,
                        fontWeight: 'bolder',
                        color: '#9ecccd'
                    }
                },
                /* 图例说明 */
                legend: {
                    // 图例排项 vertical-"竖向"; horizontal-"横向"
                    orient: 'vertical', // 图例组件离容器左侧的距离
                    right: 20,
                    top: 30,
                    textStyle: {
                        color: '#6ab2ec'
                    }, // 与series中每个name一一对应
                    data: ['未处理', '报警总数']
                },
                /* 鼠标悬浮时显示数据 */
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                        show: true
                    }
                },
                xAxis: {
                    type: 'category',
                    data: timeStamp, //设置轴线的属性
                    name: `单位(${this.radio4})`,
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    }, //调整x轴的lable
                    axisLabel: {
                        textStyle: {
                            fontSize: 10 // 让字体变小
                        },
                        rotate: 0
                        // interval: this.interval
                    }
                },
                yAxis: {
                    type: 'value', // 控制网格线是否显示
                    name: '单位(次)',
                    splitLine: {
                        show: true, //  改变轴线颜色
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: ['#999']
                        }
                    }, //设置轴线的属性
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    }
                } /* 数据配置，若有多条折线则在数组中追加{name: , data: } */,
                series: [
                    {
                        name: '未处理',
                        data: childs || [0,0,0],
                        type: 'line',
                        symbol: 'circle', // 设置折点大小
                        symbolSize: 5, // 设置为光滑曲线
                        smooth: false,
                        areaStyle: {}
                    },
                    {
                        name: '报警总数',
                        data: num || [0,0,0],
                        type: 'line',
                        symbol: 'circle', // 设置折点大小
                        symbolSize: 5, // 设置为光滑曲线
                        smooth: false,
                        areaStyle: {}
                    }
                ]
            };
            rllfx.setOption(option);
        }
    }
};
</script>

<style>
.box-date {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
}
</style>
