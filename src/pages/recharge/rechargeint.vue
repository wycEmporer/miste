<template>
  <div class="wrapper" id="rechargeint1">
    <head-top class="header">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title">Recharge Program</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="container">
      <div class="top" :class="{marTop: isShowBtn}">
        <img :src="mUrl" :alt="mAlt" :title="mTitle">
      </div>
      <div class="section1">
        <ul>
          <li class="flex content-start">
            <img :src="require('../../assets/images/recharge/icon-1.png')" alt="">
            <p>Valid from:
              <span class="yellow">
                <!-- {{getDate(list.startDate)}} -->
                01 Oct 2018
              </span>
            </p>
          </li>
          <li class="flex content-start">
            <img :src="require('../../assets/images/recharge/icon-2.png')" alt="">
            <p>Applicable on:
              <span class="yellow"> Domestic Flights</span>
            </p>
          </li>
          <li class="flex content-start">
            <img :src="require('../../assets/images/recharge/icon-3.png')" alt="">
            <p>Applicable to:
              <span class="yellow">PC Site &amp; Mobile Site</span>
            </p>
          </li>
          <li class="flex content-start align-items-center">
            <img :src="require('../../assets/images/recharge/icon-4.png')" alt="">
            <p>Valid till:
              <span class="yellow">
                <!-- {{getDate(list.endDate)}} -->
                30 Dec 2019
              </span>
            </p>
          </li>
        </ul>
      </div>
      <div class="section2">
        <h2 class="yellow">Happy Gold Top-up Reward</h2>
        <p class="s2-p1">Get additional Happy Gold every time you top-up your Happy Wallet. The higher the top-up amount, the higher the percentage of additional Happy Gold you get. Here’s how much Happy Gold you get when you top-up.</p>
        <table>
          <tr class="s2-title" >
            <td style="background:#DCEDC8;width:40%;">Range</td>
            <td style="background:#BBDEFB;width:30%;">Accumulated Amount</td>
            <td style="background:#D1C4E9;width:30%;">Percentage of Reward</td>
          </tr>
          <tr class="s2-text" v-for="(item, index) in silverPolice" :key="index">
            <td >{{item.range}}</td>
            <td>
              <span v-for="(item1, in1) in item.message" :key="in1">{{item1[0]}}</span>
            </td>
            <td>
              <span v-for="(item2, in2) in item.message" :key="in2">{{item2[1]}}</span>
            </td>
          </tr>
        </table>
        <p class="s2-p2">All Happy Gold E-cash  can be redeemed for the booking via HappyEasyGo.com</p>
        <p class="s2-p-title">Pay <span>Less</span> with Happy Gold</p>
        <ul class="s2-more">
          <li>
            <h5><span></span>More Savings</h5>
            <p>Maximum <span style="color:#D8A630;">{{maxSilverP}}%</span> cash reward when you top-up your account with Happy Gold.</p>
          </li>
          <li>
            <h5><span></span>Quicker Payments</h5>
            <p>The order amount can be paid in full using Happy Gold, and it only takes a moment.</p>
          </li>
          <li>
            <h5><span></span>No Waiting</h5>
            <p>Instant refund in case of ticket cancellation or non-issuance of ticket due to any other reason.</p>
          </li>
        </ul>
        <div class="btn flex content-center">
          <a class="rn-btn" v-if="isShowBtn" href="javascript:" @click="$router.push('/top-up')">Top-up Now</a>
        </div>
      </div>
      <div class="section3">
        <div class="s3-top flex space-between align-items-center" >
          <h2 class="sp">About the top up</h2>
          <!-- <i class="iconfont icon-emptydown" :class="{'icon-active':list[0].flag}"></i> -->
        </div>
        <div class="topUp">
          <h4>
            How to TOP-UP Happy Gold Wallet and Get extra Reward
          </h4>
          <div class="list flex flex-start align-items-center">
            <div class="ico">
              <img :src="require('../../assets/images/recharge/icon-6.png')" alt="">
            </div>
            <div class="text">
              <p>
                Sign up/sign in your account on Happyeasygo.com.
              </p>
            </div>
          </div>
          <div class="list flex flex-start align-items-center">
            <div class="ico">
              <img :src="require('../../assets/images/recharge/icon-7.png')" alt="">
            </div>
            <div class="text">
              <p>
                Choose Happy Wallet in your Account Center and select Happy Gold. </p>
            </div>
          </div>
          <div class="list flex flex-start align-items-center">
            <div class="ico">
              <img :src="require('../../assets/images/recharge/icon-8.png')" alt="">
            </div>
            <div class="text">
              <p>
                Click on Top-Up Button and transfer money in your Happy Gold Wallet.
              </p>
            </div>
          </div>
          <div class="list flex flex-start align-items-center">
            <div class="ico">
              <img :src="require('../../assets/images/recharge/icon-9.png')" alt="">
            </div>
            <div class="text">
              <p>
                Finish the payment process as it guides.
              </p>
            </div>
          </div>
          <div class="list flex flex-start align-items-center">
            <div class="ico">
              <img :src="require('../../assets/images/recharge/icon-10.png')" alt="">
            </div>
            <div class="text">
              <p>
                The Reward will be credited in your Happy Gold Wallet after one hour of successful l completion of the Top-up.
              </p>
            </div>
          </div>
          <div class="list flex flex-start align-items-center">
            <div class="ico">
              <img :src="require('../../assets/images/recharge/icon-15.png')" alt="">
            </div>
            <div class="text">
              <p>
                The user is intimated by an email by HappyEasyGo.</p>
            </div>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>

    <div class="section4">
      <h2>Total Amount of Reward</h2>
      <p>
        The total amount of reward depends only on the amount of money the HappyGold wallet is recharged with. </p>
      <p>
        <strong>Example:</strong> If you recharge the Happy Gold Wallet with Rs5000, you will receive Rs 50 E-cash as reward Or 5000e-cash
        will be rewarded into HappyGold Wallet if recharged with Rs500,000.
      </p>
    </div>
    <div class="section5">
      <div class="s5-top flex space-between align-items-center" @click="showAndHideDetails(0)">
        <h2 class="sp">FAQS</h2>
        <i class="iconfont icon-emptydown" :class="{'icon-active':termsAndFaq[0].flag}"></i>
      </div>
      <div v-show="termsAndFaq[0].flag">
        <div class="list">
          <h2>What is Happy Gold?</h2>
          <div class="text">
            <p>
              Happy gold is a kind of e - cash given by HappyEasyGo to its Users under our Happy Wallet Program and it has no usage limit
              or expiry date.
            </p>
          </div>
        </div>
        <div class="list">
          <h2>What is the Happy Gold Top-up Reward?</h2>
          <div class="text">
            <p>
              Happy Gold Top-up Reward is a programme by HappyEasyGo wherein users get additional e-cash credited to their Happy Wallet when they recharge their account.
            </p>
          </div>
        </div>
        <div class="list">
          <h2> How can I get the top-up reward?</h2>
          <div class="text">
            <p>
              Additional Happy Gold is credited to the account instantly on recharging the account. Simply, top-up your account with Happy Gold and get extra money. The additional Happy Gold you get varies with the top-up amount and the total amount of top-ups done in the past. 
            </p>
          </div>
        </div>
        <div class="list">
          <h2>How can I use the top-up reward?</h2>
          <div class="text">
            <p>
              Your top-up reward has been included in your balance of Happy Gold account. The reward is used just as your own credits when
              you book any flights via Happyeasygo.com.
            </p>
          </div>
        </div>
        <div class="list">
          <h2>When will the top-up reward be due?</h2>
          <div class="text">
            <p>
              It will never expire until you use it up.
            </p>
          </div>
        </div>
        <div class="list">
          <h2> Why doesn’t the money I recharged show in my account ?</h2>
          <div class="text">
            <p>
              Because there is some time difference on your bank transferring the money to HappyEasyGo bank account. Once HappyEasyGo bank
              account receives your money and we’re in sure of your payment, we will send you the confirmation email immediately.
              Therefore, the total value of your account will show up in no more than 1 hour.
            </p>
          </div>
        </div>

        <div class="list">
          <h2> What is the expiry of Top –up Reward ?</h2>
          <div class="text">
            <p>
              There is no expiry of Top-up Reward.
            </p>
          </div>
        </div>

        <div class="list">
          <h2> When does the Top-up Reward show in the user’s account ?</h2>
          <div class="text">
            <p>
              The Reward amount is reflected in user’s HappyGold wallet in an hour’s time and also will be intimated by an email.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="terms">
      <div class="s6-top flex space-between align-items-center" @click="showAndHideDetails(1)">
        <h2 class="sp">Terms and Conditions</h2>
        <i class="iconfont icon-emptydown " :class="{'icon-active':termsAndFaq[1].flag}"></i>
      </div>
      <div v-show="termsAndFaq[1].flag">
        <div class="list">
          <div class="text">
            <p>
              The Happy Gold Top- Up Reward Program is an reward scheme by HappyEasyGo for the registered users only who Topup their Happy
              Gold Account at Happy EasyGo.com. The scheme startd from 4 Jan 2018.</p>
          </div>
        </div>
        <div class="list">
          <div class="text">
            <p>
              It is mandatory to Signup/ login up to avail the Top up Reward for booking the flights. The users details would be absolutely
              safe with HappyEasyGo. </p>
          </div>
        </div>
        <div class="list">
          <div class="text">
            <p>
              The total Happy Gold received on topping-up your account depends on the top-up amount and the total amount of top-ups done in the past. 
            </p>
          </div>
        </div>
        <div class="list">
          <div class="text">
            <p>
              HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of these terms and conditions,
              or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior
              notice. </p>
          </div>
        </div>
        <div class="list">
          <div class="text">
            <p>
              HappyEasyGo has the sole right to decide on the amount and the eligibility of the Top-up Reward Program and also reserves
              the right to cancel the reward in case of fraudulent bookings. </p>
          </div>
        </div>
        <div class="list">
          <div class="text">
            <p>
              HappyEasyGo would like to contact its registered users for its promotional activities or feedback during the course of the
              HappyEasyGO Top-up Reward Program. </p>
          </div>
        </div>
        <div class="list">
          <div class="text">
            <p>
              All other standard terms and conditions available at HappyEasyGo.com shall apply. </p>
          </div>
        </div>
        <div class="list">
          <div class="text">
            <p>
              Any disputes arising out of this offer shall be subject to the exclusive jurisdiction of competent courts in Gurgaon, Haryana,
              India. </p>
          </div>
        </div>
      </div>
    </div>
    <div class="share" v-show='false'>
      <h2 class="yellow">Share this Offer</h2>
      <div class="ico flex space-between">
        <img :src="require('../../assets/images/cashback/icon-12.png')" alt="">
        <img :src="require('../../assets/images/cashback/icon-13.png')" alt="">
        <img :src="require('../../assets/images/cashback/icon-14.png')" alt="">
      </div>
      <div class="input-group">
        <div class="list flex space-between">
          <input type="text" placeholder="Enter your email">
          <a href="javascript:">Send</a>
        </div>
        <div class="list flex space-between">
          <input type="text" placeholder="https://www.happyeasygo.com/">
          <a href="javascript:">Copy</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "components/head/head.vue";
