<template>
	<div class="complete_wrapper">
		<head-top class="head" :operate="returnTripList">
			<i slot="left" class="iconfont icon-back"></i>
			<div slot="title" class="title flex">
				<h2>{{departCity}}</h2>
				<div class="title-img">
					-
				</div>
				<h2>{{ariveCity}}</h2>
			</div>
			<i class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container" :class="{marTop:!showOrderBanner}">
			<order-share @showShareBox="showShareBox" v-show="showOrderBanner" :grabData="grabData"></order-share>
			<div>
				<flightInfo :orders="orders"></flightInfo>
				<bg></bg>
				<fareDetail :orders="orders" :fee="fee"></fareDetail>
			</div>
		</div>
		<share-dialog v-show="shareDialog" :shareDialog="shareDialog" :copyLink="copyLink" :shareText="shareText" @hideShareBox="hideShareBox"></share-dialog>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import orderShare from './base/order-share.vue'
import shareDialog from '../../grabcashback/child/share-dialog.vue'
import flightInfo from './base/flightInfo.vue'
import traveller from './base/traveller.vue'
import fareDetail from './base/fareDetail.vue'
import { Activity } from "../../../models/activity";
import { Toast } from 'mint-ui';
import bg from './base/bg.vue'
import { CookieUtil } from '../../../models/utils';
export default {
	components: {
		flightInfo,
		headTop,
		traveller,
		fareDetail,
		bg,
		orderShare,
		shareDialog,
	},
	data() {
		return {
			timer:null,
			orders: [],
			fee: '',
			copyLink:'',
			shareText:'',
			grabData:{},
			shareDialog:false,
      showOrderBanner:false,
      isGoBack:false,
		}
	},
	computed: {
		base() {
			let base = 0;
			for (let el of this.orders) {
				base += el.fare["Base Fare"];
			}
			return base;
		},
		taxes() {
			let taxes = 0;
			for (let el of this.orders) {
				taxes += el.fare["Taxes and Fees"];
			}
			return taxes;
		},
		convenience() {
			let convenience = 0;
			for (let el of this.orders) {
				convenience += el.fare["Convenience Fee"];
			}
			return convenience;
		},
		total() {
			return this.convenience + this.taxes + this.base;
		},
		departCity() {
			if (this.orders.length != 0) {
				return this.orders[0].voyageinfo[0].dc;
			}
		},
		ariveCity() {
			if (this.orders.length != 0) {
				return this.orders[0].voyageinfo[this.orders[0].voyageinfo.length - 1].ac;
			}
		}
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      vm.isGoBack = from.path == '/support';
    })
  },
	created() {
		this.orders = JSON.parse(sessionStorage.getItem('orders'));
		this.fee = JSON.parse(sessionStorage.getItem('orderFee')).fee;
	},
	mounted() {
		let orderId = sessionStorage.getItem('orderId');
		Activity.grabOrderDetail(this,orderId).then(res=>{
			if(res.succ && res.data.status){
				this.grabData = res.data;
				this.copyLink = res.data.url;
				this.shareText = res.data.message;
				let href = (res.data.url).split('?')[1];
				this.$set(this.grabData,'href','/grab-activity?'+href);
				this.datetime_to_unix();
			}else{
				this.shareDialog = false;
				clearInterval(this.timer);
			}
		}).catch(err =>{
			console.log(err);
		})
	},
	methods: {
		returnTripList(){
      if(this.isGoBack){
        this.$router.go(-1);
        return;
      }
			if(CookieUtil.hasItem('uuid')){
				this.$router.push('/trip');
			}else{
				this.$router.push('/');
			}
		},
		showShareBox(){
      this.shareDialog = true;
    },
    hideShareBox(){
      this.shareDialog = false;
		},
		countDown(cha_timestamp){
			if(cha_timestamp <= 0){
				this.$set(this.grabData,'time','00h 00m 00s')
				this.shareDialog = false;
				this.showOrderBanner = false;
        clearInterval(this.timer);
      }else{
				this.showOrderBanner = true;
				var sy_day = parseInt(cha_timestamp/(3600*24));
				var sy_day2 = sy_day > 9?sy_day:'0' + sy_day;
				var sy_hour = parseInt((cha_timestamp-sy_day*3600*24)/3600);
				var sy2_hour = sy_hour > 9 ? sy_hour : '0' + sy_hour;
				var sy_hours = parseInt((cha_timestamp)/3600) > 9?parseInt((cha_timestamp)/3600):'0'+parseInt((cha_timestamp)/3600);
				var sy_min = parseInt((cha_timestamp-sy_hour*3600-sy_day*24*3600)/60);
				var sy2_min = sy_min > 9 ? sy_min : '0' + sy_min;
				var sy_miao = cha_timestamp-sy_day*3600*24-sy_hour*3600-sy_min*60;
				var sy2_miao = sy_miao > 9 ? sy_miao : '0' + sy_miao;
				this.$set(this.grabData,'time',sy_hours+'h '+sy2_min+'m '+sy2_miao+'s')
      }
    },
		getGMTtime(d){
      let loaclTime = d.getTime();
      let localOffset = d.getTimezoneOffset() * 60000;
      let utc = loaclTime + localOffset;
      let offset = 5.5;
      let bombay = utc + (3600000*offset);
      return parseInt(bombay/1000);
    },
    datetime_to_unix(){
			clearInterval(this.timer);
			let d = new Date(this.grabData.currentDate);
			let d2 = new Date(this.grabData.expiryDate);
			var timestamp_set = this.getGMTtime(d2);;
      var timestamp = this.getGMTtime(d);
			var cha_timestamp = timestamp_set-timestamp;
			this.countDown(cha_timestamp);
			this.timer = setTimeout(()=>{
				cha_timestamp--;
				this.countDown(cha_timestamp);
			},1000);
    }
	},
	beforeRouteLeave (to, from, next) {
    clearInterval(this.timer);
    next();
  }
}
</script>
<style lang="less" scoped>
.head {
	background: #0b9d78!important;
	.title {
		h2 {
			font-size: 0.768rem;
			color: #fff;
		}
		.title-img {
			width: 1.2rem;
			height: 2.04rem;
			line-height: 2.04rem;
			padding: 0 0.2rem;
			img {
				margin-top: 4px;
				width: 1rem;
			}
		}
	}
	.sp {
		opacity: 0;
	}
}
.complete_wrapper{
	.container>div {
		padding: 0 0.68rem .8rem;
	}
}
.marTop{margin-top:2.05rem;}
.fareDetail {
	background-color: #fff;
	border-radius: 0.4rem;
	margin-top: 0.4rem;
	h2 {
		font-size: 0.68rem;
		color: #333;
		text-align: left;
		padding: 0.4rem 0.4rem 0;
	}
	.fare-cont {
		background-color: #fff;
		border-radius: 0.4rem;
		padding: 0.4rem;
		.list,
		.total {
			font-size: 0.6rem;
			color: #333;
			height: 1.4rem;
			line-height: 1.4rem;
			span {
				text-align: left;
			}
		}
		.total {
			font-size: 0.768rem;
			color: #333;
			padding: 0.2rem 0rem;
		}
	}
}
</style>