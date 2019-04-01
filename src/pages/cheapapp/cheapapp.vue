<template>
  <div id="b_app">
    <head-top class="header ">
      <img slot="title" class="flight_logo" :src="require('../../assets/images/cheapapp/home-logo.png')" alt="Online Travel Agency" title="Lowest Airfares in India">
    </head-top>
    <div class="section1">
      <p>Explore the world with HappyEasyGo APP!</p>
      <div class="select-group">
        <div class="select">
						<select name="" id="" v-model="code">
							<option :value="item.regionCode" v-for="(item, key) in phoneCode" :key="key">
								{{item.countryName + ' (+' + item.regionCode + ')'}}
							</option>
						</select>
						<span>
							{{'+' + code}}
						</span>
			  </div>
				<input class="sp" type="text" v-model.trim="mobile" placeholder="Enter your Mobile Number">
				<a class="send" href="javascript:;" @click="sendMess">Submit</a>
			</div>
      <div class="load-img">
        <a target="_blank" class="android_load" href="https://app.adjust.com/vbzvaj?campaign=M&adgroup=Download&creative=Online">
          <img :src='require("../../assets/images/referral/android_load.png")' alt="" name="">
        </a>
        <a target="_blank" class="apple_load" href="https://app.adjust.com/vbzvaj?campaign=M&adgroup=Download&creative=Online">
          <img :src='require("../../assets/images/referral/apple_load.png")' alt="" name="">
        </a>
      </div>
    </div>
    <div class="section2">
      <p class="se_title">
        HappyEasyGo App Features- What is different about this app ?
      </p>
      <ul>
        <ol class="ol-first">It is not like other apps which is providing you the best search for flights but also it is worth for your core satisfaction in monetary terms as well as travel.</ol>
        <ol class="ol-dot">Seasonal offers for all types of flyers.</ol>
        <ol class="ol-dot">Instant discounts on current bookings.</ol>
        <ol class="ol-dot">Priority choice for Business trips.</ol>
        <ol class="ol-dot">Check-in updates and change in timings updates.</ol>
        <ol class="ol-dot">Happy wallet- Reward program to earn more cash and get more discounts.</ol>
        <ol class="ol-last">With an urge of making Air travel More Secure and Efficient, we are here to serve you.</ol>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from '../../components/head/head.vue';
import { User } from "../../models/user/User.js";
import {DomainManager} from '../../config/DomainManager.js';
import {Reg} from '../../models/utils/Reg.js'
import {Toast} from 'mint-ui';
export default {
  components:{
    headTop,
  },
  data(){
    return {
      phoneCode: [],
      mobile:"",
      code: "91"
    }
  },
  methods:{
    sendMess(){
      let that = this
      let parm = this.code+' '+this.mobile
      let url = DomainManager.sendDownLoadAddress()+'?phone='+parm
      if(!(Reg.mobile.test(this.mobile))){
        Toast({
          message:"Please enter an right mobile number.",
          position:"center",
          duration:1500
        });
        return;
      }
      this.$http({
        type:'get',
        url:url,
        headers:{"x-Device":"mobile"}
      }).then(res => {
        if(res.data.succ){
          Toast({
            message: "SMS Sent",
            position: 'center',
            duration: 1000
          });
        }else{
          Toast({
            message: "SMS Failed",
            position: 'center',
            duration: 1000
          });
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    var _this = this;
    User.findSms(this).then(res => {
      res.list.forEach(item => {
        // _this.phoneCode.push(item.regionCode)
        _this.phoneCode = res.list;
      });
    });
  }
}
</script>
<style lang="less" scoped>
.header {
	position: static!important;
  background: #0b9d78;
  img{
    width: 6.4rem;
  }
}
#b_app{
  .section1{
    background:#1B2135;
    padding:1rem 0.55rem;
    text-align: left;
    p:nth-child(1){
      color:#fff;
      font-size:17px;
      font-family: "PingFangSC-Semibold";
      line-height: 1.14rem;
      padding:0rem 0 1rem;
    }
    .select-group {
      background: #fff;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      height: 1.92rem;
      margin-right: 0.5rem;
      display: flex;
      justify-content: space-between;
      select {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 9;
        display: block;
        width: 20%;
        height: 100%;
      }
      span {
        width: 20%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        line-height: 1.92rem;
        font-size: 14px; // color: #666;
        font-weight: normal;
      }
      input {
        border: 1px solid #ddd;
        box-sizing: border-box;
        width: 100%;
        padding: 0.44rem;
        font-size: 14px;
        -webkit-appearance: none;
        margin-left: 20%;
      }
      .sp {
        width: 55%;
        border-right: none;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        padding: 0.44rem;
        box-sizing: border-box;
      }
      a {
        display: block;
        width: 25%;
        line-height: 1.92rem;
        font-size: 16px;
        text-align: center;
        color: #fff;
        background: #F55D2D;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
    .load-img{
      padding-top:1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img{
        width:6rem;
        vertical-align: top;
      }
    }
  }
  .section2{
    padding:0.8rem 0.55rem;
    .se_title{
      color:#1B2135;
      font-size:16px;
      font-family: "PingFangSC-Semibold";
      line-height: 1.1rem;
      margin-bottom: 0.45rem;
      font-weight: bolder;
    }
    ul{
      padding:0 0 2rem;
      ol{
        text-align: left;
        color:#1B2135;
        font-size:14px;
        font-family: "PingFangSC-Light";
        line-height: 1.13rem;
      }
      .ol-first{
        margin-bottom: 0.45rem;
      }
      .ol-dot{
        padding-left:0.8rem;
        position: relative;
        margin-bottom:0.45rem;
      }
      .ol-dot:before{
        display:inline-block;
        content:"";
        width: 0.3rem;
        height: 0.3rem;
        border-radius:100%;
        background:#1B2135;
        position: absolute;
        left: 0;
        margin-top:0.4rem;
      }
      ol.ol-last{
        color:#999999;
        font-size:12px;
        font-family: "PingFangSC-Regular";
        line-height: 1rem;
        margin-top: 0.6rem;
      }
    }
  }
}
</style>
