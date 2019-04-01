<template>
	<div class="wrapper">
		<head-top class="header" v-show='showHead'>
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" class="title">My Account</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="user flex direction-column align-items-center content-center">
				<div class="user-photo">
					<img v-if="!isLogin" :src="require('../../assets/images/account/photo.png')" alt="">
					<img v-else :src="require('../../assets/images/menu/usericon.png')" alt="">
				</div>
				<span>{{greetings}}</span>
				<span v-if="Object.is(user,null)"></span>
				<span v-else>{{username}}</span>
				<span v-if="Object.is(user,null)"></span>
				<span v-else>{{user.emailAddress}}</span>
			</div>
			<div class="userCenter">
				<div class="userCenter-cont">
					<div class="list flex space-between align-items-center" @click="$router.push('/trip')">
						<div class="list-left flex content-start">
							<div class="list-ico">
								<img :src="require('../../assets/images/account/My-Trips.png')">
							</div>
							<div class="list-tit">My Trips</div>
						</div>
						<div class="list-right"></div>
					</div>
					<div class="list flex space-between align-items-center" @click="$router.push('/profile')">
						<div class="list-left flex content-start">
							<div class="list-ico">
								<img :src="require('../../assets/images/menu/Navbar_13.png')">
							</div>
							<div class="list-tit">Profile</div>
						</div>
						<div class="list-right"></div>
					</div>
					<div class="list flex space-between align-items-center" @click="$router.push('/happywallet')">
						<div class="list-left flex content-start">
							<div class="list-ico">
								<img :src="require('../../assets/images/account/Happy-Wallet.png')">
							</div>
							<div class="list-tit">Happy Wallet</div>
						</div>
						<div class="list-right"></div>
					</div>
					<div class="list flex space-between align-items-center" @click="$router.push('/contact')">
						<div class="list-left flex content-start">
							<div class="list-ico">
								<img :src="require('../../assets/images/account/Contact-us.png')">
							</div>
							<div class="list-tit">Contact us</div>
						</div>
						<div class="list-right"></div>
					</div>
					<div class="list flex space-between align-items-center" @click="$router.push('/offer')">
						<div class="list-left flex content-start">
							<div class="list-ico">
								<img :src="require('../../assets/images/menu/offers1_03.png')">
							</div>
							<div class="list-tit">Offers</div>
						</div>
						<div class="list-right"></div>
					</div>
				</div>
			</div>
			<div class="SignOut">
				<p @click="$router.push('/agreement')">Legal and privacy</p>
				<a class="buttons" @click="signOut">Sign Out</a>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../components/head/head.vue'
import { User } from '../../models/user'
import Toast from 'mint-ui/lib/toast';
import { CookieUtil } from '../../models/utils'
import { Silver, Gold } from '../../models/discount'
import * as types from '../../vuex/types/types.js'
import { loginUserInfo } from '../../vuex/models/user/XUser.js'
export default {
	components: {
		headTop
	},
	data() {
		return {
			user: null,
			showHead: true,
		}
	},
	computed: {
		greetings() {
			let d = new Date();
			let h = d.getHours();
			if (h >= 6 && h < 12) {
				return 'Good morning';
			} else if (h >= 12 && h < 18) {
				return 'Good afternoon';
			} else {
				return 'Good evening';
			}
		},
		username() {
			if (this.user.firstname == null && this.user.lastname == null) {
				return '';
			} else {
				return this.user.firstname + " " + this.user.lastname
			}
		},
		isLogin() {
			return CookieUtil.hasItem('uuid');
		}
	},
	methods: {
		goWallet() {
			let self = this;
			Promise.all([
				Silver.getSilverPrice(this),
				Gold.getGoldPrice(this),
				Silver.getSilverRunningNew(this),
				Gold.getGoldRunningNew(this)
			]).then((res) => {
				let silverState = {
					happySilverBalance: res[0].balance,
					happySilverRunning: res[2]
				};
				let goldState = {
					happyGoldBalance: res[1].happyGoldBalance,
					happyGoldRunning: res[3]
				}
				self.$store.commit(types.GET_SILVER, silverState);
				self.$store.commit(types.GET_GOLD, goldState);
				sessionStorage.setItem("silver", JSON.stringify(silverState));
				sessionStorage.setItem("gold", JSON.stringify(goldState));
			}, (err) => {
				console.log(err);
			})
		},
		signOut() {
			let self = this;
			if (CookieUtil.removeItem("uuid")) {
				Toast({
					message: 'sign out successful',
					duration: 1000
				});
				self.$router.push("/")
			}
		}
	},
	watch: {
		$route(to, from) {
			// debugger;
			if (to.path == '/account') {
				this.showHead = true;
			} else {
				this.showHead = false;
			}
		}
	},
	mounted() {
		let self = this;
		if (CookieUtil.hasItem("uuid")) {
			User.loadUser(self)
				.then(user => {
					self.$nextTick(() => {
						self.user = user;
						self.$store.commit(loginUserInfo, user)
					})
				})
				.catch(err => { console.log(err) })
		} else {

		}
		this.goWallet()
	}
}
</script>
<style lang="less" scoped>
.header {
	background-color: #0b9d78;
	.title {
		font-size: 0.768rem;
		color: #fff;
	}
	.sp {
		opacity: 0;
	}
}

.container {
	background-color: #fff;
}

.user {
	height: 8.8rem;
	margin-top: 2rem;
	padding: 0 0.68rem 2.4rem;
	background: #0b9d78 url('../../assets/images/account/user-bg.png') top center no-repeat;
	background-size: 100%;
	.user-photo {
		img {
			width: 4.2rem;
			height: 4.2rem;
		}
	}
	span {
		display: block;
		padding: 0.1rem;
		color: #fff;
		font-size: 0.6rem;
	}
}

.userCenter {
	padding: 0 0.68rem;
	.userCenter-cont {
		background-color: #fff;
		border-radius: 0.3rem;
		padding: 0 0.4rem;
		.list {
			padding: 0.4rem 0;
			.list-left {
				.list-ico {
					img {
						width: 0.68rem;
					}
				}
				.list-tit {
					font-size: 0.6rem;
					color: #666;
					padding-left: 0.6rem;
					padding-top: 0.2rem;
				}
			}
			.list-right {
				width: 1rem;
				background: url('../../assets/images/ic-btn-one.png') center no-repeat;
				background-size: 0.4rem;
			}
		}
	}
}

.SignOut {
	padding: 1rem 0.68rem;
	p {
		font-size: 0.6rem;
		color: #0cb78e;
		text-align: center;
		padding: 0.4rem;
	}
	.buttons {
		background-color: #ffad3d;
		color: #fff;
		display: block;
		width: 100%;
		padding: 0.6rem 0;
		border-radius: 0.2rem;
		font-size: 0.64rem;
	}
}
</style>
