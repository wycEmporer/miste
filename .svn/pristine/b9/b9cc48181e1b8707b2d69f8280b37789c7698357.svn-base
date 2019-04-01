<template>
	<div id="heg-support">
		<head-top class='header'>
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" class="title">Support</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="martop"></div>
      <div class="top-img">
        <img :src="require('../../assets/images/support/s_top_img.png')" alt="">
      </div>
      
        <QueryOrderSummary @isShowus="isShowus"/>
      
      <div class="section1">
        <h5>Topics</h5>
        <div class="fi-title">
          <div class="se-level bgfff" v-for="(item, index) in list" :key="index">
            <h6 class="se-title" :class="{'h6-active':item.flag}" @click="fiLevelClick(index)">{{item.class}}</h6>
            <div v-for="(item1, i1) in item.node" :key="i1" v-show="item.flag">
              <div class="se-title1 flex space-between" @click.stop="seLevelClick(index, i1)">
                <h6>{{item1.class}}</h6>
                <i class="iconfont icon-emptydown" :class="{'se-fold':item1.flag}"></i>
              </div>
              <ul class="th-detail bgfff" v-show="item1.flag">
                <li v-for="(it, i2) in item1.node" :key="i2">
                  <p class="th-title" @click.stop="thLevelClick(index, i1, i2)">{{it.class}}</p>
                  <div class="th-text" v-show="it.flag" v-for="(it2, j) in it.content" :key="j" >
                    <p v-html="it2.content">{{it2.content}}</p>
                    <div class="th-btn flex align-items-center">
                      <button :class="{'p1-active':it.clickHelpful}" :disabled="it.clickHelpful || it.clickNotHelpful" @click="isClickBtn('help', it)"><img :src="it.helpImg" alt="">Helpful</button>
                      <button :class="{'p2-active':it.clickNotHelpful}" :disabled="it.clickHelpful || it.clickNotHelpful" @click="isClickBtn('not', it)"><img :src="it.notHelpImg" alt="">Not Helpful</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="section2">
        <!-- <h5>Write To Us</h5>
        <div class="bgfff s2-content">
          <img :src="require('../../assets/images/support/icon_write.png')" alt="">
          <p>If there are any other needs,We do our best</p>
          <p>service to you.</p>
          <button @click="$router.push('/write-to-us')">Write To Us</button>
        </div> -->
      </div>
      <div class="section3">
        <h5>You Could Also</h5>
        <div class="bgfff flex space-between align-items-center">
          <p>Contact Us</p>
          <a href="mailto:cs@happyeasygo.com">cs@happyeasygo.com</a>
        </div>

          <div v-if="isshow" class="bgfff flex space-between align-items-center">
              <p>Call Us</p>
              <a href="tel:0124-640-9960">0124-640-9960</a>
          </div>
      </div>
      <div class="section4 flex space-between align-items-center"  @click="$router.push('/feedback')">
        <h5>Feedback</h5>
        <i class="iconfont icon-emptydown"></i>
      </div>
		</div>
    <Chat/>
	</div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import { DomainManager } from "../../config/DomainManager.js";
import { User } from "../../models/user";
import { Toast, Indicator } from "mint-ui";
import { CookieUtil } from '../../models/utils';
import Chat from 'components/chat/Chat';
import QueryOrderSummary from 'components/query-order-summary/index';

