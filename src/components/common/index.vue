<template>
  <div style="background:#eee;min-height: 1090px;width:1903px">
    <!-- <div class="sdc_box">
      <div class="sdc_title" :class="[d.css?'f':'t']">{{d.smdd}}</div>
      <div class="language">
        <button @click="zw">中文</button>
        <button @click="yw">English</button>
      </div>
    </div>

    <div class="sdc_body">
      <div class="sdc_left">
        <div class="sdc_leftTop">
          <ul class="sdc_topList">
            <li>
              <span class="sdc_span">{{d.dq}}</span>
              <input type="text" class="sdc_inp" :placeholder="d.qsrdq" v-model="d.inphw" />
            </li>
                  <button class="sdc_topBtn" @click="def(d.inphw)">{{d.cx}}</button>

          </ul>
          <div>

          </div>
        </div>

        <div class="sdc_leftbottom">
        <ul  class="sdc_topList" style="  border-bottom: 1px solid #000;">
          <li>
              <span class="sdc_span">{{d.kssj}}</span>
              <DatePicker
                type="date"
                :options="options3"
                :placeholder="startDate"
                :start-date="new Date(2020, 1, 15)"
                style="width: 200px;background:#141723"
                id="datepicker"
                @on-change="onstartTime"
              ></DatePicker>
            </li>
            <li>
              <span class="sdc_span">{{d.jssj}}</span>
              <DatePicker
                type="date"
                :options="options3"
                :placeholder="endDate"
                style="width: 200px;background:#141723"
                id="datepicker"
                @on-change="onendTime"
              ></DatePicker>
            </li>
        </ul>
          <div class="sdc_t">
            <p>{{d.sj}}</p>
            <p>{{d.ljrs}}</p>
          </div>
          <ul class="sdc_list">
            <li v-for="(ds,i) in data" :key="i">
              <p>
                {{formatTime(ds.date,'M-D-Y')}}
              </p>
              <input type="text" v-model="ds.number" />
            </li>
          </ul>
          <button class="sdc_but" @click="qingkong()">{{d.qk}}</button>
          <button class="sdc_but" @click="forecast()">{{d.yc}}</button>
        </div>
      </div>
      <div class="sdc_center">
        <div class="sdc_h1">
          <span>{{d.hw}}</span>
          <div class="button">
 <button @click="all()">{{d.hwyq}}</button>
          </div>
        </div>
        <div style>
          <div style>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 新版 -->
    <div class="sdc_box">
    </div>
         <div class="sdc_logo">
  <p class="logo"><img src="static/bmi_logo.png" alt=""></p>
  <p class="sdc_yuyan">
    <span>English</span>
    <span>中文</span>
  </p>
     </div>
     <div class="sdc_list">
       <ul>
         <li class="sdc_listTitle">疫情预测</li>
         <li class="sdc_listTitles">新型冠状病毒肺炎</li>
         <li class="sdc_input">
           <input type="text" name="" id="">
           <button>查询</button>
         </li>
       </ul>
     </div>
     <div class="sdc_content">
     <div class="sdc_content_left">
      <ul class="sdc_ul">
        <li>
          <span class="span">{{d.kssj}}</span>
                     <DatePicker
                type="date"
                :options="options3"
                :placeholder="startDate"
                :start-date="new Date(2020, 1, 15)"
                style="width: 200px;"
                id="datepicker"
                @on-change="onstartTime"
              ></DatePicker>
        </li>
         <li>
          <span class="span">{{d.jssj}}</span>
          <DatePicker
                type="date"
                :options="options3"
                :placeholder="endDate"
                style="width: 200px;"
                id="datepicker"
                @on-change="onendTime"
              ></DatePicker>
        </li>
      </ul>
      <div class="ol">
        <div class="ol-top">
      <p style="  border-right: 1px solid #CECECE">{{d.sj}}</p>
       <p>{{d.ljrs}}</p>
        </div>

    <ol  class="ol1">
    <li v-for="(ds,i) in data" :key="i">
              <p>
                {{formatTime(ds.date,'M-D-Y')}}
              </p>
        <p>  <input type="text" v-model="ds.number" /></p>
            </li>
    </ol>
     <div class="ol-but">
          <button class="sdc_but" @click="qingkong()">{{d.qk}}</button>
          <button class="sdc_but" @click="forecast()">{{d.yc}}</button>
     </div>
      </div>

     </div>
     <div class="sdc_content_right">
       <div class="sdc_content-top">
            <div class="sdc_top">
              <p>国内疫情</p>
              <p>国外疫情</p>
            </div>
            <ul class="sdc_top_list">
              <li>
                  <p>现有确诊</p>
                  <p style="font-size:28px">{{chinaTotal.nowConfirm}}</p>
                  <p>
         {{chinaAdd.nowConfirm}}
                  </p>
              </li>
                  <li>
                  <p>无症状</p>
              <p style="font-size:28px">{{chinaTotal.noInfect}}</p>
                  <p>{{chinaAdd.noInfect}}</p>
              </li>
               <li>
                  <p>现有疑似</p>
                <p style="font-size:28px">{{chinaTotal.suspect}}</p>
                  <p>{{chinaAdd.suspect}}</p>
              </li>
               <li>
                  <p>现有重症</p>
                 <p style="font-size:28px">{{chinaTotal.nowSevere}}</p>
                  <p>{{chinaAdd.nowSevere}}</p>
              </li>
              <li>
                  <p>累计确诊</p>
          <p style="font-size:28px">{{chinaTotal.confirm}}</p>
                  <p>{{chinaAdd.confirm}}</p>
              </li>
              <li>
                  <p>境外输入</p>
           <p style="font-size:28px">{{chinaTotal.importedCase}}</p>
                  <p>{{chinaAdd.importedCase}}</p>
              </li>
                  <li>
                  <p>累计治愈</p>
           <p style="font-size:28px">{{chinaTotal.heal}}</p>
                  <p>{{chinaAdd.heal}}</p>
              </li>    <li>
                  <p>累计死亡</p>
                      <p style="font-size:28px">{{chinaTotal.dead}}</p>
                  <p>{{chinaAdd.dead}}</p>
              </li>
            </ul>
       </div>
       <div class="sdc_content-m">
       海外
       </div>
       <div class="sdc_tb">
                 <div
              id="rllfx"
              :style="{width: '580px', height: '440px',float: 'left',marginLeft:'10px'}"
            ></div>
            <div
              id="rllfxs"
              :style="{width: '580px', height: '440px',float: 'left',marginLeft:'30px'}"
            ></div>
       </div>
     </div>
     </div>
  </div>
