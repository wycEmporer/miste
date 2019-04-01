<template>
  <div id="grab-share" v-show="!isShowBtn">
    <div class="content" :class="{autoheight:goingList.length < 4 || pastList.length < 4}">
      <div class="top-banner" :style="topBanner">
        <div class="top-div2">
          <p>Grab Additional Cashback on your booking</p>
          <p>Total earning</p>
        </div>
      </div>
      <div class="share-login" v-if="!isLogin">
        <div class="login-box login-box0">
          <button @click="SignIn">Sign In</button>
          <p>Check Your Ongoing Cashbacks</p>
        </div>
      </div>
      <div class="share-login" v-show="isLogin && noCashback">
        <div class="login-box login-box1">
          <div class="l-b-left flex align-items-center space-between">
            <p class="flex"><span class="rs">Rs</span><number-scroll :time="1" :value="totalEarning"></number-scroll></p>
            <div class="login-wallet" @click="goWallet" >My Wallet 
              <i class="iconfont icon-emptydown" id="jump-arrow"></i>
            </div>
          </div>
          <div class="l-b-right flex align-items-center space-between">
            <p><span>{{isLogin?cash.heplers:0}}</span> Friends</p>
            <p>No cashback received</p>
          </div>
        </div>
      </div>
      <div class="share-login" v-show="isLogin && !noCashback">
        <div class="login-box login-box1">
          <div class="l-b-left flex align-items-center space-between">
            <p class="flex"><span class="rs">Rs</span><number-scroll :time="1" :value="totalEarning"></number-scroll></p>
            <div class="login-wallet" @click="goWallet" >My Wallet 
              <i class="iconfont icon-emptydown" id="jump-arrow"></i>
            </div>
          </div>
          <div class="l-b-right flex align-items-center space-between">
            <p><span>{{isLogin?cash.heplers:0}}</span> Friends</p>
            <p>Last received {{cash.time}} <span style="margin-left:0.2rem;">+</span> <span class="rs">Rs</span><span>{{cash.lastEarning}}</span></p>
          </div>
        </div>
      </div>
      <ul class="how-do">
        <li class="flex space-between">
          <p>How Do I Grab CashBack?</p>
          <div class="top-div1" @click="showTerms">Know More</div>
        </li>
        <li>
          <img :src="require('../../assets/images/grabcashback/sale2.0_icon_write.png')" alt="">
          <p>1.Book a flight &amp; start your grab program</p>
        </li>
        <li>
          <img :src="require('../../assets/images/grabcashback/sale2.0_icon_share.png')" alt="">
          <p>2.Share with your friends</p>
        </li>
        <li>
          <img :src="require('../../assets/images/grabcashback/sale2.0_icon_wallet.png')" alt="">
          <p>3. Get same cashback amount instantly once each friend grabbed the cashabck</p>
        </li>
      </ul>
      <share-part1 :isLogin="isLogin" :goingList="goingList" @upapp="upapp" :pastList="pastList" :noRecord1="noRecord1" :noRecord2="noRecord2"></share-part1>
    </div>
    <div class="register-cover" v-show="showReward"></div>
    <div class="register-box" v-show="showReward">
      <div class="box-top box-top2" :style="registerBg2">
        <!-- <img :src="require('../../assets/images/grabcashback/grab_share_icon_cancel.png')" alt="" @click="closeFinishRegister"> -->
        <p>Rewards From:</p>
        <span>Grabbing friend's cashback.</span>
      </div>
      <div class="box-content">
        <div class="cou_list flex space-between align-items-center" :style="couBg3">
          <p></p>
          <p>{{reward.cb_amount}}</p>
        </div>
        <div class="cou_list flex space-between align-items-center" :style="couBg2">
          <p></p>
          <p>{{Math.abs(reward.coupon_amount)}}</p>
        </div>
      </div>
      <div class="box-btn">
        <a @click="succRegister">OK</a>
      </div>
    </div>
    <div class="shareCover" v-show="upDataDialog" @click="clickOut"></div>
    <div class="upDataDiaplog" v-show="upDataDialog">
      <p class="up-p1">This program is effective on the latest version of APP.</p>
      <p class="up-p2" v-show="isAndriod">Please Update in Google Play</p>
      <p class="up-p2" v-show="isIos">Please Update in APP Store</p>
      <a :href="upHref" target="_self" @click="upDateApp">OK</a>
    </div>
  </div>
