<template>
	<div class="wrapper">
		<head-top>
			<img slot="left" :src="require('../../../assets/images/flight-prev.png')" class="prev">
			<div slot="title" class="title">Cancel trip</div>
		</head-top>
		<div class="container">
			<div v-for="(item,index) in orders" :key="index">
				<div class="canceltrip">
					<div class="cancel-tit">
						<div class="city">
							<span class="from">{{item.voyageinfo[0].dc}}</span>
							<span class="arive"></span>
							<span class="to">{{item.voyageinfo[item.voyageinfo.length-1].ac}}</span>
						</div>
						<p>{{TimeFormatUtil.getOrderDetailDate(item.voyageinfo[0].dt)}} on {{item.voyageinfo[0].an}} {{item.voyageinfo[0].fn.slice(0,2)}} {{item.voyageinfo[0].fn.slice(2)}}</p>
					</div>
					<div class="flight-info">
						<ul>
							<li class="flex content-start" v-for="(v,i) in item.voyageinfo" :key="i">
								<div class="flight-time flex space-between">
									<div class="flight-time-ico flex align-items-center">
										<img :src="ico[v.fn.slice(0,2)]" alt="">
									</div>
								</div>
								<div class="flight-time-info">
									<h2>{{TimeFormatUtil.getDisplayHourAndMinute(new Date(v.dt))}}-{{TimeFormatUtil.getDisplayHourAndMinute(new Date(v.at))}}</h2>
									<p>{{v.fn.slice(0,2)}}-{{v.fn.slice(2)}} &bull; {{v.wdt}}</p>
								</div>
								<div class="flight-price flex space-between" v-show="false">
									<div class="flight-price-detail">
										<h2 class="flex content-end"><i class="rs">Rs.</i><span>9377</span></h2>
									</div>
									<div class="flight-next"></div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="travelers">
					<h2>Travelers in this trip</h2>
					<div class="detail">
						<div class="detail-name flex align-items-center" v-for="(t,i) in item.travellerinfo" :key="i">
							<span class="round" :class="[{yellow:t.passengerType==1},{green:t.passengerType==2},{blue:t.passengerType==3}]">&bull;</span>
							<span class="name">{{t.ptype}} {{t.name.split('/')[0]}} {{t.name.split('/')[1]}}</span>
						</div>
						<div class="detail-price flex space-between" v-show="false">
							<span>Total paid: <i class="rs">Rs.</i>450457</span><span>Refund: <i class="rs">Rs.</i>450457</span>
						</div>
					</div>
					<div class="fareDetail">
						<h2>Fare details</h2>
						<div class="fare-cont">
							<div class="list flex space-between">
								<span>payment</span><span><i class="rs">Rs.</i>{{item.price | formatDate}}</span>
							</div>
							<div class="list flex space-between">
								<span>Airline&amp;HappyEasyGo Fee</span><span><i class="rs">Rs.</i>{{(item.price-refund) | formatDate}}</span>
							</div>
							<div class="total flex space-between">
								<span>Total refund</span>
								<span><i class="rs" v-show="refund!=0">Rs.</i>{{refund | formatDate}}</span>
							</div>
							<div class="notice">
								<p><span>Notice:</span>Thank you for submiting your refund request.We will credit the money backto the same payment instrument you used for mking the booking.</p>
							</div>
						</div>
					</div>
				</div>
				<div class="reason">
					<h2>Choose reason for cancellation</h2>
					<ul>
						<li v-for="(item,index) in reason" @click="idx=index" :key="index">
							<span class="round" :class="{selected:idx==index}" ></span>
							<span>{{item.text}}</span>
						</li>
					</ul>
				</div>
				<div class="comments">
					<h2>Comments &amp; Demands</h2>
					<textarea id="comment-text" cols="50" rows="5" placeholder="Please leave your comments and demands here..."></textarea>
				</div>
				<div class="cancel">
					<mt-button class="btn" type="default" @click="applyRefund">Yes, cancel now</mt-button>
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
import {TimeFormatUtil,RefundUtil} from '../../../models/utils'
import {DomainManager} from '../../../config/DomainManager.js'
import {Toast,Indicator} from 'mint-ui';

	export default {
		components:{
			headTop
		},
		data(){
			return {
				orders:[],
				TimeFormatUtil,
				RefundUtil,
				isSelec:false,
				idx:'-1',
				reason:[
					{
						text:'Flight cancelled / postponed'
					},
					{
						text:'My plans changed'
					}
				],
				ico:{
					"G8":require("../../../assets/images/G8.png"),
					"SG":require("../../../assets/images/SG.png"),
					"UK":require("../../../assets/images/UK.png"),
					"AI":require("../../../assets/images/IX.png"),
					"9W":require("../../../assets/images/9W.png"),
					"6E":require("../../../assets/images/6E.png"),
					"I5":require("../../../assets/images/I5.png")
				}
			}
		},
		computed:{
			refund(){
				return sessionStorage.getItem("data");
			},
			getQueryString(){
				return "tripId="+JSON.parse(sessionStorage.getItem("travellerId"));
			}
		},
		methods:{
			applyRefund(){
				Indicator.open({
				  spinnerType: 'fading-circle'
				});
				
				let url = DomainManager.getRefundsUrl(this.getQueryString);
				RefundUtil.applyForRefund(this,url).then((res)=>{
					Indicator.close();
					this.$router.push('/canceltrip3');
				},(error)=>{
					console.error(error)
					setTimeout(()=>{
						Indicator.close();
						Toast({
						  message: 'Timeout',
						  duration: 2000
						})
					},10000)
				})
			}
		},
		mounted(){
			this.orders = JSON.parse(sessionStorage.getItem("orders"));
		}
	}