import { Toast } from "mint-ui";
import { User } from "models/user";
import { CookieUtil } from "models/utils";
import { DomainManager } from 'config/DomainManager';
import { AppBridge } from 'models/appbridge/appbridge.js';
export default {
  components: {
    headTop
  },
  data() {
    return {
      mUrl: "",
      mAlt: "",
      mTitle: "",
      model: 0,
      list: [],
      maxSilverP:'',
      silverPolice:[],
      isShowBtn: true,
      isLogin:CookieUtil.hasItem("uuid"),
      termsAndFaq:[
        {id:0,flag:false},
        {id:1,flag:false},
      ]
    };
  },
  methods: {
    showAndHideDetails(who){
      this.termsAndFaq[who].flag = !this.termsAndFaq[who].flag;
    },
    getSilverPolice(){
      let url = DomainManager.getSilverEnough();
      this.$axios.get(url).then(res=>{
        if(res.code == 200){
          this.silverPolice = res.data;
          let arr = [];
          res.data.forEach((e, i)=>{
            e.message.forEach((e1, i1)=>{
              arr.push(parseInt(e1[1]));
            })
          });
          this.maxSilverP = Math.max.apply(null, arr);
        }else{
          Toast(res.msg)
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    checkType() {
      try {
        let typeA = typeof window.heg.getNativeSource() === "string"
          ? JSON.parse(window.heg.getNativeSource())
          : window.heg.getNativeSource();
        this.model = Number(typeA.deviceType) + 1;
      } catch (e) {
        this.model = 0;
      }
      this.getImg();
    },
    getImg() {
      let parmTop = "type=13&device="+ this.model+"&addr=rechargeint&businessType=1";
      User.advList(this, parmTop).then(res => {
          if (res.success && res.list.length >= 1) {
            this.list = res.list[0];
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
    getDate(nd) {
      if (nd) {
        var date = new Date(nd).toString();
        var d = nd.split("-")[2];
        var m = date.split(" ")[1];
        var y = nd.split("-")[0];
        return d + " " + m + " " + y;
      }
    }
  },
  async created() {
    this.isShowBtn = await AppBridge.getNativeSource(this);
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
    this.getSilverPolice();
  }
};
</script>
<style lang='less' scoped>
#rechargeint1{
  font-family: "PingFangSC";
  .sp {
    color: #0b9d78;
  }
  .header {
    background: #0b9d78;
    .title {
      font-size: 0.768rem;
      color: #fff;
    }
    .sp {
      opacity: 0;
    }
  }
  .container{height:auto;}
  .marTop {
    margin-top: 2rem;
  }
  .top {
    img {
      display: block;
      width: 100%;
    }
  }
  
  .section1 {
    padding: 0.4rem 0.68rem 1rem;
    background-color: #fff;
    ul li {
      padding: 0.4rem 0;
      border-bottom: 1px solid #ccc;
      img {
        width: 0.769rem;
        height: 0.769rem;
      }
      p {
        font-size: 0.68rem;
        color: #999;
        line-height: 0.769rem;
        padding-left: 0.4rem;
        span{margin-left:0.3rem;}
      }
    }
  }
  
  .section2 {
    padding:0 0.68rem;
    background-color: #fff;
    h2 {
      font-size: 0.726rem;
    }
    .s2-p1{
      font-size: 0.598rem;
      color: #666666;
      text-align: left;
      line-height: 0.894rem;
      margin: 0.64rem 0;
    }
    .s2-p2{
      font-size: 0.47rem;
      color: #999;
      text-align: left;
      line-height: 0.7rem;
      margin:0.425rem 0 0.64rem;
    }
    .s2-p-title{
      text-align: left;
      color: #333333;
      font-weight: bold;
      font-size: 0.726rem;
      line-height:0.854rem;
      padding-bottom: 0.425rem;
      border-bottom: 1px solid #CDCDCD;
      span{
        color:#D8A630;
        font-size: 1.068rem;
      }
    }
    table{
      td{
        font-size: 10px;
        color:#333;
        text-align: center;
        vertical-align: middle;
        span{
          line-height: 0.64rem;
        }
        span:last-child{
          width: 100%;
          border-top:1px solid #cdcdcd;
        }
      }
      .s2-title{
        td{
          height:1.916rem;
        }
      }
      .s2-title,.s2-text{
        border:1px solid #cdcdcd;
        td{
          height:1.6rem;
          border-left:1px solid #cdcdcd;
          line-height: 0.64rem;
        }
        span{
          vertical-align: middle;
        }
      }
    }
    .sp-span {
      color: #ffad3d;
    }
    .s2-more{
      text-align: left;
      li{
        h5{
          color:#333;
          font-size: 0.598rem;
          line-height: 0.726rem;
          margin: 0.64rem 0 0.425rem;
          span{
            vertical-align:15%;
            border-left:3px solid #333;
            border-right:3px solid #fff;
            border-top:3px solid #fff;
            border-bottom:3px solid #333;
            transform: rotate(-135deg);
            margin-right:0.3rem;
          }
        }
        p{
          color:#666;
          font-size: 0.598rem;
          line-height:0.894rem;
        }
      }
    }
    .font-bold {
      font-weight: 700;
      color: #0b9d78;
    }
    .btn{
      padding:1.28rem 0 0;
    }
    .rn-btn {
      color:#fff;
      width:5.98rem;
      height:1.495rem;
      line-height:1.495rem;
      background: #FFA032;
      font-size: 0.686rem;
      border-radius:3px;
    }
  }
  
  .section3 {
    position: relative;
    background-color: #fff;
    padding: 0.68rem 0;
    .s3-top{
      background: #eee;
      padding: 0.6rem 0.68rem;
    }
    h2 {
      font-size: 0.6rem;
      text-align: left;
    }
    h4 {
      font-size: 0.6rem;
      color: #666;
      font-weight: normal;
      text-align: left;
      padding: 0.5rem 0 0.2rem;
    }
    .line {
      width: 1px;
      background-color: #ffa033;
      position: absolute;
      left: 0.66rem;
      top: 2rem;
      z-index: 1;
    }
    .topUp {
      margin: 0 0.68rem;
      position: relative;
      .line {
        height: 13.3rem;
      }
    }
    .rewards {
      position: relative;
      .line {
        height: 3rem;
      }
    }
    .list {
      padding: 0.4rem 0;
      .ico {
        z-index: 2;
        img {
          width: 1.32rem;
        }
      }
      .text {
        p {
          font-size: 0.52rem;
          color: #999;
          text-align: left;
          padding-left: 0.4rem;
          line-height: 0.769rem;
        }
      }
    }
  }
  
  .section4 {
    padding: 0.6rem;
    background-color: #fff;
    h2 {
      font-size: 0.68rem;
      color: #666;
      text-align: left;
      padding: 0.4rem 0;
    }
    p {
      font-size: 0.52rem;
      color: #999;
      line-height: 0.769rem;
      margin: 0.4rem 0;
      text-align: left;
    }
  }
  
  .section5 {
    background-color: #fff;
    margin-top: 0.4rem;
    .s5-top{
      background: #eee;
      padding: 0.68rem 0.68rem;
    }
    h2 {
      font-size: 0.6rem;
      text-align: left;
    }
    .list {
      padding: 0 0.68rem;
      h2 {
        text-align: left;
        padding: 0.4rem 0 0.4rem 1rem;
        color: #666;
        background: url("../../assets/images/recharge/icon-11.png") left center
          no-repeat;
        background-size: 0.8rem;
      }
      .text {
        padding: 0.68rem;
        background-color: #fbfbfb;
        p {
          font-size: 0.52rem;
          color: #999;
          line-height: 0.769rem;
          text-align: left;
        }
      }
    }
    .iconfont{
      color:#999;
    }
    .icon-active{
      transform: rotate(180deg);
    }
  }
  
  .btn {
    background-color: #fff;
    padding: 1rem 0;
    a {
      height: 1.2rem;
      line-height: 1.2rem;
      border: 1px solid #ffa234;
      font-size: 0.52rem;
      color: #ffa234;
      text-align: center;
      border-radius: 0.2rem;
      padding: 0 0.2rem;
    }
  }
  
  .terms {
    margin-top: 0.4rem;
    background-color: #fff;
    .s6-top{
      background: #eee;
      padding: 0 0.68rem;
    }
    h2 {
      font-size: 0.6rem;
      height: 2rem;
      line-height: 2rem;
      text-align:left;
    }
    .list {
      h2 {
        text-align: left;
        padding: 0.4rem 0 0.4rem 1rem;
        color: #666;
        background: url("../../assets/images/recharge/icon-11.png") left center
          no-repeat;
        background-size: 0.8rem;
      }
      .text {
        padding: 0.68rem;
        background-color: #fbfbfb;
        p {
          font-size: 0.52rem;
          color: #999;
          line-height: 0.769rem;
          text-align: left;
        }
      }
    }
    .iconfont{
      color:#999;
    }
    .icon-active{
      transform: rotate(180deg);
    }
  }
  
  .share {
    padding: 0.68rem;
    margin-top: 0.4rem;
    background-color: #fff;
    h2 {
      font-size: 0.6rem;
      height: 2rem;
      line-height: 2rem;
    }
    .ico {
      padding: 0 2rem;
      img {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
    .input-group {
      padding: 0.6rem 0 1rem;
      .list {
        margin-top: 0.4rem;
        input {
          width: 80%;
          text-indent: 0.4rem;
          height: 1.2rem;
          line-height: 1.2rem;
          font-size: 0.6rem;
          border: 1px solid #eee;
        }
        a {
          display: block;
          width: 20%;
          height: 1.2rem;
          line-height: 1.2rem;
          text-align: center;
          background-color: #ffa033;
          color: #fff;
          font-size: 0.6rem;
        }
      }
    }
  }
  
  ::-webkit-input-placeholder {
    color: #ccc;
    font-size: 0.6rem;
    padding-left: 0.2rem;
  }
  
  ::-moz-placeholder {
    color: #ccc;
    font-size: 0.6rem;
    padding-left: 0.2rem;
  }
  
  :-moz-placeholder {
    color: #ccc;
    font-size: 0.6rem;
    padding-left: 0.2rem;
  }
}
</style>