<template>
	<div class="wrapper">
		<head-top class="header">
			<!-- <img slot="left" :src="heads.img" @click="goBack" alt=""> -->
			<i slot="left" class="iconfont icon-back"></i>
			<div slot="title" class="filte-title">{{heads.title}}</div>
			<div slot="right" @click="applyFilter" class="set">{{heads.right}}</div>
		</head-top>
		<transition enter-active-class="fadeIn" leave-active-class="fadeOut">
			<login class="animated" v-show="showLogin" @hideLog="hideLog"></login>
		</transition>
		<div class="container">
			<div class="con-wrapper">
				<div class="PriceRange">
					<div class="return-title flex space-between">
						<h2>Price Range</h2>
					</div>
					<div class="priceRangeCont">
						<mt-range v-model="PriceRange.rangeValue" :min="PriceRange.minPrice" :max="PriceRange.maxPrice" :step="PriceRange.step" :bar-height="PriceRange.barHeight">
							<div class="price-min" slot="start">
								<span class="rs">RS.</span>{{Math.round(PriceRange.minPrice/numberOfPeople) | formatDate}}</div>
							<div class="price-max" slot="end">
								<span class="rs">RS.</span>{{Math.round(PriceRange.rangeValue/numberOfPeople) | formatDate}}</div>
						</mt-range>
					</div>
				</div>
				<div class="stops">
					<div class="stops-title flex space-between">
						<h2>Stops</h2>
						<span @click="clearStops">Clear</span>
					</div>
					<div class="stops-cont flex content-start align-items-center">
						<div class="stop-option flex direction-column content-center align-items-center" @click="stopFilter(item)" :class="{active:selectedStopOptions.includes(item)}" v-for="(item,index) in stops" :key="index">
							<span class="stop-count">{{item.count}}</span>
							<span class="stop-info">{{item.info}}</span>
							<span v-show="false" class="stop-price"></span>
						</div>
					</div>
				</div>
				<div class="departure">
					<div class="return-title flex space-between">
						<h2>Departure from {{flightOrder.departAirport.iataCode}}</h2>
						<span @click="clearOneway">Clear</span>
					</div>
					<div class="departure-con flex space-between">
						<div class="departure-option oneWay" @click="oneTimeFilter(item)" :class="{active:selectedOneTimeOptions.includes(item),mr:index==(timeRangeOptionsOfRound.length-1)}" v-for="(item,index) in timeRangeOptionsOfRound" :key="index">
							<span class="departure-img">
								<img :src="item.img1" alt="">
							</span>
							<span class="departure-info">{{item.time}}</span>
							<span v-show="false" class="departure-price"></span>
						</div>
					</div>
				</div>
				<div class="departure" v-show="istrip">
					<div class="return-title flex space-between">
						<h2>Departure from {{flightOrder.destinationAirport.iataCode}}</h2>
						<span @click="clearRoundTrip">Clear</span>
					</div>
					<div class="departure-con flex">
						<div class="departure-option roundTrip" @click="roundTimeFilter(item)" :class="{active:selectedRoundTimeOptions.includes(item),mr:index==(timeRangeOptions.length-1)}" v-for="(item,index) in timeRangeOptions" :key="index">
							<span class="departure-img">
								<img :src="item.img1" alt="">
							</span>
							<span class="departure-info">{{item.time}}</span>
							<span v-show="false" class="departure-price"></span>
						</div>
					</div>
				</div>
				<div class="preferred">
					<div class="return-title flex space-between">
						<h2>Preferred Airliness</h2>
						<div>
							<span @click="reverse">Reverse</span>
							<span @click="clearAir">Clear</span>
						</div>
					</div>
					<div class="return-count">
						<div class="flight">
							<div v-for="(item, index) in localAirlines" :key="index" class="flight-options clear flex space-between" :class=" {active: selectedAirlines.includes(item)}" @click="airlineFilter(item)">
								<div class="options-left">
									<div class="flight-ico">
										<img :src="item.iconPath">
									</div>
									<span>{{item.name}}</span>
								</div>
								<div class="options-right">
									<span v-show="false" class="price">{{item.price}}</span>
									<span class="choose"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import login from '../../login/login.vue'
