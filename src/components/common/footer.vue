<template>
      <div class="fer-nva" :style="{position:top}">
            <p> Copyright  2020 All rights reserved. 全球能源互联网研究院有限公司 版权所有 地址：北京市昌平区未来科技城北区国家电网办公区</p>
    </div>
</template>

<script>

export default {
    props:['top'],
  data() {
      return {
          minHeight:0,
          ab:''
      }
  },
  mounted() {
      if(document.documentElement.clientHeight>document.body.scrollHeight){
        //  this.ab = 'absolute'
        
      }else{
        //  this.ab = 'absolute'
      }

      
  },
  methods: {
            hasScrollbar() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}
  },
}
</script>

<style>
.fer-nva{
    color: #aaa;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #000;
    left: 0; 
    bottom: 0; 
  /* position: absolute; */
clear:both;
/* padding: 10px 20px 0 0px; */
/* margin: 100px 0; */
/* z-index: -1 */
}
</style>
