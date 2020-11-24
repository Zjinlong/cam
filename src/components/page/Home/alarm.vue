<template>
    <div>
         <div id="main1" style="float:left;width:100%;height: 300px"></div>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    props:['data'],
    data(){
        return{
              
        }
    },
created(){
  
},
mounted(){
this.initData()

},
methods:{

    //初始化数据
    initData(data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'));
    
      // 绘制图表
      myChart.setOption({
          title : {
              text: '摄像机报警统计',//主标题
              x:'center',//x轴方向对齐方式
              y:'20px',
            textStyle: {
              fontSize: 16,
              fontWeight: 'bolder',
              color: '#89d2ce',
            },
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
        
          series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:data || [{name:'白色摄像头',value:'7'},{name:'走廊摄像头',value:'9'},{name:'大厅摄像头',value:'6'}],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  },
                  label: {
                normal: {
                  position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                  // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                  // {a}指,series.name  {b}指series.data的name
                  // {c}指series.data的value  {d}%指这一部分占总数的百分比
                  formatter: '{b}',
                
                },
                
              },

                     labelLine: {
                normal: {
                  show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                }
              },
              }
          ]
      });
    },
  }
}
</script>

<style>

</style>
