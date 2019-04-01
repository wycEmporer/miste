<template>
  <div class="wrapper">
    <head-top class="header">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title">Spring Break Sale</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="container">
      <div class="top" :class="{marTop: contentMargin}">
        <img :src="mUrl" alt="">
      </div>
      <div class="content">
        <div class="text-group">
          <h2>Spring Break Sale</h2>
          <div class="line"></div>
          <p>Spring which is also called “Queen of the season” begins in February with a sense of joy and happiness. The days
            are pleasant, beauty pleases our eyes and music thrills our ears.</p>
          <p>This charismatic season HEG presents the biggest surprise as “Spring Break Sale”. Book your dream destination with
            us at the lowest price ever and enjoy the serenity of the season.</p>
          <p>Hurry up sale starts: 28 Feb 2018.</p>
        </div>

        <div class="dl-btn">
          <img src="../../../assets/images/offer/g.png" alt="">
          <a href="https://app.adjust.com/xmfxff?campaign=Spring&adgroup=PC&creative=20180227"></a>
        </div>

        <div class="rule">
          <div class="title flex content-start">
            Download HEG App
          </div>
          <div class="form">
            <ul class="title-group flex space-between">
              <li class="item">HEG APP</li>
              <li class="item">Reward</li>
              <li class="item">Coupon Code</li>
            </ul>
            <ul class="item-group flex space-between">
              <li class="item">New Register</li>
              <li class="item">
                <span class="fw">Rs.3000</span>
              </li>
              <li class="item">/</li>
            </ul>
            <ul class="item-group flex space-between">
              <li class="item flex align-items-center content-center">
                <span>Domestic Flights</span>
              </li>
              <li class="item flex align-items-center content-center">
                <span>
                  <span class="fw">Rs.450</span> Off</span>
              </li>
              <li class="item">
                <div class="fw">AppSpring450</div>
              </li>
            </ul>
            <ul class="item-group flex space-between">
              <li class="item flex align-items-center content-center">
                <span>International Flights</span>
              </li>
              <li class="item flex align-items-center content-center">
                <span>
                  <span class="fw">Rs.1100</span> Off</span>
              </li>
              <li class="item">
                <div class="fw">AppSpring1100</div>
              </li>
            </ul>
          </div>

          <div class="title">
            PC & Msite
          </div>

          <div class="form">
            <ul class="title-group flex space-between">
              <li class="item">HEG website</li>
              <li class="item">Reward</li>
              <li class="item">Coupon Code</li>
            </ul>
            <ul class="item-group flex space-between">
              <li class="item flex align-items-center content-center">
                <span>Domestic Flights</span>
              </li>
              <li class="item flex align-items-center content-center">
                <span>
                  <span class="fw">Rs.400</span> Off</span>
              </li>
              <li class="item">
                <div class="fw">Spring400</div>
              </li>
            </ul>
            <ul class="item-group flex space-between">
              <li class="item flex align-items-center content-center">
                <span>International Flights</span>
              </li>
              <li class="item flex align-items-center content-center">
                <span>
                  <span class="fw">Rs.1000</span> Off</span>
              </li>
              <li class="item">
                <div class="fw">Spring1000</div>
              </li>
            </ul>
            <!-- <div class="text-group padT">
                            <h3>Note:</h3>
                            <p>For order amount under Rs.5,000 on domestic flights, Instant Discount is not applicable with these coupon codes.</p>
                            <p>For order amount under Rs.10,000 on international flights, Instant Discount is not applicable with these coupon codes.</p>
                        </div> -->
          </div>

          <div class="link-btn" @click="bookLink()">
            Book Now
          </div>
        </div>

        <div class="tips">
          <p>Register on HEG and avail Spring season sale offers</p>
          <p>before 31 march 2018.</p>
          <h2>Get Set Go!</h2>
          <span class="link" @click="$router.push('/springsale-terms')">Terms & Conditions</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headTop from "../../../components/head/head.vue";
  import {
    User
  } from "../../../models/user";

  export default {
    components: {
      headTop
    },
    data() {
      return {
        mUrl: "",
        model: 0,
        contentMargin: true
      };
    },
    methods: {
      bookLink() {
        let url =
          "https://m.happyeasygo.com/?utm_source=Direct&utm_medium=SpringMsite&utm_campaign=BookNow";
        window.location.href = url;
      },
      getTopImage() {
        let parmTop = "type=13&device=" + this.model + "&addr=springsale&businessType=1";

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
          typeof window.heg.getNativeSource() === "string" ?
          JSON.parse(window.heg.getNativeSource()) :
          window.heg.getNativeSource();
        this.contentMargin =
          Number(deviceObj.deviceType) == 1 && !deviceObj.deviceNative;
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

  .padT {
    padding: 0.512rem;
  }

  .container {
    .marTop {
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
        .form {
          .title-group {
            margin-bottom: 2px;
            li {
              background: #e0f1fc;
            }
          }
          .item-group {
            margin-bottom: 2px;
            li {
              background: #f4fafe;
            }
          }
          ul {
            li {
              width: 33%; // height: 1.62rem;
              // line-height: 1.62rem;
              padding: 0.42rem 0;
              text-align: center;
              margin: 0 1px;
              div {
                padding: 0.05rem 0;
              }
            }
          }
          ul li:nth-child(1) {
            width: 40%;
          }
          ul li:nth-child(2) {
            width: 30%;
          }
          ul li:nth-child(3) {
            width: 30%;
          }
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
        padding-top: 1.706rem;
        text-align: center;
        h2 {
          font-size: 0.64rem;
          padding: 0.21rem 0;
        }
        span,
        p {
          font-size: 0.512rem;
        }
        p {
          color: #666;
          line-height: 1.3;
        }
        .link {
          color: #0b9d78;
          text-decoration: underline;
        }
      }
    }
  }
</style>