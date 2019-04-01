<template>
  <div class="ani-cover" :class="{'ani-coverOld':showOldOffer}">
    <div class="closeModal flex" @click="emitClose">
      <img :src="require('./images/guanbi@2x.png')" alt="">
    </div>
    <div class="title" v-if="!modalObj.isIndexPage">
      Congratulations on your successful payment. <br>
      You get a <span>bonus</span>!
    </div>
    <div class="title title2" v-else>
       <span class="fontB">{{showOldOffer?"Pre-Spring Sale":"Holi Festival 2019"}}</span> 
        <br>
        <p style="letter-spacing:-.5px;">Sign up now for massive discounts on your first booking!</p>
    </div>
    <div class="flex validity" :class="{validity2:modalObj.isIndexPage}">
      <span>Validity: {{(modalObj.isIndexPage && modalObj.startDate) ? getDate(new Date(modalObj.startDate), 1) +' - '+ getDate(new Date(modalObj.endDate), 1) : modalObj.date + 'day'}}</span>
    </div>
    <div class="flex content-center" style="margin-bottom:.83rem">
      <div class="couponBan" v-if="modalObj.showFCoupon">
        <div style="position:relative">
          <div class="right_top" v-if="!showOldOffer"><img :src="require('./images/icon_flight.png')" alt="">Flight</div>
          <img :src="modalObj.url" alt="" style="width:6.8rem;height:4.14rem;">
          <div class="btnCopy" @click="throttle_copyCode(modalObj.coupon)">
            <div class="coupon-value">{{modalObj.coupon}}
              <img :src="require('./images/scissors.png')" alt="">
            </div>
          </div>
        </div>
        <div class="redeemBtn" @click="redeem('flight')">{{showOldOffer?'Click to Redeem':'Book Now'}}</div>
      </div>
      <div class="couponBan" v-if="modalObj.hotelObj.showHCoupon && modalObj.hotelObj.url">
        <div style="position:relative">
          <div class="right_top" v-if="!showOldOffer"><img :src="require('./images/icon_hotel.png')" alt="">Hotel</div>
          <img :src="modalObj.hotelObj.url" alt="" style="width:6.8rem;height:4.14rem;">
          <div class="btnCopy" v-if="showOldOffer" @click="throttle_copyCode('HEGHHFN')">
            <div class="coupon-value">{{modalObj.hotelObj.coupon}}
              <img :src="require('./images/scissors.png')" alt="">
            </div>
          </div>
          <div class="btnCopy" v-else @click="throttle_copyCode(modalObj.hotelObj.coupon)">
            <div class="coupon-value">{{modalObj.hotelObj.coupon}}
              <img :src="require('./images/scissors.png')" alt="">
            </div>
          </div>
        </div>
        <div class="redeemBtn" @click="redeem('hotel')">{{showOldOffer?'Click to Redeem':'Book Now'}}</div>
      </div>
    </div>
    <div class="footNote" v-if="modalObj.isLogin" v-show="!modalObj.isIndexPage">
      Prizes have been sent to your account. <br>
      Go to <span @click="gotoPrivateCoupon" class="colorPri">My coupons</span> to claim.
    </div>
    <div class="footNote" v-else v-show="!modalObj.isIndexPage">
      The prize has been sent to account: {{modalObj.email}}. <span class="colorPri" @click="login">Log in</span> using the initial password in your inbox and go to My coupons to claim.  
    </div>
    <div class="footNote" v-if="modalObj.isIndexPage">
      You can check its usage terms and conditions <br>
      on <span style="color:#0b9d78;text-decoration:underline;" @click="jumpOffer">{{showOldOffer?"Pre-Spring Sale":"Holi Festival 2019"}}</span> page.
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import _ from 'lodash';
import { Toast } from 'mint-ui';
import { emitCustomEvent } from 'models/utils/adGAEvent';
import { AppBridge } from 'models/appbridge/appbridge.js';
import { CookieUtil } from '../../models/utils';

