<template>
  <div id="black-friday">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title" style="margin-left:-1.5rem;">Black Friday Sale</p>
    </head-top>
    <div class="content">
      <div style="height:2.04rem;" v-show="isShowBtn"></div>
      <div class="top-banner">
        <img :src="mUrl">
        <div class="top-cover">
          <p v-if="startOrEnd == 'start'"><span>Campaign Starts In :</span>{{saleTime}}</p>
          <p v-else-if="startOrEnd == 'in'">Campaign is live !</p>
          <p v-else-if="startOrEnd == 'end'"><span>Campaign Ends In :</span>{{saleTime}}</p>
          <p v-else>Campaign is closed.</p>
          <p>Nov 23rd,00:00:00 -- Nov 26th,23:59:59</p>
        </div>
      </div>
      <div class="heg-coupon">
        <div class="h-coupon">
          <div class="cou-top"  @click="goToUse('hotel')">
            <img :src="require('../../assets/images/activity/friday_adv_hotel.png')" alt="">
             <i class="iconfont icon-emptydown"></i>
          </div>
          <div class="cou-mid flex align-items-center">
            <div class="h-mid-left"  @click="goToUse('hotel')">
              <p>200<span>Rs.</span></p>
            </div>
            <div class="h-mid-right">
              <div class="h-mid-right-top"  @click="goToUse('hotel')">
                <h5>Instant Discount Coupon (PC/Mobile)</h5>
                <p>Validity: Nov 23,2018- Nov 26,2018</p>
              </div>
              <div class="h-mid-right-bottom flex space-between">
                <span id="copyUrl1" ref="copyUrl1" @click="copyCode('hotel','#copyUrl1')">HEGHFRI <img :src="require('../../assets/images/activity/friday_copy.png')" alt=""></span>
                <a href="https://m-hotel.happyeasygo.com/m_site/home" target="_self" @click="goToHomepage('hotel')">Go to Use</a>
              </div>
            </div>
          </div>
        </div>
        <div class="f-coupon" >
          <div class="cou-top" @click="goToUse('app')">
            <img :src="require('../../assets/images/activity/friday_adv_flight.png')" alt="">
             <i class="iconfont icon-emptydown"></i>
          </div>
          <div class="cou-mid flex align-items-center">
            <div class="h-mid-left" @click="goToUse('app')">
              <p>350<span>Rs.</span></p>
            </div>
            <div class="h-mid-right">
              <div class="h-mid-right-top" @click="goToUse('app')">
                <h5>Instant Discount Coupon (App)</h5>
                <p>Validity: Nov 23,2018- Nov 26,2018</p>
              </div>
              <div class="h-mid-right-bottom flex space-between">
                <span id="copyUrl2" ref="copyUrl2" @click="copyCode('app','#copyUrl2')">HEGFRAP <img :src="require('../../assets/images/activity/friday_copy.png')" alt=""></span>
                <a :href="appHref" target="_blank" @click="goToHomepage('app')">Go to Use</a>
              </div>
            </div>
          </div>
        </div>
        <div class="f-coupon" >
          <div class="cou-top" @click="goToUse('msite')">
            <img :src="require('../../assets/images/activity/friday_adv_flight.png')" alt="">
             <i class="iconfont icon-emptydown"></i>
          </div>
          <div class="cou-mid flex align-items-center">
            <div class="h-mid-left" @click="goToUse('msite')">
              <p>300<span>Rs.</span></p>
            </div>
            <div class="h-mid-right">
              <div class="h-mid-right-top" @click="goToUse('msite')">
                <h5>Instant Discount Coupon (PC/Mobile)</h5>
                <p>Validity: Nov 23,2018- Nov 26,2018</p>
              </div>
              <div class="h-mid-right-bottom flex space-between">
                <span id="copyUrl3" ref="copyUrl3" @click="copyCode('msite','#copyUrl3')">HEGFRI <img :src="require('../../assets/images/activity/friday_copy.png')" alt=""></span>
                <a href="http://m.happyeasygo.com" target="_self">Go to Use</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="friday-des">
        <h4>Campaign Description</h4>
        <ul>
          <li>Book flights and hotels on HappyEasyGo during Black Friday &amp; Cyber Monday Sale to enjoy additional discounts on your booking. Hurry up!</li>
        </ul>
        <div style="border-bottom:1px solid #eee;padding-top:0.64rem;"></div>
      </div>
      <div class="friday-terms">
        <div class="term-title">
          <p>Terms &amp; Condition</p>
        </div>
        <ul class="term-content">
          <li>Cancellation charges will be deducted from the cash as well as Happy Wallet.</li>
          <li>The offer is only applicable on bookings made on HappyEasyGo desktop or mobile site. </li>
          <li>HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of these terms and conditions, or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior notice.</li>
          <li>Any disputes arising out of this offer shall be subject to the exclusive jurisdiction of competent courts in Gurgaon, Haryana, India. </li>
        </ul>
      </div>
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
    <div class="heg-cover" v-show="showHegCover"></div>
    <div class="heg-dialog" v-show="showHegCover">
      <div class="s1-title">{{title}}</div>
      <div class="section2">
        <div class="s2-title">Offer Details</div>
        <ul>
          <li style="list-style-type:none;margin-left:0;">{{Introduction}}</li>
        </ul>
      </div>
      <div class="section1">
        <div class="s1-center flex space-between align-items-center">
          <div class="c1-left">Category</div>
          <div class="c1-right">
            <span>{{category}}</span>
          </div>
        </div>
      </div>
      <div class="section1" >
        <div class="s1-center flex space-between align-items-center">
          <div class="c1-left">Applicable Device</div>
          <div class="c1-right">
            <span>{{device}}</span>
          </div>
        </div>
      </div>
      <div class="section1">
        <div class="s1-center flex space-between align-items-center">
          <div class="c1-left">Validity</div>
          <div class="c1-right">
            <span>{{validity}}</span>
          </div>
        </div>
      </div>
      <div class="section1">
        <div style="border-bottom:1px solid #CDCDCD;" class="s1-center flex space-between align-items-center">
          <div class="c1-left">Coupon Code</div>
          <div class="c1-right c1-right1">
            <span id="copyUrl11" @click="copyCode('detail','#copyUrl11')">{{code}} <img :src="require('../../assets/images/activity/friday_copy.png')" alt=""></span>
          </div>
        </div>
      </div>
      <div class="section2">
        <div class="s2-title" style="padding-top:0.47rem;">Terms &amp; Conditions</div>
        <ul>
          <li>HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of these terms and conditions, or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior notice.</li>
          <li>Any disputes arising out of this offer shall be subject to the exclusive jurisdiction of competent courts in Gurgaon, Haryana, India.</li>
        </ul>
      </div>
      <div class="dialog-btn">
        <button @click="closeHegDialog">OK</button>
      </div>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import headTop from 'components/head/head.vue';
