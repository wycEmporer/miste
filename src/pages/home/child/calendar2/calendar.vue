<template>
	<div class="calendar-wrapper2 flex direction-column content-center">
		<head-top class="header" :operate="showHomePage">
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" id="header" class="title">Select Dates</div>
			<div slot="right" class="sp" @click='done'>Done</div>
		</head-top>
		<div class="calendar-con">
			<div class="marTop"></div>
			<calendar-input :limit="limit" :isSelected="isSelected" :lowPrice="lowPrice" :lowestPrice="lowestPrice" @getValue="getValue"></calendar-input>
		</div>
	</div>
</template>
<script>
	import headTop from 'components/head/head.vue'
	import calendarInput from './base/datepicker.vue';
	// import calendarInput from './base/datepicker2.vue';
	export default {
		components:{
			headTop,
			calendarInput
		},
		props:{
			limit:{
				type:Object
			},
			lowPrice:{
				type: Array
			},
			lowestPrice:{
				type: Array
			}
		},
		data(){
			return {
				timer:null,
				dateValue: new Date(),
				showCalendar:false,
				scrollTop:0,
				isSelected:false,
			}
		},
		methods:{
			showHomePage(){
				this.$emit('showHomePage');
			},
			getValue(dateValue){
				this.isSelected = false;
				let dateVal = dateValue.split('-');
				let y = dateVal[0];
				let m = dateVal[1];
				let d = dateVal[2];
				this.dateValue = new Date(y,m-1,d);
			},
			done(){
				this.isSelected = true;
				this.$emit('getVal',this.dateValue,this.showCalendar);
			}
		},
	}
</script>
<style lang="less">
	.calendar-wrapper2{
		position: absolute;
		top: 0;
		left: 0;
		z-index:21;
		.header{
			.head-title{
				margin-left: 1.3rem;
			}
			.user {
				margin-right: 0.3rem;
				.sp{
					height:1rem;
					padding:0 0.5rem;
					line-height: 1rem;
					color:#333;
					font-size: 0.634rem;
					background: #fff;
					border-radius:2px;
					cursor: pointer;
				}
			}
		}
		.calendar-con{
			background-color:#fff;
			.marTop{
				margin-top: 2.04rem;
			}
		}
	}
</style>