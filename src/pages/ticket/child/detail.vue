<template>
	<div class="ticketDetail">
		<div class="content" v-for="(item,index) in orders">
			<div class="citys flex">
				<div class="from-city">
					<div class="cityName">
						<span>{{item.voyageinfo[0].dc}}</span>
					</div>
					<div class="iataCode">
						<span>{{item.voyageinfo[0].ds}}</span>
					</div>
				</div>
				<div class="to-city">
					<div class="cityName">
						<span>{{item.voyageinfo[item.voyageinfo.length-1].ac}}</span>
					</div>
					<div class="iataCode">
						<span>{{item.voyageinfo[item.voyageinfo.length-1].as}}</span>
					</div>
				</div>
			</div>
			<div class="trip-detail flex">
				<div class="item">
					<span class="tit">Travel date</span>
					<span class="cont">{{
						TimeFormatUtil.getMonthDescription(new Date(item.voyageinfo[0].dt).getMonth())+" "+new Date(item.voyageinfo[0].dt).getDate()
					}}</span>
				</div>
				<div class="item">
					<span class="tit">Depart</span>
					<span class="cont">{{TimeFormatUtil.getDisplayHourAndMinute(new Date(item.voyageinfo[0].dt))}}</span>
				</div>
				<div class="item">
					<span class="tit">Arrive</span>
					<span class="cont">{{TimeFormatUtil.getDisplayHourAndMinute(new Date(item.voyageinfo[item.voyageinfo.length-1].at))}}</span>
				</div>
				<div class="item">
					<span class="tit">Duration</span>
					<span class="cont">{{item.voyageinfo[0].wdt}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {TimeFormatUtil} from'../../../models/utils'
	export default{
		props:{
			orders:{
				type:Array
			}
		},
		data(){
			return {
				TimeFormatUtil
			}
		},
		mounted(){

		}
	}
</script>
<style lang="less" scoped>
	.ticketDetail{
		padding:0 0.68rem;
		.content{
			padding:0.4rem;
			background-color:#fff;
			border-radius:0.6rem;
			border-bottom:1px solid #eee;
			.citys{
				justify-content:space-between;
				background:url('../../../assets/images/ticket/air.png') center no-repeat;
				background-size:1.8rem;
				.from-city{
					.cityName{
						line-height:1rem;
						padding-left:0.4rem;
						background:url('../../../assets/images/ticket/add.png') left center no-repeat;
						background-size:0.5rem;
						span{
							font-size:0.56rem;
							color:#017959;
						}
					}
					.iataCode{
						span{
							font-size:1.2rem;
							color:#000;
						}
					}
				}
				.to-city{
					text-align:right;
					.cityName{
						line-height:1rem;
						span{
							font-size:0.56rem;
							color:#017959;
						}
					}
					.iataCode{
						span{
							font-size:1.2rem;
							color:#000;
						}
					}
				}
			}
			.trip-detail{
				justify-content:space-between;
				.item{
					span{
						display:block;
						line-height:1rem;
					}
					.tit{
						font-size:0.56rem;
						color:#666;
					}
					.cont{
						font-size:0.68rem;
						color:#000;
					}
				}
				.item:nth-of-type(1){
					text-align:left;
				}
				.item:nth-of-type(4){
					text-align:right;
				}
			}
		}
	}
</style>