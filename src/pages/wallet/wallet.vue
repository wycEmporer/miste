<template>
	<div class="w-wrapper" ref="viewbox">
    <head-top class="header">
			<i slot="left" class="iconfont icon-back"></i>
			<span slot="title" class="title">wallet</span>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="top" :class="{marTop: contentMargin}">
				<img :src="mUrl" :alt="mAlt" :title="mTitle">
			</div>
			<div class="section1">
        <h4>Happy Wallet Introduction</h4>
        <p>HappyEasyGo brings you Happy Wallet – a virtual account where all your rewards and cashbacks are saved. Available as Happy Gold and Happy Silver, these rewards and cashbacks can be used to enjoy unbelievable discounts on your flight bookings. Take a look at what these are:</p>
        <div class="s1-gold">Happy Gold</div>
        <p>Happy Gold is a virtual currency which is added to Happy Wallet to book flight tickets and enjoy discounts on bookings. Happy Gold has no expiration date and you can keep it in your Happy Wallet as long as you wish.</p>
      </div>
			<div class="section2">
        <h4>1 Happy Gold = 1 Rupee</h4>
        <div class="s2-content">
          <h5>How to earn Happy Gold？</h5>
          <ul >
            <li>1. Get additional Happy Gold every time you top-up your Happy Wallet. The higher the top-up amount, the higher the percentage of additional Happy Gold you get. For more details, click on <a @click="topUpEvent">Top-up</a>.</li>
            <li>2. Avail HappyEasyGo’s various cashback offers. All the cashbacks you earn are instantly added to your Happy Wallet as Happy Gold. For more details, click on <a @click="cashbackEvent" >Cashback</a>.</li>
            <li>3. Whenever someone signs up on HappyEasyGo using your referral code and books flight tickets on HappyEasyGo, you get 50 Happy Gold per order they place. For more details, click on <a @click="referAndEarnEvent">Refer &amp; Earn</a>.</li>
          </ul>
        </div>
        <div class="s2-content">
          <h5>What are the benefits of Happy Gold?</h5>
          <ul >
            <li>1. There is no limit on how much Happy Gold you can use in one booking. You can even pay your entire airfare using Happy Gold.</li>
            <li>2. Get an instant refund in case of ticket cancellation or non-issuance of flight ticket due to any other reason. </li>
            <li>3. When you don’t see yourself travelling anytime soon, you can transfer Happy Gold to your bank account and spend it the way you like. A small fee may be charged for this transaction by your bank. For more details, click on <a @click="withDrawEvent">Transfer-to-Bank</a>.</li>
          </ul>
        </div>
        <p class="s2-bottom">（Happy Gold rewards are not available for transfer-to-bank-account option，such as top-up rewards, gift, referral program and other ad hoc promotional events etc）</p>
        <div class="s2-silver">Happy Silver</div>
        <p class="s2-p2">Happy Silver are points that are credited to your account when you sign up on HappyEasyGo or whenever someone signs up using your referral code. These points are valid for a period of 3 months from the date of issue.</p>
      </div>
      <div class="section3">
        <div class="s2-content">
          <h5>How to earn Happy Silver?</h5>
          <ul>
            <li>1.Sign up on HappyEasyGo and start earning Happy Silver from the get-go. For more details, click on <a @click="registerRwardEvent">Registration Reward</a>.</li>
            <li>2. Refer HappyEasyGo to friends and family, and earn Happy Silver whenever someone registers using your referral code. For more details, click on <a @click="referAndEarnEvent">Refer &amp; Earn</a>.</li>
          </ul>
        </div>
        <div class="s2-content">
          <h5>What are the benefits of Happy Silver?</h5>
          <ul>
            <li>Happy Silver can be used to pay a part of your booking price when you purchase the tickets at Member Discount price. Please refer to the product quotation list for the amount of Happy Silver you can use in one booking.</li>
          </ul>
        </div>
        <div class="s3-img"><img :src="require('../../assets/images/wallet/s3-img.png')" alt=""></div>
      </div>
      <div class="section4">
        <div class="s4-top flex space-between align-items-center" @click="showAndHideDetails(0)">
          <h6>Guidelines To use Happy Wallet</h6>
          <i class="iconfont icon-emptydown" :class="{'icon-active':guideList[0].flag}"></i>
        </div>
        <ul v-show="guideList[0].flag">
          <li>Happy Wallet can be used for every booking either HappyEasygo site or App.</li>
          <li>HappyEasyGo wouldn't be liable to any hacking or  unauthorized use of account moreover the responsibility to ensure privacy and confidentially lies on the account holder.</li>
          <li>HappyEasyGo has rights to cancel all or partial Happy Wallet amount granted to the account holder at any point of time without any prior notice.</li>
        </ul>
      </div>
      <div class="section4">
        <div class="s4-top flex space-between align-items-center" @click="showAndHideDetails(1)">
          <h6>Guidelines For Cancellation</h6>
          <i class="iconfont icon-emptydown" :class="{'icon-active':guideList[1].flag}"></i>
        </div>
        <ul v-show="guideList[1].flag">
          <li>In terms of Cancellation, Happy gold utilized in the booking will be credited to your Happy Gold Account, while Happy Silver will become ineffective.</li>
          <li>The customer has the facility to choose between the option A) Transfer to Bank B) Happy Gold Account.</li>
          <li>Cancellation charges will be deducted from the cash as well as from happy wallet respectively.</li>
          <li>Refund will be credited to the Happy Wallet only.</li>
          <li>Refund is subject to HappyEasyGo terms &amp; Conditions.</li>
        </ul>
      </div>
      <div class="section4">
        <div class="s4-top flex space-between align-items-center" @click="showAndHideDetails(2)">
          <h6>General Guidelines</h6>
          <i class="iconfont icon-emptydown" :class="{'icon-active':guideList[2].flag}"></i>
        </div>
        <ul v-show="guideList[2].flag">
          <li>User is free to opt payment options either happy wallet or Debit/credit/ online payment. Every transaction is validated by user credentials and OTP.</li>
          <li>In case of any dispute, HappyEasyGo’s decision will prevail.</li>
        </ul>
      </div>
		</div>
	</div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import { CookieUtil } from "../../models/utils";
