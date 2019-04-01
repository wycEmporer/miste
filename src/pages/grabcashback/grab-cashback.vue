<template>
  <div id="grab-cashback">
    <head-top class="header">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="head-title">Grab Additional Cashback</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="content">
      <div class="appTop" v-show="isShowBtn"></div>
      <div id='navTitle' style="display:none;">Grab Additional Cashback</div>
      <div class="top-banner">
        <img class="t-img1" :src="mUrl" :alt="mAlt" :title="mTitle">
        <img class="t-img2" :src="require('../../assets/images/grabcashback/round_bg.png')" alt="">
      </div>
      <!-- <div class="part-total">
        <div class="total-box">
          <h5>Grand Total</h5>
          <ul class="flex space-between">
            <li>
              <p><number-scroll :time="1" :value="allCount"></number-scroll></p>
              <p>Participation</p>
            </li>
            <li>
              <p class="flex"><span class="rs">Rs</span><number-scroll :time="3" :value="allAmount"></number-scroll></p>
              <p>Extra Cashback</p>
            </li>
            <li>
              <p><number-scroll :time="1" :value="AllUser"></number-scroll></p>
              <p>Helps Received</p>
            </li>
          </ul>
        </div>
      </div> -->
    </div>
    <div class="part-terms">
      <div class="terms-top">
        <h3>Grab Your Additional Cashabck</h3>
        <p class="p-content">Grab cashback program can save more on your bookings, and get deals on your&amp;your friends next travels.</p>
      </div>
      <div class="terms-mid">
        <h3>How Do I Grab CashBack?</h3>
        <p class="p-content">1. Book now &amp; Share Cashback Program With Your Friends</p>
        <p class="p-content">2. Your friends can grab cashback &amp; other rewards in your program</p>
        <p class="p-content">3. Get same cashback amount instantly once your friend grabbed a cashback</p>
        <div class="mid-img mid-img-left">
          <img :src="require('../../assets/images/grabcashback/sale_img1_2.0.png')" alt="">
          <a @click="bookNowBtn">Book Now</a>
        </div>
        <div class="mid-img mid-img-right">
          <img :src="require('../../assets/images/grabcashback/sale_img2_2.0.png')" alt="">
          <a v-if="isShowBtn" :href="href" target="_blank">Download</a>
          <a v-else @click="upDateOrDownloadBtn">Share</a>
        </div>
        <div class="mid-img mid-img-right">
          <img :src="require('../../assets/images/grabcashback/sale_img3_2.0.png')" alt="">
          <a @click="checkWalletBtn">Check Wallet</a>
        </div>
      </div>
      <p class="p-content" style="border-top:1px solid #fff;padding:1rem 0.64rem 0.64rem;margin:0;">Download the latest version of HappyEasyGo Android or iOS app and invite your friends and family to help you earn additional cashback on every booking you make.</p>
      <div class="terms-detail">
        <h4>Terms &amp; Conditions</h4>
        <ul>
          <li>
            <p class="p-title">1.Qualification Criteria :</p>
            <p class="p-content">After the payment for a booking has been successfully made, the system will randomly decide whether a user is eligible to invite friends and earn cashback or not. If selected, a user can start inviting.</p>
          </li>
          <li>
            <p class="p-title">2.Validity Period :</p>
            <p class="p-content">A user can invite friends to help earn cashback for upto 24 hours. The invitations are closed at the end of this time window or when the maximum number of invitations is reached. The invitations are also closed in case the user cancels the order or when the flight ticket cannot be issued.</p>
          </li>
          <li>
            <p class="p-title">3.Cashback Amount :</p>
            <p class="p-content">The amount of cashback and the number of people that can be invited varies with the marketing policy.</p>
            <p class="p-content">You get same cashback amount equal the cashback each friend grabbed. It means you can win the half of maximum cashback,and your friends share another half of maximum cashback.</p>
            <p class="p-content">The cashback offer is independent of other offers, deals and rewards being offered on the HappyEasyGo website or mobile app.</p>
          </li>
          <li>
            <p class="p-title">4.You &amp; Your Friends Rewards Credit :</p>
            <p class="p-content">You get a cashback amount  instantly when a friend grabs a part of cashback.</p>
            <p class="p-content">You friends are gligible to claim the cashback & Coupon when they regsiter in your program.Only after they open Grab-Cashback Offer on the APP,The rewards will be credited to their account.(Except:The Happy Silver  will be credited without this step).</p>
            <p class="p-content">The cashback amount will reflect in the account only after the order has been issued. </p>
          </li>
          <li>
            <p class="p-title">5.Invitations :</p>
            <p class="p-content">A user can only invite people who are not already registered with HappyEasyGo. An invite is considered successful only after the mobile number of the invitee has been verified. The invitee can view the booking information of the user, including the itinerary and the amount of the booking.</p>
            <p class="p-content">Please note that friends invited to register with HappyEasyGo under the cashback offer are not considered successful referrals under the Refer & Earn programme.</p>
          </li>
          <li>
            <p class="p-title">6.How to Use the Cashback(HappyGold) :</p>
            <p class="p-content">Happy Gold received as cashback can be used to pay for flight tickets on HappyEasyGo. 1 Happy Gold = 1 Rupee. Thus, a user can use 500 Happy Gold to pay Rs.500 less for flight tickets from the bank account.</p>
            <p class="p-content">Kindly note that Happy Gold received through this offer cannot be transferred to the bank account. </p>
          </li>
          <li>
            <p class="p-title">7.Order Cancellation :</p>
            <p class="p-content">In case the order cannot be issued, the cashback will be cancelled. However, the offer shall have no effect on the refund process. </p>
          </li>
          <li>
            <p class="p-title">8.Participating in this programme and inviting friends to help earn cashback indicates the agreement to all the terms and conditions.</p>
          </li>
          <li>
            <p class="p-title">9.The right of final interpretation of this offer is reserved with HappyEasyGo.</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="shareCover" v-show="upDataDialog" @click="clickOut"></div>
    <div class="upDataDiaplog" v-show="upDataDialog">
      <p class="up-p1">This program is effective on the latest version of APP.</p>
      <p class="up-p2" v-show="isAndriod">Please Update in Google Play</p>
      <p class="up-p2" v-show="isIos">Please Update in APP Store</p>
      <a :href="href" target="_blank" @click="upDateApp">OK</a>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import numberScroll from "../../components/number-scroll/number-scroll.vue";
