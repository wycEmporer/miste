<template>
	<div id="menu" class="menu" @touchstart="hideMenu" @touchmove="touchend" >
		<div class="menu-cont">
			<div class="menu-user" :class="{'login_bg': isLogin}">
				<div class="user-login" v-if="isLogin">
					<p v-if="userInfo.userName">{{userInfo.userName}}</p>
					<p v-else>{{userInfo.firstname}}{{userInfo.lastname}}</p>
					<p>HappyEasyGo - Your Secret to Travelling Cheap.</p>
				</div>
				<div class="user-LS flex content-start align-items-center" v-else>
					<span @click="gotoLogin()">Sign In</span>
					<span @click="gotoSignUp()">Sign Up</span>
				</div>
			</div>
			<div class="menu-list" :class="{ noLogin: !isLogin }">
				<ul class="flex content-start space-between">
					<li @click="goMyTrip">
						<div class="icon flex content-center align-items-center">
              <i class="s-icon s-icon-center-flight"></i>
            </div>
						<p>My Trips</p>
					</li>
					<li @click="goMyHotel">
						<div class="icon flex content-center align-items-center">
              <i class="s-icon s-icon-center-hotel"></i>
            </div>
						<p>My Hotels</p>
					</li>
					<li @click="goOffers">
						<div class="icon flex content-center align-items-center">
              <i class="s-icon s-icon-center-offers"></i>
            </div>
						<p>My Offers</p>
					</li>
					<li @click="goMyWallet">
						<div class="icon flex content-center align-items-center">
              <i class="s-icon s-icon-center-wallet"></i>
            </div>
						<p>{{isLogin?"My Wallet":"Wallet"}}</p>
						<p v-if="isLogin" class="totalAmount"><span class="rs">Rs</span><span>{{(amount?amount:0).toFixed(2)}}</span></p>
					</li>
					<li v-if="isLogin" @click="goMyCoupon">
						<div class="icon flex content-center align-items-center">
              <i class="s-icon s-icon-center-coupons"></i>
            </div>
						<p>My Coupons</p>
					</li>
					<li v-if="isLogin" @click="goMyProfile">
						<div class="icon flex content-center align-items-center" >
              <i class="s-icon s-icon-center-set"></i>
            </div>
						<p>My Profile</p>
					</li>
					<li @click="goAboutUs">
						<div class="icon flex content-center align-items-center" >
              <i class="s-icon s-icon-center-about"></i>
            </div>
						<p>About Us</p>
					</li>
					<li @click="goSupport">
						<div class="icon flex content-center align-items-center" >
              <i class="s-icon s-icon-center-support"></i>
            </div>
						<p>24<i style="vertical-align:bottom;">*</i>7 Support</p>
					</li>
				</ul>
			</div>
			<div v-if="isLogin" class="sign-out">
				<span class="out" @click="signOut">Sign Out</span>
			</div>
		</div>
	</div>
</template>
<script>
import login from 'pages/login/login.vue';
import { CookieUtil } from 'models/utils';
import { User } from 'models/user';
import Toast from 'mint-ui/lib/toast';
import { DomainManager } from 'config/DomainManager';

