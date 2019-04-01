<template>
  <div id="heg-edit-email">
    <head-top class="header" :operate="hiddenEmail">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title" >{{title}}</div>
      <i slot="right" class="sp iconfont "></i>
    </head-top>
    <div class="emali-content">
      <div class="marTop"></div>
      <div class="has-email" v-show="!modifyEmail">
        <div class="strip-control-btn flex space-between align-items-center">
          <div class="sbtn-wrap flex align-items-center" :class="{active:isMobile}">
            <a id="oneway" @click="showMobile">Mobile Number</a>
          </div>
          <div class="sbtn-wrap flex align-items-center" :class="{active:isEmail}">
            <a id="roundtrip" @click="showEmail">Email</a>
          </div>
        </div>
        <div class="search" v-show="isMobile">
          <div class="search-cont">
            <div class="phoneNumber flex space-between">
              <div class="select-group">
                <span>{{'+' + mobile.code}}</span>
              </div>
              <input class="phone" type="Number" disabled placeholder="Contact Mobile Number" v-model="mobile.phoneNo">
              <button id="Mobile" type="button" :class="{otpActive:mobile.active}" :disabled="mobile.active" @click="sendOTPEvent(1)">{{mobile.time}}{{mobile.second}}</button>
            </div>
            <div class="tripId">
              <input type="number" v-phone="mobile" @keydown.13.native="changeEmail(1)" maxlength="4" v-model="mobile.otpCode" placeholder="Vertification Code" />
              <div class="checkError" v-show="mobile.errCode">OTP code error</div>
            </div>
            <div class="s-confirm">
              <button :class="{btnActive:mobile.canClick}" :disabled="mobile.canClick" @click="changeEmail(1)">Confirm</button>
            </div>
          </div>
        </div>
        <div class="search" v-show="isEmail">
          <div class="search-cont">
            <div class="phoneNumber flex space-between">
              <input class="phone" style="border-left:1px solid #ddd;width:95%;" disabled type="email" placeholder="Email Address" v-model="email.email">
              <button id="Email" type="button" :class="{otpActive:email.active}" :disabled="email.active" @click="sendOTPEvent(2)">{{email.time}}{{email.second}}</button>
            </div>
            <div class="tripId">
              <input type="number" v-phone="email" placeholder="Vertification Code" maxlength="4" v-model="email.otpCode" @keydown.13.native="changeEmail(2)" />
              <div class="checkError" v-show="email.errCode">OTP code error</div>
            </div>
            <div class="s-confirm">
              <button :class="{btnActive:email.canClick}" :disabled="email.canClick" @click="changeEmail(2)">Confirm</button>
            </div>
          </div>
        </div>
      </div>
      <div class="search" v-show="modifyEmail">
        <div class="search-cont">
          <div class="phoneNumber flex space-between">
            <div class="select-group">
              <select name="" id="" v-model="modify.code">
                <option :value="item.regionCode" v-for="(item, key) in phoneCode" :key="key">
                  {{item.countryName + ' (+' + item.regionCode + ')'}}
                </option>
              </select>
              <span>
                {{'+' + modify.code}}
              </span>
            </div>
            <input class="phone" style="border-left:1px solid #ddd;" type="number" placeholder="Mobile Number" v-model="modify.phone">
            <button id="Email" type="button" :class="{otpActive:modify.active}" :disabled="modify.active" @click="sendOTPEvent(3)">{{modify.time}}{{modify.second}}</button>
          </div>
          <div class="tripId">
            <input type="number" v-phone="modify" placeholder="Enter OTP" @keydown.13.native="changeEmail(3)" v-model="modify.otpCode" />
            <div class="checkError" v-show="modify.errCode">OTP code error</div>
          </div>
          <div class="s-confirm">
            <button :class="{btnActive:modify.canClick}" :disabled="modify.canClick" @click="changeEmail(3)">Confirm</button>
          </div>
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
import { CookieUtil } from 'models/utils';
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
  data(){
    return{
      info:{},
      showSucc:false,
      title:'Verify Your Identity',
      firstOtp:'',
      firstType:'',
      timer:null,
      isMobile:true,
      isEmail:false,
      modifyEmail:false,
      mobile:{
				type:1,
				code:'',
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
			email:{
				type:2,
				email:'',
				otpCode:'',
        time:'OTP',
        timer:null,
        second:'',
				active:false,
				canClick:true,
				errCode:false,
      },
      modify:{
        type:3,
        code:'91',
        phone:'',
				otpCode:'',
        time:'OTP',
        timer:null,
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
      }
    },
    phoneCode(curVal,oldVal){
      if(curVal){
        this.mobile.phoneCode = curVal;
      }
    },
    mobile:{
			handler:function(val, oldVal){
				if(this.mobile.otpCode != ''){
					this.mobile.canClick = false;
          if(this.mobile.otpCode.length > 4){
            this.mobile.otpCode = this.mobile.otpCode.substr(0,4);
          }
				}else{
					this.mobile.canClick = true;
        }
			},
			deep:true
		},
		email:{
			handler:function(val, oldVal){
				if(this.email.otpCode != ''){
					this.email.canClick = false;
          if(this.email.otpCode.length > 4){
            this.email.otpCode = this.email.otpCode.substr(0,4);
          }
				}else{
					this.email.canClick = true;
        }
			},
			deep:true
    },
    modify:{
      handler:function(val, oldVal){
				if(this.modify.otpCode != '' && this.modify.phone !=''){
					this.modify.canClick = false;
          if(this.modify.otpCode.length > 4){
            this.modify.otpCode = this.modify.otpCode.substr(0,4);
          }
				}else{
					this.modify.canClick = true;
				}
			},
			deep:true
    }
  },
  created(){
    if(this.userInfo.cellphone && this.userInfo.cellphone.indexOf(' ') > -1){
      this.isMobile = true;
      this.isEmail = false;
      this.email.email= this.userInfo.email;
      this.mobile.code = this.userInfo.cellphone.split(' ')[0];
      this.mobile.phoneNo = this.userInfo.cellphone.split(' ')[1];
    }else{
      this.isMobile = false;
      this.isEmail = true;
    }
  },
  methods:{
    hiddenEmail(){
      this.modifyEmail = false;
      this.email.otpCode = '';
      this.mobile.otpCode = '';
      this.modify.otpCode = '';
      this.title = 'Verify Your Identity';
      this.$emit('hiddenCheckPage');
    },
    showMobile(){
      this.isMobile = true;
			this.isEmail = false;
    },
    showEmail(){
      this.isMobile = false;
			this.isEmail = true;
    },
    sendOTPEvent(who){
      if(who == 1){
        let url = DomainManager.oldSendOtp()+'?cellphone='+this.mobile.code+' '+this.mobile.phoneNo;
        this.getOrderOTP(url,this.mobile);
			}else if(who == 2){
        let url = DomainManager.oldSendOtp()+'?email='+this.email.email;
        this.getOrderOTP(url,this.email);
			}else if(who == 3){
        let obj = {
          userId: CookieUtil.getItem('uid'),
          userModify: this.modify.code+' '+this.modify.phone
        }
        if(
          this.modify.code == '91' && String(this.modify.phone).length != 10 || 
          ( this.modify.code == '86' && String(this.modify.phone).length != 11)
        ){
          Toast({
            message:"Please enter a valid mobile number",
            duration:1500
          });
          return false;
        }else{
          this.$axios.post(DomainManager.saveVerifyPhone(), obj).then(res=>{
            if(res.code == 200){
              this.sendOTPEvent2();
            }else{
              Toast(res.msg);
            }
          }).catch(err =>{
            Toast(err.msg)
          })
        }
      }
    },
    getOrderOTP(url,type){
			let that = this;
			Indicator.open({
				text:'Sending . . .',
				spinnerType: 'fading-circle'
      });
			this.$axios.get(url).then(res=>{
				if(res.succ){
          if(res.data == 60){
            Toast({
              message:'Success',
              duration:1500
            });
          }else{
            Toast({
              message:'The OTP has been sent',
              duration:1500
            });
          }
					type.active = true;
					Indicator.close();
          type.otpCode = '';
          type.time = res.data;
					type.second = 's';
					type.timer = setInterval(()=>{
            type.time --;
						if(type.time <= 0){
							type.time = 'OTP';
							type.second = '';
              type.active = false;
              clearInterval(type.timer);
						}
          },1000);
				}else{
          type.errCode = true;
					Indicator.close();
				}
			}).catch(err =>{
				Indicator.close();
				Toast(err.msg)
			})
    },
    sendOTPEvent2(){
      this.$axios.get(DomainManager.bindNewSendOTP()+'?phone='+this.modify.code+' '+this.modify.phone).then(res=>{
        if(res.code == 200){
          if(res.data == 60){
            Toast({
              message:'Success',
              duration:1500
            });
          }else{
            Toast({
              message:'The OTP has been sent',
              duration:1500
            });
          }
          this.modify.active = true;
          this.modify.otpCode = '';
          this.modify.time = res.data;
          this.modify.second = 's';
          this.modify.timer = setInterval(()=>{
            this.modify.time --;
            if(this.modify.time <= 0){
              this.modify.time = 'OTP';
              this.modify.second = '';
              this.modify.active = false;
              clearInterval(this.modify.timer);
            }
          },1000);
        }else{
          Toast(res.msg);
        }
      }).catch(err =>{
        Toast(err.msg);
      })
    },
    changeEmail(who){
      let url;
      switch (who) {
        case 1:
          this.firstOtp = this.mobile.otpCode;
          this.firstType = 'mobile';
          url = DomainManager.oldCheckOtp()+'?cellphone='+this.mobile.code+' '+this.mobile.phoneNo+'&otp='+this.mobile.otpCode;
          this.confirmModify(url,this.mobile);
          break;
        case 2:
          this.firstOtp = this.email.otpCode;
          this.firstType = 'email';
          url = DomainManager.oldCheckOtp()+'?email='+this.email.email+'&otp='+this.email.otpCode;
          this.confirmModify(url,this.email);
          break;
        case 3:
          url = DomainManager.saveNewPhone();
          let obj = {
            userId: CookieUtil.getItem('uid'),
            newPhone: this.modify.code+' '+this.modify.phone,
            otp: this.modify.otpCode
          }
          this.sureModifyNewPhone(url,obj,this.modify);
          break;
        default:
          break;
      }
    },
    confirmModify(url, data){
      this.$axios.get(url).then(res=>{
        if(res.succ){
          clearTimeout(this.timer);
          this.modifyEmail = true;
          this.title = 'Modify Your Mobile Number';
        }else{
          Toast(res.msg);
          // data.errCode = true;
        }
      }).catch(err=>{
        Toast(err)
      })
    },
    sureModifyNewPhone(url,param,data){
      Indicator.open({
        spinnerType:'fading-circle'
      });
      this.$axios.post(url, param).then(res=>{
        Indicator.close();
        if(res.code == 200){
          clearTimeout(this.timer);
          this.showSucc = true;
        }else{
          Toast(res.msg);
          // this.modify.errCode = true;
        }
      }).catch(err=>{
        Indicator.close();
        Toast(err.msg);
      })
    },
    saveVerifySucc(){
      this.showSucc = false;
      this.$emit('hiddenCheckPage', this.modify);
      Object.assign(this.$data, this.$options.data());
    }
  },
  directives:{
    "phone":{
      bind(el,binding,vnode){
        el.onfocus = function(){
          binding.value.errCode = false;
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
#heg-edit-email{
  position: relative;
  height:100%;
  .marTop{padding-top:2.04rem;}
  .strip-control-btn {
		width: 100%;
		height: 1.706rem;
		.sbtn-wrap {
			width: 50%;
			height: 100%;
			background:#ebebeb;
			box-sizing: border-box;
		}
		a {
			width: 100%;
			padding: 0.42rem 0;
			display: block;
			flex: 1;
			color: #999;
			font-size: 0.597rem;
			letter-spacing: 0.5px;
		}
		.active {
			a{color: #fff;}
			background:#ffad3d;
		}
  }
  .search {
    padding: 1.282rem 1rem 0.68rem;
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
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          width: 25%;
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
          font-size: 0.726rem;
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
          background:#ffad3d;
          border-radius: 2px;
          font-size: 0.726rem;
          cursor: pointer;
        }
        .btnActive{
          background:#ddd;
        }
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
