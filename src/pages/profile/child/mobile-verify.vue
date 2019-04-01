<template>
  <div id="heg_mobile2">
    <head-top class="header" :operate="hiddenMobile">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title">Verify Your Mobile Number</div>
      <i slot="right" class="sp iconfont "></i>
    </head-top>
    <div class="mobile_content">
      <div class="search-cont">
        <div class="phoneNumber flex space-between">
          <div class="select-group">
            <span>
              {{'+' + save.code}}
            </span>
          </div>
          <input class="phone" disabled type="number" placeholder="Mobile Number" v-model="save.phone">
          <button id="Mobile" type="button" :class="{otpActive:verify.active}" :disabled="verify.active" @click="sendOTPEvent">{{verify.time}}{{verify.second}}</button>
        </div>
        <div class="tripId">
          <input type="number" v-model="verify.otpCode" @keydown.13.native="changeMobile" maxlength="4" placeholder="Enter OTP" />
          <div class="checkError" v-show="verify.errCode">OTP code error</div>
        </div>
        <div class="s-confirm">
          <button :class="{btnActive:verify.canClick}" :disabled="verify.canClick" @click="changeMobile">Submit</button>
        </div>
      </div>
    </div>
    <div class="succCover" v-if="showSucc"></div>
    <div class="succBox" v-if="showSucc">
      <p>Successfully activated your mobile </p>
      <p>number status.</p>
      <button @click="saveVerifySucc">OK</button>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator,MessageBox } from "mint-ui";
import headTop from "../../../components/head/head.vue";
import { User } from '../../../models/user';
import { Reg } from "../../../models/utils/Reg";
import { DomainManager } from "../../../config/DomainManager.js";
import { CookieUtil } from '../../../models/utils';
export default {
  components: {
    headTop,
  },
  props:{
    save:{
      type: Object
    }
  },
  data (){
    return{
      showSucc:false,
      verify:{
        type:1,
				otpCode:'',
        timer:null,
				time:'OTP',
        second:'',
				active:false,
				canClick:true,
				errCode:false,
			},
    } 
  },
  watch:{
    verify:{
      handler:function(val,oldV){
        if(this.verify.otpCode != ''){
					this.verify.canClick = false;
					this.verify.errCode = false;
				}else{
					this.verify.canClick = true;
        }
        if(this.verify.otpCode.length > 4){
          this.verify.otpCode = this.verify.otpCode.substr(0,4);
        }
      },
      deep:true
    }
  },
  methods:{
    hiddenMobile(){
      this.$emit('hiddenVerify');
    },
    sendOTPEvent(){
      let self = this;
      if(!Reg.onlyNumber1.test(this.save.phone)){
        Toast({
          message:'Please enter a valid phone number.',
          duration:1500
        });
        return;
      }else{
        if(this.verify.code == '91' && String(this.save.phone).length != 10){
          Toast({
            message:"Please enter a valid mobile number",
            duration:1500
          });
          return false;
        }else if( this.verify.code == '86' && String(this.save.phone).length != 11){
          Toast({
            message:"Please enter a valid mobile number",
            duration:1500
          });
          return false;
        }else {
          Indicator.open({
            text:'Sending . . .',
            spinnerType:'fading-circle',
          });
          let url = DomainManager.verifyPhoneOTP();
          let param = {
            "userId":CookieUtil.getItem('uid'),
            "userModify":this.save.code+' '+this.save.phone
          } 
          this.$axios.post(url,param).then(res =>{
            Indicator.close();
            if(res.code == 200){
              Toast({
                message:'Success',
                duration:1500
              });
              this.verify.active = true;
              this.verify.otpCode = '';
              this.verify.time = res.data;
              this.verify.second = 's';
              this.verify.timer = setInterval(()=>{
                this.verify.time --;
                if(this.verify.time <= 0){
                  this.verify.time = 'OTP';
                  this.verify.second = '';
                  this.verify.active = false;
                  clearInterval(this.verify.timer);
                }
              },1000);
            }else{
              Toast(res.msg);
            }
          }).catch(err=>{
            Indicator.close();
            Toast(err.msg);
          })
        }
      }
      
    },
    changeMobile(){
      let that = this;
      let url = DomainManager.saveNewPhone();
      let param = {
        userId: CookieUtil.getItem('uid'),
        newPhone: this.save.code+' '+this.save.phone,
        otp: this.verify.otpCode
      }
      this.$axios.post(url, param).then(res=>{
        if(res.code == 200) {
          that.verify.errCode = false;
          clearInterval(that.verify.timer);
          this.showSucc = true;
        }else{
          Toast(res.msg);
          this.showSucc = false;
          // that.verify.errCode = true;
        }
      }).catch(err=>{
        // that.verify.errCode = true;
        Toast(err.msg);
      });
    },
    saveVerifySucc(){
      this.showSucc = false;
      this.$emit('hiddenVerify');
      Object.assign(this.$data, this.$options.data());
    }
  }
}
</script>
<style lang="less" scoped>
#heg_mobile2{
  width:100%;
  height:100%;
  position: relative;
  .mobile_content{
    padding: 2.852rem 1rem 0.68rem;
  }
  .search-cont {
    input::placeholder{
      color:#999;
    }
    // overflow: hidden;
    .tripId {
      min-height:1.5rem;
      border:1px solid #ddd;
      padding:0 0.5rem;
      position: relative;
      input{
        width:100%;
        height:1.685rem;
        line-height: 1.685rem;
        color:#111;
        font-size:0.76rem;
        padding:0 0;
      }
      input::placeholder{
        color:#999;
      }
      .checkError {
        color: #CC4747;
        font-size: 11px;
        text-align: left;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        padding-right: 0.5rem;
      }
    }
    .phoneNumber {
      margin-bottom: 0.854rem;
      .select-group {
        position: relative;
        border: 1px solid #ddd;
        border-right: none;
        box-sizing: border-box;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        width: 25%;
        height: 1.769rem;
        span {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 50%;
          left: 0;
          text-align: center;
          height: 1.4rem;
          line-height: 1.4rem;
          font-size: 0.6rem; // color: #666;
          font-weight: normal;
          border-right:1px solid #dcdcdc;
          transform: translateY(-50%);
        }
      }
      .phone {
        width: 70%;
        padding: 0 0.5rem;
        font-size: 0.726rem;
        color:#999;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0; // background: #4fbc9f;
        border: 1px solid #ddd;
        border-right: 0;
        border-left: 0;
      }
      button {
        width: 30%;
        height: 1.769rem;
        background-size: 0.769rem;
        background: #4fbc9f;
        font-size: 0.6rem;
        color: #fff;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        box-sizing: border-box;
      }
      .otpActive{
        background: #ddd;
      }
    }
    .s-confirm{
      margin-top: 1.709rem;
      button{
        width: 100%;
        height:1.7rem;
        line-height: 1.7rem;
        color:#fff;
        font-size: 14px;
        background:#ffad3d;
        border-radius: 2px;
        cursor: pointer;
      }
      .btnActive{
        background:#ddd;
      }
    }
  }
  .succCover{
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
    left: 0;
  }
  .succBox{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width:12rem;
    padding:1.28rem 0.427rem 0.64rem;
    border-radius:2px;
    p{
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.894rem;
    }
    button{
      width:5.9rem;
      height:1.28rem;
      line-height:1.28rem;
      background: #FFAD3C;
      border-radius: 2px;
      color:#fff;
      margin-top: 0.854rem;
    }
  }
}
</style>
