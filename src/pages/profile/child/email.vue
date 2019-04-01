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
        <div class="strip-control-btn flex space-between align-items-center" v-if="info.cellphone && info.cellphone.indexOf(' ') > -1" >
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
                <select name="" id="" disabled v-model="mobile.code">
                  <option :value="item.regionCode" v-for="(item, key) in mobile.phoneCode" :key="key">
                    {{item.countryName + ' (+' + item.regionCode + ')'}}
                  </option>
                </select>
                <span>
                  {{'+' + mobile.code}}
                </span>
              </div>
              <input class="phone" type="Number" disabled placeholder="Contact Mobile Number" v-model="mobile.phoneNo">
              <button id="Mobile" type="button" :class="{otpActive:mobile.active}" :disabled="mobile.active" @click="sendOTPEvent(1)">{{mobile.time}}{{mobile.second}}</button>
            </div>
            <div class="tripId">
              <mt-field @keydown.13.native="changeEmail(1)" v-model="mobile.otpCode" placeholder="Vertification Code"></mt-field>
              <div class="checkError" v-show="mobile.errCode">Please enter the code you received.</div>
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
              <mt-field label="" placeholder="Vertification Code" @keydown.13.native="changeEmail(2)" v-model="email.otpCode"></mt-field>
              <div class="checkError" v-show="email.errCode">Please enter the code you received.</div>
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
            <input class="phone" style="border-left:1px solid #ddd;width:95%;" type="email" placeholder="Email Address" v-model="modify.email">
            <button id="Email" type="button" :class="{otpActive:modify.active}" :disabled="modify.active" @click="sendOTPEvent(3)">{{modify.time}}{{modify.second}}</button>
          </div>
          <div class="tripId">
            <mt-field label="" placeholder="Vertification Code" @keydown.13.native="changeEmail(3)" v-model="modify.otpCode"></mt-field>
            <div class="checkError" v-show="modify.errCode">Please enter the code you received.</div>
          </div>
          <div class="s-confirm">
            <button :class="{btnActive:modify.canClick}" :disabled="modify.canClick" @click="changeEmail(3)">Confirm</button>
          </div>
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
  data(){
    return{
      info:{},
      title:'',
      firstOtp:'',
      firstType:'',
      timer:null,
      isMobile:true,
      isEmail:false,
      modifyEmail:false,
      mobile:{
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
        email:'',
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
        if(this.info.email){
          this.email.email = this.info.email;
          this.title = 'Verify Your Identity';
          if(this.info.cellphone != null && this.info.cellphone.indexOf(' ') > -1){
            this.isMobile = true;
            this.isEmail = false;
            this.mobile.code = this.info.cellphone.split(' ')[0];
            this.mobile.phoneNo = this.info.cellphone.split(' ')[1];
          }else{
            this.isMobile = false;
            this.isEmail = true;
          }
        }else{
          this.isEmail = false;
          this.isMobile = false;
          this.modifyEmail = true;
          this.title = 'Link Your Email';
        }
      }
    },
    phoneCode(curVal,oldVal){
      if(curVal){
        this.mobile.phoneCode = curVal;
      }
    },
    mobile:{
			handler:function(val, oldVal){
				if(this.mobile.otpCode != '' && this.mobile.phoneNo !=''){
					this.mobile.canClick = false;
					this.mobile.errCode = false;
				}else{
					this.mobile.canClick = true;
				}
			},
			deep:true
		},
		email:{
			handler:function(val, oldVal){
				if(this.email.otpCode != '' && this.email.email !=''){
					this.email.canClick = false;
					this.email.errCode = false;
				}else{
					this.email.canClick = true;
				}
			},
			deep:true
    },
    modify:{
      handler:function(val, oldVal){
				if(this.modify.otpCode != '' && this.modify.email !=''){
					this.modify.canClick = false;
					this.modify.errCode = false;
				}else{
					this.modify.canClick = true;
				}
			},
			deep:true
    }
  },
  methods:{
    hiddenEmail(){
      this.modifyEmail = false;
      this.email.otpCode = '';
      this.mobile.otpCode = '';
      this.modify.otpCode = '';
      this.title = 'Verify Your Identity';
      this.$emit('hiddenEmail');
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
        if(!Reg.email.test(this.modify.email)){
          Toast({
            message:'Please enter a valid email.',
            duration:1500
          });
          return;
        }else{
          let url = DomainManager.newSendOtp()+'?email='+this.modify.email;
          this.getOrderOTP(url,this.modify);
        }
      }
    },
    getOrderOTP(param,type){
			let that = this;
			Indicator.open({
				text:'Sending . . .',
				spinnerType: 'fading-circle'
			});
			this.$axios.get(param).then(res=>{
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
					Indicator.close();
					Toast(res.msg);
				}
			}).catch(err =>{
				Indicator.close();
				console.log(err)
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
          if(this.firstType == 'email' ){
            url = DomainManager.newCheckOtp()+'?email='+this.email.email+'&oldOtp='+this.firstOtp+'&newEmail='+this.modify.email+'&otpCode='+this.modify.otpCode;
            this.confirmModify(url,this.modify);
          }else if(this.firstType == 'mobile'){
            url = DomainManager.newCheckOtp()+'?cellphone='+this.mobile.code+' '+this.mobile.phoneNo+'&oldOtp='+this.firstOtp+'&newEmail='+this.modify.email+'&otpCode='+this.modify.otpCode;
            this.confirmModify(url,this.modify);
          }else{
            url = DomainManager.newCheckOtp()+'?newEmail='+this.modify.email+'&otpCode='+this.modify.otpCode;
            this.confirmModify(url,this.modify);
          }  
          break;
        default:
          break;
      }
    },
    confirmModify(url,data){
      let self = this;
      if(data.type == 3 && !Reg.email.test(data.email)){
        Toast({
          message:'Please enter a valid email.',
          duration:1500
        });
        return;
      }else{
        if(data.otpCode == ''){
          data.errCode = true;
          return;
        }else{
          Indicator.open({
            spinnerType:'fading-circle'
          });
          this.$axios.get(url).then(res=>{
            Indicator.close();
            if(res.succ){
              clearTimeout(this.timer);
              if(data.type == 3){
                Toast(res.msg);
                Object.assign(this.$data, this.$options.data());
                this.$emit('changeEmail',this.info);
              }else {
                this.modifyEmail = true;
                this.title = 'Modify Your Email';
              }
            }else{
              if(data.type == 3){
                Toast({
                  message:res.msg,
                  duration:1500  
                });
                self.timer = setTimeout(()=>{
                  self.modifyEmail = false;
                  data.otpCode = '';
                  self.email.otpCode = '';
                  self.mobile.otpCode = '';
                  self.title = 'Verify Your Identity';
                },1500);
              }else{
                Toast(res.msg);
              }
            }
          }).catch(err=>{
            Indicator.close();
            console.log(err);
          })
        }
      }
    },
  },
}
</script>
<style lang="less">
#heg-edit-email{
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
#heg-edit-email{
  .marTop{padding-top:2.04rem;}
  .checkError {
    color: #f65858;
    margin-top: 0.2rem;
    font-size: 0.598rem;
    text-align: left;
  }
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
}
</style>
