<template>
  <div id="gameIntroduce">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back" ></i>
      <p slot="title" style="margin-left:-1.5rem;">Terms&amp;Conditions</p>
    </head-top>
    <div class="content" v-show="isShow">
      <div class="top" :class="{marTop: contentMargin}"></div>
      <section class="part1">
        <h5 style="margin-bottom:0.5rem;">HappyEasyGo 1<sup style="font-weight:normal;font-size:12px;">st</sup> Anniversary Celebration had ended.</h5>
        <h5>You can take part in the lottery and stand a chance to win amazing prizes. We are giving away several awesome free gifts and here’s what you can win:</h5>
        <ul class="prizeType">
          <li>Samsung Galaxy S8</li>
          <li>Free flight tickets</li>
          <li><span class="rs">Rs</span>500 discount voucher for flight bookings</li>
          <li>Happy Silver Random Amount : <span class="rs">Rs</span>1000(Max) ~ <span class="rs">Rs</span>5(Min)</li>
          <li>Zoomcar voucher worth <span class="rs">Rs</span>1000 </li>
          <li>Treebo voucher for flat 33% off on your hotel booking</li>
          <li>Myntra voucher worth <span class="rs">Rs</span>200 (Valid for select styles with a minimum order of <span class="rs">Rs</span>999)</li>
          <li>Xoxoday voucher for 25% discount on all activities and experiences (Applicable on minimum bookings of <span class="rs">Rs</span>1000)</li>
          <li>Netmeds voucher for 20% discount on all medicines and 20% Super Cash </li>
          <li>Gaana Plus voucher for 70% discount on the Gaana APP</li>
        </ul>
        <ul class="getChances">
          <h5>Don’t win a lottery in the first go? No worries. We give you another chance to win. You can earn it by:</h5>
          <li>Signing in on the HappyEasyGo app or website (get one chance daily on signing in).</li>
          <li>Downloading the HappyEasyGo app and signing up.</li>
          <li>Booking flight tickets during the anniversary celebration.</li>
          <li>First synchronising your contacts under the referral program on the HEG app.</li>
          <li>Getting your friend to sign up on the HEG app using your referral code.</li>
          <li>Having a friend you referred book a flight ticket with us.</li>
        </ul>
      </section>
      <section class="part2" id="anchor">
        <h5>Prizes T &amp; C</h5>
        <ul>
          <li v-for="item in terms" :key="item.id" :id="item.ids">
            <p class="item-title" @click="showDetails(item.id)"><span >{{item.title}}</span><span></span>
              <i class="iconfont " :class='item.show?"icon-arrow":"icon-emptydown"'></i>
            </p>
            <div class="terms-details" v-show="item.show">
              <p v-for="(it,index) in item.text" :key="index"><span style="font-size:1.2rem;vertical-align:middle;margin-right:0.3rem;">·</span>{{it}}</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import headTop from '../../components/head/head.vue';
