<template>
	<div class="wrapper" id="f-wrapper2">
		<head-top class="header" :operate="routeWhere" >
			<i slot="left" class="iconfont icon-back"></i>
			<div slot="title" class="title">
				<div class="title-detail">
					<span>{{flightOrder.departAirport.cityName}}</span>
					<span> - </span>
					<span>{{flightOrder.destinationAirport.cityName}}</span>
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
				<i class="iconfont icon-filter" alt="" @click="skipFilter"></i>
			</div>
		</head-top>
		<loading v-if="showLoad"></loading>
		<mt-popup v-model="showPopup" popup-transition="popup-fade" closeOnClickModal="false" modal="true">
			<failure>
				<div slot="head">flight unavailable</div>
				<p slot="content">{{flightErrorMsg}}</p>
				<mt-button @click="goBack" slot="btn" class="btn" type="default">OK</mt-button>
			</failure>
		</mt-popup>
		<mt-popup v-model="showPopup2" popup-transition="popup-fade" closeOnClickModal="false" modal="true">
			<failure>
				<div slot="head">flight unavailable</div>
				<p slot="content">We've really sorry,but the flight you selected is no longer available.please select a different flight</p>
				<mt-button @click="close" slot="btn" class="btn" type="default">OK</mt-button>
			</failure>
		</mt-popup>
		<transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
			<keep-alive>
				<router-view :filter="roundTripFilter" class="animated" v-if="this.selectWayType === 0"></router-view>
				<router-view :filter="roundTripFilter" class="animated" v-else></router-view>
			</keep-alive>
		</transition>
		<div class="container">
			<div class="total flex align-items-center" v-show="this.selectWayType === 3">
				<div class="total-cont flex space-between align-items-center">
					<div class="total-amount">
						<div class="flight flex space-between align-items-center">
							<span>
								{{showFlight('departFlight')}}
							</span>
							<img src="../../../assets/images/common/rect_w.png" alt="rect" v-show="hasFlihgt">
							<span>
								{{showFlight('returnFlight')}}
							</span>
						</div>
						<div class="duration ">
							<span>
								{{showFlight('departDuration')}}
							</span>
							&nbsp;
							<span>
								{{showFlight('returnDuration')}}
							</span>
						</div>

					</div>
					<div class="total-price">
						<div class="total-price-rs">
							<span class="rs">RS.</span>
							<span v-if="payType">{{getTotalCashProperty() | formatDate}}</span>
							<span v-else>{{getTotalProperty() | formatDate}}</span>
						</div>
						<div class="save" v-if="payType">
							<span>You earn</span>
							<span class="rs">RS.</span>
							<span class="save-price">
								{{Math.round(getTotalSaveProperty('commonDiscount') * 0.82) | formatDate}}
							</span>
						</div>
					</div>
					<a @click='onBookingButtonClick' class="booking">BOOK</a>
				</div>
			</div>
			<div class="select-way flex space-between align-items-center">
				<a href="javascript:void(0)" class="select-item" v-for="(item, index) in selctWayList" :key="index" :class="{active:selectWayType == index}" @click="changeItem(index)">
					{{item}} {{departShow(index)}} - {{returnshow(index)}}
				</a>
			</div>
			<div class="flight-detail">
				<div class="info-wrapper">
					<div class="con-title">
						<div class="span-wrap flex space-betweens">
							<div class="sort-form flex align-items-center content-center" v-for='(item,index) in titleList' @click='sort(index)' :key="index">
								<div class="sort-wrap flex align-items-center content-center">
									<span :class='{active:sortType==index}'>{{item}}</span>
									<i :class='{active:sortType==index}' class="iconfont icon-arrow"></i>
								</div>

							</div>
						</div>
					</div>
				</div>
				<div class="flight-detail-cont" ref="flightInfoList">
					<div class="flight-detail-depart-lists">
						<ul>
							<li class="flight-detail-track-depart" v-for="(item, index) in displayedDepartFlights()" :key="index">
								<div class="flight-content " >
									<div class="flight-content1 flex space-between align-items-center" 
                    :class="['flight-detail-list', selectedDepartFlightIndex == index && !getNumberLimit(item, item.flightNumber, item.airline.shortname) ?'item-act':'item-def']"
                    @click='onDepartItemClick(item,index)' >
                    <div class="flight-time">
                      <div class="flight-time-ico">
                        <img :src="item.airline.iconPath" />
                      </div>
                      <span class="fn">
                        {{item.flightNumber}}
                      </span>
                    </div>
                    <div class="flight-time-info">
                      <div class="margininfo">
                        <div class="schedule flex space-between align-items-center">
                          <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.departDate)}}</span>
                          <img src="../../../assets/images/common/rect.png" alt="rect">
                          <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.returnDate)}}</span>
                        </div>
                        <div class="time-cost flex space-between align-items-center">
                          <span>{{(TimeFormatUtil.getDurationDescription(item))}}</span>
                          <span>{{(item.stops.length-1==0 ? 'non-stop' : item.stops.length-1+'stop')}}</span>
                        </div>

                      </div>
                      <div class="city-name flex space-between align-items-center">
                        <div class="depart">
                          {{flightOrder.departAirport.iataCode}}
                        </div>
                        <img class="gb" src="../../../assets/images/common/icon-goback.png" alt="">
                        <div class="arrive">
                          {{flightOrder.destinationAirport.iataCode}}
                        </div>
                      </div>
                    </div>
                    <div class="flight-price">
                      <div class="flight-price-detail">
                        <div style="color:#999;font-size:10px;text-align:right;text-decoration:line-through;">
                          <span class="rs">RS.</span> {{Math.round((item.flightInfoBack.fee.obfp+item.flightInfoBack.fee.ogst)/numberOfPeople) | formatDate}}
                        </div>
                        <div class="price-show flex content-end align-items-center">
                          <span class="rs">RS.</span>
                          <span>
                            {{Math.round((item.minPriceObj.exFee?item.minPriceObj.exFee[0].bfp+item.minPriceObj.exFee[0].gst:item.minPriceObj.bfp+item.minPriceObj.gst)/numberOfPeople) | formatDate}}
                          </span>
                        </div>
          
                      </div>
                      <div class="cashback-icon flex content-end" v-if="earnTitle.isShow">
                        <div class="cash-bg" :style="cashBg">{{earnTitle.titleName}}</div>
                        <div class="cashback-detail flex content-end align-items-center">
                          <span class="rs">RS.</span>
                          <span>{{Math.round(item.flightInfoBack.fee.maxCba/numberOfPeople)| formatDate}}</span>
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
								<div class="ad" v-if="showAD(displayedDepartFlights(), index)">
									<img v-if="offers[0]&&offers[0].use == 1" :src="offers[0].url" alt="" @click="ADImgClick(1)">
								</div>
								<div class="select-pay" ref="payoptionDepart">
									<div class="lower-price flex space-between align-items-center">
										<span class="title">The Lowest Price</span>
										<span class="price">
											<span class="rs">RS.</span>
											{{item.bfp + item.gst - item.airlineDIS}}
										</span>
										<div class="back-price flex content-end">
											<!-- <span class="sp">Crashback:</span> -->
											<span class="rs">RS.</span>
											<span class="back-price-sp">{{item.obfp + item.ogst | formatDate}}</span>
										</div>
										<input class="pickflight" type="radio" name="pickdepart" value='normal' @click="pickDepart(index)" ref="normalDepartPay">
									</div>
									<div class="cashback flex space-between align-items-center">
										<span class="title">Cashback Price</span>
										<span class="price">
											<span class="rs">RS.</span>
											{{item.price}}
										</span>
										<div class="back-price flex content-end align-items-center" v-if="earnTitle.isShow">
											<div class="cash-bg" :style="cashBg">{{earnTitle.titleName}}</div>
											<span class="price-color">
												<span class="rs">RS.</span>
												{{Math.round(item.commonDiscount*0.82)}}
											</span>

										</div>
										<input class="pickflight" type="radio" name="pickdepart" value='normal' @click="pickDepart(index)" ref="cashbackDepartPay">
									</div>

								</div>
							</li>
						</ul>
					</div>
					<div class="flight-detail-return-lists">
						<ul>
							<li class="flight-detail-track-depart" v-for="(item, index) in displayedReturnFlights()" :key="index">
								<div class="flight-content" >
									<div class="flight-content1 flex space-between align-items-center" 
                    :class="['flight-detail-list', (selectedReturnFlightIndex)==-1?'item-act':'item-def']"
                    @click='onReturnItemClick(item,index)'>
                    <div class="flight-time">
                      <div class="flight-time-ico">
                        <img :src="item.airline.iconPath" />
                      </div>
                      <span class="fn">
                        {{item.flightNumber}}
                      </span>
                    </div>
                    <div class="flight-time-info">
                      <div class="margininfo">
                        <div class="schedule flex space-between align-items-center">
                          <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.departDate)}}</span>
                          <img src="../../../assets/images/common/rect.png" alt="rect">
                          <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.returnDate)}}</span>
                        </div>
                        <div class="time-cost flex space-between">
                          <span>{{(TimeFormatUtil.getDurationDescription(item))}}</span>
                          <span>{{(item.stops.length-1==0 ? 'non-stop' : item.stops.length-1+'stop')}}</span>
                        </div>

                      </div>
                      <div class="city-name flex space-between align-items-center">
                        <div class="depart">
                          {{flightOrder.destinationAirport.iataCode}}
                        </div>
                        <img class="gb" src="../../../assets/images/common/icon-goback.png" alt="">
                        <div class="arrive">
                          {{flightOrder.departAirport.iataCode}}
                        </div>
                      </div>
                    </div>
                    <div class="flight-price">
                      <div class="flight-price-detail">
                        <div style="color:#999;font-size:10px;text-align:right;text-decoration:line-through;">
                          <span class="rs">RS.</span> {{Math.round((item.flightInfoBack.fee.obfp+item.flightInfoBack.fee.ogst)/numberOfPeople) | formatDate}}
                        </div>
                        <div class="price-show flex content-end align-items-center">
                          <span class="rs">RS.</span>
                          <span>
                            {{Math.round((item.minPriceObj.exFee?item.minPriceObj.exFee[0].bfp+item.minPriceObj.exFee[0].gst:item.minPriceObj.bfp+item.minPriceObj.gst)/numberOfPeople) | formatDate}}
                          </span>
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
								<div class="ad" v-if="showAD(displayedReturnFlights(), index)">
									<img v-if="offers[0]&&offers[0].use == 1" :src="offers[0].url" alt="" @click="ADImgClick(1)">
								</div>
								<div class="select-pay" ref="payoptionReturn">
									<div class="lower-price flex space-between align-items-center">
										<span class="title">The Lowest Price</span>
										<span class="price">
											<span class="rs">RS.</span>
											{{item.bfp + item.gst - item.airlineDIS}}
										</span>
										<span class="back-price flex content-end">
											<!-- <span class="sp">Crashback:</span> -->
											<span class="rs">RS.</span>
											<span class="back-price-sp">{{item.obfp + item.ogst | formatDate}}</span>
										</span>
										<input class="pickflight" type="radio" name="pickreturn" value='normal' @click="pickReturn(index)" ref="normalReturnPay">
									</div>
									<div class="cashback flex space-between align-items-center">
										<span class="title">Cashback Price</span>
										<span class="price">
											<span class="rs">RS.</span>
											{{item.obfp + item.ogst - item.airlineDIS | formatDate}}
										</span>
										<span class="back-price flex content-end align-items-center" v-if="earnTitle.isShow">
											<div class="cash-bg" :style="cashBg">{{earnTitle.titleName}}</div>
											<span class="price-color">
												<span class="rs">RS.</span>
												{{Math.round(item.commonDiscount*0.82)}}
											</span>
										</span>
										<input class="pickflight" type="radio" name="pickreturn" value='cashback' @click="pickReturn(index)" ref="cashbackReturnPay">
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from "../../../components/head/head.vue";
import loading from "../../../components/loading/loading.vue";
import failure from "../../failure/failure.vue";
import { TimeFormatUtil, GetFlightOrderUtil } from "../../../models/utils";
import { Flight, FlightFactory } from "../../../models/flight";
import { Toast, Indicator, Switch, Checklist } from "mint-ui";
import _ from "underscore";
import {
  DiscountItem,
  RoundTripDiscountManager,
  RoundTripCompanyDiscountPolicy,
  RoundTripUnionDiscountPolicy,
  RoundTripLadderPolicy
} from "../../../models/aboutdiscount/";
import { RoundTripFilter } from "../../../models/filter";
import { CookieUtil } from "../../../models/utils";
import * as XFlight from "../../../vuex/models/flight/XFlight.js";
import { User } from "../../../models/user";
import { DomainManager } from '../../../config/DomainManager';
import {Search_result1, Search_result2, emitCustomEvent} from 'models/utils/adGAEvent';