export default {
	components: {
		login
	},
	props:["userInfo","isLogin","amount"],
	data() {
		return {
			showMenu: false,
			showLogin: true,
			startX: 0,
			endX: 0,
			silver: 0,
      gold: 0,
			CookieUtil: CookieUtil
		}
	},
	computed: {
		// userInfo() {
		// 	return this.$store.getters.userInfo ? this.$store.getters.userInfo : '';
		// },
		// isLogin() {
		// 	return CookieUtil.hasItem('uuid');
		// },
		// amount() {
		// 	return JSON.parse(sessionStorage.silver).happySilverBalance + JSON.parse(sessionStorage.gold).happyGoldBalance;
		// }

	},
	methods: {
		gotoLogin() {
			this.$router.push('/login')
			this.$emit('closeMenu');
		},
		gotoSignUp() {
			this.$router.push('/register')
			this.$emit('closeMenu');
		},
		goMyTrip() {
			if(this.isLogin){
				this.$router.push('/trip');
			}else{
				this.$router.push('/search');
			}
			this.$emit('closeMenu');
		},
		goMyHotel(){
			if(this.isLogin){
				this.$router.push('/hotel_order');
			}else{
				this.$router.push('/hotel_order/search');
			}
			this.$emit('closeMenu');
		},
		goOffers(){
			this.$router.push('/offer');
			this.$emit('closeMenu');
		},
		goMySearch(){
			this.$router.push('/search');
			this.$emit('closeMenu');
		},
		goMyWallet() {
			if(this.isLogin){
				this.$router.push('/happywallet');
			}else{
				this.$router.push('/wallet');
			}
			this.$emit('closeMenu');
		},
		goMyCoupon() {
			this.$router.push('/privateCoupons');
			this.$emit('closeMenu');
		},
		goMyProfile() {
			this.$router.push('/profile');
			this.$emit('closeMenu');
		},
		goAboutUs(){
			this.$router.push('/about')
			this.$emit('closeMenu');
		},
		goSupport(){
			this.$router.push('/support')
			this.$emit('closeMenu');
		},
		hideMenu(e) {
			let touch = e.targetTouches[0];
			this.startX = touch.pageY;
			var menu_cout = document.getElementsByClassName('menu-cont')[0].offsetHeight;
			if (touch.pageY > menu_cout) {
				setTimeout(() => {
					this.$emit('closeMenu');
				}, 20)
			}
		},
		touchend(e) {
			let touch = e.targetTouches[0];
			this.endX = touch.pageY;
			let abs = Math.abs(this.endX - this.startX);
			if (this.endX < this.startX && abs >= 30) {
				this.$emit('closeMenu');
			}
		},
		async signOut() {
			await User.signOut(this);
			Toast({
				message: 'sign out successful',
				duration: 1500
			});
			this.$emit('signout');
			// this.$router.push("/")
		}
	},
}
</script>
<style lang="less" scoped>
.menu {
	width: 100%;
	height: 100%;
	background-color: transparent;
	position: fixed;
	z-index: 21;
	.menu-cont {
		width: 100%;
		background-color: #fff;
		padding-top: 2.4rem;
		.menu-user {
			padding:0.64rem 0.962rem;
			background: #fafafa;
			.user-login {
				text-align: left;
				p:first-child {
					color: #111;
					font-size: 14px;
				}
				p:last-child{
					margin-top: 5px;
					color: #017959;
					font-size: 10px;
					// overflow: hidden;
					// white-space: nowrap;
					// text-overflow: ellipsis;
				}
			}
			.user-LS {
				span {
					display: block;
					width:3.4rem;
					height:0.98rem;
					line-height:0.98rem;
					font-size: 12px;
					color:#017354;
					border: 1px solid #017354;
					border-radius: 2px;
					cursor: pointer;
				}
				span:nth-child(1){margin-right: 0.98rem;}
			}
		}
		.login_bg{
			background: url('~assets/images/home-new/icon_login_bg.png') right top/13% 80% no-repeat #fafafa;
		}
	}
	.menu-list {
		ul {
			padding:0 0.64rem;
			flex-wrap: wrap;
			overflow: hidden;
			li {
				width:30%;
				text-align: center;
				border-radius:2px;
				margin-bottom: 0.386rem;
				margin-right: 5%;
				margin-top: 0.854rem;
				position: relative;
				p:nth-of-type(1){
					color:#111;
					font-size: 12px;
					margin-top:8px;
				}
				.totalAmount {
					position: absolute;
					bottom: -16px;
					left: 0;
					right: 0;
					margin:auto;
					span {
						font-size: 9px;
						color: #E3A428;
					}
				}
				.icon {
					width: 1.709rem;
					height: 1.709rem;
					margin:auto;
					background: #fafafa;
					img{
						width:0.754rem;
						vertical-align: top;
					}
				}
			}
			li:nth-child(3n){
				margin-right: 0;
			}
		}
	}
	.noLogin{padding-bottom: 0.468rem;}
	.sign-out {
		margin:0.468rem 0.64rem 0;
		border-top:1px solid #DCDCDC;
		.out {
			font-size: 12px;
			color: #787878;
			padding:0.64rem 0;
		}
	}
}
</style>