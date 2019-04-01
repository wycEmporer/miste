<template>
  <div id="privateCoupons">
    <head-top class="header ">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <span slot="title" style="font-size:0.769rem;">My Coupons</span>
      <span slot="right">&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </head-top>
    <div class="cou-content">
      <div class="marTop" v-if="isHasCoupon"></div>
      <div class="heg-cou" v-if="isHasCoupon" :class="{'b-bottom':coupon[0].flag && hegExpired.length >= 1}">
        <h4>HEG</h4>
        <ul v-if="heglist">
          <li class="h-coupon" v-for="(item, index) in heglist" :key="index">
            <div class="cou-top" @click="goToUse(item.type, item.id, item.couponType)">
              <img v-if="item.couponType == 1" :src="require('assets/images/activity/friday_adv_flight.png')" alt="">
              <img v-else :src="require('assets/images/activity/friday_adv_hotel.png')" alt="">
              <i class="iconfont icon-emptydown"></i>
            </div>
            <div class="cou-mid flex align-items-center">
              <div class="h-mid-left flex space-between align-items-center" @click="goToUse(item.type, item.id, item.couponType)">
                <p :class="{s_p:item.discount - 10000>0?true:false}">{{item.discount | discount(item.discount)}}</p>
                <div class="flex align-items-center">
                  <span class="ss-span1" v-if="item.discountType == 1">%</span>
                  <span class="ss-span1 ss-span2" v-if="item.discountType == 2">RS.</span>
                  <span class="ss-span1" v-if="item.discountType == 3">Upto</span>
                  <span class="ss-span1" v-if="item.discountType == 4">Upto</span>
                  <span class="ss-span3" v-if="item.discountType == 1">off</span>
                  <span class="ss-span3" v-if="item.discountType == 4">%</span>
                  <span class="ss-span3" v-if="item.discountType == 2 || item.discountType == 3">RS.</span>
                </div> 
              </div>
              <div class="h-mid-right">
                <div class="h-mid-right-top"  @click="goToUse(item.type, item.id, item.couponType)">
                  <h5>{{item.title}}</h5>
                  <p>Validity: {{TimeFormatUtil.getYearMonthDateStringSpe2(item.validityFrom)}} - {{TimeFormatUtil.getYearMonthDateStringSpe2(item.validityTo)}}</p>
                </div>
                <div class="h-mid-right-bottom flex space-between align-items-center">
                  <span class="copyUrl1" @click="copyCode('heglist',item.code)">{{item.code}}<img :src="require('assets/images/activity/friday_copy.png')" alt=""></span>
                  <a @click="goToHomepage('heglist', item.couponType)">Go to Use</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="p-title" @click="showExpired('heg')">
          Expired
          <img :src="arrowIcon2" :class="{'is-active':coupon[0].flag}" alt="">
        </div>
        <ul v-show="coupon[0].flag">
          <li class="h-coupon h-expired" v-for="(item, index) in hegExpired" :key="index" @click="goToUse(item.type, item.id, item.couponType, 'expired')">
            <div class="cou-top">
              <img v-if="item.couponType == 1" :src="require('assets/images/activity/friday_adv_flight.png')" alt="">
              <img v-else :src="require('assets/images/activity/friday_adv_hotel.png')" alt="">
              <i class="iconfont icon-emptydown"></i>
            </div>
            <div class="cou-mid flex align-items-center">
              <div class="h-mid-left flex space-between align-items-center">
                <p :class="{s_p:item.discount - 10000>0?true:false}">{{item.discount | discount(item.discount)}}</p>
                <div class="flex align-items-center">
                  <span class="ss-span1" v-if="item.discountType == 1">%</span>
                  <span class="ss-span1 ss-span2" v-if="item.discountType == 2">RS.</span>
                  <span class="ss-span1" v-if="item.discountType == 3">Upto</span>
                  <span class="ss-span1" v-if="item.discountType == 4">Upto</span>
                  <span class="ss-span3" v-if="item.discountType == 1">off</span>
                  <span class="ss-span3" v-if="item.discountType == 4">%</span>
                  <span class="ss-span3" v-if="item.discountType == 2 || item.discountType == 3">RS.</span>
                </div> 
              </div>
              <div class="h-mid-right">
                <div class="h-mid-right-top">
                  <h5>{{item.title}}</h5>
                  <p>Validity: {{TimeFormatUtil.getYearMonthDateStringSpe2(item.validityFrom)}} - {{TimeFormatUtil.getYearMonthDateStringSpe2(item.validityTo)}}</p>
                </div>
                <div class="h-mid-right-bottom flex space-between align-items-center">
                  <span class="copyUrl2">{{item.code}}<img :src="require('assets/images/activity/friday_copy.png')" alt=""></span>
                  <a>Go to Use</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p class="no-record" v-if="coupon[0].flag && hegExpired.length < 1">You currently do not have expired coupons!</p>
      </div>
      <div class="spo-cou" v-if="isHasCoupon">
        <div class="spo-line"></div>
        <h4>Sponsored</h4>
        <ul>
          <li class="h-coupon" v-for="(item, index) in bdlist" :key="index">
            <div class="cou-top" @click="goToUse(item.type, item.id)">
              <img :src="require('assets/images/activity/coupon_sponsor.png')" alt="">
              <i class="iconfont icon-emptydown"></i>
            </div>
            <div class="cou-mid flex align-items-center">
              <div class="h-mid-left flex space-between align-items-center" @click="goToUse(item.type, item.id)">
                <p :class="{s_p:item.discount - 10000>0?true:false}">{{item.discount | discount(item.discount)}}</p>
                <div class="flex align-items-center">
                  <span class="ss-span1" v-if="item.discountType == 1">%</span>
                  <span class="ss-span1 ss-span2" v-if="item.discountType == 2">RS.</span>
                  <span class="ss-span1" v-if="item.discountType == 3">Upto</span>
                  <span class="ss-span1" v-if="item.discountType == 4">Upto</span>
                  <span class="ss-span3" v-if="item.discountType == 1">off</span>
                  <span class="ss-span3" v-if="item.discountType == 4">%</span>
                  <span class="ss-span3" v-if="item.discountType == 2 || item.discountType == 3">RS.</span>
                </div> 
              </div>
              <div class="h-mid-right">
                <div class="h-mid-right-top"  @click="goToUse(item.type, item.id)">
                  <h5>{{item.title}}</h5>
                  <p>Validity: {{TimeFormatUtil.getYearMonthDateStringSpe2(item.validityFrom)}} - {{TimeFormatUtil.getYearMonthDateStringSpe2(item.validityTo)}}</p>
                </div>
                <div class="h-mid-right-bottom flex space-between align-items-center">
                  <span class="copyUrl3" @click="copyCode('bdlist',item.code)">{{item.code}}<img :src="require('assets/images/activity/friday_copy.png')" alt=""></span>
                  <a :href="item.url" target="_self">Go to Use</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="p-title" @click="showExpired('spo')">
          Expired
          <img :src="arrowIcon2" :class="{'is-active':coupon[1].flag}" alt="">
        </div>
        <ul v-show="coupon[1].flag">
          <li class="h-coupon h-expired" v-for="(item, index) in bdExpired" :key="index" @click="goToUse(item.type, item.id)">
            <div class="cou-top">
              <img :src="require('assets/images/activity/coupon_sponsor.png')" alt="">
              <i class="iconfont icon-emptydown"></i>
            </div>
            <div class="cou-mid flex align-items-center">
              <div class="h-mid-left flex space-between align-items-center">
                <p :class="{s_p:item.discount - 10000>0?true:false}">{{item.discount | discount(item.discount)}}</p>
                <div class="flex align-items-center">
                  <span class="ss-span1" v-if="item.discountType == 1">%</span>
                  <span class="ss-span1 ss-span2" v-if="item.discountType == 2">RS.</span>
                  <span class="ss-span1" v-if="item.discountType == 3">Upto</span>
                  <span class="ss-span1" v-if="item.discountType == 4">Upto</span>
                  <span class="ss-span3" v-if="item.discountType == 1">off</span>
                  <span class="ss-span3" v-if="item.discountType == 4">%</span>
                  <span class="ss-span3" v-if="item.discountType == 2 || item.discountType == 3">RS.</span>
                </div> 
              </div>
              <div class="h-mid-right">
                <div class="h-mid-right-top">
                  <h5>{{item.title}}</h5>
                  <p>Validity: {{TimeFormatUtil.getYearMonthDateStringSpe2(item.validityFrom)}} - {{TimeFormatUtil.getYearMonthDateStringSpe2(item.validityTo)}}</p>
                </div>
                <div class="h-mid-right-bottom flex space-between align-items-center">
                  <span class="copyUrl4" >{{item.code}}<img :src="require('assets/images/activity/friday_copy.png')" alt=""></span>
                  <a >Go to Use</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p class="no-record" v-if="coupon[1].flag && bdExpired.length < 1">You currently do not have expired coupons!</p>
      </div>
    </div>
    <p class="noCoupon" v-show="noHasCoupon" >No valid private coupon.</p>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import headTop from "../../components/head/head.vue";
