<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="content-box" id="contentBox" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import bus from './bus';
export default {
  data() {
    return {
      tagsList: [],
      collapse: false,
    };
  },
  components: {
    vHead,
  },
  created() {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;

    });
  }
};
</script>
<style scoped>
.content-box {
    background: #fff;
}
#contentBox{
    padding-bottom: 0px;
    height: calc(100% - 90px);
}
</style>
