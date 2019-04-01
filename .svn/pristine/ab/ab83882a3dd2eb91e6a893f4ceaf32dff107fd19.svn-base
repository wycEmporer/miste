<template>
  <div id="coupon-detail">
    <head-top class="header ">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <span slot="title">detail</span>
      <i slot="right"></i>
    </head-top>
    <div class="marTop" v-show="isShowBtn"></div>
    <div>
      <section class="d_content" v-if="!isOld">
        <div class="s1-title">{{couponInfo.name}}</div>
        <div class="section2">
          <div class="s2-title">Introduction</div>
          <ul>
            <li v-html="couponInfo.introduction">{{couponInfo.introduction}}</li>
          </ul>
        </div>
        <div class="section1">
          <div class="s1-center flex space-between align-items-center">
            <div class="c1-left">Coupon Code</div>
            <div class="c1-right c1-right1" @click="copyCode" id="copyUrl1">
              {{couponInfo.code}}<img :src="require('../../assets/images/activity/friday_copy.png')" alt="">
            </div>
          </div>
        </div>
        <div class="section1">
          <div class="s1-center flex space-between align-items-center">
            <div class="c1-left">Validity</div>
            <div class="c1-right">
              <span>{{startTime}} - {{endTime}}</span>
            </div>
          </div>
        </div>
        <!-- <div class="section1">
          <div class="s1-center flex space-between align-items-center">
            <div class="c1-left">Category</div>
            <div class="c1-right">
              <span>{{couponInfo.category}}</span>
            </div>
          </div>
        </div> -->
        <div class="section1" v-if="spoCoupon">
          <div class="s1-center flex space-between align-items-center">
            <div class="c1-left">Source</div>
            <div class="c1-right">
              <span>{{couponInfo.prizeSource}}</span>
            </div>
          </div>
        </div>
        <div class="section1" v-if="hegCoupon">
          <div class="s1-center">
            <div class="c1-left">Applicable Device</div>
            <div class="c1-right c1-right2 flex justify-content-start">
              <span v-for="(item,index) in couponType" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="section2">
          <div class="s2-title">Terms &amp; Conditions</div>
          <ul>
            <li v-html="couponInfo.tC">{{couponInfo.tC}}</li>
          </ul>
        </div>
        <div class="section2" v-if="spoCoupon">
          <div class="s2-title">Steps to Redeem</div>
          <ul>
            <li v-html="couponInfo.stepsToRedeem">{{couponInfo.stepsToRedeem}}</li>
          </ul>
        </div>
      </section>
      <section v-if="isOld" class="d_content old-content">
        <div class="s1-title">{{title}}</div>
        <div class="section2">
          <div class="s2-title">Offer Details</div>
          <ul>
            <li v-html="description">{{description}}</li>
          </ul>
        </div>
        <div class="section1">
          <div class="s1-center flex space-between align-items-center">
            <div class="c1-left">Coupon Code</div>
            <div class="c1-right c1-right1" @click="copyCode2" id="copyUrl1" :style="codeBg">
              <span>{{couponCode}}</span>
            </div>
          </div>
        </div>
        <div class="section1">
          <div class="s1-center flex space-between align-items-center">
            <div class="c1-left">Validity</div>
            <div class="c1-right">
              <span>{{startTime}} - {{endTime}}</span>
            </div>
          </div>
        </div>
        <div class="section1" v-if="spoCoupon">
          <div class="s1-center flex space-between align-items-center">
            <div class="c1-left">Source</div>
            <div class="c1-right">
              <span>{{couponType}}</span>
            </div>
          </div>
        </div>
        <div class="section1" v-if="hegCoupon">
          <div class="s1-center">
            <div class="c1-left">Applicable Device</div>
            <div class="c1-right c1-right2 flex justify-content-start">
              <span v-for="(item,index) in couponType" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="section2">
          <div class="s2-title">Terms &amp; Conditions</div>
          <ul>
            <li v-html="tc">{{tc}}</li>
          </ul>
        </div>
        <div class="section2" v-if="spoCoupon">
          <div class="s2-title">Steps to Redeem</div>
          <ul>
            <li v-html="description">{{description}}</li>
          </ul>
        </div>
      </section>
      <button v-if="coupon == 1" class="search_order" @click="goHomePage(1)">SEARCH FLIGHTS</button>
      <button v-else class="search_order" @click="goHomePage(2)">SEARCH HOTELS</button>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import {Toast,Indicator } from "mint-ui";
