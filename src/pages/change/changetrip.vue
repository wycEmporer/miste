<template>
	<div class="wrapper">
		<head-top class="header">
			<img slot="left" :src="require('../../assets/images/flight-prev.png')" class="prev">
			<div slot="title" class="title">change trip</div>
		</head-top>
		<div class="mark" v-show="showCalendar"></div>
        <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
            <calendar :limit='limit' class="animated" v-show="showCalendar" @getVal="getVal"></calendar>
        </transition>
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
						<div class="passenger flex space-between align-items-center" v-show="el.status!=0" @click="selected(el)">
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
				<div class="calendar">
					<span>Depart</span>
					<input type="text" v-model='departTime' @click='openCalendar'>
				</div>
				<div class="flightNumber">
					<span>Flight number</span>
					<input type="text" v-model='flightNumber' placeholder="Flight number">
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
import headTop from '../../components/head/head.vue'
import calendar from '../../components/calendar/calendar.vue'
import {OrderStatusUtil,TimeFormatUtil,RefundUtil} from '../../models/utils'
import {DomainManager} from '../../config/DomainManager.js'
import {Toast,Indicator} from 'mint-ui';
	export default{
		components:{
			headTop,
			calendar
		},
		data(){
			return {
				limit:{
	        minYear:new Date().getFullYear(),
	        minMonth: new Date().getMonth(),
	        minDay: new Date().getDate(),
	        maxYear: new Date().getFullYear()+1
        },
				TimeFormatUtil,
				OrderStatusUtil,
				DomainManager,
				TimeFormatUtil,
				RefundUtil,
				orders:[],
				showCalendar:false,
				departDate:new Date(),
				flightNumber:''
			}
		},
		computed:{
			 departTime: {
                get() {
                    let arr = this.departDate.toString().split(" ");
                    arr = arr.slice(0, 1).join() + ", " + arr.slice(2, 3).join() + " " + arr.slice(1, 2).join() + ", " + arr.slice(3, 4).join();
                    return arr;
                },
                set(arr) {
                    this.departDate = arr;
                }
            },
		},
		methods:{
			openCalendar(event){
				event.toElement.blur();
				this.showCalendar = true;
			},
			getVal(dateVal,showCalendar){
                this.showCalendar = showCalendar;
                this.departDate = dateVal;
            },
			selected(el){
				el.sex=!el.sex
			},
			gerQueryString(){
				return "tripId="+sessionStorage.getItem("id");
			},
			getCancel(){
				let self = this;
				let isSelec = this.orders[0].travellerinfo.some((el)=>{
					return el.sex;
				})
				let isChange = this.orders[0].travellerinfo.every((el)=>{
					return el.status == '0';
				})

				if(isChange){
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
					}else if(this.flightNumber == ''){
						Toast({
						  message: 'Please enter flight number',
						  duration: 2000
						})
					}else{
						Indicator.open({
						  spinnerType: 'fading-circle'
						});
						this.orders[0].travellerinfo.forEach((el,index)=>{
							if(!el.sex){
								this.orders[0].travellerinfo.splice(index,1);
							}
						})
						sessionStorage.removeItem('orders');
						sessionStorage.setItem('orders',JSON.stringify(this.orders));
						let data = {};
						let map = {};
						this.orders[0].travellerinfo.forEach((el)=>{
							map[el.travellerId] = {
								flightNo:self.flightNumber,
								takeOffTime:TimeFormatUtil.getYearMonthDateString(self.departDate)
							}
						})
						data.map = map;
						let url = DomainManager.getChangeSignUrl(this.gerQueryString());
						RefundUtil.changeForTrip(this,url,data).then((res)=>{
							Indicator.close();
							self.$router.push('/canceltrip3')
						});
					}
				}
			}
		},
		mounted(){
			this.orders = JSON.parse(sessionStorage.getItem("orders"));
			console.log(this.orders)
			
		}
	}
</script>
<style lang='less' scoped>
	.selected{
		border-color:#ffad3d!important;
		background:#ffad3d url('../../assets/images/sure.png') center no-repeat;
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
				font-size:0.68rem;
				color:#333;
				text-align:left;
				padding:0.68rem 0 0.2rem;
				.rules-title-img{
					width:1.2rem;
					height:0.68rem;
					background:url('../../assets/images/ic-btn-one3.png') center no-repeat;
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
		.calendar,.flightNumber{
			text-align:left;
			span{
				display:block;
				font-size: 0.68rem;
		        color: #333;
		        text-align: left;
		        height:1.92rem;
		        line-height:1.92rem;
			}
			input{
				width:48%;
				height:1.92rem;
				color:#666;
				text-indent:0.4rem;
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
