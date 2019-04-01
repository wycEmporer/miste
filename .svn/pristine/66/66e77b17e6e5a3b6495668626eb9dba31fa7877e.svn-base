<template>
  <div class="query-form">
    <div class="query-title flex space-between align-items-center">
      <div class="flex align-items-center" :class="{'title-active':showFlight}" @click="switchTitle(1)">
        <img v-if="showFlight" :src="require('./images/icon_flight2.png')" alt="">
        <img v-else :src="require('./images/icon_flight1.png')" alt="">
        Flight Booking</div>
      <div class="flex align-items-center" :class="{'title-active':showHotel}" @click="switchTitle(2)">
        <img v-if="showHotel" :src="require('./images/icon_hotel2.png')" alt=""> 
        <img v-else :src="require('./images/icon_hotel1.png')" alt=""> 
        Hotel Booking</div>
    </div>
    <div v-show="showFlight">
      <div class="query-form-order">
        <input class="query-form-order_input" type="text" v-model="mobile.orderId" placeholder="PNR / Order id / Trip ID">
        <span></span>
      </div>
      <div class="query-form-phone">
        <div class="query-form-phone_group">
          <div class="query-form-select">
            <select v-model="mobile.code">
              <option :value="item.regionCode" v-for="(item, key) in codeList" :key="key">
                {{item.countryName + ' (+' + item.regionCode + ')'}}
              </option>
            </select>
            <span class="query-form-select_text">
              {{'+' + mobile.code}}
            </span>
          </div>
          <i class="iconfont icon-back"></i>
          <input class="query-form-phone_input" type="Number" placeholder="Contact Mobile Number" v-model="mobile.phoneNo">
        </div>
        <span></span>
      </div>
    </div>
    <div v-show="showHotel">
      <div class="query-form-order">
        <input class="query-form-order_input" type="text" v-model="hotel.orderId" placeholder="Confirm Number / Order ID">
        <span></span>
      </div>
      <div class="query-form-phone">
        <div class="query-form-phone_group">
          <div class="query-form-select">
            <select v-model="hotel.code">
              <option :value="item.regionCode" v-for="(item, key) in codeList" :key="key">
                {{item.countryName + ' (+' + item.regionCode + ')'}}
              </option>
            </select>
            <span class="query-form-select_text">
              {{'+' + hotel.code}}
            </span>
          </div>
          <i class="iconfont icon-back"></i>
          <input class="query-form-phone_input" type="Number" placeholder="Contact Mobile Number" v-model="hotel.phoneNo">
        </div>
        <span></span>
      </div>
    </div>
    <button class="query-form-btn" v-show="showFlight" :class="{active:mobile.isBtnActive}" :disabled="!mobile.isBtnActive" @click="submit(1, mobile)">View Your Flights</button>
    <button class="query-form-btn" v-show="showHotel" :class="{active:hotel.isBtnActive}" :disabled="!hotel.isBtnActive" @click="submit(2, hotel)">View Your Hotels</button>
    <div class="query-form-link-detail" v-show="showFlight" @click="queryTrip(1)">Forget your PNR / Trip ID ? Find your trips  here!</div>
    <div class="query-form-link-detail" v-show="showHotel" @click="queryTrip(2)">Forget your Confirm No / Order ID ? Find your hotels  here!</div>
    <div class="query-error-info" v-if="showFlight && showNullF && query_error_msg">{{query_error_msg}}</div>
    <div class="query-error-info" v-if="showHotel && showNullH && query_error_msg">{{query_error_msg}}</div>
  </div>
</template>
<script>
import { User } from 'models/user/User.js';
import {Reg} from 'models/utils/Reg.js';
import { Toast } from 'mint-ui';
import {CookieUtil} from 'models/utils';