import { OnewayOrder, RoundTripOrder } from '../../../models/flightorder'
import { Filter, OnewayFilter, RoundTripFilter, NonStopOption, MoreStopsOption, PriceRangeOption, TimeRangeOption, TimeItem } from '../../../models/filter'
import { AirlineManager } from '../../../models/airline'
import { Flight } from '../../../models/flight'
import * as XFlight from '../../../vuex/models/flight/XFlight.js'
import { GetFlightOrderUtil } from '../../../models/utils'
import { Coupon } from '../../../models/discount'
import { Indicator, Toast } from 'mint-ui';
import { mapMutations } from 'vuex';
import * as mutationNames from '../../../vuex/models/flightorder/MutationName.js'
let _localAirlines = AirlineManager.loadLocalAirlines()

export default {
	components: {
		headTop,
		login
	},
	props: {
		filter: {
			type: Filter
		},
		deaprtFlights: {
			type: Array
		},
		returnFlights: {
			type: Array
		}
	},
	data() {
		return {
			couponCode: '',
			coupon: null,
			selectedAirlines: [],
			selectedOneTimeOptions: [],
			selectedRoundTimeOptions: [],
			selectedStopOptions: [],
			stops: [
				{
					count: '0',
					info: 'Non-Stop',
					stopOptoins: new NonStopOption()
				},
				{
					count: '1+',
					info: 'Stops',
					stopOptoins: new MoreStopsOption()
				}
			],
			timeRangeOptions: [
				{
					img1: require('../../../assets/images/filter/ic-m21.png'),
					img2: require('../../../assets/images/filter/ic-m.png'),
					time: 'Before 6AM',
					timeRange: new TimeRangeOption(new TimeItem(0, 0), new TimeItem(6, 0))
				},
				{
					img1: require('../../../assets/images/filter/ic-z.png'),
					img2: require('../../../assets/images/filter/ic-z2.png'),
					time: '6AM-12PM',
					timeRange: new TimeRangeOption(new TimeItem(6, 0), new TimeItem(12, 0))
				},
				{
					img1: require('../../../assets/images/filter/ic-x.png'),
					img2: require('../../../assets/images/filter/ic-x2.png'),
					time: '12PM-6PM',
					timeRange: new TimeRangeOption(new TimeItem(12, 0), new TimeItem(18, 0))
				},
				{
					img1: require('../../../assets/images/filter/ic-w.png'),
					img2: require('../../../assets/images/filter/ic-w2.png'),
					time: 'After 6PM',
					timeRange: new TimeRangeOption(new TimeItem(18, 0), new TimeItem(24, 0))
				},
			],
			timeRangeOptionsOfRound: [
				{
					img1: require('../../../assets/images/filter/ic-m21.png'),
					img2: require('../../../assets/images/filter/ic-m.png'),
					time: 'Before 6AM',
					timeRange: new TimeRangeOption(new TimeItem(0, 0), new TimeItem(6, 0))
				},
				{
					img1: require('../../../assets/images/filter/ic-z.png'),
					img2: require('../../../assets/images/filter/ic-z2.png'),
					time: '6AM-12PM',
					timeRange: new TimeRangeOption(new TimeItem(6, 0), new TimeItem(12, 0))
				},
				{
					img1: require('../../../assets/images/filter/ic-x.png'),
					img2: require('../../../assets/images/filter/ic-x2.png'),
					time: '12PM-6PM',
					timeRange: new TimeRangeOption(new TimeItem(12, 0), new TimeItem(18, 0))
				},
				{
					img1: require('../../../assets/images/filter/ic-w.png'),
					img2: require('../../../assets/images/filter/ic-w2.png'),
					time: 'After 6PM',
					timeRange: new TimeRangeOption(new TimeItem(18, 0), new TimeItem(24, 0))
				},
			],
			isShow: false,
			isSelecA: false,
			isSelecB: false,
			showLogin: false,
			isChange: false,
			heads: {
				img: require('../../../assets/images/flight-prev.png'),
				title: 'Fliter',
				right: 'Apply'
			},
			PriceRange: {
				minPrice: 0,
				maxPrice: 40000,
				rangeValue: 40000,
				step: 100,
				barHeight: 5
			}
		}
	},
	methods: {
		goBack() {
			let flightType = sessionStorage.flightType;
			switch (flightType) {
				case 'one':
					this.$router.push('/oneway');
					break;
				case 'two':
					this.$router.push('/roundTrip');
					break;
			}
		},
		selectedOptions(obj, item) {
			if (obj.indexOf(item) == -1) {
				obj.push(item);
			} else {
				obj.forEach((el, idx) => {
					if (el == item) {
						obj.splice(idx, 1)
					}
				})
			}
			return obj;
		},
		radio1() {
			this.isSelecA = !this.isSelecA;
			if (this.isSelecA && this.isSelecB) {
				this.isSelecB = false;
			}
			if (!this.isSelecA) {
				this.$refs.coupon.disabled = true;
			} else {
				this.$refs.coupon.disabled = false;
			}

		},
		radio2() {
			this.isSelecB = !this.isSelecB;
			if (this.isSelecA && this.isSelecB) {
				this.isSelecA = false;
				this.$refs.coupon.disabled = true;
			}
		},
		sign() {
			this.showLogin = true;
		},
		hideLog() {
			this.showLogin = false;
		},
		stopFilter(item) {

			this.selectedOptions(this.selectedStopOptions, item);
		},
		roundTimeFilter(item) {

			this.selectedOptions(this.selectedRoundTimeOptions, item);
		},
		oneTimeFilter(item) {

			this.selectedOptions(this.selectedOneTimeOptions, item);
		},
		airlineFilter(item) {

			this.selectedOptions(this.selectedAirlines, item);
		},
		clearStops() {
			this.selectedStopOptions = [];
		},
		clearOneway() {
			this.selectedOneTimeOptions = [];
		},
		clearRoundTrip() {
			this.selectedRoundTimeOptions = [];
		},
		clearAir() {
			this.selectedAirlines = [];
		},
		closeFilter() {
			this.isShow = false;
		},
		reverse() {
			let _this = this;
			let arr = [];
			this.localAirlines.forEach((el, idx) => {
				this.selectedAirlines.forEach((item, i) => {
					if (Object.is(el, item)) {
						_this.selectedAirlines.splice(i, 1)
						arr.push(item)
					}
				})
				this.selectedAirlines.push(el)
			})
			arr.forEach((el, idx) => {
				this.selectedAirlines.forEach((item, i) => {
					if (Object.is(el, item)) {
						_this.selectedAirlines.splice(i, 1)
					}
				})
			})
		},
		getCoupon(flight) {
			let self = this;
			let arr = [];
			if (this.isSelecA && this.couponCode != '') {
				Coupon.getCoupon(self, self.couponCode)
					.then(res => {
						self.coupon = Coupon.buildCoupon(res);
						if (!self.isChange) {
							self.coupon.getDiscountPrice(self, flight)
							self.coupon.buildDiscount(self);
							Toast({
								message: 'Price has changed',
								duration: 1000
							});
							self.isChange = true;
							sessionStorage.setItem("couponCode", self.couponCode);
						}
					}).catch(err => {
						Toast({
							message: 'Sorry,coupon not found',
							duration: 1000
						});
						console.log(err);
					})
			}
		},
		applyFilter() {
			this.$props.filter.airlineOptions = this.selectedAirlines

			this.$props.filter.priceOption = new PriceRangeOption(0, this.PriceRange.rangeValue)

			let priceRange = new PriceRangeOption(this.PriceRange.minPrice, this.PriceRange.rangeValue)

			let flightArr = this.$store.getters.flightofall
			this.getCoupon(flightArr);
			if (sessionStorage.flightType == "one") {
				let newFlightArr = [];
				for (let i = 0; i < flightArr.length; i++) {
					let res = flightArr[i].getStopFlight(this.selectedStopOptions, priceRange, this.selectedOneTimeOptions, this.selectedAirlines)
					if (res) {
						newFlightArr.push(flightArr[i])
					}
				}

				this.$store.commit(XFlight.selsectAllFlight, newFlightArr);
			} else {
				if (this.type == 0) {
					let newFlightArr = [];
					for (let i = 0; i < flightArr.length; i++) {
						let res = flightArr[i].getStopFlight(this.selectedStopOptions, priceRange, this.selectedOneTimeOptions, this.selectedAirlines)
						if (res) {
							newFlightArr.push(flightArr[i])
						}
					}

					this.$store.commit(XFlight.selsectAllFlight, newFlightArr);
				} else {
					let newReturnFlightArr = [];

					let returnFlightArr = this.$store.getters.returnflightofall;

					this.getCoupon(returnFlightArr);

					for (let i = 0; i < returnFlightArr.length; i++) {
						let res = returnFlightArr[i].getStopFlight(this.selectedStopOptions, priceRange, this.selectedRoundTimeOptions, this.selectedAirlines)

						if (res) {
							newReturnFlightArr.push(returnFlightArr[i])
						}
					}
					this.$store.commit(XFlight.selsectReturnAllFlight, newReturnFlightArr)
				}
			}
			this.goBack();
		}
	},
	computed: {
		numberOfPeople() {
			let o = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
			return o.adults.length + o.children.length + o.infants.length;
		},
		flightOrder() {
			return this.$store.getters.flightOrder
		},
		localAirlines() {
			return _localAirlines
		},
		istrip() {
			if (this.flightOrder instanceof OnewayOrder) {
				return false;
			} else {
				return true;
			}
		},
		type() {
			return sessionStorage.roundType;
		}
	},
	mounted() {
		let flightArr = this.$store.getters.flightofall
		let returnArr = this.$store.getters.returnflightofall
		let flightArrMax = 0
		let flightArrMin = 0
		let i = flightArr.length - 1
		if (flightArr[i].realPrice > flightArr[0].realPrice) {
			flightArrMax = flightArr[i].realPrice
			flightArrMin = flightArr[0].realPrice
		} else {
			flightArrMax = flightArr[0].realPrice
			flightArrMin = flightArr[i].realPrice
		}
		if (returnArr != null && returnArr.length != 0) {
			let j = returnArr.length - 1
			let returnArrMax = 0;
			let returnArrMin = 0;
			if (returnArr[j].realPrice > returnArr[0].realPrice) {
				returnArrMax = returnArr[j].realPrice;
				returnArrMin = returnArr[0].realPrice;
			} else {
				returnArrMax = returnArr[0].realPrice;
				returnArrMin = returnArr[j].realPrice;
			}
			// if (returnArrMax > flightArrMax) {
			// 	this.PriceRange.maxPrice = returnArrMax
			// 	this.PriceRange.rangeValue = returnArrMax
			// } else {
			// 	this.PriceRange.maxPrice = flightArrMax
			// 	this.PriceRange.rangeValue = flightArrMax
			// }
			// if (returnArrMin > flightArrMin) {
			// 	this.PriceRange.minPrice = flightArrMin
			// } else {
			// 	this.PriceRange.minPrice = returnArrMin
			// }
			if (this.type == 0) {
				this.PriceRange.maxPrice = flightArrMax
				this.PriceRange.minPrice = flightArrMin
				this.PriceRange.rangeValue = flightArrMax
			} else {
				this.PriceRange.maxPrice = returnArrMax
				this.PriceRange.minPrice = returnArrMin
				this.PriceRange.rangeValue = returnArrMax
			}

		} else {
			this.PriceRange.maxPrice = flightArrMax
			this.PriceRange.minPrice = flightArrMin
			this.PriceRange.rangeValue = flightArrMax
		}
	}
}
</script>
<style lang="less" scoped>
.header {
	background: #17a27f;
	.sp {
		font-size: 0.8rem;
	}
}

