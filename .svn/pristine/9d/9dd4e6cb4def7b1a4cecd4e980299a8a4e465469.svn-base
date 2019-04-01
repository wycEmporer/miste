<template>
  <div class="wrapper" id="f-wrapper3">
    <head-top class="header" :operate="routeWhere" >
      <i slot="left" class="iconfont icon-back"></i>
      <div slot="title" class="title">
        <div v-if="getFlightOrder!=null" class="title-detail">
          <span>{{getFlightOrder.departAirport.cityName}}</span>
          <span> - </span>
          <span>{{getFlightOrder.destinationAirport.cityName}}</span>
        </div>
        <div class="title-info">
          <span>{{flightTimeDepartRangeString}}</span> -
          <span>{{flightTimeReturnRangeString}}</span>
          <span>&bull;</span>
          <span>{{travellerNum > 1?travellerNum+" Travellers":travellerNum+" Traveller"}}</span>
        </div>
      </div>
      <div slot="right" class="next fare-alert" v-show="true" >
        <!-- <mt-switch v-model="fareAlertValue" @change="showFareAlertDialogBtn"></mt-switch>
        <span class="right-span">Fare Alerts</span> -->
        <i class="iconfont icon-filter" @click="$router.push('/international/filter')"></i>
      </div>
    </head-top>
    <loading v-if="showLoad"></loading>
    <mt-popup v-model="showPopup" popup-transition="popup-fade" modal="true" closeOnClickModal="false">
      <failure>
        <div slot="head">Flight Unavailable</div>
        <p slot="content">{{flightErrorMsg}}</p>
        <mt-button @click="goBack" slot="btn" class="btn" type="default">OK</mt-button>
      </failure>
    </mt-popup>
    <mt-popup v-model="showPopup2" popup-transition="popup-fade" modal="true" closeOnClickModal="false">
      <failure>
        <div slot="head">Flight Unavailable</div>
        <p slot="content">We are really sorry,but the flight you selected is no longer available.please select a different flight</p>
        <mt-button @click="close" slot="btn" class="btn" type="default">OK</mt-button>
      </failure>
    </mt-popup>
    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
      <keep-alive>
        <router-view :filter="onewayFilter" :airlineArr="airlineArr" class="animated"></router-view>
      </keep-alive>
    </transition>
    <div class="container">
      <div class="info-wrapper">
        <div class="con-title">
          <div class="span-wrap flex space-betweens">
            <div class="sort-form flex align-items-center content-center" v-for='(item,index) in titleList' @click='sort(index)' :key="index">
              <div class="sort-wrap flex align-items-center content-center">
                <span :class='{active:sortType==index}'>{{item}}
                </span>
                <i :class='{active:sortType==index}' class="iconfont icon-arrow"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flight-info" ref="flightInfoList">
        <ul>
          <li class="" :class="{active:this.idx==index}" v-for="(item,index) in renderArr " :key="item.id">
            <div class="flight-content  ">
              <div class="flight-content1 align-items-center"  @click="onFlightItemClick(index)">
                <div class="depart-group flex space-between align-items-center">
                  <div class="flight-time">
                    <div class="flight-time-ico">
                      <img :src="item.d.airline.iconPath" />
                    </div>
                    <div class="fn">{{item.d.flightNumber}}</div>
                  </div>
                  <div class="flight-time-info">
                    <div class="margininfo">
                      <div class="schedule flex space-between align-items-center">
                        <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.d.departDate)}}</span>
                        <img src="../../../assets/images/common/rect.png" alt="rect">
                        <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.d.returnDate)}}</span>
                      </div>
                      <div class="time-cost flex space-between align-items-center">
                        <span>{{item.d.flightInfoBack.wdt}}</span>
                        <span>{{(item.d.stops.length-1==0 ? 'non-stop' : item.d.stops.length-1+'stop')}}</span>
                      </div>
                    </div>
                    <div class="city-name flex space-between align-items-center">
                      <div class="depart">
                        {{getFlightOrder.departAirport.iataCode}}
                      </div>
                      <!-- <i class="iconfont icon-roundtrip"></i> -->
                      <img class="gb" src="../../../assets/images/common/icon-goback.png" alt="">
                      <div class="arrive">
                        {{getFlightOrder.destinationAirport.iataCode}}
                      </div>
                    </div>
                  </div>
                  <div class="flight-price flex">
                    <div class="flight-price-detail flex">
                      <div class="price-show flex content-end align-items-center">
                        <span class="rs">RS.</span>
                        <span>{{Math.round((item.d.bfp+item.d.gst + item.r.bfp+item.r.gst - 50)/numberOfPeople) | formatDate}}</span>
                        <!-- </h2> -->
                      </div>
                    </div>
                    <div style="color:#999;font-size:10px;text-align:right;text-decoration:line-through;">
                      <span class="rs">RS.</span> {{Math.round((item.d.obfp+item.d.ogst+item.r.obfp+item.r.ogst)/numberOfPeople) | formatDate}}
                    </div>
                  </div>
                </div>
                <div class="return-group flex space-between align-items-center">
                  <div class="flight-time">
                    <div class="flight-time-ico">
                      <img :src="item.r.airline.iconPath" />
                    </div>
                    <div class="fn">{{item.r.flightNumber}}</div>
                  </div>
                  <div class="flight-time-info">
                    <div class="margininfo">
                      <div class="schedule flex space-between align-items-center">
                        <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.r.departDate)}}</span>
                        <img src="../../../assets/images/common/rect.png" alt="rect">
                        <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.r.returnDate)}}</span>
                      </div>
                      <div class="time-cost flex space-between align-items-center">
                        <span>{{item.r.flightInfoBack.wdt}}</span>
                        <span>{{(item.r.stops.length-1==0 ? 'non-stop' : item.r.stops.length-1+'stop')}}</span>
                      </div>
                    </div>
                    <div class="city-name flex space-between align-items-center">
                      <div class="depart">
                        {{getFlightOrder.destinationAirport.iataCode}}
                      </div>
                      <!-- <i class="iconfont icon-roundtrip"></i> -->
                      <img class="gb" src="../../../assets/images/common/icon-goback.png" alt="">
                      <div class="arrive">
                        {{getFlightOrder.departAirport.iataCode}}
                      </div>
                    </div>
                  </div>
                  <div class="flight-price">
                    <div class="flight-price-detail">
                      <div class="price-show flex content-end align-items-center">
                        <!-- <span class="rs">RS.</span> -->
                        <!-- <span>{{Math.round((item.r.bfp+item.r.gst-50)/numberOfPeople) | formatDate}}</span> -->
                        <!-- </h2> -->
                      </div>
                      <div class="cashback-detail flex content-end align-items-center">
                        <span class="rs">RS.</span>
                        <span>{{Math.round(item.r.flightInfoBack.fee.maxCba/numberOfPeople)| formatDate}}</span>
                      </div>
                    </div>
                    <div class="cashback-icon flex content-end" v-if="earnTitle.isShow">
                      <div class="cash-bg" :style="cashBg">{{earnTitle.titleName}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="limit-text flex align-items-center space-between" v-if="flightLimiter == []?false:getNumberLimit(item)">
                <p>The airline supports booking of up to <span>{{ getNumber(item) }}</span> flight tickets in one order.</p>
                <a @click="$router.push('/')">Modify</a>
              </div>
              <div class="flight-cover" v-if="flightLimiter == []?false:getNumberLimit(item)"></div>
            </div>
            <div class="ad" v-if="showAD(renderArr, index)">
              <img v-if="offers[0]&&offers[0].use == 1" :src="offers[0].url" alt="" @click="ADImgClick(1)">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  const SORT_BY_TIME = 0;
  const SORT_BY_DURATION = 1;
  const SORT_BY_PRICE = 2;
  const SORT_BY_CASHBACK = 3;

  import headTop from "../../../components/head/head.vue";
  import loading from "../../../components/loading/loading.vue";
  import filter from "./filter.vue";
  import failure from "../../failure/failure.vue";
  import {
    TimeFormatUtil,
    CabinClassUtil,
    GetFlightOrderUtil
  } from "../../../models/utils";
import { Flight, FlightFactory } from "../../../models/flight";
import { bus } from "../../../main.js";
import { mapGetters } from "vuex";
import { Toast, Indicator, Button, Popup, Switch, Checklist } from "mint-ui";
import { OnewayFilter } from "../../../models/filter";
import { OnewayOrder, RoundTripOrder } from "../../../models/flightorder";
import { User } from "../../../models/user";
import { CookieUtil } from "../../../models/utils";
import { Passenger, Adult, Child, Infant } from "../../../models/passenger";
  import * as XFlight from "../../../vuex/models/flight/XFlight.js";
  import * as OrderMutaionNames from "../../../vuex/models/flightorder/MutationName.js";
  import * as mutationNames from "../../../vuex/models/flightorder/MutationName.js";
import { DiscountItem } from "../../../models/aboutdiscount";
import { Coupon } from "../../../models/discount";
import { DomainManager } from '../../../config/DomainManager';
import {Search_result1, Search_result2, emitCustomEvent} from 'models/utils/adGAEvent';

  export default {
    components: {
      headTop,
      loading,
      failure,
      "mt-switch":Switch,
      "mt-checklist":Checklist
    },
    data() {
      return {
        searchInfoKey:'',
        flightLimiter:[],
        earnTitle:{},
        timerClick:null,
        hasClicked:0,
        fareAlertSucc:false,
        fareAlertValue:false,
        showFareAlertDialog:false,
        fareAlert:{
          token:'',
          oneWayDT:'',
          oneWayDP:'',
          oneWayAP:'',
          returnDT:'',
          code:'91',
          phoneNo:'',
          errPhone:false,
          codeList:[],
          terms:['Get instantly notified by SMS when the fare drops.'],
          options:['Get instantly notified by SMS when the fare drops.'],
          flightType:"",
        },
        airs:[],
        indexConfirm: "",
        showCashbackInfo: false,
        cashbackTips: 0,
        originalPrice: 0,
        isCrash: false,
        sortType: SORT_BY_PRICE,
        idx: "-1",
        showFilte: false,
        showLoad: false,
        showPopup: false,
        showPopup2: false,
        isPrice: true,
        isTime: true,
        isSort: true,
        isDuration: true,
        isCashback: true,
        ifLogin: CookieUtil.hasItem("uuid"),
        imgs: require("../../../assets/images/ic-btn-one1.png"),
        heads: {
          img1: require("../../../assets/images/flight-prev.png"),
          img2: require("../../../assets/images/ic-loudou.png"),
          fromCity: "New Delhi",
          toCity: "Mumbai",
          time: "18Mar-31Mar",
          traveller: "1"
        },
        titleList: ["Time", "Duration", "Price", "Cashback"],
        /**
			 ** @type {OnewayFilter} onewayFilter
			*/
        onewayFilter: null,
        TimeFormatUtil,
        flightInfoBack: null,
        offers: [],
        renderArr: [],
        airlineArr: null,
        selectIndex: 0,
        cashBg:{
          "background":'url('+require('../../../assets/images/ticketlist/cashback.png')+') no-repeat',
          "background-size":"100% 100%",
        },
        flightErrorMsg:'We are really sorry,but the flight you selected is no longer available.please select a different flight',
      };
    },
    beforeRouteLeave(to, from, next) {
      if (to.path.indexOf("/bridge") > -1) {
        try {
          window.heg.nativeBack();
        } catch (e) {}
      }
      next();
    },
    watch:{
      hasClicked(val){
        // if(val == 1){
        //   clearInterval(this.timerClick);
        // }else{
        //   this.timerClick = setInterval(()=>{
        //     this.fareAlertValue = true;
        //     this.showFareAlertDialog = true;
        //     clearInterval(this.timerClick);
        //   },5000);
        // }
      },
    },
    methods: {
      getLimitList(res){
        let arr = [], arr2 = [];
        if(res.x.flightLimiter.indexOf(',') > -1){
          arr = res.x.flightLimiter.split(",");
          arr.forEach((e, i)=>{
            let obj = {};
            arr2 = e.split(":");
            obj['fn'] = arr2[0];
            obj['limit'] = Number(arr2[1]);
            this.flightLimiter.push(obj);
          })
        }else{
          let obj = {};
          arr = res.x.flightLimiter.split(":");
          obj['fn'] = arr[0];
          obj['limit'] = Number(arr[1]);
          this.flightLimiter.push(obj);
        }
      },
      getNumber(who){
        let str1, str2, num1 = 0, num11 = 0, num2 = 0, num22 = 0;
        let dItem = who.d.flightNumber ;
        let rItem = who.r.flightNumber ;
        let dFn = who.d.airline.shortname;
        let rFn = who.r.airline.shortname;
        this.flightLimiter.forEach(e =>{
          if(dItem.indexOf('/') > -1 && dItem.split('/')[1]){ // more then one airline
            str1 = dItem.split('/')[0].substr(0,2);
            str2 = dItem.split('/')[1].substr(0,2);
            if(e.fn === str1){
              num1 = e.limit;
            }
            if(e.fn === str2){
              num11 = e.limit;
            }
            num1 = num1- num11 >=0 ?num11:num1;
          }else{ // single airline
            if(e.fn === dFn){
              num1 = e.limit;
            }
          }
          if(rItem.indexOf('/') > -1 && rItem.split('/')[1]){ // more then one airline
            str1 = rItem.split('/')[0].substr(0,2);
            str2 = rItem.split('/')[1].substr(0,2);
            if(e.fn === str1){
              num2 = e.limit;
            }
            if(e.fn === str2){
              num22 = e.limit;
            }
            num2 = num2 - num22 >=0?num22:num2;
          }else{ // single airline
            if(e.fn === rFn){
              num2 = e.limit;
            }
          }
        })
        if(num1 != 0 && num2 != 0 ){
          if(num1 - num2 >= 0){
            return num2
          }else{
            return num1
          }
        }else {
          if (num1 == 0){ return num2 };
          if (num2 == 0){ return num1 };
        }
      },
      getNumberLimit(who){
        let str1, str2, flag = false;
        let dItem = who.d.flightNumber ;
        let rItem = who.r.flightNumber ;
        let dFn = who.d.airline.shortname;
        let rFn = who.r.airline.shortname;
        let number = who.d.flightInfoBack.fee.pCount;
        this.flightLimiter.forEach(e =>{
          if(dItem.indexOf('/') > -1 && dItem.split('/')[1]){ // more then one airline
            str1 = dItem.split('/')[0].substr(0,2);
            str2 = dItem.split('/')[1].substr(0,2);
            if((e.fn === str1 || e.fn === str2) && (e.limit - number < 0) ){
              flag = true;
            }
          }else{ // single airline
            if(e.fn === dFn && (e.limit - number < 0)){
              flag = true;
            }
          }
          if(rItem.indexOf('/') > -1 && rItem.split('/')[1]){ // more then one airline
            str1 = rItem.split('/')[0].substr(0,2);
            str2 = rItem.split('/')[1].substr(0,2);
            if((e.fn === str1 || e.fn === str2) && (e.limit - number < 0) ){
              flag = true;
            }
          }else{ // single airline
            if(e.fn === rFn && (e.limit - number < 0)){
              flag = true;
            }
          }
        })
        return flag;
      },
      showFareAlertDialogBtn(){
        this.hasClicked = 1;
        if(this.fareAlertValue){
          this.showFareAlertDialog = true;
        }else{
          this.showFareAlertDialog = false;
        }
      },
      hideFareAlertDialogBtn(){
        this.showFareAlertDialog = false;
        this.fareAlertValue = false;
      },
      confirmSendFareAlert(){
        if(!this.ifLogin){
          if(this.fareAlert.code == '91' && String(this.fareAlert.phoneNo).length != 10){
            this.fareAlert.errPhone = true;
            return false;
          }else if( this.fareAlert.code == '86' && String(this.fareAlert.phoneNo).length != 11){
            this.fareAlert.errPhone = true;
            return false;
          }else{
            this.fareAlert.errPhone = false;
            this.getAlertAPI();
          }
        }else{
          this.getAlertAPI();
        }
      },
      getAlertAPI(){
        let email = this.ifLogin?CookieUtil.getItem('email').replace(/"/g,"") || "":"";
        let phone = this.ifLogin?CookieUtil.getItem('phone') || "" :this.fareAlert.code +' '+this.fareAlert.phoneNo;
        let url = DomainManager.saveFlightPriceAlert()+'?token='+this.fareAlert.token+'&phone='+phone+'&email='+email;
        this.$axios.get(url).then(res=>{
          if(res.success){
            this.showFareAlertDialog = false;
            this.fareAlertSucc = true;
            let timer = setTimeout(()=>{
              this.showFareAlertDialog = false;
              this.fareAlertSucc = false;
              clearTimeout(timer);
            },1500)
          }else{
            Toast(res.msg);
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      routeWhere() {
        try {
          window.heg.nativeBack();
        } catch (e) {}
        this.$router.push("/");
      },
      ADImgClick(index){
        let label = index == 1 ? Search_result1 : Search_result2;
        emitCustomEvent(label);
        if(this.offers[index].href.indexOf('offers/') > -1){
        window.location.href = this.offers[index].href.indexOf('/') == 0 ? this.offers[index].href : '/'+this.offers[index].href;
        return;
      }
      this.$router.push(this.offers[index].href);
      },
      showAD(displayedFlights, index) {
        if (displayedFlights.length > 3) {
          return index == 2;
        } else if (displayedFlights.length <= 3) {
          return index == displayedFlights.length - 1;
        }
      },
      showPay(index, item) {
        var arr = this.$refs.payoption;
        var el = this.$refs.payoption[index];
        if (el.style.display == "block") {
          el.style.display = "none";
          if (this.indexConfirm == index) {
            this.showCashbackInfo = false;
          }
        } else {
          arr.forEach(function (item, index) {
            item.style.display = "none";
          });
          el.style.display = "block";
          this.indexConfirm = index;
          this.showCashbackInfo = true;
        }
        this.cashbackTips = Math.round(item.commonDiscount * 0.82);
        this.originalPrice = item.obfp + item.ogst;
      },
      goBack() {
        try {
          window.heg.nativeBack();
        } catch (e) {}
        this.showPopup = false;
        this.$router.push("/");
      },
      close() {
        try {
          window.heg.nativeBack();
        } catch (e) {}
        this.showPopup2 = false;
        this.$router.push("/");
      },
      getFlight() {
        return this.$store.getters.selectflightofall;
      },
      displayedDepartFlights() {
        return this.$store.getters.selectflightofall;
      },
      displayedReturnFlights() {
        return this.$store.getters.selectReturnFlightOfAll;
      },
      skipFilter() {
        this.$router.push("/oneway/filter");
      },
      ico(item) {
        return item.d.airline.iconPath;
      },
      sort(index) {
        this.sortItem = index;
        var con_img = document.querySelectorAll(".con-title i")[index];
        if (this.isSort) {
          con_img.style.transition = ".3s";
          con_img.style.transform = "rotateX(0deg)";
          con_img.style.webkitTransform = "rotateX(0deg)";
        } else {
          con_img.style.transition = ".3s";
          con_img.style.transform = "rotateX(180deg)";
          con_img.style.webkitTransform = "rotateX(180deg)";
        }
      },
      onFlightItemClick(index) {
        this.hasClicked = 1;
        let self = this;
        this.selectIndex = index;
        let fee = this.airs[index].fee;
        let departFlight = this.renderArr[this.selectIndex].d;
        let returnFlight = this.renderArr[this.selectIndex].r;
        this.$store.getters.flightOrder.returnCash = false;
        this.$store.getters.flightOrder.index = index;
        this.flightOrder.setFee(this,fee);
        this.flightOrder.setDepartFlight(this, departFlight);
        this.flightOrder.setReturnFlight(this, returnFlight);
        this.flightOrder.setAirportFullName(
          this.displayedDepartFlights()[this.selectIndex]
        );
        sessionStorage.setItem("order", this.flightOrder);

        this.$store.commit(OrderMutaionNames.setupOrder, this.flightOrder);
        this.$router.push("/ticketlist");
      },
      sortDate(sortType) {
        switch (sortType) {
          case SORT_BY_TIME:
            this.isTime = !this.isTime;
            this.renderArr.sort((o1, o2) => {
              if (this.isTime) {
                this.isSort = true;
                return o1.d.departDate.getTime() - o2.d.departDate.getTime();
              } else {
                this.isSort = false;
                return o2.d.departDate.getTime() - o1.d.departDate.getTime();
              }
            });
            break;
          case SORT_BY_DURATION:
            this.isDuration = !this.isDuration;
            this.renderArr.sort((o1, o2) => {
              if (this.isDuration) {
                this.isSort = true;
                return (
                  o1.d.getDurationInMinute() +
                  o1.r.getDurationInMinute() -
                  (o2.d.getDurationInMinute() + o2.r.getDurationInMinute())
                );
              } else {
                this.isSort = false;
                return (
                  o2.d.getDurationInMinute() +
                  o2.r.getDurationInMinute() -
                  (o1.d.getDurationInMinute() + o1.r.getDurationInMinute())
                );
              }
            });

            break;
          case SORT_BY_PRICE:
            this.isPrice = !this.isPrice;
            this.renderArr.sort((o1, o2) => {
              if (this.isPrice) {
                this.isSort = true;
                return (
                  o1.d.getPrice() +
                  o1.r.getPrice() -
                  (o2.d.getPrice() + o2.r.getPrice())
                );
              } else {
                this.isSort = false;
                return (
                  o2.d.getPrice() +
                  o2.r.getPrice() -
                  (o1.d.getPrice() + o1.r.getPrice())
                );
              }
            });
            break;
          case SORT_BY_CASHBACK:
            this.isCashback = !this.isCashback;
            this.renderArr.sort((o1, o2) => {
              if (this.isCashback) {
                this.isSort = true;
              return (
                o1.d.flightInfoBack.fee.maxCba +
                o1.r.flightInfoBack.fee.maxCba -
                o2.d.flightInfoBack.fee.maxCba -
                o2.r.flightInfoBack.fee.maxCba
              );
              } else {
                this.isSort = false;
                return (
                  o2.d.flightInfoBack.fee.maxCba +
                  o2.r.flightInfoBack.fee.maxCba -
                  o1.d.flightInfoBack.fee.maxCba -
                  o1.r.flightInfoBack.fee.maxCba
                );
              }
            });
            break;
        }
      },
      refreshFlightDates(datas) {
        //jie ti yan jia de policys
        let props = datas.x.props;
        let flightDiscountItems = [];
        let flightsArr;
        var departArr = [];
        var returnArr = [];
        var companyDiscountItemList = [];
        datas.IntlFlightArray.forEach(item => {
          departArr.push(item.departFlight);
          // returnArr.push(item.returnFlight);
        });
        datas.IntlFlightArray.forEach(item => {
          // departArr.push(item.departFlight);
          returnArr.push(item.returnFlight);
        });
        var airlineList = datas.x.airlines;

        // datas.departFlightArray ? flightsArr = datas.departFlightArray : flightsArr = datas.IntlFlightArray;
        let departFlights = new FlightFactory(departArr, airlineList).build(
          function (flight, companyDicount) {
            companyDiscountItemList.push(
              new DiscountItem(flight.flightNumber, companyDicount)
            );
          }
        );
        //this.returnFlights
        let returnFlights = new FlightFactory(returnArr, airlineList).build(
          function (flight, companyDicount) {
            companyDiscountItemList.push(
              new DiscountItem(flight.flightNumber, companyDicount)
            );
          }
        );

        for (let i = 0; i < departFlights.length; i++) {
          this.renderArr.push({
            d: departFlights[i],
            r: returnFlights[i],
            id: i
          });
        }
      
        this.renderArr.sort((o1, o2) => {
          if (this.isPrice) {
            this.isSort = true;
            return (
              o1.d.getPrice() +
              o1.r.getPrice() -
              (o2.d.getPrice() + o2.r.getPrice())
            );
          } else {
            this.isSort = false;
            return (
              o2.d.getPrice() +
              o2.r.getPrice() -
              (o1.d.getPrice() + o1.r.getPrice())
            );
          }
        });
        this.$store.commit(XFlight.getAllFlight, departFlights);
        this.$store.commit(XFlight.selsectAllFlight, departFlights);
        //returnFlight
        this.$store.commit(XFlight.getAllReturnFlight, returnFlights);
        this.$store.commit(XFlight.selsectReturnAllFlight, returnFlights);
        sessionStorage.flightType = "two";
      },
      flightDurationDes: flight => {
        return this.TimeFormatUtil.getDurationDescription(flight);
      },
      hourAndMinuteDescription: date => {
        return this.TimeFormatUtil.getDisplayHourAndMinute(date);
      },
      getFlightData(index) {
        this.idx = index;
      },
      filter(filterOptions) {
        this.filterOptions = filterOptions;
      },
      saveFN(fn) {
        var airports = fn.x.airports;
        sessionStorage.setItem("airports", JSON.stringify(airports));
      },
      renderFlightsArr(item) {
        let render = [];
        let arr = item.IntlFlightArray;

        for (let i = 0; i < arr.length; i++) {
          render.push({
            d: arr[i].departFlight,
            r: arr[i].returnFlight
          });
        }
        return (this.renderArr = render);
      },
      getFlightLists(){
        if (!sessionStorage.order) {
          Toast({
            message: "infomation expired",
            duration: 2000
          });
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        } else {
          this.$store.commit(XFlight.getAllFlight, null);
          this.$store.commit(XFlight.selsectAllFlight, null);

          let opraOrder = this.getFlightOrder;
          this.showLoad = true;
          this.showPopup = false;
          opraOrder.searchSuitableFlights(this).then(jsonObect => {
            Indicator.close();
            this.showLoad = false;
            if(jsonObect.success && (jsonObect.departFlightArray || jsonObect.IntlFlightArray)){
              let total = Number(parseInt(new Date().getTime()/1000)) + Number(jsonObect.x.cacheTime);
              let obj = {}, newObj={};
              if(localStorage.searchKey){
                newObj = JSON.parse(localStorage.searchKey);
              }
              newObj[this.searchInfoKey] = this.searchInfoKey;
              obj['key'] = jsonObect;
              obj['expired'] = total;
              // localStorage.setItem("searchKey", JSON.stringify(newObj));
              // localStorage.setItem(this.searchInfoKey, JSON.stringify(obj));

              // limit passenger count
              this.getLimitList(jsonObect);
              this.earnTitle = jsonObect.x.earnTitle;
              sessionStorage.setItem('referSilver', jsonObect.x.referSilver);
              // this.fareAlert.token = jsonObect.token;
              if (jsonObect.IntlFlightArray) {
                sessionStorage.setItem("isIN", true);
              }
              this.airs = jsonObect.IntlFlightArray;
              
              this.refreshFlightDates(jsonObect);
              this.airlineArr = jsonObect.x.airlines;
              this.flightInfoBack = jsonObect.departFlightArray;
              this.$store.state.flightOrder.order.token = jsonObect.token;
              this.onewayFilter = new OnewayFilter(this.getFlight());
              this.saveFN(jsonObect);
              if(sessionStorage.getItem("hasClicked") == 1){
                clearInterval(this.timerClick);
              }else{
                this.hasClicked = 2;
                sessionStorage.setItem("hasClicked",1);
              }
            }else{
              this.flightErrorMsg = jsonObect.msg;
              this.showPopup = true;
              localStorage.removeItem(this.searchInfoKey);
            }
          }).catch(res => {
            this.showLoad = false;
            this.showPopup = true;
            Indicator.close();
            localStorage.removeItem(this.searchInfoKey);
          });
        }
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
        let newObj = JSON.parse(localStorage.searchKey);
        let obj = {};
        for(let key in newObj){
          if(parseInt(new Date().getTime()/1000) - JSON.parse(localStorage.getItem(key)).expired > 0){
            localStorage.removeItem(key);
          }else{
            obj[key] = newObj[key];
          }
        }
        localStorage.setItem("searchKey", JSON.stringify(obj));
      }
    },
    computed: {
      numberOfPeople() {
        let o = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
        return o.adults.length + o.children.length + o.infants.length;
      },
      getFlightOrder() {
        return GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
      },
      flightTimeDepartRangeString() {
        if (this.$store.getters.flightOrder != null) {
          let d = this.$store.getters.flightOrder.departDate;
          return TimeFormatUtil.getMonthDescription(d.getMonth()) + d.getDate();
        }
      },
      flightTimeReturnRangeString() {
        if (this.$store.getters.flightOrder != null) {
          let d = this.$store.getters.flightOrder.returnDate;
          return TimeFormatUtil.getMonthDescription(d.getMonth()) + d.getDate();
        }
      },
      flightOrder: function () {
        return GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
      },
      travellerNum() {
        let order = this.$store.getters.flightOrder;
        if (order != null) {
          let adultNum = order.adults.length;
          let childNum = order.children.length;
          let infantsNum = order.infants.length;
          return adultNum + childNum + infantsNum;
        }
      },
      sortItem: {
        set: function (index) {
          this.sortType = index;
          this.sortDate(this.sortType);
        },
        get: function () {
          return this.sortType;
        }
      },
      displayedFlights() {
        return this.getFlight();
      }
    },
    beforeCreate() {
      if (!sessionStorage.order) {
        Toast({
          message: "infomation expired",
          duration: 2000
        });
        setTimeout(() => {
          this.$router.push("/home");
        }, 2000);
      }
    },
    created() {
      if(sessionStorage.searchInfo){
        let searchInfo = JSON.parse(sessionStorage.getItem("searchInfo"));
        this.searchInfoKey = this.getSearchInfoKey(searchInfo);
        this.fareAlert.oneWayDT = searchInfo.departDate;
        this.fareAlert.oneWayDP = searchInfo.departAirport.cityName;
        this.fareAlert.oneWayAP = searchInfo.arriveAirport.cityName;
        this.fareAlert.returnDT = searchInfo.returnDate;
      }
      var parm = "type=12&device=0&businessType=1";
      User.advList(this, parm)
        .then(res => {
          if (res.success) {
            this.offers = res.list;
          }
        })
        .catch(err => {
          console.log(err.msg);
        });
    },
    mounted() {
      sessionStorage.removeItem("hasClicked");
      this.hasClicked = 0;
      this.getFlightLists();
      // if(localStorage.searchKey){
      //   this.getNewArr();
      // }
      // if(localStorage[this.searchInfoKey]){
      //   let obj = JSON.parse(localStorage.getItem(this.searchInfoKey));
      //   let isExpire = parseInt(new Date().getTime()/1000) - obj.expired <= 0?false:true;
      //   if(isExpire){
      //     localStorage.removeItem(this.searchInfoKey);
      //     this.getFlightLists();
      //   }else{
      //     this.airs = obj.key.IntlFlightArray;
      //     this.refreshFlightDates(obj.key);
      //     this.$store.state.flightOrder.order.token = obj.key.token;
      //   }
      // }else{
      //   this.getFlightLists();
      // }
    }
  };
</script>
<style lang="less">
#f-wrapper3{
  .header{
    .fare-alert{
      display: flex;
      align-items: center;
      position: relative;
      .right-span{
        position: absolute;
        font-size: 12px;
        color:#fff;
        height:12px;
        line-height:12px;
        bottom: 0;
        left:-18px;
      }
      .mint-switch-core{
        width:25px;
        height:15px;
        border-color: #333;
        background-color: #333;
      }
      .mint-switch-core::before,.mint-switch-core::after{
        width:15px;
        height:15px;
        top: -1px;
        left: -1px;
      }
      .mint-switch-input:checked + .mint-switch-core::after{
        -webkit-transform: translateX(10px);
        transform: translateX(10px);
      }
      .mint-switch-input:checked + .mint-switch-core{
        border-color: #9dd8c9;
        background-color: #9dd8c9;
      }
    }
  }
  .alert-terms{
    .mint-cell{min-height:0;}
    .mint-checklist{
      .mint-checklist-label{
        padding:0;
        display:flex;
        text-align: left;
        .mint-checkbox .mint-checkbox-core{
          border-radius:2px;
          width:15px;
          height:15px;
        }
        .mint-checkbox-input:checked + .mint-checkbox-core {
          background-color: #ffad3d;
          border-color: #ffad3d;
        }
        .mint-checkbox-core::after{
          width:3px;
          top:1px;
          left:0;
          right: 0;
          margin:auto;
        }
        .mint-checkbox-label{
          font-size: 0.512rem;
          color: #666666;
          line-height:0.598rem;
        }
      }
    }
  }
}
</style>
<style lang='less' scoped>
  .rs {
    margin-right: 0 !important;
  }

  .prev {
    width: 0.9rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .yellow {
    color: #ffad3d;
  }

  .header {
    background: #0b9d78;
    i {
      display: block;
      color: #fff;
      font-size: 0.8rem;
    }
    .next {
      display: block;
      img {
        width: 0.8rem;
        padding: 0.64rem;
      }
    }
  }

  .title {
    line-height: 1.5;
    .title-detail {
      font-size: 0.8rem;
      color: #fff;
    }
    .title-detail-ico {
      width: 0.64rem;
      height: 0.64rem;
      display: inline-block;
      background: url("../../../assets/images/ic-btn-one3.png") center no-repeat;
      background-size: 0.64rem;
    }
    .title-info {
      font-size: 0.56rem;
      color: #fff;
    }
  }

  .tips {
    display: none;
    text-align: left;
    .tips-list {
      padding: 0.3rem 0.64rem;
      line-height: 1.5;
      li {
        font-size: 0.43rem;
      }
    }
  }

  .info-wrapper {
    margin-top: 2.04rem;
    .con-title {
      width: 100%;
      font-size: 0.512rem;
      color: #c2c2c2;
      .span-wrap {
        border-top: 1px solid #d6d6d6;
        border-bottom: 1px solid #d6d6d6;
        i {
          display: inline-block;
        }
        span {
          text-align: center;
        }
        .sort-form {
          width: 25%;
          box-sizing: border-box;
          line-height: 1.7rem;
          border-right: 0;
          .sort-wrap {
            width: 100%;
            height: 80%;
            border-right: 1px solid #d6d6d6;
          }
          span {
            display: inline-block;
          }

          .con_img {
            transition: 0.3s;
            -webkit-transition: 0.3;
          }
          .img-up {
            transform: "rotateX(0deg)";
            -webkit-transform: "rotateX(0deg)";
          }
          .img-down {
            transform: "rotateX(180deg)";
            -webkit-transform: "rotateX(180deg)";
          }
          .active {
            color: #ffad3d;
            i {
              color: #ffad3d;
            }
          }
          i {
            color: #fff;
            img {
              width: 0.3rem;
            }
          }
        }
        .sort-form:nth-child(4) {
          .sort-wrap {
            border-right: 0;
          }
        }
      }
    }
    .cashback-info {
      font-size: 0.512rem;
      text-align: left;
      line-height: 1.2;
      padding: 0rem 1.28rem 0.15rem 1.28rem;
      .rs,
      .rs-price {
        color: #0b9d78;
      }
    }
  }

  .container:before {
    display: table;
    content: "";
  }

  .flight-info {
    padding: 0 0.64rem;
    position: absolute;
    top: 3.95rem;
    left: 0;
    right: 0;
    bottom: 0;
    ul {
      overflow: auto;
      height: 100%;
      background-color: #fff;
      .ad {
        margin-bottom: 0.341rem;
        img {
          display: block;
          width: 14.72rem;
        }
      }
      .flight-content {
        margin-bottom: 0.341rem;
        position: relative;
        .flight-content1{
          margin: 0;
          padding: 0.32rem 0.6rem 0 0.6rem;
          border: 1px solid #dddddd;
          border-top-left-radius: 0.2rem;
          border-top-right-radius: 0.2rem;
        }
        .flight-time {
          width: 25%;
          height: 2.8rem;
          position: relative;
          .flight-time-ico {
            height: 1.8rem;
            img {
              margin: 0 auto;
              width: 1.536rem;
              display: block; // margin: 0 auto;
            }
          }
          .fn {
            text-align: center;
            font-size: 0.47rem;
            display: block; // margin-top: 0.3rem;
            color: #adadad;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        .flight-time-info {
          width: 50%;
          height: 2.8rem;
          .margininfo {
            width: 5.2rem;
            margin: 0 auto;
            height: 1.8rem;
            .schedule {
              font-size: 0.768rem;
              span {
                display: block;
              }
              img {
                height: 1px;
                display: block;
              }
            }
            .time-cost {
              padding-top: 0.1rem;
              margin-left: 0.05rem;
              color: #adadad;

              span {
                font-size: 0.47rem;
                display: block;
              }
            }
            h2 {
              width: 5.8rem;
              font-size: 0.56rem;
              font-weight: bold;
              line-height: 1rem;
              text-align: center;
              i {
                font-size: 0.52rem;
              }
            }
            p {
              width: 5.8rem;
              font-size: 0.4rem;
              line-height: 0.8rem;
              text-align: justify;
            }
          }
          .city-name {
            font-size: 0.47rem;
            width: 5.2rem;
            color: #adadad;
            margin: 0 auto;
            .depart,
            .arrive {
              font-size: 0.47rem;
            }
            i {
              font-size: 0.47rem;
              margin-left: -0.1rem;
            }
            .gb {
              display: block;
              height: 0.512rem;
            }
          }
        }
        .flight-price {
          width: 25%;
          height: 2.8rem;
          position: relative;
          flex-direction: column-reverse;
          .flight-price-detail {
            // .present-price {
            // 	padding-bottom: 0.3rem;
            // 	width: 3rem;
            // 	font-size: 0.768rem;
            // 	text-align: right;
            // 	color: #ffad3d;
            // 	line-height: 0.8rem;
            // 	font-weight: bold;
            // }
            flex-direction: column-reverse;
            // height: 1.8rem;
            .price-show {
              font-size: 0.7rem;
              width: 100%;
              text-align: right;
              color: #333;
              .rs {
                margin-top: 0.1rem;
                margin-right: 0.2rem !important;
              }
            }
            .past-price {
              width: 3rem;
              font-size: 0.5rem;
              color: #ccc;
              text-align: left;
              line-height: 0.8rem;
              span {
                text-decoration: line-through;
              }
            }
            .cash-icon {
              // position: absolute;
              // right: 0;
              // bottom: 0.5rem;
              float: right;
              display: none;
              height: 0.512rem;
            }
            .set-icon {
              color: #ccc;
            }
            .cashback-detail {
              font-size: 0.6rem;
              text-align: right;
              color: #0b9d78;
              span {
                display: block;
              }
              .rs {
                margin-top: 0.2rem;
                margin-right: 0.1rem !important;
              }
            }
          }
          .cashback-icon {
            img {
              height: 0.6rem;
              display: block;
            }
            .cash-bg {
              max-width:1.2rem;
              line-height:auto;
              padding:0.05rem 0.35rem 0.05rem 0.65rem;
              color:#0b9d78;
              display: block;
              overflow: hidden;
              white-space:nowrap;
              text-overflow:ellipsis;
              font-size: 0.427rem;
            }
          }
          .flight-next {
            width: 0.6rem;
          background: url("../../../assets/images/ic-btn-one.png") center
            no-repeat;
            background-size: 0.5rem;
          }
        }
        .flight-cover{
          width:100%;
          height:100%;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0,0,0,0.2);
          z-index:10;
          border-top-left-radius: 0.2rem;
          border-top-right-radius: 0.2rem;
        }
        .limit-text{
          padding:.15rem .64rem;
          font-size:6px;
          background:#555;
          text-align:left;
          line-height:13px;
          color:#DCDCDC;
          position: relative;
          z-index: 11;
          span{color:#fff;}
          a{
            display:block;
            font-size: 7px;
            color: #0B9D78;
            width: 4rem;
            padding:0.15rem 0;
            text-align:right;
            cursor: pointer;
            text-decoration:underline;
          }
        }
      }
      .select-pay {
        display: none;
        border: 1px solid #dddddd;
        border-top: none;
        background: #f5f5f5;
        .lower-price,
        .cashback {
          height: 2.5rem;
          text-align: left;
          padding: 0 0.32rem;
          width: 100%;
          box-sizing: border-box;
          .title,
          .price,
          .back-price {
            height: 1.664rem;
            line-height: 1.664rem;
            font-size: 0.6rem;
            .rs {
              margin-top: 0.05rem;
            }
          }
          .back-price-sp {
            text-decoration: line-through;
            margin-right: 0.2rem;
          }
          i {
            display: block;
          }
          .title {
            width: 38%;
            display: block;
          }
          .price {
            display: block;
            width: 20%;
            color: #f65858;
            text-align: center;
          }
          .price-color {
            color: #0b9d78;
            margin-left: 0.1rem;
          }
          .cash-icon {
            height: 0.7rem;
            display: block;
          }
          .back-price {
            width: 38%;
          }
          .sp {
            width: 38%;
            opacity: 0;
          }
        }
        .lower-price {
          border-bottom: 1px solid #dddddd;
        }
      }
    }
  }
</style>