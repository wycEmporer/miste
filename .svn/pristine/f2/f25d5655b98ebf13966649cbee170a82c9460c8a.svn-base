<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" class="title">Referral Program</div>
			<i slot="right" alt="" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="top" :class="{marTop: contentMargin}">
        <img :src="mUrl" :alt="mAlt" :title="mTitle">
      </div>
			<div class="section1">
				<h2>Terms And Conditions</h2>
				<div class="line"></div>
				<p>
					&bull; <span>The Referral Program is valid for registered users.</span> 
				</p>
				<p>
					&bull; <span>There is no upper limits on referral reward.</span> 
				</p>
				<p>
					&bull; <span>Only when your friend signs up by using your inviting code can you get the relative referral reward.</span> 
				</p>
				<p>
					&bull; <span>Total Rewards earned from referral program will be credited into your Happy Wallet account.</span> 
				</p>
				<p>
					&bull; <span>HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of Anniversary Offer, or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior notice.</span> 
				</p>
				<p>
					&bull; <span>All other standard T&C available at HappyEasyGo.com shall apply.</span> 
				</p>
				<p>
					&bull; <span>Any disputes arising out of this offer shall be subject to the exclusive jurisdiction of competent courts in Gurgaon, Haryana, India.</span> 
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from "../../../components/head/head.vue";
import { CookieUtil } from "../../../models/utils";
import { User } from "../../../models/user";
export default {
  components: {
    headTop
  },
  data() {
    return {
      showListA: false,
      showListB: false,
      showListC: false,
      showListD: false,
      mUrl: "",
      mAlt: "",
      mTitle: "",
      model: 0,
      contentMargin:true,
    };
  },
  created() {
    try {
      let deviceObj =
        typeof window.heg.getNativeSource() === "string"
          ? JSON.parse(window.heg.getNativeSource())
          : window.heg.getNativeSource();
      this.contentMargin =
        Number(deviceObj.deviceType) == 1 && !deviceObj.deviceNative;
    } catch (e) {}
    this.getImg();
  },
  methods: {
    getImg() {
      let parmTop = "type=13&device=" + this.model + "&addr=referral&businessType=1";
      User.advList(this, parmTop)
        .then(res => {
          if (res.success) {
            this.mUrl =
              res.list[0].landingPageUrl == null
                ? ""
                : res.list[0].landingPageUrl;
            this.mAlt =
              res.list[0].landingPageAlt == null
                ? ""
                : res.list[0].landingPageAlt;
            this.mTitle =
              res.list[0].landingPageTitle == null
                ? ""
                : res.list[0].landingPageTitle;
          }
        })
        .catch(err => {
          console.log(err.msg);
        });
    }
    // goWallet() {
    //   if (!CookieUtil.hasItem("uuid")) {
    //     this.$router.push("/happywallet");
    //   } else {
    //     this.$router.push("/login");
    //   }
    // }
  }
};
</script>
<style lang='less' scoped>
.wrapper {
  background: #ebebeb;
  letter-spacing: 0.3px;
}

.header {
  // background: url("../../../assets/images/referral/info_head_top.png") top no-repeat;
  background: #0b9d78;
  .title {
    line-height: 2.04rem;
    font-size: 0.768rem;
    color: #fff;
  }
  .sp {
    opacity: 0;
  }
}

.top {
  font-size: 0;
  img {
    width: 100%;
  }
}
.marTop{
  margin-top: 2rem;
}

.section1:before {
  content: "";
  display: table;
}

.section1,
.section2 {
  padding: 0.4rem 0.68rem;
  background-color: #fff;
  h2 {
    font-size: 0.597rem;
    height: 1.2rem;
    line-height: 1.2rem;
    color: #0b9d78;
  }
  .line {
    width: 12%;
    margin: 0 auto;
    border-bottom: 1px solid #0b9d78;
  }
  p {
		display: flex;
    font-size: 0.512rem;
    color: #666;
    line-height: 0.769rem;
    text-align: left;
		padding: 0.2rem 0;
		span{
			padding-left:0.4rem;
			word-wrap:break-word;
			text-align:justify;
		}
  }
  .fy {
    color: #ffad3d;
  }
}

.section1 {
  padding: 0 0.68rem 1rem 0.68rem;
}

.section2 {
  margin-top: 0.21rem;
  .list {
    background: url("../../../assets/images/referral/arrow_down.png") right
      center no-repeat; // background-size: 0.52rem;
    line-height: 1.2rem; // padding: 0.21rem 0;
    background-size: 0.5rem;
    border-bottom: 1px solid #d6d6d6;
  }
}
</style>