import headTop from '../../components/head/head.vue';
import { DomainManager } from "../../config/DomainManager.js";
import {AppBridge} from '../../models/appbridge/appbridge.js';
export default {
  components:{
    headTop
  },
  data(){
    return {
      coupon: null,
      isOld:false,
      tc:'',
      title:'',
      couponCode:"",
      description:'',
      type:null,
      flag:true,
      isiOS:false,
      startTime:'',
      endTime:'',
      couponInfo:{},
      couponType:[],
      isShowBtn:false,
      hegCoupon:false,
      spoCoupon:false,
      months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      codeBg:{
        "background-image":'url('+require('../../assets/images/coupon/icon_copy.png')+')',
        "background-repeat":"no-repeat",
        "background-size":"100% 100%"
      },
    }
  },
  methods:{
    loadOldCouponData(){
      let that = this
      let code = this.$route.query.code
      let type = this.$route.query.type
      let url = DomainManager.getCouponDetail()+'?code='+code+'&type='+type
      this.$axios({
        type:'get',
        url:url,
        headers:{"x-Device":"mobile"}
      }).then(res => {
        Indicator.close();
        that.tc = res.data[0].tc
        that.title = res.data[0].title
        that.couponCode = res.data[0].couponCode
        that.couponType = res.data[0].suitablePlatform.split(',')
        that.description = res.data[0].landingPageDescription
        that.coupon = res.data[0].couponType
        let timer1,timer2;
        if(window.WebViewJavascriptBridge || this.isiOS){
          timer1 = new Date(res.data[0].startDate.replace(/-/g,'/'))
          timer2 = new Date(res.data[0].endDate.replace(/-/g,'/'))
        }else{
          timer1 = new Date(res.data[0].startDate)
          timer2 = new Date(res.data[0].endDate)
        }
        that.startTime = that.months[timer1.getMonth()]+' '+timer1.getDate()+', '+timer1.getFullYear();
        that.endTime = that.months[timer2.getMonth()]+' '+timer2.getDate()+', '+timer1.getFullYear();
      }).catch(err => {Indicator.close();console.log(err)})
    },
    loadCouponData(){
      let that = this
      let detailId = this.$route.query.detailId
      let data = {
        detailId: detailId,
        type: this.type
      };
      let url = DomainManager.getUserCouponDetail()
      this.$axios.post(url, data).then(res => {
        Indicator.close();
        if(res.code == '200'){
          this.coupon = res.data.category;
          if(this.type == 2){
            this.$set(res.data, 'name',res.data.sponsoredName);
          }
          this.couponInfo = res.data;
          if(this.type == 1){
            this.couponType = res.data.device.split(',');
          }
          let timer1,timer2;
          if((window.WebViewJavascriptBridge || this.isiOS) && res.data.validityFrom.indexOf('-') > -1){
            timer1 = new Date(res.data.validityFrom.replace(/-/g,'/'))
            timer2 = new Date(res.data.validityTo.replace(/-/g,'/'))
          }else{
            timer1 = new Date(res.data.validityFrom)
            timer2 = new Date(res.data.validityTo)
          }
          that.startTime = that.months[timer1.getMonth()]+' '+timer1.getDate()+', '+timer1.getFullYear();
          that.endTime = that.months[timer2.getMonth()]+' '+timer2.getDate()+', '+timer1.getFullYear();
        }
      }).catch(err => {Indicator.close();console.log(err)})
    },
    copyCode(){
      let that = this,clipboard;
      if(this.flag){
        this.flag = false;
        clipboard = new Clipboard('#copyUrl1',{
          text: function() {
            return that.couponInfo.code;
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
        setTimeout(function(){
          that.flag = true;
        },1200);
      }
    },
    copyCode2(){
      let that = this,clipboard;
      if(this.flag){
        this.flag = false;
        clipboard = new Clipboard('#copyUrl1',{
          text: function() {
            return that.couponCode;
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
        setTimeout(function(){
          that.flag = true;
        },1200);
      }
    },
    goHomePage(who){
      if(who == 1) {
        AppBridge.goHomePage(this);
      }else{
        AppBridge.goHotelPage(this);
      }
    }
  },
  async created(){
    var u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.isShowBtn = await AppBridge.getNativeSource(this);
    this.type = this.$route.query.type;
    let name = this.$route.query.name;
    if(this.type == 1 || name == "public"){
      this.hegCoupon = true;
      this.spoCoupon = false;
    }else if(this.type == 2 && name != "public"){
      this.spoCoupon = true;
      this.hegCoupon = false;
    }
    if(this.$route.query.code){
      this.isOld = true;
      this.loadOldCouponData();
    }else{
      this.isOld = false;
      this.loadCouponData();
    }
  },
  beforeCreate() {
    Indicator.open({
      spinnerType: "fading-circle"
    }); 
  }
}
</script>
<style lang="less" scoped>
#coupon-detail{
  background: #eee;
  height:auto;
  .header {
    background: #0b9d78;
    img{
      width: 6.4rem;
    }
  }
  .marTop{padding-top:2.04rem;}
  .d_content{
    text-align: left;
    padding:0 0.64rem 2rem;
  }
  .s1-title{
    font-size:0.7rem;
    color:#333;
    line-height: 0.81rem;
    font-weight: bold;
    padding:0.641rem 0 0.427rem;
  }
  .s1-center{border-radius:2px;}
  .section1{
    margin-bottom: 0.427rem;
    .s1-center{
      background: #fff;
      padding: 0.4rem 0.21rem;
      .c1-left{
        font-size: 0.598rem;
        color: #111111;
        line-height: 1.025rem;
        font-weight: bolder;
      }
      .c1-right{
        padding:0.2rem 0 0.2rem 0.5rem;
        font-size: 0.598rem;
        color: #666666;
        span{margin:0.2rem 0 0 -0.2rem;}
      }
      .c1-right1{
        margin-right: 0.3rem;
        padding:0.1rem 0.2rem;
        position: relative;
        color:#333;
        border:1px dashed #FFAD3D;
        position: relative;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
        img{
          width:0.64rem;
          height:0.5rem;
          position: absolute;
          top: -0.3rem;
          right: -0.3rem;
          cursor: pointer;
        }
      }
      .c1-right2{
        padding:0.2rem 0;
        span{
          height:0.894rem;
          display:block;
          margin: 0 1.2rem 0 0;
          border: 1px solid #CDCDCD;
          border-radius: 2px;
          line-height: 0.894rem;
          padding:0 0.3rem;
        }
        span:last-child{
          margin: 0;
        }
      }
    }
  }
  .section2{
    padding:0.64rem 0.21rem 0.427rem;
    background: #fff;
    margin-bottom:0.427rem;
    border-radius:2px;
    .s2-title{
      font-size: 0.598rem;
      color: #111111;
      font-weight: bold;
      line-height: 1.025rem;
      margin-bottom: 0.3rem;
      font-family: "SFCompactText-Regular";
    }
    li{
      word-break: break-word;
      font-size: 0.598rem;
      line-height: 0.894rem;
      color: #666;
      font-family: "SFCompactText-Regular";
    }
  }
.search_order{
  width:100%;
  height:1.5rem;
  line-height:1.5rem;
  font-size: 14px;
  color:#fff;
  font-weight: bold;
  background: #fc9525;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin:auto;
}
  // old
  .old-content{
    .section1{
      margin-bottom: 0.427rem;
      .s1-center{
        background: #fff;
        padding: 0.4rem 0.21rem;
        .c1-left{
          font-size: 0.598rem;
          color: #111111;
          line-height: 1.025rem;
          font-weight: bolder;
        }
        .c1-right{
          padding:0.2rem 0 0.2rem 0.5rem;
          font-size: 0.598rem;
          color: #666666;
          span{margin:0.2rem 0 0 -0.2rem;}
        }
        .c1-right1{
          padding:0.2rem 0.5rem;
          border:0;
        }
        .c1-right2{
          padding:0.2rem 0;
          span{
            height:0.894rem;
            display:block;
            margin: 0 1.2rem 0 0;
            border: 1px solid #CDCDCD;
            border-radius: 2px;
            line-height: 0.894rem;
            padding:0 0.3rem;
          }
          span:last-child{
            margin: 0;
          }
        }
      }
    }
  }
}
</style>