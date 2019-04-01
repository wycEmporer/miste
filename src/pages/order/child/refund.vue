<template>
	<div class="wrapper">
		<head-top class="head">
			<img slot="left" :src="require('../../../assets/images/flight-prev.png')" />
			<div slot="title" class="title flex">
				<h2>New Delhi</h2>
				<div class="title-img"></div>
				<h2>Bangalore</h2>
			</div>
		</head-top>
		<div class="container">
			<div>
				<flightInfo :orders="orders"></flightInfo>
				<traveller :orders="orders"></traveller>
				<fare-detail :orders="orders"></fare-detail>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import flightInfo from './base/flightInfo.vue'
import traveller from './base/traveller.vue'
import fareDetail from './base/fareDetail.vue'
export default {
	components: {
		flightInfo,
		headTop,
		traveller,
		fareDetail
	},
	data() {
		return {
			orders: null
		}
	},
	mounted() {
		// this.orders = this.$store.getters.orderDetail;
		this.orders = JSON.parse(sessionStorage.getItem('orders'));
		this.fee = JSON.parse(sessionStorage.getItem('orderFee')).fee;
	}
}
</script>
<style lang="less" scoped>
.head {
	background: #0b9d78!important;
	.title {
		h2 {
			font-size: 0.768rem;
			color: #000;
		}
		.title-img {
			width: 1.2rem;
			background: url('../../../assets/images/order/paid_02.png') center no-repeat;
			background-size: 1rem;
			padding: 0 0.2rem;
		}
	}
	.sp {
		opacity: 0;
	}
}

.container>div {
	padding: 2.4rem 0.68rem 0;
}
</style>