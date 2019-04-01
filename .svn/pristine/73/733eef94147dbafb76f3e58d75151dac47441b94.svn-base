<template>
	<div class="payment" :class="{timeout:!ispasetime}">
		<div class="content flex space-between">
			<div class="total">
				<span class="ta">Total booking amount</span>
				<!-- <div class="amount"> -->
				<span class="rs cl">Rs.</span>
				<span class="cl">{{orderDetail.fee.pp}}</span>
				<!-- </div> -->
			</div>
			<div class="makePayment">
				<a class="btn" id="creditPay" v-show="ispasetime" @click="toPay">Make payment</a>
			</div>
		</div>
	</div>
</template>
<script>
import { FlightOrder } from '../../../../models/flightorder'
import { Toast, Indicator } from 'mint-ui';
import { DomainManager } from '../../../../config/DomainManager'

export default {
	props: {
		ispasetime: {
			type: Boolean,
			default: true
		},
		orderDetail: {
			type: Object
		}
	},
	methods: {
			toPay(){
			let params = {
				orderId: this.orderDetail.orderid,
				phoneNo: this.orderDetail.cancatInfo
			};
			this.$router.push({name: 'choosepay', params});
    
		},
	}
}
</script>
<style lang="less" scoped>
.payment {
	width: 100%;
	background-color: #0b9d78; // padding:0.4rem 0.2rem;
	box-sizing: border-box;
	.content {
		padding: 0.3rem 0.4rem;
		justify-content: space-between;
		align-items: center;
	}
	.total {
		// line-height: 1.5;
		text-align: left;
		span {
			font-size: 0.52rem;
			color: #fff;
		}
		.ta {
			display: block;
		}
		.cl {
			margin: 0;
			color: #ffad3d;
			font-size: 0.85rem;
		}
		.amount {
			font-size: 0.68rem;
			font-weight: bold;
			color: #ffad3d;
			text-align: left;
			margin-top: 0.1rem;
			span {
				color: #ffad3d;
			}
		}
	}
	.makePayment {
		.btn {
			display: block;
			font-size: 0.6rem;
			color: #fff;
			padding: 0.4rem 0.4rem 0.4rem 1.2rem;
			border-radius: 2px;
			background: #ffad3d url('../../../../assets/images/order/paid_07.png') 0.4rem center no-repeat;
			background-size: 0.68rem;
		}
	}
}

.timeout {
	background-color: #999!important;
	display: none;
}
</style>