<template>
  <div class="wrapper">
    <head-top class="header">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title">Spring Travel Offer</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="container">
      <div class="top" :class="{marTop: contentMargin}">
        <img :src="mUrl" alt="">
      </div>
      <div class="content">
        <div class="text-group">
          <h2 class="marB1" style="text-align:center;font-size:1rem">Spring Travel Offer</h2>
          <p>Begin with fresh flowers and sunshine, Spring is the time of plans and projects. Start this year with your dreaming
            destination travel, get out of your usual surroundings and have an eye-opening, relaxing, or just plain fun experience
            somewhere new. </p>
          <p>HappyEasyGo comes out the Spring Travel Offer, giving you enormous discounts on the air travel to your ideal places.
            Lowest price guaranteed on your flight you book with us!</p>

        </div>
        <div class="rule">
          <div class="item marB1">
            <p class="padB03 font68">Domestic flight:</p>
            <!-- <p class="padB03 font68"><span class="colorDan">Rs.250</span>  instant discount by Coupon code:</p>
            <p class="font68 padB03"><span class="fontBB">HEGDOM  </span> on desktop & mobile site</p> -->
            <p class="padB03 font68"><span class="colorDan">Rs.100</span>  instant discount by Coupon code:</p>
            <p class="font68 padB03"><span class="fontBB"> APPDOM  </span> on HEG App</p>
          </div>
          <div class="item marB1">
            <p class="padB03 font68">International flight: </p>
            <p class="padB03 font68"><span class="colorDan">Rs.500</span>  instant discount by Coupon code:</p>
            <p class="padB03 font68"><span class="fontBB">HEGINT  </span> on desktop & mobile site</p>
            <p class="padB03 font68"><span class="colorDan">Rs.700</span>  instant discount by Coupon code:</p>
            <p class="padB03 font68"><span class="fontBB">APPINT  </span> on HEG App</p>
          </div>
          <p class="lineH08">All coupon codes are valid till tomorrow. Book tickets now, you’ll get huge discount instantly. </p>
        </div>
        <div class="travelImg">
          <img :src="require('./springtravel.png')" alt="">
        </div>
        <div class="rule">
          <div class="link-btn" v-if="isShowBtn" @click="bookLink()">
            Book Now
          </div>
        </div>

        <div class="tips">
          <span class="link" @click="$router.push('/SpringTravel-terms')">Terms & Conditions</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "../../../components/head/head.vue";
import { User } from "../../../models/user";

export default {
  components: {
    headTop
  },
  data() {
    return {
      isShowBtn: true,
      mUrl: "",
      model: 0,
      contentMargin: true,
    };
  },
  methods: {
    bookLink() {
      let url =
        "https://m.happyeasygo.com/?utm_source=Direct&utm_medium=SpringMsite&utm_campaign=BookNow";
      window.location.href = url;
    },
    getTopImage() {
      let parmTop = "type=13&device=" + this.model + "&addr=SpringTravel&businessType=1";

      User.advList(this, parmTop)
        .then(res => {
          if (res.success) {
            this.mUrl = res.list[0].landingPageUrl;
          }
        })
        .catch(err => {
          console.log(err.msg);
        });
    },
    checkType() {
      try {
        let typeA = typeof window.heg.getNativeSource() === "string"
          ? JSON.parse(window.heg.getNativeSource())
          : window.heg.getNativeSource();
        this.model = Number(typeA.deviceType) + 1;
      } catch (e) {
        this.model = 0;
      }
      this.getTopImage();
    }
  },
  created() {
    try {
      let deviceObj =
        typeof window.heg.getNativeSource() === "string"
          ? JSON.parse(window.heg.getNativeSource())
          : window.heg.getNativeSource();
      this.contentMargin =
        Number(deviceObj.deviceType) == 1 && !deviceObj.deviceNative;
      this.isShowBtn = false;
    } catch (e) {}

    this.checkType();
  }
};
</script>
<style lang="less">
.header {
  background: #0b9d78;
  .title {
    font-size: 0.768rem;
    color: #fff;
  }
  .sp {
    opacity: 0;
  }
}
.travelImg {
  padding-top: 40px;
  text-align: center;
  img {
    width: 14.5rem;
  }
}
.padB03 {
  padding-bottom: 0.4rem;
}
.padR03 {
  padding-right: 0.3rem;
}
.lineH08 {
  line-height: 0.8rem;
}
.marB1 {
  margin-bottom: 1rem;
}
.marB06 {
  margin-bottom: 0.6rem;
}
.font68 {
  font-size: 0.68rem;
}
.padT {
  padding: 0.512rem;
}
.colorDan {
  color: #b70c14;
}
.fontBB {
  font-weight: bolder;
}
.container {
  .marTop{
    margin-top: 2rem;
  }
  .top {
    height: 9.8rem; // background: #fff url('../../../assets/images/offer/holi_top.png') center no-repeat;
    background-size: 100% 9.8rem;
    img {
      display: block;
      width: 100%;
    }
  }
  .content {
    padding: 0.85rem 0.64rem;
    text-align: left;
    .text-group {
      // padding-bottom: 0.512rem;
      h2 {
        font-size: 0.597rem;
      }
      .line {
        background: #2ca5ea;
        height: 1px;
        width: 2.98rem;
        margin: 0.21rem 0;
      }
      p {
        font-size: 0.512rem;
        line-height: 1.3;
        padding-bottom: 0.512rem;
      }
    }
    .dl-btn {
      position: relative;
      width: 4.7rem;
      height: 1.36rem;
      margin-bottom: 0.512rem;
      img {
        border-radius: 2px;
        display: block;
        width: 100%;
        height: 100%;
        box-shadow: 1px 1px 1px 1px #000;
      }
      a {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .rule {
      font-size: 0.512rem;
      .title {
        padding: 5px 0;
      }
      .fw {
        font-weight: bold;
      }

      .link-btn {
        height: 1.706rem;
        line-height: 1.706rem;
        width: 13.44rem;
        margin: 0 auto;
        margin-top: 0.64rem;
        background: #0b9d78;
        color: #fff;
        border-radius: 2px;
        text-align: center;
        font-size: 0.64rem;
      }
    }
    .tips {
      padding-top: 1rem;
      text-align: center;
      span,
      p {
        font-size: 0.512rem;
      }

      .link {
        color: #0b9d78;
        text-decoration: underline;
      }
    }
  }
}
</style>