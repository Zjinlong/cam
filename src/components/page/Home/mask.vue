<template>
<div>
    <div class="pop-up">
        <div class="hmoe-pop-up">
               <p class="pop-title"> 报警信息</p>
              
               <div class="pop-content">
                   <div class="pop-img" @click="popImg()">
                         <div :style="{width:dispose.ws+'px',height:dispose.hs+'px',position:'absolute',left:dispose.xs+'px',top:dispose.ys+'px',background:'transparent',  border: '1px solid red', zIndex: '999'}" v-show="isImg"> 
                             <span :style="{position:'absolute',left:'50%',top:'-20px',color:'red' ,zIndex: '999',fontWeight:' 600',transform: 'translateX(-50%)',width: '100px',textAlign: 'center'}">{{dispose.alertTypeName}}</span>
                         </div>
                        <img :src="dispose.alertImgUrl" alt="" :style="{height:imgHeight+'px'}">
                        <!-- <el-image style="width: 300px; height: 200px" :src="dispose.alertImgUrl" :preview-src-list="[dispose.alertImgUrl]" :lazy='true'></el-image> -->
                        <!-- <canvas id="canvas" width="300px" height="230px"></canvas>  -->
                   </div>
                   <ul class="pop-list">
                       <li>
                           <label>摄像机名称: </label>
                           <span>{{dispose.camName}}</span>
                       </li>
                         <li>
                           <label>事件类型: </label>    
                           <span>{{dispose.alertTypeName}}</span>
                       </li>
                         <li>
                           <label>报警时间: </label>
                           <span>{{dispose.timeStamp}}</span>
                       </li>
                         <li>
                           <label><span style="color:red">*</span> 状态: </label>
                           <span>  <el-radio v-model="dispose.statusName" label="已处理">已处理</el-radio> <el-radio v-model="dispose.statusName" label="误报警">误报警</el-radio></span>
                       </li>
                         <li>
                           <label style="float: left">处理备注: </label>
                          <el-input
                           style="width:200px"
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="dispose.memo">
                            </el-input>
                       </li>
                       <li class="pop-but">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="affirm">确认</el-button>
                       </li>
                    
                   </ul>
                 
               </div>
        </div>
    </div>
    <div class="datu" v-if="isshow">
        <div class="icon">
  <i class="el-icon-error" @click="showerror()"></i>
        </div>    
        <div class="imgs">
            <div :style="{width:dispose.w+'px',height:dispose.h+'px',position:'absolute',left:dispose.x+'px',top:dispose.y+'px',background:'transparent',  border: '2px solid red', zIndex: '999'}" v-show="isImg"> 
                             <span :style="{position:'absolute',left:'50%',top:'-30px',color:'red' ,zIndex: '999',fontWeight:' 600',transform: 'translateX(-50%)',width: '100px',textAlign: 'center',fontSize:'20px'}">{{dispose.alertTypeName}}</span>
                         </div>
  <img :src="dispose.alertImgUrl" alt="">
        </div>
      
    </div>
</div>

</template>

<script>   
export default {
    data() {
        return {
            textarea2: '',
            radio: '1',
            isImg:false,
            dd:{},
            imgHeight:'',
            isshow:false,
        };
    },
    mounted() {
        this.dd = this.dispose
        this.draw(this.dispose);
        this.dispose.statusName = '已处理'
        this.dispose.statusId = 0 
    },
    props: ['dispose'],
    methods: {
        
        draw(o) {
            // var ctx = document.getElementById('canvas').getContext('2d');
            var img = new Image();
            img.src = this.dispose.alertImgUrl;  
            let _this = this
            img.onload = function() {
                let zw = 300 / img.width;
           //计算图片缩放比例,利用CSS实现画框
                this.imgHeight = zw*img.height
                let zh =   this.imgHeight  / img.height;
    
                _this.dispose.xs = _this.dispose.x * zw;
                _this.dispose.ys = _this.dispose.y * zw;
                _this.dispose.ws = _this.dispose.w * zw;
                _this.dispose.hs = _this.dispose.h * zw;
                  _this.isImg = true   
            
            //使用canvar实现画框
                // ctx.drawImage(img, img.width, img.height);
                // ctx.beginPath();
                // ctx.moveTo(x, y);
                // ctx.lineTo(x + w, y);
                // ctx.lineTo(x + w, y + h);
                // ctx.lineTo(x, y + h);
                // ctx.lineTo(x, y);
                // ctx.strokeStyle = 'red';
                // ctx.font = '16px Georgia';
                // ctx.fillStyle = 'red';
                // ctx.fillText(o.alertTypeName, x, y - 5);
                // ctx.stroke();
            };
            console.log( this.dispose)
        },
        popImg(){
       this.isshow = true
        },
        showerror(){
       this.isshow = false

        },
        cancel() {
            this.$emit('cancel');
        },
        affirm() {
             if(this.dispose.statusName == '已处理'){
                 this.dispose.statusId = 0 
             }else if(this.dispose.statusName == '误报警'){
                 this.dispose.statusId = 2                 
             }
            this.$emit('affirm', this.dispose);
        }
    }
};
</script>

<style>
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
.pop-img {
    width: 300px;
    height: 200px;
    margin: 0 30px;
    position: relative;
    cursor: pointer;
}
.pop-img img {
    width: 100%;
    /* height: 100%; */
    /* object-fit: cover; */
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
    z-index: 999;
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
.datu{
    z-index: 1024;
    width: 100%;
    height: 100%;
    position: relative;
 

}
.datu .imgs{
    
    position: fixed;
        left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.icon{
        z-index: 9999;
    font-size: 50px;
    color: #fff;
    position: absolute;
    right: 50px;
    top: 20px;
    cursor: pointer;
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