let _companyPolicy = null;
let _ladderPolicy = null;
let _unionPolicy = null;
let _roundTripDiscountManager = null;

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
      bookdepartFlight: "",
      bookreturnFlight: "",
      payDepartType: "",
      payReturnType: "",
      sortType: 2,
      selectWayType: 0,
      showLoad: false,
      showPopup: false,
      showPopup2: false,
      heads: {
        img1: require("../../../assets/images/flight-prev.png"),
        img2: require("../../../assets/images/ic-loudou.png"),
        fromCity: "New Delhi",
        toCity: "Mumbai",
        time: "18Mar-31Mar",
        traveller: "1"
      },
      selectWayImg: [
        require("../../../assets/images/flight-prev.png"),
        require("../../../assets/images/ic-loudou.png")
      ],
      titleList: ["Time", "Duration", "Price", "Cashback"],
      selctWayList: ["Going", "Return"],
      isDepartPrice: { isSort: true },
      isDepartTime: { isSort: true },
      isReturnPrice: { isSort: true },
      isReturnTime: { isSort: true },
      sortByTime: "SORT_BY_TIME",
      sortByPrice: "SORT_BY_PRICE",
      sortImg: require("../../../assets/images/ic-btn-one1.png"),
      TimeFormatUtil,
      selectedDepartFlightIndex: 0,
      selectedReturnFlightIndex: 0,
      roundTripFilter: null,
      filterOptions: {},
      cashbackTips: 0,
      originalPrice: 0,
      disPrice: 0,
      payType: "",
      hasFlihgt: true,
      calculateDiscountTime: false,
      offers: [],
      priceData: {},
      model: 0,
      ifLogin: CookieUtil.hasItem("uuid"),
      opa:[],
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
  computed: {
    numberOfPeople() {
      let o = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
      return o.adults.length + o.children.length + o.infants.length;
    },
    ifCash() {
      if (sessionStorage.returnCash) {
        return true;
      } else {
        return false;
      }
    },
    paymentType() {
      if (
        this.payDepartType == "cashback" &&
        this.payReturnType == "cashback"
      ) {
        return true;
      } else {
        return false;
      }
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
    flightTimeRangeString() {
      let d = this.flightOrder.departDate;
      let r = this.flightOrder.returnDate;

      return (
        // TimeFormatUtil.getMonthDescription(parseInt(d.slice(5,7))) +
        // d.slice(-2) +
        // "-" +
        // TimeFormatUtil.getMonthDescription(parseInt(r.slice(5,7))) +
        // r.slice(-2)
        TimeFormatUtil.getMonthDescription(d.getMonth()) +
        d.getDate() +
        "-" +
        TimeFormatUtil.getMonthDescription(r.getMonth()) +
        r.getDate()
      );
    },
    flightOrder: function() {
      let order = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
      return order;
    },
    travellerNum() {
      let adultNum = this.flightOrder.adults.length;
      let childNum = this.flightOrder.children.length;
      let infantsNum = this.flightOrder.infants.length;
      return adultNum + childNum + infantsNum;
    }
  },
  watch: {
    $route() {
      Indicator.close();
    },
    selectedDepartFlightIndex(val, old) {
      this.displayedDepartFlights()[old].realDiscount = 0;
      this.displayedReturnFlights()[
        this.selectedReturnFlightIndex
      ].realDiscount = 0;
      this.onBothItemSelected();
    },
    selectedReturnFlightIndex(val, old) {
      this.displayedDepartFlights()[
        this.selectedDepartFlightIndex
      ].realDiscount = 0;
      this.displayedReturnFlights()[old].realDiscount = 0;
      this.onBothItemSelected();
    },
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
    getLimitDepartIndex(){
      let index = 0; 
      if(this.$store.getters.selectflightofall){
        this.$store.getters.selectflightofall.forEach((e, i)=>{
          if(index === 1){
            return false;
          }else{
            let flag = this.getNumberLimit(e, e.flightNumber, e.airline.shortname);
            if(!flag){
              index++;
              this.selectedDepartFlightIndex = i;
            }
          }
        })
      }
    },
    getNumber(item, fn){
      let str1, str2, num1, num2;
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
    showAD(displayedDepartFlights, index) {
      if (displayedDepartFlights.length > 3) {
        return index == 2;
      } else if (displayedDepartFlights.length <= 3) {
        return index == displayedDepartFlights.length - 1;
      }
    },
    departShow(index) {
      return index === 0
        ? this.flightOrder.departAirport.iataCode
        : this.flightOrder.destinationAirport.iataCode;
    },
    returnshow(index) {
      return index === 0
        ? this.flightOrder.destinationAirport.iataCode
        : this.flightOrder.departAirport.iataCode;
    },
    showFlight(type) {
      if (
        this.displayedDepartFlights() != null &&
        this.displayedReturnFlights() != null
      ) {
        if (
          this.displayedDepartFlights().length != 0 &&
          this.displayedReturnFlights().length != 0
        ) {
          let dFlight = this.displayedDepartFlights()[
            this.selectedDepartFlightIndex
          ];
          let rFlight = this.displayedReturnFlights()[
            this.selectedReturnFlightIndex
          ];
          if (type == "departFlight") {
            return dFlight.stops[0].flightNumber;
          } else if (type == "returnFlight") {
            return rFlight.stops[0].flightNumber;
          }
          if (type == "departDuration") {
            return (
              TimeFormatUtil.getDisplayHourAndMinute(dFlight.departDate) +
              "-" +
              TimeFormatUtil.getDisplayHourAndMinute(dFlight.returnDate)
            );
          } else if (type == "returnDuration") {
            return (
              TimeFormatUtil.getDisplayHourAndMinute(rFlight.departDate) +
              "-" +
              TimeFormatUtil.getDisplayHourAndMinute(rFlight.returnDate)
            );
          }
          this.hasFlihgt = true;
        }
      } else {
        this.hasFlihgt = false;
        return "";
      }
    },
    getTotalProperty(property) {
      if (
        this.displayedDepartFlights() != null &&
        this.displayedReturnFlights() != null
      ) {
        let save1 = 0;
        let save2 = 0;
        if (this.displayedDepartFlights().length != 0) {
          let dFlight = this.displayedDepartFlights()[
            this.selectedDepartFlightIndex
          ];
          save1 = dFlight.bfp + dFlight.gst - dFlight.airlineDIS;
        }
        if (this.displayedReturnFlights().length != 0) {
          let rFilght = this.displayedReturnFlights()[
            this.selectedReturnFlightIndex
          ];
          save2 = rFilght.bfp + rFilght.gst - rFilght.airlineDIS;
        }
        this.disPrice = save1 + save2;
        return save1 + save2;
      } else {
        return 0;
      }
    },
    getTotalCashProperty(property) {
      if (
        this.displayedDepartFlights() != null &&
        this.displayedReturnFlights() != null
      ) {
        let save1 = 0;
        let save2 = 0;
        if (this.displayedDepartFlights().length != 0) {
          let dFlight = this.displayedDepartFlights()[
            this.selectedDepartFlightIndex
          ];
          save1 = dFlight.obfp + dFlight.ogst;
        }
        if (this.displayedReturnFlights().length != 0) {
          let rFilght = this.displayedReturnFlights()[
            this.selectedReturnFlightIndex
          ];
          save2 = rFilght.obfp + rFilght.ogst;
        }
        this.disPrice = save1 + save2;
        return save1 + save2;
      } else {
        return 0;
      }
    },
    getTotalSaveProperty(property) {
      if (
        this.displayedDepartFlights() != null &&
        this.displayedReturnFlights() != null
      ) {
        let save1 = 0;
        let save2 = 0;
        if (this.displayedDepartFlights().length != 0) {
          let dFlight = this.displayedDepartFlights()[
            this.selectedDepartFlightIndex
          ];
          save1 = dFlight[property];
        }
        if (this.displayedReturnFlights().length != 0) {
          let rFilght = this.displayedReturnFlights()[
            this.selectedReturnFlightIndex
          ];
          save2 = rFilght[property];
        }
        return save1 + save2;
      } else {
        return 0;
      }
    },
    pickReturn(index) {
      var normalPay = this.$refs.normalReturnPay[index];
      var cashbackPay = this.$refs.cashbackReturnPay[index];
      var normalDepartPay = this.$refs.normalDepartPay[
        this.selectedDepartFlightIndex
      ];
      var cashbacDepartPay = this.$refs.cashbackDepartPay[
        this.selectedDepartFlightIndex
      ];

      if (normalPay.checked) {
        normalDepartPay.checked = true;
        cashbacDepartPay = false;

        this.payType = false;
      } else {
        if (!CookieUtil.hasItem("uuid")) {
          this.$router.push("/login");
          cashbackPay.checked = false;

          return false;
        }
        normalDepartPay.checked = false;
        cashbacDepartPay.checked = true;

        this.payType = true;
      }
    },
    pickDepart(index) {
      var normalPay = this.$refs.normalDepartPay[index];
      var cashbackPay = this.$refs.cashbackDepartPay[index];

      var normalReturnPay = this.$refs.normalReturnPay[
        this.selectedReturnFlightIndex
      ];
      var cashbacReturnPay = this.$refs.cashbackReturnPay[
        this.selectedReturnFlightIndex
      ];

      if (normalPay.checked) {
        normalReturnPay.checked = true;
        cashbacReturnPay.checked = false;

        this.payType = false;
        this.changeItem(1);
      } else {
        if (!CookieUtil.hasItem("uuid")) {
          this.$router.push("/login");

          cashbackPay.checked = false;

          return false;
        }
        normalReturnPay.checked = false;
        cashbacReturnPay.checked = true;

        this.payType = true;
        this.changeItem(1);
      }
    },
    getFlightToDepart() {
      return this.$store.getters.selectflightofall;
    },
    getFlightToReturn() {
      return this.$store.getters.selectReturnFlightOfAll;
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
    sortDate(sortType) {
      let flightType = "";
      if (this.selectWayType === 0) {
        flightType = this.getFlightToDepart();
      } else {
        flightType = this.getFlightToReturn();
      }
      switch (sortType) {
        case 0:
          this.isTime = !this.isTime;
          flightType.sort((o1, o2) => {
            if (this.isTime) {
              this.isSort = true;
              return o1.departDate.getTime() - o2.departDate.getTime();
            } else {
              this.isSort = false;
              return o2.departDate.getTime() - o1.departDate.getTime();
            }
          });
          break;
        case 1:
          this.isDuration = !this.isDuration;
          flightType.sort((o1, o2) => {
            if (this.isDuration) {
              this.isSort = true;
              return o1.getDurationInMinute() - o2.getDurationInMinute();
            } else {
              this.isSort = false;
              return o2.getDurationInMinute() - o1.getDurationInMinute();
            }
          });

          break;
        case 2:
          this.isPrice = !this.isPrice;
          flightType.sort((o1, o2) => {
            if (this.isPrice) {
              this.isSort = true;
              return o1.getPrice() - o2.getPrice();
            } else {
              this.isSort = false;
              return o2.getPrice() - o1.getPrice();
            }
          });
          break;
        case 3:
          this.isCashback = !this.isCashback;
          flightType.sort((o1, o2) => {
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
    changeItem(index) {
      this.selectWayType = index;
      var arr = document.querySelectorAll(".flight-detail-cont > div");
      for (var i = 0; i < arr.length; i++) {
        arr[i].style.display = "none";
      }
      arr[index].style.display = "block";
      sessionStorage.roundType = index;
    },
    goBack() {
      Indicator.close();
      this.$router.push("/");
    },
    close() {
      Indicator.close();
      this.showPopup2 = false;
    },
    saveFN(fn) {
      var airports = fn.x.airports;
      sessionStorage.setItem("airports", JSON.stringify(airports));
    },
    skipFilter() {
      if (this.selectWayType === 0) {
        this.$router.push("/roundtrip/filter");
      } else {
        this.$router.push("/roundtrip/filterB");
      }
    },
    rotates(el, itemObj) {
      if (itemObj.isSort) {
        el.style.transition = ".3s";
        el.style.webkitTransition = ".3s";
        el.style.transform = "rotateX(0deg)";
        el.style.webkitTransform = "rotateX(0deg)";
      } else {
        el.style.transition = ".3s";
        el.style.webkitTransition = ".3s";
        el.style.transform = "rotateX(180deg)";
        el.style.webkitTransform = "rotateX(180deg)";
      }
    },
    getResult(vueComp, token) {
      var self = this;
      vueComp.$store.getters.flightOrder
        .getCheckResult(vueComp, token)
        .then(function(res) {
          if (res.code == 0) {
            let order = self.$store.getters.flightOrder;
            GetFlightOrderUtil.setOrderIntoSession(order, sessionStorage);
            Indicator.close();
            self.$router.push("/book");
          } else {
            setTimeout(function() {
              self.getLoop(token);
            }, 1500);
          }
        });
    },
    getLoop(token) {
      this.getResult(this, token);
    },
    onBookingButtonClick() {
      let departFlight = this.displayedDepartFlights()[
        this.selectedDepartFlightIndex
      ];
      let returnFlights = this.displayedReturnFlights()[
        this.selectedReturnFlightIndex
      ];
      let deprtAtTime = departFlight.atTime;
      let returnDtTime = returnFlights.dtTime;
      // if (new Date(deprtAtTime) > new Date(returnDtTime)) {
      // 	Indicator.close();
      // 	Toast({
      // 		message: "Hey, these flights overlap, please change the selection",
      // 		duration: 2000
      // 	})
      // 	return
      // }

      this.flightOrder.setDepartFlight(this, departFlight);
      this.flightOrder.setReturnFlight(this, returnFlights);
      this.flightOrder.setAirportFullName(
        this.displayedDepartFlights()[this.selectedDepartFlightIndex]
      );
      this.flightOrder.disPrice = this.disPrice;
      this.$router.push("/ticketlist");
    },
    refreshFlightDatesFromJson(json) {
      let companyDiscountItemList = [];
      let unionJson = [];
      let departJson = [];
      let returnJson = [];
      let props = json.x.props;
      let rtd = json.x.rtd;
      _unionPolicy = new RoundTripUnionDiscountPolicy(rtd);

      //this.departFlight
      var airlineList = json.x.airlines;
      let departFlights = new FlightFactory(
        json.departFlightArray,
        airlineList
      ).build(function(flight, companyDicount) {
        companyDiscountItemList.push(
          new DiscountItem(flight.flightNumber, companyDicount)
        );
      });
      for (var i = 0; i < departFlights.length; i++) {
        departFlights[i].id = i;
      }

      //this.returnFlights
      let returnFlights = new FlightFactory(
        json.returnFlightArray,
        airlineList
      ).build(function(flight, companyDicount) {
        companyDiscountItemList.push(
          new DiscountItem(flight.flightNumber, companyDicount)
        );
      });

      for (var i = 0; i < returnFlights.length; i++) {
        returnFlights[i].id = i;
      }
      //init ladder policy
      _ladderPolicy = new RoundTripLadderPolicy(props);
      //init company policy
      _companyPolicy = new RoundTripCompanyDiscountPolicy(
        companyDiscountItemList
      );
      _roundTripDiscountManager = new RoundTripDiscountManager(
        departFlights,
        returnFlights,
        [_unionPolicy]
      );

      // _roundTripDiscountManager.firstCalculateDiscount()
      //departFlight
      this.$store.commit(XFlight.getAllFlight, departFlights);
      this.$store.commit(XFlight.selsectAllFlight, departFlights);
      //returnFlight
      this.$store.commit(XFlight.getAllReturnFlight, returnFlights);
      this.$store.commit(XFlight.selsectReturnAllFlight, returnFlights);
      sessionStorage.flightType = "two";

      this.displayedDepartFlights().sort((a, b) => {
        this.isDepartPrice.isSort = true;
        return a.getPrice() - b.getPrice();
      });

      this.displayedReturnFlights().sort((a, b) => {
        this.isReturnPrice.isSort = true;
        return a.getPrice() - b.getPrice();
      });

      this.displayedDepartFlights().forEach(el => {
        let d = el.departDate;
        let r = el.returnDate;
        el.durationDays = r.getDate() - d.getDate();
      });

      this.displayedReturnFlights().forEach(el => {
        let d = el.departDate;
        let r = el.returnDate;
        el.durationDays = r.getDate() - d.getDate();
      });
    },
    onDepartItemClick(item, index) {
      this.hasClicked = 1;
      var arr = this.$refs.payoptionDepart;
      var el = this.$refs.payoptionDepart[index];
      this.bookdepartFlight = this.displayedDepartFlights()[
        this.selectedDepartFlightIndex
      ].flightNumber;
      var normalReturnPay = this.$refs.normalReturnPay[
        this.selectedReturnFlightIndex
      ];
      var cashbacReturnkPay = this.$refs.cashbackReturnPay[
        this.selectedReturnFlightIndex
      ];
      this.selectedDepartFlightIndex = index;
      this.cashbackTips = Math.round(item.commonDiscount * 0.82);
      this.originalPrice = item.obfp + item.ogst;
      this.changeItem(1);
    },
    onReturnItemClick(item, index) {
      var arr = this.$refs.payoptionReturn;
      var el = this.$refs.payoptionReturn[index];
      this.bookreturnFlight = this.displayedReturnFlights()[
        this.selectedReturnFlightIndex
      ].flightNumber;
      this.selectedReturnFlightIndex = index;
      this.cashbackTips = Math.round(item.commonDiscount * 0.82);
      this.originalPrice = item.price;
      let departFlight = this.displayedDepartFlights()[
        this.selectedDepartFlightIndex
      ];
      let returnFlights = this.displayedReturnFlights()[
        this.selectedReturnFlightIndex
      ];
      let deprtAtTime = departFlight.atTime;
      let returnDtTime = returnFlights.dtTime;

      this.flightOrder.setDepartFlight(this, departFlight);
      this.flightOrder.setReturnFlight(this, returnFlights);
      this.flightOrder.setAirportFullName(
        this.displayedDepartFlights()[this.selectedDepartFlightIndex]
      );

      sessionStorage.setItem("order", this.flightOrder);
      this.onBothItemSelected();
      var self = this;
      Indicator.open();

      var length =
        this.flightOrder.adults.length +
        this.flightOrder.children.length +
        this.flightOrder.infants.length;

      this.priceData.departFlight = {};
      this.priceData.returnFlight = {};

      this.priceData.departFlight[
        "fee"
      ] = this.flightOrder.departFlight.flightInfoBack.fee;
      this.priceData.returnFlight[
        "fee"
      ] = this.flightOrder.returnFlight.flightInfoBack.fee;

      this.priceData.departFlight[
        "feee"
      ] = this.flightOrder.departFlight.flightInfoBack.feee;
      this.priceData.returnFlight[
        "feee"
      ] = this.flightOrder.returnFlight.flightInfoBack.feee;

      this.priceData.departFlight.fee.pCount = length;
      this.priceData.returnFlight.fee.pCount = length;

      this.priceData.departFlight[
        "fn"
      ] = this.flightOrder.departFlight.flightNumber;
      this.priceData.returnFlight[
        "fn"
      ] = this.flightOrder.returnFlight.flightNumber;

      let rRtd = this.flightOrder.returnFlight.airlineDIS;
      let oRtd = this.flightOrder.departFlight.airlineDIS;

      let dn = this.flightOrder.departFlight.flightNumber;
      let rn = this.flightOrder.returnFlight.flightNumber;

      if (this.flightOrder.departFlight.airlineDIS) {
        this.priceData.rtd = {
          o: {},
          r: {}
        };
        this.priceData.rtd.o[dn] = oRtd;
        this.priceData.rtd.r[rn] = rRtd;
      }

      var d = this.flightOrder.departFlight.flightInfoBack;
      var r = this.flightOrder.returnFlight.flightInfoBack;

      var o = this.flightOrder;
      var dataArr = [d, r];
      this.flightOrder.getRoundTripPrice(this).then(res => {
        if (res.success) {
          //code == 0 可以预定
          if (res.code == 0) {
            let data = res.data;
            let arr = ["departFlight", "returnFlight"];
            for (let i = 0; i < arr.length; i++) {
              o[arr[i]].flightInfoBack.feee = data[arr[i]].feee;
              o[arr[i]].stringsArr = data[arr[i]].feee.feeStrings;
              for (let x in o[arr[i]].flightInfoBack.fee) {
                o[arr[i]].flightInfoBack.fee[x] = data[arr[i]].fee[x];
              }
            }
            o.returnFlight.flightInfoBack.fee.maxCba = _.max(data.returnFlight.fee.fees, v => v.cba).cba;
            o.departFlight.flightInfoBack.fee.maxCba = _.max(data.departFlight.fee.fees, v => v.cba).cba;
            setTimeout(function() {
              Indicator.close();
              self.$router.push("/ticketlist");
            }, 1000);
          }
          //code == 2 不可预定 小于时间差
          if (res.code == 2) {
            Indicator.close();
            var msg = Toast({
              message: res.message,
              duration: 1500
            });
          }
        } else {
          //code == 1 系统错误 报返回错误
          if (res.code == 1) {
            Indicator.close();

            Toast({
              message: res.msg,
              duration: 1500
            });
          }
        }
      });

      GetFlightOrderUtil.setOrderIntoSession(this.flightOrder, sessionStorage);
    },
    onBothItemSelected() {
      let departFlight = this.displayedDepartFlights()[
        this.selectedDepartFlightIndex
      ];
      let returnFlight = this.displayedReturnFlights()[
        this.selectedReturnFlightIndex
      ];
      _roundTripDiscountManager.calculateDiscount(
        departFlight,
        returnFlight,
        this
      );
    },
    filter(filterOptions) {
      this.filterOptions = filterOptions;
    },
    displayedDepartFlights() {
      return this.$store.getters.selectflightofall;
    },
    displayedReturnFlights() {
      return this.$store.getters.selectReturnFlightOfAll;
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
            res.list.sort((a, b) => {
              return a.sort > b.sort;
            });
            this.offers = res.list;
          }
        })
        .catch(err => {
          console.log(err.msg);
        });
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
      }
      this.$store.commit(XFlight.getAllFlight, null);
      this.$store.commit(XFlight.selsectAllFlight, null);
      this.$store.commit(XFlight.getAllReturnFlight, null);
      this.$store.commit(XFlight.selsectReturnAllFlight, null);
      this.showLoad = true;
      this.showPopup = false;
      this.flightOrder.searchSuitableFlights(this).then(res => {
        this.showLoad = false;
        Indicator.close();
        if(res.success && res.departFlightArray){
          let total = Number(parseInt(new Date().getTime()/1000)) + Number(res.x.cacheTime);
          let obj = {}, newObj={};
          if(localStorage.searchKey){
            newObj = JSON.parse(localStorage.searchKey);
          }
          newObj[this.searchInfoKey] = this.searchInfoKey;
          obj['key'] = res;
          obj['expired'] = total;

          // limit passenger count
          this.getLimitList(res);
          // 
          this.earnTitle = res.x.earnTitle;
          sessionStorage.setItem('referSilver', res.x.referSilver);
          // this.fareAlert.token = res.token;
          this.opa = res.x.opa?res.x.opa:[];
          if (res.IntlFlightArray) {
            sessionStorage.setItem("isIN", true);
          } else {
            sessionStorage.setItem("isIN", false);
          }
          this.$store.state.flightOrder.order.token = res.token;
          this.refreshFlightDatesFromJson(res);
          this.roundTripFilter = new RoundTripFilter();
          this.onBothItemSelected();
          this.saveFN(res);
          if(sessionStorage.getItem("hasClicked") == 1){
            clearInterval(this.timerClick);
          }else{
            this.hasClicked = 2;
            sessionStorage.setItem("hasClicked",1);
          }
          this.getLimitDepartIndex();
        }else{
          this.flightErrorMsg = res.msg;
          this.showPopup = true;
          localStorage.removeItem(this.searchInfoKey);
        }
      }).catch(err => {
        this.showPopup = true;
        this.showLoad = false;
        Indicator.close();
        localStorage.removeItem(this.searchInfoKey);
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
    }
  },
  beforeCreate() {
    if (!sessionStorage.order) {
      if (!this.flightOrder || !this.flightOrder.returnDate) {
        Toast({
          message: "infomation expired",
          duration: 2000
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      }
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
    this.checkType();
    this.getADVlist();
  },
  mounted() {
    sessionStorage.removeItem("hasClicked");
    this.hasClicked = 0;
    sessionStorage.roundType = this.selectWayType;
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
    //     this.refreshFlightDatesFromJson(obj.key);
    //     this.$store.state.flightOrder.order.token = obj.key.token;
    //   }
    // }else{
    //   this.getFlightLists();
    // }
  }
};
</script>
<style lang="less">
#f-wrapper2{
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
::-webkit-scrollbar {
  display: none;
}

.rs {
  margin-right: 0 !important;
}

.yellow {
  color: #ffad3d;
}

.header {
  background: #f7f7f8;
  box-sizing: border-box;
  background: #0b9d78;
  i {
    display: block;
    padding: 0 0.64rem;
  }
  .next {
    img {
      width: 0.8rem;
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
    background: url("../../../assets/images/re-flight_04.png") center no-repeat;
    background-size: 0.64rem;
  }
  .title-info {
    font-size: 0.56rem;
    color: #fff;
  }
}

.total {
  height: 2.49rem;
  background: #0b9d78;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  color: #fff;
  .total-cont {
    width: 100%;
    padding: 0 0.64rem;
    box-sizing: border-box;
    .total-amount {
      font-size: 0.68rem;
      .flight {
        font-size: 0.512rem;
        span {
          display: block;
        }
        img {
          display: block;
          height: 1px;
        }
      }
      .duration {
        font-size: 0.512rem;
      }
      span {
        text-align: left;
        line-height: 1rem;
      }
    }
    .total-price {
      .total-price-rs {
        font-size: 0.68rem;
        text-align: right;
      }
      .total-price-ecash {
        font-size: 0.5rem;
        color: #f2f2f2;
      }
      .save {
        text-align: right;
        span {
          font-size: 0.34rem;
        }
        .save-price {
          color: #ffad3d;
        }
      }
    }
    .booking {
      width: 3.49rem;
      height: 1.36rem;
      padding: 0.1rem;
      line-height: 1.36rem;
      display: block;
      font-size: 0.64rem;
      color: #fff;
      text-align: center;
      background-color: #ffad3d;
      border-radius: 4px;
    }
  }
}

.flight-from {
  .flight-from-cont {
    padding: 0.4rem 0;
    span {
      display: block;
      width: 50%;
      text-indent: 0.68rem;
      text-align: left;
      font-size: 0.68rem;
      color: #666;
    }
  }
}

.select-way {
  margin-top: 2.04rem;
  .select-item {
    display: block;
    width: 50%;
    height: 1.7rem;
    line-height: 1.7rem;
    color: #bababa;
    background: #ebebeb;
    font-size: 0.6rem;
  }
  .select-item-back {
    display: block;
    width: 50%;
    height: 1.7rem;
    line-height: 1.7rem;
    color: #bababa;
    background: #ebebeb;
    font-size: 0.6rem;
  }
  .active {
    background: #ffad3d;
    color: #fff;
  }
}

.flight-detail {
  position: absolute;
  top: 3.7rem;
  left: 0px;
  right: 0px;
  bottom: 0px;
  .info-wrapper {
    .con-title {
      width: 100%;
      font-size: 0.64rem;
      color: #c2c2c2;
      .span-wrap {
        border-top: 1px solid #d6d6d6;
        border-bottom: 1px solid #d6d6d6;

        i {
          display: inline-block;
        }
        .sort-form {
          width: 25%;
          box-sizing: border-box;
          line-height: 1.7rem; // border: 1px solid #d6d6d6;
          // border-right: 0;
          .sort-wrap {
            width: 100%;
            height: 80%;
            border-right: 1px solid #d6d6d6;
          }
          span {
            font-size: 0.512rem;
          }
          .sort-type {
            box-sizing: border-box;
            display: block;
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
      padding: 0.15rem 1.28rem;
      .rs,
      .rs-price {
        color: #0b9d78;
      }
    }
  }

  .flight-detail-title {
    .flight-title {
      width: 6.54rem;
      padding: 0.2rem 0.68rem;
      background: #0b9d78;
      border-radius: 0.2rem;
      span {
        display: block;
        font-size: 0.64rem;
        color: #fff;
        margin-top: 1px;
        cursor: pointer;
        i {
          margin-left: 6px;
          img {
            width: 0.3rem;
          }
        }
      }
    }
  }
  .flight-detail-cont {
    position: absolute;
    top: 2rem;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: auto;
    .flight-detail-depart-lists,
    .flight-detail-return-lists {
      overflow-y: scroll;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      ul {
        overflow: auto;
        height: 100%;
        background-color: #fff;
        li {
          width: 100%;
        }
        .item-def {
          background: #fff;
        }

        .item-act {
          background: rgba(11, 157, 120, 0.1);
        }
        .ad {
          margin-bottom: 0.341rem;
          img {
            display: block;
            width: 14.72rem;
          }
        }
        .flight-content {
          position: relative;
          margin-bottom: 0.341rem;
          .flight-content1{
            margin: 0;
            padding: 0.32rem 0.6rem 0 0.6rem;
            border: 1px solid #dddddd;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
          }
          .flight-time {
            height: 2.8rem;
            width: 20%;
            position: relative;
            .flight-time-ico {
              height: 1.8rem;
              img {
                margin: 0 auto;
                width: 1.536rem;
                display: block;
              }
            }
            .fn {
              font-size: 0.43rem;
              display: block;
              color: #adadad;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .flight-time-info {
            width: 45%;
            height: 2.8rem; // .schedule,
            // .time-cost,
            // .city-name {
            // 	// padding: 0.1rem 0;
            // }
            .margininfo {
              height: 1.8rem;
              width: 5.2rem;
              margin: 0 auto;
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
              width: 5.2rem;
              color: #adadad;
              margin: 0 auto;
              .depart,
              .arrive {
                font-size: 0.47rem;
              }
              i {
                font-size: 22px;
              }
              img {
                display: block;
                height: 0.512rem;
              }
            }
          }
          .flight-price {
            width: 35%;
            position: relative;
            height: 2.8rem;
            .flight-price-detail {
              height: 1.7rem;
              .present-price {
                padding-bottom: 0.3rem;
                width: 3.2rem;
                font-size: 0.768rem;
                text-align: right;
                color: #ffad3d;
                line-height: 0.8rem; // font-weight: bold;
              }
              .price-show {
                font-size: 0.65rem;
                color: #333;
                text-align: right;
                padding-top: 0.2rem;
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
              .price-show {
                margin:0.15rem 0;
                font-size: 0.8rem;
                width: 100%;
                font-weight: bold;
                text-align: right;
                color: #f00;
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
              img {
                height: 0.6rem;
                display: block;
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
          background: rgba(245, 245, 245, 0.4);
          .lower-price,
          .cashback {
            text-align: left;
            padding: 0 0.32rem;
            height: 2.5rem;
            width: 100%;
            box-sizing: border-box;
            .title,
            .price,
            .back-price {
              height: 1.664rem;
              line-height: 1.664rem;
              font-size: 0.6rem;
            }
            .back-price-sp {
              text-decoration: line-through;
              margin-right: 0.2rem;
            }
            .title {
              display: block;
              width: 36%;
            }
            .price {
              display: block;
              color: #ff5c5c;
              width: 18%;
              text-align: center;
            }
            .back-price {
              width: 38%;
            }
            .price-color {
              color: #0b9d78;
              margin-left: 0.1rem;
              display: block;
            }
            .cash-icon {
              height: 0.7rem;
              display: block;
            }
            .sp {
              opacity: 0;
            }
          }
          .pickflight {
            display: block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 1px solid #ddd;
          }
          .lower-price {
            border-bottom: 1px solid #dddddd;
          }
        }
      }
    }
    .flight-detail-return-lists {
      display: none;
    }
    .flight-detail-track-depart,
    .flight-detail-track-return {
      box-sizing: border-box;
      padding: 0 0.64rem;
      background-color: #fff; // border-bottom: 1px solid #eee;
      .flight-detail-ico {
        padding-right: 0.2rem;
        height: 100%;
        width: 0.52rem;
        img {
          width: 0.52rem;
          display: block;
        }
      }
      .flight-detail-info {
        width: 5.8rem;
        .flight-number {
          text-align: left;
          font-size: 0.4rem;
          color: #666;
        }
        .flight-time {
          width: 20%;
          padding: 0.4rem 0;
          font-size: 0.68rem;
          color: #000;
          i {
            font-size: 0.52rem;
          }
        }
        .flight-time-info{
          width: 45%;
        }
        .flight-aside {
          padding: 0.2rem 0;
          .line {
            width: 100%;
            height: 2px;
            background-color: #ccc;
            position: relative;
            .round {
              width: 0.3rem;
              height: 0.3rem;
              border-radius: 50%;
              background-color: #ccc;
              position: absolute;
              top: 50%;
              margin-top: -0.15rem;
            }
            .round:nth-of-type(1) {
              left: 0;
            }
            .round:nth-of-type(2) {
              right: 0;
            }
          }
        }
        .flight-mileage {
          font-size: 0.4rem;
          color: #666;
          padding: 0.2rem 0;
        }
        .flight-price {
          width: 35%;
          .present-price {
            padding-bottom: 0.3rem;
            font-size: 0.56rem;
            color: #ffad3d;
            padding: 0.2rem 0.1rem;
            text-align: left;
            span {
              margin-right: 0;
            }
          }
          .past-price {
            font-size: 0.56rem;
            color: #ccc;
            padding: 0.2rem 0.1rem;
            text-align: left;
            span {
              margin-right: 0;
              text-decoration: line-through;
            }
          }
        }
        .flight-price1{
            width: 35%;
            height: 2.8rem;
            position: relative;
            .flight-price-detail {
              .price-show {
                margin:0.15rem 0;
                font-size: 0.8rem;
                width: 100%;
                font-weight: bold;
                text-align: right;
                color: #f00;
                padding-top: 0.2rem;
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
            }
            .flight-next {
              width: 0.6rem;
              background: url("../../../assets/images/ic-btn-one.png") center
                no-repeat;
              background-size: 0.5rem;
            }
          }
      }
    }
  }
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
