<template>
	<div class="fareRules">
		<head-top class="header">
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" class="title">Fare rules</div>
			<i slot="right" class="sp set iconfont icon-back"></i>
		</head-top>
		<div class="fare-cont">
			<div class="fare-fee">
				<h2>Cancellation Fee</h2>
				<div class="fare-fee-info">

					<div class="flex space-between">
						<span>Airline fee&amp;HappyEasyGo fee</span>
						<span>
							<i class="rs">Rs.</i>{{rebookinfo}}</span>
					</div>
				</div>
			</div>
			<div class="fare-fee">
				<h2>Change Flight Fee</h2>
				<div class="fare-fee-info">

					<div class="flex space-between">
						<span>Included Airline &amp;HappyEasyGo Fee</span>
						<span>
							<i class="rs">Rs.</i>{{refundinfo}}</span>
					</div>
				</div>
			</div>
			<div class="note">
				<h2>Note:</h2>
				<p>Happyeasygo will stop accepting cancellation /change request
					<span>4 hours</span> before flight departure </p>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import Toast from 'mint-ui/lib/toast';
import { FlightOrder } from '../../../models/flightorder'
import { GetFlightOrderUtil } from '../../../models/utils'
export default {
	components: {
		headTop
	},
	data() {
		return {
			rebookinfo: "",
			refundinfo: ""
		}
	},
	computed: {
		flightOrder() {
			let order = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
			return order
		}
	},
	mounted: function() {
		console.log(this.$route.query)
		let flightNo = this.$route.query.flightNo;
		let departTimeStamp = this.$route.query.departTimeStamp;
		let averagePrice = this.$route.query.averagePrice;
		let refundable = this.$route.query.refundable;
		FlightOrder.getFareRule(flightNo, departTimeStamp, averagePrice, refundable, this).then(res => {
			this.rebookinfo = res.rebookinfo
			this.refundinfo = res.refundinfo
		}, (error) => {
			Toast(error)
		})
	}
}
</script>
<style lang="less" scoped>
.fareRules {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 10;
	overflow: scroll;
	.header {
		background: #0b9d78;
		i {
			padding: 0 0.64rem;
			color: #fff;
		}
		.title {
			line-height: 2.04rem;
			font-size: 0.769rem;
			color: #fff;
		}
		.sp {
			opacity: 0;
		}
	}
	.fare-cont {
		height: 100%;
		padding: 0 0.68rem;
		background: #ffffff;
		.fare-fee {
			padding-top: 2.4rem;
			h2 {
				font-size: 0.68rem;
				color: #333;
				text-align: left;
				text-indent: 0.4rem;
				line-height: 1.8rem;
			}
			.fare-fee-info {
				background-color: #fff;
				border-radius: 0.4rem;
				padding: 0.4rem;
				div {
					span {
						font-size: 0.56rem;
						color: #999;
						height: 1.8rem;
						line-height: 1.8rem;
					}
				}
				div:nth-of-type(1) {
					border-bottom: 1px solid #eee;
				}
			}
		}
		.note {
			h2 {
				font-size: 0.68rem;
				color: #333;
				text-align: left;
				text-indent: 0.4rem;
				line-height: 1.8rem;
			}
			p {
				font-size: 0.56rem;
				color: #999;
				text-align: left;
				padding: 0 0.4rem;
				line-height: 0.68rem;
				span {
					font-size: 0.6rem;
					color: #000;
				}
			}
		}
	}
}
</style>