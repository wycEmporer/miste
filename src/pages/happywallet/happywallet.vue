<template>
	<div class="wrapper">
		<div class="container">
			<head-top class="header">
				<i slot="left" class="prev iconfont icon-back"></i>
				<div slot="title" class="title">Happy Wallet</div>
				<i slot='right' class="sp iconfont icon-back"></i>
			</head-top>
			<div class="section1" :class="{marTop: contentMargin}">
				<div class="amoutForm">
					<div class="total-amount">
						<div class="top">
							<span>Total Amount</span>
						</div>
						<div class="bottom">
							<span>
								<span class="rs">Rs.</span>{{totalPrice}}</span>
						</div>

					</div>
					<ul class="flex align-items-center">
						<li class="hs-title">
							<span>Happy Silver</span>
						</li>
						<li class="hg-title">
							<span>Happy Gold</span>
						</li>
					</ul>
					<ul class="flex content-start">
						<li class="hs-content">
							<div class="hsBox">
								<span class="rs">Rs.</span>{{happySilver | formatDate}}
							</div>
						</li>
						<li class="hg-content flex space-between">
							<div class="hgBox-r">
								<span>
									<span class="rs">Rs.</span>{{happyGold | formatDate}}</span>
								<span>Balance available for transfer-to-bank- account
									<span class="rs">Rs.</span>{{goldRecharge}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="cashback-info">
				<div class="cashback-tips" @click="cashShow = !cashShow">
					<p>Additionally,
						<span class="cl">
							<span class="rs">.Rs</span>{{cashInfo.total}}</span> will be activated and added into your Happy Gold balance within one hour once you complete your order payment. Happy Gold rewards are not available for transfer-to-bank-account option.</p>
					<p>The "rewards" are referring to top-up rewards, gift, referral program and other ad hoc promotional events etc.</p>
					<p>Click here to check your cashback income details.</p>
					<img src="../../assets/images/happywallet/bottom-arrow.png" ref="img" :class="{rotate:imgStatus}" @click="changeImgStatus()">
				</div>
				<div class="cashback-list" v-show="cashShow">
					<ul class="title flex space-between align-items-center">
						<li>
							<span>Income Date</span>
						</li>
						<li>
							<span>Type</span>
						</li>
						<li>
							<span>Balance</span>
						</li>
						<li>
							<span>Active Date</span>
						</li>
					</ul>
					<ul class="title co flex space-between align-items-center" v-for=" (item, i) in cashInfo.list" :key=i>
						<li>
							<span>
								{{cashbackOridate(item)}}
							</span>
						</li>
						<li>
							<span>Cashback</span>
						</li>
						<li class="flex" style="justify-content:center;">
							<span class="rs">Rs.</span>{{item.amount}}
						</li>
						<li>
							{{cashbackModdate(item)}}
						</li>
					</ul>
				</div>
			</div>
			<div class="section2">
				<div class="content">
					<div class="text">
						<p>
							Happy Wallet is your personal Travel Currency. You can save on your travel bookings by using Happy Wallet.
						</p>
						<p>
							Unless specified, the term ‘Happy Wallet’ means Happy Gold & Happy Silver. 1 e-cash of Happy Wallet = INR 1
						</p>
						<a class="yellow" @click="$router.push('/wallet/rules')">Know more</a>
					</div>
					<div class="btn flex space-between">
						<a class="yellow " v-show="contentMargin" href="javascript:;" @click="$router.push( '/top-up') ">Top-up</a>
						<a class="yellow " v-show="contentMargin" href="javascript:;" @click="$router.push( '/withdraw') ">Transfer-to-bank</a>
					</div>
				</div>
			</div>
			<div class=" section3 ">
				<h2 class="green ">Happy Wallet</h2>
				<div class="silver ">
					<h3>Happy Silver</h3>
					<p>
						Happy Silver can be used to deduct the difference of Member Price on Flight Booking. It can be earned through promotional activities: cashback, voucher code redemption, etc.
					</p>
					<a class="yellow " @click="showSilver = !showSilver">Know More</a>
					<div class="text" v-show="showSilver">
						<ul>
							<li>
								<p>* Now you will get Rs. 2000 instantly when you sign-up on PC or Mobile Site.</p>
							</li>
							<li>
								<p>* It will be valid immediately after you get it and will last for three calendar months.</p>
							</li>
						</ul>
						<h4>Guidelines for using Happy Silver</h4>
						<!-- <p>Happy Silver can be used for flight booking as per the following rules:</p> -->
						<ul>
							<li>
								<p>1. Registered member get special discount on happy Silver in their wallet on every Flight booking.</p>
							</li>
							<li>
								<p>2. Happy Silver cannot be used with other promotional offers simultaneously.</p>
							</li>
							<li>
								<p>3. Happy Silver can be earned only through promotional activities.</p>
							</li>
							<li>
								<p>4. Happy Silver can’t be transfered to the bank.</p>
							</li>
						</ul>
					</div>
				</div>
				<div class="gold ">
					<h3>Happy Gold</h3>
					<p>
						Happy Gold can be earned by Cancellation & Refund, Promotional activities and Cashback.
					</p>
					<a class="yellow " @click="showGold = !showGold">Know More</a>
					<div class="text" v-show="showGold">
						<ul>
							<li>
								<p>* It has no usage limits or expiry date.</p>
							</li>
							<li>
								<p>* Open from 2nd Feb: Transfer-to-bank option will be available to Cashback amount from your Wallet.</p>
							</li>
							<li>
								<p></p>
							</li>
						</ul>
						<h4>Guidelines for using Happy Gold</h4>
						<!-- <p>Happy Gold can be used for flight booking as per the following rules:</p> -->
						<ul>
							<li>
								<p>1. Happy Gold can be used for fight booking like real cash.</p>
							</li>
							<li>
								<p>2. While booking through Happy Gold, user is not eligible for any benefits provided by Banks.</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="section4 ">
				<div class="btn flex space-between ">
					<a :class="{selec:isChooseB} " @click="isChooseB= true ">Happy Gold</a>
					<a :class="{selec:!isChooseB} " @click="isChooseB= false ">Happy Silver</a>
				</div>
				<div class="detail ">
					<div v-show="!isChooseB ">
						<ul class="title ">
							<li class="flex space-between ">
								<span>Date</span>
							</li>
							<li class="flex space-between ">
								<span>Type</span>
							</li>
							<li class="flex space-between " style="width:20%;">
								<span>Amount</span>

							</li>
							<li class="flex space-between " style="width:30%;">
								<span>Balance</span>
							</li>
						</ul>
						<ul v-for="silver in silverList " :key="silver.id ">
							<li class="flex space-between ">
								<span>{{silverOrderDate(silver)}}</span>
							</li>
							<li class="flex space-between " :class="{moreChild:silver.typeString.split(' ').length >= 2}" >
								<span>{{silver.typeString.split(' ')[0]}}</span>
                <span v-if="silver.typeString.split(' ').length >= 2">{{silver.typeString.split(' ')[1]}}</span>
							</li>
							<li class="flex space-between " style="width:20%;">
								<p class="green ">
									<span class="rs ">Rs.</span>{{silver.amount | formatDate}}</p>
							</li>
							<li class="flex space-between " style="width:30%;">
								<p v-if="silver.balance">
									<span class="rs ">Rs.</span>{{silver.balance | formatDate}}</p>
							</li>
						</ul>
					</div>
					<div v-show="isChooseB ">
						<ul class="title ">
							<li>
								<span>Date</span>
							</li>
							<li>
								<span>Type</span>
							</li>
							<li style="width:20%;">
								<span>Amount</span>

							</li>
							<li style="width:30%;">
								<span>Balance</span>
							</li>
						</ul>
						<ul v-for="gold in goldList " :key="gold.id ">
							<li>
								<span>{{goldOrderDate(gold)}}</span>
							</li>
							<li :class="{moreChild:gold.currencyTypeString.split(' ').length >= 2}" >
                <span style="display:block;">{{gold.currencyTypeString.split(' ')[0]}}</span>
                <span v-if="gold.currencyTypeString.split(' ').length >= 2">{{gold.currencyTypeString.split(' ')[1]}}</span>
							</li>
							<li style="width:20%;">
								<p class="green ">
									<span class="rs">Rs.</span>{{gold.amount}}</p>
							</li>
							<li style="width:30%;">
								<p v-if="gold.balance">
									<span class="rs">Rs.</span>{{gold.balance}}</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import {Indicator } from "mint-ui";
import { TimeFormatUtil, OrderStatusUtil } from "../../models/utils";
import { DomainManager } from "../../config/DomainManager";
import { User } from "../../models/user";
import { Silver, Gold } from "../../models/discount";
import * as types from "../../vuex/types/types.js";
import * as XUser from "../../vuex/models/user/XUser.js";
import { CookieUtil } from "../../models/utils";
import {AppBridge} from '../../models/appbridge/appbridge.js';

export default {
  components: {
    headTop
  },
  data() {
    return {
      contentMargin:true,
      isChooseB: true,
      silverRunning: null,
      goldRunning: null,
      cashInfo: {
        total: 0,
        list: null
      },
      cashShow: false,
      showSilver: false,
      showGold: false,
      rechargeGold: 0,
      imgStatus: false,
      happySilver: 0,
      happyGold: 0,
      goldRecharge: 0
    };
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (to.path.indexOf("/bridge") > -1) {
      try {
        window.heg.nativeBack();
      } catch (e) {}
    }
    next();
  },
  methods: {
    changeImgStatus() {
      this.imgStatus = !this.imgStatus;
    },
    silverOrderDate(silver) {
      return TimeFormatUtil.getWalletDate(silver.creattime);
    },
    cashbackOridate(list) {
      return TimeFormatUtil.getWalletDate(list.lastModifiedTime);
    },
    cashbackModdate(list) {
      if(list.effectiveDate){
        return TimeFormatUtil.getWalletDate(list.effectiveDate);
      }else{
        return '-';
      }
    },
    silverWalletType(silver) {
      return OrderStatusUtil.getSilverType(silver.typeString);
    },
    goldOrderDate(gold) {
      return TimeFormatUtil.getWalletDate(gold.createTime);
    },
    goldWalletType(gold) {
      return OrderStatusUtil.getGoldType(gold.currencyType);
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return arr[2];
      else return null;
    },
    goWallet() {
      Indicator.open({ spinnerType: "fading-circle" });
      let self = this;
      Promise.all([
        Silver.getSilverPrice(this),
        Gold.getGoldPrice(this),
        Silver.getSilverRunningNew(this),
        Gold.getGoldRunningNew(this),
        User.searchCashBack(this)
      ]).then(
        res => {
          Indicator.close();
          let silverState = {
            happySilverBalance: res[0].balance,
            happySilverRunning: res[2]
          };
          let goldState = {
            happyGoldBalance: res[1].happyGoldBalance,
            happyGoldRunning: res[3],
            happyGoldRechargeBalance: res[1].happyRechargeBalance
          };
          let cashbackState = {
            total: res[4].data.amount,
            list: res[4].data.record
          };
          this.goldRecharge = res[1].happyRechargeBalance;
          this.happyGold = res[1].happyGoldBalance;
          this.happySilver = res[0].balance;

          this.silverRunning = res[2];
          this.goldRunning = res[3];
          this.cashInfo = cashbackState;

          self.$store.commit(types.GET_SILVER, silverState);
          self.$store.commit(types.GET_GOLD, goldState);
          sessionStorage.setItem("silver", JSON.stringify(silverState));
          sessionStorage.setItem("gold", JSON.stringify(goldState));
          sessionStorage.setItem("cashback", JSON.stringify(cashbackState));
        },
        err => {
          Indicator.close();
          console.log(err);
        }
      );
    },
    ifVerified() {
      User.checkAuthen(this).then(res => {
        return res.success ? true : false;
      });
    },
    goTopup() {
      this.ifVerified
        ? this.$router.push("/recharge")
        : this.$router.push("/verification");
    },
    goWithdraw() {
      this.ifVerified
        ? this.$router.push("/withdraw")
        : this.$router.push("/verification");
    }
  },
  computed: {
    totalPrice() {
      let total = (this.happySilver + this.happyGold).toFixed(2);
      return total;
    },
    silverList() {
      return this.silverRunning && this.silverRunning.list;
    },
    goldList() {
      return this.goldRunning && this.goldRunning.list;
    }
  },
  async created() {
    this.contentMargin = await AppBridge.getNativeSource(this);
    
    if (!CookieUtil.hasItem("uuid")) {
      this.$router.push("/login");
    }
    this.goWallet();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.wrapper {
  font-family: "PingFangSC";
}

.header {
  background-color: #0b9d78;
  .title {
    color: #fff;
    font-size: 0.769rem;
  }
  .sp {
    opacity: 0;
  }
  i {
    display: block;
  }
}
.marTop{margin-top: 2.4rem;}
.section1 {
  table {
    font-size: 0.6rem;
    width: 100%;
    tr,
    td,
    th {
      border: 1px solid #333;
    }
    tr {
      width: 100%;
      th {
        text-align: center;
        height: 0.853rem;
        line-height: 0.853rem;
      }
      th:nth-child(1) {
        width: 30%;
      }
      th:nth-child(2) {
        width: 70%;
      }

      .tb2 {
        border: 0;
      }
    }
  }
  .amoutForm {
    .total-amount {
      .top {
        padding: 0 0.68rem;
        font-size: 0.64rem;
        text-align: left;
        height: 1.7rem;
        line-height: 1.7rem;
      }
      .bottom {
        padding: 0 0.68rem;
        text-align: center;
        color: #f65858;
        font-size: 1.28rem;
        height: 5.12rem;
        line-height: 5.12rem;
      }
    }
    ul {
      font-size: 0.68rem;
      .hs-title {
        width: 30%;
        height: 0.853rem;
        line-height: 0.853rem;
        border: 1px solid #999999;
        border-right: 0;
        border-bottom: 0;
      }
      .hg-title {
        width: 70%;
        height: 0.853rem;
        line-height: 0.853rem;
        border: 1px solid #999999;
        border-bottom: 0;
      }
      .hs-content {
        width: 30%;
        height: 2.98rem;
        line-height: 2.98rem;
        border: 1px solid #999999;
        border-right: 0;
      }
      .hg-content {
        width: 70%;
        height: 2.98rem; // line-height: 2.98rem
        border: 1px solid #999999;
        .hgBox-l,
        .hgBox-r {
          padding: 0.5rem 0;

          span:nth-child(2) {
            font-size: 0.512rem;
          }
        }
        .hgBox-r {
          // width: 50%;
          margin: 0 auto;
          span {
            padding-bottom: 0.2rem;
          }
        }
      }
    }
  }
  h2 {
    font-size: 0.68rem;
    color: #000;
    line-height: 1rem;
  }
  p {
    font-size: 0.6rem;
    color: #000;
  }
  .price1 {
    padding-top: 0.8rem;
  }
  .arrow {
    margin-top: 1rem;
    height: 1rem;
    .left,
    .right {
      border-bottom: 1px solid #ccc;
      height: 1rem;
      width: 20%;
      box-sizing: border-box;
    }
    .left {
      transform: rotateZ(150deg);
    }
    .right {
      transform: rotateZ(-150deg);
    }
  }
  .price2 {
    .silver,
    .gold {
      width: 50%;
    }
  }
}

.cashback-info {
  margin-top: 0.6rem;
  .cashback-tips {
    line-height: 1.5;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    background: #f8f8f8;
    .cl {
      color: red;
    }
    img {
      height: 0.5rem;
      padding: 0 0.5rem;
    }
    .rotate {
      // transition: 0.5s all;
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      /* IE 9 */
      -webkit-transform: rotate(180deg);
      /* Safari and Chrome */
      -o-transform: rotate(180deg);
      /* Opera */
      -moz-transform: rotate(180deg);
      /* Firefox */
    }
  }
  .cashback-list,
  .cashback-tips {
    font-size: 0.52rem;
    padding: 0.4rem 1.04rem;

    p {
      text-align: left;
      color: #999;
      padding-bottom: 0.3rem;
    }
  }
  .cashback-list {
    .title {
      border-bottom: 1px solid #ccc;
      height: 1.6rem;
      font-size: 0.6rem;
      li {
        width: 25%;
        text-align: center;
        font-size: 0.512rem;
        span {
          display: block;
        }
      }
    }
    .co {
      color: #999;
    }
  }
}

.section2 {
  background-color: #fff;
  padding: 0 0.68rem;
  border-bottom: 5px solid #ebebeb;
  .content {
    text-align: left;
    padding: 1rem 0.4rem 1rem;
    p {
      font-size: 0.52rem;
      color: #999;
      text-align: left;
      line-height: 0.769rem;
    }
    a {
      text-decoration: underline;
      font-size: 0.52rem;
    }
    .btn {
      padding-top: 1rem;
      a {
        display: block;
        width: 40%;
        padding: 0.3rem 0;
        border: 1px solid #ffa234;
        text-align: center;
        text-decoration: none;
        border-radius: 0.2rem;
      }
    }
  }
  .aside {
    position: absolute;
    width: 100%;
    top: -1rem;
    h2 {
      font-size: 0.68rem;
      color: #999;
      height: 1.92rem;
      line-height: 1.92rem;
      border-radius: 1rem;
      padding: 0 0.8rem;
      background-color: #fff;
      box-shadow: 0 2px 5px #ccc;
      .price {
        color: #ff0000;
      }
      .date {
        color: #666;
      }
    }
  }
}

.section3 {
  padding: 0 1.12rem;
  border-bottom: 5px solid #ebebeb;
  background-color: #fff;
  h2 {
    font-size: 0.68rem;
    padding: 0.28rem 0 0.68rem;
  }
  .silver,
  .gold {
    border-top: 1px solid #ccc;
    text-align: left;
    padding-bottom: 0.4rem;
    .text {
      ul {
        padding-bottom: 0.42rem;
      }
    }
    h3 {
      text-align: left;
      font-size: 0.6rem;
      color: #666;
      font-weight: normal;
      padding: 0.4rem 0;
    }
    h4 {
      font-size: 0.512rem;
      font-weight: bold;
      color: #0b9d78;
    }
    p {
      text-align: left;
      font-size: 0.52rem;
      line-height: 0.769rem;
      color: #999;
    }
    a {
      width: 3.4rem;
      padding-right: 0.4rem;
      font-size: 0.52rem;
      display: block;
      background: url("../../assets/images/wallet/HappyWallet_03.png") right
        center no-repeat;
      background-size: 0.52rem;
    }
  }
}

.section4 {
  margin: 0.4rem 0.68rem;
  padding: 0.4rem;
  background-color: #fff;
  border-radius: 0.2rem;
  .selec {
    background-color: #0b9d78;
    color: #fff !important;
  }
  .btn {
    width: 10.68rem;
    height: 1.276rem;
    border: 1px solid #0b9d78;
    border-radius: 2px;
    margin: 0 auto;
    a {
      width: 50%;
      height: 100%;
      font-size: 0.52rem;
      color: #333;
      line-height: 1.276rem;
      text-align: center;
      display: block;
    }
  }
  .detail {
    padding-top: 1rem;
    ul {
      display: flex; // justify-content: space-between;
      border-bottom: 1px solid #ccc;
      & > li {
        justify-content: center;
        font-size: 0.512rem;
        color: #999;
        // height: 1.6rem;
        line-height: 1.6rem;
        width: 25%;
      }
      .moreChild{
        line-height:0.8rem;
      }
    }
  }
}
</style>