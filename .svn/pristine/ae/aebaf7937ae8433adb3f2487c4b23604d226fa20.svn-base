<template>
	<div class="wrapper">
		<head-top class="header">
			<img slot="left" :src="require('../../../assets/images/flight-prev.png')" class="prev">
			<div slot="title" class="title">Cancel trip</div>
		</head-top>
		<div class="container">
			<div class="res">
				<div class="title">
					<h2>Select passengers to cancel</h2>
					<span>Fera rules</span>
				</div>
				<div class="fera-rules" v-for="(item,index) in orders" :key="index">
					<div class="rules-title">
						<span>{{item.voyageinfo[0].dc}}</span>
						<span class="rules-title-img"></span>
						<span>{{item.voyageinfo[item.voyageinfo.length-1].ac}}</span>
						<p>{{TimeFormatUtil.getOrderDetailDate(item.voyageinfo[0].dt)}} on {{item.voyageinfo[0].an}} {{item.voyageinfo[0].fn.slice(0,2)}} {{item.voyageinfo[0].fn.slice(2)}}</p>
					</div>
					<div class="passenger-info" v-for="(el,index) in item.travellerinfo" :key="index">
						<div class="passenger flex space-between align-items-center" 
						v-show="el.status!=0" 
						@click="selected(el,$event)">
							<div class="passengerLeft flex space-between align-items-center">
								<span class="round" :class="{selected:el.sex}"></span>
								<div class="passenger-name">
									<h2>
										<span :class="[{yellow:el.passengerType==1},{green:el.passengerType==2},{blue:el.passengerType==3}]">&bull;</span>
										{{el.ptype}} {{el.name.split('/')[0]}} {{el.name.split('/')[1]}}
									</h2>
									<h3>Status:{{OrderStatusUtil.getOrderStatus(item.ticketsinfo[(item.voyageinfo[0].fn)][0].status)}}</h3>
								</div>
							</div>
							<div class="passengerRight">
								<span>Total paid:</span>
								<span><i class="rs">Rs.</i>{{item.price | formatDate}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="cancel">
					<mt-button class="btn" type="default" @click="getCancel">Yes, cancel now</mt-button>
				</div>
				<div class="notCancel" v-show="false">
					<mt-button class="btn" type="default">I do not want to cancel</mt-button>
				</div>
			</div>	
		</div>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import {OrderStatusUtil,TimeFormatUtil,RefundUtil} from '../../../models/utils'
import {DomainManager} from '../../../config/DomainManager.js'
import {Toast,Indicator} from 'mint-ui';
	export default{
		components:{
			headTop
		},
		data(){
			return {
				TimeFormatUtil,
				OrderStatusUtil,
				DomainManager,
				TimeFormatUtil,
				RefundUtil,
				orders:[]
			}
		},
		methods:{
			selected(el){
				el.sex=!el.sex
				sessionStorage.removeItem('travellerId');
				sessionStorage.setItem('travellerId',JSON.stringify(el.travellerId));
			},
			gerQueryString(){
				return "tripId="+sessionStorage.getItem("id");
			},
			getCancel(){
				let isSelec = this.orders[0].travellerinfo.some((el)=>{
					return el.sex;
				})
				let isCancel = this.orders[0].travellerinfo.every((el)=>{
					return el.status == '0';
				})
				console.log(isSelec)
				if(isCancel){
					Toast({
					  message: 'Please select traveller',
					  duration: 2000
					})
				}else{
					if(!isSelec){
						Toast({
						  message: 'Please select traveller',
						  duration: 2000
						})
					}else{
						this.orders[0].travellerinfo.forEach((el,index)=>{
							if(!el.sex){
								this.orders[0].travellerinfo.splice(index,1);
							}
						})
						sessionStorage.removeItem('orders');
						sessionStorage.setItem('orders',JSON.stringify(this.orders));
						console.log(JSON.parse(sessionStorage.getItem('orders')))
						let url = DomainManager.getRefundUrl(this.gerQueryString());
						Indicator.open({
						  spinnerType: 'fading-circle'
						});
						RefundUtil.getRefundPrice(this,url).then((res)=>{
							Indicator.close();
							sessionStorage.removeItem("data");
							sessionStorage.setItem("data",res.data);
							this.$router.push('/canceltrip2');
						},(error)=>{
							Indicator.close();
							console.error(error);
						})
					}
				}
			}
		},
		mounted(){
			this.orders = JSON.parse(sessionStorage.getItem("orders"));
		}
	}
</script>
<style lang='less' scoped>
	.selected{
		border-color:#ffad3d!important;
		background:#ffad3d url('../../../assets/images/sure.png') center no-repeat;
		background-size:contain;
	}
	.header{
		background:#f7f7f8;
		border-bottom:1px solid #ccc;
		.title{
			line-height:2.04rem;
			font-size:0.768rem;
			color:#000;
		}
	}
	.container{
		padding:0 0.68rem;
	}
	.res{
		padding-top:2.6rem;
		.title{
			h2{
				font-size:0.68rem;
				color:#000;
			}
			span{
				font-size:0.68rem;
				color:#ffad3d;
				height:1.02rem;
				line-height:1.02rem;
			}
		}
		.fera-rules{
			.rules-title{
				font-size:0.6rem;
				color:#333;
				text-align:left;
				padding:0.68rem 0 0.2rem;
				.rules-title-img{
					width:1.2rem;
					height:0.68rem;
					background:url('../../../assets/images/ic-btn-one3.png') center no-repeat;
					background-size:0.6rem;
				}
				p{
					font-size:0.52rem;
					color:#ccc;
					padding:0.2rem 0;
				}
			}
		}
		.passenger-info{
			.passenger{
				margin-top:2px;
				background-color:#fff;
				padding:0.4rem;
				border-radius:4px;
				.passengerLeft{
					.round{
						width:0.6rem;
						height:0.6rem;
						border-radius:50%;
						border:1px solid #ccc;
					}
					.passenger-name{
						h2{
							font-size:0.68rem;
							text-align:left;
							span{
								font-size:0.8rem;
								padding:0 0.2rem 0 0.4rem;
							}
						}
						h3{
							font-size:0.5rem;
							color:#ccc;
							line-height:0.8rem;
							text-indent:0.8rem;
						}
					}
				}
				.passengerRight{
					margin-top:0.2rem;
					span:nth-child(1){
						font-size:0.5rem;
						color:#ccc;
					}
					span:nth-child(2){
						font-size:0.68rem;
						color:#333;
					}
				}
			}
		}
		.cancel,.notCancel{
			margin-top:3rem;
			.btn{
				width:11.2rem;
				height:1.36rem;
				font-size:0.68rem;
				color:#fff;
			}
		}
		.cancel .btn{
			background-color:#ffad3d;
		}
		.notCancel .btn{
			background-color:#0b9d78;
		}
	}

</style>
