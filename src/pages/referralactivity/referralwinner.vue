<template>
  <div id="rank-winner">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title" style="margin-left:-1.5rem;">Winners&nbsp;Record</p>
    </head-top>
    <div class="win-content" v-show="isShow">
        <div class="win-lists" v-for="(item1,i) in rankHistory" :key="i">
          <div class="bg-color">
            <p class="win-title">{{list[i]}}</p>
            <ul class="win-ranking">
              <li v-for="(item2,j) in item1.historyList" :key="j">
                <div class="left"><span>{{item2.type==1?'register':'orders'}}</span></div>
                <div class="center">
                  <div class="icon"><img :src='icon' alt=""></div>
                  <div class="header-img"><img :src='headImg' alt=""></div>
                  <div class="userid">{{item2.userName}}</div>
                </div>
                <div class="right"><span>{{item2.quantity}}</span></div>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import { Toast, Indicator } from "mint-ui";
import { DomainManager } from "../../config/DomainManager.js";
import { CookieUtil } from "../../models/utils";
export default {
  components: {
    headTop
  },
  data() {
    return {
      list: [],
      isShow: false,
      rankHistory: [],
      historyTitleList: [],
      icon: require("../../assets/images/referralactivity/rank-gold.png"),
      headImg: require("../../assets/images/referralactivity/header-img2.png"),
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    };
  },
  watch: {
    historyTitleList: function(n) {
      this.transferTime();
    }
  },
  methods: {
    transferTime() {
      this.historyTitleList.forEach((e, i) => {
        let timer1 = new Date(e);
        let timer2 =
          timer1.getDate() +
          " " +
          this.months[timer1.getMonth()] +
          " " +
          timer1.getFullYear();
        this.list.push(timer2);
      });
    },
    getRankWeekHistory() {
      let that = this;
      let url = DomainManager.getReferRankWeekHistory();
      this.$http
        .get(url)
        .then(res => {
          if (res.data.succ) {
            that.rankHistory = res.data.data;
            res.data.data.forEach((e, i) => {
              that.historyTitleList.push(e.rankDate);
            });
            that.isShow = true;
            Indicator.close();
          } else {
            Toast({
              message: res.data.msg,
              position: "center",
              duration: 2000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    Indicator.open({
      spinnerType: "fading-circle"
    });
    this.getRankWeekHistory();
  }
};
</script>
<style lang="less" scoped>
#rank-winner {
  height: auto;
  .header {
    position: static !important;
    background: #0b9d78;
    i {
      padding: 0 0.64rem;
    }
  }
  .win-content {
    .win-lists {
      background: #eee;
      padding-bottom: 0.3rem;
      .bg-color {
        background: #fff;
        text-align: left;
        padding: 0.44rem 0.55rem 0.667rem;
      }
      .win-title {
        color: #111;
        font-size: 14px;
        line-height: 1.06rem;
        margin-bottom: 0.44rem;
      }
      .win-ranking {
        border: 1px solid #999;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
          font-size: 14px;
          height: 1.46rem;
          padding: 0.33rem 0.5rem;
          .left {
            font-size: 12px;
            color: #111;
            span {
              width: 3.06rem;
              height: 1.1rem;
              line-height: 1.1rem;
              text-align: center;
              border: 1px solid #ffad3d;
              border-radius: 0.6rem;
            }
          }
          .right {
            width: 10%;
            color: #e54a4a;
            text-align: right;
            span {
              width: 25px;
              text-align: center;
            }
          }
          .center {
            width: 55%;
            display: flex;
            align-items: center;
            .icon {
              width: 0.77rem;
              position: relative;
              img {
                width: 100%;
                vertical-align: middle;
              }
              span {
                position: absolute;
                display: block;
                color: #dc9841;
                top: 26%;
                left: 26%;
              }
            }
            .header-img {
              width: 1.3rem;
              height: 1.3rem;
              border-radius: 50%;
              background: #eee;
              margin: 0 0.55rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        li:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