</template>
<script>
import sharePart1 from './child/share-part1.vue';
import numberScroll from "../../components/number-scroll/number-scroll.vue";
import { CookieUtil } from "../../models/utils";
import { User } from "../../models/user";
import { DomainManager } from "../../config/DomainManager.js";
import { Toast, Indicator } from 'mint-ui';
import { AppBridge } from '../../models/appbridge/appbridge.js';
import { Activity } from '../../models/activity';
export default {
  components:{
    sharePart1,
    numberScroll,
  },
  data(){
    return {
      upHref:"java:;",
      isIos:false,
      isAndriod:false,
      upDataDialog:false,
      model:0,
      timer:null,
      noRecord1: true,
      noRecord2: true,
      isShowBtn: false,
      noCashback:false,
      contentMargin:false,
      showReward:false,
      isLogin:CookieUtil.hasItem('uuid'),
      cash:{},
      reward:{},
      goingList:[],
      pastList:[],
      topBanner:{
        "background-color":"#eee",
        "background-image":'url('+require('../../assets/images/grabcashback/grab_activity_top.png')+')',
        "background-size":"auto 100%",
        "background-repeat":"no-repeat",
        "background-position":"90% center"
      },
      registerBg2:{
        "background-image":'url('+require('../../assets/images/grabcashback/grab_share_register2.png')+')',
        "background-size":"100% auto",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      couBg2:{
        "background-image":'url('+require('../../assets/images/grabcashback/cou_orange.png')+')',
        "background-size":"100% auto",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      couBg3:{
        "background-image":'url('+require('../../assets/images/grabcashback/cou_purple.png')+')',
        "background-size":"100% auto",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      imgGroups:{
        gold:require('../../assets/images/grabcashback/grab_share_gold.png'),
      },
      months: [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ]
    }
  },
  computed: {
    totalEarning(){
      return this.isLogin?this.cash.totalEarning:0;
    }
  },
  methods:{
    upapp(){
      this.upDataDialog = true;
    },
    clickOut(){
      this.upDataDialog = false;
    },
    upDateApp(){
      this.upDataDialog = false;
    },
    closeFinishRegister(){
      Object.assign(this.$data, this.$options.data);
      this.showReward = false;
    },
    succRegister(){
      this.showReward = false;
    },
    rewardCouponAPI(){
      Activity.getDiwaliReward(this).then(res => {
        if(res.success && res.data.is_first){
          this.showReward = true;
          this.reward = res.data;
          this.sureGetReward();
        }else{
          this.showReward = false;
        }
      }).catch(err =>{
        console.log(err);
      })
    },
    sureGetReward(){
      Activity.getRegisterCouponAndCashback(this).then(res => {
        if(res.success){}
      }).catch(err =>{
        console.log(err);
      })
    },
    checkType() {
      let type = AppBridge.device;
      if(type == 1){
        this.model = 2;
        this.isAndriod = true;
        this.upHref = "https://play.google.com/store/apps/details?id=com.india.happyeasygo";
      }else if(type == 2){
        this.model = 3;
        this.isIos = true;
        this.upHref = "https://itunes.apple.com/app/id1390426818?mt=8";
      }else{
        this.model = 0;
      }
    },
    showTerms(){
      try {
        window.heg.trackEvent("AC_Grab_landing_T&C");
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler("trackEvent","AC_Grab_landing_T&C");
        }
      }
      this.$router.push('/grab-cashback');
    },
    SignIn(){
      AppBridge.nativeSignIn("in",this);
    },
    goWallet(){
      try {
        window.heg.trackEvent("AC_Grab_landing_Wallet");
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler("trackEvent","AC_Grab_landing_Wallet");
        }
      }
      if(!this.isLogin){
        this.nativeSignIn();
      }else{
        AppBridge.goWalletPage(this);
      }
    },
    getPageData(){
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      Activity.grabShareListHeader(this).then(res => {
        Indicator.close();
        if(res.succ && res.code == 200){
          let time = this.countDown(res.data, 'top',);
          this.$set(res.data,'time',time);
          this.cash = res.data;
        }else{
          Toast(res.msg)
        }
      }).catch(err => {
        Indicator.close();
        console.log(err);
      })
    },
    getPageData2(){
      Activity.grabShareList(this).then(res => {
        Indicator.close();
        if(res.succ){
          if(res.data.past.length < 1){
            this.noRecord2 = true;
          }else{
            this.noRecord2 = false;
            res.data.past.forEach((e,i)=>{
              let time = new Date(e.expirydate);
              let y = time.getFullYear();
              let m = (time.getMonth() + 1) > 9?time.getMonth() + 1:'0'+(time.getMonth() + 1);
              let d = time.getDate() > 9?time.getDate():'0'+time.getDate();
              let h = time.getHours()> 9?time.getHours():'0'+time.getHours();
              let mm = time.getMinutes()> 9?time.getMinutes():'0'+time.getMinutes();
              // let s = time.getSeconds();
              let t = h +':'+mm+' '+d+' '+this.months[Number(m)-1]+', '+y;
              this.$set(res.data.past[i],'time',t);
            });
            this.pastList = res.data.past;
          }
          if(res.data.ongoing.length < 1){
            this.noRecord1 = true;
          }else{
            this.noRecord1 = false;
            this.goingList = res.data.ongoing;
            this.goingList.forEach((e,i)=>{
              let rate = (e.obtainAmount / e.totalAmount) * 100;
              if(e.obtainAmount >=  e.totalAmount || e.obtainNum >= e.totalNum){
                rate = 100;
              }
              this.$set(e,'rate',parseInt(rate));
              this.datetime_to_unix(e,i);
            });
          }
        }else{
          this.noRecord1 = true;
          this.noRecord2 = true;
        }
      }).catch(err => {
        Indicator.close();
        console.log(err);
      })
    },
    countDown(cha_timestamp, who, i){
      if(who == 'top'){
        let time = new Date(cha_timestamp.lastEffectiveTime);
        let y = time.getFullYear();
        let m = (time.getMonth() + 1) > 9?time.getMonth() + 1:'0'+(time.getMonth() + 1);
        let d = time.getDate() > 9?time.getDate():'0'+time.getDate();
        let h = time.getHours()> 9?time.getHours():'0'+time.getHours();
        let mm = time.getMinutes()> 9?time.getMinutes():'0'+time.getMinutes();
        let t = h +':'+mm+' '+d+' '+this.months[Number(m)-1];
        if(!cha_timestamp.lastEffectiveTime){
          this.noCashback = true;
          return 0;
        }else{
          return t;
        }
        return t;
      }else if(who == 'bottom'){
        if(cha_timestamp <= 0){
          this.getPageData();
          this.getPageData2();
          this.cha_timestamp = 0;
          this.$set(this.goingList[i],'time','00h 00m')
          clearInterval(this.timer);
        }else{
          var sy_day = parseInt(cha_timestamp/(3600*24));
          var sy_day2 = sy_day > 9?sy_day:'0' + sy_day;
          var sy_hour = parseInt((cha_timestamp-sy_day*3600*24)/3600);
          var sy2_hour = sy_hour > 9 ? sy_hour : '0' + sy_hour;
          var sy_hours = parseInt((cha_timestamp)/3600) > 9?parseInt((cha_timestamp)/3600):'0'+parseInt((cha_timestamp)/3600);
          var sy_min = parseInt((cha_timestamp-sy_hour*3600-sy_day*24*3600)/60);
          var sy2_min = sy_min > 9 ? sy_min : '0' + sy_min;
          var sy_miao = cha_timestamp-sy_day*3600*24-sy_hour*3600-sy_min*60;
          var sy2_miao = sy_miao > 9 ? sy_miao : '0' + sy_miao;
          this.$set(this.goingList[i], 'time', sy_hours+'h '+sy2_min+'m ');
        }
      }
    },
    getGMTtime(d){
      let loaclTime = d.getTime();
      let localOffset = d.getTimezoneOffset() * 60000;
      let utc = loaclTime + localOffset;
      let offset = 5.5;
      let bombay = utc + (3600000*offset);
      return parseInt(bombay/1000);
    },
    datetime_to_unix(who,i){
      let d = new Date(who.currentDate);
			let d2 = new Date(who.expirydate);
			var timestamp_set = this.getGMTtime(d2);;
      var timestamp = this.getGMTtime(d);
      var cha_timestamp = timestamp_set-timestamp;
      this.countDown(cha_timestamp,'bottom', i);

      this.timer = setInterval(()=>{
        cha_timestamp--;
        this.countDown(cha_timestamp,'bottom', i);
      },1000);
    }
  },
  async created() {
    this.isShowBtn = await AppBridge.getNativeSource(this);
    this.contentMargin = this.isShowBtn;
    let id = await AppBridge.getNativeUuid(this);
    window.onReceviedUuid = this.onReceviedUuid;
    if(id){
      CookieUtil.removeItem("uuid");
      CookieUtil.setItem("uuid",id);
      this.isLogin = true;
    }else{
      if(CookieUtil.hasItem('uuid')){
        this.isLogin = true;
      }else{
        CookieUtil.removeItem("uuid");
        this.isLogin = false;
      }
    }
    this.checkType();
    User.findSms(this).then(res => {
			res.list.forEach(item => {
				this.phoneCode = res.list;
			});
    });
    if(this.isLogin){
      this.getPageData();
      this.getPageData2();
      this.rewardCouponAPI();
    }else{
      this.noRecord1 = true;
      this.noRecord2 = true;
    }
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer);
    next();
  },
  beforeRouteEnter (to, from, next) {
    next((el)=>{
      try {
        window.heg.getNativeSource();
      } catch (error) {
        if(!window.WebViewJavascriptBridge){
          el.$router.push("/");
        }
      }
    });
  }
}
</script>
<style lang="less" scoped>
#grab-share{
  .content{
    background: #eee;
    .top-banner{
      overflow: hidden;
      .top-div2{
        width: 9.8rem;
        padding: 1.135rem 0.769rem 0;
        text-align: left;
        p:first-child{
          color:#252B67;
          font-size:0.769rem;
          line-height:0.894rem;
        }
        p:last-child{
          color:#333;
          font-size:0.598rem;
          line-height:0.706rem;
          padding:1.416rem 0 0.427rem;
        }
      }
    }
    .share-login{
      .login-box{
        background: #fff;
        margin: 0.2rem 0.64rem 0;
        padding:0.64rem 0.3rem 0.427rem;
        border-radius:2px;
      }
      .login-box0{
        button{
          width:3.84rem;
          height: 0.982rem;
          font-size: 0.512rem;
          background:#ED8649;
          color:#fff;
          margin:0.6rem auto 0.427rem;
          border-radius: 3px;
          cursor: pointer;
        }
        p{
          font-family: "SFCompactText-Regular";
          font-size: 0.512rem;
          color: #666666;
        }
      }
      .login-box1{
        .l-b-right{
          margin-top: 1.068rem;
          p:first-child{
            opacity: 0.6;
            font-family: "SFCompactText-Regular";
            font-size: 0.512rem;
            color: #333333;
          }
          p:last-child{ 
            font-size: 0.512rem;
            color: #333;
            line-height: 0.62rem;
            span{color:#252B67;font-weight: bold;}
          }
        }
        .l-b-left{
          p,span{
            font-family: "HelveticaLTPro-Bold";
            font-size:1.155rem;
            color: #FA6C26;
            font-weight: bold;
          }
          .login-wallet{
            font-size: 0.598rem;
            cursor: pointer;
            .icon-emptydown{
              display: inline-block;
              font-size: 0.7rem;
              color:#999;
              transform: rotate(-90deg);
              vertical-align: text-bottom;
              margin-left: 0.25rem;
            }
          }
        }
      }
    }
    .how-do{
      background: #fff;
      margin: 0.64rem;
      padding:0.427rem 0.3rem 0;
      border-radius:2px;
      overflow: hidden;
      .top-div1{
        color: #666666;
        font-size:0.47rem ;
        padding: 0px 3px;
        border:1px solid #666;
      }
      li{
        text-align: left;
        margin-bottom: 0.64rem;
        img{float: left;}
        p{
          font-family: "SFCompactText-Regular";
          font-size: 0.512rem;
          color: #666666;
          line-height: 0.74rem;
          margin-left: 1.06rem;
        }
      }
      li:first-child{
        font-family: "SFCompactText-Regular";
        font-size: 0.598rem;
        color: #333333;
        line-height: 0.74rem;
      }
      li:nth-of-type(2) img{
        width:0.62rem;
        height:0.66rem;
        vertical-align: middle;
      }
      li:nth-of-type(3) img{
        width:0.64rem;
        height:0.60rem;
        vertical-align: middle;
      }
      li:last-child img{
        width:0.64rem;
        height:0.62rem;
        vertical-align: middle;
      }
    }
  }
  .autoheight{
    height:100%;
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
    border-radius:4px;
    transform:translateY(-50%) translateX(-50%);
		-webkit-transform:translateY(-50%) translateX(-50%);
    .box-top{
      height:4.7rem;
      color:#FBC02D;
      font-size:0.726rem;
      font-weight: bold;
      margin-bottom: 0.641rem;
      border-radius:4px;
      overflow: hidden;
      padding-left:0.854rem;
      img{
        width:0.854rem;
        height:0.854rem;
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

  .shareCover{
    width:100%;
    height:100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    background: rgba(0,0,0,0.5);
  }
  .upDataDiaplog{
    width:11rem;
    height:8rem;
    background: #FAFAFA;
    border-radius: 3px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin:auto;
    z-index: 12;
    padding:2rem 1rem 1rem;
    p{
      color:#333;
      font-size:0.68rem;
      line-height:1rem;
      text-align: left;
      span{
        font-weight:bold;
      }
    }
    .up-p2{
      margin:1rem 0 0;
      padding-bottom:1rem;
      border-bottom:1px solid #999;
    }
    a{
      color:#fff;
      background:#ffad3d;
      font-size:0.68rem;
      width:8rem;
      height:1.3rem;
      line-height:1.3rem;
      border-radius: 3px;
      margin-top:1.2rem;
    }
  }
}
</style>
