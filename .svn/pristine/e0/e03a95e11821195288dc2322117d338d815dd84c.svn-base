<template>
  <div id="heg-diwali">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title" style="margin-left:-1.5rem;">New  Year Sale</p>
    </head-top>
    <div class="content">
      <div class="appTop" v-show="isShowBtn"></div>
      <div id='navTitle' style="display:none;">New  Year Sale</div>
      <div class="top-banner">
        <img :src="mUrl">
        <div class="top-cover">
          <p v-if="startOrEnd == 'start'">
            <span>Campaign Starts In : </span>{{saleTime}}</p>
          <p v-else-if="startOrEnd == 'in'">Campaign is live !</p>
          <p v-else-if="startOrEnd == 'end'">
            <span>Campaign Ends In : </span>{{saleTime}}</p>
          <p v-else>Campaign is closed.</p>
          <p >{{getDate(new Date(startTime), 1)+" 00:00:00"}} -- {{getDate(new Date(endTime), 1)+" 23:59:59"}}</p>
        </div>
      </div>
      <div class="pre-bg">
        <div class="p-title p-title-hotel">
          <img :src='require("../../assets/images/activity/newyearsale/bells.png")' alt="">
          <span>Hotel</span>
          <img :src='require("assets/images/activity/newyearsale/bells.png")' alt="">
        </div>
        <ul class="part part-hotel">
          <li class="item">
            <div class="flex space-between topTip">
              <div class="cornerTip" >
                Discount on all platforms
              </div>
              <div style="padding: 2px 2px;" v-if="startTime != null">
                Validity: {{getDate(new Date(startTime), 1)}} - {{getDate(new Date(endTime), 1)}}
              </div>
            </div>
            <div class="flex space-between align-items-center">
              <div>
                <span class="big-off-font">300</span>
                <span class="off-tail">RS. <br> off</span>
              </div>
              <div class="h-li-bottom">
                <button class="btnCopy" @click="throttle_copyCode('HTL300')" :style="codeBg">HTL300</button>
              </div>
            </div>
            <div class="flex content-end">
              <span class="btn-link" :class="{'link-disable': this.startOrEnd == 'start' || this.startOrEnd == ''}"  @click="goToUseHotel">Go to Use</span>
            </div>
          </li>
        </ul>
        
        <div class="p-title">
          <img :src='require("../../assets/images/activity/newyearsale/bells.png")' alt="">
          <span>Flight</span>
          <img :src='require("../../assets/images/activity/newyearsale/bells.png")' alt="">
        </div>
        <div class="top-title">ON DOMESTIC &amp; INTERNATIONAL FLIGHTS</div>

        <ul class="part part-hotel">
          <li class="item">
            <div class="flex space-between topTip">
              <div class="cornerTip" >
                Discount on all platforms
              </div>
              <div style="padding: 2px 2px;" v-if="startTime != null">
                Validity: {{getDate(new Date(startTime), 1)}} - {{getDate(new Date(endTime), 1)}}
              </div>
            </div>
            <div class="flex space-between align-items-center">
              <div>
                <span class="big-off-font">400</span>
                <span class="off-tail">RS. <br> off</span>
              </div>
              <div class="h-li-bottom">
                <button class="btnCopy" @click="throttle_copyCode('HEGFLY1')" :style="codeBg">HEGFLY1</button>
              </div>
            </div>
            <div class="flex space-between align-items-center">
              <span class="fontSz14">on order of over Rs.5000</span>
              <span class="btn-link" :class="{'link-disable': this.startOrEnd == 'start' || this.startOrEnd == ''}"  @click="goToUseFlight(1)">Go to Use</span>
            </div>
          </li>
          <li class="item">
            <div class="flex space-between topTip">
              <div class="cornerTip" >
                Discount on all platforms
              </div>
              <div style="padding: 2px 2px;" v-if="startTime != null">
                Validity: {{getDate(new Date(startTime), 1)}} - {{getDate(new Date(endTime), 1)}}
              </div>
            </div>
            <div class="flex space-between align-items-center">
              <div>
                <span class="big-off-font">250</span>
                <span class="off-tail">RS. <br> off</span>
              </div>
              <div class="h-li-bottom">
                <button class="btnCopy" @click="throttle_copyCode('HEGFLY1')" :style="codeBg">HEGFLY2</button>
              </div>
            </div>
            <div class="flex space-between align-items-center">
              <span class="fontSz14">on order of below Rs.5000</span>
              <span class="btn-link" :class="{'link-disable': this.startOrEnd == 'start' || this.startOrEnd == ''}"  @click="goToUseFlight(2)">Go to Use</span>
            </div>
          </li>
        </ul>
        <div class="fontSz12 userEnter" style="margin-bottom:20px;" v-if="!isLogin">
          <span @click="SignIn"> Log in</span>  to redeem coupons. Have no account ? <span @click="SignUp">Sign up</span> now
        </div>

        <div class="fontSz12 part-app">
          <div class="textWithline">
            <img :src="require('assets/images/activity/newyearsale/onlyonApp.png')" width="134" alt="">
          </div>
          <div style="width:300px; margin: 0 auto;" v-if="isShowBtn">
            <div style="margin-bottom: 8px;">New Year Gift 1 & New Year Gift 2 </div>
            <div class="flex space-around" style="margin-bottom:10px;">
              <a href="https://app.adjust.com/xmfxff?campaign=NewYear1225&adgroup=MAppDownload&creative=20181226" target="_blank" @click="emitCustomEvent('DownloadButton', 'newyear')"><img :src="icons.app" alt="" width="93"></a>
              <a href="https://app.adjust.com/xmfxff?campaign=NewYear1225&adgroup=MAppDownload&creative=20181226" target="_blank" @click="emitCustomEvent('DownloadButton', 'newyear')"><img :src="icons.google" alt="" width="93"></a>
            </div>
            <div style="margin-bottom:15px;">
              Download our mobile App
            </div>
          </div>
          <div class="transBg">
            <img class="corner-img" :src="require('assets/images/activity/newyearsale/gift.png')" alt="gift">
            <div class="flex">
              <span class="cornerTip2">New Year Gift 1</span> 
            </div>
            <div style="margin-bottom:20px;">
              
              <img style="height:223px;" :src="require('assets/images/activity/newyearsale/app-dis.png')" alt="">
            </div>
            <div class="part-book">
              <button @click="jumpHome" >Go to Book</button>
            </div>
          </div> 
        </div>
        
        <div class="part-shake" v-if="s1Banners.length >= 1">
          <div class="transBg">
            <div class="flex">
              <span class="cornerTip2">New Year Gift 2</span> 
            </div>
            <div class="shake-p1">
              <img :src='require("assets/images/activity/newyearsale/shake-win.png")' alt="">
              <p>SHAKE <span>your phone to win</span> AMAZING PRIZES!</p>
            </div>
            <div style="width:100%;background:transparent;">
              <mt-swipe class="s1-banner" :show-indicators="false" :auto="3000">
                <mt-swipe-item v-for="(item,index) in s1Banners" :key="index">
                  <div class="banner-box">
                    <img :src="item" alt="" @click="jumpDetails">
                  </div>
                </mt-swipe-item>
              </mt-swipe>
            </div>
            <div class="part-book1">
              <button v-if="isShowBtn" @click="goForDetail">Go for Details</button>
              <button v-else @click="goForDetail">Go to Shake</button>
            </div>
          </div>
          <div class="terms" @click="showDescript">
            New Year Sale's Terms & Conditions
          </div>
        </div>
      </div>
      <div class="bgBottom">
        <div class="part-share">
          <p class="share-title">Invite your friends to play now</p>
          <ul class="flex space-around align-items-center">
            <li v-for="(item,index) in sharesApp" :key="index">
              <a v-if="index == 0" :href="(isIos && index == 0)?item.href2:item.href" target="_blank" @click="shareToApp(index)">
                <img :src="item.icon" alt="">
                <p>{{item.name}}</p>
              </a>
              <a v-else :href="item.href" :data-action="index == 1?item.action:''" target="_blank" @click="shareToApp(index)">
                <img :src="item.icon" alt="">
                <p>{{item.name}}</p>
              </a>
            </li>
          </ul>
        </div>
        <div style="height:0.427rem;background:transparent;"></div>
        <div class="s3-share">
          <p>Follow Us on</p>
          <ul class="share-icon flex">
            <li v-for="(item,index) in s3Shares" :key="index">
              <a :href="item.href" target="_blank">
                <img :src="item.url" alt="">
              </a>
            </li>
          </ul>
        </div>
        <div style="height:0.82rem;background:transparent;" v-if="!isShowBtn"></div>
        <div class="foot-bottom" v-if="isShowBtn">
          <p>
            <span @click="$router.push('/agreement')">T &amp; C</span>
            <span @click="$router.push('/privacy')">Privacy</span>
            <span @click="$router.push('/about')">About Us</span>
            <span @click="$router.push('/contact')">Contact Us</span>
          </p>
          <p style="margin-top:0.2rem;">2016-2018© Happyeasygo Group. All rights reserved.</p>
        </div>
      </div>
    </div>
    
    <div class="shareCover" v-if="upDataDialog" @click="clickOut"></div>
    <div class="upDataDiaplog" v-if="upDataDialog">
      <p class="up-p1"><span>The Autumn Season Sale</span> is <span>LIVE</span> on the new version of HEG App!!! </p>
      <p class="up-p2">Update Now and <span>shake</span> your phone to Win <span>EXCLUSIVE Prizes</span>!</p>
      <a :href="device.href" target="_blank" @click="upDateApp">update</a>
    </div>
    <div class="hotel_cover" v-if="showHotelDes" @click="clickOut"></div>

    <div class="hotel_des" v-if="showHotelDes">
      <img @click="closeHotelDes" :src='require("../../assets/images/anniversary/ani-cancel.png")' alt="">
      <h4>New Year Sale's Terms & Conditions</h4>
      <ul>
        <li>This offer starts from {{getDate(new Date(startTime))}} to {{getDate(new Date(endTime))}}. </li>
        <li>The coupon code: HTL300 can be used save Rs.300 on hotel bookings across India.</li>
        <li>The coupon code: HEGFLY1 can be used save Rs.400 on flight bookings of over Rs.5000 on the desktop, mobile site and mobile apps. </li>
        <li>The coupon code: HEGFLY2 can be used save Rs.250 on flight bookings of below Rs.5000 on the desktop, mobile site and mobile apps.</li>
        <li>
          All flight coupon discounts of New Year Sale can be applied to book flight tickets with Instant Discount price and Member Discount price. 
        </li>
        <li style="list-style-type:disc;">
          HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of these terms and conditions, or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior notice.
        </li>
        <li style="list-style-type:disc;">
          Any disputes arising out of this offer shall be subject to the exclusive jurisdiction of competent courts in Gurgaon, Haryana, India.
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import headTop from '../../components/head/head.vue';
import { Toast,Indicator, Swipe, SwipeItem } from 'mint-ui';
import { CookieUtil } from 'models/utils';
import { User } from "../../models/user";
import { DomainManager } from "../../config/DomainManager.js";
import { emitCustomEvent } from 'models/utils/adGAEvent';
import { AppBridge } from '../../models/appbridge/appbridge.js';
import _ from 'lodash';
export default {
  components:{
    headTop,
    "mt-swipe":Swipe,
    "mt-swipe-item":SwipeItem
  },
  data(){
    return {
      emitCustomEvent:emitCustomEvent,
      mUrl: "",
      mAlt: "",
      mTitle: "",
      model:0,
      startTime:'',
      endTime:'',
      hotelDsc1:false,
      hotelDsc2:false,
      hotelDsc3:false,
      smallScreen:false,
      timer:null,
      isApp:false,
      isIos:false,
      isShowBtn:false,
      saleTime:null,
      upDataDialog:false,
      showHotelDes:false,
      startOrEnd:'start',
      device:{href:'javascript:;'},
      isLogin:CookieUtil.hasItem('uuid'),
      s1Banners:[],
      throttle_copyCode: _.throttle(this.copyCode, 1200),
      months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      codeBg:{
        "background-color":"transparent",
        "background-image":'url('+require('../../assets/images/autumn/pre_icon_copy.png')+')',
        "background-size":"100% 100%",
        "background-repeat":"no-repeat",
        "background-position":"center top"
      },
      icons:{
        pc:require('../../assets/images/autumn/pre_pc.png'),
        copy:require('../../assets/images/autumn/diwali-copy-btn.png'),
        app:require('../../assets/images/autumn/icon_appstore.png'),
        google:require('../../assets/images/autumn/icon_google.png'),
        mobile:require('../../assets/images/autumn/pre_mobile.png'),
      },
      s3Shares:[
        {href:'https://www.facebook.com/happyeasygo/',url:require('../../assets/images/autumn/pre_f.png')},
        {href:'https://twitter.com/happyeasygo',url:require('../../assets/images/autumn/pre_twitter.png')},
        {href:'https://www.instagram.com/happyeasygo_india/',url:require('../../assets/images/autumn/pre_instagram.png')},
        {href:'https://www.youtube.com/channel/UCBlph2534GSN1PDJH9E5ylg',url:require('../../assets/images/autumn/pre_utb.png')},
        {href:'https://plus.google.com/+HappyEasyGoIndia',url:require('../../assets/images/autumn/pre_google.png')},
      ],
      sharesApp:[
        {id:0,name:"SMS",href:"javascript:;",href2:"javascript:;",icon:require('../../assets/images/autumn/pre_sms.png'),text:"Ring in the New Year with an amazing vacay. Get flat 300 off on hotels & save upto Rs.400 on flights with HappyEasyGo New Year Sale. App: http://bit.ly/2Cx7xRB"},
        {id:1,name:"WhatsApp",href:"javascript:;",action:'share/whatsapp/share',icon:require('../../assets/images/autumn/pre_whatsapp.png'),text:"New Year just got better. Get flat 300 off on hotels & upto Rs.400 off on flights with HappyEasyGo New Year Sale. Download the app now: http://bit.ly/2QLXf8G"},
        {id:2,name:"Messenger",href:"javascript:;",icon:require('../../assets/images/autumn/pre_messenger.png'),text:"Kick off the New Year with flat 300 off on hotels and also save upto Rs.400 on flights with HappyEasyGo New Year Sale. Download app now: http://bit.ly/2EPRsJ3"},
        {id:3,name:"More",href:'javascript:;',icon:require('../../assets/images/autumn/pre_more.png'),text:"HappyEasyGo New Year Sale: Grab flat 300 off on hotels & save upto Rs.400 on flights. Plan a trip today. Download: http://bit.ly/2GECOpw"},
      ]
    }
  },
  methods:{
    hotelClickEvent(){
      try {
        window.heg.trackEvent("AC_Chris_BookHotel");
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler("trackEvent","AC_Chris_BookHotel");
        }
      }
      
    },
    clickOut(){
      this.upDataDialog = false;
      this.showHotelDes = false;
    },
    upDateApp(){
      this.upDataDialog = false;
    },
    goToUseFlight(type){
      let eventName = type == 1 ? 'AC_Chris_500gold' : 'AC_Chris_30off'
      if(this.startOrEnd == 'start' || this.startOrEnd == '') return;
      try {
        window.heg.trackEvent(eventName);
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler('trackEvent', eventName);
        }
      }
      emitCustomEvent('GoToUse', 'newyear');
      AppBridge.goHomePage(this);
    },
    goToUseHotel(type){
      if(this.startOrEnd == 'start' || this.startOrEnd == '') return;
      try {
        window.heg.trackEvent('AC_Chris_BookHotel');
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler('trackEvent', 'AC_Chris_BookHotel');
        }
      }
      if(AppBridge.device == 1){
        AppBridge.goHomePage(this);
      }else{
        window.location.href="https://m-hotel.happyeasygo.com";
      }
    },
    jumpHome(){
      try {
        window.heg.trackEvent('AC_Autmn_BookNow');
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler('trackEvent', 'AC_Autmn_BookNow');
        }
      }
      AppBridge.goHomePage(this);
      emitCustomEvent('GoToBook', 'newyear');
    },
    SignIn(){
      if(!this.isLogin){
        AppBridge.nativeSignIn("in",this);
      }
    },
    SignUp(){
      if(!this.isLogin){
        AppBridge.nativeSignIn("up",this);
      }
    },
    shareToApp(who){
      emitCustomEvent('Invite_'+who, 'newyear');
      if(!this.isShowBtn){
        AppBridge.shareToApps(who,this);
      }else{
        Toast({
          message:"Please operate on app",
          duration:1500,
        });
      }
    },
    jumpDetails(){
      if(AppBridge.device != 0){
        try {
          if(window.heg.goShakePage){
            window.heg.goShakePage();
          }else{
            this.upDataDialog = true;
          }
        } catch (error) {
          if(this.$bridge.WebViewBridge.indexOf('goShakePage') > -1){
            AppBridge.goShakePage(this);
          }else{
            this.upDataDialog = true;
          }
        }
      }else{
        this.$router.push('/shake');
      }
    },
    goForDetail(){
      try {
        window.heg.trackEvent('AC_Autmn_Go_to_Shake');
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler('trackEvent', 'AC_Autmn_Go_to_Shake');
        }
      }
      emitCustomEvent('goForDetail', 'newyear')
      if(AppBridge.device != 0){
        try {
          if(window.heg.goShakePage){
            window.heg.goShakePage();
          }else{
            this.upDataDialog = true;
          }
        } catch (error) {
          if(this.$bridge.WebViewBridge.indexOf('goShakePage') > -1){
            AppBridge.goShakePage(this);
          }else{
            this.upDataDialog = true;
          }
        }
      }else{
        this.$router.push('/shake');
      }
    },
    closeHotelDes(){
      this.showHotelDes = false;
    },
    showDescript(){
      this.showHotelDes = true;
      try {
        window.heg.trackEvent("AC_Chris_30off");
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler("trackEvent","AC_Chris_30off");
        }
      }
    },
    copyCode(who){
      if(this.startOrEnd == 'start' || this.startOrEnd == '') return;
      let eventName;
      switch (who){
        case 'HEGHTL': eventName = 'Ac_App_1stanniversary_treebo';
        break;
        case 'HEGFLY1': eventName = 'AC_Autmn_CouponCopy';
        break;
        case 'HEGFLY1': eventName = 'AC_Chris_3000gold';
        break;
      }
      try {
        window.heg.trackEvent(eventName);
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler('trackEvent', eventName);
        }
      }
      emitCustomEvent('CouponCopy_'+ who, 'newyear');

      let clipboard = new Clipboard('.btnCopy',{
        text: function() {
          return who;
        }
      });
      clipboard.on('success', function(e) {
        Toast({
          message:"Successfully copied to the Clipboard! ",
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
    datetime_to_unix(who){
      if(!this.startTime && !this.endTime){
        return false
      }else{
        let date = new Date(Date.parse(who.replace(/-/g, '/')));
        date = date.getTime();
        return parseInt(date/1000);
      }
    },
    getGMTtime(){
      let d = new Date();
      let loaclTime = d.getTime();
      let localOffset = d.getTimezoneOffset() * 60000;
      let utc = loaclTime + localOffset;
      let offset = 5.5;
      let bombay = utc + (3600000*offset);
      return parseInt(bombay/1000);
    },
    GetRTime(){
      let cha_timestamp;
      let timestamp = this.getGMTtime();
      let timestamp_set0 = this.datetime_to_unix(this.startTime);
      let timestamp_set2 = this.datetime_to_unix(this.startTime);
      let timestamp_set3 = this.datetime_to_unix(this.endTime+" 23:59:59");
      let cha_timestamp0 = timestamp_set0-timestamp;
      let cha_timestamp2 = timestamp_set2-timestamp;
      let cha_timestamp3 = timestamp_set3-timestamp;
      if(cha_timestamp0 <= 0){
        this.startOrEnd = 'in';
        if( cha_timestamp2 <= 0){
          this.startOrEnd = 'end';
          cha_timestamp = cha_timestamp3;
          if(cha_timestamp3 <= 0){
            cha_timestamp = 0;
            this.startOrEnd = '';
            clearTimeout(this.timer);
          }
        }
      }else{
        this.startOrEnd = 'start';
        cha_timestamp = cha_timestamp0;
      }
      
      var sy_day = parseInt(cha_timestamp/(3600*24));
      var sy_day2 = sy_day > 9?sy_day:'0' + sy_day;
      var sy_hour = parseInt((cha_timestamp-sy_day*3600*24)/3600);
      var sy2_hour = sy_hour > 9 ? sy_hour : '0' + sy_hour;
      var sy_min = parseInt((cha_timestamp-sy_hour*3600-sy_day*24*3600)/60);
      var sy2_min = sy_min > 9 ? sy_min : '0' + sy_min;
      var sy_miao = cha_timestamp-sy_day*3600*24-sy_hour*3600-sy_min*60;
      var sy2_miao = sy_miao > 9 ? sy_miao : '0' + sy_miao;

      this.saleTime = sy_day2+'d:'+sy2_hour+'h:'+sy2_min+'m';
      this.timer = setTimeout(this.GetRTime, 1000);
    },
    checkType() {
      let type = AppBridge.device;
      if(type == 1){
        this.model = 2;
        this.device.href = "https://play.google.com/store/apps/details?id=com.india.happyeasygo";
      }else if(type == 2){
        this.model = 3;
        this.device.href = "https://itunes.apple.com/app/id1390426818?mt=8";
      }else{
        this.model = 0;
        this.sharesApp[0].href = 'sms:?body='+encodeURIComponent(encodeURIComponent('Ring in the New Year with an amazing vacay. Get flat 300 off on hotels & save upto Rs.400 on flights with HappyEasyGo New Year Sale. App: http://bit.ly/2GOyjZw'));
        this.sharesApp[0].href2 = 'sms:&body='+encodeURIComponent('Ring in the New Year with an amazing vacay. Get flat 300 off on hotels & save upto Rs.400 on flights with HappyEasyGo New Year Sale. App: http://bit.ly/2GOyjZw');
        this.sharesApp[1].href = 'whatsapp://send?text='+encodeURIComponent('New Year just got better. Get flat 300 off on hotels & upto Rs.400 off on flights with HappyEasyGo New Year Sale. Download the app now: http://bit.ly/2rOFS8u');
        this.sharesApp[2].href = 'fb-messenger://share/?link='+encodeURIComponent('https://m.happyeasygo.com/new-year-sale-2019?utm_source=Xmas&utm_medium=Messenger&utm_campaign=2019');
      }
      this.getImg();
    },
    getImg() {
      let parmTop = "type=13&device=" + this.model + "&addr=new-year-sale-2019&businessType=1";
      User.advList(this, parmTop).then(res => {
        if (res.success) {
          this.mUrl =
            res.list[0].landingPageUrl == null
              ? ""
              : res.list[0].landingPageUrl;
          this.mAlt =
            res.list[0].landingPageAlt == null
              ? ""
              : res.list[0].landingPageAlt;
          this.mTitle =
            res.list[0].landingPageTitle == null
              ? ""
              : res.list[0].landingPageTitle;
          this.startTime = res.list[0].startDate;
          this.endTime = res.list[0].endDate;
        }
      })
      .catch(err => {
        console.log(err.msg);
      });
    },
    getBannerImages(){
      let url = DomainManager.getPageImgList();
      this.$axios.get(url, {headers:{"x-Device":"msite"}}).then(res =>{
        if(res.succ){
          this.s1Banners = res.data;
        }else{

        }
      }).catch(err=>{
        console.log(err);
      })
    },
    getDate (data,type){
      let getDate = '';
      let y = data.getFullYear();
      let m = this.months[data.getMonth()];
      if(data.getDate() == 1) {
        getDate = '1st';
      } else if(data.getDate() == 2) {
        getDate = '2nd';
      } else if(data.getDate() == 3) {
        getDate = '3rd';
      } else {
        getDate = data.getDate() +'th';
      }
      
      if(type){
        return m+' '+getDate;
      }else{
        return m+' '+getDate+','+y;
      }
    }
  },
  async created() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    if(isiOS){
      this.isIos = true;
    }else{
      this.isIos = false;
    }
    if(width <= 320){
      this.smallScreen = true;
    }

    this.isShowBtn = await AppBridge.getNativeSource(this);
    this.contentMargin = this.isShowBtn;
    let id = await AppBridge.getNativeUuid(this);
    window.onReceviedUuid = this.onReceviedUuid;
    if(id){
      CookieUtil.removeItem("uuid");
      CookieUtil.setItem("uuid",id);
      this.isLogin = true;
    }else{
      if(CookieUtil.hasItem("uuid")){
        this.isLogin = true;
      }else{
        CookieUtil.removeItem("uuid");
        this.isLogin = false;
      }
    }

    this.checkType();
    this.GetRTime();
    this.getBannerImages();
  },
}
</script>
<style lang="less">
#heg-diwali{
  .s1-banner{
    height:16rem;
    .mint-swipe-items-wrap{
      width:100%;
      div{
        .banner-box{
          width: 12rem;
          left: 0;
          right: 0;
          margin:auto;
          border-radius:4px;
        }
        img{
          width:12rem;
          vertical-align: top;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
@newyearcolor: #AF2A30;
#heg-diwali{
  height:auto;
  position: relative;
  img{vertical-align: top}
  a,button{cursor: pointer;}
  .appTop{
    padding-top:2.04rem;
  }
  .content{
    .top-banner{
      min-height:3rem;
      position: relative;
      background:#fff;
      img{
        width: 100%;
      }
      .top-cover{
        width: 100%;
        position: absolute;
        bottom: 40px;
        padding:0.726rem 0 0.641rem;
        p:first-child{
          margin-bottom:0.32rem;
          color:#fff;
          font-size:0.9rem;
          font-weight: bold;
          span{
            font-size:0.598rem;
            color:#fff;
            font-weight: normal;
          }
        }
        p:last-child{
          font-size:0.427rem;
          color:#fff;
        }
      }
    }
  }
  .bgBottom{
    height: 300px;
    background: #721418;
  }
  .pre-bg{
    padding:0 0.64rem ; 
    background:#fff;
  }
  .app-p{font-weight:700;}
  .top-title{
    margin-bottom:  0.3rem;
    font-size: 0.512rem;
    color: #666;
    letter-spacing: 0;
  }
  .textWithline{
    font-size: 27px;
    margin-bottom: 4px;
    &::before, &::after{
      content:"";
      width:3.2rem;
      display:inline-block;
      margin: 0 15px;
      border-top:1px solid #cdcdcd;
      vertical-align:middle;
    }
  }
  .p-title{
    margin-bottom:0.534rem;
    img{
      width:0.512rem;
      height:0.512rem;
      vertical-align:middle;
      margin: 0 0.21rem;
    }
    span{
      color: #C69C6C;
      font-size:0.769rem;
      font-weight: bold;
    }
    &::before, &::after{
      content:"";
      width:3.8rem;
      display:inline-block;
      border-top:1px solid #C69C6C;
      vertical-align:middle;
    }
  }
  .cornerTip2{
    color:#AF2A30;
    font-size:12px;
    background: #F3ECBE;
    padding:2px 4px;
  }
  .big-off-font{
    font-size:60px;
    // font-family:"HelveticaLTPro-Bold";
    font-weight: bolder;
    color:@newyearcolor;
  }
  .userEnter{
    span{
      font-weight:bold;
    }
  }
  .part{
    li{
      background: #fff;
      padding:0.598rem 0.427rem;
      margin-bottom: 0.641rem;
      border-radius:2px;
      text-align:left;
    }
    .item{
      background: #FAFAFA;
      border: 1px solid #CDCDCD;
      border-radius: 8px;
      .off-tail{
        // font-family: "HelveticaLTPro-Bold";
        font-weight: 700;
        font-size: 14px;
        color: @newyearcolor;
      }
      .topTip{
        margin-bottom: 24px; 
        margin-left: -0.427rem; 
        font-size:11px;
      }
      .cornerTip{
        padding: 2px 4px 2px 44px;
        font-size:11px;
        border-radius: 0 10px 10px 0;
        background: url('../../assets/images/activity/newyearsale/icon-device.png') 10px center/30px no-repeat #E1C47B;
        color: #fff;
      }
      .btn-link{
        border-radius:2px;
        width:80px;
        height:20px;
        line-height:20px;
        font-size: 12px;
        background-color:#C69C6C;
        color: #fff;
        text-align: center;
        &.link-disable{
          background-color:#ccc;
        }
      }
    }
  }
  .part-hotel{
    li{
      p{
        width:9.6rem;
        font-size: 0.598rem;
        color: #111111;
        line-height:0.826rem;
      }
      .h-li-bottom{
          button{
            padding:0.4rem 0.65rem 0.15rem 0.3rem;
            font-size: 0.556rem;
            color: #D5130F;
            font-weight: bold;
            cursor: pointer;
          }
      }
    }
  }
  .part-app{
    margin-left: -0.64rem;
    margin-right: -0.64rem;
    background-color:@newyearcolor;
    color: #fff;
    padding-bottom:15px;
    padding-top:30px;
    .transBg{
      position: relative;
      padding: 15px 0;
      background-color: rgba(200, 200, 200, .1);
      margin-left: 0.64rem;
      margin-right: 0.64rem;
      .corner-img{
        height:130px;
        position:absolute;
        right:-0.64rem;
        top:-36px;
      }
    }
  }
  .part-left{
    text-align:left;
    ul{margin:0.47rem 0 0.2rem;}
    li{
      list-style-type: disc;
      margin-left: 0.64rem;
      font-size: 0.47rem;
      color: #666666;
      line-height:0.75rem;
      span{
        font-size: 0.47rem;
        color: #666666;
      }
    }
    .left-p1{
      color: #000000;
      font-size: 0.669rem;
      font-weight: bold;
      span{
        font-size: 0.769rem;
        color:#D5130F;
      }
    }
  }
  .part-right{
    width:6.8rem;
    text-align:center;
    font-size: 0.47rem;
    color: #999999;
    img{
      width:1.235rem;
      height:2.564rem;
    }
  }
  .isShowBtn{
    text-align:right;
  }
  .middle-box{
    height:0.809rem;
    text-align:right;
    img{
      width:2.78rem;
      height:0.809rem;
    }
  }
  .bottom-code{
    p{
      font-size: 0.47rem;
      color: #666666;
      height:1.1rem;
      line-height:1.3rem;
    }
    .code-copy{
      font-size:0.47rem;
      color: #111111;
      button{
        font-size: 0.556rem;
        font-weight:bold;
        padding:0.4rem 0.65rem 0.15rem 0.3rem;
        color:#D5130F;
        cursor: pointer;
      }
    }
  }
  .part-book{
    button,a{
      width:8.98rem;
      line-height:1.495rem;
      font-size:0.641rem;
      color:@newyearcolor;
      background-color:#fff;
      border-radius:2px;
    }
  }
  .part-shake{
    margin-right:-0.64rem;
    margin-left: -0.64rem;
    background:@newyearcolor;
    border-radius: 2px;
    padding:0 0.64rem;

    .transBg{
      background-color: rgba(200, 200, 200, .1);
      padding: 0.64rem 0;
    }
    .shake-p1{
      padding:0.641rem 0;
      // background: #F4F5F9;
      border-radius: 2px;
      margin-bottom:0.2rem;
      img{
        height:1.155rem;
      }
      p{
        margin-top:0.4rem;
        font-size: 0.598rem;
        color: #fff;
      }
    }
    .part-book1{
      margin:1rem 0 0;
      button{
        width:8.98rem;
        line-height:1.495rem;
        font-size:0.641rem;
        color:@newyearcolor;
        background:#fff;
        border-radius:2px;
        box-shadow: 0 3px 6px 0 rgba(0,0,0,0.50);
      }
    }
    .terms{
      font-size:12px;
      color:#fff;
      text-decoration: underline;
      padding: 10px 0 30px;
    }
  }
  .part-share{
    padding:0.47rem 0;
    .share-title{
      font-size:0.598rem;
      color:#fff;
    }
    .share-title::before,.share-title::after{
      content:"";
      width:1.9rem;
      display:inline-block;
      border-top:1px solid #CDCDCD;
      vertical-align:middle;
    }
    .share-title::before{margin-right:0.427rem;}
    .share-title::after{margin-left:0.427rem;}
    ul{
      li{
        flex:1;
        a{color:#111;width:100%;}
        font-size:0.598rem;
        img{
          width:1.282rem;
          height:1.282rem;
          border-radius:3px;
          margin:0.641rem 0 0.5rem;
        }
        p{
          color: #fff;
          font-size:12px;
        }
      }
    }
  }
  .s3-share{
    background:transparent;
    padding:1.068rem 0 0.641rem;
    p{font-size:0.598rem;padding-bottom:0.641rem;color:#fff;}
    .share-icon{
      justify-content:space-around;
      li{
        width: 1.709rem;
        height: 1.709rem;
        img{
          width: 100%;
          height:100%;
          border-radius:50%;
          cursor: pointer;
        }
      }
    }
  }
  .foot-bottom {
    vertical-align: middle;
    background:transparent;
    padding: 0.3rem 0 0.5rem;
    p {
      font-size: 0.470rem;
      color: #fff;
      padding: 0.2rem 0 0;
      span{
        border-right: 1px solid #fff;
        display: inline-block;
        padding: 0 0.2rem;
        cursor: pointer;
      }
      span:last-child{
        border-right: none;
      }
    }
  }
  .hotel_cover{
    width:100%;
    height:100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    background: rgba(0,0,0,0.5);
  }
  .hotel_des{
    position: fixed;
    width:12rem;
    background: #fff;
    border-radius: 2px;
    top: 50%;
    left: 50%;
    z-index:10;
    transform:translateY(-50%) translateX(-50%);
		-webkit-transform:translateY(-50%) translateX(-50%);
    padding:0.2rem 0.64rem 0.5rem;
    img{
      width:1rem;
      height:1rem;
      float: right;
      background:#999;
      border-radius:50%;
    }
    h4{
      font-size: 14px;
      color: #000;
      margin:1rem 0 0.5rem;
      text-align:left;
    }
    ul{
      li{
        list-style-type:decimal;
        margin-left:0.64rem;
        text-align:left;
        font-size: 12px;
        color: #666;
        line-height:0.794rem;
        margin-bottom: 8px;
      }
    }
  }
  .shareCover{
    width:100%;
    height:100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
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
    z-index: 10;
    padding:2rem 1rem 1rem;
    p{
      color:#333;
      font-size:0.68rem;
      line-height:1rem;
      span{
        font-weight:bold;
      }
    }
    .up-p1{font-style:italic;}
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
      margin-top:0.5rem;
    }
  }
}
</style>
