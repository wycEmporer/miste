<template>
	<div class="o-wrapper">
		<div class="offer">
			<head-top class="header">
				<i slot="left" class="iconfont icon-back"></i>
				<span slot="title" class="title">{{heads.title}}</span>
				<i slot="right" class="sp iconfont icon-back"></i>
			</head-top>
			<div class="polyfill"></div>
			<div class="offer-cont" v-for="(item,index) in offers" v-show="item.use == 1" :key="index">
				<div class="offer-list" @click="jumpDetail(item)">
					<div class="offer-img">
						<img :src="item.url" alt="">
            <div class="img-cover space-between flex align-items-center">
              <span>{{item.title}}</span>
              <img v-if="!isShowNewSale(item.startDate) && item.businessType == 1" class="img_flight" :src="require('assets/images/offer/icon_plane.png')" alt="" name="">
              <img v-if="!isShowNewSale(item.startDate) && item.businessType == 2" class="img_hotel" :src="require('assets/images/offer/icon_hotel.png')" alt="" name="">
              <img v-if="isShowNewSale(item.startDate)" class="img_new" :src="require('assets/images/offer/icon_new.png')" alt="" name="">
            </div>
					</div>
					<div class="offer-info">
						<h2 v-text="item.alt"></h2>
					</div>
					<div class="offer-more ">
						<div class="rows flex space-between align-items-center">
							Valid till: {{getDate(item.endDate)}}
							<!-- <a @click="jumpDetail(item)">View Detail</a> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import { User } from "../../models/user";
import { Indicator } from "mint-ui";

export default {
  components: {
    headTop
  },
  data() {
    return {
      heads: {
        img: require("../../assets/images/prevs.png"),
        title: "Offers"
      },
      offerCont: [
        {
          img: require("../../assets/images/offer/Offers_07.png"),
          tit1: "Invite your Friends By our Eeferral Program",
          tit2: "Earn UP to RS. 9000",
          timer: "2017.06.30-2017.7.31",
          href: "/wallet"
        }
      ],
      offers: [],
      startTime: "",
      endTime: "",
      imgUrl: "",
      model: 0,
      months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    };
  },
  methods: {
    jumpDetail(item){
      if(item.href.indexOf('offers/') > -1){
        window.location.href = item.href.indexOf('/') == 0 ? item.href : '/'+item.href;
        return;
      }
      this.$router.push(item.href);
    },
    getDate(nd) {
      var d = nd.split("-")[2];
      var m = this.months[nd.split("-")[1] - 1];
      var y = nd.split("-")[0];
      return d+ "," + m + " " + y;
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
      this.getADVlist();
    },
    getADVlist() {
      var parm = "type=13&device=" + this.model;
      User.advList(this, parm).then(res => {
        if (res.success) {
          res.list.sort((a, b) => {
            return a.sort > b.sort;
          });
          this.offers = res.list;
          Indicator.close();
        }
      });
    },
    isShowNewSale(who){
      let u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var d = who.split("-")[2];
      var m = who.split("-")[1];
      var y = who.split("-")[0];
      let startTime;
      let nowTime = new Date().getTime();
      let dT  = 7 * 60 * 60 * 24 * 1000;
      if(isiOS){
        startTime = new Date(y+"/"+m+"/"+d).getTime();
      }else{
        startTime = new Date(who).getTime();
      }
      if(nowTime - startTime < dT){
        return true;
      }else{
        return false;
      }
    }
  },
  mounted() {
    Indicator.open({
      spinnerType: "fading-circle"
    });
    this.checkType();
  }
};
</script>
<style lang="less" scoped>
.noOffer {
  text-align: center;
  padding: 0 0.64rem;
  p {
    font-size: 0.64rem;
  }
}

.offer {
  background-color: #efeff4;
  height: 100%;
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
  .polyfill {
    width: 100%;
    height: 2.68rem;
  }

  .offer-cont {
    padding: 0 0.64rem 0.5rem; // background: #efeff4;
    .offer-list {
      background-color: #fff; // border-radius: 0.4rem;
      border-radius:10px;
      box-shadow:0 1px 10px #aaa;
    }
    .offer-img {
      height:6.4rem;
      position: relative;
      .img-cover{
        width:100%;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.4);
        span{
          float: left;
          color:#fff;
          font-size:0.64rem;
          padding-left: 0.64rem;
          padding-top: 0.32rem;
          padding-bottom: 0.32rem;
        }
        .img_flight{
          margin-right: 0.64rem;
          width:0.854rem;
          height:0.427rem;
        }
        .img_hotel{
          width:0.598rem;
          height:0.556rem;
          margin-right: 0.64rem;
        }
        .img_new{
          width:2.7rem;
          height:1.3rem;
        }
      }
      img {
        width: 100%;
        height:100%;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
      }
    }
    .offer-info {
      padding:0.327rem 0.64rem 0.2rem;
      text-align: left;
      h2 {
        font-size: 0.641rem;
        color: #111;
        text-align: left;
        line-height: 0.769rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .offer-more {
      padding: 0 0.64rem 0.4rem;
      text-align: left;
      color:#999;
      font-size: 0.512rem;
      line-height: 0.769rem;
    }
  }
}
</style>