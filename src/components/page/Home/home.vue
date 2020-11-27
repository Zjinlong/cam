<template>
<div class="home">
  <!-- <Top/> -->
    <div class="home-content">
        <div class="home-content-left">
            <!-- 摄像头报警统计 -->
           <div class="Alarm">
               <Alarms  ref="camDRefs"/>
           </div>
           <!-- 事件状态 -->
             <div class="Alarm">
               <Incident  ref="incRefs"/>
           </div>
        </div>
        <div class="home-content-center">
            <!-- 报警次数折线图 -->
          <div class="line-chart">
              <Statistics/>
           </div>   
           <!-- 事件类型图 -->
             <div class="line-chart">
             <Event ref="chartRef" />
           </div>   
        </div>
        <!-- 实时报警 -->
         <div class="home-content-right">
             <div class="home-tag">
             </div>
               <div class="home-real">
                    <div class="home-real-title">
                        <p>实时报警(未处理 <span style="color:red">{{totalNmuber}}</span>)</p>
                    </div>
                    <ul class="home-list">
                        <li class="home-hr">
                            <p>摄像机名称</p>
                            <p>事件类型</p>
                            <p style="flex:1">报警时间</p>
                        </li>
                    </ul>
                    <ul class="home-list-td">
                         <li class="home-td" v-for="(d,i) in data" :key="i" @click="popUp(d.id,i)">
                            <p>{{d.camName}}</p>
                            <p>{{d.alertTypeName}}</p>
                            <p style="flex:1">{{d.timeStamp}}</p>
                        </li>
                    </ul>
               </div>
        </div>
    </div>

    <!-- 摄像图片 -->
    <div class="home-lunbo">
          <div class="arrow-left" @click='leftmove(true)'>
           <i class="el-icon-arrow-left"></i>
           </div> 
 
    <div class="lb">
    <ul class="lb-list" ref="modulelist" :style="{width: data.length * 290 + 'px','margin-left': xxx * 290 + 'px'}">
           <li  v-for="(d,i) in dataImg" :key="i" @click="popUps(d.id)">
                   <div :style="{width:d.w+'px',height:d.h+'px',position:'absolute',left:d.x+'px',top:d.y+'px',background:'transparent',  border: '2px solid red', zIndex: '999'}">
                       <span :style="{position:'absolute',left:'50%',top:'-20px',color:'red' ,zIndex: '999',fontWeight:' 600',transform: 'translateX(-50%)',width: '80px',textAlign: 'center'}">{{d.alertTypeName}}</span>
                        </div>
                        <el-image  :src="d.alertImgUrl" :lazy='true'></el-image>
                        <!-- <canvas id="canvas" width="270px" height="160px"></canvas>  -->
                        </li>
      </ul>
        </div>

          <div class="arrow-right" @click='rightmove()'>
           <i class="el-icon-arrow-right" style="zIndex:9999"></i>
           </div> 
    </div>
    <!-- 弹框 -->
    <div class="pop-up" v-if="ispop">
        <Masks :dispose='dispose' @cancel='cancel' @affirm='affirm'/>
    </div>
</div>

</template>

<script>
import Alarms from './alarm.vue';
import Incident from './incident.vue';
import Statistics from './statistics.vue';
import Event from './event.vue';
import Masks from './mask.vue';
import { getByCamera, getOverallByStatus, getByStatus, getNewest100, getByType, getTotalCount, putId } from './fetch.js';
import echarts from 'echarts';
export default {
    name: 'Home',
    components: {
        Alarms,
        Incident,
        Statistics,
        Event,
        Masks
    },
    data() {
        return {
            ispop: false,
            camData: [],
            totalNmuber: 0,
            dispose: {},
            xxx: 0,
            dataImg: [],
            data: [],
            timer: ''
        };
    },
    created() {
        this.camera();
        this.byStatus();
        // this.ByStatu()
        // this.ByType()
        this.Newest100();
        this.Newest();
        let _this = this;
        _this.timer = setInterval(function() {
            _this.Newest100();
        }, 10000);
    },

    mounted() {},
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        async totalCount() {
            let res = await getTotalCount();
            this.totalNmuber = res;
        },

        async camera() {
            let res = await getByCamera();
            if (res) {
                this.$refs.camDRefs.initData(
                    JSON.parse(
                        JSON.stringify(res)
                            .replace(/cameraName/g, 'name')
                            .replace(/count/g, 'value')
                    )
                );
            }
        },
        async byStatus() {
            let res = await getOverallByStatus();
            if (res) {
                this.$refs.incRefs.initData(
                    JSON.parse(
                        JSON.stringify(res)
                            .replace(/statusName/g, 'name')
                            .replace(/count/g, 'value')
                    )
                );
            }
        },

        async Newest100() {
            let res = await getNewest100();
            if (res) {
                this.data = res;
                this.totalCount();
            }
        },

        async Newest() {
            let res = await getNewest100();
            this.totalCount();
            if (res) {
                let ccImg = res;
                //  let url = 'http://192.168.43.17:'
                ccImg.forEach(item => {
                    //    item.alertImgUrl = url+item.alertImgUrl
                    var img = new Image();
                    img.src = item.alertImgUrl;
                    img.onload = function() {
                        let zw = 270 / img.width;
                        let zh = 160 / img.height;
                        item.x = item.x * zw;
                        item.y = item.y * zw;
                        item.w = item.w * zw;
                        item.h = item.h * zw;
                    };
                });
                this.dataImg = ccImg;
            }
        },

        leftmove() {
            if (this.xxx < 0) {
                this.xxx += 6;
            } else {
                this.$message({
                    showClose: true,
                    message: '已经是最前一张了',
                    type: 'warning'
                });
            }
        },

        rightmove() {
            if (this.xxx - 6 > -this.dataImg.length) {
                this.xxx -= 6;
            } else {
                this.$message({
                    showClose: true,
                    message: '已经是最后一张了',
                    type: 'warning'
                });
            }
        },
        cancel() {
            this.ispop = false;
                // this.$message({
                //     message: '取消编辑',
                //     type: 'success'
                // });
        },
        async affirm(dispose) {
            let res = await putId(dispose.id, dispose);
                this.$message({
                    message: '编辑成功',
                    type: 'success'
                });
            this.ispop = false;
            this.Newest100();
        },
        popUp(id) {
            this.ispop = true;
            for (let i of this.data) {
                if (id == i.id) {
                    this.dispose = i;
                }
            }
        },
        popUps(id) {
            this.ispop = true;
            for (let i of this.data) {
                if (id == i.id) {
                    this.dispose = i;
                }
            }
        }
    }
};
</script>

