<template>
	<div class="calendar-wrapper flex direction-column content-center">
		<div class="calendar-con">
			<calendar-input :limit="limit" @getValue="getValue"></calendar-input>
			<div class="done">
				<a id="btn" @click='done'>Done</a>
			</div>
		</div>
	</div>
</template>
<script>
	import calendarInput from './base/datepicker.vue'
	export default{
		components:{
			 calendarInput
		},
		props:{
			limit:{
				 type:Object
			}
		},
		data(){
			return {
				dateValue: new Date(),
				showCalendar:false
			}
		},
		methods:{
			getValue(dateValue){
				let dateVal = dateValue.split('-');
				let y = dateVal[0];
				let m = dateVal[1];
				let d = dateVal[2];
				this.dateValue = new Date(y,m-1,d);
			},
			done(){
				this.$emit('getVal',this.dateValue,this.showCalendar);
			}
		}
	}
</script>
<style lang="less">
	.calendar-wrapper{
		height:100%;
		width:100%;
		position:fixed;
		z-index:30;
		.calendar-con{
			margin:0 0.68rem;
			padding:0.4rem;
			background-color:#fff;
			border-radius:0.4rem;
			.done{
				padding:0.4rem 0;
				a{
					font-size:0.52rem;
					color:#fff;
					background-color:#ffad3d;
					padding:0.4rem 1rem;
					border-radius:0.2rem;
				}
			}
		}
	}
</style>