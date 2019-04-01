<template>
  <div id="activity-part1">
    <div class="part-top" v-show="theShareHrefEnd">
      <div class="top-top" @click="goToHomePage">
        <div class="top-imgs">
          <img class="top-title" :src="imgGroups.title" alt="">
        </div>
        <p>Cheap Flight Booking</p>
      </div>
      <div class="top-line"></div>
      <div class="top-center">
        <div class="center-div1 flex align-items-center">
          <p class="c-div1-p">Let's Grab</p>
          <div>
            <span class="rs">Rs</span><i>{{String(diwaliProcess.totalAmount) | formatDate}}</i>
            <p>Cashback</p>
          </div>
        </div>
        <div class="center-div2">Snatch A Part of Cashback &amp; Rs.{{Math.abs(beforeData.coupon_amount)}} Flight Coupon for yourself</div>
        <div class="top-line"></div>
        <div class="center-div3" :style="topBanner">
          <p class="c-div3-p1" :class="{'c-div33':(diwaliProcess.totalAmount >= 1000)}"><span class="rs">Rs</span><span>{{String(Math.floor(diwaliProcess.totalAmount - diwaliProcess.obtainAmount)) | formatDate}}</span></p>
          <div class="c-div3-bottom" :style="topBannerBottom">
            <div class="top-bottom1">{{diwaliProcess.time}}</div>
          </div>
        </div>
        <div class="center-div4">What's more? You can get {{beforeData.silver_amount}} ecash today!</div>
      </div>
      <div class="top-bottom2">
        <button v-show="isShowBtn && !isLogin" @click="registerAccount">Grab Money Now</button>
        <button @click="ShareHref">Share for Help</button>
      </div>
      <div class="top-bottom3">
        <div class="b3-div flex space-between">
          <p>{{diwaliProcess.obtainNum}}/{{diwaliProcess.totalNum}} Friends</p>
          <div class="flex" v-show="isShowBtn">
            <a href="https://app.adjust.com/for04bk?campaign=landing&adgroup=LandCheck&creative=Online" target="_self">Check Rewards</a>
            <i class="iconfont icon-emptydown"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="part-top" v-show="theShareHrefEnd2">
      <div class="top-top" @click="goToHomePage">
        <div class="top-imgs">
          <img class="top-title" :src="imgGroups.title" alt="">
        </div>
        <p>Cheap Flight Booking</p>
      </div>
      <div class="top-line"></div>
      <div class="top-center">
        <div class="center-div1 flex align-items-center">
          <p class="c-div1-p">Let's Grab</p>
          <div>
            <span class="rs">Rs</span><i>{{String(diwaliProcess.totalAmount) | formatDate}}</i>
            <p>Cashback</p>
          </div>
        </div>
        <div class="center-div2">Snatch A Part of Cashback &amp; Rs.{{Math.abs(beforeData.coupon_amount)}} Flight Coupon for yourself</div>
        <div class="top-line"></div>
        <div class="center-div3" :style="topBannerEnd">
          <p class="c-div3-p1"><span class="rs">Rs</span><span>{{diwaliProcess.obtainAmount}}</span></p>
          <div class="c-div3-bottom" :style="topBannerBottom">
            <div class="top-bottom1">{{diwaliProcess.time}}</div>
          </div>
        </div>
        <div class="center-div4">What's more? You can get {{beforeData.silver_amount}} ecash today!</div>
      </div>
      <div class="top-bottom2">
        <!-- <button @click="ShareHref">Share for Help</button> -->
      </div>
      <div class="top-bottom3">
        <div class="b3-div flex space-between">
          <p>{{diwaliProcess.obtainNum}}/{{diwaliProcess.totalNum}} Friends</p>
          <div class="flex">
            <a href="https://app.adjust.com/for04bk?campaign=landing&adgroup=LandCheck&creative=Online" target="_self">Check Rewards</a>
            <i class="iconfont icon-emptydown"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="register-cover" v-show="showRegister"></div>
    <div class="register-box" v-show="showRegister" >
      <div class="box-top" :style="registerBg1">
        <img :src="imgGroups.cancel" alt="" @click="closeRegisterAccount">
        Claim Amazing Rewards Now
      </div>
      <ul class="box-form">
        <li>
          <div class="phoneNumber flex space-between">
            <div class="select-group">
              <span>
                {{'+' + mobile.code}}
              </span>
            </div>
            <input class="phone" type="number" placeholder="Mobile Number" v-model="mobile.phoneNo">
            <button id="Mobile" type="button" :class="{otpActive:mobile.active}" :disabled="mobile.active" @click="sendOTPEvent">{{mobile.time}}{{mobile.second}}</button>
          </div>
        </li>
        <li>
          <input type="text" v-model="mobile.otpCode" placeholder="Verification Code">
        </li>
        <li>
          <input type="text" v-model="mobile.name" maxlength="50" placeholder="Leave your name (optional)">
        </li>
        <li class="li-checkbox flex align-items-center">
          <input type="checkbox" v-model="mobile.checked" name="agreement" >
          <label for="agreement">You agree to HappyEasyGo's <a href="java:;" @click="$router.push('/agreement')">T&amp;C</a> </label>
        </li>
        <li>
          <button @click="finishRegister" :class="{canRegister:mobile.canClick}" :disabled="mobile.canClick">Continue</button>
        </li>
      </ul>
    </div>
    <div class="register-cover" v-show="showSuccRegister"></div>
    <div class="register-box" v-show="showSuccRegister">
      <div class="box-top box-top2" :style="registerBg2">
        <img :src="imgGroups.cancel" alt="" @click="closeFinishRegister">
        <p>Congrats!</p>
        <span>Your Rewards await.</span>
      </div>
      <div class="box-content">
        <div class="cou_list flex space-between align-items-center" :style="couBg3">
          <p></p>
          <p>{{register.reward}}</p>
        </div>
        <div class="cou_list flex space-between align-items-center" :style="couBg2">
          <p></p>
          <p>{{register.coupon}}</p>
        </div>
        <div class="cou_list flex space-between align-items-center" :style="couBg1">
          <p></p>
          <p>{{String(register.silverAmount) | formatDate}}</p>
        </div>
      </div>
      <div class="box-btn">
        <a href="https://app.adjust.com/for04bk?campaign=checking&adgroup=Download&creative=Online" 
        target="_blank" @click="succRegister">Check Now</a>
      </div>
    </div>
  </div>