export default {
  name:'couponModal',
  props: {
    modalObj:Object, 
    type: {
      type: String,
      default: ''
    }
  },
  created () {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    let timer = (isiOS?new Date("2019/03/01 00:00:00").getTime():new Date("2019-03-01 00:00:00").getTime()) - new Date().getTime();
    if(timer > 0){
      this.showOldOffer = true;
    }else{
      this.showOldOffer = false;
      this.modalObj.hotelObj.coupon = "HEGHHFN";
    }
  },
  data(){
    return {
      showOldOffer:false,
      throttle_copyCode: _.throttle(this.copyCode, 1200),
      months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    }
  },
  methods:{
    emitClose(){
      let name;
      if(this.type == "fromPayment"){
        name = "Payment_close";
        try {
          window.heg.trackEvent("Ac_event_15");
        } catch (error) {
          if(window.WebViewJavascriptBridge){
            this.$bridge.callhandler("trackEvent","Ac_event_15");
          }
        }
      }else{

        name = "HomepagePopup_Close";
      }
      emitCustomEvent(name, "holi_festival_home");
      this.$emit('parentListen');
    },
    jumpOffer(){
      if(this.showOldOffer){
        window.location.href = "https://m.happyeasygo.com/offers/pre-spring-sale";
      }else{
        window.location.href = "https://m.happyeasygo.com/offers/holi-festival-sale";
      }
    },
    copyCode(who){
      if(this.startOrEnd == 'start' || this.startOrEnd == '') return;
      let clipboard = new Clipboard('.btnCopy',{
        text: function() {
          return who;
        }
      });
      clipboard.on('success', function(e) {
        Toast({
          message:"The coupon code has been copied to your clipboard",
          duration:1200
        });
        e.clearSelection();
        clipboard.destroy();
      });
      clipboard.on('error', function(e) {
        Toast({
          message:"Copy failed, please input manually! ",
          duration:1200
        });
        e.clearSelection();
        clipboard.destroy();
      });
    },
    redeem(platform){
      if(this.type == "fromPayment"){
        try {
          window.heg.trackEvent("Ac_event_16");
        } catch (error) {
          if(window.WebViewJavascriptBridge){
            this.$bridge.callhandler("trackEvent","Ac_event_16");
          }
        }
      }
      // 首页弹窗
      if(this.modalObj.isIndexPage){
        if(platform === 'flight'){
          if(!this.showOldOffer){
            emitCustomEvent('HomepagePopup_F_BookNow', "holi_festival_home");
          }
          this.emitClose();
        }else{
          if(!this.showOldOffer){
            emitCustomEvent('HomepagePopup_H_BookNow', "holi_festival_home");
          }
          window.location.href = 'https://m-hotel.happyeasygo.com';
        }
        return;
      }
      // 没有登录操作
      if(this.modalObj.isLogin){
          if(this.modalObj.isApp){
            AppBridge.goHomePage(this);
          }else{
            window.location.href = 'https://m-hotel.happyeasygo.com';
          }
      }else{
        AppBridge.nativeSignIn('in', this);
      }
    },
    login(){
      AppBridge.nativeSignIn('in', this);
    },
    gotoPrivateCoupon(){
      AppBridge.nativeMyCoupons(this);
    },
    getDate (data,type){
      let getDate = '';
      let y = data.getFullYear();
      let m = this.months[data.getMonth()];
      let arr, str;
      // if(this.startTime && this.endTime){
        arr = String(data.getDate()).split('');
        str = arr[arr.length-1];
        if(str.indexOf('1') > -1) {
          getDate = data.getDate() +'st';
        } else if(str.indexOf('2') > -1) {
          getDate = data.getDate() +'nd';
        } else if(str.indexOf('3') > -1) {
          getDate = data.getDate() + 'rd';
        } else {
          getDate = data.getDate() +'th';
        }
        if(type == 2){
          return getDate+' '+m;
        }else if(type ==  1){
          return getDate+' '+m+','+y;
        }else{
          return m+' '+getDate+','+y;
        }
      // }  
    }
  }
}
</script>
<style lang="less" scoped>
.ani-cover{
  width: 15rem;
  height:12rem;
  box-sizing: border-box;
  padding:0 0.47rem; 
  position: absolute;
  top:0;
  bottom: 0;
  right: 0;
  left:0;
  z-index:20;
  margin:auto;
  .title{
    font-size: .6rem;
    line-height: .77rem;
    span{font-weight: bold;font-size: 18px;}
  }
  .closeModal{
    justify-content: flex-end;
    padding: .3rem 0 0;
    img{
      width:.43rem;
      height:.43rem;
    }
  }
  .validity{
    justify-content: center;
    color: #999;
    font-size: .47rem;
    line-height: .68rem;
    padding:2px;
  }
  .validity2{ padding:2px 0 0.4rem; }
  .couponBan{
    border-radius: 2px;
    overflow: hidden;
    & +.couponBan{
      margin-left: 10px;
    }
    img{display: block;}
    .btnCopy{
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      height: 1.2rem;
      bottom:0;
      right:0;
      padding:0 0.5rem 0 0.8rem;
      border-radius: 28px 0 0 0;
      background-color: #fff;
      .coupon-value{
        position: relative;
        font-size: .43rem;
        padding: 3px 4px 1px;
        border: 1px dashed  #f23849;
        img{
          position: absolute;
          width:0.45rem;
          right:-7px;
          top:-5px;;
        }
      }
    }
    .right_top{
      line-height: 0.9rem;
      position: absolute;right: 0;top: 0;
      background: #fff;font-size:12px;
      padding:0 5px;
      img{display:inline-block;width:12px;vertical-align: middle;margin-right: 5px;}
    }
  }
  .redeemBtn{
    height: 1.28rem;
    font-size: .6rem;
    line-height: 1.28rem;
    color:#fff;
    background: linear-gradient(to right, #7D0AD2, #F17564);
  }
  .footNote{
    font-size: .47rem;
    color:#999;
    line-height: .68rem;
  }
}
.ani-cover{
  background:url(./images/bg-left2.png), url(./images/bg-right2.png);
  background-repeat:no-repeat;
  background-size:19%, 25% 50%;
  background-color: #f1f5f7;
  background-position:left top 5px,right bottom 30px;
}
.ani-coverOld{
  background:url(./images/bg-left1.png) left top/15% no-repeat, url(./images/bg-right1.png) right bottom/15% no-repeat #f1f5f7;
  .closeModal{
    position: absolute;right: 0.47rem;
  }
  .title{margin-top: 0.73rem;}
  .redeemBtn{background:#f23849;}
}
</style>