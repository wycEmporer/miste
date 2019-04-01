<template>
  <div class="wrapper">
    <head-top>
      <img slot="left" :src="require('../../assets/images/close.png')" class="prev">
      <div slot="title" class="title">about us</div>
      <div slot="right" class="set"></div>
    </head-top>
    <div class="container">
      <div class="content-top">
        <div class="text_list">
          <div class="item clear">
            <div class="cyclo flex content-center align-items-center">
              <img class="face" src="../../assets/images/aboutus/face@2x.png" alt="face-icon">
            </div>
            <h3>HAPPY</h3>
            <span>Enjoy happy moment when you booking</span>
          </div>
          <div class="item clear">
            <div class="cyclo">
              <img class="shield" src="../../assets/images/aboutus/shield@2x_11.png" alt="shield-icon">
            </div>
            <h3>HAPPY</h3>
            <span>Enjoy happy moment when you booking</span>
          </div>
          <div class="item clear">
            <div class="cyclo">
              <img class="point" src="../../assets/images/aboutus/point@2x_8.png" alt="point-icon">
            </div>
            <h3>HAPPY</h3>
            <span>Enjoy happy moment when you booking</span>
          </div>
        </div>
      </div>
      <div class="content-bottom">
        <div class="text">
          <p>From going to the Travel Shop for Air Tickets, Hotel Booking &amp; Travel Package to the days of making enquiry on
            the land line phone or a mobile phone to a travel shop and moving to the fax era &amp; finally, landing on the internet
            platform. Travel industry has gone through a tremendous technical advance. We developed Happy Easy Go, because
            we are just like you who have long become online shoppers and always enjoyed discounting.
          </p>
          <p class="sp">With a proprietary airfare booking engine, Happy Easy Go is dedicate to provide the best fares available in the
            marketplace. Our team consists of the most experienced and customer centric travel experts that will ensure a
            happy and easy experience for our customers.
          </p>
        </div>
        <div class="text">
          <div class="item">
            <h3>Join Us</h3>
            <p>Come with us to make more Happy Easy travel.</p>
          </div>
          <div class="item">
            <h3>Feedback Us</h3>
            <p>Help us to improve the happy experience for you and more people.
            </p>
          </div>
          <div class="item">
            <h3>Contact Us</h3>
            <p class="sp">Need a Happy Cooperate with Us? Feel free to contact us.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/head/head.vue";
export default {
  components: {
    headTop
  }
};
</script>
<style lang="less" scoped>
.container {
  background-color: #f4f4f4;
  .content-top {
    height: 9.6rem;
    background-color: #2f2e42;
    padding: 2.04rem 0.64rem 0 0.64rem;

    .text_list {
      width: 100%;
      padding-top: 1.07rem;

      .item {
        font-size: 0.64rem;
        padding-bottom: 1.408rem;

        .cyclo {
          height: 1.4rem;
          width: 1.4rem;
          border-radius: 50%;
          margin-right: 0.68rem;
          background-color: #ffffff;
          float: left;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 0.87rem;
            height: 0.87rem;
          }
          .shield {
            width: 0.72rem;
            height: 0.85rem;
          }
        }

        h3,
        span {
          color: #ffffff;
          float: left;
        }
      }
    }
  }
  .content-bottom {
    padding: 1.408rem 0.384rem 0.43rem 0.384rem;
    .text {
      text-align: left;
      padding: 0.85rem 0.81rem 0.81rem 0.81rem;
      margin-bottom: 0.43rem;
      background-color: #ffffff;
      -webkit-border-radius: 3%;
      -moz-border-radius: 3%;
      border-radius: 3%;
      .sp {
        padding-bottom: 0;
      }
      h3 {
        font-size: 0.512rem;
        font-weight: bold;
      }
      p {
        padding-bottom: 1.07rem;
        text-align: left;
        font-size: 0.512rem;
        line-height: 1.5;
      }
    }
  }
}
</style>