export default {
  components: {
    headTop,
    Chat,
    QueryOrderSummary
  },
  data() {
    return {
        isshow:false,
      list:[],
      mobile:'',
      isLogin: CookieUtil.hasItem('uuid')
    };
  },
  methods: {

      isShowus(data){
        this.isshow=data;

      },

    isClickBtn(who, obj){
      let data;
      if(who == 'help'){
        obj.clickHelpful = true;
        obj.helpImg = require('../../assets/images/support/icon_right_w.png');
        data = {
          contentMangementId: obj.cid,
          isHelpful: true,
        };
      }else if(who == 'not'){
        obj.clickNotHelpful = true;
        obj.notHelpImg = require('../../assets/images/support/icon_fail_w.png');
        data = {
          contentMangementId: obj.cid,
          isHelpful: false,
        };
      }
      let url = DomainManager.saveHelpful();
      this.$axios.post(url, data).then(res=>{
        if(res.succ){
          Toast({
            message:'Success',
            duration:1200
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getlists() {
      Indicator.open({
				spinnerType: 'fading-circle'
			});
      let that = this;
      let url = DomainManager.getFlightFAQS() + "?" + "cId=176";
      this.$axios.get(url).then(res => {
        Indicator.close();
        if(res.success && res.list.length >=1) {
          res.list[0].node.forEach((e, i)=>{
            this.$set(e, 'flag', false);
            if(e.node){
              e.node.forEach(e1 =>{
                this.$set(e1, 'flag', false);
                if(e1.node){
                  e1.node.forEach(e2 =>{
                    this.$set(e2, 'flag', false);
                    this.$set(e2, 'helpImg', require('../../assets/images/support/icon_right.png'));
                    this.$set(e2, 'notHelpImg', require('../../assets/images/support/icon_fail.png'));
                    this.$set(e2, 'clickHelpful', false);
                    this.$set(e2, 'clickNotHelpful', false);
                  })
                }
              })
            }
          });
          this.list = res.list[0].node;
        } else {
          res.msg && Toast({
            message: res.msg,
            position: "center",
            duration: 1500
          });
        }
      }).catch(err => {
        Indicator.close();
        console.log(err);
      });
    },
    fiLevelClick(who){
      this.list.forEach((e, i)=>{
        if(who == i){
          this.list[who].flag = !this.list[who].flag;
        }else{
          this.list[i].flag = false;
          if(e.node){
            e.node.forEach((e1, i1)=>{
              e1.flag = false;
              if(e1.node){
                e1.node.forEach((e2, i2)=>{
                  e2.flag = false;
                })
              }
            })
          }
        }
      })
    },
    seLevelClick(who1, who2){
      this.list[who1].node.forEach((e, i)=>{
        if(who2 == i){
          this.list[who1].node[who2].flag = !this.list[who1].node[who2].flag;
        }else{
          this.list[who1].node[i].flag = false;
          if(e.node){
            e.node.forEach((e1, i1)=>{
              e1.flag = false;
            })
          }
        }
      })
    },
    thLevelClick(who1, who2, who3){
      this.list[who1].node[who2].node.forEach((e, i)=>{
        if(who3 == i){
          this.list[who1].node[who2].node[who3].flag = !this.list[who1].node[who2].node[who3].flag;
        }else{
          this.list[who1].node[who2].node[i].flag = false;
        }
      })
    }
  },
  created() {
    this.getlists();
    User.getWebsiteInfo(this).then(res => {
			this.mobile = res.webSiteInfo.websitePhone;
		})
  },
}
</script>
<style lang='less' scoped>
#heg-support{
  background: #eee;
  .header{
    .sp {opacity: 0;}
  }
  .bgfff{background: #fff;}
  .container{
    text-align: left;
    .martop{height:2.04rem;}
    .top-img{
      img{
        width:100%;
        vertical-align: top;
      }
    }
    h5{
      font-size: 0.598rem;
      padding:0 0.64rem;
      line-height: 1.6rem;
      background: #eee;
    }
    h6{
      font-size: 0.598rem;
      color:#333;
    }
    .h6-active{color: #FC9525;}
  }
  .section1{
    .se-level{
      border-bottom: 1px solid #eee;
      .se-title1{
        padding:0.3rem 0.84rem;
        h6{font-weight: normal;}
        i{
          display:block;
          color:#999;
          transform: rotate(0deg);
        }
        .se-fold{ transform: rotate(180deg); }
      }
      .se-title{
        margin:0 0.64rem;
        padding:0.64rem 0;
      }
      .th-detail{
        background: #eee;
        overflow: hidden;
        li{padding: 0.2rem 0.84rem;}
        li:last-child{padding-bottom: 0.5rem;}
        .th-title{
          font-family: "HelveticaLTPro-Bold";
          font-size: 0.598rem;
          color: #333333;
          line-height: 0.894rem;
          cursor: pointer;
        }
        .th-text{
          font-family: "HelveticaLTPro-Roman";
          font-size: 0.512rem;
          color: #333333;
          line-height: 0.769rem;
          margin:0.425rem 0;
        }
        .th-btn{
          justify-content: flex-end;
          button{
            display: block;
            font-family: "HelveticaLTPro-Roman";
            font-size: 11px;
            border-radius:1rem;
            background: #fff;
            cursor: pointer;
          }
          button:first-child{
            color:#0B9D78;
            border:1px solid #0B9D78;
            margin-right: 0.427rem;
            background: #fff;
            padding:0.05rem 0.3rem 0.1rem;
            img{
              width:0.527rem;
              height:0.342rem;
              margin-right: 0.427rem;
              vertical-align: middle;
            }
          }
          button.p1-active{
            color:#fff;
            border:0;
            background: #0B9D78;
          }
          button:last-child{
            border:1px solid #D32F2F;
            color:#D32F2F;
            padding:0.05rem 0.3rem 0.1rem;
            img{
              width:0.383rem;
              height:0.385rem;
              margin-right: 0.427rem;
              vertical-align: middle;
            }
          }
          button.p2-active{
            color:#fff;
            border:0;
            background: #D32F2F;
          }
        }
      }
    }
  }
  .section2{
    .s2-content{
      padding:0.64rem;
      text-align: center;
      img{
        width:1.28rem;
        height:1.28rem;
        vertical-align: top;
        margin-bottom: 0.427rem;
      }
      p{
        font-family: "HelveticaLTPro-Roman";
        font-size: 0.598rem;
        color: #333333;
        text-align: center;
        line-height: 0.894rem;
      }
      button{
        width:9.8rem;
        padding:0.3rem 0;
        color:#fff;
        font-size: 0.598rem;
        margin:0.64rem auto 0;
        background: #FFAD3D;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
  .section3{
    div{
      padding:0.64rem;
      font-size: 0.598rem;
      color: #111111;
      img{
        width:0.68rem;
        height:0.68rem;
        vertical-align: middle;
      }
      a{color:#0B9D78;text-decoration: underline;}
    }
  }
  .section4{
    background: #fff;
    cursor: pointer;
    padding:0 0.64rem;
    border-top:1px solid #eee;
    h5{
      padding:0 0;
      background: #fff;
    }
    i{
      color:#999;
      display: block;
      transform: rotate(-90deg);
    }
  }
}
</style>