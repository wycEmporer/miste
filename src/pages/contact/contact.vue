<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" class="title">Contact</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="content">
			<div class="info-group">
				<h2 class="title">Customer service number</h2>
				<a :href="phoneLink">
					{{websiteInfo.websitePhone?websiteInfo.websitePhone.split("/")[0]:""}}
				</a>
				<a :href="phoneLink">
					{{websiteInfo.websitePhone?websiteInfo.websitePhone.split("/")[1]:""}}
				</a>
				<p>Call us Now to 24×7 Customer Support</p>
			</div>
			<div class="info-group">
				<h2 class="title">Email</h2>
				<h3>For any feedback and suggestions</h3>
				<a href="javascript:;">feedback@happyeasygo.com</a>
				<h3>For customer services</h3>
				
				<a href="javascript:;">
					cs@happyeasygo.com
					<!-- {{websiteInfo.websiteAddress}} -->
				</a>
			</div>
			<div class="info-group">
				<h2 class="title">Location</h2>
				<!-- <a :href="companyName">{{websiteInfo.companyName}}</a>
				<p>{{websiteInfo.companyAddress}}</p>
				<p>1st Floor, Plot # 883</p>
				<p>Phase V, Udyog Vihar</p>
				<p>Gurugram, Haryana - 122016</p> -->
			</div>
			<div class="info-group" style="width: 14.7rem;height:10rem;">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2021984546022!2d77.08473541507973!3d28.50356368246873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1946ebc8f25b%3A0x670c2512a0644c6e!2sHappyEasyGo!5e0!3m2!1szh-CN!2sjp!4v1517211551763" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../components/head/head.vue'
import { User } from 'models/user'
export default {
	components: {
		headTop
	},
	data() {
		return {
			websiteInfo: '',
			phoneLink: '',
			mailLink: '',
			companyName:''
		}
	},
	mounted() {
		User.getWebsiteInfo(this).then(res => {
			this.websiteInfo = res.webSiteInfo;
			this.phoneLink = "tel:" + this.websiteInfo.tollfree_number;
			this.mailLink = "mailto:" + this.websiteInfo.websiteAddress;
			this.companyName = "https://" + this.websiteInfo.companyName;
		})
	}
}
</script>
<style lang="less" scoped>
.wrapper {
	.header {
		background: #0b9d78;
		.title {
			line-height: 2.04rem;
			font-size: 0.768rem;
			color: #000;
		}
		.title {
			color: #fff;
		}
		.sp {
			opacity: 0;
		}
	}
	.content {
		padding: 0 0.64rem;
		text-align: left;
		margin-top: 2.68rem;
		.info-group {
			margin-bottom: 0.64rem;
			line-height: 1.2;
			.title {
				font-weight: bold;
				font-size: 0.768rem;
				margin-bottom: 0.64rem;
				border-bottom: 1px solid #ddd;
			}
			a,
			p,
			h3 {
				font-weight: normal;
				font-size: 0.612rem;
				display: block;
				color: #000;
			}
			a {
				color: #0b9d78;
				padding: 0.15rem 0;
			}
		}
	}
}
</style>