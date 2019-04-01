<template>
  <div id="coupon-list">
    <head-top class="header ">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <img slot="title" class="flight_logo" :src="require('../../assets/images/home/home-logo.png')" alt="Online Travel Agency" title="Lowest Airfares in India">
    </head-top>
    <div class="c_content">
      <div class="offer-title">
          <p>SHOW&nbsp;COUPONS</p>
      </div>
      <ul class="offer-list">
          <li v-for="item in offers" :key="item.id" @click="jumpCouponDetail(item.couponCode)">
              <div class="o-left">
                  <img :src="require('../../assets/images/home-img/flight-coupon.png')" >
              </div>
              <div class="o-mid">
                  <div class="mid-top"><img :src="require('../../assets/images/home-img/flight-plane.png')" alt=""><h5>{{item.title}}</h5></div>
                  <div class="mid-center">
                      <p style="width:100%;">{{item.description}}</p>
                  </div>
                  <div class="mid-bottom"><img :src="require('../../assets/images/home-img/flight-clock.png')" :alt="item.landingPageImgAlt" :title="item.landingPageImgTitle"><h5>Only {{item.days}} days</h5></div>
              </div>
              <div class="o-right">
                  <p class="o-percent">{{item.discount}}</p>
                  <div class="right-bottom">
                      <p>{{item.couponCode}}</p>
                      <p>Promocode</p>
                  </div>
              </div>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import { DomainManager } from "../../config/DomainManager.js";
import { Toast, Loadmore, Indicator } from "mint-ui";
export default {
  components: {
    headTop
  },
  data() {
    return {
      offers: []
    };
  },
  methods: {
    getCoupon() {
      let that = this;
      let parm = { device: 2, page: 1, pageSize: 3 };
      let url = DomainManager.getFlightCoupon();
      this.$http
        .post(url, parm)
        .then(res => {
          if (res.data.success) {
            Indicator.close();
            that.offers = res.data.data;
            that.offers.forEach(function(e, i) {
              let time = new Date(e.endDate) - new Date();
              let day = Math.ceil(time / (1000 * 60 * 60 * 24)) + 1;
              that.$set(e, "days", day);
            });
          } else {
            Indicator.close();
            Toast({
              message: res.data.message,
              position: "center",
              duration: 1000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    jumpCouponDetail(code) {
      this.$router.push({path:'/coupondetail',query:{'code':code,type:2}});
    }
  },
  created() {
    Indicator.open({
      text: "Hang on, searching for coupons",
      spinnerType: "fading-circle"
    });
    this.getCoupon();
  }
};
</script>
<style lang="less" scoped>
#coupon-list {
  .header {
    position: static !important;
    background: #0b9d78;
    img {
      width: 6.4rem;
    }
  }
  .c_content {
    padding: 0 0.64rem;
    .offer-title {
      padding: 0.65rem 0 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-size: 0.8rem;
        color: #333;
        font-family: "PingFangSC-Medium";
      }
    }
    .offer-list {
      width: 100%;
      li {
        padding: 0.5rem 0;
        display: flex;
        height: 3.5rem;
        align-items: center;
        border-radius: 0.2rem;
        box-shadow: 0 2px 10px 2px #ddd;
        margin-bottom: 0.6rem;
        .o-left {
          width: 18%;
          font-size: 0.7rem;
          color: #000;
          img {
            width: 1.8rem;
            height: 1.65rem;
          }
        }
        .o-mid {
          flex: 1;
          height: 100%;
          position: relative;
          .mid-top {
            width: 100%;
            color: #333;
            font-size: 0.6rem;
            margin-bottom: 0.4rem;
            height: 0.66rem;
            font-family: "PingFangSC-Semibold";
            top: 0;
            h5 {
              width: 100%;
              text-align: left;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .mid-bottom {
            color: #ffa000;
            font-size: 0.4rem;
            margin-top: 0.2rem;
            font-family: "PingFangSC-Light";
            bottom: 0;
          }
          .mid-top,
          .mid-bottom {
            display: flex;
            position: absolute;
            img {
              width: 0.6rem;
              height: 0.6rem;
              margin-right: 0.2rem;
            }
          }
          .mid-center {
            width: 85%;
            color: #999;
            font-size: 0.4rem;
            line-height: 0.8rem;
            font-family: "PingFangSC-Light";
            padding-left: 0.8rem;
            text-align: left;
            position: absolute;
            top: 1rem;
            p {
              height: 1.72rem;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              text-overflow: ellipsis;
            }
          }
        }
        .o-right {
          width: 28%;
          height: 100%;
          position: relative;
          .o-percent {
            float: right;
            padding: 0.2rem 0.8rem;
            color: #fff;
            font-size: 0.6rem;
            background: #ffad3d;
            border-radius: 0.9rem 0 0 0.9rem;
            font-family: "PingFangSC-Semibold";
          }
          .right-bottom {
            float: right;
            padding: 0.2rem 0.4rem;
            border: 1px dashed #ffa000;
            border-radius: 0.2rem;
            box-shadow: 0 0.2rem -0.2rem #ffa000;
            font-size: 0.4rem;
            position: absolute;
            bottom: 0.12rem;
            right: 0.5rem;
            p:nth-child(1) {
              color: #ffa000;
              margin-bottom: 0.3rem;
            }
            p:nth-child(2) {
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>

