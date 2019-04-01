<template>
  <div class="wrapper">
    <head-top class="head">
      <i slot="left" class="iconfont icon-back"></i>
      <div slot="title" class="title">
          Change Flights
      </div>
      <i class="sp iconfont icon-back" slot="right"></i>
    </head-top>
    <div class="container">
      <div class="passengers">
        <div class="title" style="margin-top:2rem;">Select Trips & Passengers</div>
        <div class="trips" v-for="(item, key) in orders" :key="key">
          <div class="nav">
            <div class="flex space-between align-items-center">
              <div>{{item.voyageinfo[0].dc}} &rarr; {{item.voyageinfo[item.voyageinfo.length -1].ac}}</div>
            </div>
            <ul class="flex space-between align-items-center" style="height:35px;">
              <li>Passenger</li>
              <li>PNR</li>
            </ul>
          </div>
          <ul class="listPassWrap">
            <li class="passengersDetial" 
            v-for="(travellerObj) in item.travellerinfo" 
            :key="travellerObj.travellerId">
              <div class="flex fontSz15 space-between align-items-center"  :class="{inactive: travellerObj.status != 1}">
                <mt-checklist
                  v-model="checkList"
                  :options="[{value:isTogether? travellerObj.name:travellerObj.travellerId, label:travellerObj.name}]"
                >
                </mt-checklist>
                <div>
                  {{travellerObj.pNR}}
                </div>
              </div>
            </li>
          </ul>
          <div class="changeDate">
            <div class="til">Change to</div>
            <div class="form-group">
              <div class="departDate">
                <div v-html="changeModel[key].departDate || 'Depart On'" @click="openPicker(key)"></div>
              </div>
            </div>
            <div class="form-group">
              <input type="text" class="flightNo" v-model="changeModel[key].fno" placeholder="Flight Number">
            </div>
          </div>
        </div>
        <div class="fontSz12" v-if="isTogether" style="margin-bottom: 0.64rem;color:#999; text-align: left; padding: 0.64rem; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd">
          In this booking, the airline only allow to change round trip at same time.
        </div>
      </div>
      <div class="text">
        <div class="form-group">
          <textarea name="" id="" cols="30" rows="10" placeholder="Comments & Demands"></textarea>
        </div>
        <div class="tips flex content-end">
          <span>limit:300</span>
        </div>
      </div>
      <div class="button">
        <a @click="changeTrip()">Submit</a>
      </div>
    </div>
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
			<calendar :limit='limit' class="animated" v-if="showCalendar" @getVal="getVal"></calendar>
		</transition>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
				<div class="mark" style="z-index:18;top: 0; left:0" v-show="showCalendar"></div>
		</transition>
  </div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import flightInfo from './base/flightInfo.vue'
import { TimeFormatUtil, OrderStatusUtil } from './../../../models/utils'
import { Toast, Indicator,Checklist } from 'mint-ui'
import { User } from '../../../models/user'
import { DomainManager } from '../../../config/DomainManager'

