<template>
  <div id="share-part1">
    <div class="share-title flex">
      <div>
        <span @click="switchGoing" :class="{active:clickGoing}">Ongoing</span>
        <p :class="{activeP:clickGoing}"></p>
      </div>
      <div>
        <span @click="switchPast" :class="{active:clickPast}">Past</span>
        <p :class="{activeP:clickPast}"></p>
      </div>
    </div>
    <div v-show="clickGoing">
      <ul class="share-list" v-if="goingLists.length >= 1">
        <li v-for="(item,index) in goingLists" :key="index">
          <div class="list-top flex space-between">
            <div class="list-top-left flex align-items-center">
              <img :src="imgGroups.gold" alt="">
              <p class="left-p1"><span class="rs">Rs</span>{{item.obtainAmount}}</p>
              <p class="left-p2">/ <span class="rs">Rs</span>{{item.totalAmount}}</p>
            </div>
            <div class="list-top-right flex align-items-center" @click="jumpGrabActivity(item.juid)">
              <img :src="imgGroups.clock" alt="">
              <p>{{item.time}}</p>
              <i class="iconfont icon-emptydown"></i>
            </div>
          </div>
          <div class="list-center">
            <mt-progress :value="item.rate" :bar-height="8.5"></mt-progress>
          </div>
          <div class="list-center2 flex space-between">
            <p>Invited {{item.obtainNum}}</p>
            <p>Total {{item.totalNum}}</p>
          </div>
          <div class="list-bottom">
            <button @click="ShareHref(index)">Share for Grabbing</button>
          </div>
        </li>
      </ul>
      <div class="share-record" v-if="noRecord1">
        <img :src="imgGroups.noRecord_ongoing" alt="">
        <p>After Payment,Get Your Rewards Here </p>
        <a class="bookBtn" @click="bookNowBtn">Book Now</a>
      </div>
    </div>
    <div v-show="clickPast">
      <ul class="share-list" v-if="pastList.length >= 1">
        <li class="flex space-between align-items-center" style="padding:0.556rem 0.427rem;"
        v-for="(item,index) in pastList" :key="index" @click="jumpGrabActivity(item.juid)">
          <div class="past-left">
            <p>{{item.obtainNum}} Friends</p>
            <p>{{item.time}}</p>
          </div>
          <div class="past-right">
            <span class="rs">Rs</span>{{item.obtainAmount}}
            <p>been grabbed</p>
          </div>
        </li>
      </ul>
      <div class="share-record" v-if="noRecord2">
        <img :src="imgGroups.noRecord_past" alt="">
        <p>No record found</p>
      </div>
    </div>
    
  </div>