import { DomainManager } from "../../config/DomainManager.js";
import { Toast, Loadmore, Indicator } from "mint-ui";
import { CookieUtil, TimeFormatUtil } from '../../models/utils';
import { AppBridge } from '../../models/appbridge/appbridge.js';
export default {
  components: {
    headTop
  },
  data() {
    return {
      TimeFormatUtil,
      index:0,
      flag:true,
      heglist:[],
      hegExpired:[],
      bdlist:[],
      bdExpired:[],
      noHasCoupon:false,
      isHasCoupon:false,
      coupon:[
        {id:'heg',flag:false,},
        {id:'Sponsored',flag:false},
      ],
      weekDays:['1 days','2 days','3 days','4 days','5 days','6 days','7 days'],
      months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      arrowIcon:require("../../assets/images/coupon/arrow-left.png"),
      arrowIcon2:require("../../assets/images/coupon/arrow-bottom.png"),
    };
  },
  filters:{
    discount(who){
      if(who && who.indexOf('-') > -1){
        let result = Math.abs(who.split('-')[0])+'-'+Math.abs(who.split('-')[1])
        return result;
      }else{
        return who;
      }
    }
  },
  methods: {
    loadCoupons(){
      let that = this;
      const url = DomainManager.getUserCoupons()
      let data = {
        userId: CookieUtil.getItem('uid')
      };
      Indicator.open({
        text:"loading",
        spinnerType: "fading-circle"
      });
      this.$axios.post(url, data).then(res => {
        Indicator.close();
        if(res.code == 200){
          if(!res.data){
            that.isHasCoupon = false;
            that.noHasCoupon = false;
          }else{
            that.isHasCoupon = true;
            that.heglist = res.data.heg;
            that.hegExpired = res.data.hegExpired;
            that.bdlist = res.data.bd;
            that.bdExpired = res.data.bdExpired;
            if(res.data.heg.length < 1 && res.data.hegExpired.length < 1 && res.data.bd.length < 1 && res.data.bdExpired.length < 1){
              that.isHasCoupon = false;
              that.noHasCoupon = true;
            }
          }
        }else{
          Toast(res.msg);
        }
      }).catch(err => {
        Indicator.close();
        console.log(err)
      })
    },
    showExpired(who){
      if(who == 'heg'){
        this.coupon[0].flag = !this.coupon[0].flag;
      }else if(who == 'spo'){
        this.coupon[1].flag = !this.coupon[1].flag;
      }
    },
    goToHomepage(who, type){
      if(type == 1){
        AppBridge.goHomePage(this);
      }else if(type == 2){
        window.location.href = "https://m-hotel.happyeasygo.com/";
      }
      // if(who == 'heglist'){
      //   AppBridge.goHomePage(this);
      // }
    },
    goToUse(who,item,type,expired){
      if(type == 2){
        if(expired == "expired") return false;
        window.location.href = "https://m-hotel.happyeasygo.com/";
      }else{
       this.$router.push({path:'/coupondetail',query:{'detailId':item,'type':who,name:'private'}});
      }
    },
    copyCode(who,code){
      let that = this,clipboard,btns;
      if(this.flag){
        this.flag = false;
        if(who == 'heglist'){
          btns = document.querySelectorAll('.copyUrl1');
          clipboard = new Clipboard('.copyUrl1',{
            text: function(btns) {
              return code;
            }
          });
        }else if(who == 'bdlist'){
          btns = document.querySelectorAll('.copyUrl3');
          clipboard = new Clipboard('.copyUrl3',{
            text: function(btns) {
              return code;
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
  },
  created() {
    this.loadCoupons();
  }
};
</script>
<style lang="less" scoped>
#privateCoupons {
  height:auto;
  .cou-content{
    padding-bottom: 0.8rem;
    .marTop{padding-top: 2.04rem;}
  }
  .b-bottom{padding-bottom: 0.64rem;}
  h4{
    color:#111;
    font-size: 0.681rem;
    text-align: left;
    margin:0.64rem 0.641rem 0;
  }
  .p-title{
    color: #666666;
    font-size: 0.598rem;
    text-align: left;
    margin:0.64rem 0.64rem;
    overflow: hidden;
    cursor: pointer;
    img{
      float: right;
      width:0.7rem;
      vertical-align: middle;
    }
    .is-active{
      transform: rotate(180deg);
    }
  }
  .spo-line{
    height:1px;
    background: #eee;
  }
  .h-coupon{
    border:1px dashed #ddd;
    border-radius:5px;
    margin:0.427rem 0.64rem 0;
    img{
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
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
        font-size: 1.5rem;
        color: #FFAD3D;
        line-height:2.137rem;
        margin:0 0.4rem 0 0;
        font-weight: bold;
        min-width:5rem;
        max-width:5.5rem;
        position: relative;
        p{flex:1;}
        .s_p{
          font-size: 1rem;
        }
        div{
          float: right;
          width:1.3rem;
          height:2.137rem;
          flex-direction: column;
          span{
            width:100%;
            text-align: left;
            font-size:12px;
            line-height: 12px;
          }
          .ss-span1{
            margin-top:30%;
            margin-bottom: 6px;
          }
          .ss-span2{
            opacity: 0;
          }
          .ss-span3{
            font-size: 14px;
          }
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
            display: block;
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
            padding:0.2rem 0.2rem;
          }
        }
      }
    }
  }
  .h-expired{
    margin:0 0.64rem 0.427rem;
    .cou-mid{
      .h-mid-left{ 
        color: #999;
      } 
      .h-mid-right{
        .h-mid-right-bottom{
          span{
            border:1px dashed #999;
          }
          button,a{ 
            background: #999;
          }
        }
      }
    }
  }
  .no-record{
    padding:0 0.64rem 0.64rem;
    font-size: 0.65rem;
    text-align: left;
  }
  .noCoupon{
    padding:1.5rem 0.8rem 0;
    text-align: left;
  }
}
</style>
