<template>
    <div id="app"  @click="clicked">
      <router-view />
    </div>
</template>
<script>
import Footer from '@/components/common/footer.vue'

export default {
  components:{
    Footer
  },
  name: 'app',
  data (){
    return {
      lTime: new Date().getTime(), // 最后一次点击的时间
      cTime: new Date().getTime(), //当前时间
      // tOut: 60 * 10 * 1000,   //超时时间10min
      // tOut: 60*100* 1000,  // 优化样式更改为100分钟
       Height: 0,
      t1: ''
    }
  },
  mounted () {
    //  this.t1 = setInterval(this.tTime, 1000);
  },
  methods:{
 clicked () {
      // this.lTime = new Date().getTime()  
    },
    // tTime() {
    //   this.cTime = new Date().getTime();
    //   if (this.cTime -this.lTime > this.tOut) {
    //     //未登录状态
    //     if(localStorage.getItem('username') == undefined){
    //       this.lTime = new Date().getTime();
    //     }else{
    //           // localStorage.removeItem('username');
    //   this.$router.push('/login');
    //       this.$alert('登录超时，请重新登录', '提示', {
    //         confirmButtonText: '确定'
    //       });
    //     }
    //   }
    // },  
  },
}
</script> 
<style>

@import './assets/css/color-dark.css'; /*深色主题*/
@import './assets/css/main.css';
@import './assets/css/style.css';
</style>