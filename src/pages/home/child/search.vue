<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="iconfont icon-back"></i>
			<span slot="title">My Trips</span>
			<i slot="right" alt="" class="right iconfont icon-back"></i>
		</head-top>
		<div class="s-container">
			<div class="strip-control-btn flex space-between align-items-center">
				<div class="sbtn-wrap flex align-items-center" :class="{active:isMobile}">
					<a id="oneway" @click="showMobile">Mobile Number</a>
				</div>
				<div class="sbtn-wrap flex align-items-center" :class="{active:isEmail}">
					<a id="roundtrip" @click="showEmail">Email</a>
				</div>
			</div>
			<div class="search" v-show="isMobile">
				<div class="search-cont">
					<div class="phoneNumber flex space-between">
						<div class="select-group">
							<select name="" id="" v-model="mobile.code">
								<option :value="item.regionCode" v-for="(item, key) in mobile.phoneCode" :key="key">
									{{item.countryName + ' (+' + item.regionCode + ')'}}
								</option>
							</select>
							<span>
								{{'+' + mobile.code}}
							</span>
						</div>
						<input class="phone" type="Number" placeholder="Contact Mobile Number" v-model="mobile.phoneNo">
						<button id="Mobile" type="button" :class="{otpActive:mobile.active}" :disabled="mobile.active" @click="sendOTPEvent">{{mobile.time}}{{mobile.second}}</button>
					</div>
					<div class="tripId">
						<input type="search" class="search" @keypress.13="searchOrder" v-model="mobile.otpCode" placeholder="Vertification Code" />
						<div class="checkError" v-show="mobile.errCode">Please enter a valid code.</div>
					</div>
					<div class="s-confirm">
						<button :class="{btnActive:mobile.canClick}" :disabled="mobile.canClick" @click="searchOrder">Confirm</button>
					</div>
				</div>
			</div>
			<div class="search" v-show="isEmail">
				<div class="search-cont">
					<div class="phoneNumber flex space-between">
						<input class="phone" style="border-left:1px solid #ddd;width:95%;" type="email" placeholder="Contact Email" v-model="email.email">
						<button id="Email" type="button" :class="{otpActive:email.active}" :disabled="email.active" @click="sendOTPEvent">{{email.time}}{{email.second}}</button>
					</div>
					<div class="tripId">
						<input type="search" class="search" @keypress.13="searchOrder" v-model="email.otpCode" placeholder="Vertification Code" />
						<div class="checkError" v-show="email.errCode">Please enter a valid code.</div>
					</div>
					<div class="s-confirm">
						<button :class="{btnActive:email.canClick}" :disabled="email.canClick" @click="searchOrder">Confirm</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import orderList from './base/orderList.vue'
