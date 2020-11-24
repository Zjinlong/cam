<template>
<div class="home">
  <Top/>

  <div>
       <router-view></router-view>
  </div>
</div>

</template>

<script>
import Top from '../components/top.vue'


export default {
components:{
    Top,
},
    data(){
        return{
         
        }
    },
created() {
   
},
methods: {

},
}
</script>

<style>

</style>
