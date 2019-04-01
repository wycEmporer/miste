<template>
	<div class="wrapper" id="f-wrapper1">
		<head-top class="header" :operate="routeWhere" >
			<i slot="left" class="iconfont icon-back"></i>
			<div slot="title" class="title">
				<div v-if="getFlightOrder!=null" class="title-detail">
					<span>{{getFlightOrder.departAirport.cityName}}</span>
					<span> - </span>
					<span>{{getFlightOrder.destinationAirport.cityName}}</span>
				</div>
				<div class="title-info">
					<span>{{flightTimeRangeString}}</span>
					<span>&bull;</span>
					<span>{{travellerNum > 1?travellerNum+" Travellers":travellerNum+" Traveller"}}</span>
				</div>
			</div>
			<div slot="right" class="next fare-alert" v-show="true" > 
        <!-- <mt-switch v-model="fareAlertValue" @change="showFareAlertDialogBtn"></mt-switch>
        <span class="right-span">Fare Alerts</span> -->
				<i class="iconfont icon-filter" @click="skipFilter"></i>
			</div>
		</head-top>
    <transition enter-active-class="slideInLeft" leave-active-class="slideOutLeft">
			<calendar :limit='limit' :lowPrice="lowPrice" :lowestPrice="lowestPrice" class="animated" @showHomePage="showHomePage" v-if="showCalendar" @getVal="getVal"></calendar>
		</transition>
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
        <top-part v-if="isOne" :showTopPart="showTopPart" :departDate="departDate" :lowPrice="lowPrice" :lowest="lowest" @reSearchFlight="reSearchFlight" @openPickerFrom="openPickerFrom" ></top-part>
				<div class="con-title">
					<div class="span-wrap flex space-betweens">
						<div class="sort-form flex align-items-center content-center" v-for='(item,index) in titleList' :key="item.id" @click='sort(index)'>
							<div class="sort-wrap flex align-items-center content-center">
								<span :class='{active:sortType==index}'>{{item}}
								</span>
								<i :class='{active:sortType==index}' class="iconfont icon-arrow"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flight-info" :class="{'flight-toppart':isOne && showTopPart}" ref="flightInfoList">
				<ul>
					<li class="" :class="{active:this.idx==index}" v-for="(item,index) in displayedFlights" :key="item.id">
						<div class="flight-content" >
              <div class="flight-content1 flex space-between align-items-center" @click="onFlightItemClick(index)">
                <div class="flight-time">
                  <div class="flight-time-ico">
                    <img :src="item.airline.iconPath" />
                  </div>
                  <div class="fn">{{item.flightNumber}}</div>
                </div>
                <div class="flight-time-info">
                  <div class="margininfo">
                    <div class="schedule flex space-between align-items-center">
                      <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.departDate)}}</span>
                      <img src="../../../assets/images/common/rect.png" alt="rect">
                      <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.returnDate)}}</span>
                    </div>
                    <div class="time-cost flex space-between align-items-center">
                      <span v-if="isIN">{{item.flightInfoBack.wdt}}</span>
                      <span v-else>{{TimeFormatUtil.getDurationDescription(item)}}</span>
                      <span>{{item.stops.length-1==0 ? 'non-stop' : item.stops.length-1+'stop'}}</span>
                    </div>

                  </div>
                  <div class="city-name flex space-between align-items-center">
                    <div class="depart">
                      {{getFlightOrder.departAirport.iataCode}}
                    </div>
                    <img class="gb" src="../../../assets/images/common/icon-goback.png" alt="">
                    <div class="arrive">
                      {{getFlightOrder.destinationAirport.iataCode}}
                    </div>
                  </div>
                </div>
                <div class="flight-price" v-if="ifLogin || (opa == [] ?true: !getFlightName(item.flightNumber, item.airline.shortname))">
                  <div class="flight-price-detail">
                    <div style="color:#333;font-size:0.58rem;text-align:right;">
                      <span v-show="item.airline.shortname == 'SG' ">Original</span>
                      <span  class="rs" style="margin:0 0.2rem;">Rs</span>
                      <span v-show="item.airline.shortname == 'SG' ">{{Math.round((item.flightInfoBack.fee.obfp+item.flightInfoBack.fee.ogst)/numberOfPeople) | formatDate}}</span>
                      <span v-show="item.airline.shortname != 'SG'" style="text-decoration:line-through;color:#999;">{{Math.round((item.flightInfoBack.fee.obfp+item.flightInfoBack.fee.ogst)/numberOfPeople) | formatDate}}</span>
                    </div>
                    <div class="price-show flex content-end align-items-center">
                      <span v-show="item.airline.shortname == 'SG'" style="margin-right:0.2rem;color:#f00;">OFF</span>
                      <span class="rs">RS.</span>
                      <span v-if="item.airline.shortname == 'SG'">{{Math.round((item.minPriceObj.exFee?item.minPriceObj.exFee[0].dis:item.minPriceObj.dis)/numberOfPeople) | formatDate}}</span>
                      <span v-else>{{Math.round((item.minPriceObj.exFee?item.minPriceObj.exFee[0].bfp+item.minPriceObj.exFee[0].gst:item.minPriceObj.bfp+item.minPriceObj.gst)/numberOfPeople) | formatDate}}</span>
                    </div>
            
                  </div>
                  <div class="cashback-icon flex content-end" v-if="earnTitle.isShow">
                    <div class="cash-bg" :style="cashBg">{{earnTitle.titleName}}</div>
                    <div class="cashback-detail flex content-end align-items-center">
                      <span class="rs">RS.</span>
                      <span>{{Math.round(item.flightInfoBack.fee.maxCba/numberOfPeople) | formatDate}}</span>
                    </div>
                  </div>
                </div>
                <div class="flight-price1" v-if="!ifLogin && (opa == [] ?false: getFlightName(item.flightNumber, item.airline.shortname))">
                  <div class="flight-price-detail">
                    <div style="color:#666;font-size:0.58rem;text-align:right;">
                      Original<span class="rs" style="margin:0 0.2rem;">RS.</span> {{Math.round((item.flightInfoBack.fee.obfp+item.flightInfoBack.fee.ogst)/numberOfPeople) | formatDate}}
                    </div>
                    <div class="price-show flex content-end align-items-center" style="font-size:0.6rem;" :class="{visibility:getNopaFlightName(item.flightNumber, item.airline.shortname)}" >
                      <span v-if="isIN" >{{discountTitle}}</span>
                      <span v-if="isIN" class="rs" style="margin:0 0.1rem 0 0.1rem !important;">RS.</span>
                      <span v-if="isIN">
                        {{Math.round((item.minPriceObj.exFee?item.minPriceObj.exFee[0].dis:item.minPriceObj.dis)/numberOfPeople) | formatDate}}
                      </span> 
                      <img v-if="!isIN" style="width:90%;" :src="require('../../../assets/images/ticketlist/lowest.png')" alt="">
                    </div>
                  </div>
                  <div class="cashback-icon flex content-end" v-if="earnTitle.isShow">
                    <div class="cash-bg" :style="cashBg">{{earnTitle.titleName}}</div>
                    <div class="cashback-detail flex content-end align-items-center">
                      <span class="rs">RS.</span>
                      <span>{{Math.round(item.flightInfoBack.fee.maxCba/numberOfPeople) | formatDate}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="limit-text flex align-items-center space-between" v-if="flightLimiter == []?false:getNumberLimit(item, item.flightNumber, item.airline.shortname)">
                <p>The airline supports booking of up to <span>{{ getNumber(item.flightNumber, item.airline.shortname) }}</span> flight tickets in one order.</p>
                <a @click="$router.push('/')">Modify</a>
              </div>
              <div class="flight-cover" v-if="flightLimiter == []?false:getNumberLimit(item, item.flightNumber, item.airline.shortname)"></div>
						</div>
            <template v-for="(info,idx) in offers" > 
              <div class="ad" :data-id="index" :key="idx" v-if="index == (3*idx + 2)">
                <img v-if="info.use" :src="info.url" alt="" @click="ADImgClick(idx)">
              </div>
            </template>
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

import headTop from "components/head/head.vue";
import hegDialog from "components/dialog/dialog.vue";
import topPart from "./toppart.vue";
import filter from "./filter.vue";
import failure from "../../failure/failure.vue";
import {
  TimeFormatUtil,
  CabinClassUtil,
  GetFlightOrderUtil
} from "models/utils";
import { Flight, FlightFactory } from "models/flight";
import { bus } from "../../../main.js";
import { mapGetters } from "vuex";
import { Toast, Indicator, Button, Popup, Checklist, Switch } from "mint-ui";
import { OnewayFilter } from "models/filter";
import { OnewayOrder, RoundTripOrder } from "models/flightorder";
import { CookieUtil } from "models/utils";
import { User } from "models/user";
import { Passenger, Adult, Child, Infant } from "models/passenger";
import * as XFlight from "../../../vuex/models/flight/XFlight.js";
import * as OrderMutaionNames from "../../../vuex/models/flightorder/MutationName.js";
import * as mutationNames from "../../../vuex/models/flightorder/MutationName.js";
import { Coupon } from "models/discount";
import {Search_result1, Search_result2, emitCustomEvent} from 'models/utils/adGAEvent';
import { DomainManager } from '../../../config/DomainManager';
export default {
  components: {
    headTop,
    topPart,
    failure,
    hegDialog,
    calendar: () => import('pages/home/child/calendar2/calendar.vue'),
    "mt-switch":Switch,
    "mt-checklist":Checklist
  },
  data() {
    return {
      searchInfoKey:'',
      lowest:[],
      lowPrice:[],
			lowestPrice:[],
      showCalendar:false,
      departDate: new Date(),
      limit: {
				minYear: new Date().getFullYear(),
				minMonth: new Date().getMonth() + 1,
				minDay: new Date().getDate(),
				maxYear: new Date().getFullYear() + 1
			},
      isOne:false,
      showTopPart:false,
      reSearchTime:'',
      earnTitle:{},
	    discountTitle:'',
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
        returnDP:'',
        returnAP:'',
        code:'91',
        phoneNo:'',
        errPhone:false,
        codeList:[],
        terms:['Get instantly notified by SMS when the fare drops.'],
        options:['Get instantly notified by SMS when the fare drops.'],
        flightType:"",
      },
      show:false,
      index2:4,
      indexConfirm: "",
      showCashbackInfo: false,
      cashbackTips: 0,
      originalPrice: 0,
      isCrash: false,
      sortType: SORT_BY_PRICE,
      idx: "-1",
      showFilte: false,
      showPopup: false,
      showPopup2: false,
      isPrice: true,
      isTime: true,
      isSort: true,
      isDuration: true,
      isCashback: true,
      imgShow:false,
      imgSrc:'',
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
			 @type {OnewayFilter} onewayFilter
			*/
      onewayFilter: null,
      TimeFormatUtil,
      flightInfoBack: null,
      offers: [],
      airlineArr: null,
      isIN: false,
      opa:[],
      nopa:[],
      cashBg:{
        "background":'url('+require('../../../assets/images/ticketlist/cashback.png')+') no-repeat',
        "background-size":"100% 100%",
      },
      flightLimiter:[],
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
  methods: {
    getFlightName(item, fn){
      let str1, str2;
      if(item.indexOf('/') > -1 && item.split('/')[1]){
        str1 = item.split('/')[0].substr(0,2);
        str2 = item.split('/')[1].substr(0,2);
        if(this.opa.indexOf(str1) >-1 || this.opa.indexOf(str2) > -1){
          return true;
        }else{
          return false;
        }
      }else{
        if(this.opa.indexOf(fn) > -1){
          return true;
        }else{
          return false;
        }
      }
    },
    getNopaFlightName(item, fn){
      let str1, str2;
      if(item.indexOf('/') > -1 && item.split('/')[1]){
        str1 = item.split('/')[0].substr(0,2);
        str2 = item.split('/')[1].substr(0,2);
        if(this.nopa.indexOf(str1) >-1 || this.nopa.indexOf(str2) > -1){
          return true;
        }else{
          return false;
        }
      }else{
        if(this.nopa.indexOf(fn) > -1){
          return true;
        }else{
          return false;
        }
      }
    },
    getNumber(item, fn){
      let str1, str2, num1 = 0, num2 = 0;
      this.flightLimiter.forEach(e =>{
        if(item.indexOf('/') > -1 && item.split('/')[1]){ // more then one airline
          str1 = item.split('/')[0].substr(0,2);
          str2 = item.split('/')[1].substr(0,2);
          if(e.fn === str1){
            num1 = e.limit;
          }
          if(e.fn === str2){
            num2 = e.limit
          }
          if(num1 != 0 && num2 != 0){
            num1 = num1 -num2 >=0?num2:num1;
          }else{
            if(num1 == 0) {
              num1 = num2
            }
          }
        }else{ // single airline
          if(e.fn === fn){
            num1 = e.limit;
          }
        }
      })
      return num1;
    },
    getNumberLimit(who, item, fn){
      let str1, str2, flag = false;
      let number = who.flightInfoBack.fee.pCount;
      this.flightLimiter.forEach(e =>{
        if(item.indexOf('/') > -1 && item.split('/')[1]){ // more then one airline
          str1 = item.split('/')[0].substr(0,2);
          str2 = item.split('/')[1].substr(0,2);
          if((e.fn === str1 || e.fn === str2) && (e.limit - number < 0) ){
            flag = true;
          }
        }else{ // single airline
          if(e.fn === fn && (e.limit - number < 0)){
            flag = true;
          }
        }
      })
      return flag;
    },
    openPickerFrom(event) {
			this.limit = {
				minYear: new Date().getFullYear(),
				minMonth: new Date().getMonth() + 1,
				minDay: new Date().getDate(),
			};
      this.showCalendar = true;
    },
    showHomePage(){
			this.showCalendar = false;
		},
    getVal(dateVal) {
			this.showCalendar = false;
      this.departDate = dateVal;
      let date = new Date(dateVal);
      var u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      let param = isiOS? date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate() : date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      this.reSearchFlight(param);
		},
    reSearchFlight(data){
      this.reSearchTime = data;
      let obj = new OnewayOrder();
      let order = Object.assign(obj, this.getFlightOrder);
      let order2 = JSON.parse(sessionStorage.getItem("order"));
      let searchInfo = JSON.parse(sessionStorage.getItem("searchInfo"));
      order.departDate = new Date(data);
      order2.departDate = new Date(data);
      searchInfo.departDate = new Date(data);
      sessionStorage.setItem("searchInfo",JSON.stringify(searchInfo));
      GetFlightOrderUtil.setOrderIntoSession(order2, sessionStorage);
      this.$store.commit(OrderMutaionNames.setupOrder, order);
      this.searchInfoKey = this.getSearchInfoKey(searchInfo);
      // this.loadDataFromCache();
      this.getFlightLists();
    },
    getFlightLists(){
      if (!sessionStorage.order) {
        Toast({
          message: "infomation expired",
          duration: 2000
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } else {
        Indicator.open({
          text:"Hang on, searching for lowest price flights",
          spinnerType: "fading-circle"
        });
        this.$store.commit(XFlight.getAllFlight, null);
        this.$store.commit(XFlight.selsectAllFlight, null);
        let opraOrder = this.getFlightOrder;
        this.showPopup = false;
        opraOrder.searchSuitableFlights(this).then(jsonObect => {
          Indicator.close();
          if(jsonObect.success && (jsonObect.departFlightArray || jsonObect.IntlFlightArray)){
            let total = Number(parseInt(new Date().getTime()/1000)) + Number(jsonObect.x.cacheTime);
            let obj = {}, newObj={};
            if(localStorage.searchKey){
              newObj = JSON.parse(localStorage.searchKey);
            }
            newObj[this.searchInfoKey] = this.searchInfoKey;
            obj['key'] = jsonObect;
            obj['expired'] = total;
            // localStorage.setItem(this.searchInfoKey, JSON.stringify(obj));
            // localStorage.setItem("searchKey", JSON.stringify(newObj));
  
            this.getlowPrice();
            let arr = [], arr2 = [];
            if(jsonObect.x.flightLimiter.indexOf(',') > -1){
              arr = jsonObect.x.flightLimiter.split(",");
              arr.forEach((e, i)=>{
                let obj = {};
                arr2 = e.split(":");
                obj['fn'] = arr2[0];
                obj['limit'] = Number(arr2[1]);
                this.flightLimiter.push(obj);
              })
            }else{
              let obj = {};
              arr = jsonObect.x.flightLimiter.split(":");
              obj['fn'] = arr[0];
              obj['limit'] = Number(arr[1]);
              this.flightLimiter.push(obj);
            }
            this.earnTitle = jsonObect.x.earnTitle;
            sessionStorage.setItem('referSilver', jsonObect.x.referSilver);
            // this.fareAlert.token = jsonObect.token;
            this.opa = jsonObect.x.opa?jsonObect.x.opa:[];
            this.nopa = jsonObect.x.nopa?jsonObect.x.nopa:[];
            if (jsonObect.IntlFlightArray) {
              this.isIN = true;
              sessionStorage.setItem("isIN", true);
            } else {
              sessionStorage.setItem("isIN", false);
            }
            this.discountTitle = jsonObect.x.discountTitle;
            this.airlineArr = jsonObect.x.airlines;
            this.refreshFlightDates(jsonObect);
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
        }).catch(err => {
          this.showPopup = true;
          Indicator.close();
          localStorage.removeItem(this.searchInfoKey);
        });
      }
    },
    getlowPrice(){
      let that = this;
      this.lowest = [];
      this.lowPrice = [];
      this.lowestPrice = [];
      let searchInfo = JSON.parse(sessionStorage.getItem("searchInfo"));
			let data = {
				from: searchInfo.departAirport.iataCode,
				to: searchInfo.arriveAirport.iataCode,
			};
			let url = DomainManager.getLowPriceCalendar();
			this.$axios.post(url, data).then(res =>{
				if(res.success){
          that.showTopPart = true;
					let name, obj={};
					for (const key in res.data) {
						let obj2 = {}, obj3, obj4={};
						for(const key2 in res.data[key]){
							name = key+'-'+key2;
							obj[name] = res.data[key][key2];
							obj2[name] = res.data[key][key2];
							obj4[name] = res.data[key][key2];
            }
            this.lowest.push(obj4);
            obj3 = this.getLowestPrice(obj2);
						this.lowestPrice.push(obj3);
					}
					this.lowPrice.push(obj);
					let priceKey = {};
					this.lowestPrice.forEach((e, i)=>{
						for(let key in e){
							priceKey[key] = e[key];
						}
          })
          this.lowestPrice = [];
          this.lowestPrice.push(priceKey);
				}else{
          that.showTopPart = false;
					Toast(res.msg);
				}
			}).catch(err=>{
        that.showTopPart = false;
				console.log(err)
			})
		},
		getLowestPrice(item){
      let arr = [], index;
      for(let key in item){
        arr.push(Number(item[key]));
			}
			let obj={};
      let key = Math.min.apply(null, arr);
      for(let k in item){
        if(item[k] == String(key)){
          index = k;
          obj[index] = key;
        }
      }
      return obj;
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
    ADImgClick(index){
      let label = index == 1? Search_result1 : Search_result2;
      emitCustomEvent(label);
      if(this.offers[index].href.indexOf('offers/') > -1){
        window.location.href = this.offers[index].href.indexOf('/') == 0 ? this.offers[index].href : '/'+this.offers[index].href;
        return;
      }
      this.$router.push(this.offers[index].href);
    },
    routeWhere() {
      try {
        window.heg.nativeBack();
      } catch (e) {}
      this.$router.push("/");
    },
    goBack() {
      try {
        window.heg.nativeBack();
      } catch (e) {}
      Indicator.close();
      this.$router.push("/");
    },
    close() {
      try {
        window.heg.nativeBack();
      } catch (e) {}
      Indicator.close();
      this.showPopup2 = false;
    },
    getFlight() {
      return this.$store.getters.selectflightofall;
    },
    skipFilter() {
      this.$router.push("/oneway/filter");
    },
    ico(item) {
      return item.airline.iconPath;
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
    onFlightItemCrashClick(index) {
      if (!CookieUtil.hasItem("uuid")) {
        this.$router.push("/login");
        return false;
      } else {
        Indicator.open({
          spinnerType: "fading-circle"
        });
        let self = this;
        this.$store.getters.flightOrder.setDepartFlight(
          this,
          this.getFlight()[index]
        );
        this.$store.getters.flightOrder.setAirportFullName(
          this.getFlight()[index]
        );
        this.$store.getters.flightOrder.returnCash = true;
        localStorage.returnCash = true;
        this.$store.getters.flightOrder
          .checkPrice(this)
          .then(function(res) {
            Indicator.close();
            let order = self.$store.getters.flightOrder;
            let orderJson = order.toJSON();
            let orderStr = JSON.stringify(orderJson);
            localStorage.order = orderStr;
            self.$router.push("/book");
          })
          .catch(function(err) {
            Indicator.close();
            self.$router.push("/book");
            console.log(err);
          });
      }
    },
    onFlightItemClick(index) {
      this.hasClicked = 1;
      let self = this;
      this.$store.getters.flightOrder.setDepartFlight(
        this,
        this.getFlight()[index]
      );
      this.$store.getters.flightOrder.setAirportFullName(
        this.getFlight()[index]
      );
      this.$store.getters.flightOrder.returnCash = false;
      this.$store.getters.flightOrder.index = index;
      this.$store.getters.flightOrder.flightInfoBack = this.getFlight()[index];
      let order = this.$store.getters.flightOrder;
      this.$store.commit(OrderMutaionNames.setupOrder, order);

      sessionStorage.setItem("order", JSON.stringify(order));
      this.$router.push("/ticketlist");
    },
    sortDate(sortType) {
      switch (sortType) {
        case SORT_BY_TIME:
          this.isTime = !this.isTime;
          this.getFlight().sort((o1, o2) => {
            if (this.isTime) {
              this.isSort = true;
              return o1.departDate.getTime() - o2.departDate.getTime();
            } else {
              this.isSort = false;
              return o2.departDate.getTime() - o1.departDate.getTime();
            }
          });
          break;
        case SORT_BY_DURATION:
          this.isDuration = !this.isDuration;
          this.getFlight().sort((o1, o2) => {
            if (this.isDuration) {
              this.isSort = true;
              return o1.getDurationInMinute() - o2.getDurationInMinute();
            } else {
              this.isSort = false;
              return o2.getDurationInMinute() - o1.getDurationInMinute();
            }
          });

          break;
        case SORT_BY_PRICE:
          this.isPrice = !this.isPrice;
          this.getFlight().sort((o1, o2) => {
            if (this.isPrice) {
              this.isSort = true;
              return o1.getPrice() - o2.getPrice();
            } else {
              this.isSort = false;
              return o2.getPrice() - o1.getPrice();
            }
          });
          break;
        case SORT_BY_CASHBACK:
          this.isCashback = !this.isCashback;
          this.getFlight().sort((o1, o2) => {
            if (this.isCashback) {
              this.isSort = true;
              return o1.flightInfoBack.fee.maxCba - o2.flightInfoBack.fee.maxCba;
            } else {
              this.isSort = false;
              return o2.flightInfoBack.fee.maxCba - o1.flightInfoBack.fee.maxCba;
            }
          });
          break;
      }
    },
    refreshFlightDates(datas) {
      //jie ti yan jia de policys
      let props = datas.x.props;

      let flightsArr;
      // datas.departFlightArray ? flightsArr = datas.departFlightArray : flightsArr = datas.IntlFlightArray;
      var intArr = [];

      if (datas.isIntl) {
        datas.IntlFlightArray.forEach(item => {
          intArr.push(item.departFlight);
        });
      } else {
        intArr = datas.departFlightArray;
      }
      var airlineList = datas.x.airlines;
      let fac = new FlightFactory(intArr, airlineList);
      let allFlight = fac.build();

      this.$store.commit(XFlight.getAllFlight, allFlight);

      sessionStorage.flightType = "one";
      this.fareAlert.flightType = "one";
      this.isOne = true;

      this.$store.commit(XFlight.selsectAllFlight, allFlight);

      this.getFlight().sort((o1, o2) => {
        this.isSort = true;
        return o1.getPrice() - o2.getPrice();
      });
      this.getFlight().forEach(el => {
        let d = el.departDate;
        let r = el.returnDate;
        el.durationDays = r.getDate() - d.getDate();
      });
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
    checkType() {
       try {
        let typeA = typeof window.heg.getNativeSource() === "string"
          ? JSON.parse(window.heg.getNativeSource())
          : window.heg.getNativeSource();
        this.model = Number(typeA.deviceType) + 1;
      } catch (e) {
        this.model = 0;
      }
    },
    getADVlist() {
      var parm = "type=12&device=" + this.model+"&businessType=1";
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
    },
    loadDataFromCache(){
      if(localStorage.searchKey){
        this.getNewArr();
      }
      if(localStorage[this.searchInfoKey]){
        let obj = JSON.parse(localStorage.getItem(this.searchInfoKey));
        let isExpire = parseInt(new Date().getTime()/1000) - obj.expired <= 0?false:true;
        if(isExpire){
          localStorage.removeItem(this.searchInfoKey);
          this.getFlightLists();
        }else{
          this.refreshFlightDates(obj.key);
          this.$store.state.flightOrder.order.token = obj.key.token;
        }
      }else{
        this.getFlightLists();
      }
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
    flightTimeRangeString() {
      if (this.$store.getters.flightOrder != null) {
        let d = this.$store.getters.flightOrder.departDate;
        return TimeFormatUtil.getMonthDescription(d.getMonth()) + d.getDate();
      }
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
    iconPath(item) {
      return item.airline.iconPath;
    },
    sortItem: {
      set: function(index) {
        this.sortType = index;
        this.sortDate(this.sortType);
      },
      get: function() {
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
  created() {
    this.checkType();
    this.getADVlist();
    this.getlowPrice();
    User.findSms(this).then(res => {
      this.fareAlert.codeList = res.list;
    });
    if(sessionStorage.searchInfo){
      let searchInfo = JSON.parse(sessionStorage.getItem("searchInfo"));
      this.searchInfoKey = this.getSearchInfoKey(searchInfo);
      this.fareAlert.oneWayDT = searchInfo.departDate;
      this.fareAlert.oneWayDP = searchInfo.departAirport.cityName;
      this.fareAlert.oneWayAP = searchInfo.arriveAirport.cityName;
    }
  },
  mounted() {
    // this.loadDataFromCache();
    this.getFlightLists();
  },
};
</script>
<style lang="less">
#f-wrapper1{
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
.visibility{
  visibility: hidden;
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
      // border-top: 1px solid #d6d6d6;
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
          // border-right: 1px solid #d6d6d6;
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
          font-weight: 600;
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
  top: 4.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index:5;
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
        width: 20%;
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .flight-time-info {
        width: 45%;
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
        width: 35%;
        height: 2.8rem;
        position: relative;
        .flight-price-detail {
          height:1.7rem;
          .price-show {
            font-size: 0.65rem;
            width: 100%;
            text-align: right;
            color: #333;
            padding-top: 0.2rem;
            .rs {
              // margin-top: 0.1rem;
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
            font-size: 0.58rem;
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
          align-items: center;
          .cashback-detail {
            font-size: 0.58rem;
            text-align: right;
            color: #0b9d78;
            span {
              display: block;
            }
            .rs {
              margin:0 0.2rem !important;
            }
          }
          img {
            width:1rem;
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
      .flight-price1{
        width: 35%;
        height: 2.8rem;
        position: relative;
        .flight-price-detail {
          height:1.7rem;
          .price-show {
            margin:0.2rem 0 0;
            font-size: 0.8rem;
            width: 100%;
            // font-weight: bold;
            text-align: right;
            color: #f00;
            .rs {
              // margin-top: 0.1rem;
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
          
        }
        .cashback-icon {
          align-items: center;
          .cashback-detail {
            font-size: 0.58rem;
            text-align: right;
            color: #0b9d78;
            span {
              display: block;
            }
            .rs {
              margin:0 0.2rem !important;
            }
          }
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
.flight-toppart{
  top: 6.5rem;
}
// fare-alert-cover
.fare-alert-cover{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  z-index:11;
}
.fare-alert-dialog{
  width:13rem;
  background: #fff;
  border-radius:3px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index:11;
  transform:translateY(-50%) translateX(-50%);
  -webkit-transform:translateY(-50%) translateX(-50%);
  overflow: hidden;
  .alert-close{
    display:block;
    width:0.512rem;
    height:0.512rem;
    position: absolute;
    top: 0.3rem;
    right: 0.4rem;
    cursor: pointer;
  }
  .alert-title{
    padding:0.64rem 0;
    font-size: 0.64rem;
    color:#333;
    border-bottom:1px solid #ddd;
  }
  .alert-top{
    padding:1.28rem 0;
    justify-content:center;
    .top-div{
      span{
        color:#999;
        font-size: 0.47rem;
        line-height:0.76rem;
      }
      p{
        color:#000;
        font-weight: bold;
        font-size:0.854rem;
        letter-spacing:1px;
      }
    }
    img{
      width:0.64rem;
      margin: 0 0.47rem;
    }
  }
  .alert-phone{
    margin:0 0.64rem;
    border:1px solid #0b9d78;
    border-radius:2px;
    .select-group {
      position: relative;
      width: 40%;
      height: 1.709rem;
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
        width: 85%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        line-height: 1.709rem;
        font-size: 0.64rem; // color: #666;
        font-weight: normal;
      }
      img{
        width:0.6rem;
        position: absolute;
        top: 50%;
        right: 0;
        transform:translateY(-50%);
      }
    }
    input {
      box-sizing: border-box;
      width: 100%;
      padding:0 0.4rem;
      font-size: 0.64rem;
      -webkit-appearance: none;
    }
    input::placeholder{
      color:#999;
    }
  }
  .phone-err{
    text-align:left;
    font-size:0.427rem;
    color:#f00;
    line-height:0.5rem;
    margin:0.2rem 0.64rem 0 1.2rem;
  }
  .alert-terms{
    margin:0.64rem 0.64rem 0.3rem;
  }
  .alert-btn{
    margin:0.2rem 0.64rem;
    button{
      width:100%;
      background: #999;
      height:1.495rem;
      line-height:1.495rem;
      color:#fff;
      font-size:0.598rem;
      letter-spacing:1px;
      border-radius:2px;
      cursor: pointer;
    }
    .alertActive{
      background: #ffad3d;
    }
  }
  .bom-terms{
    margin: 0 0.64rem;
    padding-bottom: 0.6rem;
    font-size:0.47rem;
    line-height:0.612rem;
    color:#333;
    text-align:left;
    letter-spacing:0.3px;
    a{
      color:#0b9d78;
      cursor: pointer;
      text-decoration:underline;
    }
  }
}
//fare-alert-succ
.fare-alert-succ{
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index:11;
  span{
    color:#fff;
    font-size:0.598rem;
    border:2px solid #fff;
    border-radius:2px;
    letter-spacing:0.5px;
    padding:0.5rem 0.5rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translateY(-50%) translateX(-50%);
    -webkit-transform:translateY(-50%) translateX(-50%);
  }
}
</style>
