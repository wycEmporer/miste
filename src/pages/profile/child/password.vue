<template>
  <div id="heg-edit-psd">
    <head-top class="header" :operate="hiddenPas">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title" style="margin-left:-1.5rem;">Reset Password</div>
      <p slot="right" class="sp" @click="DoneInfo">Done</p>
    </head-top>
    <div class="psd-content">
      <div class="marTop"></div>
      <div class="input-div">
        <mt-field label="Current" type="password" placeholder="Current password" v-model="signinPwd.password"></mt-field>
      </div>
      <div class="input-div">
        <mt-field label="New" type="password" placeholder="New password 6~32 length" v-model="signinPwd.newPassword"></mt-field>
      </div>
      <div class="input-div">
        <mt-field label="Verify" type="password" placeholder="Confirm new password" v-model="signinPwd.confirmPwd"></mt-field>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "../../../components/head/head.vue";
import { Toast, Indicator } from "mint-ui";
import { User } from "../../../models/user";
import { Reg } from "../../../models/utils/Reg";
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
      username:'',
      signinPwd: {
        password: "",
        newPassword: "",
        confirmPwd: "",
      },
    }
  },
  watch:{
    userInfo(curVal,oldVal){
      if(curVal){
        this.info = curVal;
      }
    },
  },
  methods:{
    clear(property) {
      for (let v in property) {
        property[v] = "";
      }
    },
    hiddenPas(){
      this.clear(this.signinPwd);
      this.$emit('hiddenPas');
    },
    DoneInfo() {
      if (this.verify(this.signinPwd)) {
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        let passwordString = 'password='+ encodeURIComponent(this.signinPwd.password) 
        + '&newPassword=' + encodeURIComponent(this.signinPwd.newPassword)
        + '&confirmPwd=' + encodeURIComponent(this.signinPwd.confirmPwd);
        User.changeUserPassword(this, passwordString).then(res =>{
          Indicator.close();
          if (res.success) {
            Toast({
              message: "Success!",
              duration: 1500
            });
            this.clear(this.signinPwd);
            this.$emit('hiddenPas');
          } else {
            Toast({
              message: res.msg,
              duration: 1500
            });
          }
        }).catch(function(error) {
          Indicator.close();
          console.log(error);
        });
      }
    },
    verify(pwdUnit) {
      let flag = true;
      if (pwdUnit.password == "") {
        flag = false;
        Toast({
          message: "Please enter the current password",
          duration: 1500
        });
        return false;
      }
      if(pwdUnit.newPassword == ""){
        flag = false;
        Toast({
          message: "Please enter the new password",
          duration: 1500
        });
        return false;
      }
      if(pwdUnit.confirmPwd == ""){
        flag = false;
        Toast({
          message: "Please re-enter the new password",
          duration: 1500
        });
        return false;
      }
      if((pwdUnit.newPassword.length < 6 || pwdUnit.newPassword.length >32) || 
      (pwdUnit.confirmPwd.length < 6 || pwdUnit.confirmPwd.length >32)){
        flag = false;
        Toast({
          message: "Please enter a valid password (6~32 length)",
          duration: 1500
        });
        return false;
      }
      if (pwdUnit.confirmPwd != pwdUnit.newPassword) {
        flag = false;
        Toast({
          message: "Two passwords must be same",
          duration: 1500
        });
        return false;
      }
      return flag;
    }
  }
}
</script>
<style lang="less">
#heg-edit-psd{
  .mint-cell-title{text-align:left;}
  .mint-cell-title{font-size:0.598rem;}
  input{
    color:#111;
    font-size:0.598rem
  }
  input::placeholder{
    color:#999;
  }
}
</style>
<style lang="less" scoped>
#heg-edit-psd{
  .sp{
    position: absolute;
    color:#fff;
    font-size:12px;
    right: 0.5rem;
    cursor: pointer;
  }
  .marTop{padding-top:2.04rem;}
  .input-div{
    padding:0 0.64rem;
    border-bottom:1px solid #eee;
  }
}
</style>