import { Toast, Indicator } from 'mint-ui';
import { CookieUtil } from 'models/utils';
import { User } from "models/user";
import { DomainManager } from "config/DomainManager.js";
import { emitCustomEvent } from 'models/utils/adGAEvent';
import { AppBridge } from 'models/appbridge/appbridge.js';
export default {
  components:{
    headTop,
  },
  data(){
    return{
      mUrl: "",
      mAlt: "",
      mTitle: "",
      model:0,
      flag:true,
      saleTime:'',
      timer:null,
      title:'',
      code:'',
      device:'',
      category:'',
      validity:'',
      Introduction:'',
      startOrEnd:'satrt',
      isShowBtn:false,
      showHegCover:false,
      isLogin:CookieUtil.hasItem('uuid'),
      appHref:'https://app.adjust.com/xmfxff?campaign=BlackFriday',
      hotelHref:'java:;',
      s3Shares:[
        {href:'https://www.facebook.com/happyeasygo/',url:require('../../assets/images/autumn/pre_f.png')},
        {href:'https://twitter.com/happyeasygo',url:require('../../assets/images/autumn/pre_twitter.png')},
        {href:'https://www.instagram.com/happyeasygo_india/',url:require('../../assets/images/autumn/pre_instagram.png')},
        {href:'https://www.youtube.com/channel/UCBlph2534GSN1PDJH9E5ylg',url:require('../../assets/images/autumn/pre_utb.png')},
        {href:'https://plus.google.com/+HappyEasyGoIndia',url:require('../../assets/images/autumn/pre_google.png')},
      ],
    }
  },
  methods:{
    closeHegDialog(){
      this.showHegCover = false;
    },
    goToHomepage(who){
      if(who == 'hotel'){
        
      }else if(who == 'app'){
        try {
          window.heg.goHomePage();
        } catch (error) {
          if(window.WebViewJavascriptBridge){
            this.$bridge.callhandler('goHomePage');
          }else{
            this.appHref = "https://app.adjust.com/xmfxff?campaign=BlackFriday";
          }
        }
      }
    },
    goToUse(who){
      this.showHegCover = true;
      if(who == 'hotel'){
        this.code = 'HEGHFRI';
        this.title = 'Instant Discount Coupons (PC/Mobile)';
        this.device = 'PC/Mobile';
        this.category = 'Hotel';
        this.validity = 'Nov 23,2018- Nov 26,2018';
        this.Introduction = 'Extra Rs.200 off on hotel booking of over Rs.2500.';
      }else if(who == 'app'){
        this.code = 'HEGFRAP';
        this.title = 'Instant Discount Coupons (App)';
        this.device = 'App';
        this.category = 'Flight';
        this.validity = 'Nov 23,2018- Nov 26,2018';
        this.Introduction = 'Get Rs.350 instant discount on flight booking.';
      }else if(who == 'msite'){
        this.code = 'HEGFRI';
        this.title = 'Instant Discount Coupons (PC/Mobile)';
        this.device = 'PC/Mobile';
        this.category = 'Flight';
        this.validity = 'Nov 23,2018- Nov 26,2018';
        this.Introduction = 'Get Rs.300 instant discount on flight booking.';
      }
    },
    copyCode(who,id){
      emitCustomEvent('CouponCopy', 'black-friday');
      let that = this,clipboard, copy;
      if(this.flag){
        this.flag = false;
        if(who == 'hotel'){
          copy = this.$refs.copyUrl1;
          clipboard = new Clipboard(id,{
            text: function() {
              return "HEGHFRI";
            }
          });
        }else if(who == 'app'){
          copy = this.$refs.copyUrl2;
          clipboard = new Clipboard(id,{
            text: function() {
              return "HEGFRAP";
            }
          });
        }else if(who == 'msite'){
          copy = this.$refs.copyUrl3;
          clipboard = new Clipboard(id,{
            text: function() {
              return "HEGFRI";
            }
          });
        }else if(who == 'detail'){
          clipboard = new Clipboard(id,{
            text: function() {
              return that.code;
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
      let timestamp_set0 = this.datetime_to_unix('2018-11-23 00:00:00');
      let timestamp_set2 = this.datetime_to_unix('2018-11-25 00:00:00');
      let timestamp_set3 = this.datetime_to_unix('2018-11-26 23:59:59');
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
      }else if(type == 2){
        this.model = 3;
      }else{
        this.model = 0;
      }
      this.getImg();
    },
    getImg() {
      let parmTop = "type=13&device=" + this.model + "&addr=black-friday-cyber-monday-sale&businessType=1";
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
  },
  async created() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.isShowBtn = await AppBridge.getNativeSource(this);
    this.checkType();
    this.GetRTime();
  },
}
</script>
<style lang="less" scoped>
#black-friday{
  height:auto;
  background: #FAFAFA;
  .top-banner{
    min-height:3rem;
    position: relative;
    img{width: 100%;}
    .top-cover{
      width: 100%;
      position: absolute;
      bottom: 0;
      background:rgba(0,0,0,0.5);
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
  .heg-coupon{
    background: #fff;
    padding:0.64rem;
    img{
      width:100%;
      height:100%;
      vertical-align: top;
    }
    .h-coupon, .f-coupon{
      border:1px dashed #ddd;
      border-radius:5px;
      .cou-top{
        height:2.56rem;
        position: relative;
        cursor: pointer;
        border-top-left-radius:2px;
        border-top-right-radius:2px;
        i{
          position: absolute;
          top:0.2rem;
          right: 0.5rem;
          color:#fff;
          transform: rotate(-90deg);
        }
      }
      .cou-mid{
        .h-mid-left{
          font-family: "HelveticaLTPro-BlackCond";
          font-size: 1.796rem;
          color: #FFAD3D;
          line-height:2.137rem;
          margin:0 0.64rem 0 0.58rem;
          font-weight: bold;
          span{
            font-size:0.598rem;
          }
        } 
        .h-mid-right{
          flex:1;
          text-align: left;
          padding:0.2rem 0 0.4rem;
          .h-mid-right-top{
            h5{
              font-family: "HelveticaLTPro-Bold";
              font-size: 0.512rem;
              color: #333333;
              line-height:0.769rem;
            }
            p{
              font-family: "HelveticaLTPro-Light";
              font-size: 0.385rem;
              color: #666666;
              line-height:0.709rem;
              margin: 0.2rem 0 0.5rem;
            }
          }
          .h-mid-right-bottom{
            img{
              width:0.64rem;
              height:0.5rem;
              position: absolute;
              top: -0.3rem;
              right: -0.4rem;
              cursor: pointer;
            }
            span{
              padding:0.15rem 0.2rem 0.1rem;
              font-size:0.467rem;
              color:#333;
              border:1px dashed #FFAD3D;
              position: relative;
              text-align: center;
              border-radius: 2px;
              cursor: pointer;
            }
            button,a{
              width:3.4rem;
              padding:0.1rem 0.2rem;
              color:#fff;
              text-align: center;
              font-size: 0.467rem;
              background: #FFAD3D;
              border-radius: 2px;
              margin-right:0.35rem;
            }
            a{
              // height:0.427rem;
              // line-height:0.427rem;
              padding:0.2rem 0.2rem;
            }
          }
        }
      }
    }
    .f-coupon{margin-top:0.64rem;}
  }
  .friday-des{
    background: #fff;
    padding:0 0.64rem;
    text-align: left;
    h4{
      font-family: "SFCompactText-Medium";
      font-size: 0.598rem;
      color: #111111;
    }
    li{
      font-family: "SFCompactText-Regular";
      font-size: 0.512rem;
      color: #666666;
      line-height:0.769rem;
      margin: 0.47rem 0 0 0;
    }
  }
  .friday-terms{
    background: #fff;
    .term-title{
      padding:0.64rem 0 0;
      p{
        font-family: "SFCompactText-Medium";
        font-size: 0.598rem;
        color: #111;
        line-height:0.826rem;
        font-weight: bold;
        padding:0 0.64rem 0.2rem;
        text-align: left;
      }
    }
    .term-content{
      padding:0 0.64rem 1.28rem;
      li{
        list-style-type: disc;
        font-family: "SFCompactText-Regular";
        color: #666666;
        font-size: 0.512rem;
        line-height: 0.769rem;
        margin-top: 0.47rem;
        text-align: left;
        margin-left: 0.64rem;
      }
    }
  }
  .s3-share{
    background:transparent;
    padding:1.068rem 0 1.068rem;
    p{font-size:0.598rem;padding-bottom:0.641rem;color:#333;}
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
    padding: 0 0 0.5rem;
    p {
      font-size: 0.470rem;
      color: #666;
      padding: 0.2rem 0 0;
      span{
        border-right: 1px solid #666;
        display: inline-block;
        padding: 0 0.2rem;
        cursor: pointer;
      }
      span:last-child{
        border-right: none;
      }
    }
  }
  .heg-cover{
    width:100%;
    height:100%;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
  }
  .heg-dialog{
    width:13rem;
    position:fixed;
		top:50%;
		left:50%;
		transform:translateY(-50%) translateX(-50%);
		-webkit-transform:translateY(-50%) translateX(-50%);
    z-index: 11;
    border-radius:2px;
    background: #fff;
    .s1-title{
      font-size:0.681rem;
      color:#111;
      line-height: 0.81rem;
      font-weight: bold;
      padding:0.64rem 0;
    }
    .s1-center{border-radius:2px;}
    .section1{
      text-align: left;
      .s1-center{
        background: #fff;
        margin:0 0.4rem ;
        padding: 0.4rem 0;
        border-top:1px solid #CDCDCD;
        .c1-left{
          font-size: 0.598rem;
          color: #111111;
        }
        .c1-right{
          font-size: 0.512rem;
          color: #666666;
        }
        .c1-right1{
          padding:0.01rem 0;
          margin-right: 0.4rem;
          img{
            width:0.64rem;
            height:0.5rem;
            position: absolute;
            top: -0.3rem;
            right: -0.4rem;
            cursor: pointer;
          }
          span{
            padding:0.2rem 0.2rem 0.1rem;
            font-size:0.512rem;
            color:#666666;
            border:1px dashed #FFAD3D;
            position: relative;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;
          }
        }
      }
    }
    .section2{
      text-align: left;
      margin:0 0.4rem 0.4rem;
      background: #fff;
      border-radius:2px;
      .s2-title{
        font-size: 0.598rem;
        color: #111111;
        line-height: 0.726rem;
        font-family: "SFCompactText-Regular";
      }
      li{
        list-style-type: disc;
        font-size: 0.512rem;
        line-height: 0.769rem;
        color: #666;
        margin-left: 0.64rem;
        margin-top: 0.4rem;
        font-family: "SFCompactText-Regular";
      }
    }
    .dialog-btn{
      button{
        width:8.2rem;
        height:1.28rem;
        line-height: 1.28rem;
        background: #FFAD3D;
        cursor: pointer;
        color:#fff;
        font-size:0.68rem;
        border-radius:2px;
        margin:0.452rem 0 0.64rem;
      }
    }
  }
}
</style>
