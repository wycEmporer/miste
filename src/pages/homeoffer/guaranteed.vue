<template>
  <div class="wrapper">
    <head-top class='header'>
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title">Guaranteed</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="container">
      <div class="content">
        <div class="top-pic">
          <img src="../../assets/images/homeoffer/guaranteed.jpg" alt="">
        </div>
        <div class="text-content">
          <div class="title flex content-center align-items-center">
            <div class="line"></div>
            <h2>How Do I know if I Qualify</h2>
            <div class="line"></div>
          </div>
          <p class="sp">The Happyeasygo.com Best Price Guarantee applies to every Airline Ticket Reservation sold on Happyeasygo.com!</p>

          <p>The lower price, including taxes and fees, must be available to the general public for booking on a website in
            the same currency in India, using the same form of payment and from the same point of sale as your original reservation
            at the same time (valid for 5 minutes) when you contact us. The lower price must be an exact match to the itinerary
            booked on Happyeasygo.com, including offering a same cancellation policy and fare rule. For reservations that
            are not pre-paid, we will either help you cancel your reservation so you can rebook at the lower price, or we
            will refund 200% of the difference after travel is completed.</p>

          <p class="sp">Here's what you need to look at to match itineraries:</p>

          <p>Airline Tickets: same airline, flight numbers, travel dates, Departure &Destination airports, number of ticketed
            passengers, cabin and class of service</p>

          <p>Our Best Price Guarantee does not apply to fares that aren't available to the general public, such as those for
            corporate customers, military personnel, students, children, senior citizens, groups, and members, as well as
            wholesaler and consolidator fares, convention rates, and fares purchased through coupon promotions, loyalty and
            other "reward" programs. Fares that have been partially refunded or canceled by Happyeasygo.com or others, and
            fares that are part of promotional packages or that include additional amenities, such as parking, meals or other
            services are excluded from the Best Price Guarantee.</p>

          <div class="title flex content-center align-items-center">
            <div class="line"></div>
            <h2>How Do I Claim My Refund?</h2>
            <div class="line"></div>
          </div>

          <p class="sp">Contact us within 24 hours of booking to initiate your claim.</p>

          <p>Tell us where you saw the lower price and send us the price details proof materials by Email within screenshot,
            including the Itinerary, Airline, Flight Numbers, Travel Dates, Departure & Destination Airports, Cabin and Class
            of Service etc. We will verify the price and availability right then in 24hrs, and we will refund your 200% difference
            charge in 5 workdays if your claim is valid.</p>

          <p class="sp">Tel: +1800-313-5699</p>

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
    },
    data() {
      return {};
    }
  };
</script>
<style lang='less' scoped>
  .header {
    background: #0b9d78;
    .prev {
      width: 0.5rem !important;
    }
    .title {
      line-height: 2.04rem;
      font-size: 0.768rem;
      color: #fff;
    }
    .sp {
      opacity: 0;
    }
  }

  .content {
    padding: 2.4rem 0.68rem 0;
    .top-pic {
      img {
        display: block;
        height: 13.568rem;
      }
    }
    .text-content {
      .title {
        padding-top: 1.62rem;
        padding-bottom: 0.938rem;
        h2 {
          font-size: 0.554rem;
        }
        .line {
          width: 1rem;
          margin: 0 0.8rem;
          border-bottom: 3px solid #bdc6d7;
        }
      }
      p {
        font-size: 0.469rem;
        color: #999;
        text-align: left;
        padding-bottom: 0.768rem;
      }
      .sp {
        color: #333;
      }
    }
  }
</style>