</script>
<style lang="less" scoped>
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
	.container>div{
		padding:2.4rem 0.68rem;
	}
	.canceltrip{
		.cancel-tit{
			.city{
				text-align:left;
				padding-left:0.4rem;
				span{
					font-size:0.68rem;
					color:#333;
				}
				.arive{
					width:0.6rem;
					height:0.6rem;
					background:url('../../../assets/images/order/ic-jiant-order.png') center no-repeat;
					background-size:0.6rem;
					padding:0 0.4rem;
				}
			}
			p{
				font-size:0.5rem;
				color:#ccc;
				text-align:left;
				padding-left:0.4rem;
			}
		}
		.flight-info{
			margin-top:0.4rem;
			ul{	
				overflow: auto;
				height: 100%;
				background-color:#fff;
				border-radius:0.4rem;
				li{
					margin:0;
					padding:0.4rem;
					border-bottom:1px solid #eee;
					.flight-time{
						.flight-time-ico{
							width:1.02rem;
							img{
								width:1.02rem;
							}
						}
						
					}
					.flight-time-info{
							margin-left:0.4rem;
							text-align:left;
							h2{
								font-size:0.56rem;
								font-weight:bold;
								line-height:1rem;
							}
							p{
								font-size:0.4rem;
								line-height:0.8rem;
							}
						}
					.flight-price{
						.flight-price-detail{
							h2{
								font-size:0.6rem;
								text-align:left;
								font-weight:bold;
								width:3.4rem;
								height:1.7rem;
								line-height:1.7rem;
								color:#ffad3d;
							}
						}
						.flight-next{
							width:0.6rem;
							margin-left:0.36rem;
							background:url('../../../assets/images/ic-btn-one.png') center no-repeat;
							background-size:0.5rem;
						}
					}
				}
			}
		}
	}
	.travelers{
		.detail{
			background-color:#fff;
			border-radius:0.4rem;
			padding:0.4rem;
			.detail-name{
				text-align:left;
				.round{
					font-size:1.2rem;
				}
				.name{
					font-size:0.68rem;
					color:#333;
					padding-left:0.4rem;
				}
			}
			.detail-price{
				span{
					font-size:0.56rem;
					color:#ccc;
					line-height:0.8rem;
					padding-left:0.8rem;
				}
			}
		}
		.fareDetail{
			border-radius:0.4rem;
			.fare-cont{
				background-color:#fff;
				border-radius:0.4rem;
				padding:0.4rem;
				background-color:#fff;
				.list,.total{
					font-size:0.6rem;
					color:#333;
					height:1.4rem;
					line-height:1.4rem;
					span{
						text-align:left;
					}
				}
				.total{
					font-size:0.768rem;
					color:#333;
					padding:0.2rem 0rem;
				}
				.notice{
					p{
						font-size:0.52rem;
						color:#ccc;
						text-align:left;
						span{
							font-weight:bold;
							font-size:0.52rem;
							color:#666;
						}
					}
				}
			}
		}
	}
	.reason{
		ul{
			li{
				text-align:left;
				background-color:#fff;
				border-radius:0.3rem;
				margin-top:2px;
				padding:0.4rem;
				.round{
					width:0.6rem;
					height:0.6rem;
					border-radius:50%;
					border:1px solid #ccc;
					margin-right:0.4rem;
				}
				span{
					font-size:0.6rem;
					color:#333;
				}
			}
		}
	}
	.comments{
		width:100%;
		
		#comment-text{
			-webkit-box-sizing:border-box;
			box-sizing:border-box;
			width:100%;
			border:0;
			padding:0.4rem;
			font-size:0.6rem;
			color:#666;
		}
	}
	.comments,.reason,.fareDetail,.travelers{
		h2{
			font-size:0.68rem;
			color:#333;
			text-align:left;
			line-height:0.8rem;
			padding:0.4rem;
		}
	}
	.cancel,.notCancel{
		margin-top:0.68rem;
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
</style>