import { CookieUtil } from "../../models/utils";
import { User } from "../../models/user";
import { DomainManager } from "../../config/DomainManager.js";
import { Toast,Indicator } from 'mint-ui';
import { AppBridge } from '../../models/appbridge/appbridge.js';
import { Activity } from "../../models/activity";
export default {
  components:{
    headTop,
    numberScroll,
  },
  data(){
    return {
      total:{},
      model:0,
      mUrl: "",
      mAlt: "",
      mTitle: "",
      href:'javascript:;',
      isIos:false,
      isAndriod:false,
      isShowBtn: false,
      upDataDialog:false,
    }
  },
  computed: {
    allCount(){
      return Number(this.total != {}?this.total.allCount:0);
    },
    allAmount(){
      return Number(this.total != {}?this.total.allAmount:0);
    },
    AllUser(){
      return Number(this.total != {}?this.total.AllUser:0);
    },
  },
  methods:{
    clickOut(){
      this.upDataDialog = false;
    },
    upDateApp(){
      this.upDataDialog = false;
    },
    bookNowBtn(){
      try {
        window.heg.trackEvent("AC_Grab_Offer_Booknow");
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler("trackEvent","AC_Grab_Offer_Booknow");
        }
      }
      AppBridge.goHomePage(this);
    },
    upDateOrDownloadBtn(){
      try{
        if(window.heg.showShareView){
          window.heg.trackEvent("AC_Grab_Offer_Checknow");
          this.$router.push('/grab-app-share');
        }else{
          this.upDataDialog = true;
        }
      }catch(error){
        if(this.$bridge.WebViewBridge.indexOf('showShareView') > -1){
          this.$router.push('/grab-app-share');
          this.$bridge.callhandler("trackEvent","AC_Grab_Offer_Checknow");
        }else{
          this.upDataDialog = true;
        }
      }
    },
    checkWalletBtn(){
      AppBridge.goWalletPage(this);
    },
    checkType() {
      let type = AppBridge.device;
      if(type == 1){
        this.model = 2;
        this.isAndriod = true;
      }else if(type == 2){
        this.model = 3;
        this.isIos = true;
      }else{
        this.model = 0;
      }
      this.getImg();
    },
    getImg() {
      let parmTop = "type=13&device=" + this.model + "&addr=grab-cashback&businessType=1";
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
      }).catch(err => {
        console.log(err.msg);
      });
    },
  },
  async created() {
    this.isShowBtn = await AppBridge.getNativeSource(this);
    this.checkType();
    if(this.isShowBtn){
      this.href = ('https://app.adjust.com/for04bk?campaign=offer&adgroup=Msite&creative=Online');
    }else{
      if(this.$bridge.WebViewJavascriptBridge){
        if(this.$bridge.WebViewBridge.indexOf('showShareView') == -1){
          this.href = ('https://app.adjust.com/for04bk?campaign=offer&adgroup=Msite&creative=Online');
        }
      }
    }
  }

}
</script>
<style lang="less" scoped>
#grab-cashback{
  position: relative;
  // z-index: 11;
  height:auto;
  .sp {
    opacity: 0;
  }
  .head-title{font-size:0.7rem;}
  .content{
    img{
      width:100%;
      vertical-align: top;
    }
    .appTop{
      padding-top:2.04rem;
    }
    .top-banner{
      position: relative;
      img{width:100%;}
      .t-img2{
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
  .part-total{
    position: relative;
  }
  .total-box{
    position: absolute;
    width:92%;
    top:-0.641rem;
    margin:0 0.64rem;
    border-radius:3px;
    border:1px solid #eee;
    box-shadow:0 3px 5px #eee;
    h5{
      color:#0b9d78;
      font-size: 0.512rem;
      line-height:0.982rem;
      background:#fff;
    }
    ul{
      background:#f3faf8;
      padding:0.3rem 0;
    }
    li{
      flex:1;
      p{
        justify-content: center;
        line-height:0.982rem;
        border-right:1px solid #c5e7de ;
      }
      p:first-child{
        font-size: 0.641rem;
        color:#f02f58;
        font-weight: bold;
      } 
      p:last-child{
        color:#bcbcbc;
        font-size: 0.512rem;
      } 
    }
    li:last-child p{
      border:0;
    }
  }
  .part-bottom{
    margin-top:4rem;
  }
  .book-des{
    font-size:0.512rem;
    color:#000;
  }
  .book-btns{
    margin: 0.854rem 0 1.23rem;
    button{
      font-size: 0.598rem;
      width:5.98rem;
      height:1.495rem;
      line-height:1.495rem;
      color:#fff;
      border-radius:3px;
      cursor: pointer;
    }
    .b-btn-1{background:#ffad3d;margin-right:0.641rem;}
    button:last-child{background:#0b9d78;}
  }
  .part-terms{
    background: #252b67;
    padding-bottom: 1.495rem;
    text-align: left;
    h3{
      font-size: 0.769rem;
      color:#ffffff;
    }
    h4{
      font-size: 0.64rem;
      color:#ffffff;
      line-height: 0.854rem;
    }
    p{
      letter-spacing:0.3px;
      font-family: "Helvetical TPro Light";
    }
    .terms-top{
      padding:1.5rem 0.64rem 1.06rem;
      border-bottom:1px solid #fff;
    }
    .terms-mid{
      padding:0.854rem 0.64rem;
      p{margin:0.512rem 0 0;}
      .mid-img{
        margin:0.427rem 0 0;
        overflow: hidden;
        position: relative;
        img{
          width:100%;
          height:7.7rem;
          vertical-align: top;
        }
        a{
          width:4.27rem;
          height:1.068rem;
          line-height:1.068rem;
          font-size:0.556rem;
          color:#fff;
          text-align: center;
          font-weight: bold;
          background: #FFAD3D;
          border-radius: 2px;
          position: absolute;
          bottom: 0.4rem;
        }
      }
      .mid-img-left{
        margin-top:0.854rem;
        a{
          left:22%;
        }
      }
      .mid-img-right{
        a{right:22%;}
      }
    }
    .terms-detail{
      padding:0 0.64rem 0;
    }
    .p-title{
      font-size: 0.598rem;
      line-height:0.769rem;
      color:#fff;
      opacity: 0.8;
      margin:0.534rem 0 0; 
    }
    .p-content{
      opacity: 0.7;
      font-size: 0.512rem;
      line-height:0.769rem;
      color:#fff;
      margin-top: 0.2rem;
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