.filte-title {
	line-height: 2.04rem;
	font-size: 0.769rem;
	color: #fff;
}

.mr {
	margin-right: 0!important;
}


.set {
	line-height: 2.04rem;
	font-size: 0.68rem;
	color: #fff;
	padding: 0 0.64rem;
}

.wrapper {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 20;
}

.container {
	overflow: auto;
	background-color: #fff;
}

.con-wrapper {
	background: #fff;
	padding-top: 2rem;
}


.stops {
	.stops-cont {
		padding: 0.68rem;
		.active {
			background-color: #fff5e9!important;
			border: 1px solid #ff9000!important;
			box-shadow: 0 0 5px #ff9000;
			span {
				color: #ffad3d!important;
			}
			.stop-price {
				border-top: 1px solid #ff9000!important;
			}
		}
		.stop-option {
			width: 3.2rem;
			height: 3.2rem;
			border-radius: 4px;
			padding: 0 0.36rem;
			margin-right: 0.6rem;
			border: 1px solid #ccc;
			cursor: pointer;
			span {
				display: block;
				color: #666;
			}
			.stop-count {
				font-size: 0.68rem;
				font-weight: bold;
				padding: 0.2rem 0;
			}
			.stop-info {
				font-size: 0.68rem;
				padding: 0.3rem 0;
			}
			.stop-price {
				font-size: 0.68rem;
				padding: 0.2rem 0;
				border-top: 1px solid #ccc;
			}
		}
	}
}

