<template>
  <div class="container">
    <div class="orderInfo common marB15" :class="{marTop:showHeader}">
      <h2 class="title">
        Order Information
      </h2>
      <div class="wrap grayDark ">
        <div class="flex space-between tr">
          <span class="tr-title">OrderID</span>
          <span class="tr-value">{{order.orderId}}</span>
        </div>
        <div class="flex space-between tr">
          <span class="tr-title">Booking Date</span>
          <span class="tr-value">{{order.bookDateStr}}</span>
        </div>
        <div class="flex space-between tr">
          <span class="tr-title">Payment Method</span>
          <span class="tr-value">{{order.payWayStr}}</span>
        </div>
        <div class="flex">
          <span class="price-item">PRICE BREAKUP</span>
        </div>
        <div class="flex space-between tr">
          <span class="tr-title">Price ({{order.rooms}}{{order.rooms > 1 ? ' rooms' : ' room'}} &times; {{order.nights}} {{order.nights >1 ? ' nights': ' night'}})</span>
          <span class="tr-value"><i class="rs">Rs.</i> {{order.priceObj.basePrice || 0 | formatDate}}</span>
        </div>
        <div class="flex space-between tr">
          <span class="tr-title">GST</span>
          <span class="tr-value"><i class="rs">Rs.</i> {{order.priceObj.gst || 0  | formatDate}}</span>
        </div>
        <div class="flex space-between tr">
          <span class="tr-title">Service Charge</span>
          <span class="tr-value"><i class="rs">Rs.</i> {{order.priceObj.serviceCharge || 0  | formatDate}}</span>
        </div>
        <div class="flex space-between tr">
          <span class="tr-title">Promo Discount</span>
          <span class="tr-value">-<i class="rs">Rs.</i> {{order.priceObj.disCount || 0  | formatDate}}</span>
        </div>
        <div class="flex space-between tr" v-if="order.coupon">
          <span class="tr-title">Coupon</span>
          <span class="tr-value">-<i class="rs">Rs.</i> {{order.coupon  | formatDate}}</span>
        </div>
        <div class="flex space-between price">
          <span class="fontSz12 fontB">Total ({{order.rooms}}{{order.rooms > 1 ? ' rooms' : ' room'}} &times; {{order.nights}} {{order.nights >1 ? ' nights': ' night'}})</span>
          <div>
            <span class="fontSz18 colorDan fontB text-left"><i class="rs">Rs.</i> {{order.price | formatDate}}</span>
          </div>
        </div>
        <div class="status-wrap">
          <a href="javascript:;" @click="ifPay(order.status)" class="payBtn" :class="btnClass[order.status]">{{status[order.status]}}</a>
        </div>
      </div>

    </div>
    <div class="checkInfo common marB15">
      <h2 class="title">
        Check-In Information
      </h2>
      <div class="wrap">
        <div class="hotel text-left ">
          <p class="fontSz16 fontB">
          {{order.hotelName}}
          </p>
          <p class="star">
            <img :src="require('assets/images/hotel/icon-star-normal.png')" v-for="i in order.starRating" alt="star" :key="i" width="10">
          </p>
          <p class="fontSz12 grayDark addr">
           Area: {{order.addr}}
          </p>
        </div>
        <div class="room">
          <h3 class="text-left">{{order.ratePlanName}} {{order.breakfastStr}}</h3>
          <p class="text-left gray" v-if="order.cancelObj && !order.cancelObj.cancelType">Non Refundable</p>
          <div class="flex space-around dur" v-if="order.checkInObj">
            <div class="checkIn">
              <p class="marB10 grayDark">Check-In</p>
              <div class="flex">
                <span class="day">
                  {{order.checkInObj.date}}
                </span>
                <div>
                  <p class="date">{{order.checkInObj.month + ', '+ order.checkInObj.year}}</p>
                  <p>{{order.checkInObj.week}}</p>
                </div>
              </div>
            </div>
            <div class="checkIn">
              <p class="marB10 grayDark">Check-Out</p>
              <div class="flex">
                <span class="day">
                  {{order.checkOutObj.date}}
                </span>
                <div>
                  <p class="date">{{order.checkOutObj.month + ', '+ order.checkOutObj.year}}</p>
                  <p>{{order.checkOutObj.week}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="guestInfo common">
      <h2 class="title">
        Guest Details
      </h2>
      <div class="wrap">
        <h3 class="text-left">Contact Info:</h3>
        <div class="flex space-between tr">
          <span class="grayDark">Name</span>
          <span class="grayDarker">{{order.contactName}}</span>
        </div>
        <div class="flex space-between tr">
          <span class="grayDark">Email</span>
          <span class="grayDarker">{{order.contactObj && order.contactObj.email}}</span>
        </div>
        <div class="flex space-between tr marB10">
          <span class="grayDark">Ph</span>
          <span class="grayDarker">+{{order.contactObj && order.contactObj.contactNumber}}</span>
        </div>
        <h3 class="text-left marB10">Guests Info:</h3>
        <div v-if="order.orderFrom > 1">
          <div class="flex space-between" v-for="val in order.guestArr" :key="val.id">
            <span>Room{{val.id}}</span>
            <span>
              <!-- {{val.adults ? val.adults + (val.adults >1 ? 'Adults' : 'Adult') : ''}}{{val.children ? val.children + (val.children >1 ? 'children' : 'child') : ''}} -->
            {{val.guests}} {{val.guests > 1 ? 'Guests' : 'Guest'}}
            </span>
          </div>
        </div>
        <div v-else-if="order.contactObj">
          <div class="text-left pcTravel" v-for="val in order.contactObj.contacts" :key="val.id">
            <div class="grayDark">Room{{val.id}}</div>
            <!-- <div class="flex space-between" style="flex-wrap: wrap"> -->
              <div class="grayDarker pcName" v-for="(travelerObj, key) in val.contact" :key="key">
                {{travelerObj.firstName +' '+ travelerObj.lastName}}
              </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="common" v-if="!!order.supplierConfirmId">
      <h2 class="title">
        Confirmed Number
      </h2>
      <div class="wrap text-left" style="padding:15px;">
        {{order.supplierConfirmId}}
      </div>
    </div>
    <div class="noteInfo">
      <p class="fontSz12">If the information is incorrect, please inform the <br>
      <span  class="colorPri de" @click="$router.push('/contact')">customer service</span> in time.</p>
    </div>
    <div v-if="order.status == 1" class="fixedB">
      {{expireTextTitle}} 
      <span class="fontSz18">{{expireMinute}}</span>
    </div>
    <mt-popup v-model="failPop.show" popup-transition="popup-fade" modal="true" closeOnClickModal="true">
      <failure>
        <div slot="head">Order details Unavailable</div>
        <p slot="content">{{failPop.msg}}</p>
        <!-- <mt-button @click="failPop.show=false" slot="btn" class="btn" type="default">OK</mt-button> -->
      </failure>
    </mt-popup>
  </div>
</template>
<script>
import { DomainManager } from "config/DomainManager";
import { Indicator, Popup, Toast } from "mint-ui";
import { CookieUtil } from "models/utils";
import { AppBridge } from 'models/appbridge/appbridge.js';
import failure from "pages/failure/failure.vue";
import {TimeFormatUtil} from 'models/utils';

const status = {
  1: "Pay",
  2: "Pending",
  3: "Confirmed",
  4: "Completed",
  5: "Canceled",
  6: 'Canceled',
  7: 'Canceled',
  8: 'Canceled',
  9: 'Pay',
  10: 'Pending',
  11: 'Pending',
  12: 'Pending',
  13: 'Pending',
  14: 'Pending',
  15: 'Pending',
  16: 'Canceled',
  17: 'Pending'
};
const btnClass = {
  1: "bgWarn",
  2: "",
  3: "nobtn",
  4: "bgGrey",
  5: "bgGrey",
  6: 'bgGrey',
  7: 'bgGrey',
  8: 'bgGrey',
  9: 'bgWarn',
  16: 'bgGrey'
};
const payWay = {
  1: "Credit card",
  2: "Debit card",
  3: "Net banking",
  4: "Mobile Wallet",
  5: "EMI",
  6: "UPI",
  7: "Paypal"
};
const {formatDatestrToObj} = TimeFormatUtil;

export default {
  components:{
    failure
  },
  props: {
    orderId: [String, Number],
    phoneNo: [String, Number]
  },
  data() {
    return {
      email:'',
      expireMinute: '',
      expireTextTitle: 'Expire In:',
      status: status,
      showHeader:false,
      btnClass: btnClass,
      isLogin: CookieUtil.hasItem("uid"),
      failPop: {
        show: false,
        msg: ""
      },
      order: {
        coupon:null,
        orderTime: 0,
        checkInObj: null,
        checkOutObj: null,
        guestArr: null,
        contactName: "",
        addr: "",
        breakfastStr: "",
        orderId: "",
        dataKey: "",
        payWayStr: "",
        contactObj: null,
        cancelObj: null,
        statusStr: "",
        bookDateStr: "",
        price: "",
        rooms: "",
        nights: "",
        priceObj: {},
        supplierConfirmId:'',
        ratePlanName:'',
        starRating: 0,
        orderFrom: 1
      }
    };
  },
  
  async created() {
    if(this.$route.query.email){
      this.email = this.$route.query.email;
    }
    this.showHeader = await AppBridge.getNativeSource(this);
    let id = await AppBridge.getNativeUserid(this);
    window.onReceviedUuid = this.onReceviedUuid;
    if(id && id != '0'){
      CookieUtil.removeItem("uid");
      CookieUtil.setItem("uid",id);
      this.isLogin = true;
    }else{
      if(CookieUtil.hasItem("uid")){
        this.isLogin = true;
      }else{
        CookieUtil.removeItem("uid");
        this.isLogin = false;
      }
    }
    if(!this.isLogin && !this.phoneNo){
      AppBridge.nativeSignIn("in", this);
    }else{
      this.getDetail();
    }
  },
  methods: {
    countExpireMinute(){
      if(this.order.status != 1) return;
      let sec = 3600 - Math.floor((new Date().getTime() - this.order.orderTime)/1000);
      if(sec < 0) {
        this.expireTextTitle = 'Expired'
        return;
      };
      this.expireMinute = TimeFormatUtil.transferHourAndMinute(sec--)
      let timer = window.setInterval(() => {
        this.expireMinute = TimeFormatUtil.transferHourAndMinute(sec --);
        if(sec < 0){
          window.clearInterval(timer);
          this.expireMinute = '';
          this.expireTextTitle = 'Expired'
        }
      }, 1000);
    },
    ifPay(status){
      if(status == 1 || status == 9){
        location.href=`https://m.happyeasygo.com/hotel/payment/${this.order.orderId}/${this.order.contactObj.contactNumber}/${this.order.contactObj.email}`;
      }
    },
    getDetail() {
      Indicator.open({ spinnerType: "fading-circle" });
      let url = this.phoneNo
        ? `${DomainManager.getHotelDetailUnlogin()}?bookingNo=${this.orderId}&contactNumber=${this.phoneNo}&email=${this.email}`
        : `${DomainManager.getHotelDetail()}?bookingNo=${this.orderId}`;
      this.$axios.get(url).then(data => {
        Indicator.close();
        this.order.addr = data.address;
        this.order.orderId = data.bookingNo;
        this.order.contactObj = data.contactInfo;
        this.order.contactName =
          data.contactInfo.call +
          " " +
          data.contactInfo.firstName +
          " " +
          data.contactInfo.lastName;
        this.order.guestArr = data.contactInfo.contacts.map(val => ({
          id: val.id,
          adults: val.contact.filter(v => !v.age).length,
          children: val.contact.filter(v => v.age).length,
          guests: val.contact.length,
        }));
        this.order.coupon = data.coupon;
        this.order.orderFrom = data.orderFrom;
        this.order.orderTime = data.orderTime;
        this.order.priceObj = JSON.parse(data.prviceDate);
        this.order.payWayStr = payWay[data.payWay] || "";
        this.order.cancelObj = JSON.parse(data.cancel);
        this.order.statusStr = status[data.status];
        this.order.breakfastStr = data.withBreakfest ? "(With breakfast)" : "";
        this.order.checkInObj = TimeFormatUtil.formatDatestrToObj(
          data.checkInDate.slice(0, 10).replace(/-/g, "/")
        );
        this.order.checkOutObj = TimeFormatUtil.formatDatestrToObj(
          data.checkOutDate.slice(0, 10).replace(/-/g, "/")
        );
        const bookDateObj = TimeFormatUtil.formatDatestrToObj(
          data.orderTimeStr.slice(0, 10).replace(/-/g, "/")
        );
        this.order.bookDateStr =
          bookDateObj.date + " " + bookDateObj.month + ", " + bookDateObj.year;
        this.order.price = data.price;
        this.order.rooms = data.room;
        this.order.nights = data.nights;
        this.order.hotelName = data.hotelName;
        this.order.status = data.status;
        this.order.stayin = JSON.parse(data.stayin);
        this.order.supplierConfirmId = data.supplierConfirmId;
        this.order.ratePlanName = data.ratePlanName;
        this.order.starRating = Number(data.starRating || 0);
        this.countExpireMinute();
      }).catch(err =>{
        Indicator.close();
        this.failPop.show = true;
        this.failPop.msg = err.message;
      })
    },
    onReceviedUuid(){
      this.isLogin = true;
      return "1";
    }
  }
};
</script>
<style lang="less" scoped>
@import "~assets/less/theme.less";
@baseFontSize: 46.875;
.px2rem(@name, @px) {
  @{name}: @px / @baseFontSize * 1rem;
}
.text-left {
  text-align: left;
}
.fontB {
  font-weight: bold;
}
.marB10 {
  margin-bottom: 10px;
}
.marB15 {
  margin-bottom: 15px;
}
.container {
  font-size: 14px;
  background-color: #eee;
}
.de {
  text-decoration: underline;
}
.common {
  .title {
    .px2rem(height, 60);
    .px2rem(line-height, 60);
    background-color: #f9f9f9;
    color: @primary-color;
    text-align: left;
    padding: 0 30 / @baseFontSize*1rem;
  }
  .wrap {
    background-color: #fff;
    padding: 0 30 / @baseFontSize*1rem;
    .tr {
      font-size:12px;
      padding: 12px 0 5px;
      border-bottom: 1px solid #cdcdcd;
      .tr-value{
        color: #333;
      }
    }
  }
}
.pcTravel{
  padding-top: 4px;
  &+.pcTravel{
    border-top: 1px solid #ccc;
  }
  .pcName{
    width: 50%;
    padding: 4px 0;
    // &:nth-child(2n){
    //   text-align: right;
    // }
    &:nth-child(2){
      margin-top:6px;
    }
    
  }
}
.marTop{margin-top: 2rem;}
.orderInfo {
  // margin-top: 2rem;
  .price {
    padding: 15px 0;
  }
  .status-wrap{
    padding-bottom: 25px;
  }
  .payBtn {
    .px2rem(width, 530);
    .px2rem(height, 60);
    .px2rem(line-height, 60);
    .px2rem(font-size, 32);
    background-color: @primary-color;
    color: #fff;
    &.bgGrey {
      background-color: @gray;
    }
    &.nobtn{
      background-color: #fff;
      color: @primary-color;
    }
    &.bgWarn {
      background-color: @warning-color;
    }
  }
  .price-item{
    font-size:11px;
    margin:10px 0 0;
    color: #999
  }
}
.checkInfo {
  .wrap {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .hotel {
    .star {
      padding-top: 5px;
      img {
        margin-right: 5px;
        width: 10px;
      }
    }
    .addr {
      .px2rem(width,520);
      border-bottom: 1px solid #cdcdcd;
      padding: 6px 0;
    }
  }
  .room {
    .dur {
      padding-top: 15px;
    }
    .day {
      // display: block;
      // .px2rem(height, 75);
      font-size: 26px;
      padding-right: 4px;
    }
    .date {
      padding: 2px 0;
    }
    h3 {
      padding: 4px 0;
    }
  }
}
.guestInfo {
  .wrap {
    padding-top: 10px;
    padding-bottom: 20px;
  }
}
.noteInfo {
  background-color: #f9f9f9;
  padding: 15px 0;
  p {
    line-height: 16px;
  }
}
.fixedB{
  width:100%;
  position: sticky;
  bottom:0;
  z-index: 100;
  color: @danger-color;
  padding: 15px 0;
  text-align:center;
  background-color:#fff;
  box-shadow: 0px -2px 3px #bbb;
}
</style>