export default {
  props:{
    query_error_msg:String,
    tripType: Number
  },
  data(){
    return {
      showFlight:true,
      showHotel:false,
      showNullF:false,
      showNullH:false,
      mobile: {
        orderId:'',
        code:'91',
        phoneNo:'',
        isBtnActive: false,
      },
      hotel:{
        orderId:'',
        code:'91',
        phoneNo:'',
        isBtnActive: false,
      },
      codeList:null,
    }
  },
  watch:{
    tripType(val){
      if(val == 1){
        this.showNullF = true;
      }else{
        this.showNullH = true;
      }
    },
    mobile:{
      handler:function(val, oldVal){
        if(this.mobile.orderId.length >0 && this.mobile.phoneNo.length> 0){
          this.mobile.isBtnActive = true;
        }else{
          this.mobile.isBtnActive = false;
        }
        if(this.mobile.orderId == '' || this.mobile.phoneNo == ''){
          // this.showNullF = false;
        }
      },  
      deep:true,
    },
    hotel:{
      handler:function(val, oldVal){
        if(this.hotel.orderId.length >0 && this.hotel.phoneNo.length> 0){
        this.hotel.isBtnActive = true;
        }else{
          this.hotel.isBtnActive = false;
        }
        if(this.hotel.orderId == '' || this.hotel.phoneNo == ''){
          // this.showNullH = false;
        }
      },  
      deep:true,
    }
  },
  methods:{
    switchTitle(who){
      if(who == 1){
        this.showFlight = true;
        this.showHotel = false;
      }else{
        this.showFlight = false;
        this.showHotel = true;
      }
    },
    submit(who, data){
      if(!Reg.contactPhone.test(data.phoneNo) || 
        (data.code == '91' && String(data.phoneNo).length != 10) || 
        (data.code == '86' && String(data.phoneNo).length != 11)
      ){
        Toast({
          message: 'Please enter a valid mobile number.',
          duration: 1200
        })
        return;
      }
      this.$emit('getSeachParams', data, who);
    },
    queryTrip(who){
      if(CookieUtil.hasItem('uuid')){
        if(who == 1){
          this.$router.push('/trip');
        }else{
          this.$router.push('/hotel_order');
        }
      }else{
        if(who == 1){
          this.$router.push('/search');
        }else{
          this.$router.push('/hotel_order/search');
        }
      }
      
    }
  },
  created(){
    User.findSms(this).then(res => {
			this.codeList = res.list;
		});
  }
}
</script>
<style lang="less" scoped>
  div, input{
    box-sizing: border-box;
  }
  .query-title{
    width:100%;
    padding-bottom: 15px;
    div{
      flex:1;
      font-size: 12px;
      color: #666666;
      text-align: center;
      background: #f6f6f6;
      padding:9px;
      justify-content: center;
      cursor: pointer;
    }
    img{
      width:0.64rem;
      margin-right: 0.3rem;
      vertical-align: middle;
    }
    .title-active{background: #fff;color:#0B9D78;}
  }
  .query-form{
    width: 345px;
    display:flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    border:1px solid #dcdcdc;
    margin: 15px auto 0;
    background-color:#fff;
  }
  .query-form-order,.query-form-phone{
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
  .query-form-phone{
    margin-bottom: 20px;
  }

  .query-form-phone_group{
    width: 320px;
    display:flex;
    color: #999;
    line-height: 45px;
    border-radius: 2px;
    border:1px solid #dcdcdc;
    i{
      display: block;
      transform: rotate(-90deg);
    }
  }
  .query-form-phone_input{
    // width: 320px;
    font-size: 14px;
    height: 45px;
    padding-left: 0.5rem;
  }
  .query-form-order_input{
    width: 320px;
    height: 45px;
    font-size: 14px;
    padding-left: 10px;
    color: #333;
    line-height: 45px;
    border-radius: 2px;
    border:1px solid #dcdcdc;
  }
  .query-form-select{
    position: relative;
    width: 60px;
    select{
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 9;
    }
  }
  .query-form-select_text{
    position:absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #333;
  }
  .query-form-btn{
    width: 270px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    background-color: #dcdcdc;
    margin-bottom: 10px;
    &.active{
      background-color: #FFAD3D;
    }
  }
  .query-form-link-detail{
    font-size: 12px;
    color: #666;
    margin-bottom: 10px;
    border-bottom: 1px solid #cdcdcd;
  }
  .query-error-info{
    color:#999;
    font-size: 12px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>