import {Toast,Indicator} from 'mint-ui';
import {AppBridge} from '../../models/appbridge/appbridge.js';
export default {
  components:{
    headTop,
  },
  data(){
    return{
      model: 0,
      contentMargin: true,
      isShow:true,
      terms:[
        {id:0,ids:'Samsung',title:'Samsung S8',show:false,text:[
          'Please fill your information in the form, so that we can deliver the prize to you.',
          'Please fill your address and contact info within 5 working days at the end of Anniversary Campaign, or we will regard you give it up..',
          'After submission of this form, we will start to deliver it within 5 working days.',
          "The image shown here is indicative only. The actual product may differ.",
        ]},
        {id:1,ids:'Air',title:'Free Air Tickets Coupons',show:false,text:[
          'Regarding free flight ticket reward, convenience fee and tax cannot be deducted. Winner needs to pay convenience fee and tax and apply a customized coupon code to get it.',
          'This free flight tickets coupon code is valid for flight tickets valued no more than Rs.5000 on HappyEasygo App only, from 1st August to 30th September.',
          'It can be used once for one winner.'
        ]},
        {id:2,ids:'HappyEasyGo',title:'HappyEasyGo Coupons',show:false,text:[
          "You can check this customized Rs.500 coupon in My Coupons’ page.",
          'It will be valid from 1st Aug to 30th Sept.'
        ]},
        {id:3,ids:'Silver',title:'Happy Silver',show:false,text:[
          "You can check HappySilver in My wallet’ page."
        ]},
        {id:4,ids:'ZOOMCAR',title:'ZOOMCAR Coupons',show:false,text:[
          'You can redeem ZoomCar coupon discount at its official website: https://goo.gl/f4Eyyo Maximum discount of Rs 1000 or 20% whichever is lower.',
          'validity till 30th Sep 2018.',
          'A fully refundable security deposit will be charged at time of booking.',
          'Only valid on bookings made through Zoomcar website and iOS/Android app.',
          'Discount applicable only on original reservation charges (not applicable on excess Km, late return fee, or other fees/charges).',
          'Offer not applicable on blackout days.'
        ]},
        {id:5,ids:'TREEBO',title:'TREEBO Coupons',show:false,text:[
          'You can redeem Treebo coupon discount at its official website: https://goo.gl/o5CyPi.',
          'No minimum booking amount to qualify for discount.',
          'No maximum limit on discount.',
          'Offer is valid for bookings made till 31st October 2018 for stay dates till 31st October 2018.',
          'Code redeemable only on https://goo.gl/o5CyPi',
          "Cancellation charges will be applicable as per the Treebo policy.",
          "This offer cannot be combined with any other offer currently applicable on Treebo website & Android app.",
          "All bookings are subject to availability.",
          "Treebo reserves the right to discontinue the offer without any prior notice.",
          "All Treebo Hotel policies apply",
        ]},
        {id:6,ids:'MYNTRA',title:'MYNTRA Coupons',show:false,text:[
          'You can redeemMyntra coupon discount at its official website: https://goo.gl/t1ci1T.',
          'Get Rs 200 off on the Myntra app or website on spends of INR 999 or more valid till 31st Aug 2018.',
          'Valid only on a selected catalogue for HEG customers – https://www.myntra.com/eors18-special-offers?utm_source=heg&utm_medium=heg.',
          'The code can be used only once per Customer.',
          'This offer is not valid at any of the alliance partner retail outlets/stores.',
          'Multiple coupons cannot be clubbed in a single order.',
          'The balance amount, after the discount is availed, will have to be paid by the customer at the time of purchase.',
          "In no case, whatsoever, can the discount amount be refunded, encashed or partly encashed Myntra's Return and Exchange Policy offers you the option to return or exchange items purchased on Myntra's application within 30 days of the receipt. In case of return of the purchased item, please refer to the “Return Policy” on the website/ app or call Myntra Customer Care."
        ]},
        {id:7,ids:'XOXODAY',title:'XOXODAY Coupons',show:false,text:[
          'You can redeem XOXODay coupon discount at its official website: https://goo.gl/CxGPQh.',
          'Offer valid till 30th Sep 2018.',
          'Get 25% off on all the activities listed on Xoxoday.',
          'The maximum discount amount is Rs.1000.',
          'Offer can be used once per customer.Offer cannot be clubbed with any other offers and is not transferable.',
          'All other T&C shall be applicable as mentioned on the merchant website.',
          'No cash component can be given as a refund.',
          'Offer cannot be clubbed with any other offers and is not transferable.',
          'All other T&C shall be applicable as mentioned on the merchant website.',
          'No cash component can be given as a refund.'
        ]},
        {id:8,ids:'NETMED',title:'NETMEDS Coupons',show:false,text:[
          "You can redeem NETMED coupon discount at its official website:https://goo.gl/mHJQ9d",
          '40% OFF on Prescription Medicines (Flat 20% discount and 20% NMS Supercash back) to the clients of the Beneficiaries, based upon the physician’s prescription.',
          'The Flat 20% discount is valid on any order value of Prescription Medicines only.',
          'Coupon is valid till 31st Dec, 2018.',
          'A Flat 20% of the Ordered value of Prescription Medicines would be credited as NMS SuperCash, to the NMS Wallet once the order is delivered only if the unique coupon code is used. This would be applicable only for Prepaid Orders.',
          ' The maximum SuperCash amount is Rs.3000 per transaction and is valid for 45 days from the date it was credited.',
          'The NMS SuperCash wallet amount can be redeemed for a maximum of 30% of total value of prescription medicines in your cart in one transaction. However, you can use the remaining wallet amount in subsequent transactions placed within the validity period of your NMS SuperCash wallet amount.',
          "NO other coupon code/e-voucher discounts or promotional offers can be applied for the orders where the NMS SuperCash wallet amount is redeemed.",
          "The NMS SuperCash wallet amount can be redeemed on all medicines and on fully Pre-paid orders only (not valid if partly paid by COD). Note: COD orders are not eligible for redemption of the cashback.",
          "All disputes arising out of or in connection to this scheme are subject to exclusive jurisdiction of the courts in Chennai only."
        ]},
        {id:9,ids:'GAANA',title:'GAANA Plus Coupons',show:false,text:[
          "You can use your Gaana Plus coupon to avail a flat discount of 70 percent on 1 year subscription on the Gaana Android or iOS app.",
          "One customer can use the code only once.",
          "The code is valid till 30th April, 2019 and only for Indian citizens.",
        ]},
      ],
    }
  },
  async created(){
    this.terms.forEach(e =>{
      e.show = false;
    })
    Indicator.open({
      spinnerType: 'fading-circle'
    });
    this.contentMargin = await AppBridge.getNativeSource(this);
    this.getInfo();
  },
  updated(){
    if(this.$route.query.anchor){
        let anchor = document.querySelector("#"+this.$route.query.who);
        let mtop = document.querySelector('.marTop')?document.querySelector('.marTop').offsetTop:0;
        document.documentElement.scrollTop = anchor.offsetTop - mtop;
        this.terms.forEach((e,i)=>{
          if(e.ids == this.$route.query.who){
            this.terms[i].show = true;
          }
        })
      this.$route.query.who = "anchor";
    }
  },
  methods:{
    showDetails(id){
      this.isFold = !this.isFold;
      this.terms[id].show = !this.terms[id].show;
    },
    getInfo(){
      this.isShow = false;
      setTimeout(()=>{
        this.isShow = true;
        Indicator.close();
      },500);
    }
  } 
}
</script>
<style lang="less" scoped>
#gameIntroduce{
  .header {
    position: fixed!important;
    background: #0b9d78;
    i {
      padding: 0 0.64rem;
    }
  }
   .marTop{
    margin-top: 2rem;
  }
  .content{
    text-align: left;
    padding-bottom:1.5rem;
    .part1{
      padding:0.5rem 0.68rem;
      ol{list-style-type: none;}
      ul{list-style-type: disc;}
      h5{
        font-size:0.58rem;
        font-weight:bold;
        line-height:0.8rem;
        letter-spacing:-0.5px;
      }
      .prizeType{
        font-size:0.58rem;
        padding:0.5rem 0 ;
        line-height:0.8rem;
        li{
          margin-left:0.7rem;
          line-height: 1rem;
        }
      }
      .getChances{
        font-size:0.58rem;
        color:#333;
        font-weight: bolder;
        li{
          font-weight: normal;
          margin-left:0.7rem;
          margin-top:0.2rem;
          line-height: 1rem;
        }
      }
    }
    .part2{
      h5{
        height:1.2rem;
        line-height:1.2rem;
        font-size: 0.68rem;
        padding-left:0.68rem;
        background: #D8D8D8;
        border-bottom: 1px solid #979797;
      }
      ul{
        li{
          i{float:right;}
          color:#333;
          padding:0 0.68rem 0.5rem;
          font-size: 0.58rem;
          border-bottom: 1px solid #979797;
          .item-title{padding-top: 0.5rem;}
          .item-title span{font-weight: bold;margin-right:0.3rem;}
          .terms-details{
            line-height:1rem;
            padding:0.5rem 0 0 0.7rem;
            position: relative;
            span{
              position: absolute;
              left: 0;
            }
          }
        }
      }
    }
  }
}
</style>
