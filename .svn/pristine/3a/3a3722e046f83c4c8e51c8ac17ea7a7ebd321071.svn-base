<template>
  <div class="wrapper">
    <head-top class="header">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title">About us</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="container">
      <div class="content-top">
        <div class="text_list">
          <div class="item flex content-start align-items-center">
            <div class="cyclo">
              <img class="face" src="../../assets/images/aboutus/face@2x.png" alt="face-icon">
            </div>
            <div class="text">
              <span class="title">HAPPY</span>
              <span class="content">Enjoy happy moment when you booking</span>
            </div>
          </div>
          <div class="item flex content-start align-items-center">
            <div class="cyclo">
              <img class="shield" src="../../assets/images/aboutus/shield@2x_11.png" alt="shield-icon">
            </div>
            <div class="text">
              <span class="title">SECURITY</span>
              <span class="content">Ensure the safety of your payment</span>
            </div>

          </div>
          <div class="item flex content-start align-items-center">
            <div class="cyclo">
              <img class="point" src="../../assets/images/aboutus/point@2x_8.png" alt="point-icon">
            </div>
            <div class="text">
              <span class="title">CONVENIENCE</span>
              <span class="content">Easy way to find your cheap ticket</span>
            </div>
          </div>
        </div>
      </div>
      <div class="us-content">
        <div class="con-child" v-for="(item,index) in lists" :key="index">
          <h3 :class="{childH3:index>=1}">{{item.class}}</h3>
          <button class="join-us" v-if="item.class == 'Join Us' " @click="joinUs">SEE OPENINGS</button>
          <p class="children" v-for="(child,index) in item.content" :key="index" v-html="child.content">{{child.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headTop from "../../components/head/head.vue";
  import {DomainManager} from '../../config/DomainManager.js';
  export default {
    components: {
      headTop
    },
    data(){
    return {
      lists:[]
    }
  },
  created(){
    this.getAboutus();
  },
  methods:{
    getAboutus(){
      let that = this;
      let url = DomainManager.getFlightFAQS()+'?cId=112';
      this.$axios.get(url).then(res => {
        if(res.success){
          that.lists = res.list[0].node
        }else{
          Toast({
            message:res.statusText,
            position:"center",
            duration:1500
          });
        }
      }).catch(err => {
        console.log(err)
      });
    },
    joinUs(){
      this.$router.push("/careers");
    }
  }
};
</script>
<style lang="less" scoped>
  .header {
    background-color: #0b9d78;
    .title {
      color: #fff;
      font-size: 0.769rem;
    }
    .sp {
      opacity: 0;
    }
  }

  .container {
    background-color: #f4f4f4;
    .content-top {
      background: #fff;
      height: 9.6rem;
      padding: 2.04rem 0.64rem 0.64rem 0.64rem;
      .text_list {
        width: 100%;
        padding-top: 1.07rem;

        .item {
          font-size: 0.64rem;
          padding-bottom: 1.408rem;

          .cyclo {
            height: 1.39rem;
            width: 1.39rem;
            border-radius: 50%;
            margin-right: 0.68rem;
            background-color: #ffffff;
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              display: block;
              width: 1.2rem;
              height: 1.2rem;
            }
            .shield {
              height: 1.2rem;
            }
          }
          .text {
            float: left;
            text-align: left;
            margin-top: 0.1rem;
          }
          .title {
            font-size: 0.568rem;
            display: block;
            color: #000;
          }
          .content {
            font-size: 0.568rem;
            display: block;
            color: #ccc;
          }
          span {
            padding: 0.15rem 0;
          }
        }
      }
    }
    .us-content{
      padding:0 0.64rem 0.64rem;
      .con-child{
        h3{
          color:#111;
          font-size:0.713rem;
          padding:0.63rem 0;
        }
        .join-us{
          padding:0.2rem 0.3rem;
          background: #0b9d78;
          border-radius:2px;
          color:#fff;
          cursor: pointer;
        }
        p{
          color:#111;
          font-size:0.523rem;
          line-height:1.046rem;
          text-align: left;
        }
        .children{
          margin-bottom: 0.6rem;
        }
        .children:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
</style>