</template>
<script>
import { Toast, Indicator, Progress } from 'mint-ui';
import { AppBridge } from '../../../models/appbridge/appbridge.js';
export default {
  components:{
    "mt-progress":Progress
  },
  props:{
    isLogin:{
      type: Boolean
    },
    goingList:{
      type: Array,
      default:[]
    },
    pastList:{
      type: Array,
      default:[]
    },
    noRecord1:{
      type: Boolean,
    },
    noRecord2:{
      type: Boolean,
    },
  },
  data(){
    return {
      clickGoing:true,
      clickPast:false,
      goingLists:[],
      imgGroups:{
        gold:require('../../../assets/images/grabcashback/grab_activity_gold.png'),
        clock:require('../../../assets/images/grabcashback/grab_activity_clock.png'),
        noRecord_ongoing:require('../../../assets/images/grabcashback/gift.png'),
        noRecord_past:require('../../../assets/images/grabcashback/past.png'),
      }
    }
  },
  watch:{
    goingList(val){
      if(val){
        this.goingLists = val;
      }
    }
  },
  methods:{
    switchGoing(){
      this.clickGoing = true;
      this.clickPast = false;
    },
    bookNowBtn(){
      try {
        window.heg.trackEvent("AC_Grab_Offer_Booknow");
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler("trackEvent","AC_Grab_Offer_Booknow");
        }
      }
      AppBridge.goHomePage(this);
    },
    switchPast(){
      this.clickGoing = false;
      this.clickPast = true;
    },
    jumpGrabActivity(id){
      try {
        window.heg.trackEvent("AC_Grab_landing_details");
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler("trackEvent","AC_Grab_landing_details");
        }
      }
      this.$router.push({path:'/grab-activity',query:{orderId:id}});
    },
    ShareHref(index){
      try {
        window.heg.trackEvent("AC_Grab_landing_Invite");
        if(window.heg.showShareView){
          let obj = {
            SMS:this.goingList[index].message,
            WhatsApp:this.goingList[index].message,
            Messenger:this.goingList[index].message,
            More:this.goingList[index].message
          };
          AppBridge.showShareView(obj,this);
        }else{
          this.$emit('upapp');
        }
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler("trackEvent","AC_Grab_landing_Invite");
          if(this.$bridge.WebViewBridge.indexOf("showShareView") > -1){
            let obj = {
              SMS:this.goingList[index].message,
              WhatsApp:this.goingList[index].message,
              Messenger:this.goingList[index].message,
              More:this.goingList[index].message
            };
            AppBridge.showShareView(obj,this);
          }else{
            this.$emit('upapp');
          }
        }
      }
    },
  },
}
</script>
<style lang="less">
#share-part1{
  .list-center{
    .mt-progress-runway,.mt-progress-progress{
      border-radius:5px;
    }
    .mt-progress-progress{
      background: #252B67;
    }
  }
} 
</style>
<style lang="less" scoped>
#share-part1{
  padding:0 0.64rem 0.64rem;
  background: #eee;
  .share-title{
    div{flex:1;}
    span{
      display:block;
      width:2.858rem;
      margin:auto;
      line-height:0.854rem;
      font-size: 0.726rem;
      color: #333;
      opacity: 0.6;
      padding:0 0 0.2rem;
      font-weight: bold;
    }
    p{
      width:2.858rem;
      height:2.5px;
      border-radius:2px;
      background:transparent;
      margin:0 auto 0.427rem;
    }
    .active{
      opacity: 1;
    }
    .activeP{
      background:#333;
    }
  }

  .share-list{
    li{
      margin-bottom: 0.64rem;
      padding:0.427rem;
      background: #fff;
      box-shadow: 0 3px 4px 0 rgba(8,25,51,0.20);
      border-radius: 4px;
      .list-top{
        padding:0.2rem 0;
        .list-top-left{
          img{
            width:0.747rem;
            height: 0.807rem;
          }
          .left-p1{
            font-size:1.108rem;
            color:#252B67;
            font-weight: bold;
            margin:0 0.3rem 0 0.427rem;
          }
          .left-p2{
            font-size:0.641rem;
            color:#252B67;
          }
        }
        .list-top-right{
          img{
            width:0.47rem;
            height: 0.47rem;
          }
          p{
            font-size:0.47rem;
            color:#999;
            margin:0 0.2rem;
          }
          .icon-emptydown{
            font-size: 0.47rem;
            color:#999;
            transform: rotate(-90deg);
          }
        }
      }
      .list-center2{
        margin:0.2rem 0 0.64rem;
        p{
          opacity: 0.8;
          font-size: 0.512rem;
          color: #666666;
        }
      }
      .list-bottom{
        button{
          width:13.24rem;
          height:1.282rem;
          font-size: 0.686rem;
          color: #fff;
          background: #F7BC21;
          border-radius: 0.64rem;
        }
      }

      .past-left{
        text-align:left;
        p:first-child{
          font-size: 0.726rem;
          color: #333333;
          font-family: "SFCompactText-Regular";
        }
        p:last-child{
          font-size: 0.512rem;
          color: #999999;
          margin-top: 0.4rem;
        }
      }
      .past-right{
        font-size:0.894rem;
        color: #252B67;
        font-weight: bold;
        text-align:right;
        span{font-weight: bold;}
        margin-right: 0.5rem;
        p{
          margin-top: 0.4rem;
          font-size: 0.512rem;
        }
      }
    }
  }
  .bookBtn{
    width:4.27rem;
    height:1.068rem;
    line-height:1.068rem;
    font-size:0.556rem;
    color:#fff;
    text-align: center;
    font-weight: bold;
    background: #FFAD3D;
    border-radius: 2px;
    margin-top: 15px;
  }
  .share-record{
    img{
      width:4.27rem;
      margin: 1.9rem 0 0.64rem;
    }
    p{
      font-size: 0.512rem;
      color: #999999;
      letter-spacing:1px;
    }
  }
}
</style>