</template>
<script>
import { Reg } from '../../../models/utils'
import { Toast, Indicator } from 'mint-ui'
import { Activity } from '../../../models/activity';
import { User } from "../../../models/user";
import { DomainManager } from '../../../config/DomainManager';
export default {
  props:[
    "theShareHrefEnd","theShareHrefEnd2","orderinfo","diwaliProcess",
    "orderId","isShowBtn","isLogin","beforeData"
  ],
  data(){
    return {
      register:{},
      mobile:{
        type:1,
        name:'',
				code:'91',
				phoneNo:'',
        otpCode:'',
        timer:null,
				time:'OTP',
        second:'',
        checked:true,
				active:false,
				canClick:true,
      },
      showRegister:false,
      showSuccRegister:false,
      topBanner:{
        "background-color":"#FBC02D",
        "background-image":'url('+require('../../../assets/images/grabcashback/grab_share_top1.png')+')',
        "background-size":"100% 100%",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      topBannerBottom:{
        "background-image":'url('+require('../../../assets/images/grabcashback/round_bg.png')+')',
        "background-size":"100% 100%",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      topBannerEnd:{
        "background-color":"#FBC02D",
        "background-image":'url('+require('../../../assets/images/grabcashback/grab_share_top2_outdate.png')+')',
        "background-size":"100% 100%",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      registerBg1:{
        "background-image":'url('+require('../../../assets/images/grabcashback/grab_share_register1.png')+')',
        "background-size":"100% auto",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      registerBg2:{
        "background-image":'url('+require('../../../assets/images/grabcashback/grab_share_register2.png')+')',
        "background-size":"100% auto",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      couBg1:{
        "background-image":'url('+require('../../../assets/images/grabcashback/cou_blue.png')+')',
        "background-size":"100% auto",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      couBg2:{
        "background-image":'url('+require('../../../assets/images/grabcashback/cou_orange.png')+')',
        "background-size":"100% auto",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      couBg3:{
        "background-image":'url('+require('../../../assets/images/grabcashback/cou_purple.png')+')',
        "background-size":"100% auto",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      imgGroups:{
        title:require('../../../assets/images/home/home-logo.png'),
        cancel:require('../../../assets/images/grabcashback/grab_share_icon_cancel.png'),
        select:require('../../../assets/images/grabcashback/grab_share_icon_gou.png'),
        share:require('../../../assets/images/grabcashback/grab_icon_share.png'),
        plane:require('../../../assets/images/grabcashback/grab_share_plane.png'),
        plane2:require('../../../assets/images/grabcashback/grab_icon_plane.png'),
      }
    }
  },
  watch:{
    mobile:{
      handler:function(val,oldV){
        if(this.mobile.otpCode != '' && this.mobile.phoneNo !=''){
					this.mobile.canClick = false;
				}else{
					this.mobile.canClick = true;
        }
        if(!this.mobile.active){
          this.mobile.time = 'OTP';
          clearTimeout(this.mobile.timer);
        }
      },
      deep:true
    },
  },
  computed:{
    realAmount(){
      let money = this.diwaliProcess.obtainAmount == 0?
      this.orderinfo.orderAmount:(this.orderinfo.orderAmount - this.diwaliProcess.obtainAmount);
      return money;
    }
  },
  methods:{
    goToHomePage(){
      this.$router.push('/home?grabcashback');
    },
    ShareHref(){
      try {
        window.heg.trackEvent("AC_Grab_landing_Invite");
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler("trackEvent","AC_Grab_landing_Invite");
        }
      }
      this.$emit('showShareDialog');
    },
    closeRegisterAccount(){
      Object.assign(this.$data, this.$options.data(this.mobile));
      this.showRegister = false;
    },
    closeFinishRegister(){
      Object.assign(this.$data, this.$options.data(this.mobile));
      this.showSuccRegister = false;
    },
    registerAccount(){
      if(this.theShareHrefEnd){
        this.showRegister = true;
      }else{
        Toast({
          message:'The activity has ended. Please refresh the page.',
          duration:1500
        })
      }
    },
    finishRegister(){
      if(!Reg.onlyNumber1.test(this.mobile.phoneNo)){
        Toast({
          message:'Please enter a valid phone number.',
          duration:1500
        });
        return false;
      }else{
        if(this.mobile.code == '91' && String(this.mobile.phoneNo).length != 10){
          Toast({
            message:"Please enter a valid mobile number",
            duration:1500
          });
          return false;
        }
        if( this.mobile.code == '86' && String(this.mobile.phoneNo).length != 11){
          Toast({
            message:"Please enter a valid mobile number",
            duration:1500
          });
          return false;
        }
        if(this.mobile.name != '' && !Reg.name.test(this.mobile.name)){
          Toast({
            message:"Please enter a valid name",
            duration:1500
          });
          return false;
        }
      }
      Indicator.open({
        spinnerType:'fading-circle'
      });
      let data = {
        referer:this.orderId,
        cellphone:this.mobile.code+' '+this.mobile.phoneNo,
        otp:this.mobile.otpCode,
        realName:this.mobile.name,
      };
      Activity.grabInviteRegisterByPhone(this, data).then(res => {
        Indicator.close();
        if(res.success){
          this.showRegister = false;
          this.showSuccRegister = true;
          this.register = res.data;
          this.$emit('succRegister');
          Toast({
            message:'Success',
            duration:1000
          });
        }else{
          Toast({
            message:res.msg,
            duration:1000
          });
        }
      }).catch(err =>{
        Indicator.close();
        Toast({
          message:" The network is busy. Please try again later !",
          duration:1500
        });
      })
    },
    succRegister(){
      this.showSuccRegister = false;
    },
    sendOTPEvent(){
      let self = this;
      if(!Reg.onlyNumber1.test(this.mobile.phoneNo)){
        Toast({
          message:'Please enter a valid phone number.',
          duration:1500
        });
        return;
      }else{
        if(this.mobile.code == '91' && String(this.mobile.phoneNo).length != 10){
          Toast({
            message:"Please enter a valid mobile number",
            duration:1500
          });
          return false;
        }else if( this.mobile.code == '86' && String(this.mobile.phoneNo).length != 11){
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
          let param = 'phone='+this.mobile.code+' '+this.mobile.phoneNo;
          User.sendRegisterOTP(self,param).then(res =>{
            Indicator.close();
            if(res.success){
              if(res.code == 0){
                Toast({
                  message:'Success',
                  duration:1500
                });
                this.mobile.active = true;
                this.mobile.otpCode = '';
                this.mobile.time = res.lastSendTime;
                this.mobile.second = 's';
                this.mobile.timer = setInterval(()=>{
                  this.mobile.time --;
                  if(this.mobile.time <= 0){
                    this.mobile.time = 'OTP';
                    this.mobile.second = '';
                    this.mobile.active = false;
                    clearInterval(this.mobile.timer);
                  }
                },1000);
              }else if(res.code == 1){
                Toast("The mobile number has existed");
              }else{
                Toast(res.msg);
              }
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
  },
}
</script>
<style lang="less" scoped>
#activity-part1{
  background: #FBC02D;
  .part-top{
    width:100%;
    padding-top: 1rem;
    .top-line{
      width:9.8rem;
      height:1px;
      margin:auto;
      background: #fff;
      border-radius:2px;
      margin-top: 0.64rem;
      margin-bottom: 0.64rem;
    }
    .top-top{
      width:50%;
      margin:auto;
      cursor: pointer;
      p{
        opacity: 0.8;
        font-size: 0.512rem;
        color: #FFFFFF;
        font-family: "SFCompactText-Medium";
      }
      .top-imgs{
        position: relative;
        .top-title{
          width: 6rem;
          height:0.68rem;
        }
      }
    }
    .top-center{
      .center-div1{
        padding:0 0 0.427rem;
        justify-content: center;
        .c-div1-p{
          font-size: 1.28rem;
          color: #614D1A;
          line-height: 1.242rem;
          font-weight: bold;
          font-family: "SFCompactText-Light";
        }
        div{
          text-align: left;
          margin-left:0.342rem;
          span{
            font-size: 1.4rem;
            color: #000000;
            line-height: 1.242rem;
            font-weight: bold;
            margin:0;
          }
          i{
            font-size: 1.916rem;
            color: #000000;
            line-height: 1.242rem;
            font-weight: bold;
          }
          p{
            font-size: 0.556rem;
            color: #000;
            font-weight: bold;
          }
        }
      }
      .center-div2{
        font-family: "HelveticaLTPro-Roman";
        font-size: 0.512rem;
        color: #111111;
        text-align: center;
      }
      .center-div3{
        height:12rem;
        position: relative;
        .c-div3-p1{
          font-family: "HelveticaLTPro-BlackCond";
          font-size: 1.4rem;
          color: #fff;
          line-height: 0.922rem;
          text-align: left;
          padding-left: 36%;
          position: absolute;
          top: 2rem;
          left: 0;
          right: 0;
          margin:auto;
          font-weight: bold;
          span:first-child{
            font-size: 0.712rem;
          }
        }
        .c-div33{
          font-size: 1.2rem;
          padding-left: 32%;
        }
        .c-div3-bottom{
          padding:0.64rem 0 0.427rem;
          width:100%;
          position: absolute;
          bottom: 0;
        }
        .top-bottom1{
          font-size: 0.512rem;
          color:#fff;
          background:transparent;
          font-family: "SFCompactText-Light";
        }
        .top-bottom1::before{
          display:inline-block;
          content:"";
          width:1.282rem;
          opacity: 0.6;
          vertical-align: middle;
          margin-right: 0.427rem;
          margin-top:-0.1rem;
          border-top: 1px solid #FFFFFF;
        }
        .top-bottom1::after{
          display:inline-block;
          content:"";
          width:1.282rem;
          opacity: 0.6;
          vertical-align: middle;
          margin-left: 0.427rem;
          margin-top:-0.1rem;
          border-top: 1px solid #FFFFFF;
        }
      }
      .center-div4{
        background: #252B67;
        font-family: "SFCompactText-Light";
        font-size: 0.512rem;
        color: #EAEAEA;
        text-align: center;
      }
    } 
    .top-bottom2{
      background:#252B67;
      padding: 0.64rem 0.64rem;
      button{
        display: block;
        width:100%;
        padding:0.3rem 0;
        // height:1.455rem;
        // line-height: 1.455rem;
        font-size: 0.726rem;
        color: #252B67;
        background:#FBC02D;
        border-radius: 6px;
        font-weight: bold;
        font-family: "SFCompactText-Semibold";
      }
      button:last-child{
        color:#252B67;
        background: #fff;
        margin-top: 0.534rem;
      }
    }
    .top-bottom3{
      background: #252B67;
      padding:0 0.64rem;
      .b3-div{
        a,p{
          color: #FFFFFF;
          font-size: 0.598rem;
          background:#252B67;
          font-family: "SFCompactText-Medium";
        }
        div{
          cursor: pointer;
        }
        .icon-emptydown{
          transform: rotate(-90deg);
          margin-left:0.3rem;
          opacity: 0.5;
          color:#fff;
        }
      }
    }

    .top-info{
      margin: 2.35rem auto 0;
      width:12.7rem;
      height:5.3rem;
      color:#fff;
      border-radius:4px;
      .info-left{
        width: 78%;
        height: 100%;
        font-size: 0.68rem;
        background:#06419B;
        border-radius:4px;
        p:first-child{margin:1.3rem 0 0.3rem;}
        div{margin-top:0.5rem;}
        span{
          font-size:0.8rem;
          color:#FDE742;
          font-weight: bold;
        }
        img{
          width:2.5rem;
          margin: 0 0.2rem;
        }
      }
      .info-right{
        width: 21%;
        height: 100%;
        font-size: 0.8rem;
        background: #fff;
        border-radius:4px;
        text-align: right;
        padding-right:1%;
        img{
          width:0.789rem;
          height: 0.789rem;
          margin:0.5rem 0 1.8rem;
        }
        span{font-weight: bold;}
        p:nth-of-type(1){
          color:#DF5342;
          font-weight: bold;
          margin-bottom:0.2rem;
        }
        p:last-child{
          font-size:0.56rem;
          color:#999;
          font-weight: bold;
          text-decoration: line-through;
        }
      }
    }
  }

  .register-cover{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index:10;
    background:rgba(0,0,0,0.5);
  }
  .register-box{
    position: fixed;
    width:13.39rem;
    top:50%;
    left: 50%;
    margin:auto;
    padding-bottom: 0.641rem;
    z-index:11;
    background: #fff;
    border-radius:5px;
    transform:translateY(-50%) translateX(-50%);
		-webkit-transform:translateY(-50%) translateX(-50%);
    .box-top{
      height:4.7rem;
      line-height: 4.7rem;
      color:#FBC02D;
      font-size:0.726rem;
      font-weight: bold;
      margin-bottom: 0.641rem;
      border-radius:4px;
      padding-left:0.854rem;
      overflow: hidden;
      img{
        width:0.854rem;
        cursor: pointer;
        float: right;
        display: inline-block;
        margin: 0.5rem 0.3rem 0 0;
      }
      .succ-p1{
        width:8.42rem;
        text-align: left;
        font-size:0.68rem;
        line-height: 1rem;
        margin-top: 0.854rem;
        font-weight: normal;
        span{
          color: #FDE742;
          font-size:0.7rem;
          font-weight: bold;
        }
      }
      // background:linear-gradient(#0970E4, #0CC1C8);
    }
    .box-top2{
      line-height:1rem;
      text-align: left;
      p{
        font-family: "SFCompactText-Semibold";
        font-size:1.196rem;
        color: #FBC02D;
        line-height: 1.5rem;
        padding-top: 1rem;
      }
      span{
        font-family: "SFCompactText-Regular";
        font-size: 0.512rem;
        color: #FFFFFF;
        line-height: 1.025rem;
        font-weight: normal;
      }
    }
    .box-form{
      text-align: left;
      background: #fff;
      input{
        width:10.2rem;
        height:1.282rem;
        padding:0 0 0 0.5rem;
      }
      input::placeholder{color:#999;}
      li{
        width:12.11rem;
        line-height: 1.282rem;
        border-radius: 3px;
        border:1px solid #eee;
        margin:0.427rem auto 0;
      }
      .li-checkbox{
        border:0;
        font-size: 0.470rem;
        color: #666666;
        a{color:#0C9D79;}
        overflow: hidden;
        input{
          width:0.598rem;
          height:0.598rem;
          border: 1px solid #CDCDCD;
          border-radius: 2px;
        }
      }
      li:last-child{
        border:0;
        line-height: 0;
        button{
          width:12.11rem;
          height:1.282rem;
          margin:auto;
          font-size: 0.598rem;
          color: #FFFFFF;
          padding: 0;
          background:#FBC02D;
        }
        .canRegister{
          background:#eee;
        }
      }
    }

    .box-content{
      padding: 0 0.64rem 0.64rem;
      font-size: 0.598rem;
      color: #333333;
      text-align: center;
      line-height: 0.85rem;
      font-family: "SFCompactText-Regular";
      span{color:#000;font-weight: bold;}
    }
    .cou_list{
      height:3rem;
      margin-bottom: 0.47rem;
      p{
        font-size:1.2rem;
        color:#252B67;
        font-weight: bold;
        margin-right: 1.5rem;
      }
    }
    .cou_list:last-child{margin-bottom: 0;}
    .box-btn{
      a{
        width:11.11rem;
        height:1.282rem;
        line-height:1.282rem;
        margin:auto;
        font-size: 0.598rem;
        color: #FFFFFF;
        background:#FBC02D;
        border-radius: 2px;
      }
    }
  }

  .phoneNumber {
    .select-group {
      position: relative;
      box-sizing: border-box;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      width: 30%;
      height:1.282rem;
      span {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        height:1.282rem;
        line-height: 1.282rem;
        font-size: 0.6rem;
        font-weight: normal;
      }
    }
    .phone {
      width: 70%;
      padding:0 0;
    }
    button {
      width: 30%;
      height:1.282rem;
      background-size: 0.769rem;
      background: #FBC02D;
      font-size: 0.6rem;
      color: #fff;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    .otpActive{
      background: #ddd;
    }
  }
}
</style>
