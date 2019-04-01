<template>
  <div id="rank-activity">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title" style="margin-left:-1.5rem;">Referral Activity</p>
    </head-top>
    <div class="act-content">
      <div class="first">
        <img :src="downLoadImg" alt="">
        <a class="f-cover" v-show="isShowBtn" target="_blank" href="https://app.adjust.com/vbzvaj?campaign=M&adgroup=Ranking&creative=Online"></a>
      </div>
      <div class="second" v-show="isLogin">
        <div class="before-login" v-show="false">
          <div class="se-con">
            <span class="login" :class="{active:isSignIn}" @click="signIn">Sign&nbsp;in</span>
            <span class="or">or</span>
            <span class="login" :class="{active:isSignUp}" @click="signUp">Sign&nbsp;up</span>
          </div>
          <p class="or">Improve your ranking &amp; win the free air ticket rewards</p>
        </div>
        <div class="after-login" v-show="isLogin">
          <div class="logChild logChild1">
            <p class="logTop">MY&nbsp;Referred&nbsp;Registers</p>
            <p><span class="myOrder1" ref="myOrder1" :style="rankOrder[yourOrder].color">NO.{{registerRank.currentRank?registerRank.currentRank:"999+"}}</span><span class="midLine">/</span><span class="myOrder2">{{registerRank.quantity?registerRank.quantity:"0"}}</span></p>
          </div>
          <div class="logChild logChild2">
            <p class="logTop">MY&nbsp;Referred&nbsp;Bookings</p>
            <p><span class="myOrder1" ref="myOrder2" :style="rankOrder[yourOrder].color">NO.{{orderRank.currentRank?orderRank.currentRank:"999+"}}</span><span class="midLine">/</span><span class="myOrder2">{{orderRank.quantity?orderRank.quantity:"0"}}</span></p>
          </div>
        </div>
      </div>
      <div class="third">
        <div class="th-type">
          <p :class="{tActive:isRegister}" @click="register(1)">Registers</p>
          <p :class="{tActive:isOrders}" @click="register(2)">Orders</p>
        </div>
        <p class="th-time">Weekly data recording closes on every Sunday 23:59:59</p>
        <ul class="rank-list">
          <li v-for="(item,i) in lists" :key="i">
            <div v-if="i <= 2">
              <div class="left">
                <div class="icon"><img v-show="ranking" :src="rankOrder[i].Medal" alt="">
                </div>
                <div class="header-img">
                  <img :src="headImg1" alt="">
                </div>
              </div>
            </div>
            <div v-else>
              <div class="left">
                <div class="icon">
                  <span class="ranking" v-show="ranking">{{i+1}}</span>
                </div>
                <div class="header-img">
                  <img :src="headImg2" alt="">
                </div>
              </div>
            </div>
            <div class="right">
              <p class="userid">{{item.userName}}</p>
              <span>{{item.quantity}}</span>
            </div>
          </li>
        </ul>
      </div>
      <ul class="fourth">
        <li v-for="item in jumpLists" :key="item.id" @click="jumpPages(item.id)">
          <span>{{item.title}}</span><img :src="item.icon" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from '../../components/head/head.vue';