import { FlightOrder } from '../../../models/flightorder'
import { Toast, Indicator } from 'mint-ui';
import { User } from '../../../models/user/User.js';
import { CookieUtil } from "models/utils";
import {parseQueryStr} from 'models/utils/';
import { DomainManager } from '../../../config/DomainManager';
import {Reg} from '../../../models/utils/Reg.js';
export default {
	components: {
		headTop,
		orderList
	},
	data() {
		return {
			orderNubmer: '',
			isMobile: true,
			isEmail: false,
			mobile:{
				token:'',
				type:1,
				code:'91',
				phoneNo:'',
				otpCode:'',
				phoneCode: [],
				time:'OTP',
				second:'',
				active:false,
				canClick:true,
				errCode:false,
			},
			email:{
				token:'',
				type:2,
				email:'',
				otpCode:'',
				time:'OTP',
				second:'',
				active:false,
				canClick:true,
				errCode:false,
			},
			timer:null,
			orders: [],
		}
	},
	watch:{
		mobile:{
			handler:function(val, oldVal){
				if(this.mobile.otpCode != '' && this.mobile.phoneNo !=''){
					this.mobile.canClick = false;
					this.mobile.errCode = false;
				}else{
					this.mobile.canClick = true;
				}
			},
			deep:true
		},
		email:{
			handler:function(val, oldVal){
				if(this.email.otpCode != '' && this.email.email !=''){
					this.email.canClick = false;
					this.email.errCode = false;
				}else{
					this.email.canClick = true;
				}
			},
			deep:true
		},
	},
	methods: {
		searchOrder(){
			if(this.isMobile){
				if(!Reg.contactPhone.test(this.mobile.phoneNo)){
					Toast({
						message: 'Please input correct Mobile Number',
						duration: 1200
					});
				}else{
					let url = DomainManager.getOrderToken()+'?emailOrPhone='+this.mobile.code+' '+this.mobile.phoneNo+'&otpCode='+this.mobile.otpCode;
					if(this.mobile.otpCode == ''){
						this.mobile.errCode = true;
					}else{
						this.mobile.errCode = false;
						this.getOrderToken(url,this.mobile);
					}
				}
			}else{
				if (!Reg.email.test(this.email.email)) {
					Toast({
						message: 'Please input correct Email',
						duration: 1200
					});
				}else{
					let url = DomainManager.getOrderToken()+'?emailOrPhone='+this.email.email+'&otpCode='+this.email.otpCode;
					if(this.email.otpCode == ''){
						this.email.errCode = true;
					}else{
						this.email.errCode = false;
						this.getOrderToken(url,this.email);
					}
				}
			}
		},
		sendOTPEvent(){
			if(this.isMobile){
				if(!Reg.onlyNumber1.test(this.mobile.phoneNo)) {
					Toast({
						message: 'Please input correct Mobile Number',
						duration: 1500
					});
				}else{
					if(this.mobile.code == '91' && String(this.mobile.phoneNo).length != 10){
            Toast({
              message:"Please enter a valid mobile number",
              duration:1500
            });
            return false;
          }else if( this.mobile.code == '86' && String(this.mobile.phoneNo).length != 11){
            Toast({
              message:"Please enter a valid mobile number",
              duration:1500
            });
            return false;
          }else {
						let url = DomainManager.getOrderOTP()+'?emailOrPhone='+this.mobile.code+' '+this.mobile.phoneNo+'&type=1';
						this.getOrderOTP(url,this.mobile);
					}
				}
			}else{
				if (!Reg.email.test(this.email.email)) {
					Toast({
						message: 'Please input correct Email',
						duration: 1500
					});
				}else{
					let url = DomainManager.getOrderOTP()+'?emailOrPhone='+this.email.email+'&type=2';
					this.getOrderOTP(url,this.email);
				}
			}
		},
		getOrderOTP(param,type){
			let that = this;
			Indicator.open({
				text:'Sending . . .',
				spinnerType: 'fading-circle'
			});
			this.$axios.get(param).then(res=>{
				if(res.success){
					type.active = true;
					Indicator.close();
					type.otpCode = '';
					Toast({
						message:'Success',
						duration:1000
					});
					type.time = res.lastSendTime;
					type.second = 's';
					this.timer = setInterval(()=>{
						type.time --;
						if(type.time <= 1){
							type.time = 'OTP';
							type.second = '';
							type.active = false;
							clearInterval(that.timer);
						}
					},1000);
				}else{
					Indicator.close();
					Toast(res.msg);
				}
			}).catch(err =>{
				Indicator.close();
				console.log(err)
			})
		},
		getOrderToken(param,type){
			Indicator.open({
				spinnerType: 'fading-circle'
			});
			this.$axios.get(param).then(res=>{
				if(res.succ){
					Indicator.close();
					type.token = res.token;
					let obj = {};
					if(type.type == 1){
						obj.emailOrPhone = type.code+' '+type.phoneNo;
						obj.token = res.token;
						obj.type = type.type;
					}else if(type.type == 2){
						obj.emailOrPhone = type.email;
						obj.token = res.token;
						obj.type = type.type;
					}
					this.$router.push('/trip');
					sessionStorage.removeItem('searchCondition');
					
					sessionStorage.setItem('searchCondition',JSON.stringify(obj));
				}else{
					Indicator.close();
					type.errCode = true;
					Toast(res.msg);
				}
			}).catch(err =>{
				Indicator.close();
				console.log(err)
			})
		},
		showMobile() {
			this.isMobile = true;
			this.isEmail = false;
			clearInterval(this.timer);	
			this.email.email = '';
			this.email.time = 'OTP';
			this.email.second = '';
			this.email.btnActive = true;
			this.email.active = false;
			this.email.otpCode = '';
		},
		showEmail() {
			this.isMobile = false;
			this.isEmail = true;
			clearInterval(this.timer);
			this.mobile.phoneNo = '';
			this.mobile.code = '91';
			this.mobile.time = 'OTP';
			this.mobile.second = '';
			this.mobile.btnActive = true;
			this.mobile.active = false;
			this.mobile.otpCode = '';
		},
	},
	created() {
		var _this = this;
		User.findSms(this).then(res => {
			res.list.forEach(item => {
				_this.mobile.phoneCode = res.list;
			});
		});
		clearInterval(this.timer);
		this.mobile.phoneNo = '';
		this.mobile.code = '91';
		this.mobile.time = 'OTP';
		this.mobile.second = '';
		this.mobile.otpCode = '';
		this.mobile.btnActive = true;
		this.email.email = '';
		this.email.time = 'OTP';
		this.email.second = '';
		this.email.btnActive = true;
		this.email.otpCode = '';
	},
}
</script>
<style lang='less' scoped>
.header {
	background: #0b9d78;
	span {
		color: #fff;
		font-size: 0.768rem;
	}
	.right {
		opacity: 0;
	}
}
.s-container{
	padding-top:2rem;
	height:auto;
	.strip-control-btn {
		width: 100%;
		height: 1.706rem;
		.sbtn-wrap {
			width: 50%;
			height: 100%;
			background:#ebebeb;
			box-sizing: border-box;
		}
		a {
			width: 100%;
			padding: 0.42rem 0;
			display: block;
			flex: 1;
			color: #999;
			font-size: 0.597rem;
			letter-spacing: 0.5px;
		}
		.active {
			a{color: #fff;}
			background:#ffad3d;
		}
	}
}
.checkError {
  color: #f65858;
  margin-top: 0.2rem;
  font-size: 0.6rem;
  text-align: left;
}
.search {
	padding: 1.282rem 1rem 0.68rem;
	.search-cont {
		// position: relative;
		overflow: hidden;
		.tripId {		
			.search {
				width: 100%;
				padding: 0.5rem;
				border: none;
				font-size: 0.6rem;
				border-radius: 2px; // background: #4fbc9f;
				// color: #ddd;
				border: 1px solid #ddd;
			}
		}
		.phoneNumber {
			margin-bottom: 0.854rem;
			.select-group {
				position: relative;
				border: 1px solid #ddd;
				border-right: none;
				box-sizing: border-box;
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
				width: 25%;
				height: 1.769rem;
				// margin-right: 0.5rem;
				select {
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
					z-index: 9;
					display: block;
					width: 100%;
					height: 100%;
				}
				span {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					text-align: center;
					height: 1.769rem;
					line-height: 1.769rem;
					font-size: 0.64rem; // color: #666;
					font-weight: normal;
				}
			}
			.phone {
				width: 70%;
				padding: 0 0.5rem;
				font-size: 0.6rem;
				border-top-left-radius: 2px;
				border-bottom-left-radius: 2px;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0; // background: #4fbc9f;
				// color: #ddd;
				border: 1px solid #ddd;
				border-right: 0;
				border-left: none;
			}
			button {
				width: 30%;
				height: 1.769rem; // background: url('../../../assets/images/search_ico.png') center no-repeat;
				background-size: 0.769rem;
				background: #4fbc9f;
				font-size: 0.6rem;
				color: #fff;
				border-top-right-radius: 2px;
				border-bottom-right-radius: 2px; // position: absolute;
				box-sizing: border-box; // right: 0.4rem;
				// top: 50%;
				// -webkit-transform: translateY(-50%);
				// transform: translateY(-50%);
			}
			.otpActive{
				background: #ddd;
			}
		}
		.s-confirm{
			margin-top: 1.709rem;
			button{
				width: 100%;
				height:1.495rem;
				line-height: 1.495rem;
				color:#fff;
				background:#ffad3d;
				border-radius: 3px;
				cursor: pointer;
				letter-spacing: 0.5px;
			}
			.btnActive{
				background:#ddd;
			}
		}
	}
}

.searchResult {
	padding: 0 0.68rem;
	.noResult {
		padding-top: 10rem;
		background: url('../../../assets/images/pnr_03.jpg') center 2rem no-repeat;
		background-size: 7rem;
		h2 {
			font-size: 0.6rem;
		}
	}
}

::-webkit-input-placeholder {
	// color: #ddd;
	font-size: 0.6rem; // padding-left: 0.4rem;
}

::-moz-placeholder {
	// color: #ddd;
	font-size: 0.6rem; // padding-left: 0.4rem;
}

:-moz-placeholder {
	// color: #ddd;
	font-size: 0.6rem; // padding-left: 0.4rem;
}

.upcoming {
	background-color: #d4efe8;
}

.paid {
	background-color: #ffeac4;
}

.complete {
	background-color: #efefef;
}
</style>
