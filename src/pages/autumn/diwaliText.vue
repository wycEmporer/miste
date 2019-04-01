<template>
  <div id="heg-diwali">
    <head-top>
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title" style="margin-right:1.5rem">Diwali Text</p>
    </head-top>
    <div class="content">
      <div class="top-banner">
        <img :src="mUrl" alt="">
        <div class="top-cover">
            <p v-if="startOrEnd == 'start'">Campaign Starts In :{{saleTime}} </p>
            <p v-else-if="startOrEnd == 'in'">Campaign is live ! </p>
            <p v-else-if="startOrEnd == 'end'">Campaign Ends {{saleTime}} </p>
            <p v-else-if="startOrEnd == 'ends'">Campaign Ends</p>
            <p>Oct 19th,00:00:00 -- Nov 10th,23:59:59</p>
        </div>
      </div>
      <div class="title">ON DOMESTIC &amp; INTERNATIONAL FLIGHTS</div>
      <div class="con_box1">
        <div class="con">
          <div class="con-left">
            <img class="img_mobile" :src="imgUrl.mobile" alt="">
            <p>Discount on App</p>
            <a href="https://app.adjust.com/xmfxff?campaign=Dussehra0930&adgroup=PC&creative=Download" class="img_app"><img :src="imgUrl.app" alt=""></a>
            <a href="https://app.adjust.com/xmfxff?campaign=Dussehra0930&adgroup=PC&creative=Download" class="img_google"><img :src="imgUrl.google" alt=""></a>
            <p>Download</p>
            <p>our mobile App</p>
          </div>
          <div class="con-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from '../../components/head/head'
import { User } from '../../models/user';
export default {
  name:'diwaliText',
  components:{
    headTop
  },
  data(){
    return {
      isShowBtn : true,
      mUrl : '',
      model : 0,
      startOrEnd :'',
      saleTime : '',
      imgUrl :{
        mobile: require('../../assets/images/autumn/diwali-copy-mobile.png'),
        pc : require('../../assets/images/autumn/diwali-copy-pc.png'),
        app:require('../../assets/images/autumn/icon_appstore.png'),
        google:require('../../assets/images/autumn/icon_google.png'),
      }
    }
  },
  
  methods:{
    getImg (){
      let parmTop = 'type=13&device=' + this.model + '&addr=diwali-dhamaka-sale&businessType=1';
      User.advList(this, parmTop).then(res => {
        this.mUrl = res.list[0].landingPageUrl;
      })
    },
    datetime_to_unix(who) {
      let data = new Date(Date.parse(who.replace(/-/g, '/'))).getTime();
      return parseInt(data/1000)
    },
    getGMTtime() {
      let d = new Date();
      let localTime = d.getTime();
      let localOffset = d.getTimezoneOffset() * 60000;
      let utc = localTime + localOffset;
      let offset = 5.5;
      let bomday = utc + (3600000*offset);
      return parseInt(bomday/1000);
    },
    GetRTime () {
      let cha_timestamp;
      let timestamp = this.getGMTtime();
      let timestamp_set0 = this.datetime_to_unix('2018-10-19 00:00:00');
      let timestamp_set2 = this.datetime_to_unix('2018-11-01 00:00:00');
      let timestamp_set3 = this.datetime_to_unix('2018-11-01 11:57:30');
      let cha_timestamp0 = timestamp_set0-timestamp;
      let cha_timestamp2 = timestamp_set2-timestamp;
      let cha_timestamp3 = timestamp_set3-timestamp;
      if(cha_timestamp0 <= 0) {
        this.startOrEnd = 'in';
        if(cha_timestamp2 <= 0){
          this.startOrEnd = 'end';
          cha_timestamp = cha_timestamp3;
          if(cha_timestamp <= 0){
            cha_timestamp = 0;
            this.startOrEnd = 'ends';
            clearTimeout(this.timer);
          }
        }
      } else {
        this.startOrEnd = "start";
        cha_timestamp = cha_timestamp0;
      } 
      var sy_day = parseInt(cha_timestamp/(3600*24));
      var sy_day2 = sy_day > 9 ? sy_day : '0' + sy_day;
      var sy_hour = parseInt((cha_timestamp-sy_day*3600*24)/3600);
      var sy2_hour = sy_hour > 9 ? sy_hour: '0' + sy_hour;
      var sy_min = parseInt((cha_timestamp - sy_hour*3600 - sy_day*24*3600)/60);
      var sy2_min = sy_min > 9 ? sy_min: '0' + sy_min;
      var sy_miao = cha_timestamp-sy_day*3600*24-sy_hour*3600-sy_min*60;
      var sy2_miao = sy_miao > 9 ? sy_miao : '0' + sy_miao;

      this.saleTime = sy_day2 + 'd:' + sy2_hour + 'h:' + sy2_min + 'm:' + sy2_miao +'s';
      this.timer = setTimeout(this.GetRTime, 1000);
    }
  },
  async created () {
    this.getImg();
    this.GetRTime();
  },
}
</script>

<style lang='less'>
.content{
  .top-banner{
    margin-top: 2.04rem;
    width: 100%;
    /* background: red; */
    position: relative;
    img{
      width: 100%;
    }
    .top-cover{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background:rgba(0,0,0,0.65);
      color: white;
      padding: 10px 0;
      p{
        font-size: 22px;
        line-height: 30px;
        &:last-child{
          font-size: 14px;
        }
      }
    }
  }
  .title{
    height: 2.13rem;
    line-height: 2.13rem;
    font-size: 0.25rem;
    position: relative;
    font-style: italic;
    &::before{
      content: '';
      width: 40px;
      height: 0;
      border-bottom:1px solid #cdcdcd;
      position: absolute;
      left: 15px;
      top: 23px; 
    }
    &::after{
      content: '';
      width: 40px;
      height: 0;
      border-bottom:1px solid #cdcdcd;
      position: absolute;
      right: 15px;
      top: 23px; 
    }
  }
  .con_box1{
    width: 100%;
    height: 250px;
    padding: 0 15px;
    box-sizing: border-box;
    .con{
      width: 100%;
      height: 100%;
      background: url('../../assets/images/autumn/diwali-copy-bg.png') no-repeat;
      background-size: 100%;
      .con-left{
        width: 40%;
        height: 100%;
        float: left;
        .img_mobile{
          width: 40px;
          margin-top: 20px;
        }
        .img_app,
        .img_google{
          width: 100px;
          margin-top: 5px;
          img{
            width: 100%;
          }
        }
        p{
          font-size: 14px;
          line-height: 20px;
        }
      }
      .con-right{
        width: 60%;
        height: 100%;
        background: blue;
        float: right;
      }
    }
  }
}
  
</style>
