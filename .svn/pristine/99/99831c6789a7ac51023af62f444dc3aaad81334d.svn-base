<template>
  <div id="heg-diwali">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title" style="margin-left:-1.5rem;">Pre Christmas Sale</p>
    </head-top>
    <div class="content">
      <div class="appTop" v-show="isShowBtn"></div>
      <div class="top-banner">
        <img :src="mUrl">
        <div class="top-cover">
          <p v-if="startOrEnd == 'start'"><span>Campaign Starts In :</span>{{saleTime}}</p>
          <p v-else-if="startOrEnd == 'in'">Campaign is live !</p>
          <p v-else-if="startOrEnd == 'end'"><span>Campaign Ends In :</span>{{saleTime}}</p>
          <p v-else>Campaign is closed.</p>
          <p>Nov 13th,00:00:00 -- Dec 25th,23:59:59</p>
        </div>
      </div>
      <div class="pre-bg" :style="preBg">
        <div class="p-title p-title-hotel">
          <img :src='require("../../assets/images/autumn/pre_Bells.png")' alt="">
          <span>Hotel</span>
          <img :src='require("../../assets/images/autumn/pre_Bells.png")' alt="">
        </div>
        <ul class="part-hotel">
          <li :style="copyBgFlower">
            <p class="flex h-li-p1"><span style="margin:0px 3px 0 0;">Up to</span><strong>30% off</strong></p>
            <!-- <p>on hotel booking for order amount more than <span class="rs">Rs</span><span>2500</span></p> -->
            <p>on hotel booking</p>
            <div class="h-li-bottom flex space-between align-items-center">
              <div class="li-left">
                Use Code: <button id="copyUrl3" @click="copyCode('hotel')" :style="codeBg">HEGHTL30</button>
              </div>
              <img @click="showDescript(1)" :src='require("../../assets/images/autumn/pre_icon_right.png")' alt="">
            </div>
          </li>
          <li :style="copyBgFlower">
            <p class="flex h-li-p1" style="margin-top:0.726rem;"><strong>3000</strong><span style="margin:0 0 0 3px;">Happy Gold</span></p>
            <p>reward daily on every <span>100th</span> order</p>
            <div class="h-li-bottom flex space-between align-items-center">
              <div class="li-left"></div>
              <img @click="showDescript(2)" :src='require("../../assets/images/autumn/pre_icon_right.png")' alt="">
            </div>
          </li>
          <li :style="copyBgFlower" style="margin-bottom:0.854rem;">
            <p class="flex h-li-p1"><strong>200</strong><span style="margin:0 0 0 3px;">Happy Gold</span></p>
            <p>reward on every booking with Order ID ending with <span>12 or 25</span></p>
            <div class="h-li-bottom flex space-between align-items-center">
              <div class="li-left"></div>
              <img @click="showDescript(3)" :src='require("../../assets/images/autumn/pre_icon_right.png")' alt="">
            </div>
          </li>
        </ul>
        <div class="part-book">
          <a href="https://m-hotel.happyeasygo.com/m_site/home" target="_self" @click="hotelClickEvent">Book Now</a>
        </div>
        <div class="p-title p-title-flight">
          <img :src='require("../../assets/images/autumn/pre_Bells.png")' alt="">
          <span>Flight</span>
          <img :src='require("../../assets/images/autumn/pre_Bells.png")' alt="">
        </div>
        <div class="part-mobile">
          <div class="top-box flex space-between align-items-center">
            <div class="part-left">
              <!-- <p class="left-p1">SAVE <span>Rs.650-1150</span></p>
              <ul class="left-top">
                <li v-for="item in orderAmount" :key="item.id">
                  Rs.{{item.amount1}} off,order 
                  <i v-if="item.id == 0">&lt;</i>
                  <i v-else-if="item.id != 3">:</i> 
                  <i v-else>&gt;</i> 
                  <span>{{item.range1 | formatDate}}</span>
                </li>
              </ul> -->
              <!-- <p class="left-p1" style="color: #111111;font-size:0.598rem;line-height:0.9rem;">Extra <span style="color:#D5130F;">10%</span>+<span>Rs.50</span> off</p> -->
              <p class="left-p1" style="color: #111111;font-size:0.598rem;line-height:0.9rem;">Extra <span >Rs.300</span> off </p>
              <p class="left-p1" style="font-weight:normal;">on each order</p>
              <!-- <p style="font-size: 0.598rem;color: #666;line-height:0.726rem;">save up to Rs.3050</p> -->
            </div>
            <div class="part-right" :class="{isShowBtn:isShowBtn}">
              <img class="icon-mobile" :src="icons.mobile" alt="">
              <p style="margin:0.427rem 0 0.2rem">Discount on App</p>
            </div>
          </div>
          <!-- <p style="margin:.427rem 0 0;text-align:left;font-size: 0.498rem;color: #666;line-height:0.726rem;">Note: Extra 10% off on base fare after HEG inbuilt discount. 10% off = (Base Fare - HEG inbuilt discount) x 10%</p> -->
          <div class="middle-box" v-if="isShowBtn">
            <a href="https://app.adjust.com/xmfxff?campaign=Dussehra0930&adgroup=PC&creative=Download" target="_blank" @click="emitCustomEvent('DownloadButton', 'prechristmas')"><img :src="icons.google" alt=""></a>
            <a href="https://app.adjust.com/xmfxff?campaign=Dussehra0930&adgroup=PC&creative=Download" target="_blank" @click="emitCustomEvent('DownloadButton', 'prechristmas')"><img :src="icons.app" alt=""></a>
          </div>
          <div class="bottom-code flex space-between align-items-center ">
            <div class="code-copy" >
              Use Code:
              <button id="copyUrl1" :style="codeBg" @click="copyCode('mobile')" >HEGAPP</button>
            </div>
            <p v-if="isShowBtn">Download our mobile App</p>
          </div>
        </div>
        <div class="part-pc">
          <div class="top-box flex space-between align-items-center">
            <div class="part-left">
              <!-- <p class="left-p1">SAVE <span>Rs.600-950</span></p>
              <ul class="left-top">
                <li v-for="item in orderAmount" :key="item.id">
                  Rs.{{item.amount2}} off,order 
                  <i v-if="item.id == 0">&lt;</i>
                  <i v-else-if="item.id != 3">:</i> 
                  <i v-else>&gt;</i> 
                  <span>{{item.range1 | formatDate}}</span>
                </li>
              </ul> -->
              <!-- <p class="left-p1" style="color: #111111;font-size:0.598rem;line-height:0.9rem;">Extra <span style="color:#D5130F;">10%</span> off</p> -->
              <p class="left-p1" style="color: #111111;font-size:0.598rem;line-height:0.9rem;">Extra <span >Rs.250</span> off</p>
              <p class="left-p1" style="font-weight:normal;">on each order</p>
              <!-- <p style="font-size: 0.598rem;color: #666;line-height:0.726rem;">save up to Rs.3000</p> -->
            </div>
            <div class="part-right" :class="{isShowBtn:isShowBtn}">
              <img class="icon-mobile" :src="icons.pc" alt="">
              <p v-if="!isLogin" style="margin:0.427rem 0 0.2rem">Have no account?</p>
              <span v-if="!isLogin" @click="SignUp">Sign Up</span>
            </div>
          </div>
          <p class="middle-p flex space-between" style="margin:0.427rem 0 0.2rem;"><span></span><span style="letter-spacing:-0.5px;width:6.8rem;text-align:center;">Discount on PC & Mobile Site</span></p>
          <!-- <p style="text-align:left;font-size: 0.498rem;color: #666;line-height:0.726rem;">Note: Extra 10% off on base fare after HEG inbuilt discount. 10% off = (Base Fare - HEG inbuilt discount) x 10%</p> -->
          <div class="bottom-code flex space-between">
            <div class="code-copy" >
              Use Code:
              <button id="copyUrl2" :style="codeBg" @click="copyCode('pc')" >HEGPCM</button>
            </div>
            <p class="code-right"><button v-if="!isLogin" @click="SignIn">Sign In</button></p>
          </div>
        </div>
        <div class="top-title">ON DOMESTIC &amp; INTERNATIONAL FLIGHTS</div>
        <div class="part-book">
          <button @click="jumpHome" >Book Now</button>
        </div>
        <div class="part-shake" v-if="s1Banners.length >= 1">
          <div class="shake-p1">
            <img :src='require("../../assets/images/autumn/pre_shake_title.png")' alt="">
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
        <div style="height:0.641rem;background:transparent;"></div>
        <div class="part-share">
          <p class="share-title">Share this offer via</p>
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
          <p>Know more discounts and offers</p>
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
    <div class="hotel_des" v-if="showHotelDes && hotelDsc1">
      <img @click="closeHotelDes" :src='require("../../assets/images/anniversary/ani-cancel.png")' alt="">
      <h4>Up to 30% off on all hotel bookings</h4>
      <!-- <h4>Up to 30% off on all hotel bookings above <span class="rs">Rs</span>2500</h4> -->
      <ul>
        <!-- <li>Minimum booking amount for this discount is <span class="rs">Rs</span>2500 </li> -->
        <li>Available on hotels pan India. </li>
        <li>Applicable on bookings made on HEG PC and mobile site, and app. </li>
        <li>Code is valid from Nov 12th to Dec 25, 2018.</li>
        <li>HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of these terms and conditions, or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior notice.</li>
      </ul>
    </div>
    <div class="hotel_des" v-if="showHotelDes && hotelDsc2">
      <img @click="closeHotelDes" :src='require("../../assets/images/anniversary/ani-cancel.png")' alt="">
      <h4>3000 Happy Gold reward daily on every 100th order</h4>
      <ul>
        <li>It will be transferred on the next working day of the booking to Happy Wallet. </li>
        <li>It can be used to book flight tickets for now. </li>
        <li>No expiry date. </li>
        <li>It cannot be withdrawn or transferred to the bank account. </li>
        <li>In case the order is cancelled due to any reason, the reward will be forfeited. </li>
        <li>HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of these terms and conditions, or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior notice.</li>
      </ul>
    </div>
    <div class="hotel_des" v-if="showHotelDes && hotelDsc3">
      <img @click="closeHotelDes" :src='require("../../assets/images/anniversary/ani-cancel.png")' alt="">
      <h4>200 Happy Gold reward on every booking with order ID ending with 12 or 25</h4>
      <ul>
        <li>It will be transferred on the next working day of the booking to Happy Wallet. </li>
        <li>It can be used to book flight tickets for now. </li>
        <li>No expiry date.</li>
        <li>It cannot be withdrawn or transferred to the bank account. </li>
        <li>In case the order is cancelled due to any reason, the reward will be forfeited. </li>
        <li>HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of these terms and conditions, or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior notice.</li>
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
      hotelDsc1:false,
      hotelDsc2:false,
      hotelDsc3:false,
      smallScreen:false,
      flag:true,
      timer:null,
      isApp:false,
      isIos:false,
      isShowBtn:false,
      saleTime:null,
      upDataDialog:false,
      showHotelDes:false,
      startOrEnd:'satrt',
      device:{href:'javascript:;'},
      isLogin:CookieUtil.hasItem('uuid'),
      s1Banners:[],
      preBg:{
        "background-color":"#fff",
        "background-image":'url('+require('../../assets/images/autumn/pre_bg.jpg')+')',
        "background-size":"100% 100%",
        "background-repeat":"no-repeat"
      },
      copyBgFlower:{
        "background-color":"#fff",
        "background-image":'url('+require('../../assets/images/autumn/pre_flower.png')+')',
        "background-size":"100% 100%",
        "background-repeat":"no-repeat"
      },
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
      orderAmount:[
        {id:0,amount1:650,amount2:600,range1:"Rs.3999"},
        {id:1,amount1:750,amount2:700,range1:"Rs.4000-Rs.5999"},
        {id:2,amount1:850,amount2:800,range1:"Rs.6000-Rs.9999"},
        {id:3,amount1:1150,amount2:950,range1:"10000"},
      ],
      s3Shares:[
        {href:'https://www.facebook.com/happyeasygo/',url:require('../../assets/images/autumn/pre_f.png')},
        {href:'https://twitter.com/happyeasygo',url:require('../../assets/images/autumn/pre_twitter.png')},
        {href:'https://www.instagram.com/happyeasygo_india/',url:require('../../assets/images/autumn/pre_instagram.png')},
        {href:'https://www.youtube.com/channel/UCBlph2534GSN1PDJH9E5ylg',url:require('../../assets/images/autumn/pre_utb.png')},
        {href:'https://plus.google.com/+HappyEasyGoIndia',url:require('../../assets/images/autumn/pre_google.png')},
      ],
      sharesApp:[
        {id:0,name:"SMS",href:"javascript:;",href2:"javascript:;",icon:require('../../assets/images/autumn/pre_sms.png'),text:"End 2018 with a bang!Get 30% off on hotels and up to Rs.1150 off on flights with HappyEasyGo Pre-Xmas Sale.Loads of prizes up for grabs! http://bit.ly/2qD1yE4"},
        {id:1,name:"WhatsApp",href:"javascript:;",action:'share/whatsapp/share',icon:require('../../assets/images/autumn/pre_whatsapp.png'),text:"Enjoy the festive season with HappyEasyGo. Get 30% off on hotels & up to Rs.1150 off on flights with Pre-Xmas Sale. Shake phone & win gifts. http://bit.ly/2qD0VKI"},
        {id:2,name:"Messenger",href:"javascript:;",icon:require('../../assets/images/autumn/pre_messenger.png'),text:"Send-off 2018 in style with HappyEasyGo! Travel with 30% off on hotels & upto Rs.1150 off on flights Pre-Xmas Sale. Shake phone & win gifts. http://bit.ly/2FanksI"},
        {id:3,name:"More",href:'javascript:;',icon:require('../../assets/images/autumn/pre_more.png'),text:"Celebrate the festive season with 30% off on hotels & up to Rs.1150 off on flights with HappyEasyGo Pre-Xmas Sale. http://bit.ly/2qD7cFZ"},
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
    jumpHome(){
      AppBridge.goHomePage(this);
      emitCustomEvent('book_now', 'prechristmas');
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
      emitCustomEvent('Invite_'+who, 'prechristmas');
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
      emitCustomEvent('goForDetail', 'prechristmas')
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
    showDescript(who){
      this.showHotelDes = true;
      if(who == 1){
        this.hotelDsc1 = true;
        this.hotelDsc2 = false;
        this.hotelDsc3 = false;
        try {
          window.heg.trackEvent("AC_Chris_30off");
        } catch (error) {
          if(window.WebViewJavascriptBridge){
            this.$bridge.callhandler("trackEvent","AC_Chris_30off");
          }
        }
      }else if(who == 2){
        this.hotelDsc1 = false;
        this.hotelDsc2 = true;
        this.hotelDsc3 = false;
        try {
          window.heg.trackEvent("AC_Chris_3000gold");
        } catch (error) {
          if(window.WebViewJavascriptBridge){
            this.$bridge.callhandler("trackEvent","AC_Chris_3000gold");
          }
        }
      }else if(who == 3){
        this.hotelDsc1 = false;
        this.hotelDsc2 = false;
        this.hotelDsc3 = true;
        try {
          window.heg.trackEvent("AC_Chris_500gold");
        } catch (error) {
          if(window.WebViewJavascriptBridge){
            this.$bridge.callhandler("trackEvent","AC_Chris_500gold");
          }
        }
      }
    },
    copyCode(who){
      try {
        window.heg.trackEvent("AC_Autmn_CouponCopy");
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler('trackEvent','AC_Autmn_CouponCopy');
        }
      }
      emitCustomEvent('CouponCopy', 'prechristmas');
      let that = this,clipboard;
      if(this.flag){
        this.flag = false;
        if(who == 'mobile'){
          clipboard = new Clipboard('#copyUrl1',{
            text: function() {
              return "HEGAPP";
            }
          });
        }else if(who == 'pc'){
          clipboard = new Clipboard('#copyUrl2',{
            text: function() {
              return "HEGPCM";
            }
          });
        }else if(who == 'hotel'){
          clipboard = new Clipboard('#copyUrl3',{
            text: function() {
              return "HEGHTL30";
            }
          });
        }
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
        setTimeout(function(){
          that.flag = true;
        },1200);
      }
    },
    datetime_to_unix(who){
      let date = new Date(Date.parse(who.replace(/-/g, '/')));
      date = date.getTime();
      return parseInt(date/1000);
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
      let timestamp_set0 = this.datetime_to_unix('2018-11-13 00:00:00');
      let timestamp_set2 = this.datetime_to_unix('2018-12-20 00:00:00');
      let timestamp_set3 = this.datetime_to_unix('2018-12-25 23:59:59');
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

      this.saleTime = sy_day2+'d:'+sy2_hour+'h:'+sy2_min+'m:'+sy2_miao+'s';
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
        this.sharesApp[0].href = 'sms:?body='+encodeURIComponent(encodeURIComponent('End 2018 with a bang! Get 30% off on hotels and up to Rs.1150 off on flights with HappyEasyGo Pre-Xmas Sale.Loads of prizes up for grabs! http://bit.ly/2RHMMr1'));
        this.sharesApp[0].href2 = 'sms:&body='+encodeURIComponent('End 2018 with a bang! Get 30% off on hotels and up to Rs.1150 off on flights with HappyEasyGo Pre-Xmas Sale.Loads of prizes up for grabs! http://bit.ly/2RHMMr1');
        this.sharesApp[1].href = 'whatsapp://send?text='+encodeURIComponent('Enjoy the festive season with HappyEasyGo. Get 30% off on hotels & up to Rs.1150 off on flights with Pre-Xmas Sale. Shake phone & win gifts. http://bit.ly/2Fa4gek');
        this.sharesApp[2].href = 'fb-messenger://share/?link='+encodeURIComponent('https://m.happyeasygo.com/pre-christmas-sale?utm_source=Xmas&utm_medium=Messenger&utm_campaign=2018');
      }
      this.getImg();
    },
    getImg() {
      let parmTop = "type=13&device=" + this.model + "&addr=pre-christmas-sale&businessType=1";
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
#heg-diwali{
  height:auto;
  position: relative;
  img{vertical-align: top}
  a,button{cursor: pointer;}
  .appTop{padding-top:2.04rem;}
  .content{
    .top-banner{
      min-height:3rem;
      position: relative;
      background:#fff;
      img{width: 100%;}
      .top-cover{
        width: 100%;
        position: absolute;
        bottom: 0;
        background:#D5130F;
        padding:0.726rem 0 0.641rem;
        p:first-child{
          margin-bottom:0.32rem;
          color:#fff;
          font-size:0.9rem;
          font-weight: bold;
          span{
            font-size:0.598rem;
            color:#fefdfc;
            font-weight: normal;
            opacity:0.8;
          }
        }
        p:last-child{
          font-size:0.427rem;
          color:#fefdfc;
          opacity:0.6;
        }
      }
    }
  }
  .pre-bg{padding:4.573rem 0.64rem 3.8rem;}
  .app-p{font-weight:700;}
  .top-title{
    margin:0.854rem 0 0.3rem;
    font-family: "SFCompactText-Regular";
    font-size: 0.512rem;
    color: #fff;
    letter-spacing: 0;
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
      color: #FFFFFF;
      font-size:0.769rem;
      font-weight: bold;
    }
  }
  .p-title::before,.p-title::after{
    content:"";
    width:3.8rem;
    display:inline-block;
    border-top:1px solid #CDCDCD;
    vertical-align:middle;
  }
  .part-hotel{
    li{
      background: #fff;
      padding:0.598rem 0.427rem;
      margin-bottom: 0.641rem;
      border-radius:2px;
      text-align:left;
      .h-li-p1{margin-bottom:0.385rem;}
      p{
        width:9.6rem;
        font-size: 0.598rem;
        color: #111111;
        line-height:0.826rem;
        span{
          color:#000;
          font-weight: bold;
        }
        strong{
          color:#D5130F;
          font-size: 0.894rem;
        }
      }
      .h-li-bottom{
        .li-left{
          font-size:0.47rem;
          color: #111111;
          button{
            padding:0.4rem 0.65rem 0.15rem 0.3rem;
            font-size: 0.556rem;
            color: #D5130F;
            font-weight: bold;
            cursor: pointer;
          }
        }
        img{
          vertical-align:middle;
          width:1.708rem;
          height:0.854rem;
          border-radius:0.43rem;
          cursor: pointer;
        }
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
  .part-mobile{
    padding:0.427rem;
    border-radius: 2px;
    background: #fff;
    font-family: "SFCompactText-Regular";
    .part-left{
      .icon-mobile{
        width:1.66rem;
        height:2.56rem;
      }
      a{
        display:block;
        width:4.27rem;
        height:1.28rem;
        margin:auto;
        cursor: pointer;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .middle-box{
      p{
        font-size: 0.385rem;
        color: #999999;
      }
    }
  }
  .part-pc{
    margin:0.747rem 0 0.854rem;
    border-radius: 2px;
    padding:0.427rem;
    background: #fff;
    font-family: "SFCompactText-Regular";
    .part-right{
      img{
        width:3.76rem;
        height:2.177rem;
        vertical-align:middle;
      }
      p{
        font-size:0.385rem;
        color: #666666;
      }
      span{
        color:#0B9D78;
        cursor: pointer;
        border-bottom:1px solid #0B9D78;
      }
    }
    .middle-p{
      font-size: 0.385rem;
      color: #999999;
      text-align:right;
    }
    .bottom-code{
      .code-right{
        button{
          width:4.7rem;
          height:0.982rem;
          color:#0B9D78;
          cursor: pointer;
          background: rgba(11,157,120,0.10);
          border:1px solid #0B9D78;
          border-radius:2px;
          margin-top:0.2rem;
        }
      }
    }
  }
  .part-book{
    margin:0 0 0.641rem;
    button,a{
      width:8.98rem;
      line-height:1.495rem;
      font-size:0.641rem;
      color:#fff;
      background:#D5130F;
      border-radius:2px;
    }
  }
  .part-shake{
    background:#fff;
    padding:0 0 0.641rem;
    border-radius: 2px;
    .shake-p1{
      padding:0.641rem 0;
      background: #F4F5F9;
      border-radius: 2px;
      margin-bottom:0.2rem;
      img{
        height:1.155rem;
      }
      p{
        margin-top:0.4rem;
        font-size: 0.598rem;
        color: #2A2A2A;
        span{
          color:#666666;
        }
      }
    }
    .part-book1{
      margin:1rem 0 0;
      button{
        width:8.98rem;
        line-height:1.495rem;
        font-size:0.641rem;
        color:#fff;
        background:#D5130F;
        border-radius:2px;
        box-shadow: 0 3px 6px 0 rgba(0,0,0,0.50);
      }
    }
  }
  .part-share{
    background:#fff;
    padding:0.47rem 0;
    border-radius:2px;
    .share-title{
      font-size:0.598rem;
      color:#666;
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
      font-size: 0.7rem;
      color: #000;
      margin:1rem 0 0.5rem;
      text-align:left;
    }
    ul{
      li{
        list-style-type:disc;
        margin-left:0.64rem;
        text-align:left;
        font-size: 0.598rem;
        color: #666;
        line-height:0.794rem;
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