.departure {
	.departure-con {
		padding: 0.68rem;
		width: 100%;
		box-sizing: border-box;
		.active {
			background-color: #fff5e9!important;
			border: 1px solid #ff9000!important;
			box-shadow: 0 0 5px #ff9000;
			span {
				color: #ffad3d!important;
			}
			.departure-price {
				border-top: 1px solid #ff9000!important;
			}
		}
		.departure-option {
			// width: 4rem;
			border-radius: 4px;
			padding: 0 0.4rem;
			box-sizing: border-box;
			margin-right: 0.4rem;
			border: 1px solid #ccc;
			cursor: pointer;
			span {
				display: block;
			}
			.departure-img {
				padding-top: 0.2rem;
				text-align: center;
				img {
					width: 1.36rem;
					height: 1.36rem;
				}
			}
			.departure-info {
				font-size: 0.5rem;
				padding: 0.2rem 0;
			}
			.departure-price {
				font-size: 0.768rem;
				padding: 0.2rem 0;
				border-top: 1px solid #ccc;
			}
		}
	}
}

.preferred {
	.return-count {
		padding: 0.4rem 0.68rem;
		.flight {
			.flight-options {
				text-align: left;
				height: 1.28rem;
				width: 100%;
				margin-top: 0.68rem;
				cursor: pointer;
				.flight-ico {
					float: left;
					height: 1.28rem;
					line-height: 1.28rem;
				}
				span {
					float: left;
					display: block;
					line-height: 1.28rem;
					font-size: 0.68rem;
					margin-left: 1.28rem;
				}
				.choose {
					width: 1.53rem;
					height: 1.28rem;
					text-align: center;
				}
			}
			.active {
				background: url('../../../assets/images/filter/choose.png') right center no-repeat;
				background-size: 0.8rem;
			}
		}
	}
}

.stops,
.departure,
.preferred {
	background-color: #fff;
}

.PriceRange {
	background-color: #fff;
}

.stops-title,
.onward-title,
.return-title {
	height: 1.6rem;
	line-height: 1.6rem;
	padding: 0.2rem 0.68rem;
	cursor: pointer;
	border-bottom: 1px solid #ddd;
	div {
		line-height: 1.28rem;
		span {
			margin-top: -0.4rem;
		}
		span:nth-of-type(1) {
			margin-right: 0.4rem;
		}
	}
}

.stops-title h2,
.onward-title h2,
.return-title h2 {
	font-size: 0.6rem;
	color: #666;
}

.stops-title span,
.onward-title span,
.return-title span {
	color: #999;
	font-size: 0.58rem;
}

.PriceRange {
	.priceRangeCont {
		padding: 1.6rem 1rem 1rem;
	}
	.price-min,
	.price-max {
		font-size: 0.6rem;
		position: absolute;
		top: -1.4rem;
	}
	.price-max {
		right: 0;
	}
}
</style>
