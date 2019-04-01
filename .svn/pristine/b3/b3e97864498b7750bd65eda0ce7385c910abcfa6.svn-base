<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" class="title">Forgot Passoword</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="content">
			<div class="form">
				<div class="form-group">
					<span>
						{{this.verification||'choose your verification type'}}
						<select class="select" v-model="verification">
							<option :value="userData.email">
								Email Address
							</option>
							<option :value="userData.phone">Phone Number</option>
						</select>
					</span>
				</div>
				<div class="form-group">
					<input class="OTP" type="text" v-model="otp" placeholder="Verification Code">
					<a class="btn" @click="getOtp()" href="javascript:">{{submit}}</a>
				</div>
				<div class="form-group">
					<input class="pw" type="password" v-model="password" placeholder="Password">
				</div>
				<div class="form-group">
					<input class="pwc" type="password" v-model="confirmpw" placeholder="Retype Password">
				</div>
				<div class="register">
					<a class="reg" @click="validate">Confirm</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from 'components/head/head.vue';
import { Toast, Indicator } from 'mint-ui';
import { User } from 'models/user';
export default {
	components: {
		headTop
	},
	data() {
		return {
			isSelect: false,
			email: '',
			phone: '',
			otp: '',
			verification: '',
			showPassword: false,
			isSelec: true,
			userData: {},
			password: '',
			confirmpw: '',
			submit: 'Submit'
		}
	},
	computed: {
	},
	methods: {
		validate() {
			if (this.verification == '') {
				Toast({
					message: 'Please choose your verification type',
					duration: 1000
				})
			} else if (this.otp.trim() == '') {
				Toast({
					message: 'Please enter correct OTP',
					duration: 1000
				})
			} else if (this.password.trim() == '' || this.confirmpw.trim() == '') {
				Toast('Please enter correct password or retype password')
			} else if (this.password.trim() != this.confirmpw.trim()) {
				Toast('password must be the same')
			} else {
				let type = this.verification.indexOf('@') >= 0 ? 'email=' : 'cellphone=';
				let parm = type + this.verification + '&otp=' + this.otp + '&payPassword=' + this.password;
				User.setPayPasswordNew(this, parm).then(res => {
					if (res.success) {
						Toast('success')
						this.$router.push('/');
					} else {
						Toast(res.msg)
					}
				})
			}
		},
		getOtp() {
			if (this.verification == '') {
				Toast('Please choose your verification type')
			} else {
				if (this.submit != 'Submit') {
					return false;
				}
				var self = this;
				self.submit = 60;
				var btn = document.querySelector('.btn');
				btn.style.backgroundColor = '#ccc';
				let type = self.verification.indexOf('@') >= 0 ? 'email=' : 'cellphone=';
				let parm = type + self.verification;
				if (self.submit == 'Submit') {
					self.submit = 60
				}
				User.resetPayPasswordNew(self, parm).then(res => {
					self.submit = res.lastSendTime;
				}).catch(err => {
					console.log(err)
				})
				var stop = setInterval(function() {
					if (self.submit > 1) {
						self.submit--;
					} else {
						clearInterval(stop);
						btn.style.backgroundColor = '#0b9d78';

						self.submit = 'Submit';
					}
				}, 1000)
			}

		}
	},
	created() {
		if (sessionStorage.user) {
			this.userData.email = JSON.parse(sessionStorage.user).email;
			this.userData.phone = JSON.parse(sessionStorage.user).cellphone;
		} else {
			// Toast({
			// 	message: 'infomation expired',
			// 	duration: 1500
			// })
			this.$router.push('/login')
		}
	}
}
</script>
<style lang="less" scoped>
.wrapper {
	.header {
		background: #0b9d78;
		i {
			padding: 0 0.64rem;
		}
		.title {
			font-size: 0.768rem;
		}
		.sp {
			opacity: 0;
		}
	}
	.content {
		padding: 0 1.28rem; // width: 100%;
		height: 100%;
		.form {
			padding-top: 2.44rem;
			.form-group {
				margin: 0.64rem 0;
				display: table;
				width: 100%;
				span {
					display: block;
					width: 100%;
					height: 2rem;
					line-height: 2rem;
					position: relative;
					border: 1px solid #ddd;
					font-size: 0.64rem;
					text-align: left;
					padding: 0 0.64rem;
					box-sizing: border-box;
					.select {
						border-radius: 0;
						width: 100%;
						height: 2rem;
						position: absolute;
						top: 0;
						left: 0;
						opacity: 0;

						option {
							// color: red;
							height: 2rem;
						}
					}
				}

				input {
					height: 2rem;
					display: table-cell;
					box-sizing: border-box;
					padding: 0.64rem;
					width: 100%;
					font-size: 0.64rem;
					border: 1px solid #ddd;

					border-radius: 0;
				}
				.email {
					border-right: none;
				}
				.btn {
					width: 2.3rem;
					display: table-cell;
					font-size: 0.64rem;
					color: #fff;
					background: #0b9d78;
					padding: 0.64rem;
				}
			}
			.statement {
				text-align: left;
				.selected {
					float: left;
					width: 0.68rem;
					height: 0.68rem;
					background: url('../../assets/images/common/select-gray.png') center no-repeat;
					background-size: 0.68rem;
					margin-top: 0.05rem;
				}
				.choose {
					background: url('../../assets/images/common/select-green.png') center no-repeat;
					background-size: 0.68rem; // border-color: #f56600!important;
				}
				p {
					color: #999;
					font-size: 0.6rem;
					margin-left: 1rem;
					line-height: 0.8rem;
					span {
						color: #0db88f;
					}
				}
			}
			.register {
				margin-top: 2rem;
				a {
					width: 100%;
					background-color: #ffad3d;
					height: 1.8rem;
					font-size: 0.768rem;
					color: #fff;
					line-height: 1.8rem;
					display: block;
					border-radius: 4px;
				}
			}
		}
	}
}
</style>