<template>
  <div id="heg-edit-name">
    <head-top class="header" :operate="hiddenName">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title" style="margin-left:-1.5rem;">Name</div>
      <p slot="right" class="sp" @click="DoneInfo">Done</p>
    </head-top>
    <div class="name-content">
      <div class="marTop"></div>
      <div class="input-div">
        <mt-field label="" placeholder="Your first name" v-model="user.firstName" :attr="{ maxlength:40 }"></mt-field>
      </div>
      <div class="input-div">
        <mt-field label="" placeholder="Your last name" v-model="user.lastName" :attr="{ maxlength:40 }"></mt-field>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "../../../components/head/head.vue";
import { Toast, Indicator } from "mint-ui";
import { User } from "../../../models/user";
import { Reg } from "../../../models/utils";
export default {
  components: {
    headTop,
  },
  props:{
    userInfo:{
      type: Object,
    }
  },
  data(){
    return{
      info:{},
      user:{
        firstName:'',
        lastName:'',
      },
    }
  },
  watch:{
    userInfo(curVal,oldVal){
      if(curVal){
        this.info = curVal;
        this.user.firstName = this.info.firstName;
        this.user.lastName = this.info.lastName;
      }
    },
    user:{
      handler:function(val,oldV){
        if(this.user.firstName && this.user.firstName.split('').length >= 40){
          this.user.firstName = this.user.firstName.substr(0,40);
        }
        if( this.user.lastName && this.user.lastName.split('').length >= 40){
          this.user.lastName = this.user.lastName.substr(0,40);
        }
      },
      deep:true
    },
  },
  methods:{
    hiddenName(){
      this.$emit('hiddenName');
    },
    DoneInfo() {
      this.info.firstName = this.user.firstName.trim();
      this.info.lastName = this.user.lastName.trim();
      if(this.verify(this.info)){
        this.$emit('changeName',this.info);
        this.user.firstName = '';
        this.user.lastName = '';
      }
    },
    verify(info) {
      if (!info.firstName.trim()) {
        Toast({
          message: "The first name can not be empty",
          duration: 1500
        });
        info.firstName = '';
        return false;
      }else if(!info.lastName.trim()){
        Toast({
          message: "The last name can not be empty",
          duration: 1500
        });
        info.lastName = '';
        return false;
      }else if(!Reg.name.test(info.firstName)) {
        Toast({
          message: "Please enter a valid first name",
          duration: 1500
        });
        return false;
      }else if(!Reg.name.test(info.lastName)) {
        Toast({
          message: "Please enter a valid last name",
          duration: 1500
        });
        return false;
      }else{
        return true;
      }
    }
  }
}
</script>
<style lang="less">
#heg-edit-name{
  .mint-cell-title{font-size:0.598rem;}
  .mint-cell-wrapper{
    min-height:1.5rem;
    input{
      display:block;
      width: 100%;
      height:1.9rem;
      line-height:1.9rem;
      color:#111;
      font-size:0.598rem;
    }
    input::placeholder{
      color:#999;
    }
  }
}
</style>
<style lang="less" scoped>
#heg-edit-name{
  .sp{
    position: absolute;
    color:#fff;
    font-size:12px;
    right: 0.5rem;
    cursor: pointer;
  }
  .marTop{padding-top:2.04rem;}
  .input-div{
    border-bottom:1px solid #ddd;
    padding:0 0.64rem;
  }
  input{
    display:block;
    width: 100%;
    height:1.9rem;
    line-height:1.9rem;
    color:#111;
    font-size:0.598rem;
  }
  input::placeholder{
    color:#999;
  }
}
</style>