import { Toast, Indicator } from 'mint-ui';
import { DomainManager } from '../../config/DomainManager.js';
import { CookieUtil } from "../../models/utils";
import { AppBridge } from '../../models/appbridge/appbridge.js';
export default {
  components:{
    headTop
  },
  data () {
    return {
      isSignIn:true,
      isSignUp:false,
      isRegister:true,
      isOrders:false,
      ranking:true,
      isLogin:CookieUtil.hasItem("uuid"),
      isShowBtn:true,
      isApp:false,
      model:0,
      origin:'https://m.happyeasygo.com',
      lists:[],
      yourOrder:3,
      registerRank:{},
      orderRank:{},
      headImg1:require("../../assets/images/referralactivity/header-img.png"),
      headImg2:require("../../assets/images/referralactivity/header-img2.png"),
      downLoadImg:"",
      rankOrder:[
        {Medal:require('../../assets/images/referralactivity/rank-gold.png'),color:'color:#dc9841;'},
        {Medal:require('../../assets/images/referralactivity/rank-silver.png'),color:'color:#666666;'},
        {Medal:require('../../assets/images/referralactivity/rank-bronze.png'),color:'color:#c19d76;'},
        {Medal:'',color:'color:#999;'}
      ],
      jumpLists:[
        {id:0,title:'A list of historical winners.',icon:require('../../assets/images/referralactivity/lg-arrow.png')},
        {id:1,title:'Terms & Conditions',icon:require('../../assets/images/referralactivity/lg-arrow.png')},
        {id:2,title:'Referral Terms & Conditions',icon:require('../../assets/images/referralactivity/lg-arrow.png')},
      ],
    }
  },
  methods:{
    checkType() {
      let type = AppBridge.device;
      if(type == 1){
        this.model = 2;
      }else if(type == 2){
        this.model = 3;
      }else{
        this.model = 0;
      }
      this.getBanner();
    },
    getBanner(){
      let url = DomainManager.advList() +'?type=13&device='+this.model+'&addr=referralactivity&businessType=1'
      this.$axios.get(url).then(res =>{
        if(res.list.length >= 1){
          this.downLoadImg = res.list[0].landingPageUrl != "" || res.list[0].landingPageUrl != null ?res.list[0].landingPageUrl:"";
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    jumpPages(id){
      switch (id) {
        case 0:
        if(this.isApp){
          try {
            window.heg.createController('Winner Record',this.origin+'/referralwinner');
            window.heg.trackEvent('Refer_activity_histroy');
          } catch (error) {
            if(window.WebViewJavascriptBridge){
              this.$bridge.callhandler('createController',{title:'Winner Record',url:this.origin+'/referralwinner'});
            }
          }
        }else{
          this.$router.push('/referralwinner');
        }
        break;
        case 1:
        if(this.isApp){
          try {
            window.heg.createController('Details',this.origin+'/referraldetail');
            window.heg.trackEvent('Refer_activity_t&c');
          } catch (error) {
            if(window.WebViewJavascriptBridge){
              this.$bridge.callhandler('createController',{title:'Details',url:this.origin+'/referraldetail'});
            }
          }
        }else{
          this.$router.push('/referraldetail')
        }
        break;
        case 2:
        if(this.isApp){
          try {
            window.heg.createController('Details',this.origin+'/referral');
            window.heg.trackEvent('Refer_activity_referral_t&c');
          } catch (error) {
            if(window.WebViewJavascriptBridge){
              this.$bridge.callhandler('createController',{title:'Details',url:this.origin+'/referral'});
            }
          }
        }else{
          this.$router.push('/referral')
        }
        break;
        default:
        break;
      }
    },
    signIn(){
      this.isSignIn = true;
      this.isSignUp = false;
      AppBridge.nativeSignIn('in', this);
    },
    signUp(){
      this.isSignIn = false;
      this.isSignUp = true;
      AppBridge.nativeSignIn('up', this);
    },
    register(index){
      this.isRegister = index == 1;
      this.isOrders = !this.isRegister;
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      this.getRankInfo(index);
      let str = index == 1 ? 'Refer_activity_register' : 'Refer_activity_orders';
      try{
        window.heg.trackEvent(str);
      }catch(e){
        if(window.WebViewJavascriptBridge){
          this.$bridge.callhandler(str);
        }
      }
    },
    getRankOrderNumber(){
      let that = this
      let url = DomainManager.getReferRankWeekCurrent()
      this.$axios.get(url).then(res =>{
        if(res.succ){
           res.data.forEach((e,i)=>{
            if(e.type == 1){
              that.registerRank = e
              switch (that.registerRank.currentRank) {
                case 1:
                that.yourOrder = 0;
                break;
                case 2:
                that.yourOrder = 1;
                break;
                case 3:
                that.yourOrder = 2;
                break;
                default:
                that.yourOrder = 3;
                break;
              }
              if(Number(that.registerRank.currentRank)-999>0 || that.registerRank.currentRank == null){
                that.registerRank.currentRank = "999+"
              }
            }else if(e.type == 2){
              that.orderRank = e
              switch (that.orderRank.currentRank) {
                case 1:
                that.yourOrder = 0;
                break;
                case 2:
                that.yourOrder = 1;
                break;
                case 3:
                that.yourOrder = 2;
                break;
                default:
                that.yourOrder = 3;
                break;
              }
              if(Number(that.orderRank.currentRank)-999>0 || that.orderRank.currentRank == null){
                that.orderRank.currentRank = "999+"
              }
            }
          })
        }else{
          Toast({
            message:res.data.msg,
            position:"center",
            duration:1500
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getRankInfo(type){
      let that = this;
      let url = DomainManager.getReferRankWeekNow();
      this.$axios.get(url).then(res =>{
        if(res.succ){
          Indicator.close();
          if(type == 1){
            this.lists = res.data.register
          }else if(type == 2){
            this.lists = res.data.order
          }
        }else{
          Indicator.close();
          Toast({
            message:res.msg,
            position:"center",
            duration:1500
          })
        }
      }).catch(err => {
        Indicator.close();
        console.log(err)
      })
    }
  },
  async created(){
    this.contentMargin = await AppBridge.getNativeSource(this);
    this.isApp = !this.contentMargin;
    let id = await AppBridge.getNativeUuid(this);
    window.onReceviedUuid = this.onReceviedUuid;
    if(id){
      CookieUtil.removeItem("uuid");
      CookieUtil.setItem("uuid",id);
      this.isLogin = true;
    }
    this.checkType();
    this.getRankInfo(1);
    if(this.isLogin){
      this.getRankOrderNumber();
    }
  }
}
</script>
<style lang="less" scoped>
#rank-activity{
  height:auto;
  padding-bottom: 1.6rem;
  .header {
    position: static!important;
    background: #0b9d78;
    i {
      padding: 0 0.64rem;
    }
  }
  .first{
    font-size: 0;
    position: relative;
    height:225px;
    img{
      width: 100%;
      height:100%;
    }
    .f-cover{
      position: absolute;
      width: 100%;
      height:100%;
      top: 0;
      left: 0;
    }
  }
  .second{
    padding:0.88rem 0.55rem;
    // border:1px solid #ddd;
    // border-left:1px solid #ddd;
    border-bottom:1px solid #ddd;
    border-radius:3px;
    height:2.4rem;
    .before-login{
      .se-con{
        margin-bottom:0.55rem;
        .login{
          font-size:14px;
          color:#ffad3d;
          padding:0.33rem 1.5rem;
          background:#fff;
          border:1px solid #ffad3d;
          border-radius:5px;
        }
        .active{
          color:#fff;
          background:#ffad3d;
        }
      }
      .or{
        font-size:12px;
        color:#111;
        margin: 0 0.44rem;
      }
    }
    .after-login{
      display:flex;
      justify-content: space-between;
      align-items: center;
      .logChild1{
        border-right:1px solid #f5aaaa;
        .myOrder1,{
          font-weight: bold;
        }
      }
      .logChild{
         flex:1;
         .logTop{
           font-size: 12px;
           color:#111;
           padding-bottom:0.66rem;
         }
         .midLine{
           color:#000;
           font-size: 28px;
           margin: 0 0.3rem;
         }
         .myOrder1{
           font-size: 25px;
         }
         .myOrder2{
           font-size: 25px;
         }
      }
      .logChild2{
        .myOrder1,{
          font-weight: bold;
        }
      }
    }
  }
  .third{
    padding:0 0.55rem;
    .th-type{
      display: flex;
      justify-content: space-around;
      align-items: center;
      p{
        width: 50%;
        font-size: 12px;
        color:#999;
        border-bottom:2px solid #ddd;
        padding:0.44rem 0;
      }
      .tActive{
        color:#ffad3d;
        border-bottom:2px solid #ffad3d;
      }
    }
    .th-time{
      color:#df5663;
      padding:0.44rem 0;
      font-size:10px;
    }
    .rank-list{
      border:1px solid #eee;
      border-radius:3px;
      li {
        height:3.1rem;
        display:flex;
        justify-content: space-between;
        align-items:center;
        border-radius:3px;
        .left{
          display:flex;
          align-items:center;
          padding-left:1.1rem;
          .icon{
            font-size: 0;
            img{
              width: 0.9rem;
              height:1.11rem;
            }
            .ranking{
              width: 0.9rem;
              font-size: 14px;
              color:#999;
              text-align: center;
            }
          }
          .header-img{
            width: 1.44rem;
            height:1.44rem;
            font-size: 0;
            border-radius: 50%;
            background:#fff;
            margin:0 0.66rem 0 1.11rem;
            img{
              width: 100%;
              height:100%;
            }
          } 
        }
        .right{
          width: 60%;
          height: 100%;
          padding-right:0.77rem;
          border-bottom:1px solid #eee;
          display:flex;
          justify-content: space-between;
          align-items:center;
          .userid{
            display: inline-block;
            color:#111;
            font-size:14px;
            width: 80%;
            line-height: 1rem;
            text-align: left;
            word-break:break-all;  
            word-wrap:break-word;
            white-space: pre-wrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          span{
            width: 25px;
            text-align: center;
            color:#111;
            font-size: 18px;
          }
        }
      }
      li:nth-child(1){
        margin-bottom:0.44rem;
        background:linear-gradient(left,#f7c141,#ffe222);
        .right{
          border-bottom:none;
        }
      }
      li:nth-child(2){
        margin-bottom:0.44rem;
        background:linear-gradient(left,#999999,#dddddd);
        .right{
          border-bottom:none;
        }
      }
      li:nth-child(3){
        margin-bottom:0.44rem;
        background:linear-gradient(left,#c8a67a,#e6d0b3);
        .right{
          border-bottom:none;
        }
      }
      li:last-child{
        margin-bottom: 0;
      }
    }
  }
  .fourth{
    padding:0.66rem 1rem 0;
    li{
      display:flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color:#666;
      border-bottom:1px solid #eee;
      padding:0.66rem 0.3rem;
      img{
        width:0.3rem;
      }
    }
  }
}
</style>
