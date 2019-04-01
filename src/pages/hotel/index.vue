<template>
  <div>
    <head-top class="header">
			<i slot="left" class="iconfont icon-back"></i>
			<span slot="title" class="title">My Hotels</span>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
    <router-view></router-view>
  </div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import { CookieUtil } from "models/utils";
import { AppBridge } from 'models/appbridge/appbridge.js';
export default {
  components: {
    headTop
  },
  data(){
    return {
      isLogin:false
    }
  },
  async created() {
    this.showHeader = await AppBridge.getNativeSource(this);
    let id = await AppBridge.getNativeUserid(this);
    window.onReceviedUuid = this.onReceviedUuid;
    if(id && id != '0'){
      CookieUtil.removeItem("uid");
      CookieUtil.setItem("uid",id);
      this.isLogin = true;
    }else{
      if(CookieUtil.hasItem("uid")){
        this.isLogin = true;
      }else{
        CookieUtil.removeItem("uid");
        this.isLogin = false;
      }
    }
  },
  methods: {
    onReceviedUuid(){
      this.isLogin = true;
      return "1";
    }
  }
}
</script>
<style lang="less" scoped>
.header{
    .sp {
      opacity: 0;
    }
  }
</style>
