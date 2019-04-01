<template>
  <div class="wrapper book-page">
    <div v-show="isBookPage">
      <head-top class="header">
        <i slot="left" class="iconfont icon-back"></i>
        <span slot="title">{{heads.title}}</span>
        <img class="placeholder" slot="right" :src="heads.img" alt="">
      </head-top>
      <mt-popup v-model="showPopup" popup-transition="popup-fade" modal="true" closeOnClickModal="false">
        <failure>
          <div slot="head">Oops!</div>
          <div slot="content">
            <p>Fare or Seat(s) not available with the airline. </p>
            <p>Redirecting to Search Page...</p>
          </div>
          <mt-button @click="closePopup()" slot="btn" class="btn" type="default">Ok</mt-button>
        </failure>
      </mt-popup>
      <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <router-view class="animated"></router-view>
      </transition>
      <div class="container">
        <review-booking class="" @transShowFareRule="fareRule" :flightOrder="flightOrder" :flightInfos="flightInfos"></review-booking>

        <div class="book-traveller">
          <div class="title flex content-start align-items-center">
            <span class="title-icon">2</span>
            <span class="title-info">Traveller Details</span>
          </div>
          <p style="padding:10px 0;font-size:11px;background:#f8f8f8;"><span style="color:#d72227;margin-right:5px;">*</span>Please enter names as mentioned on your government ID proof.</p>
          <div class="traveller-wrapper d_jump">
            <div class="traveller-info" v-if="flightOrder!=null">
              <div class="traveller-tips flex space-between">
                <span class="traveller-tips-title">Traveller Information</span>
                <div class="traveller-tips-total">
                  <span v-if="flightOrder.adults.length > 1">
                    {{flightOrder.adults.length}}Adults
                  </span>
                  <span v-else>
                    {{flightOrder.adults.length}}Adult
                  </span>
                  <span v-if="flightOrder.children.length > 1">
                    {{flightOrder.children.length}}Children
                  </span>
                  <span v-else>
                    {{flightOrder.children.length}}Child
                  </span>
                  <span v-if="flightOrder.infants.length > 1">
                    {{flightOrder.infants.length}}Infants
                  </span>
                  <span v-else>
                    {{flightOrder.infants.length}}Infant
                  </span>
                </div>
              </div>
              <span class="traveller-title" v-if="flightOrder.adults.length > 1">Adults</span>
              <span class="traveller-title" v-else>Adult</span>

              <div class="traveller-form" ref="adults" v-for="(item,index) in flightOrder.adults" :key="item.id">
                <div class="passenger-from flex space-between align-items-center">
                  <span class="group-title">Name</span>
                  <input class="sp ot" type="text" v-model="adultsFormDetail[index].firstname" placeholder="First name">
                  <input class="ot" type="text" v-model="adultsFormDetail[index].lastname" placeholder="Last name">
                  <span class="title-wrap">
                    {{adultsFormDetail[index].title}}
                    <select name="sex" v-model="adultsFormDetail[index].title" value="Gender" class="passager-detail-sex ot">
                      <option v-for="item in passengerSex" :key='item.id' :value="item">
                        {{item}}
                      </option>
                    </select>
                  </span>
                </div>
                <div class="date-form" v-if="needDate">
                  <div class="form-group flex space-between align-items-center">
                    <label for="date-pick">Birthday
                    </label>
                    <span>
                      {{adultsFormDetail[index].birthday||'Day/Month/Year'}}
                      <input v-model="adultsFormDetail[index].birthday" class="date-pick ot" type="date">
                      <img :src='require("../../assets/images/book/selectDate.png")' alt="">
                    </span>
                  </div>
                </div>
                <div class="passport-form flex space-between" v-if="isNeedPassport">
                  <div class="passport-name">
                    Passport No.
                  </div>
                  <input type="text" class="passport-num ot" placeholder="Passport Number" v-model="adultsFormDetail[index].cardNo">
                  <div class="country-wrap ot">
                      {{adultsFormDetail[index].country?adultsFormDetail[index].country:"Indian"}}
                    <select name="" id="" class="country ot" v-model="adultsFormDetail[index].country">
                      <option v-for="(item,index) in countryArr" :value="item.code" :key="index">
                        {{item.name}}
                      </option>
                    </select>
                  </div>
                </div>        
                <div class="passport-date-form" v-if="isNeedPassport">
                  <div class="form-group flex space-between align-items-center">
                    <label for="date-pick">Expiry Date
                    </label>
                    <span>
                      {{adultsFormDetail[index].cardValid||'Day/Month/Year'}}
                      <input v-model="adultsFormDetail[index].cardValid" class="expiry-date-pick ot" type="date">
                      <img :src='require("../../assets/images/book/selectDate.png")' alt="">
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="traveller-info" v-if="flightOrder!=null && flightOrder.children.length > 0">
              <span class="traveller-title" v-if="flightOrder.children.length > 1">Children</span>
              <span class="traveller-title" v-else>child</span>

              <div class="traveller-form" ref="children" v-for="(item,index) in flightOrder.children" :key="item.id">
                <div class="passenger-from flex space-between align-items-center">
                  <span class="group-title">Name</span>
                  <input class="ot" type="text" v-model="childrenFormDetail[index].firstname" placeholder="First name">
                  <input class="ot" type="text" v-model="childrenFormDetail[index].lastname" placeholder="Last name">
                  <span class="title-wrap">
                    {{childrenFormDetail[index].title}}
                    <select name="sex" v-model="childrenFormDetail[index].title" class="passager-detail-sex ot">
                      <option v-for="item in passengerSex" :key='item.id' :value="item">
                        {{item}}
                      </option>
                    </select>
                  </span>
                </div>
                <div class="date-form">
                  <div class="form-group flex space-between align-items-center">
                    <label for="date-pick" class="group-title">Birthday
                    </label>
                    <span>
                      {{childrenFormDetail[index].birthday||'Day/Month/Year'}}
                      <input class="date-pick ot" type="date" v-model="childrenFormDetail[index].birthday">
                      <img :src='require("../../assets/images/book/selectDate.png")' alt="">
                    </span>
                  </div>
                </div>
                <div class="passport-form flex space-between" v-if="isNeedPassport">
                  <div class="passport-name">
                    Passport No.
                  </div>
                  <input type="text" class="passport-num ot" placeholder="Passport Number" v-model="childrenFormDetail[index].cardNo">
                  <div class="country-wrap ot">
                    {{childrenFormDetail[index].country}}
                    <select name="" id="" class="country ot" v-model="childrenFormDetail[index].country">
                      <option v-for="(item,index) in countryArr" :value="item.name" :key="index">
                        {{item.name}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="passport-date-form" v-if="isNeedPassport">
                  <div class="form-group flex space-between align-items-center">
                    <label for="date-pick">Expiry Date
                    </label>
                    <span>
                      {{childrenFormDetail[index].cardValid||'Day/Month/Year'}}
                      <input v-model="childrenFormDetail[index].cardValid" class="expiry-date-pick ot" type="date">
                      <img :src='require("../../assets/images/book/selectDate.png")' alt="">
                    </span>
                  </div>
                </div>
              </div>  
            </div>
            <div class="traveller-info" v-if="flightOrder!=null && flightOrder.infants.length > 0">
              <span class="traveller-title" v-if="flightOrder.infants.length > 1">Infants</span>
              <span class="traveller-title" v-else>Infant</span>

              <div class="traveller-form" ref="infants" v-for="(item,index) in flightOrder.infants" :key="item.id">
                <div class="passenger-from flex space-between align-items-center">
                  <span class="group-title">Name</span>
                  <input class="ot" type="text" v-model="infantsFormDetail[index].firstname" placeholder="First name">
                  <input class="ot" type="text" v-model="infantsFormDetail[index].lastname" placeholder="Last name">
                  <span class="title-wrap">
                    {{infantsFormDetail[index].title}}
                    <select name="sex" v-model="infantsFormDetail[index].title" class="passager-detail-sex ot">
                      <option v-for="item in passengerSex" :key='item.id' :value="item">
                        {{item}}
                      </option>
                    </select>
                  </span>
                </div>
                <div class="date-form">
                  <div class="form-group flex space-between align-items-center">
                    <label for="date-pick" class="group-title">Birthday
                    </label>
                    <span>
                      {{infantsFormDetail[index].birthday||'Day/Month/Year'}}
                      <input class="date-pick ot" type="date" v-model="infantsFormDetail[index].birthday">
                      <img :src='require("../../assets/images/book/selectDate.png")' alt="">
                    </span>
                  </div>
                </div>
                <div class="passport-form flex space-between" v-if="isNeedPassport">
                  <div class="passport-name">
                    Passport No.
                  </div>
                  <input type="text" class="passport-num ot" placeholder="Passport Number" v-model="infantsFormDetail[index].cardNo">
                  <div class="country-wrap ot">
                    {{infantsFormDetail[index].country}}
                    <select name="" id="" class="country ot" v-model="infantsFormDetail[index].country">
                      <option v-for="(item,index) in countryArr" :value="item.code" :key="index">
                        {{item.name}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="passport-date-form" v-if="isNeedPassport">
                  <div class="form-group flex space-between align-items-center">
                    <label for="date-pick">Expiry Date
                    </label>
                    <span>
                      {{infantsFormDetail[index].cardValid||'Day/Month/Year'}}
                      <input v-model="infantsFormDetail[index].cardValid" class="expiry-date-pick ot" type="date">
                      <img :src='require("../../assets/images/book/selectDate.png")' alt="">
                    </span>
                  </div>
                </div>
              </div>
            </div>  
            <h2 class="d_jump">Contact Information</h2>
            <div class="contact-info">
              <ul>
                <li class="f_li flex content-start align-items-center" :class="{errorStyle:contact.nameErr}">
                  <input class="ot" type="text" placeholder="Contact Name" v-nameInput="contact" v-model="contact.contactName" name="contactName" id="contactName">
                </li>
                <li class="contact_errLi" :style="{opacity:!contact.nameErr?0:1}">{{contact.nameErrMsg}}</li>
                <li class="f_li flex content-start align-items-center" :class="{errorStyle:contact.emailErr}">
                  <input class="ot" type="text" placeholder="Email Address" v-emailInput="contact" v-model.trim="contact.email" name="email" id="email">
                </li>
                <li class="contact_errLi" :style="{opacity:!contact.emailErr?0:1}" >{{contact.emailErrMsg}}</li>
                <li class="f_li flex content-start align-items-center" :class="{errorStyle:contact.mobileErr}">
                  <div class="select-group">
                    <select name="" id="" v-model="contact.code">
                      <option :value="item.regionCode" v-for="(item, i) in phoneCode" :key="i">
                        {{item.countryName + ' (+' + item.regionCode + ')'}}
                      </option>
                    </select>
                    <span>
                      {{'+' + contact.code}}
                    </span>
                  </div>
                  <input class="ot" type="number" placeholder='Mobile Number' v-mobileInput="contact" v-model.number="contact.mobile" name="mobile" id="mobile">
                </li>
                <li class="contact_errLi" :style="{opacity:!contact.mobileErr?0:1}">{{contact.mobileErrMsg}}</li>
              </ul>
            </div>
            <p class="tips">Your Ticket Info will be sent through Email or Mobile</p>
          </div>
          <insurance v-if="insureProps" @transInsureChecked="getInsureChecked" @insuranceDetail="showInsuranceDetail" @terms="showTerms" @changed="changed" :data="insureProps"></insurance>
          <div class="book-gst d_jump" v-if="allowGST">
            <div class="title flex content-start align-items-center">
              <span class="title-icon">4</span>
              <span class="title-info">GST Information</span>
            </div>
            <div class="form-group sp" @click="gstOpen">
              <!-- <input @click="gstOpen" type="checkbox" id="check"> -->
              <div class="round1">
                <div :class="{round2:isGST}"></div>
              </div>
              <label :class="{changeC:isGST}" class="checkinfo" for="check">I have a GST number(optional)</label>
            </div>
            <div class="container" v-show="isGST">
              <form action="">
                <div class="form-group">
                  <input type="text" placeholder="GST Number" v-model="ordersGSTInfo.registrationNumber" maxlength="20">
                </div>
                <div class="form-group">
                  <input type="text" placeholder="Company Name" v-model="ordersGSTInfo.registeredCompanyName">
                </div>
                <div class="form-group">
                  <input type="text" placeholder="Business Email ID" v-model="ordersGSTInfo.email">
                </div>
                <div class="form-group">
                  <input type="text" placeholder="Company Address" v-model="ordersGSTInfo.registeredCompanyAddress">
                </div>
                <div class="form-group">
                  <input type="text" placeholder="Phone Number" v-model="ordersGSTInfo.phone" maxlength="20">
                </div>
                <div class="form-group">
                  <input type="text" :value="ordersGSTInfo.country" disabled>
                </div>
                <div class="form-group">
                  <input type="text" placeholder="Haryana" v-model="ordersGSTInfo.state">
                </div>
              </form>
            </div>
          </div>
          <div class="book-offer d_jump">
            <div class="offers">
              <div class="title flex content-start align-items-center">
                <span class="title-icon">5</span>
                <span class="title-info">Happy Easy Go Offers</span>
              </div>
              <div class="offers-wrapper">
                <div class="offers-group">
                  <div class="radio-group flex content-start align-items-center" >
                    <div class="round1" @click="radio1">
                      <div :class="{round2:isSelecA}"></div>
                    </div>
                    <p :class="{yellow:true}">Get Instant Discount with Coupon</p>
                  </div>
                  <div class="input-group flex content-start">
                    <input type="text" ref="coupon" placeholder="" v-model="couponCode" :disabled="Noclick" :class="{yellowborder:isSelecA }">
                    <img :src="foldIcon" alt="" ref="selectPrivateCoupon" @click="selectCoupon" v-clickOutside="isClickSelect">
                    <a :class="{cheked:isSelecA,disabel:!isSelecA}" href="javascript:" @click="applyCode">Apply code</a>
                  </div>
                  <p class="coupon-note"><span>NOTE:</span>Save extra RS.{{extraRs}} by coupon.</p>
                  <ul class="couponList" v-show="showCoupon">
                    <li v-show="hasCoupon" v-for="item in couponList" :key="item.id" @click="selectedCoupon(item.couponCode)"><span>{{item.couponCode}}</span>
                    <p>-<span class="rs">Rs. </span><span>{{item.discount}}</span></p>
                    </li>
                    <li v-show="noCoupon" class="noCoupon">
                      <div class="cou-img" :style='bgNoCoupon'></div>
                      <p>No valid private coupon.</p>
                    </li>
                  </ul>
                </div>
                
              </div>
            </div>
          </div>
          <div class="book-grand d_jump">
            <div class="title flex content-start align-items-center">
              <span class="title-icon">6</span>
              <span class="title-info">Grand Total</span>
            </div>
            <div class="price-info">
              <div class="total-price" v-if="ifCashback">
                <span class="price">
                  <span class="rs">RS.</span>{{fullPrice}}
                </span>
              </div>
              <div class="total-price" v-else>
                <span class="price">
                  <span class="rs">RS.</span>{{payPrice}}
                </span>
                <span class="old-price">
                  <del>
                    <span class="rs">RS.</span>{{fullPrice}}
                  </del>
                </span>
              </div>
              <div class="agreement flex content-start align-items-center">
                <input type="checkbox" checked="checked" v-model="agreeTC" @click="agreeTC=!agreeTC">
                <span> I agree with the
                  <span class="link" @click="showAgreement">Terms& Conditions</span>of Happy Easy Go</span>
              </div>
              <a class="confirm" href="javascript:" @click="confirmBook">Confirm</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <domesticDetail v-if="isShowDomestic" @showDomesticTerms ="hideDomesticTerms" :flag="flag"></domesticDetail>
    <internationalDetail v-if="isShowInternational" @showInternationalTerms ="hideInternationalTerms" :flag="flag"></internationalDetail>
    <insurances-detail v-if="isShowInsurance" @closepdf="closePdf"></insurances-detail>
    <agreement v-if="isShowAgreement"  @showAgreement ="hideAgreement" :flag="flag"></agreement>
  </div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import insurancesDetail from "pages/agreement/insurancePDF.vue";
import agreement from "pages/agreement/agreement.vue";
import domesticDetail from "pages/agreement/apollo-domestic-terms.vue";
import internationalDetail from "pages/agreement/apollo-international-terms76.vue";
import { Toast, Indicator } from "mint-ui";
import { mapMutations } from "vuex";
import { mutaionNames } from "../../vuex";
import { Coupon } from "../../models/discount";
import * as OrderMutaionNames from "../../vuex/models/flightorder/MutationName.js";
import { DomainManager } from "../../config/DomainManager.js";
import { CookieUtil,GetFlightOrderUtil, hegTrack,Reg } from "models/utils";
import failure from "pages/failure/failure.vue";
import { User } from "models/user";
import * as types from "../../vuex/types/types.js";
import insurance from "./child/insurance.vue";
import reviewBooking from "./child/reviewbooking";
import { RoundTripOrder } from "models/flightorder";

const clickOutside = {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
export default {
  components: {
    headTop,
    failure,
    insurance,
    reviewBooking,
    agreement,
    domesticDetail,
    internationalDetail,
    insurancesDetail,
  },
  data() {
    return {
      timerScroll:null,
      maxPsrNum:null,
      checkPriceToken:'',
      checkCountAndPriceToken:'',
      couponList: [],
      extraRs:0,
      Noclick: false,
      showCoupon: false,
      hasCoupon: false,
      noCoupon: true,
      bgNoCoupon:
        "background:url(" +
        require("../../assets/images/home-img/unhappy.png") +
        ") no-repeat;background-size:100%;",
      foldIcon: require("../../assets/images/refund/use.png"),
      flightOrder: GetFlightOrderUtil.getOrderFromSession(this, sessionStorage),
      insureProps: null,
      isBookPage:true,
      flag:true,
      isShowAgreement:false,
      isShowDomestic:false,
      isShowInternational:false,
      isShowInsurance: false,
      isSelecA: false,
      btnHeight: false,
      heads: {
        img: require("../../assets/images/flight-prev.png"),
        title: "Book",
        img2: require("../../assets/images/book/p.png")
      },
      couponCode: "",
      //page2
      contact:{
        code: "91",
        mobile: "",
        mobileErr:false,
        mobileErrMsg:'',
        email: "",
        emailErr:false,
        emailErrMsg:'',
        contactName: "",
        nameErr:false,
        nameErrMsg:''
      },
      showPopup: false,
      passengerSex: ["Male", "Female"],
      adultsFormDetail: [],
      childrenFormDetail: [],
      infantsFormDetail: [],
      travellerlists: [],
      //page3
      isGST: false,
      ordersGSTInfo: {
        country: "India",
        email: "",
        phone: "",
        registeredCompanyAddress: "",
        registeredCompanyName: "",
        registrationNumber: "",
        state: "Haryana"
      },
      needDate: false,
      ifCashback: !!JSON.parse(sessionStorage.returnCash),
      ifChecked: false,
      agreeTC: true,
      allowGST: true,
      allow: true,
      deviceNo: "",
      reqTime: 0,
      coupon: null,
      deviceType: 0,
      phoneCode: [],
      countryArr: [],
      ifIN: !!JSON.parse(sessionStorage.isIN),
      isCheckInsure: false,
      insurePr: 0,
      days:null,
      tdis:0,
      hasInsurance:true,
      returnFlight: {
        stopByFlightArray: []
      },
      isNeedPassport: false,
      checkPassport: {
        departFlight: {
          stopByFlightArray: []
        },
        requestFromClient: {}
      },
    };
  },
  created() {
    this.getCouponList();
    if (!this.flightOrder) {
      Toast({
        message: "information expired",
        duration: 2000
      });
      let _this = this;
      setTimeout(function() {
        _this.$router.push("/home");
      }, 2000);
    }
    let ifReload = this.$store.state.flihgt.allFlight;
    // var self = this;
    if (!ifReload) {
      Toast({
        message: "information expired",
        duration: 2000
      });
      setTimeout(() => {
        this.$router.push("/home");
      }, 2000);
    }

    this.$store.commit(types.GET_COUPON, null);
    this.newGetCoupon();
    this.getFlights(this.flightOrder.token).then(res => {
      this.checkPrice();
    });

    let order = this.flightOrder;

    this.pegInfoData();

    if (CookieUtil.hasItem("uuid")) {
      User.getCommTraInfo(this).then(res => {
        this.travellerlists = res;
      });
    }

    User.findSms(this).then(res => {
      this.phoneCode = res.list;
    });

    order.searchCountry(this).then(res => {
      this.countryArr = res.data;
    });

    try {
      var json = window.heg.getNativeSource();
      this.deviceType = JSON.parse(json).deviceType;
      this.deviceNo = JSON.parse(json).deviceId;

    } catch (e) {}
    // inus  输入信息,fous  blur
    
  },
  computed: {
    flightInfos() {
      let res = [];
      let order = this.flightOrder;
      if (order != null) {
        res.push({
          flight: order.departFlight,
          departAirport: order.departAirport,
          destinationAirport: order.destinationAirport
        });
        if (this.flightOrder instanceof RoundTripOrder) {
          res.push({
            flight: order.returnFlight,
            departAirport: order.destinationAirport,
            destinationAirport: order.departAirport
          });
        }
      }
      return res;
    },
    travellerNum() {
      let order = this.flightOrder;
      if (order != null) {
        let adultNum = this.flightOrder.adults.length;
        let childNum = this.flightOrder.children.length;
        let infantsNum = this.flightOrder.infants.length;
        return adultNum + childNum + infantsNum;
      } else {
        return 0;
      }
    },
    payPrice() {
      var d = this.flightOrder.departFlight.flightInfoBack.fee;
      let bfp = d.bfp;
      let gst = d.gst;
      let obfp = d.obfp;
      let ogst = d.ogst;
      if (!(sessionStorage.flightType == "one")) {
        var r = this.flightOrder.returnFlight.flightInfoBack.fee;
        bfp += r.bfp;
        gst += r.gst;
        obfp += r.obfp;
        ogst += r.ogst;
      }
      let price = 0;
      if (this.isSelecA && this.coupon) {
        price = this.flightOrder.returnCash
          ? obfp + ogst
          : (this.coupon.isUseViaCouponDis
              ? obfp + ogst - this.coupon.viaCouponDis
              : bfp + gst) - this.coupon.value;
      } else {
        price = this.flightOrder.returnCash ? obfp + ogst : bfp + gst;
      }
      //insurance
      let insurePr = this.isCheckInsure ? this.insurePr + this.tdis: this.insurePr;
      return price + insurePr;
    },
    fullPrice() {
      let price = 0;
      if (sessionStorage.flightType == "one") {
        price = this.isSelecA
          ? this.flightOrder.departFlight.flightInfoBack.fee.obfp +
            this.flightOrder.departFlight.flightInfoBack.fee.ogst -
            this.flightOrder.departFlight.couponDiscount
          : this.flightOrder.departFlight.flightInfoBack.fee.obfp +
            this.flightOrder.departFlight.flightInfoBack.fee.ogst;
      } else {
        price = this.isSelecA
          ? this.flightOrder.departFlight.flightInfoBack.fee.obfp +
            this.flightOrder.departFlight.flightInfoBack.fee.ogst +
            this.flightOrder.returnFlight.flightInfoBack.fee.obfp +
            this.flightOrder.returnFlight.flightInfoBack.fee.ogst -
            this.flightOrder.departFlight.couponDiscount -
            this.flightOrder.returnFlight.couponDiscount
          : this.flightOrder.departFlight.flightInfoBack.fee.obfp +
            this.flightOrder.departFlight.flightInfoBack.fee.ogst +
            this.flightOrder.returnFlight.flightInfoBack.fee.obfp +
            this.flightOrder.returnFlight.flightInfoBack.fee.ogst;
      }
      let insurePr = this.isCheckInsure ? this.insurePr + this.tdis:this.insurePr;
      if(this.ifCashback){
        return price + insurePr ;
      }else{
        return price ;
      }
    },
  },
  watch:{
    "contact.code"(val, oldV){
      if(val != oldV && 
        val == '91' && String(this.contact.mobile).length != 10 || 
        val == '86' && String(this.contact.mobile).length != 11
      ){
        this.contact.mobileErr = true;
        this.contact.mobileErrMsg = "Please provide a valid Mobile Number.";
      }else{
        this.contact.mobileErr = false;
      }
    }
  },
  directives: { 
    clickOutside,
    nameInput: {
      bind(el,binding,vnode){
        el.onfocus = function(){
          binding.value.nameErr = false;
        },
        el.onblur = function(){
          var nregw = /^[A-Za-z\s\'\-\.]*[A-Za-z]+[A-Za-z\s\'\-\.]*$/;
          if(!nregw.test(binding.value.contactName)){
            binding.value.nameErr = true;
            binding.value.nameErrMsg = "Please provide a valid Contact Name.";
          }
        }
      }
    },
    emailInput: {
      bind(el,binding,vnode){
        el.onfocus = function(){
          binding.value.emailErr = false;
        },
        el.onblur = function(){
          if(!Reg.email.test(binding.value.email)){
            binding.value.emailErr = true;
            binding.value.emailErrMsg = "Please provide a valid E-mail Id.";
          }
        }
      }
    },
    mobileInput: {
      bind(el,binding,vnode){
        el.onfocus = function(){
          binding.value.mobileErr = false;
        },
        el.onblur = function(){
          if(!Reg.onlyNumber1.test(binding.value.mobile) || 
            binding.value.code == '91' && String(binding.value.mobile).length != 10 || 
            binding.value.code == '86' && String(binding.value.mobile).length != 11
          ){
            binding.value.mobileErr = true;
            binding.value.mobileErrMsg = "Please provide a valid Mobile Number.";
          }
        }
      }
    },
  },
  methods: {
    changed(data){
      this.insurePr = data.interDays * data.price * data.number;
      this.days = data.interDays;
    },
    showAgreement(){
      this.isBookPage = false;
      this.isShowAgreement = true;
      this.isShowInsurance = false;
      this.isShowDomestic = false;
      this.isShowInternational = false;
    },
    hideAgreement(){
      this.isBookPage = true;
      this.isShowAgreement = false;
      this.isShowInsurance = false;
      this.isShowDomestic = false;
      this.isShowInternational = false;
    },
    hideDomesticTerms(){
      this.isBookPage = true;
      this.isShowAgreement = false;
      this.isShowInsurance = false;
      this.isShowDomestic = false;
      this.isShowInternational = false;
    },
    hideInternationalTerms(){
      this.isBookPage = true;
      this.isShowAgreement = false;
      this.isShowInsurance = false;
      this.isShowDomestic = false;
      this.isShowInternational = false;
    },
    showTerms(data){
      if(data.indexOf('domestic') >-1){
        this.isBookPage = false;
        this.isShowInsurance = false;
        this.isShowDomestic = true;
      }else if(data.indexOf('international') >-1){
        this.isBookPage = false;
        this.isShowInsurance = false;
        this.isShowInternational = true;
      }
    },
    isClickSelect() {
      this.showCoupon = false;
    },
    closePdf(data) {
      this.isShowInsurance = data;
      this.isBookPage = true;
      this.isShowInternational = false;
      this.isShowDomestic = false;
    },
    showInsuranceDetail(data) {
      this.isShowInsurance = data;
      this.isBookPage = false;
      this.isShowAgreement = false;
      this.isShowDomestic = false;
      this.isShowInternational = false;
    },
    getCouponList() {
      let that = this;
      const url = DomainManager.getPrivateCoupons();
      this.$axios
        .get(url, { headers: { "x-Device": "mobile" } })
        .then(res => {
          if (res.success) {
            if (res.data.length == 0) {
              this.hasCoupon = false;
              this.noCoupon = true;
            } else {
              that.couponList = res.data;
              this.hasCoupon = true;
              this.noCoupon = false;
            }
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectCoupon() {
      if (this.Noclick) {
        return;
      } else {
        this.showCoupon = !this.showCoupon;
      }
    },
    selectedCoupon(id) {
      this.showCoupon = false;
      this.couponCode = id;
    },
    getCheckPassport(info) {
      let that = this;
      let url = DomainManager.bookFlightCheckPassport();
      let parm = JSON.stringify(info);
      this.$http
        .post(url, parm)
        .then(res => {
          // console.log(res.data)
          if (res.data.success) {
            that.isNeedPassport = res.data.data[0].passportPolicy;
          } else {
            Toast({
              message: res.message,
              position: "center",
              duration: 1500
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getInsureData() {
      let reqData = {
        token:this.flightOrder.token,
        passengerCount: this.travellerNum,
        from: this.flightOrder.departAirport.iataCode,
        to: this.flightOrder.destinationAirport.iataCode,
        international: this.ifIN,
        departFlightList: [
          {
            departDateTime: this.flightOrder.departFlight.flightInfoBack.dt,
            arrDateTime: this.flightOrder.departFlight.flightInfoBack.at,
            wdt: this.flightOrder.departFlight.flightInfoBack.wdt
          }
        ]
      };
      if (
        this.flightOrder.returnFlight &&
        Object.keys(this.flightOrder.returnFlight).length != 0
      ) {
        reqData.returnFlightList = [
          {
            departDateTime: this.flightOrder.returnFlight.flightInfoBack.dt,
            arrDateTime: this.flightOrder.returnFlight.flightInfoBack.at,
            wdt: this.flightOrder.returnFlight.flightInfoBack.wdt
          }
        ];
      }
      // this.$axios({
      //   url: DomainManager.getInsure(),
      //   method: "post",
      //   data: JSON.stringify(reqData),
      //   responseType: "json",
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // }).then(res => { 
      //     if (res.success) {
      //       let product = res.data.productInfoList[0];
      //       let model = {
      //         days:res.data.days,
      //         product,
      //         insurePr: res.data.total,
      //         isIntl: this.ifIN,
      //         passengers: this.travellerNum,
      //         noInsuranceMsg:res.data.noInsuranceMsg,
      //         hasInsurance:res.data.hasInsurance,
      //         tdis:res.data.hasInsurance?res.data.tdis:0,
      //       };
      //       if(res.data.hasInsurance){
      //         this.hasInsurance = res.data.hasInsurance;
      //       }else{
      //         this.hasInsurance = true;
      //       }
      //       this.insureProps = model;
      //       if(!this.ifIN){
      //         if(res.data.hasInsurance){
      //           this.insurePr = res.data.total + this.insureProps.tdis;
      //         }else{
      //           this.insurePr = res.data.total;
      //         }
      //       }else{
      //         if(res.data.hasInsurance){
      //           this.insurePr = res.data.days * res.data.productInfoList[0].price + this.insureProps.tdis;
      //           this.days = res.data.days;
      //         }else{
      //           this.insurePr = res.data.days * res.data.productInfoList[0].price;
      //         }
      //       }
      //     } else {
      //       this.hasInsurance = false;
      //       this.insureProps = null;
      //       return Promise.reject();
      //     }
      //   })
      //   .catch(err => {
      //     this.isCheckInsure = false;
      //   });
      this.$axios({
        url: DomainManager.hasInsurance_v2(),
        method: "post",
        data: JSON.stringify(reqData),
        responseType: "json",
        headers: {
          "Content-Type": "application/json",
          "x-Device": "mobile"
        }
      }).then(res => { 
          if (res.success) {
            let product = res.data.productInfoList[0];
            let model = {
              showProductInfoList:product.disPrice?(product.price - product.disPrice > 0?true:false):false,
              days:res.data.days,
              product,
              insurePr: res.data.total,
              isIntl: this.ifIN,
              passengers: this.travellerNum,
              noInsuranceMsg:res.data.noInsuranceMsg,
              hasInsurance:res.data.hasInsurance,
              tdis:res.data.hasInsurance?res.data.tdis:0,
            };
            if(res.data.hasInsurance){
              this.hasInsurance = res.data.hasInsurance;
            }else{
              this.hasInsurance = true;
            }
            this.insureProps = model;
            if(!this.ifIN){
              if(res.data.hasInsurance){
                this.insurePr = res.data.total + this.insureProps.tdis;
              }else{
                this.insurePr = res.data.total;
              }
            }else{
              if(res.data.hasInsurance){
                this.insurePr = res.data.days * res.data.productInfoList[0].price + this.insureProps.tdis;
                this.days = res.data.days;
              }else{
                this.insurePr = res.data.days * res.data.productInfoList[0].price;
              }
            }
          } else {
            this.hasInsurance = false;
            this.insureProps = null;
            return Promise.reject();
          }
        })
        .catch(err => {
          this.isCheckInsure = false;
        });
    },
    getInsureChecked(flag) {
      this.isCheckInsure = flag.insureRadio;
      this.hasInsurance = flag.insureRadio;
      if(!flag.insureRadio){
        this.insurePr = 0;
        this.days = null;
        // this.hasInsurance = false;
      }else{
        if(flag.insurance.hasInsurance){
          this.insurePr = this.ifIN?(flag.insurance.totalMoney * flag.insurance.passengers):flag.insurance.totalMoney;
          this.tdis = flag.insurance.tdis;
        }else{
          this.insurePr = this.ifIN?(flag.insurance.totalMoney * flag.insurance.passengers):flag.insurance.totalMoney;
        }
        this.days = flag.insurance.day;
      }
    },
    closePopup() {
      this.showPopup = false;
      var type = sessionStorage.flightType;
      this.getNewArr();
      type == "one"
        ? this.$router.push("/oneway")
        : this.ifIN
          ? this.$router.push("/international")
          : this.$router.push("/roundtrip");
    },
    scrollTopforForm() {
      var formList = document.getElementsByClassName("ot");
      // var top = document.getElementsByClassName("container")[0];
      // var title = document.querySelector(".book-review .title");
      var $mval = this.contact.mobile;
      var $eval = this.contact.email;
      var $nval = this.contact.contactName;

      // var nreg = /^[A-Za-z\s\'\-\.]*[A-Za-z]+[A-Za-z\s\'\-\.]*$/;
      for (var i of formList) {
        //不要删空格 会筛选不到
        if (i.type == "date" && i.value == "") {
          this.scrollToErrDiv(0);
          // top.scrollTop = i.offsetParent.offsetTop - title.offsetTop - 5;
          Toast({
            message: "Please choose the date",
            duration: 2000
          });
          break;
        } else if (i.name == "sex" && i.value =="") {
          this.scrollToErrDiv(0);
          // top.scrollTop = i.offsetParent.offsetTop - title.offsetTop - 5;
          Toast({
            message: "Please choose the passenger‘s gender",
            duration: 2000
          });
          break;
        } else if (i.placeholder == "Passport Number") {
          this.scrollToErrDiv(0);
          // top.scrollTop = i.offsetTop - title.offsetTop - 5;
          if (i.value == "") {
            Toast({
              message: "Please enter Passport Number",
              duration: 2000
            });
            break;
          }
        } else if (i.placeholder == "First name") {
          this.scrollToErrDiv(0);
          // top.scrollTop = i.offsetTop - title.offsetTop - 5;
          if (!Reg.name.test(i.value)) {
            Toast({
              message: "Please enter correct First Name",
              duration: 2000
            });
            break;
          }
        } else if (i.innerText == "Country ") {
          this.scrollToErrDiv(0);
          // top.scrollTop = i.offsetTop - title.offsetTop - 5;
          Toast({
            message: "Please choose the passport's country",
            duration: 2000
          });
          break;
        } else if (i.placeholder == "Last name") {
          this.scrollToErrDiv(0);
          // top.scrollTop = i.offsetTop - title.offsetTop - 5;
          if (!Reg.name.test(i.value)) {
            Toast({
              message: "Please enter correct Last Name",
              duration: 2000
            });
            break;
          }
        } else if (i.id == "contactName") {
          this.scrollToErrDiv(1);
          // top.scrollTop = i.offsetTop - title.offsetTop - 5;
          if (i.value == "") {
            Toast({
              message: "Please enter Contact Name",
              duration: 2000
            });
            break;
          }
          if (!Reg.name.test($nval)) {
            Toast({
              message: "Please enter correct Contact Name",
              duration: 2000
            });
            break;
          }
        } else if (i.id == "email" && !Reg.email.test($eval)) {
          this.scrollToErrDiv(1);
          // top.scrollTop = i.offsetTop - title.offsetTop - 5;
          if (i.value == "") {
            Toast({
              message: "Please enter email address",
              duration: 2000
            });
            break;
          }
          if (!Reg.email.test($eval)) {
            Toast({
              message: "Please enter a valid email address",
              duration: 2000
            });
            break;
          }
        } else if (i.id == "mobile") {
          this.scrollToErrDiv(1);
          // top.scrollTop = i.offsetTop - title.offsetTop - 5;
          if (i.value == "") {
            Toast({
              message: "Please enter the mobile number",
              duration: 2000
            });
            break;
          }
          // var ml = this.contact.mobile + "";

          if (!Reg.onlyNumber.test(this.contact.mobile)) {
            Toast({
              message: "Please enter a valid mobile number",
              duration: 2000
            });
            break;
          }
        } else if (i.value == "") {
          // top.scrollTop = i.offsetTop - title.offsetTop - 5;
          Toast({
            message: "Please complete the passenger information",
            duration: 2000
          });
          break;
        }
      }
    },
    scrollToErrDiv(index){
      var top = document.getElementsByClassName("d_jump");
      let that = this;
      cancelAnimationFrame(this.timerScroll);
      this.timerScroll = requestAnimationFrame(function fn() {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > top[index].offsetTop) {
          document.body.scrollTop = document.documentElement.scrollTop = top[index].offsetTop - 50;
          that.timerScroll = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(that.timerScroll);
        }
      });
    },
    makeOrder() {
      let self = this;
      if(this.ifIN){
        if(!this.isCheckInsure){
          this.days = null;
        }
      }
      let flightOrder = GetFlightOrderUtil.getOrderFromSession(
        this,
        sessionStorage
      );
      var cp = this.$store.getters.coupon;
      if (this.isSelecA && cp) {
        sessionStorage.setItem("useCoupon", this.isSelecA);
      } else {
        cp = null;
        this.$store.commit(types.GET_COUPON, cp);
        sessionStorage.setItem("useCoupon", false);
      }

      var jp = JSON.parse(sessionStorage.isIN);
      flightOrder.saveOrder(self, jp).then(res => {
          if (res.code == 0) {
            self.flightOrder.orderNumber = res.orderId;
            self.$store.commit(OrderMutaionNames.setupOrder, flightOrder);
            GetFlightOrderUtil.setOrderIntoSession(
              self.flightOrder,
              sessionStorage
            );
            if (self.ifCashback) {
              let price = self.payPrice;
              try {
                window.heg.send2nativeAdjustWithSum("ou81xr", price);
              } catch (e) {}
            } else if (!self.ifCashback) {
              let price = self.fullPrice;
              try {
                window.heg.send2nativeAdjustWithSum("ou81xr", price);
              } catch (e) {}
            }
            Indicator.close();

            // business
            let business = {
              action : 'ORDER',
              channel : 'WAP001',
              uid : CookieUtil.hasItem('uuid')?CookieUtil.getItem('uid'):'123456789012345678',
              phone_num : '18888888888',
              order_id : res.orderId
            };
            // let serverHost = "//stalker.qisec.cn";
            // (function() {
            //   var s = document.createElement('script');
            //   s.type = "text/javascript";
            //   s.charset = "utf-8";
            //   s.async = "true";
            //   s.src = "//stalker.qisec.cn/stalker.js";
            //   var p = document.getElementsByTagName('script')[0];
            //   p.parentNode.insertBefore(s, p);
            // })();

            self.$router.push("/payment/confirm");
            sessionStorage.removeItem("insuranceInfo");
          } else if (res.code == 7) {
            Indicator.close();
            if (sessionStorage.flightType != "") {
              Toast("Your session has expired.");

              self.flightOrder.orderType == "one"
                ? self.$router.push("/oneway")
                : self.ifIN
                  ? self.$router.push("/international")
                  : self.$router.push("/roundtrip");
            }else{
              Toast("Your session has expired.");
              self.$router.push("/");
            }
          }else if(res.code == 9){
            Indicator.close();
            Toast(res.msg);
            self.flightOrder.orderType == "one"
                ? self.$router.push("/oneway")
                : self.ifIN
                  ? self.$router.push("/international")
                  : self.$router.push("/roundtrip");
          } else {
            Indicator.close();
            Toast({
              message: res.msg,
              duration: 2000
            });
          }
          if(!res.success){
            Indicator.close();
            self.flightOrder.orderType == "one"
                ? self.$router.push("/oneway")
                : self.ifIN
                  ? self.$router.push("/international")
                  : self.$router.push("/roundtrip");
          }
        })
        .catch(err => {
          Indicator.close();
          console.log("error:" + err);
          Toast({
            message: err.msg,
            duration: 2000
          });
        });
    },
    confirmBook() {
      if(this.ifChecked){
        this.getFlights(this.checkPriceToken);
      }
      let order = this.flightOrder;
      let adults = order.adults;
      let children = order.children;
      let infants = order.infants;
      this.scrollTopforForm();
      if (!this.agreeTC) {
        Toast("Please agree to the terms.");
        return false;
      }

      if (!this.allow) {
        Toast({
          message: "International flights are not allowed",
          duration: 2500
        });
        return false;
      }

      if (this.isGST) {
        let gst = this.ordersGSTInfo;

        if (gst.registeredCompanyAddress == "") {
          Toast("Please complete the company address");
          return false;
        } else if (!Reg.email.test(gst.email)) {
          Toast("Please enter a valid Email Address");
          return false;
        } else if (!Reg.gstNumber.test(gst.registrationNumber)) {
          Toast("Only take alphabet and digit, special character not allowed");
          return false;
        } else if (!Reg.gstName.test(gst.registeredCompanyName)) {
          Toast(
            "Take only alphabet and digit and including this character also -."
          );
          return false;
        } else if (gst.registeredCompanyAddress.length > 65) {
          Toast("the address's length is too long ( less than 65 )");
          return false;
        } else if (!Reg.gstPhone.test(gst.phone)) {
          Toast("Phone can't less than 10 digits");
          return false;
        } else {
          order.ordersGSTInfo = this.ordersGSTInfo;
        }
      }

      for (let v in adults) {
        adults[v] = this.adultsFormDetail[v];
      }
      for (let v in children) {
        children[v] = this.childrenFormDetail[v];
      }
      for (let v in infants) {
        infants[v] = this.infantsFormDetail[v];
      }
      // var nreg = /^[A-Za-z\s\'\-\.]*[A-Za-z]+[A-Za-z\s\'\-\.]*$/;

      for (let i = 0; i < adults.length; i++) {
        if (
          typeof adults[i].firstname == "undefined" ||
          typeof adults[i].lastname == "undefined" ||
          adults[i].firstname.trim() == "" ||
          adults[i].lastname.trim() == "" ||
          adults[i].title == "Gender"
        ) {
          return;
        }
        for(let j = 0; j < adults.length; j++){
          if(j != i){
            if(
              adults[i].firstname == adults[j].firstname &&
              adults[i].lastname == adults[j].lastname
            ){
              Toast({
                message: "Passenger names can't be same.",
                duration: 2000
              });
              return false;
            }
          }
        }

        if (!Reg.name.test(adults[i].firstname)) {
          Toast({
            message: "Please enter correct First Name",
            duration: 2000
          });
          return false;
        }

        if (!Reg.name.test(adults[i].lastname)) {
          Toast({
            message: "Please enter correct Last Name",
            duration: 2000
          });
          return false;
        }
        if (Reg.name.test(adults[i].lastname) && adults[i].lastname.length < 2) {
          Toast({
            message: "Last Name should be at least 2 characters long.",
            duration: 2000
          });
          return false;
        }

        if(this.isNeedPassport){
          if (!Reg.passport.test(adults[i].cardNo)) {
            Toast({
              message: "Please enter correct Passport Number",
              duration: 2000
            });
            return false;
          }
        }
        if(this.isNeedPassport){
          if ((new Date(adults[i].cardValid) <= new Date())) {
            Toast({
              message: "The passport has expire date.",
              duration: 2000
            });
            return false;
          }
        }
        

        if (adults[i].birthday == null && this.needDate) {
          return;
        }

        adults[i].firstname = this.adultsFormDetail[i].firstname;
        adults[i].lastname = this.adultsFormDetail[i].lastname;
        adults[i].symbel = "adult_" + i;
      }
      for (let i = 0; i < children.length; i++) {
        if (
          typeof children[i].firstname == "undefined" ||
          typeof children[i].lastname == "undefined" ||
          children[i].firstname.trim() == "" ||
          children[i].lastname.trim() == "" ||
          children[i].title == "Gender"
        ) {
          return;
        }

        for(let j = 0; j < children.length; j++){
          if(j != i){
            if(
              children[i].firstname == children[j].firstname &&
              children[i].lastname == children[j].lastname
            ){
              Toast({
                message: "Passenger names can't be same.",
                duration: 2000
              });
              return false;
            }
          }
        }
        if (!Reg.name.test(children[i].firstname)) {
          Toast({
            message: "Please enter correct First Name",
            duration: 2000
          });
          return false;
        }

        if (!Reg.name.test(children[i].lastname)) {
          Toast({
            message: "Please enter correct Last Name",
            duration: 2000
          });
          return false;
        }
        if (Reg.name.test(children[i].lastname) && children[i].lastname.length < 2) {
          Toast({
            message: "Last Name should be at least 2 characters long.",
            duration: 2000
          });
          return false;
        }
        
        if(this.isNeedPassport){
          if (!Reg.passport.test(children[i].cardNo)) {
            Toast({
              message: "Please enter correct Passport Number",
              duration: 2000
            });
            return false;
          }
        }
        
        if(this.isNeedPassport){
          if ((new Date(children[i].cardValid) <= new Date())) {
            Toast({
              message: "The passport has expire date.",
              duration: 2000
            });
            return false;
          }
        }

        children[i].symbel = "child_" + i;
      }
      for (let i = 0; i < infants.length; i++) {
        if (
          typeof infants[i].firstname == "undefined" ||
          typeof infants[i].lastname == "undefined" ||
          infants[i].firstname.trim() == "" ||
          infants[i].lastname.trim() == "" ||
          infants[i].title == "Gender"
        ) {
          return;
        }

        for(let j = 0; j < infants.length; j++){
          if(j != i){
            if(
              infants[i].firstname == infants[j].firstname &&
              infants[i].lastname == infants[j].lastname
            ){
              Toast({
                message: "Passenger names can't be same.",
                duration: 2000
              });
              return false;
            }
          }
        }

        if (!Reg.name.test(infants[i].firstname)) {
          Toast({
            message: "Please enter correct First Name",
            duration: 2000
          });
          return false;
        }

        if (!Reg.name.test(infants[i].lastname)) {
          Toast({
            message: "Please enter correct Last Name",
            duration: 2000
          });
          return false;
        }
        if (Reg.name.test(infants[i].lastname) && infants[i].lastname.length < 2) {
          Toast({
            message: "Last Name should be at least 2 characters long.",
            duration: 2000
          });
          return false;
        }

        if(this.isNeedPassport){
          if (!Reg.passport.test(infants[i].cardNo)) {
            Toast({
              message: "Please enter correct Passport Number",
              duration: 2000
            });
            return false;
          }
        }
        
        if(this.isNeedPassport){
          if ((new Date(infants[i].cardValid) <= new Date())) {
            Toast({
              message: "The passport has expire date.",
              duration: 2000
            });
            return false;
          }
        }

        infants[i].symbel = "infants_" + i;
      }

      var $mval = this.contact.mobile;
      var $eval = this.contact.email;
      var $nval = this.contact.contactName;

      var nregw = /^[A-Za-z\s\'\-\.]*[A-Za-z]+[A-Za-z\s\'\-\.]*$/;
      var mlw = this.contact.mobile + "";

      if (!nregw.test($nval)) {
        return false;
      } else if (!Reg.onlyNumber1.test(this.contact.mobile)) {
        return false;
      }else if(Reg.onlyNumber1.test(this.contact.mobile)){
        if(this.contact.code == '91' && String(this.contact.mobile).length != 10){
          Toast("Please enter a valid mobile number");
          return false;
        }else 
        if( this.contact.code == '86' && String(this.contact.mobile).length != 11){
          Toast("Please enter a valid mobile number");
          return false;
        }else{
          if (!Reg.email.test($eval)) {
        return false;
      } else {
        let self = this;
        let contactInfo = order.contactInfo;
        contactInfo.cellphone = this.contact.code + " " + this.contact.mobile;
        contactInfo.email = this.contact.email;
        contactInfo.name = this.contact.contactName;
        GetFlightOrderUtil.setOrderIntoSession(order, sessionStorage);
        Indicator.open({
          spinnerType: "fading-circle",
          text: "Checking the fare"
        });
        order.deviceNo = self.deviceNo;
        if (
          self.needDate ||
          order.children.length != 0 ||
          order.infants.length != 0
        ) {
          order
            .checkPassengerAge(self)
            .then(res => {
              if (!res.success) {
                
                Indicator.close();
                Toast({
                  message: "age is wrong",
                  duration: 2500
                });
                return;
              } else {
                var stop = setInterval(function() {
                  if (self.ifChecked) {
                    clearInterval(stop);
                    self.makeOrder();
                  }
                }, 1000);
              }
            })
            .catch(err => {
              Indicator.close();
              Toast({
                message: err.status,
                duration: 2500
              });
            });
        } else {
          var stop = setInterval(function() {
            if (self.ifChecked) {
              clearInterval(stop);
              self.makeOrder();
            }
          }, 1000);
        }
      }
      GetFlightOrderUtil.setOrderIntoSession(order, sessionStorage);
        }
      }
    },

    ...mapMutations([mutaionNames.setBaggageInfo]),

    fareRule(arr) {
      let traverllNum = this.travellerNum;
      let averagePrice = Math.round(arr.realPrice / traverllNum);
      this.$router.push({
        path: "/book/fare",
        query: {
          flightNo: arr.flightNumber,
          departTimeStamp: arr.departTimeStamp,
          averagePrice: averagePrice,
          refundable: arr.fee.refundable
        }
      });
    },
    radio1() {
      if (this.ifCashback) {
        Toast({
          message: "Sorry,if you choose Cashback Price,no coupons are allowed",
          duration: 2000
        });
        return false;
      }
      this.isSelecA = !this.isSelecA;
      this.Noclick = !this.Noclick;
      if (this.isSelecA && this.isSelecB) {
        this.isSelecB = false;
      }
      if (!this.isSelecA) {
        this.$refs.coupon.disabled = true;
      } else {
        this.$refs.coupon.disabled = false;
      }
    },
    getFlightNumber(key) {
      return this.$store.getters.flightOrder[key].flightNumber.split("/");
    },
    newGetCoupon() {
      let json;
      try {
        let str = this.ifIN ? "isInternational=2" : "isInternational=1";
        json = window.heg.getNativeSource();
        Coupon.newGetCoupon(this, str)
          .then(res => {
            this.deviceType = 1;
            this.couponCode = res.coupon;
            // this.isSelecA = true;
            this.applyCode();
          })
          .catch(err => {});
      } catch (e) {}
    },

    getCouponValue() {
      let self = this;
      let tp = JSON.parse(sessionStorage.ticketType);
      if (this.isSelecA) {
        Coupon.getCouponValue(self, tp).then(res => {
          self.extraRs = res.value;
          self.coupon = res;
          sessionStorage.setItem("couponCode", self.couponCode);
          self.$store.commit(types.GET_COUPON, res);
        }).catch(err => {
          Toast({
            message: err,
            duration: 2000
          });
          self.coupon = null;
          this.$store.commit(types.GET_COUPON, null);
          self.extraRs = 0;
        });
      }
    },

    applyCode() {
      if (this.isSelecA) {
        let coupon = this.$store.getters.coupon;
        let oldCouponCode = "";
        if (coupon) {
          oldCouponCode = coupon.couponCode;
        } else {
          oldCouponCode = "";
        }
        if (this.couponCode == oldCouponCode && this.coupon) {
          // Toast({
          //   message: "Price has changed",
          //   duration: 1000
          // });
        }else{
          this.getCouponValue();
        }
      }
    },
    //page3
    gstOpen() {
      this.isGST = !this.isGST;
    },
    getSearchInfoKey(data){
      let name;
      let order = JSON.parse(sessionStorage.order);
      if(order.orderType == 'one'){
        name = data["departAirport"]["iataCode"]+"-"+data["arriveAirport"]["iataCode"]
          +"-"+new Date(data["departDate"]).getFullYear() +""+ (new Date(data["departDate"]).getMonth()+1<=9?"0"+(new Date(data["departDate"]).getMonth()+1):(new Date(data["departDate"]).getMonth()+1))+""+new Date(data["departDate"]).getDate()
          +"-"+data["passengersNum"]["adults"]+"-"+data["passengersNum"]["children"]+"-"+data["passengersNum"]["infants"]
          +"-"+data["defaultCabinClass"]
      }else{
        name = data["departAirport"]["iataCode"]+"-"+data["arriveAirport"]["iataCode"]
          +"-"+new Date(data["departDate"]).getFullYear() +""+ (new Date(data["departDate"]).getMonth()+1<=9?"0"+(new Date(data["departDate"]).getMonth()+1):(new Date(data["departDate"]).getMonth()+1))+""+new Date(data["departDate"]).getDate()
          +"-"+new Date(data["returnDate"]).getFullYear() +""+ (new Date(data["returnDate"]).getMonth()+1<=9?"0"+(new Date(data["returnDate"]).getMonth()+1):(new Date(data["returnDate"]).getMonth()+1))+""+new Date(data["returnDate"]).getDate()
          +"-"+data["passengersNum"]["adults"]+"-"+data["passengersNum"]["children"]+"-"+data["passengersNum"]["infants"]
          +"-"+data["defaultCabinClass"]
      }
      return name;
    },
    getNewArr(){
      // let searchInfoKey = this.getSearchInfoKey(JSON.parse(sessionStorage.getItem("searchInfo")));
      // let newObj = JSON.parse(localStorage.searchKey);
      // let obj = {};
      // for(let key in newObj){
      //   if(searchInfoKey != key){
      //     obj[key] = newObj[key];
      //   }
      // }
      // localStorage.setItem("searchKey", JSON.stringify(obj));
      // localStorage.removeItem(searchInfoKey);
    },
    getResult(vueComp, token) {
      var self = this;
      this.flightOrder.getCheckResult(vueComp, token).then(res => {
        if (res.code == 0) {
          self.ifChecked = true;
          try{
            let trackObj = {
              apiMethodName: 'getCheckResult',
              apiRequestParamter: token,
              apiHttpStatus: '200',
              apiResponseStatus: res.success,
              elementId: ''
            };
            hegTrack(vueComp, trackObj);
          }catch(e){}
        } else if (res.code == 1) {
          try {
            window.dataLayer.push({
              event: "verification_subscribe",
              "gtm.category": "verification",
              "gtm.action": "up",
              varifyDevice: this.deviceType == 0 ? "mobile" : "Android"
            });
          } catch (error) {};
          try{
            let trackObj = {
              apiMethodName: 'getCheckResult',
              apiRequestParamter: token,
              apiHttpStatus: '200',
              apiResponseStatus: res.success,
              elementId: ''
            };
            hegTrack(vueComp, trackObj);
          }catch(e){}
          // self.fareUpNote();
          // self.getFlights(res.token);
          self.checkPriceToken = res.token;
          self.ifChecked = true;
        } else if (res.code == 9) {
          if (window.location.href.split("/")[3] != "book") {
            clearTimeout(stop);
          } else {
            var stop = null;
            self.reqTime++;
            stop = setTimeout(function() {
              self.getResult(self, token);
            }, 2000);
            if (self.reqTime > 29) {
              clearTimeout(stop);
              Indicator.close();
              if(!res.proceed) {
                self.showPopup = true;
                this.getNewArr();
              }else{
                self.ifChecked = true;
                self.showPopup = false;
              }
            }
          }
        } else {
          clearTimeout(stop);
          Indicator.close();
          self.allow = false;
          Toast({
            message: "the flight does not exist,please try again",
            duration: 2500
          });
          return Promise.reject();
        }
      }).catch(err => {
        this.getNewArr();
        try {
          window.dataLayer.push({
            event: "verification_subscribe",
            "gtm.category": "verification",
            "gtm.action": "failure",
            varifyDevice: this.deviceType == 0 ? "mobile" : "Android"
          });
        } catch (error) {};
        try{
          let trackObj = {
            apiMethodName: 'getCheckResult',
            apiRequestParamter: token,
            apiHttpStatus: (err.response && err.response.status) ||  '200',
            apiResponseStatus: false,
            elementId: ''
          };
          hegTrack(vueComp, trackObj);
        }catch(e){}
        this.flightOrder.orderType == "one"? 
        self.$router.push("/oneway")
        : self.ifIN ? self.$router.push("/international")
        : self.$router.push("/roundtrip");
      });
    },
    changeFlightsData(json, orderInfo) {
      var od = orderInfo.departFlight.flightInfoBack.fee;
      var jd = json.departFlight.fee;

      if (orderInfo.returnFlight) {
        var or = orderInfo.returnFlight.flightInfoBack.fee;
        var jr = json.returnFlight.fee;
      }

      if (orderInfo.returnCash) {
        od.obfp = jd.obfp;
        od.ogst = jd.ogst;
        od.bfp = jd.bfp;
        od.gst = jd.gst;
        orderInfo.departFlight.price = jd.obfp + jd.ogst;
        if (orderInfo.returnFlight) {
          or.obfp = jr.obfp;
          or.ogst = jr.ogst;
          or.bfp = jr.bfp;
          or.gst = jr.gst;
          orderInfo.returnFlight.price = jr.obfp + jr.ogst;
        }
      } else {
        od.obfp = jd.obfp;
        od.ogst = jd.ogst;
        od.bfp = jd.bfp;
        od.gst = jd.gst;
        orderInfo.departFlight.price = jd.bfp + jd.gst;
        if (orderInfo.returnFlight) {
          or.obfp = jr.obfp;
          or.ogst = jr.ogst;
          or.bfp = jr.bfp;
          or.gst = jr.gst;
          orderInfo.returnFlight.price = jr.bfp + jr.gst;
        }
      }
      this.$store.commit(OrderMutaionNames.setupOrder, orderInfo);
      GetFlightOrderUtil.setOrderIntoSession(orderInfo, sessionStorage);
    },
    async getFlights(token) {
      let orderInfo = this.flightOrder;

      let url = DomainManager.getFlights("token=" + token);
      await this.$axios
        .get(url)
        .then(res => {
          if (res.code === 0) {
            let json = res.flights;
            if(res.flights.maxPsrNum){
              this.maxPsrNum = res.flights.maxPsrNum;
            }

            this.checkPassport.requestFromClient = json.requestFromClient;
            this.checkPassport.departFlight.stopByFlightArray =
              json.departFlight.stopByFlightArray;

            this.allowGST = !!json.allowGST;
            this.needDate = !!json.birthdateRequired;
            orderInfo.serviceFee = json.departFlight.fee.cf;

            let baginfo = json.departFlight.stopByFlightArray.map(el => ({
              ...el.baggageInfo,
              flightNumber: el.fn
            }));

            if (json.returnFlight) {
              this.returnFlight.stopByFlightArray =
                json.returnFlight.stopByFlightArray;
              this.$set(this.checkPassport, "returnFlight", this.returnFlight);

              json.returnFlight.stopByFlightArray.forEach(el => {
                baginfo.push({ ...el.baggageInfo, flightNumber: el.fn });
              });
              orderInfo.serviceFee =
                json.departFlight.fee.cf + json.returnFlight.fee.cf;
              this.flightOrder.returnFlight.fee = json.returnFlight.fee;
            }

            this.flightOrder.departFlight.fee = json.departFlight.fee;
            this.getCheckPassport(this.checkPassport);
            orderInfo.baggageinfo = baginfo;
            this.changeFlightsData(json, orderInfo);

            let coupon = this.$store.getters.coupon;

            if(coupon){
              this.getCouponValue();
            }
          } else if (res.code == 7) {
            if (sessionStorage.flightType != "") {
              Toast("Your session has expired.");
              var type = sessionStorage.flightType;
              type == "one"
                ? this.$router.push("/oneway")
                : this.ifIN
                  ? this.$router.push("/international")
                  : this.$router.push("/roundtrip");
            } else {
              Toast("Your session has expired.");
              this.$router.push("/");
            }
          }
        })
        .catch(err => {
          this.$router.push("/");
        });
      return;
    },
    checkPrice() {
      this.flightOrder
        .checkPrice(this)
        .then(res => {
          if (res.code == 7) {
            try {
              window.dataLayer.push({
                event: "verification_subscribe",
                "gtm.category": "verification",
                "gtm.action": "failure",
                varifyDevice: this.deviceType == 0 ? "mobile" : "Android"
              });
            } catch (error) {};
            if (sessionStorage.flightType != "") {
              Toast("Your session has expired.");
              var type = sessionStorage.flightType;
              type == "one"
                ? this.$router.push("/oneway")
                : this.ifIN
                  ? this.$router.push("/international")
                  : this.$router.push("/roundtrip");
            } else {
              Toast("Your session has expired.");
              this.$router.push("/");
            }
          }
          var token = "token=" + res.token;
          this.checkCountAndPriceToken = res.token;
          this.getResult(this, token);
        })
        .catch(err => {
          try {
            window.dataLayer.push({
              event: "verification_subscribe",
              "gtm.category": "verification",
              "gtm.action": "failure",
              varifyDevice: this.deviceType == 0 ? "mobile" : "Android"
            });
          } catch (error) {};
          console.log(err);
        });
    },
    fareUpNote() {
      if (this.ifCashback) {
        Toast({
          message:
            "Fare Changed Alert: Your fare has changed from " +
            this.flightOrder.disPrice +
            " to " +
            self.fullPrice,
          duration: 3500
        });
      } else {
        Toast({
          message:
            "Fare Changed Alert: Your fare has changed from " +
            this.flightOrder.disPrice +
            " to " +
            this.payPrice,
          duration: 3500
        });
      }
    },
    pegInfoData() {
      let order = this.flightOrder;
      for (let i = 0; i < order.adults.length; i++) {
        let item = null;
        if (this.ifIN) {
          item = {
            firstname: "",
            lastname: "",
            title: "Gender",
            birthday: null,
            cardNo: "",
            cardType: 1,
            country: "IN",
            cardValid: ""
          };
        } else {
          item = {
            firstname: "",
            lastname: "",
            title: "Gender",
            birthday: null
          };
        }

        this.adultsFormDetail.push(item);
      }

      for (let i = 0; i < order.children.length; i++) {
        let item = null;
        if (this.ifIN) {
          item = {
            firstname: "",
            lastname: "",
            title: "Gender",
            birthday: null,
            cardNo: "",
            cardType: 1,
            country: "IN",
            cardValid: ""
          };
        } else {
          item = {
            firstname: "",
            lastname: "",
            title: "Gender",
            birthday: null
          };
        }

        this.childrenFormDetail.push(item);
      }

      for (let i = 0; i < order.infants.length; i++) {
        let item = null;
        if (this.ifIN) {
          item = {
            firstname: "",
            lastname: "",
            title: "Gender",
            birthday: null,
            cardNo: "",
            cardType: 1,
            country: "Country",
            cardValid: ""
          };
        } else {
          item = {
            firstname: "",
            lastname: "",
            title: "Gender",
            birthday: null
          };
        }
        this.infantsFormDetail.push(item);
      }
    }
  },
  mounted() {
    this.couponCode = "";
    this.getInsureData();
    let self = this;
    this.isSelecA = !this.ifCashback;
    let flightData = JSON.parse(sessionStorage.order);
    if (self.ifCashback) {
      if (flightData.orderType == "one") {
        var dataPrice = flightData.departFlight.price;
      } else {
        var dataPrice =
          flightData.departFlight.price + flightData.returnFlight.price;
      }
    } else {
      if (flightData.orderType == "one") {
        var dataPrice = flightData.departFlight.realPrice;
      } else {
        var dataPrice =
          flightData.departFlight.realPrice +
          flightData.returnFlight.price -
          flightData.returnFlight.commonDiscount;
      }
    }
    try {
      window.dataLayer.push({
        google_tag_params: {
          flight_originid: this.flightOrder.departAirport.iataCode, //航班始发地三字代码
          flight_destid: this.flightOrder.destinationAirport.iataCode, //航班目的地三字代码
          flight_startdate: this.flightOrder.departAirport.departTime, //航班去程日期
          flight_enddate: this.flightOrder.destinationAirport.returnTime || null, //航班回程日期
          page_type: "Book", //页面类型
          flight_totalvalue: dataPrice //航班价格
        }
      });
    } catch (error) {}

    let coupon = self.$store.getters.coupon;
    if (coupon) {
      self.couponCode = coupon.couponCode;
    } else {
      self.couponCode = "";
    }
    //page2
    let order = self.flightOrder;
    if (order.contactInfo != null) {
      let contactInfo = order.contactInfo;
      if (typeof contactInfo.cellphone != "undefined")
        self.contact.mobile = contactInfo.cellphone.split(" ")[1];
      if (typeof contactInfo.email != "undefined")
        self.contact.email = contactInfo.email;
      if (typeof contactInfo.name != "undefined")
        self.contact.contactName = contactInfo.name;
    }
  },
};
</script>
<style lang="less">
.book-page {
  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-input-placeholder {
    color: #ccc;
  }

  ::-moz-placeholder {
    color: #ccc;
  }

  :-moz-placeholder {
    color: #ccc;
  }

  .header {
    background: #0b9d78;
    box-sizing: border-box;
    span {
      color: #fff;
      font-size: 0.768rem;
    }
    .placeholder {
      opacity: 0;
    }
    .title{
      padding:0;
      border:none;
    }
  }
  
  .container {
    overflow: scroll;
    background: #ebebeb;
  
    .title {
      padding: 0.55rem 0.64rem;
      text-align: left;
      border-bottom: 1px solid #d6d6d6;
      span {
        display: block;
      }
      .title-info {
        font-size: 0.68rem;
        color: #666;
        font-weight: normal;
        text-align: left;
      }
      .title-icon {
        width: 18px;
        height: 18px;
        border: 2px solid #0b9d78;
        color: #0b9d78;
        box-sizing: border-box;
        border-radius: 10px;
        font-size: 12px;
        text-align: center;
        line-height: 14px;
        vertical-align: middle;
        margin-right: 0.2rem;
      }
    }
    .book-traveller {
      background: #fff;
      margin-bottom: 0.21rem;
      .tips {
        padding: 0.768rem 0.64rem;
      }

      .traveller-wrapper {
        padding: 0.64rem;
        .traveller-info,
        .contact-info {
          background-color: #fff;
          border-radius: 0.4rem;

          li {
            box-sizing: border-box;
            font-size: 0.68rem;
            color: #999;
            width: 100%;
            border-bottom: 1px solid #eee;
            padding: 0.1rem 0.68rem;
            cursor: pointer;
            span:nth-of-type(2) {
              font-size: 0.52rem;
            }
            span {
              display: block;
            }
            .sel {
              width: 0.7rem;
              display: inline-block; // background: url('../../../assets/images/book/detail_next.png') center no-repeat;
              background-size: 0.6rem;
              transform: rotateZ(-90deg);
              -webkit-transform: rotateZ(-90deg);
            }
            label {
              padding-right: 0.2rem;
            }
            .select-group {
              position: relative;
              width: 20%;
              height: 1.7rem;
              margin-right: 0.5rem;
              select {
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                z-index: 9;
                display: block;
                width: 100%;
                height: 100%;
              }
              span {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                text-align: center;
                line-height: 1.8rem;
                font-size: 0.68rem;
                font-weight: normal;
                color: #000;
              }
            }
          }
        }
        h2 {
          font-size: 0.64rem;
          text-align: left;
          padding: 0.5rem;
        }
        .traveller-info {
          .traveller-tips {
            padding-bottom: 0.5rem;
            .traveller-tips-title {
              font-size: 0.64rem;
              display: block;
            }
            .traveller-tips-total {
              font-size: 0.512rem;
              color: #ccc;
              display: block;
            }
          }

          .traveller-title {
            text-align: center;
            padding: 0 0.2rem 0.2rem;
            border-bottom: 1px solid #ddd;
            margin-bottom: 0.3rem;
            font-size: 0.64rem;
            color: #5c5c5c;
          }
          .traveller-addAdult,
          .traveller-addChild,
          .traveller-addBaby {
            text-align: left;
            height: 1.5rem;
            overflow: hidden;
            .traveller-addItem {
              width: 50%;
              height: 1.5rem;
              color: #999;
              line-height: 1.5rem;
              display: inline-block;
              text-align: left;
              .checkbox {
                width: 0.8rem;
                height: 0.8rem;
                font-size: 0.8rem;
                color: #777;
                background: url("../../assets/images/home/hide.png") top center
                  no-repeat;
                background-size: 100% 100%;
                border-radius: 0.1rem;
              }
              .checkboxed {
                border: 1px solid #ffad3d;
                background-size: 100% 100%;
                background: url("../../assets/images/home/show.png") center center
                  no-repeat;
              }
            }
          }
          .btnHeight {
            height: auto;
          }
          .traveller-btn {
            margin: 0 auto 0.2rem auto;
            width: 0;
            height: 0;
          }
          .bot-btn {
            border-left: 0.3rem solid transparent;
            border-right: 0.3rem solid transparent;
            border-top: 0.4rem solid #000;
          }
          .top-btn {
            border-left: 0.3rem solid transparent;
            border-right: 0.3rem solid transparent;
            border-bottom: 0.4rem solid #000;
          }

          .traveller-form {
            // padding: 0.3rem 0.68rem;
            // border: 1px solid #dddddd;
            width: 100%;
            border-radius: 2px;
            margin-bottom: 0.3rem;
            .passenger-from {
              font-size: 0.64rem;
              width: 100%;
              line-height: 1.68rem;
              border: 1px solid #dddddd;
              .group-title {
                display: block;
                height: 100%;
                width: 20%;
                text-align: center;
                border-right: 1px solid #ddd; // font-size: 0.512rem;
                font-size: 0.64rem;
              }
              select,
              input {
                font-size: 0.68rem;
                border-right: 1px solid #ddd;
                padding: 4px 0;
                display: block;
                text-align: center;
                margin-bottom: 1px;
                border-radius: 0; // font-size: 0.512rem;
                font-size: 0.64rem;
              }
              input {
                box-sizing: border-box;
                width: 27.5%; // font-size: 0.512rem;
                font-size: 0.64rem;
              }
              input:-moz-placeholder,
              input::-moz-placeholder {
                color: #b9b9b9;
              }
              span {
                box-sizing: border-box;
                font-size: 0.68rem;
                display: block;
              }
              .passager-detail-sex {
                display: block;
              }
              .title-wrap {
                display: block;
                width: 25%;
                position: relative; // font-size: 0.512rem;
                font-size: 0.64rem;
                text-align: left;
                text-indent: 0.4rem;
                background: url("../../assets/images/book/arrow_down_empty.png")
                  94% center no-repeat;
                background-size: 14%;
              }
              .passager-detail-sex {
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0;
              }
            }
          }
          .date-form {
            border: 1px solid #ddd;
            border-top: none;
            line-height: 1.68rem;
            width: 100%;
            .form-group {
              font-size: 0.68rem;
              label {
                width: 20%;
                text-align: center;
                display: block;
                font-size: 0.64rem;

                border-right: 1px solid #ddd;
                box-sizing: border-box;
              }
              span {
                display: block;
                width: 80%;
                height: 100%;
                text-align: center;
                font-size: 0.64rem;
                position: relative;
                font-size: 0.68rem;
                input {
                  width: 100%;
                  height: 100%;
                  font-size: 0.68rem;
                  box-sizing: border-box;
                  text-align: right;
                  position: absolute;
                  top: 0;
                  left: 0;
                  opacity: 0;
                  z-index:5;
                }
                img{
                  width:0.75rem;
                  height:0.5rem;
                  position:absolute;
                  right:0.3rem;
                  top:0;
                  bottom:0;
                  margin:auto;
                }
              }
            }
          }

          .passport-form {
            border: 1px solid #ddd;
            border-top: none;
            height: 1.68rem;
            line-height: 1.68rem;
            width: 100%;
            .passport-name {
              font-size: 0.64rem;
              width: 30%;
              border-right: 1px solid #ddd;
            }
            input {
              font-size: 0.64rem;
              padding: 0.21rem;
              box-sizing: border-box;
              display: block;
              width: 45%;
              text-align: center;
            }
            .country-wrap {
              position: relative;
              width: 25%;
              font-size: 0.64rem;
              border-left: 1px solid #ddd;
              line-height: 1.68rem;
              text-align: left;
              text-indent: 0.4rem;
              background: url("../../assets/images/book/arrow_down_empty.png") 94%
                center no-repeat;
              select {
                position: absolute;
                display: block;
                width: 100%;
                height: 100%;
                opacity: 0;
                top: 0;
                left: 0;
              }
            }
          }

          .passport-date-form {
            border: 1px solid #ddd;
            border-top: none;
            line-height: 1.68rem;
            width: 100%;
            .form-group {
              font-size: 0.68rem;
              label {
                width: 30%;
                text-align: center;
                display: block;
                font-size: 0.64rem;

                border-right: 1px solid #ddd;
                box-sizing: border-box;
              }
              span {
                display: block;
                width: 70%;
                height: 100%;
                text-align: center;
                font-size: 0.64rem;
                position: relative;
                font-size: 0.68rem;
                input {
                  width: 100%;
                  height: 100%;
                  font-size: 0.68rem;
                  box-sizing: border-box;
                  text-align: right;
                  position: absolute;
                  top: 0;
                  left: 0;
                  opacity: 0;
                  z-index:5;
                }
                img{
                  width:0.75rem;
                  height:0.5rem;
                  position:absolute;
                  right:0.3rem;
                  top:0;
                  bottom:0;
                  margin:auto;
                }
              }
            }
          }
        }

        .contact-info {
          li {
            text-align: left;
            padding:0 0.68rem;
            label {
              width: 20%;
              text-align: left;
              font-size: 0.68rem;
            }
            input {
              padding: 0.2rem;
              text-indent: 0;
              width: 100%;
              font-size: 0.68rem;
              box-sizing: border-box;
            }
            select {
              width: 30%;
              font-size: 0.64rem;
              padding: 0.2rem; // background: url('../../assets/images/book/arrow_down_full.png') 97% 55% no-repeat;
              // background-size: 20%;
            }
          }
          // .f_li{margin-bottom:1rem;}
          .errorStyle{border-bottom:1px solid #FF5F61;}
          .contact_errLi{
            color:#FF5F61;
            font-size: 12px;
            padding:5px 0.68rem;
            border-bottom:0;
          }
        }
        p {
          font-size: 0.52rem;
          color: #666;
          text-align: left;
          padding: 0.6rem 0.68rem 0 0.68rem;
        }

        .done {
          .btn {
            width: 100%;
            font-size: 0.768rem;
            color: #fff;
            height: 1.87rem;
            margin-top: 2rem;
            border-radius: 6px;
            background-color: #ffad3d;
            display: inline-block;
            cursor: pointer;
          }
        }
      }
    }
    .book-gst {
      background: #fff;
      margin-bottom: 0.21rem;
      width: 100%;
      box-sizing: border-box;
      .form-group {
        margin-top: 0.23rem;
        #check {
          margin-bottom: 0.2rem;
        }
        .round1 {
          width: 0.6rem;
          height: 0.6rem;
          border: 1px solid #ccc;
          position: relative;
          .round2 {
            width: 0.4rem;
            height: 0.4rem;
            background-color: #ffa033;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            -webkit-transform: translateY(-50%) translateX(-50%);
          }
        }
        .changeC {
          color: #ffad3d;
        }
        input {
          width: 100%;
          text-indent: 0;
          box-sizing: border-box;
          padding: 0.2rem 0.3rem;
          border: 1px solid #ccc;
        }
        input:focus {
          border: 1px solid #ffad3d;
        }
        input:checked {
          color: #ffad3d;
          background: #ffad3d;
        }
        #check {
          display: table-cell;
          vertical-align: middle;
          width: 0.6rem;
          height: 0.6rem;
        }
        .checkinfo {
          display: table-cell;
          vertical-align: middle;
          font-size: 0.64rem;
        }
      }
      .sp {
        box-sizing: border-box;
        display: table;
        vertical-align: middle;
        padding: 0.64rem;
        width: 100%;
        text-align: left;
      }
      .container {
        background: #fff;
        padding: 0 0.64rem 0.64rem 0.64rem;
        .form-group {
          margin-top: 0.23rem;
          input {
            font-size: 0.512rem;
            width: 100%;
            text-indent: 0;
            box-sizing: border-box;
            padding: 0.2rem 0.3rem;
            border: 1px solid #ccc;
          }
          input:focus {
            border: 1px solid #ffad3d;
          }
          input:checked {
            color: #ffad3d;
            background: #ffad3d;
          }
          #check {
            display: table-cell;
            vertical-align: middle;
            width: 0.8rem;
            height: 0.8rem;
          }
          .checkinfo {
            display: table-cell;
            vertical-align: middle;
            font-size: 0.74rem;
          }
        }
        .sp {
          display: table;
          vertical-align: middle;
        }
      }
    }
    .book-offer {
      margin-bottom: 0.21rem;
      .offers {
        background-color: #fff;
        padding-bottom: 1.1rem;
        .offers-wrapper {
          padding: 0 0.64rem;
          width: 100%;
          box-sizing: border-box;
          .offers-group {
            font-size: 0.6rem;
            color: #ccc;
            text-align: left;
            background-color: #fff;
            border-radius: 0.2rem;
            position: relative;
            .radio-group {
              padding: 0.426rem 0;
              .round1 {
                width: 0.6rem;
                height: 0.6rem;
                border: 1px solid #ccc;
                position: relative;
                margin-right: 0.3rem;
                .round2 {
                  width: 0.4rem;
                  height: 0.4rem;
                  background-color: #ffa033;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translateY(-50%) translateX(-50%);
                  -webkit-transform: translateY(-50%) translateX(-50%);
                }
              }
            }
            .input-group {
              width: 100%;
              position: relative;
              input {
                display: block;
                box-sizing: border-box;
                height: 1.2rem;
                width: 75%;
                font-size: 0.68rem;
                padding: 0.3rem 0.3rem;
                border: 1px solid #ccc;
                border-right: 0;
                border-radius: 0;
                text-indent: 0;
              }
              img {
                width: 0.8rem;
                height: 0.6rem;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 28%;
                margin: auto;
              }
              .yellowborder {
                flex: 1;
                border: 1px solid #ffa033;
              }
              a {
                box-sizing: border-box;
                height: 1.2rem;
                line-height: 1.2rem;
                width: 25%;
                font-size: 0.68rem;
                /*padding:0.3rem 0;*/
                text-align: center;
                color: #fff;
                display: block;
              }
              .cheked {
                background-color: #ffa033;
              }
              .disabel {
                background-color: #ccc;
              }
            }
            .coupon-note {
              padding: 0.4rem 0;
              color: #333;
              span {
                color: #0b9d78;
                margin-right: 1rem;
              }
            }
            .couponList {
              width: 75%;
              position: absolute;
              background: #fff;
              max-height: 6.7rem;
              overflow: scroll;
              top: 2.74rem;
              li {
                border: 1px solid #ffa033;
                border-top: none;
                padding: 0.28rem 0.3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.311rem;
                background: #fff;
                color: #333;
                span:last-child {
                  margin-right: 1rem;
                }
              }
              .noCoupon {
                height: 4rem;
                display: block;
                .cou-img {
                  width: 2.7rem;
                  height: 2.7rem;
                  margin: 0 auto 0.3rem;
                }
                p {
                  text-align: center;
                  font-size: 0.68rem;
                }
              }
            }
            .couponTips {
              p {
                padding: 0.21rem 0;
                color: red;
              }
            }
          }
        }
      }
    }
    .book-grand {
      background: #fff;
      .price-info {
        padding: 0 0.64rem 1.1rem;
        .total-price {
          text-align: right;
          padding: 0.64rem;
          .price,
          .old-price {
            display: block;
          }
          .price {
            color: #f65858;
            font-size: 0.853rem;
          }
          .old-price {
            color: #ddd;
            font-size: 0.469rem;
            padding-top: 0.15rem;
          }
        }
        .agreement {
          font-size: 0.427rem;
          padding-bottom: 0.64rem;
          .link {
            color: #17a27f;
          }
          .input {
            display: block;
            line-height: 1rem;
            width: 0.6rem;
            height: 0.6rem;
          }
          span {
            line-height: 1rem;
          }
        }
        .confirm {
          font-size: 0.78rem;
          display: block;
          margin: 0 0.64rem;
          height: 1.5rem;
          line-height: 1.5rem;
          color: #fff;
          background: #ffad3d;
          text-align: center;
          box-sizing: border-box;
          border-radius: 4px;
        }
      }
    }
  }
  .dialogPopup{
    border-radius:7px 7px 0 0;
  }
  
}
</style>