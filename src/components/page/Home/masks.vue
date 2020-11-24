<template>
<div>
    <div class="pop-up">
        <div class="hmoe-pop-up">
               <p class="pop-title"> 表计读数</p>
              
               <div class="pop-content">
                   <div class="pop-img">
                         <!-- <div :style="{width:dispose.w+'px',height:dispose.h+'px',position:'absolute',left:dispose.x+'px',top:dispose.y+'px',background:'transparent',  border: '2px solid red', zIndex: '999'}" v-show="isImg"> 
                             <span :style="{position:'absolute',left:'50%',top:'-20px',color:'red' ,zIndex: '999',fontWeight:' 600',transform: 'translateX(-50%)',width: '100px',textAlign: 'center'}">{{dispose.alertTypeName}}</span>
                         </div> -->
                        <!-- <img :src="dispose.biaojiImgUrl" alt=""> -->
                        
                        <el-image style="width: 300px; height: 200px" :src="dispose.biaojiImgUrl" :preview-src-list="[dispose.biaojiImgUrl]" :lazy='true'></el-image>
                        <!-- <canvas id="canvas" width="300px" height="230px"></canvas>  -->
                   </div>
                   <ul class="pop-list">
                       <li>
                           <label>摄像机名称: </label>
                           <span>{{dispose.camName}}</span>
                       </li>
                         <li>
                           <label>表计读数: </label>
                           <span>{{dispose.value}}</span>
                       </li>
                         <li>
                           <label>读数时间: </label>
                           <span>{{dispose.timeStamp}}</span>
                       </li>
                         <li>
                           <label><span style="color:red">*</span> 状态: </label>
                           <span>  <el-radio v-model="dispose.statusName" label="已处理">读数正确</el-radio> <el-radio v-model="dispose.statusName" label="误报警">读数有误</el-radio></span>
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
</div>

</template>

<script>
export default {
    data() {
        return {
            textarea2: '',
            radio: '1',
            isImg:false,
        };
    },
    mounted() {
        // this.draw(this.dispose);
        this.dispose.statusName = '已处理'
        this.dispose.statusId = 0
    },
    props: ['dispose'],
    methods: {
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
}
.pop-img img {
    width: 100%;
    height: 100%;
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
