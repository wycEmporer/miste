<template>
  <div class="book-review">
    <div class="title flex content-start align-items-center">
      <span class="title-icon">1</span>
      <span class="title-info">Review your booking</span>
    </div>
    <div v-for="(info, index) in flightInfos" :key="info.id" class="trip-info">
      <div class="trip-wrapper">
        <div class="trip-cont">
          <div v-for="item in info.flight.stops" :key="item.id">
            <div class="trip-num">
              <span class="title-img">
                <img :src="item.airline.iconPath" />
              </span>
              <span>{{item.airline.name}}&nbsp;&nbsp;&nbsp;{{item.flightNumber}}</span>
            </div>
            <div class="time-info flex space-between">
              <div class="from-time">
                <h2>
                  <span>{{item.departAirportName}}</span>
                  <span>{{TimeFormatUtil.getDisplayHourAndMinute(new Date(item.departDate))}}</span>
                </h2>
                <div>
                  <span>{{TimeFormatUtil.getBookDetailDate(new Date(item.departDate))}}</span>
                </div>
                <div>
                  <span>{{item.departAirport.replace(/_/g,' ')}}</span>
                </div>
              </div>
              <div class="distance">
                <span>{{item.waitTime}}</span>
              </div>
              <div class="to-time from-time">
                <h2>
                  <span>{{item.arrivalAirportName}}</span>
                  <span>{{TimeFormatUtil.getDisplayHourAndMinute(new Date(item.returnDate))}}
                    <i v-show="info.flight.durationDays!=0">&nbsp;+{{info.flight.durationDays}}</i>
                  </span>
                </h2>
                <div>
                  <span>{{TimeFormatUtil.getBookDetailDate(new Date(item.returnDate))}}</span>
                </div>
                <div>
                  <span>{{item.arrivalAirport.replace(/_/g,' ')}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="trip-attach sp">
            <div class="rules flex space-between">
              <!-- <span>{{flightOrder.departFlight.refundable? 'Refundable' : 'Non-Refundable'}}</span> -->
              <span>Refundable</span>

              <a @click='showFareRule(index)' v-show='info.flight.refundable'>Fare Rules</a>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="trip-attach" v-if="flightOrder!=null">
      <div class="baggage-tit">
        <span>Baggage info</span>
      </div>
      <div class="baggage-info" v-for="info in flightOrder.baggageinfo" :key="info.id">
        <h2>{{info.flightNumber}}</h2>
        <div class="flex space-between">
          <span>Check in</span>
          <span>{{info.ch}} kg</span>
        </div>
        <div class="flex space-between">
          <span>Cabin</span>
          <span>{{info.ca}} kg</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TimeFormatUtil, GetFlightOrderUtil } from "models/utils";
export default {
  props: {
    flightOrder: {
      type: Object,
    },
    flightInfos:{
      type:Array,
    }
  },
  data() {
    return {
      TimeFormatUtil
    };
  },
  methods: {
    showFareRule(index) {
      let arr = this.flightInfos[index].flight;
      this.$emit("transShowFareRule", arr);
    }
  },
};
</script>
<style lang="less">
  .book-review {
    padding-top: 2.04rem;
    background: #fff;
    margin-bottom: 0.21rem;
    .trip-wrapper {
      padding: 0 0.64rem;
    }
    .trip-info {
      .trip-cont {
        background-color: #fff;
        border-radius: 0.4rem;
        .trip-num {
          height: 2.14rem;
          line-height: 2.14rem;
          text-align: left;
          span {
            font-size: 0.68rem;
            color: #666;
          }
          .title-img {
            width: 0.68rem;
            height: 2.14rem;
            img {
              width: 0.68rem;
            }
            margin-right: 0.5rem;
          }
        }
        .time-info {
          padding-bottom: 1rem;
          span {
            display: block;
          }
          h2 {
            font-size: 0.768rem;
            line-height: 1.2rem;
            color: #333;
          }
          div {
            color: #ccc;
            font-size: 0.56rem;
            line-height: 0.68rem;
          }
        }
        .from-time {
          width: 5rem;
          span {
            display: block;
          }
          h2 {
            text-align: right;
          }
          div {
            text-align: right;
          }
        }
        .to-time {
          width: 5rem;
          h2 {
            text-align: left;
            i {
              font-size: 0.52rem;
            }
          }
          div {
            text-align: left;
          }
        }
        .distance {
          span {
            font-size: 0.5rem;
            color: #666;
            width: 3rem;
            height: 1.1rem;
            line-height: 1.1rem;
            text-align: center;
            background: url("~assets/images/book/icon-.png") center bottom
              no-repeat;
            background-size: 2rem;
          }
        }
      }
    }
    .sp {
      padding: 0 !important;
    }
    .trip-attach {
      background-color: #fff;
      border-radius: 0.4rem;
      padding: 0.32rem 0.64rem;
      .rules {
        height: 1.8rem;
        line-height: 1.8rem;
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee;
        span,
        a {
          font-size: 0.56rem;
          color: #666;
        }
        a {
          display: block;
          color: #0b9d78;
        }
      }
      .baggage-tit {
        font-size: 0.6rem;
        color: #333;
        text-align: left;
        padding: 0.2rem 0;
      }
      .baggage-info {
        h2 {
          font-size: 0.68rem;
          color: #666;
          height: 1.5rem;
          line-height: 1.5rem;
          text-align: center;
        }
        div {
          span {
            display: block;
            font-size: 0.6rem;
            color: #ccc;
            line-height: 1.45rem;
          }
        }
      }
    }
    .contact-info {
      h2 {
        font-size: 0.68rem;
        color: #333;
        text-align: left;
        line-height: 1.45rem;
        padding-left: 0.4rem;
      }
      #cS {
        display: block;
        padding: 0.2rem;
      }
      .contact-cont {
        padding: 0 0.4rem;
        background-color: #fff;
        padding-bottom: 0.6rem;
        border-radius: 0.4rem;
        .forms {
          text-align: left;
          span {
            font-size: 0.68rem;
            color: #666;
            width: 2.05rem;
            margin-right: 0.2rem;
            line-height: 1.45rem;
          }
          input {
            font-size: 0.5rem;
            padding-left: 0.2rem;
            color: #666;
            border-bottom: 1px solid #ccc;
            line-height: 1rem;
            text-indent: 0;
            border-radius: 0;
          }
        }

        p {
          font-size: 0.6rem;
          color: #ccc;
          padding-left: 2.4rem;
          line-height: 0.768rem;
        }
      }
    }

    .fare {
      h2 {
        font-size: 0.68rem;
        color: #333;
        text-align: left;
        line-height: 1.45rem;
        padding-left: 0.4rem;
      }
    }

    .term {
      margin-top: 1rem;
    }

    p {
      font-size: 0.5rem;
      color: #ccc;
      text-align: left;
      padding-left: 0.6rem;
      line-height: 0.768rem;
      .round {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        border: 1px solid #ccc;
        margin-top: 0.4rem;
        margin-right: 0.2rem;
        display: inline-block;
      }
    }

    p::before {
      display: table;
      content: "";
    }

    .payment {
      width: 100%;
      padding: 0.4rem 0 1rem;
      .submitBook {
        width: 100%;
        font-size: 0.768rem;
        color: #fff;
        height: 2rem;
        background-color: #ffad3d;
        border-radius: 0.3rem;
        cursor: pointer;
      }
    }
  }
</style>

