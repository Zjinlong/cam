<template>
<div style="position: relative;min-height: 100%;">
<div class="config">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="摄像头" name="first">
     <Alarms ref="first"/>
        </el-tab-pane>
    <el-tab-pane label="模型" name="second">
         <Model ref="second"/>
    </el-tab-pane>
 
    <el-tab-pane label="摄像头模型关联" name="fourth">
        <Relevance ref="fourth"/>
    </el-tab-pane>
       <!-- <el-tab-pane label="网关" name="third">
       <Gateway ref="third"/>
    </el-tab-pane> -->
  </el-tabs>
  <!-- <el-footer>Footer</el-footer> -->
  </div>
  <Footer :top="'absolute'"></Footer>

</div>
  
</template>

<script>
import Alarms from './camera.vue'
import Gateway from './gateway.vue'
import Model from './models.vue'
import Relevance from './relevance.vue'
import Footer from '@/components/common/footer.vue'
  export default {
    components:{Alarms,Gateway,Model,Relevance,Footer},
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {

        if(tab.name == 'first'){
          this.$refs.first.camlist()
          console.log(this.$refs.first)
        }else if(tab.name == 'second'){
          this.$refs.second.modlist()
        }else if(tab.name == 'fourth'){
          this.$refs.fourth.relelist()
        }
      }
    }
  };
</script>
<style>
.config{
    padding: 30px 40px;
    min-height: 100%;
}
</style>