export default {
  components: {
      headTop,
      flightInfo,
      Toast,
      calendar: () => import('components/calendar/calendar.vue'),
      [Checklist.name]: Checklist,
  },
  data() {
    return {
      limit: {
				minYear: new Date().getFullYear(),
				minMonth: new Date().getMonth() + 1,
				minDay: new Date().getDate(),
				maxYear: new Date().getFullYear() + 1
      },
      tripIndex: 0,
      isTogether:false,
      checkList: [],
      orders: [],
      changeModel:null,
      showCalendar:false,
    }
  },
  methods: {
    openPicker(key){
      this.tripIndex = key;
      this.showCalendar = true;
    },
    getVal(dateVal, showCalendar) {
			this.showCalendar = showCalendar;
			this.showmark = showCalendar;
			this.changeModel[this.tripIndex].departDate =  TimeFormatUtil.getYearMonthDateString(dateVal);
		},
    changeTrip() {
      let _this = this;
      let passengers = [];
      // let dates = [];
      if(this.isTogether){
        this.orders.forEach(trip => {
          trip.travellerinfo.forEach(tra =>{
            if(_this.checkList.indexOf(tra.name) > -1){
              passengers.push(tra.travellerId);
            }
          })
        })
      }else{
        passengers = this.checkList;
      }
      let trips = [];
      this.orders.forEach((trip, i) => {
        trip.travellerinfo.forEach(tra =>{
          if(passengers.indexOf(tra.travellerId) > -1){
            trips.push(i+1);
          }
        })
      });
      trips = [...new Set(trips)];
      // this.changeModel.forEach(v => {
      //    if(v.departDate !=''){
      //      dates.push(v.departDate);
      //    }
      // });
      
      if (this.checkList.length == 0) {
        Toast('Please select a passenger to change flight');
        return;
      } 
      let flag = true;
      trips.forEach(v => {
        this.changeModel.forEach(val => {
          if(val.tripType == v && !val.departDate){
            flag = false;
            return false;
          }
        })
      })
      if(!flag){
        Toast('Please choose the date');
        return false;
      }
      Indicator.open({ spinnerType: 'fading-circle' });
      let params = {};
      params.travellers = passengers.map(v => ({pId: v}));
      params.flights = this.changeModel.filter(v => !!v.departDate);
      this.$axios({
        url:'/heg_api/rebook/applyForRebookTogether.do',
        method: 'post',
        data:JSON.stringify(params),
        headers:{
          'Content-Type': 'application/json',
          }
      }).then(res => {
        if(res.succ){
          Indicator.close();
          Toast('success')
          this.$router.push('/trip');
        }else{
          Indicator.close();
          Toast(res.msg)
        }
      });
    }
  },
  mounted(){
    let tripId = this.orders[0].id;
    this.$axios.get('/heg_api/rebook/needRefundOrRebookTogether.do?tripId='+tripId).then(res => {
        this.isTogether = res.succ;
    });
  },
  created() {
    this.orders = JSON.parse(sessionStorage.getItem('orders'));
    this.changeModel = this.orders.map((v, i) => ({
      tripType: i +1,
      departDate: '',
      fno: '',
    }));
  }
}
</script>
<style lang="less" scoped>
.head {
    background: #0b9d78!important;
    .title {
        font-size: 0.768rem;
        color: #fff;
    }
    .sp {
        opacity: 0;
    }
}
.calendar-wrapper{
  top:0;
  left:0;
}
.container {
  overflow: auto;
  position: relative;
  .passengers {
    .circle{
      color:#0b9d78;
      border: 1px solid #0b9d78;
      width: 12px;
      height: 12px;
      border-radius: 10px;
      font-size: 11px;
      line-height: 13px;
    }
    .trips{
      margin-bottom: 15px;
    }
    .title {
      font-size: 0.597rem;
      line-height: 1.7rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
      padding: 0 0.64rem;
    }
    .nav {
      padding: 0 0.64rem;
      font-size: 14px;
      &>div{
        height: 40px;
        border-bottom: 1px solid #ddd;
      }
    }
    .listPassWrap{
      margin-bottom: 10px;
    }
    .passengersDetial {
      &>div{
        margin-bottom: 5px;
        padding: 0 0.64rem;
        height:35px;
        background-color: #fdf3ec;
        &.inactive{
          background-color:inherit;
          color: #999;
          input{
            display: none;
          }
        } 
      }
      .sp {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .changeDate {
    margin-bottom: 0.64rem;
    .til {
      font-size: 0.597rem;
      line-height: 1.7rem;
      text-align: left;
      margin: 0 0.64rem;
      border-top: 1px solid #ddd;
    }
    .form-group {
      margin: 0 0.64rem;
      border: 1px solid #999999;
      height: 1.92rem;
      margin-bottom: 10px;
      input.flightNo {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 1.92rem;
        box-sizing: border-box;
        padding: 0 0.314rem;
        font-size: 0.768rem;
      }
      .departDate {
        font-size: 0.768rem;
        position: relative;
        color: #777;
        display: block;
        width: 100%;
        line-height: 1.92rem;
        text-align: left;
        box-sizing: border-box;
        padding: 0 0.314rem;
        z-index: 9;
        input.departTime {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 1.92rem;
          box-sizing: border-box;
          padding: 0 0.314rem;
          opacity: 0;
        }
      }
      
    }
  }
  .text {
    margin-bottom: 0.64rem;
    .title {
      font-size: 0.597rem;
      line-height: 1.7rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
      padding: 0 0.64rem;
      margin-bottom: 0.64rem;
    }
    .form-group {
      margin: 0 0.64rem;
      textarea {
        border: 1px solid #999999;
        display: block;
        width: 98%;
        height: 100%;
        text-align: left;
      }
    }
    .tips {
      margin: 0.2rem 0.64rem;
      span {
        font-size: 0.512rem;
      }
    }
  }
  .button {
    margin-top: 1.7rem;
    margin-bottom: 2.7rem;
    a {
        margin: 0 auto;
        display: block;
        line-height: 1.7rem;
        width: 14.72rem;
        background: #ffad3d;
        color: #fff;
        font-size: 0.554rem;
        border-radius: 4px;
    }
  }
}
</style>
<style lang="less">
.passengers{
  .inactive{
    .mint-checkbox-core{
      visibility: hidden;
    }
    .mint-checkbox-label{
      color: #999 !important;
    }
  }
  .mint-checklist{
    .mint-checklist-title{
      margin:0;
    }
    .mint-cell{
      background: none;
      background-color: transparent;
      .mint-cell-wrapper{
        background:none;
      }
    }
    .mint-checklist-label{
      .mint-checkbox .mint-checkbox-core{
        border-radius:2px;
        width:15px;
        height:15px;
      }
      .mint-checkbox-input:checked + .mint-checkbox-core {
        background-color: #ed8649;
        border-color: #ed8649;
      }
      .mint-checkbox-core::after{
        width:3px;
        top:1px;
        left:0;
        right: 0;
        margin:auto;
      }
      .mint-checkbox-label{
        font-size: 15px;
        color: #666666;
      }
    }
  }
}
</style>
