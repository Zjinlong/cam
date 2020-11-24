<template>
    <div style=" position: relative">
        <div class="box-date">
                  <el-date-picker
      v-model="value3"
      :type="dateTpye"
      placeholder="选择日期"
      size='mini'
         @change='changeTime'
         value-format='yyyy-M-d'
      >
    </el-date-picker>

      <el-radio-group v-model="dateTpye" size="mini" style="margin-left:20px" @change='changeDate'>
      <el-radio-button label="year">年</el-radio-button>
      <el-radio-button label="month">月</el-radio-button>
      <el-radio-button label="date">日</el-radio-button>
    </el-radio-group>

        </div>
               <div
              id="rllfxs"
              :style="{width: '100%', height: '300px',float: 'left',marginLeft:'10px'}"
            ></div>
    </div>
</template>
    
<script>
import {
    getByStatus,
    } from './fetch.js';
import echarts from "echarts";
export default {
    data(){
        return{
            data:[  
             {id:0,camName:  '白色摄像机',x:10,y:25,w:60,h:60,alertTypeName:'离岗',timeStamp:'2020-03-31 10:18:04',alertImgUrl:'https://www.lwavn.club/picture/cover/2f6473a4bb7b40cb97da72d4519f72fa?v=1594625769776',statusName: "未处理",memo: "dummy result.",year: 2020,month: 9,date: 15,},
             {id:1,camName:  '走廊摄像机',x:10,y:25,w:60,h:60,alertTypeName:'安全帽',timeStamp:'2020-03-31 10:18:04',alertImgUrl:'https://www.lwavn.club/picture/cover/2f6473a4bb7b40cb97da72d4519f72fa?v=1594625769776',statusName: "未处理",memo: "dummy result.",year: 2020,month: 9,date: 15,},
             {id:2,camName:  '灰色摄像机',x:10,y:25,w:60,h:60,alertTypeName:'非法出入',timeStamp:'2020-03-31 10:18:04',alertImgUrl:'https://www.lwavn.club/picture/cover/2f6473a4bb7b40cb97da72d4519f72fa?v=1594625769776',statusName: "未处理",memo: "dummy result.",year: 2020,month: 9,date: 15,},
            ],
           
        value3:new Date(),
         dateTpye:'month',
         year:new Date().getFullYear(),
         month:new Date().getMonth()+1,
         date:'',
         radio4: '月',
        }
    },
created(){
},
mounted(){
 
    
this.ByStatu()
},
methods:{
     getCount(arr, rank,ranktype){ 
    var obj = {}, k, arr1 = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        k = arr[i];
        if (obj[k]) 
            obj[k]++;
        else 
            obj[k] = 1;
    }
    //保存结果{el-'元素'，count-出现次数}
    for (var o in obj) {
        arr1.push({name: o, count: obj[o]});
    }
    //排序（降序）
    arr1.sort(function (n1, n2) {
        return n2.count - n1.count
    });
    //如果ranktype为1，则为升序，反转数组
    if(ranktype===1){
        arr1=arr1.reverse();
    }
    var rank1 = rank || arr1.length;
    return arr1.slice(0,rank1);
},
    changeTime(name){
      let arrs = name.split('-')
      if(this.radio4 == '日'){
      this.year=arrs[0]
      this.month=arrs[1]
      this.date=arrs[2]
      }else if(this.radio4 == '月'){
      this.year=arrs[0]
      this.month=arrs[1]
        this.date=''
      }else if(this.radio4 == '年'){
              this.year=arrs[0]
      this.month=''
        this.date=''
      }
     
   this.ByStatu()
    },
    changeDate(name){
     
 if(name=='date'){
this.radio4 = '日'
 }else if(name =='month'){
this.radio4 = '月'
this.date = ''
 }else if(name =='year'){
this.radio4 = '年'
 this.date = ''
     this.month='' 
 }  
//  this.showchart()
  this.ByStatu ()
},
async ByStatu(){
    this.showchart([])
         let data ={
     year:this.year,
     month:this.month,
     date:this.date
 } 
 let res = await getByStatus(data)
const officersIds =res.map(officer => officer.alertTypeName);
let arr = this.getCount(officersIds) || []
this.showchart(arr)
},
    //初始化数据
showchart(arr) {
  
    if(arr){
       
        var y= arr.map(officer => officer.name || ['0','1','2']) || ['0','1','2'];
        var x= arr.map(officer => officer.count||  [0,1,2]) || [0,1,2];
     
    }
   if(x.length == 0){
    x = [0,0,0,0]
   }
   if(y.length==0){
    x = [0,0,0,0]
       
   }
    var myChart = echarts.init(document.getElementById('rllfxs'));
    this.option = {
        stillShowZeroSum: false,
         grid: {
          left: 70,
          top: 60,
          right: 100    ,
          bottom: 70
        },
        title: {
          text:'事件类型',
          x: "left",
          y: "20px",
          textStyle: {
            //主标题文本样式{}
            fontSize: 16,
            fontWeight: "bolder",
            color: "#9ecccd"
          }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}:{c}'
        },
        xAxis: [
            {
                show: true,
                type: 'value',
                boundaryGap: [0, 0],
                position: 'bttom',
                 name:`单位(次)`,
                 axisLine: {
            lineStyle: {
              color: "#999"
            }
          }, //调整x轴的lable
            }
        ],
        yAxis: [
        {
            type: 'category',
            axisTick: {
                show: false
            },
            data:y || ['0','1','2']
        }
    ],
        // color: ['#1685ff', '#7eef7d'],
        series: [
            {
            name: '数量',
            type: 'bar',
            itemStyle:{
                normal:{
                   color:function(params){
                     var colorList = ['red','#1685ff','#7eef7d','#c8ba23','#49af4f'];
                     return colorList[params.dataIndex]
                   }
                }
            },
            // barWidth:'30px',
            label: {
                show: true,
                position: 'inside'
            },
            data: x || [1,1,0]
        },
        ]
    };
    myChart.setOption(this.option);
},
  }
}
</script>

<style>
.box-date{
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
}
</style>
