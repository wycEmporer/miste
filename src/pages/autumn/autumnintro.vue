<template>
  <div id="heg-autumnintro">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title" style="margin-left:-1.5rem;">Amazing Prizes</p>
    </head-top>
    <div class="content">
      <div class="appTop" v-if="isShowBtn"></div>
      <ul class="prize-intro">
        <li v-for="(item,index) in lists" :key="index" v-if="(item.category == 2 && item.value == 1000) || item.category == 1 ">
          <div class="item-icon">
            <img :src="item.winImg" alt="">
            <i class="iconfont icon-emptydown" :class="{isfold:item.flag}" @click="openDetail(index)"></i>
          </div> 
          <div class="item-detail" :class="{hasDetail:item.introduction}" v-show="item.flag" >
            <p class="item-title">{{item.name}}</p>
            <div v-html="item.introduction" >{{item.introduction}}</div>
            <div v-html="item.tC">{{item.tC}}</div>
            <p class="item-title">Steps to Redeem</p>
            <div v-html="item.useMethod">{{item.useMethod}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from '../../components/head/head.vue';
import { Toast, Indicator } from 'mint-ui';
import { DomainManager } from '../../config/DomainManager';
import {AppBridge} from '../../models/appbridge/appbridge.js';
export default {
  components:{
    headTop,
  },
  data(){
    return{
      lists:[],
      isShowBtn:false,
    }
  },
  async created() {
    this.isShowBtn = await AppBridge.getNativeSource(this);
    this.getPrizeList();
    
  },
  methods:{
    openDetail(who){
      this.lists.forEach((e,i)=>{
        if(who == i){
          this.lists[who].flag = !this.lists[who].flag;
        }else{
          this.lists[i].flag = false;
        }
      })
    },
    getPrizeList(){
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      let url = DomainManager.getPrizeList();
      this.$axios.get(url).then(res=>{
        Indicator.close();
        if(res.succ){
          this.lists = res.data;
          this.lists.forEach((e,i)=>{
            this.$set(this.lists[i],"flag",false);
            // this.$set(this.lists[0],"flag",true);
          });
        }else{
          Toast(res.msg);
        }
      }).catch(err=>{
        Indicator.close();
        console.log(err);
      })
    }
  }
}
</script>
<style lang="less" scoped>
#heg-autumnintro{
  img{vertical-align: top}
  a,button{cursor: pointer;}
  .appTop{padding-top:2.04rem;}
  .content{
    text-align:left;
  }
  .prize-intro{
    padding:0.64rem;
    li{
      background: #FAFAFA;
      margin-bottom:0.64rem;
    }
    .item-icon{
      margin-bottom:0.64rem;
      position: relative;
      img{width:100%;}
      i{
        width:95%;
        height:1.5rem;
        line-height:1.5rem;
        text-align:right;
        position: absolute;
        bottom: 0;
        right: 8px;
        color:#fff;
        font-size:0.7rem;
      }
      .isfold{
        transform:rotateX(180deg);
      }
    }
    .item-detail{
      font-size: 0.512rem;
      color: #111111;
      letter-spacing: 0;
      line-height: 1rem;
      .item-title{
        font-size: 0.512rem;
        color: #111111;
        letter-spacing: 0;
        line-height: 0.7rem;
        font-weight: bold;
        padding:0.3rem 0;
      }
      div{
        margin-left:0.2rem;
        a{
          color:#0b9d78 !important;
          display:inline-block !important;
        }
      }
    }
    .hasDetail{padding-bottom:0.32rem;}
  }
}
</style>
