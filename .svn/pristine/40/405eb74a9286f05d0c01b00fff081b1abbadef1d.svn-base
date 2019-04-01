<template>
  <div id="heg_mobile">
    <head-top class="header" :operate="hiddenMobile">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title">Verify Your Phone</div>
      <i slot="right" class="sp iconfont "></i>
    </head-top>
    <div class="mobile_content">
      <div class="search-cont">
        <div class="phoneNumber flex space-between">
          <div class="select-group">
            <select name="" id="" v-model="mobile0.code">
              <option :value="item.regionCode" v-for="(item, key) in mobile0.phoneCode" :key="key">
                {{item.countryName + ' (+' + item.regionCode + ')'}}
              </option>
            </select>
            <span>
              {{'+' + mobile0.code}}
            </span>
          </div>
          <input class="phone" type="number" placeholder="Contact Mobile Number" v-model="mobile0.phoneNo">
          <button id="Mobile" type="button" :class="{otpActive:mobile0.active}" :disabled="mobile0.active" @click="sendOTPEvent">{{mobile0.time}}{{mobile0.second}}</button>
        </div>
        <div class="tripId">
          <mt-field v-model="mobile0.otpCode" @keydown.13.native="changeMobile" placeholder="Vertification Code"></mt-field>
          <div class="checkError" v-show="mobile0.errCode">Please enter the code you received.</div>
        </div>
        <div class="s-confirm">
          <button :class="{btnActive:mobile0.canClick}" :disabled="mobile0.canClick" @click="changeMobile">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator,MessageBox } from "mint-ui";
import headTop from "../../../components/head/head.vue";
import { User } from '../../../models/user';
import { Reg } from "../../../models/utils/Reg";
import { DomainManager } from "../../../config/DomainManager.js";
export default {
  components: {
    headTop,
  },
  props:{
    userInfo:{
      type: Object,
    },
    phoneCode:{
      type: Array,
    }
  },
  data (){
    return{
      info:{},
      mobile0:{
        type:1,
				code:'91',
				phoneNo:'',
				otpCode:'',
        phoneCode: [],
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
    userInfo(curVal,oldVal){
      if(curVal){
        this.info = curVal;
        if(curVal.cellphone.indexOf(' ') > -1){
          this.mobile0.code = curVal.cellphone.split(' ')[0];
          this.mobile0.phoneNo = curVal.cellphone.split(' ')[1];
        }
      }
    },
    phoneCode(curVal,oldVal){
      if(curVal){
        this.mobile0.phoneCode = curVal;
      }
    },
    mobile0:{
      handler:function(val,oldV){
        if(this.mobile0.otpCode != '' && this.mobile0.phoneNo !=''){
					this.mobile0.canClick = false;
					this.mobile0.errCode = false;
				}else{
					this.mobile0.canClick = true;
				}
      },
      deep:true
    }
  },
  methods:{
    hiddenMobile(){
      this.$emit('hiddenMobile');
    },
    sendOTPEvent(){
      let self = this;
      if(!Reg.onlyNumber1.test(this.mobile0.phoneNo)){
        Toast({
          message:'Please enter a valid phone number.',
          duration:1500
        });
        return;
      }else{
        if(this.mobile0.code == '91' && String(this.mobile0.phoneNo).length != 10){
          Toast({
            message:"Please enter a valid mobile number",
            duration:1500
          });
          return false;
        }else if( this.mobile0.code == '86' && String(this.mobile0.phoneNo).length != 11){
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
          let param = 'phone='+this.mobile0.code+' '+this.mobile0.phoneNo;
          User.sendEditPhoneCode(self,param).then(res =>{
            Indicator.close();
            if(res.success){
              Toast({
                message:'Success',
                duration:1500
              });
              this.mobile0.active = true;
              this.mobile0.otpCode = '';
              this.mobile0.time = res.lastSendTime;
              this.mobile0.second = 's';
              this.mobile0.timer = setInterval(()=>{
                this.mobile0.time --;
                if(this.mobile0.time <= 0){
                  this.mobile0.time = 'OTP';
                  this.mobile0.second = '';
                  this.mobile0.active = false;
                  clearInterval(this.mobile0.timer);
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
      if(this.mobile0.otpCode == null || this.mobile0.otpCode == ''){
        Toast({
          message: "Please enter the code your recieved",
          duration: 1500
        });
        return;
      }else{
        
        let param = 'phone='+this.mobile0.code+' '+this.mobile0.phoneNo+'&otpCode='+this.mobile0.otpCode;
        User.confirmEditPhoneCode(this, param).then(res=>{
          Indicator.close();
          if (res.succ) {
            Toast(res.msg);
            let name = this.mobile0.code+' '+this.mobile0.phoneNo;
            this.$emit('changeMobile',name);
            Object.assign(this.$data, this.$options.data());
          } else {
            Toast(res.msg);
          }
        }).catch(err=>{
          Indicator.close();
          Toast(err.msg);
        });
      }
    }
  }
}
</script>
<style lang="less">
#heg_mobile{
  .mint-cell{min-height:1.5rem;}
  .mint-cell-title{font-size:0.598rem;}
  .mint-cell-wrapper{
    min-height:1.5rem;
    border:1px solid #ddd;
    input{
      height:1.685rem;
      line-height: 1.685rem;
      color:#111;
      font-size:0.598rem;
      padding:0 0.5rem;
    }
    input::placeholder{
      color:#999;
    }
  }
}
</style>
<style lang="less" scoped>
#heg_mobile{
  .checkError {
    color: #f65858;
    margin-top: 0.2rem;
    font-size: 0.598rem;
    text-align: left;
  }
  .mobile_content{
    padding: 2.852rem 1rem 0.68rem;
  }
  .search-cont {
    input::placeholder{
      color:#999;
    }
    // overflow: hidden;
    .tripId {
      .search {
        width: 100%;
        padding: 0.5rem;
        border: none;
        font-size: 0.598rem;
        border-radius: 2px;
      }
    }
    .phoneNumber {
      margin-bottom: 0.854rem;
      .select-group {
        position: relative;
        border: 1px solid #ddd;
        border-right: none;
        box-sizing: border-box;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        width: 20%;
        height: 1.769rem;
        // margin-right: 0.5rem;
        select {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 9;
          display: block;
          width: 100%;
          height: 100%;
        }
        span {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          text-align: center;
          height: 1.769rem;
          line-height: 1.769rem;
          font-size: 0.6rem; // color: #666;
          font-weight: normal;
        }
      }
      .phone {
        width: 70%;
        padding: 0 0.5rem;
        font-size: 0.6rem;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0; // background: #4fbc9f;
        // color: #ddd;
        border: 1px solid #ddd;
        border-right: 0;
        border-left: none;
      }
      button {
        width: 30%;
        height: 1.769rem; // background: url('../../../assets/images/search_ico.png') center no-repeat;
        background-size: 0.769rem;
        background: #4fbc9f;
        font-size: 0.6rem;
        color: #fff;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px; // position: absolute;
        box-sizing: border-box; // right: 0.4rem;
        // top: 50%;
        // -webkit-transform: translateY(-50%);
        // transform: translateY(-50%);
      }
      .otpActive{
        background: #ddd;
      }
    }
    .s-confirm{
      margin-top: 1.709rem;
      button{
        width: 100%;
        height:1.495rem;
        line-height: 1.495rem;
        color:#fff;
        background:#ffad3d;
        border-radius: 3px;
        cursor: pointer;
        letter-spacing: 0.5px;
      }
      .btnActive{
        background:#ddd;
      }
    }
  }
}
</style>
