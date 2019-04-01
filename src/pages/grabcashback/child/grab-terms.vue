<template>
  <div id="grab-terms">
    <head-top class="header">
			<i slot="left" class="iconfont icon-back"></i>
			<span slot="title" class="head-title">Terms &amp; Conditions</span>
			<i slot="right" class="sp iconfont"></i>
		</head-top>
    <div class="term-con">
      <div class="appTop" v-show="isShowBtn"></div>
      <h3 style="padding-top:1rem;">Grab Additional Cashback On Your Booking</h3>
      <p class="p-content" style="margin:0.534rem 0 0.769rem ; ">Download the latest version of HappyEasyGo Android or iOS app and invite your friends and family to help you earn additional cashback on every booking you make.</p>
      <h3>Terms &amp; Conditions</h3>
      <p></p>
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
          <p class="p-content">The amount of cashback a user can win and the number of people that can be invited varies with the booking amount. The cashback offer is independent of other offers, deals and rewards being offered on the HappyEasyGo website or mobile app.</p>
          <p class="p-content">A random cashback amount is credited every single time a friend helps. The total cashback amount will be credited to the account when all invited friends have helped.</p>
        </li>
        <li>
          <p class="p-title">4.Cashback Credit :</p>
          <p class="p-content">A random cashback amount will be credited instantly when a friend helps. The cashback amount will reflect in the account only after the order has been issued.</p>
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
</template>
<script>
import headTop from "components/head/head.vue";
import { AppBridge } from 'models/appbridge/appbridge.js';
export default {
  components:{
    headTop,
  },
  data(){
    return {
      isShowBtn:false,
    }
  },
  async created () {
    this.isShowBtn = await AppBridge.getNativeSource(this);
  }
}
</script>

<style lang="less" scoped>
#grab-terms{
  background:#fff;
  .term-con{
    margin:0 0.64rem;
    text-align: left;
  }
  .appTop{margin-top: 2.04rem;}
  h3{
    font-size: 0.685rem;
    color:#333;
    font-weight: bold;
    color: #111111;
    line-height: 1rem;
  }
  p{
    letter-spacing:0.3px;
    font-family: "SFCompactText-Light";
  }
  .p-title{
    font-size: 0.685rem;
    color: #111111;
    line-height:0.89rem;
    margin:0.769rem 0 0.534rem; 
  }
  .p-content{
    font-size: 0.598rem;
    line-height: 1rem;
    color: #111111;
  }
}
</style>