<style>
.home {
    width: 100%;
    background: #f8f6f9;
    height: auto;
    padding: 0px 0;
}

.home-content {
    padding: 0px 20px;
}
.home-content-left,
.home-content-center,
.home-content-right {
    float: left;
}
.home-content-left {
    width: 18%;
}
.home-content-center {
    width: 56%;
}
.home-content-right {
    width: 24%;
}
.Alarm {
    background: #fff;
    /* width: 270px; */
    height: 270px;
    border-radius: 4px;
    box-shadow: 0px 0px 5px #ccc;
    margin: 20px;
}
.line-chart {
    /* width: 53.1%; */
    height: 270px;
    border-radius: 4px;
    box-shadow: 0px 0px 5px #ccc;
    margin: 20px;
}
.home-tag {
    height: 100px;
    width: 450px;
}
.home-real {
    /* width: 450px; */
    height: 460px;
    background: #fff;
    box-shadow: 0 0 5px #ccc;
    border-radius: 4px;
    margin: 20px 10px;
    box-sizing: border-box;
    font-size: 14px;
}
.home-real-title {
    border-bottom: 2px #b3dce2 solid;
}
.home-real-title p {
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #b0e4e7;
    font-size: 18px;
    font-weight: 600;
}
.home-hr,
.home-td {
    display: flex;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
    color: #999;
    text-align: center;
    font-size: 14px;
}
.home-td {
    font-weight: 500;
}
.home-td:hover {
    background: #eee;
    cursor: pointer;
}
.home-list-td {
    overflow: auto;
    height: 380px;
}
.home-hr p,
.home-td p {
    flex: 1;
    text-align: center;
}
.home-lunbo {
    width: 96%;
    height: 210px;
    background: #fff;
    box-shadow: 0 0 5px #ddd;
    margin: 0 auto;
    display: flex;
    border-radius: 4px;
    padding: 25px 50px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
}
.lb {
    margin: 0 auto;
    width: 100%;
    height: 210px;
    overflow: hidden;
}
.lb-list {
    display: flex;
    overflow: hidden;
}
.lb-list li {
    margin: 0 10px;
    position: relative;
}
.lb-list li img {
    width: 270px;
    height: 160px;
    /* object-fit: cover; */
    cursor: pointer;
}
/* 弹框 */
.hmoe-pop-up {
    width: 700px;
    height: 400px;
    background: #fff;
    border-radius: 2px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
}
.pop-up {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.pop-title {
    width: 100%;
    padding: 10px 20px;
    height: 30px;
    line-height: 30px;
}
.pop-content {
    display: flex;
}

.pop-list li {
    height: 50px;
}
.pop-list li label {
    display: inline-block;
    width: 90px;
}
.pop-list .el-radio {
    margin-right: 0;
}
.pop-but {
    position: absolute;
    bottom: 5px;
    right: 50px;
}
.arrow-left {
    position: absolute;
    left: -10px;
    top: 50px;
    font-size: 80px;
    color: #6b99bd;
    cursor: pointer;
}
.arrow-right {
    position: absolute;
    right: -10px;
    top: 50px;
    font-size: 80px;
    color: #6b99bd;
    cursor: pointer;
}
.line-chart .el-date-editor.el-input,
.line-chart .el-date-editor.el-input__inner {
    width: 50% !important;
}
.zjl {
}

/* {
       display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    color: #999; 
} */
</style>