</template>
<script>
import "../../node_modules/echarts/map/js/china.js";
import echarts from "echarts";
export default {
  data() {
    return {
      e: {
        smdd: "Smart Data Trend Prediction of COVID-19",
        dq: "Country/Territory/Area",
        qsrdq: "Please enter region",
        hwyq: "The Prediction of Global Cases",
        hw: "Globally (except China)",
        inphw: "Globally (except China)",
        kssj: "Start date",
        jssj: "End date",
        cx: "inquire",
        qk: "Empty",
        yc: "Predict",
        sj: "Date",
        ljrs: "Total confirmed cases",
        zzyc: "Prediction of new confirmed cases",
        sjxz: "Actual data",
        ycxz: "Predicted data",
        ljyc: "Prediction of total confirmed cases",
        sjlj: "Actual data",
        yclj: "Predicted data",
        ycz: "In the forecast",
        zw: "To switch between Chinese",
        css: false
      },
      c: {
        smdd: "司马大大疫情预测",
        dq: "预测地区",
        qsrdq: "请输入地区",
        hwyq: "海外疫情预测",
        inphw: "海外",
        hw: "海外",
        kssj: "开始时间",
        jssj: "结束时间",
        cx: "查询",
        qk: "清空",
        yc: "预测",
        sj: "时间",
        ljrs: "累计人数",
        zzyc: "新增人数预测",
        sjxz: "实际新增人数",
        ycxz: "预测新增人数",
        ljyc: "累计新增人数",
        sjlj: "实际累计人数",
        yclj: "预测累计人数",
        ycz: "预测中",
        interval: 1,
        zw: "切换英文",
        css: true
      },
      datas: [],
      arr: {
        location: "海外",
        increased: {
          reality: [
            {
              date: "2020/03/01",
              number: 10
            },
            {
              date: "2020/03/02",
              number: 50
            },
            {
              date: "2020/03/03",
              number: 30
            }
          ],
          forecast: [
            {
              date: "2020/03/01",
              number: 10
            },
            {
              date: "2020/03/02",
              number: 50
            },
            {
              date: "2020/03/03",
              number: 30
            },
            {
              date: "2020/03/04",
              number: 30
            }
          ]
        },
        total: {
          reality: [
            {
              date: "2020/03/01",
              number: 10
            },
            {
              date: "2020/03/02",
              number: 50
            },
            {
              date: "2020/03/03",
              number: 30
            }
          ],
          forecast: [
            {
              date: "2020/03/01",
              number: 10
            },
            {
              date: "2020/03/02",
              number: 50
            },
            {
              date: "2020/03/03",
              number: 30
            },
            {
              date: "2020/03/04",
              number: 30
            }
          ]
        }
      },
      d: {},
      startDate: "",
      endDate: "",
      data: [],
      area: "海外",
      startTime: "",
      endTime: "",
      forecasts: "",
      location: "海外",
      increased: {},
      url: "",
      total: {},
      idate: [],
      idates: [],
      tdate: [],
      tdates: [],
      inumber: [],
      inumbers: [],
      tnumber: [],
      tnumbers: [],
      chinaTotal: {},
      chinaAdd:{},
      reality: "",
      options3: {
        disabledDate(date) {
          let initdate = new Date("2020-02-15") - 86400000;
          return (
            (date && date.valueOf() < initdate) ||
            (date && date.valueOf() >= new Date())
          );
        }
      }
    };
  },
  created() {},
  mounted() {
    this.kapian();
    this.d = this.c;

    let date = new Date();
    let dates = new Date("2020/2/15");
    this.endDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    this.startDate =
      dates.getFullYear() +
      "-" +
      (dates.getMonth() + 1) +
      "-" +
      dates.getDate();
    this.startTime = new Date(this.startDate).getTime();
    this.endTime = new Date(this.endDate).getTime();
    // this.set();
    // this.def();
    this.zxt();
    this.zxts();
  },
  methods: {
    unique(arr) {
      // 根据唯一标识orderId来对数组进行过滤
      const res = new Map(); //定义常量 res,值为一个Map对象实例 //返回arr数组过滤后的结果，结果为一个数组   过滤条件是，如果res中没有某个键，就设置这个键的值为1
      return arr.filter(arr => !res.has(arr.date) && res.set(arr.date, 1));
    },
    kapian() {
      let a = this.$jsonp(
        "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5"
      ).then(data => {
        var m = JSON.parse(data.data);
        console.log(m);
        this.chinaTotal = m.chinaTotal;
        this.chinaAdd = m.chinaAdd;
      });
    },
    onstartTime(date) {
      console.log(date);
      this.startTime = new Date(date).getTime() - 28800000;
      console.log(new Date(date).getTime(), new Date("2020-02-15").getTime());
      if (this.startTime !== "" && this.endTime !== "") {
        this.set();
      }
    },
    onendTime(date) {
      this.endTime = new Date(date).getTime() - 28800000;
      let filter = this.tableData.filter(item=>{if(item==''){}})
      if (this.startTime !== "" && this.endTime !== "") {
        this.set();
      }
    },
    qingkong() {
      this.data = [];
    },
    set() {
      let c = (this.endTime - this.startTime) / 86400000;
      if (this.d.inphw == "") {
        this.$Message.error("请输入要查询的地区");
      } else if (this.startTime > this.endTime) {
        this.$Message.error("开始时间不可以大于结束时间");
      } else {
        this.data = [];
        this.interval = Math.floor(c / 5);
        if (this.datas.length > 0) {
          for (let d of this.datas) {
            d.date = new Date(d.date).getTime();
          }
        }
        for (let i = 0; i < c + 1; i++) {
          let obj = {};
          obj.date = i * 86400000 + this.startTime;
          obj.number = "";
          this.data.push(obj);
        }

        for (let t of this.datas) {
          if (
            t.date < this.data[0].date ||
            t.date > this.data[this.data.length - 1].date
          ) {
          } else {
            this.data.unshift(t);
          }
        }
        var compare = function(prop) {
          return function(obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
              val1 = Number(val1);
              val2 = Number(val2);
            }
            if (val1 < val2) {
              return -1;
            } else if (val1 > val2) {
              return 1;
            } else {
              return 0;
            }
          };
        };
        let arr = this.unique(this.data);
        this.data = arr.sort(compare("date"));
      }
    },
    sets() {
      this.datas = this.arr.total.reality;
      this.data = this.datas;
    },
    def(value) {
      let v = value || "海外";
      this.axios.get("/epidemic/forecast/location?value=" + v).then(data => {
        if (data.data == "") {
          for (let d in this.data) {
            this.data[d].number = "";
          }
        } else {
          this.datas = data.data.total.reality;
          this.data = this.datas;
        }
        this.increased = data.data.increased;
        this.total = data.data.total;
        this.location = data.data.location;

        // 新增人数
        this.forecasts = this.increased.forecast;
        this.reality = this.increased.reality;
        this.idate = this.forecasts.map(x => {
          return x.date.slice(5);
        });
        this.inumber = this.forecasts.map(x => {
          return x.number;
        });
        this.idates = this.reality.map(x => {
          return x.date.slice(5);
        });
        this.inumbers = this.reality.map(x => {
          return x.number;
        });
        // this.idate
        //  累计人数
        this.zxt();
        let forecast = this.total.forecast;
        let reality = this.total.reality;
        this.tdate = forecast.map(x => {
          return x.date.slice(5);
        });
        this.tnumber = forecast.map(x => {
          return x.number;
        });
        this.tdates = reality.map(x => {
          return x.date.slice(5);
        });
        this.tnumbers = reality.map(x => {
          return x.number;
        });
        this.zxts();
      });
    },

    forecast() {
      for (var d in this.data) {
        this.data[d].number = Number(this.data[d].number);
        this.data[d].date = this.formatTime(this.data[d].date, "Y/M/D");
      }
      for (var d in this.data) {
        if (this.data[d].number == "") {
          let n = this.data[d].date + "人数不能为空";
          this.$Message.error(n);
          return;
        }
      }
      let data = {
        location: this.d.inphw,
        data: this.data
      };
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 50
              }
            }),
            h(
              "div",
              {
                style: {
                  fontSize: "22px"
                }
              },
              this.d.ycz
            )
          ]);
        }
      });
      this.axios
        .post("/epidemic/forecast", data)
        .then(data => {
          this.$Spin.hide();
          this.increased = data.data.increased;
          this.total = data.data.total;
          this.d.hw = data.data.location;
          // 新增人数
          this.forecasts = this.increased.forecast;
          this.reality = this.increased.reality;
          this.idate = this.forecasts.map(x => {
            return x.date.slice(5);
          });
          this.inumber = this.forecasts.map(x => {
            return x.number;
          });
          this.idates = this.reality.map(x => {
            return x.date.slice(5);
          });
          this.inumbers = this.reality.map(x => {
            return x.number;
          });
          //  累计人数
          this.zxt();
          let forecast = this.total.forecast;
          let reality = this.total.reality;
          this.tdate = forecast.map(x => {
            return x.date.slice(5);
          });
          this.tnumber = forecast.map(x => {
            return x.number;
          });
          this.tdates = reality.map(x => {
            return x.date.slice(5);
          });
          this.tnumbers = reality.map(x => {
            return x.number;
          });
          this.zxts();
        })
        .catch(err => {
          this.$Spin.hide();
        });
    },

    all() {
      this.def();
    },
    zw() {
      this.d = this.c;
      this.zxt();
      this.zxts();
    },
    yw() {
      this.d = this.e;
      this.zxt();
      this.zxts();
    },
    zxt(date, dates, number, numbers) {
      var rllfx = echarts.init(document.getElementById("rllfx"));
      var option = {
        /* 线条颜色，可设置多个颜色 */
        color: ["#26ace7", "#524ec6"] /* 图像四周边距设置 */,
        grid: {
          left: 70,
          top: 140,
          right: 20,
          bottom: 50
        },
        title: {
          text: this.d.zzyc,
          x: "center",
          y: "20px",
          textStyle: {
            //主标题文本样式{}
            fontSize: 20,
            fontWeight: "bolder",
            color: "#000"
          }
        },
        /* 图例说明 */
        legend: {
          // 图例排项 vertical-"竖向"; horizontal-"横向"
          orient: "vertical", // 图例组件离容器左侧的距离
          right: 20,
          top: 60, //图例文字的样式
          textStyle: {
            color: "#6ab2ec"
          }, // 与series中每个name一一对应
          data: [this.d.sjxz, this.d.ycxz]
        },
        /* 鼠标悬浮时显示数据 */
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            show: true
          }
        },
        xAxis: {
          type: "category",
          data: this.idate || [10, 20, 30, 40, 50, 70, 50, 51], //设置轴线的属性
          axisLine: {
            lineStyle: {
              color: "#6ab2ec"
            }
          }, //调整x轴的lable
          axisLabel: {
            textStyle: {
              fontSize: 10 // 让字体变小
            },
            rotate: 20
            // interval: this.interval
          }
        },
        yAxis: {
          type: "value", // 控制网格线是否显示
          splitLine: {
            show: true, //  改变轴线颜色
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#000"]
            }
          }, //设置轴线的属性
          axisLine: {
            lineStyle: {
              color: "#000"
            }
          }
        } /* 数据配置，若有多条折线则在数组中追加{name: , data: } */,
        series: [
          {
            name: this.d.sjxz,
            data: this.inumbers || [30, 30, 40, 50, 80, 90, 500, 5],
            type: "line",
            symbol: "circle", // 设置折点大小
            symbolSize: 10, // 设置为光滑曲线
            smooth: false
          },
          {
            name: this.d.ycxz,
            data: this.inumber || [10, 20, 30, 40, 50, 50, 40, 70],
            type: "line",
            symbol: "circle", // 设置折点大小
            symbolSize: 10, // 设置为光滑曲线
            smooth: false
          }
        ]
      };
      rllfx.setOption(option);
    },
    zxts(date, dates, number, numbers) {
      var rllfxs = echarts.init(document.getElementById("rllfxs"));
      var option = {
        /* 线条颜色，可设置多个颜色 */
        color: ["#26ace7", "#524ec6"] /* 图像四周边距设置 */,
        grid: {
          left: 80,
          top: 140,
          right: 20,
          bottom: 50
        },
        title: {
          text: this.d.ljyc,
          x: "center",
          y: "20px",
          textStyle: {
            //主标题文本样式{}
            fontSize: 20,
            fontWeight: "bolder",
            color: "#000"
          }
        },
        /* 图例说明 */
        legend: {
          // 图例排项 vertical-"竖向"; horizontal-"横向"
          orient: "vertical", // 图例组件离容器左侧的距离
          right: 20,
          top: 60,
          textStyle: {
            color: "#6ab2ec"
          }, // 与series中每个name一一对应
          data: [this.d.sjlj, this.d.yclj]
        },
        /* 鼠标悬浮时显示数据 */
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            show: true
          }
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "7", "8"] || this.tdate, //设置轴线的属性
          axisLine: {
            lineStyle: {
              color: "#6ab2ec"
            }
          }, //调整x轴的lable
          axisLabel: {
            textStyle: {
              fontSize: 10 // 让字体变小
            },
            rotate: 20
            // interval: this.interval
          }
        },
        yAxis: {
          type: "value", // 控制网格线是否显示
          splitLine: {
            show: true, //  改变轴线颜色
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#000"]
            }
          }, //设置轴线的属性
          axisLine: {
            lineStyle: {
              color: "#000"
            }
          }
        } /* 数据配置，若有多条折线则在数组中追加{name: , data: } */,
        series: [
          {
            name: this.d.sjlj,
            data: [10, 20, 30, 40, 50, 60, 70, 80] || this.tnumbers,
            type: "line",
            symbol: "circle", // 设置折点大小
            symbolSize: 10, // 设置为光滑曲线
            smooth: false
          },
          {
            name: this.d.yclj,
            data: [20, 30, 40, 50, 60, 70, 80, 90] || this.tnumber,
            type: "line",
            symbol: "circle", // 设置折点大小
            symbolSize: 10, // 设置为光滑曲线
            smooth: false
          }
        ]
      };
      rllfxs.setOption(option);
    },
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
    formatTime(number, format) {
      var formateArr = ["Y", "M", "D", "h", "m", "s"];
      var returnArr = [];

      var date = new Date(number);
      returnArr.push(date.getFullYear());
      returnArr.push(this.formatNumber(date.getMonth() + 1));
      returnArr.push(this.formatNumber(date.getDate()));
      returnArr.push(this.formatNumber(date.getHours()));
      returnArr.push(this.formatNumber(date.getMinutes()));
      returnArr.push(this.formatNumber(date.getSeconds()));

      for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
      }
      return format;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  /* color: #fff; */
}
.t {
  font-size: 24px;
  line-height: 60px;
}
.f {
  font-size: 40px;
}
.active {
  background: #524ec6;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
  font-size: 30px;
}
.sdc_box {
  width: 100%;
  height: 500px;
  background: url("../../static/bj.png") no-repeat;
  background-size: 100% auto;
  opacity: 0.3;
  padding: 17px 140px 0;
}
.logo {
  opacity: 1;
  z-index: 9;
}
.sdc_logo {
  position: absolute;
  top: 14px;
  left: 0px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 140px;
}
.sdc_yuyan {
}
.sdc_yuyan span {
  display: inline-block;
  width: 48px;
  height: 31px;
  background: rgba(67, 66, 93, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  color: #fff;
  text-align: center;
  line-height: 31px;
  font-size: 12px;
}
.sdc_list {
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
}
.sdc_list ul {
  width: 700px;
  margin: 0 auto;
}
.sdc_listTitle {
  text-align: center;
  font-size: 60px;
  font-weight: 600;
}
.sdc_listTitles {
  text-align: center;
  font-size: 20px;
  margin: 10px 0 26px;
  color: #666;
}
.sdc_input {
  display: flex;
}
.sdc_input input {
  width: 543px;
  height: 59px;
  padding: 15px 20px;
}
.sdc_input button {
  width: 147px;
  height: 59px;
  background: rgba(67, 66, 93, 1);
  border: 0;
  color: #fff;
  font-size: 20px;
}
.sdc_content {
  width: 1640px;
  height: 708px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  position: absolute;
  top: 350px;
  left: 140px;
}
.sdc_content_left {
  width: 398px;
  height: 708px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  float: left;
}
.sdc_content_left ul {
  padding: 0 30px;
}
.sdc_content_left ul li {
  margin: 20px 0;
}
.sdc_content_left ul li .span {
  display: inline-block;
  width: 100px;
  font-size: 18px;
}
.sdc_content_left ul li input {
  width: 220px;
  border: 1px solid #ccc;
  height: 35px;
}
.sdc_content_left .ol1 {
  margin-top: 10px;
  height: 446px;
  overflow: auto;
  width: 337px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
}
.sdc_content_left .ol1 li {
  display: flex;
  justify-content: space-around;
}
.sdc_content_left .ol1 li p {
  flex: 1;
  height: 35px;
  border: 1px solid #ccc;
  line-height: 35px;
  text-align: center;
}
.sdc_content_left .ol1 li p input {
  width: 100%;
  border: 0;
  height: 30px;
  /* border-left:1px solid #ccc; */
}
.ol-top {
  display: flex;
  justify-content: space-around;
  width: 337px;
  height: 40px;
  background: rgba(67, 66, 93, 1);
  border: 1px solid rgba(112, 112, 112, 1);
  margin: 0 auto;
  line-height: 40px;
  color: #fff;
  text-align: center;
}
.ol-but {
  width: 337px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.ol-but button {
  width: 130px;
  height: 33px;
  background: rgba(67, 66, 93, 1);
  border: 1px solid rgba(67, 66, 93, 1);
  color: #fff;
}
.ol-top p {
  flex: 1;
}
.sdc_content_right {
  width: 1226px;
  height: 708px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 1;
  margin-left: 10px;
  float: right;
}
.sdc_content-top {
  width: 1226px;
  height: 228px;
}
.sdc_content-m {
  width: 1226px;
  height: 40px;
  background: #43425d;
  padding-left: 30px;
  line-height: 40px;
  font-size: 18px;
  color: #fff;
}
.sdc_top {
  width: 200px;
  margin: 0 auto;
  height: 50px;
  font-size: 18px;
  display: flex;
  line-height: 50px;
  border-bottom: 1px solid #e4e7ed;
}
.sdc_top p {
  margin: 0 10px;
}
.sdc_top_list li {
  width: 117px;
  height: 130px;
  background: rgba(238, 238, 238, 1);
  margin: 15px 17px;
  text-align: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  float: left;
}
.sdc_top_list li p {
  height: 42px;
  line-height: 42px;
}
.sdc_tb {
  width: 1226px;
  height: 440px;
  display: flex;
}
</style>