import { User } from "../../models/user";
import { Toast } from "mint-ui";
import { DomainManager } from 'config/DomainManager';
import {AppBridge} from '../../models/appbridge/appbridge.js';
export default {
  components: {
    headTop,
  },
  data() {
    return {
      scrollTop: document.body.scrollTop,
      mUrl: "",
      mAlt:"",
      mTitle:"",
      model:0,
      contentMargin:true,
      ifLogin:CookieUtil.hasItem("uuid"),
      guideList:[
        {id:0,flag:false},
        {id:1,flag:false},
        {id:2,flag:false},
      ]
    };
  },
  methods: {
    topUpEvent(){
      if(this.contentMargin){ 
        this.$router.push('/rechargeint');
      }
    },
    cashbackEvent(){
      if(this.contentMargin){   
        if(this.ifLogin){
          this.$router.push('/cashback');
        }else{
          this.$router.push('/login');
        }
      }
    },
    referAndEarnEvent(){
      if(this.contentMargin){       
        if(this.ifLogin){
          this.$router.push('/referral');
        }else{
          this.$router.push('/login');
        }
      }
    },
    withDrawEvent(){
      if(this.contentMargin){
        if(this.ifLogin){
          this.$router.push('/withdraw');
        }else{
          this.$router.push('/login');
        }
      }
    },
    registerRwardEvent(){
      if(this.contentMargin){
        if(this.ifLogin){
          this.$router.push('/registration-reward');
        }else{
          this.$router.push('/login');
        }
      }
    },
    showAndHideDetails(who){
      this.guideList[who].flag = !this.guideList[who].flag;
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
      let parmTop = "type=13&device=" + this.model + "&addr=wallet&businessType=1";
      User.advList(this, parmTop)
        .then(res => {
          if (res.success) {
            if(res.list.length >= 1){
              this.mUrl = res.list[0].landingPageUrl == null?'': res.list[0].landingPageUrl;
              this.mAlt = res.list[0].landingPageAlt == null?'': res.list[0].landingPageAlt;
              this.mTitle = res.list[0].landingPageTitle == null?'': res.list[0].landingPageTitle;
            }
          }
        })
        .catch(err => {
          console.log(err.msg);
        });
    },
  },
  async created() {
    this.contentMargin = await AppBridge.getNativeSource(this);
    let id = await AppBridge.getNativeUuid(this);
    window.onReceviedUuid = this.onReceviedUuid;
    if(id){
      CookieUtil.removeItem("uuid");
      CookieUtil.setItem("uuid",id);
      this.ifLogin = true;
    }else{
      if(CookieUtil.hasItem('uuid')){
        this.ifLogin = true;
      }else{
        CookieUtil.removeItem("uuid");
        this.ifLogin = false;
      }
    }
    this.checkType()
  },
};
</script>
<style lang='less' scoped>
.red {
  color: #f04545;
}
.w-wrapper {
  font-family: "PingFangSC";
  padding-bottom: 1rem;
  .marTop{margin-top:2.04rem;}
  .header {
    background: #17a27f;
    .title {
      font-size: 0.768rem;
      color: #fff;
    }
    .sp {
      opacity: 0;
    }
  }
  .top {
    img {
      display: block;
      width: 100%;
    }
  }
  h4{
    font-size: 0.769rem;
    color: #333333;
  }
  .section1 {
    padding:0.64rem 0.64rem 0.74rem;
    p{
      text-align: left;
      font-family: "SFCompactText-Regular";
      font-size: 0.598rem;
      color: #666666;
      line-height: 0.894rem;
      margin:0.425rem 0 0.64rem;
    }
    div{
      color: #A58843;
      height:1.28rem;
      line-height:1.28rem;
      font-family: "SFCompactText-Semibold";
      font-size: 0.598rem;
      margin-bottom: 0.64rem;
      background: linear-gradient(-90deg, #C7A962 0%, #FFEBBC 37%, #E4CD92 71%, #FDE9BA 100%);
    }
  }
  .section2, .section3 {
    padding: 0 0.64rem;
    h5{
      font-family: "SFCompactText-Semibold";
      font-size: 0.598rem;
      color: #333333;
      text-align: left;
      margin:0.854rem 0 0.425rem;
    }
    ul{
      li{
        text-align: left;
        font-family: "SFCompactText-Regular";
        font-size: 0.598rem;
        color: #666666;
        line-height: 0.894rem;
        margin:0 0 0.22rem ;
        a{color:#24A786;text-decoration: underline;}
      }
    }
    .s2-bottom{
      font-family: "PingFangSC-Regular";
      font-size: 0.512rem;
      color: #999999;
      line-height: 0.894rem;
      text-align: left;
    }
    .s2-silver{
      color: #828282;
      height:1.28rem;
      line-height:1.28rem;
      font-family: "SFCompactText-Semibold";
      font-size: 0.598rem;
      margin:1.28rem 0 0.64rem;
      background: linear-gradient(-90deg, #E6E6E6 4%, #CBCBCB 39%, #E0E0E0 72%, #AAAAAA 100%);
    }
    .s2-p2{
      text-align: left;
      font-family: "SFCompactText-Regular";
      font-size: 0.598rem;
      color: #666666;
      line-height: 0.894rem;
      margin:0 0 0.854rem ;
    }
    .s3-img{
      padding: 0.425rem 0 1.28rem;
      img{
        width:100%;
      }
    }
  }
  .section4{
    text-align: left;
    margin-bottom: 0.5rem;
    .s4-top{
      cursor: pointer;
      background: #F5F5F5;
      padding:0.598rem 0.64rem;
      h6{
        font-size: 0.598rem;
        color: #666666;
        font-weight: normal;
      }
      i{
        color:#999;
      }
      .icon-active{
        transform: rotate(180deg);
      }
    }
    ul{
      padding:0 0.64rem;
      margin-left: 0.64rem;
      li{
        list-style-type: disc;
        font-family: "SFCompactText-Regular";
        font-size: 0.598rem;
        color: #666666;
        line-height: 0.894rem;
        margin:0 0 0.22rem ;
      }
      li:first-child{
        margin-top: 0.64rem;
      }
      li:last-child{
        margin-bottom: 0.64rem;
      }
    }
  }
}
</style>