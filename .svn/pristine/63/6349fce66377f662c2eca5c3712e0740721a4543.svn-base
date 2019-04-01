<template>
	<div class="wrapper flex">
		<div class="ticket">
			<div class="ticket-head flex">
				<div class="logo"></div>
				<div class="timer">
					<span>{{orders[0]&&orders[0].voyageinfo[0].fn.an}}</span>
					<span>{{orders[0]&&orders[0].voyageinfo[0].fn.slice(0,2)}} {{orders[0]&&orders[0].voyageinfo[0].fn.slice(2)}}</span>
				</div>
			</div>
			<div class="ticket-cont">
				<ticket-detail :orders="orders"></ticket-detail>
				<div class="passenger">
					<div class="passenger-list">
						<div class="tit">
							<span>Passenger name</span>
						</div>
						<div class="cont" v-for="(item, key) in traveller" :key=key>
							<span>{{item.name.split("/")[0]+" "+item.name.split("/")[1]}}</span>
						</div>
					</div>
				</div>
				<div class="saoma">
					
				</div>
			</div>	
		</div>
	</div>	
</template>
<script>
import ticketDetail from './child/detail.vue'
	export default{
		components:{
			ticketDetail
		},
		data(){
			return {
				orders:[]
			}
		},
		computed:{
			traveller(){
				return this.orders[0]&&this.orders[0].travellerinfo
			}
		},
		mounted(){
			this.orders=this.$store.getters.orderDetail;
		}
	}
</script>
<style lang='less' scoped>
	.wrapper{
		justify-content:center;
		align-items:center;
		background-color:#000;
	}
	.ticket{
		width:100%;
		padding:0 0.68rem;
		.ticket-head{
			height:1.8rem;
			line-height:1.8rem;
			background-color:#fff;
			border-radius:0.8rem;
			justify-content:space-between;
			padding:0.2rem 0.68rem;
			margin-bottom:-0.1rem;
			.logo{
				width:6rem;
				height:1.7rem;
				padding-left:0.4rem;
				background:url('../../assets/images/ticket/logo.png') center no-repeat;
				background-size:5.6rem;
			}
			.timer{
				padding-top:0.2rem;
				span{
					height:0.68rem;
					line-height:0.68rem;
					display:block;
					font-size:0.56rem;
					color:#333;
				}
			}
		}
		.ticket-cont{
			background-color:#fff;
			border-radius:0.6rem;
		}
		.ticket-cont{
			.passenger{
				padding:0 0.68rem;
				.passenger-list{
					text-align:left;
					padding:0.2rem 0.4rem;
					span{
						padding:0.2rem 0;
					}
					.tit{
						font-size:0.6rem;
						color:#666;
					}
					.cont{
						font-size:0.68rem;
						color:#333;
					}
				}
			}
		}
		.saoma{
			height:2.8rem;
		}
	}
</style>