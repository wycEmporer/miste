<template>
  <div class="wrapper">
    <head-top class="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title" class="title">
        {{flightOrder.departAirport.iataCode}} - {{flightOrder.destinationAirport.iataCode}}
      </span>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="container">
      <div class="info-content">
        <div class="ticket-info">
          <div class="ticket">
            <div class="info-top flex space-between">
              <div class="flight-title flex content-start align-items-center">
                <img class="go" src="../../assets/images/ticketlist/go.png" alt="go">
                <img class="icon" :src="flightOrder.departFlight.airline.iconPath" alt="icon">
                <span>
                  {{flightOrder.departFlight.airline.name}} {{flightOrder.departFlight.stops[0].flightNumber}}
                </span>
              </div>
              <div class="flight-title flex content-end align-items-center">
                <span class="date">
                  {{TimeFormatUtil.getBookDetailDate(new Date(flightOrder.departDate))}}
                </span>
              </div>
            </div>
            <div class="info-middle flex content-center">
              <span class="depart">
                {{flightOrder.departFlight.stops[0].departDate.split(' ')[1]}}
              </span>
              <div class="split flex space-between align-items-center">
                <div class="line-l"></div>
                <span class="last">
                  {{flightOrder.departFlight.stops[0].waitTime}}
                </span>
                <div class="line-r"></div>
              </div>
              <span class="return">
                {{flightOrder.departFlight.stops[0].returnDate.split(' ')[1]}}
              </span>
            </div>
            <div class="info-bottom flex content-center">
              <span class="depart">
                {{flightOrder.departFlight.stops[0].departAirportName}}
              </span>
              <span class="last">

              </span>
              <span class="return">
                {{flightOrder.departFlight.stops[0].arrivalAirportName}}
              </span>
            </div>
            <div class="info-bottom-b flex space-between">
              <div class="da">
                {{flightOrder.departFlight.stops[0].departAirport.replace(/_/g,' ')}}
              </div>
              <div class="split"></div>
              <div class="aa">
                {{flightOrder.departFlight.stops[0].arrivalAirport.replace(/_/g,' ')}}
              </div>
            </div>
          </div>
          <div v-for="(stop, index) in flightOrder.departFlight.stops.slice(1)" :key="index">
            <div class="line-stop flex space-between align-items-center">
              <div class="line">
              </div>
              <span class="laytime">
                layover : {{flightOrder.departFlight.flightInfoBack.stopByFlightArray[index + 1].wt}}
              </span>
              <div class="line">
              </div>
            </div>
            <div class="stops">
              <div class="info-top flex space-between">
                <div class="flight-title flex content-start align-items-center">
                  <img class="icon" :src="stop.airline.iconPath" alt="icon">
                  <span>
                    {{stop.airline.name}} 
                    {{stop.flightNumber}}
                  </span>
                </div>
                <div class="flight-title flex content-end align-items-center">
                  <span class="date">
                    {{TimeFormatUtil.getBookDetailDate(new Date(stop.departDate))}}
                  </span>
                </div>
              </div>
              <div class="info-middle flex content-center">
                <span class="depart">
                  {{stop.departDate.split(' ')[1]}}
                </span>
                <div class="split flex space-between align-items-center">
                  <div class="line-l"></div>
                  <span class="last">
                    {{stop.waitTime}}
                  </span>
                  <div class="line-r"></div>
                </div>
                <span class="return">
                  {{stop.returnDate.split(' ')[1]}}
                </span>
              </div>
              <div class="info-bottom flex content-center">
                <span class="depart">
                  {{stop.departAirportName}}
                </span>
                <span class="last">

                </span>
                <span class="return">
                  {{stop.arrivalAirportName}}
                </span>
              </div>
              <div class="info-bottom-b flex space-between">
                <div class="da">
                  {{stop.departAirport.replace(/_/g,' ')}}
                </div>
                <div class="split"></div>
                <div class="aa">
                  {{stop.arrivalAirport.replace(/_/g,' ')}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ticket-info" v-if="flightOrder.returnFlight">
          <div class="ticket">
            <div class="info-top flex space-between">
              <div class="flight-title flex content-start align-items-center">
                <img class="back" src="../../assets/images/ticketlist/back.png" alt="back">
                <img class="icon" :src="flightOrder.returnFlight.airline.iconPath" alt="icon">
                <span>
                  {{flightOrder.returnFlight.airline.name}} {{flightOrder.returnFlight.stops[0].flightNumber}}
                </span>
              </div>
              <div class="flight-title flex content-end align-items-center">
                <span class="date">
                  {{TimeFormatUtil.getBookDetailDate(new Date(flightOrder.returnDate))}}
                </span>
              </div>
            </div>
            <div class="info-middle flex content-center">
              <span class="depart">
                {{flightOrder.returnFlight.stops[0].departDate.split(' ')[1]}}
              </span>
              <div class="split flex space-between align-items-center">
                <div class="line-l"></div>
                <span class="last">
                  {{flightOrder.returnFlight.stops[0].waitTime}}
                </span>
                <div class="line-r"></div>
              </div>
              <span class="return">
                {{flightOrder.returnFlight.stops[0].returnDate.split(' ')[1]}}
              </span>
            </div>
            <div class="info-bottom flex content-center">
              <span class="depart">
                {{flightOrder.returnFlight.stops[0].departAirportName}}
              </span>
              <span class="last">

              </span>
              <span class="return">
                {{flightOrder.returnFlight.stops[0].arrivalAirportName}}
              </span>
            </div>
            <div class="info-bottom-b flex space-between">
              <div class="da">
                {{flightOrder.returnFlight.stops[0].departAirport.replace(/_/g,' ')}}
              </div>
              <div class="split"></div>
              <div class="aa">
                {{flightOrder.returnFlight.stops[0].arrivalAirport.replace(/_/g,' ')}}
              </div>
            </div>
          </div>
          <div v-for="(stop, index) in flightOrder.returnFlight.stops.slice(1)" :key="index">
            <div class="line-stop flex space-between align-items-center">
              <div class="line">
              </div>
              <span class="laytime">
                layover : {{flightOrder.returnFlight.flightInfoBack.stopByFlightArray[index + 1].wt}}
              </span>
              <div class="line">
              </div>
            </div>
            <div class="stops">
              <div class="info-top flex space-between">
                <div class="flight-title flex content-start align-items-center">
                  <img class="icon" :src="stop.airline.iconPath" alt="icon">
                  <span>
                    {{stop.airline.name}} 
                    {{stop.flightNumber}}
                  </span>
                </div>
                <div class="flight-title flex content-end align-items-center">
                  <span class="date">
                    {{TimeFormatUtil.getBookDetailDate(new Date(stop.departDate))}}
                  </span>
                </div>
              </div>
              <div class="info-middle flex content-center">
                <span class="depart">
                  {{stop.departDate.split(' ')[1]}}
                </span>
                <div class="split flex space-between align-items-center">
                  <div class="line-l"></div>
                  <span class="last">
                     {{stop.waitTime}}
                  </span>
                  <div class="line-r"></div>
                </div>
                <span class="return">
                  {{stop.returnDate.split(' ')[1]}}
                </span>
              </div>
              <div class="info-bottom flex content-center">
                <span class="depart">
                  {{stop.departAirportName}}
                </span>
                <span class="last">

                </span>
                <span class="return">
                  {{stop.arrivalAirportName}}
                </span>
              </div>
              <div class="info-bottom-b flex space-between">
                <div class="da">
                  {{stop.departAirport.replace(/_/g,' ')}}
                </div>
                <div class="split"></div>
                <div class="aa">
                  {{stop.arrivalAirport.replace(/_/g,' ')}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ticket-list-content">
        <div class="title flex space-between align-items-center">
          <div class="line"></div>
          <span>Product Options</span>
          <div class="line"></div>
        </div>
        <div class="ticket-list">
          <div class="list-group" v-for="(item,index) in flightOrder.departFlight.flightInfoBack.fee.fees" :key="index">
            <div class="top-content flex content-start align-items-center">
              <img v-if="item.type == 3" class="cash-tag" src="../../assets/images/ticketlist/business.png" alt="tag">
              <img v-else-if="item.type == 2" class="cash-tag" src="../../assets/images/ticketlist/member.png" alt="tag">
              <img v-else src="../../assets/images/ticketlist/discount.png">
              <div class="title-wrap">
                <span class="title">
                  {{item.title}}
                </span>
              </div>
            </div>
            <div class="middle-content">
              <div class="tips ">
                <div class="price-info flex space-between align-items-center">
                  <div class="p-info1" v-if="item.type == 1"></div>
                  <div class="p-info1" v-if="item.type == 2 && numberOfPeople > 1">Use <span class="rs">Rs</span> <span>{{fixDecimal(earnSilverPrice(index)/numberOfPeople, 1) | formatDate}} * {{numberOfPeople}}</span> Happy Silver</div>
                  <div class="p-info1" v-if="item.type == 2 && numberOfPeople == 1">Use <span class="rs">Rs</span><span>{{fixDecimal(earnSilverPrice(index)/numberOfPeople, 1) | formatDate}}</span> Happy Silver</div>
                  <div class="p-info1" v-if="item.type == 3 && item.title == 'Cashback'">Transeferrable to Bank a/c within 1hour</div>
                  <div class="p-info1" v-if="item.type == 3 && (item.title == 'PremiumCashback' || item.title == 'Premium Cashback' )">Transeferrable to Bank a/c within 1hour</div>
                  <div class="p-info2">
                    <span class="rs">Rs</span>
                    <span class="p-span2">
                      {{ticketPrice(item,index) | formatDate}}
                    </span>
                  </div>
                </div>
                <div v-if="item.type == 3" class="tips-info tips-info3 flex space-between align-items-center">
                  <div class="t-info1" v-if="item.title == 'PremiumCashback' || item.title == 'Premium Cashback'">1 Reschedule</div>
                  <div class="t-info1" v-if="item.title == 'Cashback'"></div>
                  <div class="t-info-div">
                    <img :src="require('../../assets/images/ticketlist/icon_cb.png')" alt="">
                    <span class="rs price">Rs</span>
                    <span class="price price-span" v-if="flightOrder.returnFlight" :class="{nolineThrough: item.type == 3}">
                      {{(Math.round((item.exFee?(flightOrder.returnFlight.flightInfoBack.fee.fees[index].exFee[0].cba + item.exFee[0].cba):(flightOrder.returnFlight.flightInfoBack.fee.fees[index].cba + item.cba))/numberOfPeople)) | formatDate}}
                    </span>
                    <span class="price price-span" v-else :class="{nolineThrough: item.type == 3}">
                      {{(Math.round((item.exFee?item.exFee[0].cba:item.cba)/numberOfPeople)) | formatDate}}
                    </span>
                  </div>
                </div>
                <!--silver  -->
                <div class="tips-info" v-else-if="item.type == 2">
                  <!-- <span class="des">Total Discount</span> -->
                  <div class="t-info-div">
                    <span class="rs price">Rs</span>
                    <span class="price price-span" v-if="flightOrder.returnFlight">
                      <!-- {{Math.round((item.exFee?(item.exFee[0].dis + flightOrder.returnFlight.flightInfoBack.fee.fees[index].exFee[0].dis):(item.dis + flightOrder.returnFlight.flightInfoBack.fee.fees[index].dis))) | formatDate}} -->
                      {{Math.round(ticketPrice(item,index)+(earnSilverPrice(index) / numberOfPeople)) | formatDate}}
                    </span>
                    <span class="price price-span" v-else>
                      {{Math.round(ticketPrice(item,index)+(earnSilverPrice(index) / numberOfPeople)) | formatDate}}
                    </span>
                  </div>

                </div>
                <div class="tips-info" v-else-if="item.type == 1">
                  <!-- <span class="des">Total Discount</span> -->
                  <div class="t-info-div">
                    <span class="rs price">Rs</span>
                    <span class="price price-span" v-if="flightOrder.returnFlight">
                      {{(Math.round((item.exFee?(item.exFee[0].dis + flightOrder.returnFlight.flightInfoBack.fee.fees[index].exFee[0].dis):(item.dis + flightOrder.returnFlight.flightInfoBack.fee.fees[index].dis))/numberOfPeople)+ticketPrice(item,index)) | formatDate}}
                    </span>
                    <span class="price price-span" v-else>
                      {{(Math.round((item.exFee?item.exFee[0].dis: item.dis)/numberOfPeople)+ticketPrice(item,index)) | formatDate}}
                    </span>
                  </div>
                </div>
                <div class="tips-btn flex space-between align-items-center">
                  <div class="tac flex align-items-center" v-if="item.type == 1 && item.exFee && item.exFee[0].show" @click="showTips(item,index)">
                    <span>T&C</span>
                    <img v-if="item.exFee && item.exFee[0].show" src="../../assets/images/ticketlist/arrow_book1.png" alt="arrow" >
                    <!-- <img v-show="isFold[index].show" src="../../assets/images/ticketlist/arrow_g.png" alt="arrow"> -->
                    <!-- <img v-show="!isFold[index].show" src="../../assets/images/ticketlist/arrow_up.png" alt="arrow"> -->
                  </div>
                  <div class="tac flex align-items-center" v-if="item.type == 1 && (!item.exFee || !item.exFee[0].show)"></div>
                  <div class="tac flex align-items-center" v-if="item.type != 1" @click="showTips(item,index)">
                    <span>T&C</span>
                    <img v-if="item.exFee && item.exFee[0].show" src="../../assets/images/ticketlist/arrow_book1.png" alt="arrow" >
                    <!-- <img v-show="isFold[index].show" src="../../assets/images/ticketlist/arrow_g.png" alt="arrow"> -->
                    <!-- <img v-show="!isFold[index].show" src="../../assets/images/ticketlist/arrow_up.png" alt="arrow"> -->
                  </div>
                  <a href="javascript:;" @click="bookTicket(index)">BOOK</a>
                </div>
              </div>
            </div>
            <div class="tips-info-fold" ref="tipsFold">
              <div class="tips-content">
                <div class="text">
                  <h4 v-if="(item.type == 1 && item.exFee && item.exFee[0].show) || (item.type != 1)">Terms & Conditions:</h4>
                  <ol class="list" v-if="item.type == 2">
                    <li>
                      <p>
                        The total discount amount of Member Price
                        <span class="rs">Rs</span>
                        <span class="rs-price" v-if="flightOrder.returnFlight">
                          {{earnSilverPrice(index) | formatDate}}
                        </span>
                        <span class="rs-price" v-else>
                          {{earnSilverPrice(index) | formatDate}}
                        </span>should be paid by Happy Silver only.
                      </p>
                    </li>
                    <li>
                      <p>Invoice will be issued as per the displayed price of
                        <span class="rs">RS.</span>
                        <span class="rs-price" v-if="flightOrder.returnFlight">
                          {{ticketPrice(item,index) | formatDate}}
                        </span>
                        <span class="rs-price" v-else>
                          {{ticketPrice(item,index) | formatDate}}
                        </span>
                      </p>
                    </li>
                    <li v-show="ifLogin">
                      <p>
                        You still have
                        <span class="rs">RS.</span>
                        <span class="rs-price">{{silverAcount | formatDate}}</span> Happy Silver in your Happy Wallet Account
                      </p>
                    </li>
                  </ol>
                  <ol class="list" v-if="item.type == 3">
                    <li>
                      <p>
                        <span class="rs">RS.</span>
                        <span class="rs-price" v-if="flightOrder.returnFlight">
                          {{Math.round((item.exFee?(flightOrder.returnFlight.flightInfoBack.fee.fees[index].exFee[0].cba + item.exFee[0].cba):(flightOrder.returnFlight.flightInfoBack.fee.fees[index].cba + item.cba))/numberOfPeople) | formatDate}}
                        </span>
                        <span class="rs-price" v-else>
                          {{Math.round((item.exFee?item.exFee[0].cba:item.cba) / numberOfPeople) | formatDate}}
                        </span> will be transferred to your wallet instantly and will be activated after your flight
                      </p>
                    </li>
                    <li>
                      <p>Invoice will be issued as per the displayed price of
                        <span class="rs">RS.</span>
                        <span class="rs-price" v-if="flightOrder.returnFlight">
                          {{ticketPrice(item,index) | formatDate}}
                        </span>
                        <span class="rs-price" v-else>
                          {{ticketPrice(item,index) | formatDate}}
                        </span>
                      </p>
                    </li>
                    <li v-if="item.cgf">
                      <p>You can free to change your flight one time
                      </p>
                    </li>
                    <li>
                      <p>Cashback amount will be deducted if you cancel your order</p>
                    </li>
                  </ol>
                  <ol class="list" v-if="item.type == 4">
                    <li>
                      <p>
                        <span class="rs">RS.</span>
                        <span class="rs-price" v-if="flightOrder.returnFlight">
                          {{Math.round((item.exFee?(flightOrder.returnFlight.flightInfoBack.fee.fees[index].exFee[0].cba + item.exFee[0].cba):(flightOrder.returnFlight.flightInfoBack.fee.fees[index].cba + item.cba))/numberOfPeople) | formatDate}}</span>
                        <span class="rs-price" v-else>
                          {{Math.round((item.exFee?item.exFee[0].cba:item.cba)/numberOfPeople) | formatDate}}</span> will be transferred to your wallet instantly and will be activated after your flight
                      </p>
                    </li>
                    <li>
                      <p>Invoice will be issued as per the displayed price of
                        <span class="rs">RS.</span>
                        <span class="rs-price" v-if="flightOrder.returnFlight">
                          {{ticketPrice(item,index) | formatDate}}
                        </span>
                        <span class="rs-price" v-else>
                          {{ticketPrice(item,index) | formatDate}}
                        </span>
                      </p>
                    </li>
                    <li v-show="item.sid">
                      <p>You can free to change your flight one time
                      </p>
                    </li>
                    <li>
                      <p>Cashback amount will be deducted if you cancel your order</p>
                    </li>
                  </ol>
                  <ol v-if="item.type != 1 && item.exFee && item.exFee[0].show" style="border-top:1px dashed #333;margin:0.2rem 0;"></ol>
                  <ol class="list" v-if="item.exFee && item.exFee[0].show && item.exFee[0].tc">
                    <li v-html="item.exFee[0].tc.split('<br>')[index]" v-for="(it,index) in item.exFee[0].tc.split('<br>')" :key="index">{{it}}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="silver-cover" v-if="showSilverDialog" ></div>
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div class="animated silver-dialog" v-if="showSilverDialog">
        <div class="close-img"><img :src="require('../../assets/images/ticketlist/icon_close.png')" alt="" @click="hideSilverDialog"></div>
        <div class="silver-text">
          <span></span>
          <p>There is not enough Happy Silver in your account to avail Member Discount.</p>
        </div>
        <div class="silver-text" v-if="canInvite">
          <span></span>
          <p>Refer <i>{{SharePeople}}</i> friends now and earn <i>{{silverAmount}}</i> Happy Silver.</p>
        </div>
        <ul class="share-app flex space-between align-items-center" v-if="canInvite">
          <li>
            <a :href="isIos?sHref:sHref1" target="_blank">
              <img :src="require('../../assets/images/grabcashback/icon_sms.png')" alt="">
              <p>SMS</p>
            </a>
          </li>
          <li >
            <a :href="sHref2" data-action="share/whatsapp/share" target="_blank" >
              <img :src="require('../../assets/images/grabcashback/icon_whatsapp.png')" alt="">
              <p>Whatsapp</p>
            </a>
          </li>
          <li >
            <a :href="sHref3" target="_blank" >
              <img :src="require('../../assets/images/grabcashback/icon_messenger.png')" alt="">
              <p>Messenger</p>
            </a>
          </li>
          <li>
            <a id="copyUrl1" @click="copyCode">
              <img :src="require('../../assets/images/grabcashback/icon_copylink.png')" alt="">
              <p>Copylink</p>
            </a>
          </li>
        </ul>
      </div>
    </transition> 
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import headTop from "../../components/head/head";
import { GetFlightOrderUtil, TimeFormatUtil } from "../../models/utils";
import { Toast, Indicator, Button, Popup } from "mint-ui";
import { CookieUtil } from "../../models/utils";
import { OnewayOrder, RoundTripOrder } from "../../models/flightorder";
import { Flight, FlightFactory } from "../../models/flight";
import * as XFlight from "../../vuex/models/flight/XFlight";
import * as OrderMutaionNames from "../../vuex/models/flightorder/MutationName.js";
import * as types from "../../vuex/types/types.js";
import { Silver } from "../../models/discount";
import { DomainManager } from "../../config/DomainManager.js";
import { User } from "models/user";

export default {
  components: {
    headTop
  },
  data() {
    return {
      TimeFormatUtil,
      flag:true,
      isIos:false,
      sHref:'java:;',
      sHref1:'java:;',
      sHref2:'java:;',
      sHref3:'java:;',
      copylink:'',
      referSilver:null,
      canInvite:false,
      silverAmount:null,
      SharePeople:null,
      showSilverDialog:false,
      tipsFold: false,
      rtdPrice: 0,
      cbaPer: 0,
      isA: false,
      isFold:[{show:true},{show:true},{show:true},{show:true}],
      ifLogin: CookieUtil.hasItem("uuid"),
      silverEnough:false,
    };
  },
  watch:{
    ifLogin(val){
      if(val == true){
        this.getGoldAndSilver();
      }
    }
  },
  computed: {
    numberOfPeople() {
      let o = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
      return o.adults.length + o.children.length + o.infants.length;
    },
    flightOrder() {
      let a = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
      return GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
    },
    silverAcount() {
      return sessionStorage.silver
        ? JSON.parse(sessionStorage.silver).happySilverBalance
        : 0;
    },
    ifIn() {
      return JSON.parse(sessionStorage.isIN);
    }
  },
  methods: {
    hideSilverDialog(){
      this.showSilverDialog = false;
    },
    getGoldAndSilver() {
      if (!this.ifLogin) return;
      Promise.all([
        Silver.getSilverPrice(this),
        Silver.getGoldAndSilver(this)
      ]).then(
        res => {
          let appSilver = {
            happySilverBalance: res[0].balance,
            happyGoldAndSilver: res[1]
          };
          this.$store.commit(types.GET_SILVER, appSilver);

          sessionStorage.setItem("silver", JSON.stringify(appSilver));
        },
        err => {
          console.log(err);
        }
      );
    },
    onReceviedUuid(uuid) {
      CookieUtil.removeItem("uuid");
      CookieUtil.setItem("uuid", uuid);
      this.ifLogin = true;
      return "1";
    },
    typeThree(index) {
      var departP = Math.round(
        (this.flightOrder.departFlight.flightInfoBack.fee.fees[0].dis +
          this.flightOrder.departFlight.airlineDIS) *
          this.cbaPer
      );
      var returnP = Math.round(
        (this.flightOrder.returnFlight.flightInfoBack.fee.fees[0].dis +
          this.flightOrder.returnFlight.airlineDIS) *
          this.cbaPer
      );
      return departP + returnP;
    },
    cashPrice(index) {
      var o = this.flightOrder;
      var p = 0;
      if (index == 2) {
        if (o.returnFlight) {
          p =
            o.departFlight.flightInfoBack.fee.obfp -
            o.departFlight.flightInfoBack.fee.bfp +
            o.departFlight.flightInfoBack.fee.ogst -
            o.departFlight.flightInfoBack.fee.gst +
            o.returnFlight.flightInfoBack.fee.obfp -
            o.returnFlight.flightInfoBack.fee.bfp +
            o.returnFlight.flightInfoBack.fee.ogst -
            o.returnFlight.flightInfoBack.fee.gst;
        } else {
          p =
            o.departFlight.flightInfoBack.fee.fees[2].cbd *
            (o.departFlight.flightInfoBack.fee.obfp -
              o.departFlight.flightInfoBack.fee.bfp +
              o.departFlight.flightInfoBack.fee.ogst -
              o.departFlight.flightInfoBack.fee.gst);
        }
      }

      if (index == 3) {
        if (o.returnFlight) {
          p =
            o.departFlight.flightInfoBack.fee.fees[2].cbd *
              (o.departFlight.flightInfoBack.fee.obfp -
                o.departFlight.flightInfoBack.fee.bfp +
                o.departFlight.flightInfoBack.fee.ogst -
                o.departFlight.flightInfoBack.fee.gst +
                o.returnFlight.flightInfoBack.fee.obfp -
                o.returnFlight.flightInfoBack.fee.bfp +
                o.returnFlight.flightInfoBack.fee.ogst -
                o.returnFlight.flightInfoBack.fee.gst) +
            o.departFlight.flightInfoBack.fee.fees[index].n +
            o.returnFlight.flightInfoBack.fee.fees[index].n;
        } else {
          p =
            o.departFlight.flightInfoBack.fee.fees[2].cbd *
            (o.departFlight.flightInfoBack.fee.obfp -
              o.departFlight.flightInfoBack.fee.bfp +
              o.departFlight.flightInfoBack.fee.ogst -
              o.departFlight.flightInfoBack.fee.gst);
        }
      }
      return p;
    },
    silverPrice(index) {
      let price = 0;
      if (this.flightOrder.returnFlight) {
        if (this.ifIn) {
        } else {
        }
      } else {
      }
    },
    earnSilverPrice(index) {
      let price = 0;
      let inr = this.flightOrder.departFlight.flightInfoBack.fee.fees[index].exFee;
      if (this.flightOrder.returnFlight) {
        if(inr){
          price = Math.round(
            (this.flightOrder.departFlight.flightInfoBack.fee.fees[index].exFee[0].dis +
              this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].exFee[0].dis)
              //  / this.numberOfPeople
          );
        }else{
          price = Math.round(
            (this.flightOrder.departFlight.flightInfoBack.fee.fees[index].dis +
              this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].dis) 
              // / this.numberOfPeople
          );
        }
      } else {
        if(inr){
          price = Math.round(
            this.flightOrder.departFlight.flightInfoBack.fee.fees[index].exFee[0].dis 
            // / this.numberOfPeople
          );
        }else{
          price = Math.round(
            this.flightOrder.departFlight.flightInfoBack.fee.fees[index].dis 
            // / this.numberOfPeople
          );
        }
      }

      return price;
    },
    totalSilver(index) {
      if (this.flightOrder.returnFlight) {
        return Math.round(
          (-this.flightOrder.departFlight.flightInfoBack.fee.fees[index].sdis +
            -this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].sdis +
            this.flightOrder.departFlight.obfp +
            this.flightOrder.departFlight.ogst -
            this.flightOrder.departFlight.bfp -
            this.flightOrder.departFlight.gst +
            this.flightOrder.returnFlight.obfp +
            this.flightOrder.returnFlight.ogst -
            this.flightOrder.returnFlight.bfp -
            this.flightOrder.returnFlight.gst +
            this.flightOrder.departFlight.airlineDIS +
            this.flightOrder.returnFlight.airlineDIS) /
            this.numberOfPeople
        );
      } else {
        return Math.round(
          (-this.flightOrder.departFlight.flightInfoBack.fee.fees[index].sdis +
            this.flightOrder.departFlight.obfp +
            this.flightOrder.departFlight.ogst -
            this.flightOrder.departFlight.bfp -
            this.flightOrder.departFlight.gst) /
            this.numberOfPeople
        );
      }
    },
    ticketPrice(item, index) {
      let price = 0;
      if (this.flightOrder.returnFlight) {
        if (
          this.flightOrder.departFlight.airlineDIS != 0 ||
          this.flightOrder.returnFlight.airlineDIS != 0
        ) {
          if (
            this.flightOrder.departFlight.flightInfoBack.fee.fees[index].sdis ||
            this.flightOrder.departFlight.flightInfoBack.fee.fees[index].cba ==
              0
          ) {
            if(item.exFee){
              price = Math.round(
                (item.exFee[0].bfp +
                  item.exFee[0].gst +
                  this.flightOrder.returnFlight.flightInfoBack.fee.fees[index]
                    .exFee[0].bfp +
                  this.flightOrder.returnFlight.flightInfoBack.fee.fees[index]
                    .exFee[0].gst) /
                  this.numberOfPeople
              );
            }
            else{
              price = Math.round(
                (item.bfp +
                  item.gst +
                  this.flightOrder.returnFlight.flightInfoBack.fee.fees[index]
                    .bfp +
                  this.flightOrder.returnFlight.flightInfoBack.fee.fees[index]
                    .gst) /
                  this.numberOfPeople
              );
            }
          } else {
            if(item.exFee){
              price = Math.round(
                (item.exFee[0].bfp +
                  item.exFee[0].gst +
                  this.flightOrder.returnFlight.flightInfoBack.fee.fees[index]
                    .exFee[0].bfp +
                  this.flightOrder.returnFlight.flightInfoBack.fee.fees[index]
                    .exFee[0].gst) /
                  this.numberOfPeople
              );
            }
            else{
              price = Math.round(
                (item.bfp +
                  item.gst +
                  this.flightOrder.returnFlight.flightInfoBack.fee.fees[index]
                    .bfp +
                  this.flightOrder.returnFlight.flightInfoBack.fee.fees[index]
                    .gst) /
                  this.numberOfPeople
              );
            }
          }
        } else {
          if(item.exFee){
            price = Math.round(
              (item.exFee[0].bfp +
                item.exFee[0].gst +
                this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].exFee[0].bfp +
                this.flightOrder.returnFlight.flightInfoBack.fee.fees[index]
                  .exFee[0].gst) /
                this.numberOfPeople
            );
          }
          else{
            price = Math.round(
              (item.bfp +
                item.gst +
                this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].bfp +
                this.flightOrder.returnFlight.flightInfoBack.fee.fees[index]
                  .gst) /
                this.numberOfPeople
            );
          }
        }
      } else {
        if(item.exFee){
          price = Math.round((item.exFee[0].bfp + item.exFee[0].gst) / this.numberOfPeople);
        }
        else{
          price = Math.round((item.bfp + item.gst) / this.numberOfPeople);
        }
      }
      this.rtdPrice = price;
      return price;
    },
    oldPrice() {
      let old = 0;
      if (this.flightOrder.returnFlight) {
        old = Math.round(
          (this.flightOrder.departFlight.showPrice +
            this.flightOrder.returnFlight.showPrice) /
            this.numberOfPeople
        );
      } else {
        old = Math.round(
          this.flightOrder.departFlight.showPrice / this.numberOfPeople
        );
      }
      return old;
    },
    showTips(item, index) {
      let allFlod = this.$refs.tipsFold;
      let tipsFlod = this.$refs.tipsFold[index];

      if (tipsFlod.style.display == "block") {
        tipsFlod.style.display = "none";
      } else {
        for (var i = 0; i < allFlod.length; i++) {
          allFlod[i].style.display = "none";
        }   
        tipsFlod.style.display = "block";
      }
      this.isFold.forEach((e,i)=>{
        if(i == index){
          this.$set(e,"show",!e.show);
        }else{
          this.isFold[i].show = true;
        }
      })
    },
    saveParm(index) {
      let fee = this.flightOrder.departFlight.flightInfoBack.fee;
      let oRtd = this.flightOrder.departFlight.airlineDIS;
      let count = -(fee.obfp + fee.ogst - fee.bfp - fee.gst);

      if (fee.fees[index].type == 3 || fee.fees[index].type == 4) {
        this.flightOrder.returnCash = true;
        sessionStorage.returnCash = true;

        var feeO = {
          obfp: fee.fees[index].bfp,
          ogst: fee.fees[index].gst,
          bfp: fee.fees[index].bfp - fee.fees[index].cba,
          gst: fee.fees[index].gst,
          intervalDiscount: fee.dType ? count : null,
          policyDiscount: fee.dType ? null : count,
          airCompanyDiscount: oRtd ? -oRtd : null
        };
      } else {
        var feeO = {
          obfp: fee.obfp,
          ogst: fee.ogst,
          bfp: fee.fees[index].bfp,
          gst: fee.fees[index].gst,
          intervalDiscount: fee.dType ? count : null,
          policyDiscount: fee.dType ? null : count,
          airCompanyDiscount: oRtd ? -oRtd : null
        };
      }

      if (feeO.intervalDiscount != null) {
        fee.intervalDiscount = feeO.intervalDiscount;
      }
      if (feeO.policyDiscount != null) {
        fee.policyDiscount = feeO.policyDiscount;
      }
      if (feeO.airCompanyDiscount != null) {
        fee.airCompanyDiscount = feeO.airCompanyDiscount;
        this.flightOrder.departFlight.airCD = feeO.airCompanyDiscount;
      } else {
        this.flightOrder.departFlight.airCD = 0;
      }

      this.flightOrder.departFlight.flightInfoBack.feeO = feeO;

      this.flightOrder.departFlight.flightInfoBack.feee.feeStrings = [
        this.flightOrder.departFlight.stringsArr[index]
      ];
      this.flightOrder.departFlight.price =
        fee.fees[index].bfp + fee.fees[index].gst;

      if (this.flightOrder.returnFlight) {
        let feeR = this.flightOrder.returnFlight.flightInfoBack.fee;
        let rRtd = this.flightOrder.returnFlight.airlineDIS;
        let count = -(feeR.obfp + feeR.ogst - feeR.bfp - feeR.gst);
        if (feeR.fees[index].type == 3 || feeR.fees[index].type == 4) {
          var feeO = {
            obfp: feeR.fees[index].bfp,
            ogst: feeR.fees[index].gst,
            bfp: feeR.fees[index].bfp - feeR.fees[index].cba,
            gst: feeR.fees[index].gst,
            intervalDiscount: feeR.dType ? count : null,
            policyDiscount: feeR.dType ? null : count,
            airCompanyDiscount: oRtd ? -oRtd : null
          };
        } else {
          var feeO = {
            obfp: feeR.obfp,
            ogst: feeR.ogst,
            bfp: feeR.fees[index].bfp,
            gst: feeR.fees[index].gst,
            intervalDiscount: feeR.dType ? count : null,
            policyDiscount: feeR.dType ? null : count,
            airCompanyDiscount: rRtd ? -rRtd : null
          };
        }

        if (feeO.intervalDiscount != null) {
          fee.intervalDiscount = feeO.intervalDiscount;
        }
        if (feeO.policyDiscount != null) {
          fee.policyDiscount = feeO.policyDiscount;
        }
        if (feeO.airCompanyDiscount != null) {
          fee.airCompanyDiscount = feeO.airCompanyDiscount;
          this.flightOrder.returnFlight.airCD = feeO.airCompanyDiscount;
        } else {
          this.flightOrder.returnFlight.airCD = 0;
        }

        this.flightOrder.returnFlight.flightInfoBack.feeO = feeO;

        this.flightOrder.returnFlight.flightInfoBack.feee.feeStrings = [
          this.flightOrder.returnFlight.stringsArr[index]
        ];
        this.flightOrder.returnFlight.price =
          feeR.fees[index].bfp + feeR.fees[index].gst;

        let dn = this.flightOrder.departFlight.flightNumber;
        let rn = this.flightOrder.returnFlight.flightNumber;
        this.flightOrder.rtd = {
          o: {},
          r: {}
        };
        this.flightOrder.rtd.o[dn] = oRtd;
        this.flightOrder.rtd.r[rn] = rRtd;
      }
    },
    inSaveParm(index) {
      if (this.flightOrder.returnFlight) {
        let feeR = this.flightOrder.returnFlight.flightInfoBack.fee;
        let feeOR = null;
        if (feeR.fees[index].type == 1) {
          feeOR = {
            obfp: feeR.obfp,
            ogst: feeR.ogst,
            bfp: feeR.bfp,
            gst: feeR.gst
          };
        }

        if (feeR.fees[index].type == 2) {
          feeOR = {
            obfp: feeR.obfp,
            ogst: feeR.ogst,
            bfp: feeR.fees[index].bfp,
            gst: feeR.fees[index].gst
          };
        }

        if (feeR.fees[index].type == 3 || feeR.fees[index].type == 4) {
          this.flightOrder.returnCash = true;
          sessionStorage.returnCash = true;

          feeOR = {
            obfp: feeR.fees[index].bfp,
            ogst: feeR.fees[index].gst,
            bfp: feeR.fees[index].bfp - feeR.fees[index].cba,
            gst: feeR.fees[index].gst
          };
        }

        this.flightOrder.returnFlight.flightInfoBack.feeO = feeOR;

        this.flightOrder.returnFlight.flightInfoBack.feee.feeStrings = [
          this.flightOrder.returnFlight.stringsArr[index]
        ];
      }

      let feeD = this.flightOrder.departFlight.flightInfoBack.fee;
      let feeOD = null;

      if (feeD.fees[index].type == 1) {
        feeOD = {
          obfp: feeD.obfp,
          ogst: feeD.ogst,
          bfp: feeD.bfp,
          gst: feeD.gst
        };
      }

      if (feeD.fees[index].type == 2) {
        feeOD = {
          obfp: feeD.obfp,
          ogst: feeD.ogst,
          bfp: feeD.fees[index].bfp,
          gst: feeD.fees[index].gst
        };
      }

      if (feeD.fees[index].type == 3 || feeD.fees[index].type == 4) {
        this.flightOrder.returnCash = true;
        sessionStorage.returnCash = true;
        feeOD = {
          obfp: feeD.fees[index].bfp,
          ogst: feeD.fees[index].gst,
          bfp: feeD.fees[index].bfp - feeD.fees[index].cba,
          gst: feeD.fees[index].gst
        };
      }

      this.flightOrder.departFlight.flightInfoBack.feeO = feeOD;

      this.flightOrder.departFlight.flightInfoBack.feee.feeStrings = [
        this.flightOrder.departFlight.stringsArr[index]
      ];
    },
    getShareTextInfo(){
      let userId = CookieUtil.getItem('uid');
      let url = DomainManager.referralShareInfoV3();
      this.$axios({
        method:"post",
        url:url,
        data:{userId:userId},
        headers:{ "x-Device": "mobile" }
      }).then(res=>{
        this.sHref = 'sms:&body='+encodeURIComponent(res.smsMsg);
        this.sHref1 = 'sms:?body='+encodeURIComponent(encodeURIComponent(res.smsMsg));
        this.sHref2 = 'whatsapp://send?text='+ encodeURIComponent(res.whatsappMsg);
        this.sHref3 = 'fb-messenger://share/?link='+encodeURIComponent(res.messengerUrl);
        this.copylink = res.smsMsg;
      }).catch(err=>{
        console.log(err);
      })
    },
    isSilverEnough(silver){
      let url = DomainManager.getIsSilverEnough()+'?silverAmount='+silver;
      this.$axios.get(url).then(res=>{
        if(res.success && res.data.isEnough){
          this.silverEnough = true;
        }else{
          this.silverEnough = false;
          this.SharePeople = Math.ceil(Math.abs(res.data.amount) / this.referSilver);
          this.silverAmount = this.SharePeople * this.referSilver;
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    copyCode(){
      let that = this,clipboard;
      if(this.flag){
        this.flag = false;
        clipboard = new Clipboard('#copyUrl1',{
          text: function() {
            return that.copylink;
          }
        });
        clipboard.on('success', function(e) {
          Toast({
            message:"Successfully copied to the Clipboard! ",
            duration:1200
          });
          e.clearSelection();
          clipboard.destroy();
        });
        clipboard.on('error', function(e) {
          Toast({
            message:"Copy failed, please input manually! ",
            duration:1200
          });
          e.clearSelection();
          clipboard.destroy();
        });
        setTimeout(function(){
          that.flag = true;
        },1200);
      }
    },
    bookTicket(index) {
      if(index < 2){
        sessionStorage.setItem("ticketType", index + 1);
      }else{
        sessionStorage.setItem("ticketType", 3);
      }
      try {
        let arr = ["p7j7d3", "d1agvc", "6gdsr5", "6tbmqp"];
        window.heg.send2nativeAdjustWithSum(
          arr[index],
          this.ticketPrice(
            this.flightOrder.departFlight.flightInfoBack.fee.fees[index],
            index
          )
        );
      } catch (e) {
        // statements
      }

      let flightCba = this.flightOrder.departFlight.flightInfoBack.fee.fees[
        index
      ].cba;
      if (flightCba > 0 || index == 1) {
        if (!this.ifLogin) {
          try {
            window.heg.nativeSignIn();
          } catch (e) {
            this.$router.push("/login");
          }
          return false;
        }
      }

      if (index == 1) {
        
        // let sa = this.$store.getters.silver
        //   ? this.$store.getters.silver.happySilverBalance
        //   : 0;
        // if (sa < this.earnSilverPrice(index)) {
        //   Toast("you don't have enough HappySilver");
        //   return false;
        // }
        if(!this.silverEnough){
          this.showSilverDialog = true;
          return false;
        }
      }
      this.flightOrder.returnCash = false;
      sessionStorage.returnCash = false;

      this.flightOrder.departFlight.flightInfoBack.sid = this.flightOrder.departFlight.flightInfoBack.fee.fees[
        index
      ].sid;
      if (this.flightOrder.returnFlight) {
        this.flightOrder.returnFlight.flightInfoBack.sid = this.flightOrder.returnFlight.flightInfoBack.fee.fees[
          index
        ].sid;
      }

      if (this.ifIn) {
        this.inSaveParm(index);
      } else {
        this.saveParm(index);
      }
      this.flightOrder
        .check(this)
        .then(res => {
          if (res.code == 7) {
            if (sessionStorage.flightType != "") {
              Toast("Your session has expired.");
              var type = sessionStorage.flightType;
              type == "one"
                ? this.$router.push("/oneway")
                : this.ifIN
                  ? this.$router.push("/international")
                  : this.$router.push("/roundtrip");
            } else {
              sessionStorage.removeItem("flightList");
              Toast("Your session has expired.");
              this.$router.push("/");
            }
            return false;
          }
          this.flightOrder.token = res.token;
          GetFlightOrderUtil.setOrderIntoSession(
            this.flightOrder,
            sessionStorage
          );
          this.$store.commit(OrderMutaionNames.setupOrder, this.flightOrder);
          Indicator.close();
          this.$router.push("/book");
        })
        .catch(err => {
          Toast("Your session has expired.");
          this.$router.push("/");
        });
    },
    fixDecimal(num, digit){
      let newNum = Number(num.toFixed(digit+1));
      let power = Math.round(Math.pow(10, (digit + 1)) + 1e-6);
      let arr = (String(newNum * power)).split(".");
      let intNum = parseInt(newNum * power) / power;
      let result;
      let endNum = Number(arr[0].charAt(arr[0].length-1));
      if(arr[1]){
        if(intNum != num){
          endNum = endNum + 1;
        }
      }
      if(endNum > 0){
        result = (Number(arr[0]) - endNum + 10) / power;
        result = result.toFixed(digit);
      }else{
        result = newNum.toFixed(digit);
      }
      return result;
    }
  },
  created() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    if(isiOS){
      this.isIos = true;
    }else{
      this.isIos = false;
    }
    try {
      window.heg.getNativeSource();
      let uuid = window.heg.getNativeUuid();
      if(uuid){
        CookieUtil.setItem('uuid', uuid);
      }else{
        CookieUtil.removeItem('uuid');
      }
    } catch (e) {}

    window.onReceviedUuid = this.onReceviedUuid;
      
    if (!this.$store.getters.flightOrder) {
      Toast({
        message: "infomation expired",
        duration: 2000
      });

      setTimeout(() => {
        this.$router.push("/home");
      }, 2000);
    }

    // let ifReload = this.$store.state.flihgt.allFlight;
    var order = this.flightOrder;

    if (order.returnFlight) {
      if (
        order.departFlight.airlineDIS != 0 ||
        order.returnFlight.airlineDIS != 0
      ) {
        order.ifRTD = true;
        var tdCash =
          (order.departFlight.flightInfoBack.fee.obfp -
            order.departFlight.flightInfoBack.fee.bfp +
            order.departFlight.airlineDIS) *
          0.82;
        var dfeeList = order.departFlight.flightInfoBack.fee.fees;
        dfeeList[1].cba = tdCash;
        dfeeList[2].cba = tdCash;
        if (dfeeList[3]) {
          dfeeList[3].cba = tdCash + Math.round(dfeeList[3].n / 2);
        }

        var rtCash =
          (order.returnFlight.flightInfoBack.fee.obfp -
            order.returnFlight.flightInfoBack.fee.bfp +
            order.returnFlight.airlineDIS) *
          0.82;
        var rfeeList = order.returnFlight.flightInfoBack.fee.fees;
        rfeeList[1].cba = rtCash;
        rfeeList[2].cba = rtCash;
        if (rfeeList[3]) {
          rfeeList[3].cba = rtCash + Math.round(rfeeList[3].n / 2);
        }
      } else {
        order.ifRTD = false;
      }
      GetFlightOrderUtil.setOrderIntoSession(order, sessionStorage);
      this.$store.commit(OrderMutaionNames.setupOrder, order);

      // 计算往返cbd
      this.cbaPer = this.flightOrder.departFlight.flightInfoBack.fee.cbd;
    }
  },
  mounted() {
    this.getGoldAndSilver();
    if(this.ifLogin){
      this.getShareTextInfo();
      this.isSilverEnough(this.earnSilverPrice(1));
    }
    if(sessionStorage.getItem('referSilver')){
      this.referSilver = sessionStorage.getItem('referSilver');
      if(this.referSilver == 0){
        this.canInvite = false;
      }else{
        this.canInvite = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  background: #0b9d78;
  i {
    display: block;
    color: #fff;
    font-size: 0.8rem;
  }
  .title {
    font-size: 0.768rem;
  }
  .sp {
    opacity: 0;
  }
}

.container {
  .info-content {
    margin-top: 2.89rem;
    border-bottom: 0.21rem solid #ebebeb;
    .ticket-info {
      box-sizing: border-box;
      width: 14.72rem;
      margin: 0.426rem 0.64rem 0.85rem 0.64rem;
      border: 1px solid #666666;
      border-radius: 4px;
      .info-top,
      .info-middle,
      .info-bottom,
      .info-bottom-b {
        padding: 0 0.64rem;
      }
      .info-top {
        margin-top: 0.32rem;
        .flight-title {
          width: 50%;
          img,
          span {
            display: block;
          }
          img {
            padding-right: 0.5rem;
          }
          span {
            font-size: 0.512rem;
          }
          .date {
            color: #999;
          }
          .icon {
            width: 1.07rem;
            height: 1.07rem;
          }
          .go,
          .back {
            width: 0.8rem;
          }
        }
      }
      .info-middle {
        font-size: 1.536rem;
        padding-top: 0.32rem;
        .split {
          width: 30%;
          .last {
            font-size: 0.512rem;
          }
          div {
            margin: 0 0.2rem;
            width: 1rem;
            border-bottom: 1px dashed #787878;
          }
          .line-l {
            margin-right: 0.1rem;
          }
          .line-r {
            margin-left: 0.1rem;
          }
        }
        span {
          display: block;
          color: #333;
        }
        .depart {
          text-align: right;
        }
        .return {
          text-align: left;
        }
      }
      .info-bottom {
        padding-top: 0.3rem;
        span {
          width: 35%;
          display: block;
          font-size: 0.512rem;
          color: #666;
        }
        .depart {
          text-align: right;
        }
        .return {
          text-align: left;
        }
        .last {
          width: 30%;
        }
      }
      .info-bottom-b {
        padding-top: 0.3rem;
        padding-bottom: 0.512rem;
        .da,
        .aa {
          font-size: 0.512rem;
          width: 35%;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #999;
        }
        .split {
          width: 30%;
        }
        .da {
          text-align: right;
        }
        .aa {
          text-align: left;
        }
      }
      .line-stop {
        box-sizing: border-box;
        margin: 0 auto;
        width: 90%;
        height: 20px;
        .line {
          width: 35%;
          border-bottom: 1px solid #9dd8c9;
        }
        .laytime {
          display: block;
          width: 35%;
          font-size: 0.512rem;
        }
      }
    }
  }
  .ticket-list-content {
    padding: 0.64rem;
    .title {
      padding-bottom: 0.64rem;
      span {
        display: block;
        font-size: 0.597rem;
      }
      .line {
        width: 4.9rem;
        border-bottom: 1px dashed #555555;
      }
    }
    .ticket-list {
      .list-group {
        padding-bottom: 0.1rem;
        box-sizing: border-box;
        position: relative; // overflow: hidden;
        width: 14.72rem; // height: 5.55rem;
        border: 1px solid #0b9d78;
        border-radius: 4px;
        margin-bottom: 0.426rem;
        .top-content {
          height: 1.06rem;
          border-bottom: 1px solid #0b9d78;
          .title-wrap {
            width: 65%;
            text-align: center;
            .title {
              display: block;
              font-size: 0.64rem;
              padding-bottom: 0; // padding-left: 2.9rem;
            }
          }

          img {
            display: block;
            width: 35%;
            height: 1.25rem;
            margin-left: -1px;
            margin-top: -2px;
          }
        }
        .middle-content {
          padding-top: 0.768rem;
          .tips {
            padding-bottom: 0.64rem;
            text-align: right;
            .tips-info {
              // width: 28%;
              .t-info-div{
                line-height:0.5rem;
                padding-right: 0.64rem;
                img{
                  width:0.512rem;
                }
              }
              .des {
                font-size: 0.42rem;
              }
              span{display: inline-block;}
              .price {
                font-size: 0.47rem;
              }
              .price-span{
                color:#333;
                font-size: 0.427rem;
                text-decoration: line-through;
              }
              .nolineThrough{
                text-decoration: none;
              }
              .rs {
                padding-left: 0.1rem;
                margin-right:-0.2rem;
              }
            }
            .tips-info3{
              padding: 0 0 0 0.64rem;
              .t-info1{
                font-size: 0.512rem;
                color:#666;
              }
            }
            .price-info {
              padding:0 0.64rem;
              .p-info1{
                font-size: 0.512rem;
                color:#666;
                span{color:#000;}
              }
              .p-info2{
                span{
                  font-size: 0.85rem;
                  color: #e62828;
                  margin-right:0;
                }
              }
            }
            .tips-btn{
              padding: 0.427rem 0.64rem 0;
              .tac {
                font-size: 0.556rem;
                padding-right: 0.83rem;
                span{
                  padding:0 0.35rem 0 0;
                }
                img {
                  display: inline-block;
                  width: 0.5rem;
                }
              }
              a {
                display: inline-block;
                width: 3.84rem;
                height: 1.06rem;
                line-height: 1.06rem;
                background: #ffad3d;
                border-radius: 2px;
                color: #fff;
                font-size: 0.556rem;
                // font-weight: bold;
                text-align:center;
              }
            }
          }
          .old-info {
            font-size: 0.64rem;
            padding-right: 0.64rem;
            color: #999;
            .rs {
              margin-top: 0.05rem;
            }
          }
          .booking {
            padding-bottom: 0.64rem;
            a {
              display: block;
              width: 2.56rem;
              height: 1.06rem;
              line-height: 1.06rem;
              margin: 0.326rem 0.64rem 0 0;
              background: #ffad3d;
              border-radius: 2px;
              color: #fff;
              font-size: 0.512rem;
              font-weight: bold;
            }
          }
        }
        .bottom-content {
          height: 1.2rem;
          margin: 0 0.21rem;
          // border-top: 1px dashed #0b9d78;
          .tag-list {
            height: 100%;
            width: 60%;
            padding-left: 0.64rem;
            img {
              // width: 2.56rem;
              height: 0.7rem;
              padding-right: 0.3rem;
            }
          }
        }
        .tips-info-fold {
          background: #f3faf8;
          display: none;
          .tips-content {
            margin: 0 0.21rem;
            font-size: 0.426rem;
            border-top: 1px dashed #0b9d78;
            .text {
              padding: 0.32rem 0.64rem;
              text-align: left;
              line-height: 1.5;
              .rs,.rs-price {
                color: #f65858;
              }
              .rs{margin-right:0;}
              .list {
                margin-left: 0.64rem;
                list-style-type: disc;
                p{
                  white-space:normal;
                }
              }
            }
          }
        }
      } // .cash-tag {
      //     display: block;
      //     position: absolute;
      //     height: 1.06rem;
      //     top: -1px;
      //     left: -1px;
      // }
    }
  }
}

// decrease silver reward
.silver-cover{
  width:100%;
  height:100%;
  background: transparent;
  position: absolute;
  z-index:8;
  top: 0;
  left: 0;
}
.silver-dialog{
  background: rgba(0,0,0,0.8);
  position: fixed;
  z-index:8;
  bottom: 0;
  left: 0;
  text-align: left;
  padding:0.3rem 0.64rem 1.5rem;
  .close-img{
    overflow: hidden;
    img{
      width:0.534rem;
      height:0.534rem;
      float: right;
      padding:0.3rem;
      margin-right: -0.3rem;
    }
  }
  .silver-text{
    font-size: 0.512rem;
    line-height: 0.769rem;
    color:#fff;
    margin-bottom: 0.427rem;
    overflow: hidden;
    p{margin-left:0.6rem;}
    i{
      color:#f24a00;
    }
    span{
      float: left;
      margin-right: 0.3rem;
      margin-top: 0.3rem;
      border-top: 4px solid #fff;
      border-right:4px solid transparent;
      border-left:4px solid transparent;
      transform: rotate(-90deg);
    }
  }
  .share-app{
    padding-top:0.854rem;
    li{
      width:25%;
      text-align: center;
      a{
        width:100%;
        height:100%;
      }
      img{
        width:1.286rem;
        height:1.286rem;
      }
      p{
        font-size: 0.598rem;
        color:#fff;
        padding-top: 0.3rem;
      }
    }
  }
}
</style>